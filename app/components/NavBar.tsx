"use client";

import { useState, useEffect } from "react";
import MeetingForm from "@/app/components/MeetingForm";

export default function NavBar() {
  const [formOpen, setFormOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [onDark, setOnDark] = useState(true);
  const [overHeroV2, setOverHeroV2] = useState(true);

  useEffect(() => {
    const getBg = (el: Element | null): string => {
      let cur = el;
      while (cur && cur !== document.documentElement) {
        const bg = window.getComputedStyle(cur).backgroundColor;
        if (bg && bg !== "rgba(0, 0, 0, 0)" && bg !== "transparent") return bg;
        cur = cur.parentElement;
      }
      return "rgb(247,244,239)";
    };

    const isColorDark = (rgb: string): boolean => {
      const m = rgb.match(/\d+/g);
      if (!m) return false;
      const [r, g, b] = m.map(Number);
      return (0.299 * r + 0.587 * g + 0.114 * b) < 160;
    };

    const update = () => {
      const x = window.innerWidth - 80;
      const y = 40;
      const els = document.elementsFromPoint(x, y);
      const el = els.find(e => !e.closest("header") && !e.closest("nav")) ?? null;
      const hasDarkAttr = els.some(e => e.hasAttribute("data-dark"));
      setOnDark(hasDarkAttr || isColorDark(getBg(el)));
      setOverHeroV2(els.some(e => e.closest("[data-hero-v2]") !== null));
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    const openForm = () => setFormOpen(true);
    window.addEventListener("open-meeting-form", openForm);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("open-meeting-form", openForm);
    };
  }, []);

  return (
    <>
      <header
        className="fixed top-0 right-0 z-50 pointer-events-none w-full"
        aria-label="Site navigation"
      >
        <nav className="flex justify-end px-2.5 py-5 sm:px-10 sm:py-6 lg:px-12 lg:py-7">
          <button
            onClick={() => setFormOpen(true)}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="pointer-events-auto"
            style={{
              opacity: overHeroV2 ? 0 : 1,
              pointerEvents: overHeroV2 ? "none" : "auto",
              visibility: overHeroV2 ? "hidden" : "visible",
              fontFamily: "var(--font-josefin)",
              fontSize: "clamp(0.58rem, 0.75vw, 0.72rem)",
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: onDark ? "#111" : "#fff",
              background: onDark ? (hovered ? "#e8e8e8" : "#fff") : (hovered ? "#223d76" : "#1a3062"),
              border: "1px solid transparent",
              borderRadius: "0",
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              gap: "0.45em",
              padding: "0.74em 1.18em",
              transform: hovered ? "translateY(-1px)" : "translateY(0)",
              transition: "background 0.25s ease, color 0.25s ease, transform 0.25s ease",
            }}
          >
            Schedule a Meet
            <svg width="9" height="9" viewBox="0 0 9 9" fill="none" aria-hidden="true">
              <path d="M1 8L8 1M8 1H2M8 1V7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </nav>
      </header>

      <MeetingForm open={formOpen} onClose={() => setFormOpen(false)} />
    </>
  );
}
