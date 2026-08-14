"use client";
import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/app/lib/gsap";

/* One gesture = one section.
   Wheel events arrive in bursts (a trackpad flick fires dozens), so the first
   event past a small threshold triggers the move and the rest are swallowed
   until the burst stops AND the animation has finished. */
const SNAP_DURATION = 0.7;   // seconds per section move
const WHEEL_THRESHOLD = 8;   // ignore sub-pixel/inertia noise
const GESTURE_GAP = 140;     // ms of quiet that ends a burst
const SWIPE_MIN = 45;        // px of travel before a touch counts
const MIN_SCROLLER_SLACK = 48; // px an inner box must scroll to own a gesture

export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const lenis = new Lenis({
      lerp: 0.1,
      // With snapping on, this controller owns wheel/touch input — Lenis must
      // not also consume it, or sub-threshold events nudge the page a few px.
      // When motion is reduced there is no snapping, so hand wheel back to Lenis.
      smoothWheel: reduced,
      syncTouch: false,
    });
    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const tickerFn = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tickerFn);
    gsap.ticker.lagSmoothing(0);

    // Reduced motion: keep smooth scrolling, skip the hijacking entirely.
    if (reduced) {
      return () => {
        gsap.ticker.remove(tickerFn);
        lenis.destroy();
        lenisRef.current = null;
      };
    }

    /* --- Snap targets -------------------------------------------------- */
    // Direct children of <main> that actually occupy space. Sections a little
    // taller than the viewport align to their bottom instead of being clipped.
    const getTargets = (): number[] => {
      const main = document.querySelector("main");
      if (!main) return [];
      const vh = window.innerHeight;
      const maxScroll = document.documentElement.scrollHeight - vh;
      const tops: number[] = [];

      for (const el of Array.from(main.children)) {
        if (!(el instanceof HTMLElement)) continue;
        if (el.tagName === "HEADER" || el.tagName === "STYLE") continue;
        const rect = el.getBoundingClientRect();
        if (rect.height < vh * 0.25) continue; // skip spacers/portals
        if (getComputedStyle(el).position === "fixed") continue;

        const top = Math.round(rect.top + window.scrollY);
        tops.push(Math.min(top, maxScroll));

        // Tall section: add a stop at its bottom so nothing gets skipped.
        if (rect.height > vh * 1.08) {
          tops.push(Math.min(Math.round(top + rect.height - vh), maxScroll));
        }
      }

      const unique = Array.from(new Set(tops.map((t) => Math.max(0, t))));
      unique.sort((a, b) => a - b);

      // Drop stops closer together than a third of a screen...
      const spaced = unique.filter((t, i, arr) => i === 0 || t - arr[i - 1] > vh * 0.33);

      // ...but never lose the page bottom: a tall last section (e.g. the footer)
      // can sit inside that gap, and dropping it makes its tail unreachable.
      const last = unique[unique.length - 1];
      if (last !== undefined && spaced[spaced.length - 1] !== last) spaced.push(last);
      return spaced;
    };

    let targets = getTargets();
    const refresh = () => { targets = getTargets(); };

    let index = 0;
    const syncIndex = () => {
      const y = window.scrollY;
      let nearest = 0;
      let best = Infinity;
      targets.forEach((t, i) => {
        const d = Math.abs(t - y);
        if (d < best) { best = d; nearest = i; }
      });
      index = nearest;
    };
    syncIndex();

    /* --- Gesture gate --------------------------------------------------- */
    let animating = false;
    let gestureOpen = true;   // false while a burst is still being consumed
    let gestureTimer: number | undefined;

    const armGestureReset = () => {
      window.clearTimeout(gestureTimer);
      gestureTimer = window.setTimeout(() => {
        // Only re-arm once the animation is done, so a long flick that outlasts
        // the scroll doesn't immediately fire a second jump.
        if (!animating) gestureOpen = true;
        else armGestureReset();
      }, GESTURE_GAP);
    };

    const goTo = (dir: 1 | -1) => {
      if (!targets.length) refresh();
      const next = index + dir;
      if (next < 0 || next >= targets.length) return false;

      index = next;
      animating = true;
      gestureOpen = false;

      lenis.scrollTo(targets[index], {
        duration: SNAP_DURATION,
        easing: (t: number) => 1 - Math.pow(1 - t, 3), // easeOutCubic
        lock: true,
        onComplete: () => { animating = false; },
      });
      return true;
    };

    /* --- Inner scrollers ------------------------------------------------- */
    /* Carousels (Instagram / LinkedIn) are horizontal overflow containers.
       Hijacking wheel events over them makes the page feel stuck: the browser
       wants to pan the track while this controller consumes the same gesture.
       Walk up from the event target and bail out if we're inside one. */
    const insideScroller = (target: EventTarget | null, axis: "x" | "y"): boolean => {
      let el = target instanceof HTMLElement ? target : null;
      while (el && el !== document.body && el !== document.documentElement) {
        if (el.hasAttribute("data-lenis-prevent")) return true;
        const style = getComputedStyle(el);
        const overflow = axis === "x" ? style.overflowX : style.overflowY;
        if (/(auto|scroll)/.test(overflow)) {
          // Ignore incidental overflow: `overflow-x-auto` also sets overflow-y,
          // so a carousel with a few px of slack would otherwise swallow the
          // gesture and the page would inch instead of snapping.
          const slack = axis === "x"
            ? el.scrollWidth - el.clientWidth
            : el.scrollHeight - el.clientHeight;
          if (slack > MIN_SCROLLER_SLACK) return true;
        }
        el = el.parentElement;
      }
      return false;
    };

    /* --- Wheel / trackpad ----------------------------------------------- */
    const onWheel = (e: WheelEvent) => {
      // Sideways intent (trackpad swipe, shift+wheel) over a horizontal track:
      // hand it to the browser so the carousel pans instead of the page jumping.
      const sideways = Math.abs(e.deltaX) > Math.abs(e.deltaY) || e.shiftKey;
      if (sideways && insideScroller(e.target, "x")) return;

      // Vertically scrollable inner area (modal body): let it scroll itself.
      if (insideScroller(e.target, "y")) return;

      e.preventDefault();
      if (Math.abs(e.deltaY) < WHEEL_THRESHOLD) return;

      if (animating || !gestureOpen) { armGestureReset(); return; }

      goTo(e.deltaY > 0 ? 1 : -1);
      armGestureReset();
    };

    /* --- Touch ----------------------------------------------------------- */
    let touchStartY = 0;
    let touchStartX = 0;
    let touchHandled = false;

    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
      touchStartX = e.touches[0].clientX;
      touchHandled = false;
    };

    const onTouchMove = (e: TouchEvent) => {
      const dy = touchStartY - e.touches[0].clientY;
      const dx = touchStartX - e.touches[0].clientX;

      // Swiping a carousel sideways — leave it to the browser.
      if (Math.abs(dx) > Math.abs(dy) && insideScroller(e.target, "x")) return;
      if (insideScroller(e.target, "y")) return;

      e.preventDefault();
      if (touchHandled || animating) return;
      if (Math.abs(dy) < SWIPE_MIN) return;

      touchHandled = true;
      goTo(dy > 0 ? 1 : -1);
    };

    /* --- Keyboard -------------------------------------------------------- */
    const onKey = (e: KeyboardEvent) => {
      const el = document.activeElement;
      if (el && /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName)) return;
      if ((el as HTMLElement | null)?.isContentEditable) return;

      const down = ["ArrowDown", "PageDown", " ", "Spacebar"].includes(e.key);
      const up = ["ArrowUp", "PageUp"].includes(e.key);
      if (!down && !up && e.key !== "Home" && e.key !== "End") return;

      e.preventDefault();
      if (animating) return;

      if (e.key === "Home") { index = 0; lenis.scrollTo(targets[0], { duration: SNAP_DURATION }); return; }
      if (e.key === "End") {
        index = targets.length - 1;
        lenis.scrollTo(targets[index], { duration: SNAP_DURATION });
        return;
      }
      goTo(down ? 1 : -1);
    };

    /* --- In-page anchors keep the index honest --------------------------- */
    const onAnchorScroll = () => { if (!animating) syncIndex(); };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", refresh);
    window.addEventListener("scrollend", onAnchorScroll);

    // Sections load images/fonts after mount; re-measure once things settle.
    const settle = window.setTimeout(() => { refresh(); syncIndex(); }, 800);
    ScrollTrigger.addEventListener("refresh", refresh);

    return () => {
      window.clearTimeout(settle);
      window.clearTimeout(gestureTimer);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", refresh);
      window.removeEventListener("scrollend", onAnchorScroll);
      ScrollTrigger.removeEventListener("refresh", refresh);
      gsap.ticker.remove(tickerFn);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}
