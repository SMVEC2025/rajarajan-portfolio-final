"use client";
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, SplitText } from "@/app/lib/gsap";
import { useReducedMotion } from "@/app/hooks/useReducedMotion";

/**
 * Signature moment: full-bleed pinned section.
 * Three lines of oversized type reveal character-by-character
 * as you scroll through 300vh of scroll distance.
 * Everything else on the page is quiet around this.
 */
export default function SignatureStatement() {
  const sectionRef = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const line3Ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!sectionRef.current || !innerRef.current) return;

    if (reduced) {
      gsap.set([line1Ref.current, line2Ref.current, line3Ref.current], { opacity: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      const split1 = new SplitText(line1Ref.current, { type: "chars" });
      const split2 = new SplitText(line2Ref.current, { type: "chars" });
      const split3 = new SplitText(line3Ref.current, { type: "chars" });
      const allChars = [...split1.chars, ...split2.chars, ...split3.chars];

      gsap.set(allChars, { opacity: 0.1, color: "var(--muted)" });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=220%",
        pin: innerRef.current,
        scrub: 0.9,
        onUpdate: (self) => {
          const progress = self.progress;
          const revealCount = Math.floor(progress * allChars.length * 1.15);
          allChars.forEach((char, i) => {
            if (i < revealCount) {
              (char as HTMLElement).style.opacity = "1";
              (char as HTMLElement).style.color = i < split1.chars.length ? "var(--ink)" : i < split1.chars.length + split2.chars.length ? "var(--accent)" : "var(--ink)";
            } else {
              (char as HTMLElement).style.opacity = "0.1";
              (char as HTMLElement).style.color = "var(--muted)";
            }
          });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: "320vh", background: "var(--surface)" }}
      aria-label="Philosophy"
    >
      <div
        ref={innerRef}
        className="sticky top-0 min-h-screen flex items-center px-6 md:px-12 overflow-hidden"
        style={{ background: "var(--surface)" }}
      >
        <div className="max-w-7xl mx-auto w-full">
          <p className="t-caption mb-10" style={{ color: "var(--accent)" }}>
            The belief that drives it
          </p>
          {/* Accessible text hidden, visual chars revealed by JS */}
          <p className="sr-only">
            Systems should scale. Data should decide. Technology should amplify human potential.
          </p>
          <div aria-hidden="true">
            <div
              ref={line1Ref}
              className="t-hero block leading-none mb-1"
              style={{ color: "var(--ink)" }}
            >
              SYSTEMS SCALE.
            </div>
            <div
              ref={line2Ref}
              className="t-hero block leading-none mb-1"
              style={{ color: "var(--accent)" }}
            >
              DATA DECIDES.
            </div>
            <div
              ref={line3Ref}
              className="t-hero block leading-none"
              style={{ color: "var(--ink)" }}
            >
              TECH AMPLIFIES.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
