"use client";
import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/app/lib/gsap";
import { useReducedMotion } from "@/app/hooks/useReducedMotion";

/* Placeholder testimonials — replace with actual quotes when available */
const TESTIMONIALS = [
  {
    quote:
      "What sets Rajarajan apart is that he doesn't manage institutions — he builds them. The financial discipline he brought to SMV Trust gave us the confidence to expand at a pace none of us thought possible.",
    author: "Senior Administrative Leader",
    title: "Sri Manakula Vinayagar Educational Trust",
  },
  {
    quote:
      "Bloombyte isn't just software — it's a philosophy about how data should flow through an institution. The campus management system they built for us reduced administrative overhead by a third.",
    author: "Academic Director",
    title: "Partner Institution, South India",
  },
  {
    quote:
      "As Pro Chancellor, he brings the rare combination of financial pragmatism and academic idealism. He asks the hard questions before the money is spent, not after.",
    author: "Faculty Leadership Representative",
    title: "Takshashila University",
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const quoteRef = useRef<HTMLQuoteElement>(null);
  const reduced = useReducedMotion();

  const goTo = (idx: number) => {
    if (!quoteRef.current) return;
    if (reduced) { setActive(idx); return; }

    gsap.to(quoteRef.current, {
      opacity: 0,
      y: -8,
      duration: 0.28,
      onComplete: () => {
        setActive(idx);
        gsap.fromTo(
          quoteRef.current,
          { opacity: 0, y: 8 },
          { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" }
        );
      },
    });
  };

  useEffect(() => {
    if (reduced) return;

    const ctx = gsap.context(() => {
      gsap.set(sectionRef.current, { opacity: 0 });
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 82%",
        once: true,
        onEnter: () => {
          gsap.to(sectionRef.current, { opacity: 1, duration: 0.9, ease: "power2.out" });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reduced]);

  const t = TESTIMONIALS[active];

  return (
    <section
      ref={sectionRef}
      className="px-6 md:px-12"
      style={{
        paddingTop: "var(--section-gap)",
        paddingBottom: "var(--section-gap)",
        background: "var(--surface)",
        opacity: reduced ? 1 : 0,
      }}
      aria-labelledby="testimonials-heading"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-16 border-b pb-8" style={{ borderColor: "#C8C4BC" }}>
          <h2 id="testimonials-heading" className="t-caption" style={{ color: "var(--accent)" }}>
            In their words
          </h2>
          <div className="flex gap-3" role="tablist" aria-label="Testimonials navigation">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === active}
                aria-label={`Testimonial ${i + 1}`}
                onClick={() => goTo(i)}
                className="transition-all duration-300 block"
                style={{
                  background: i === active ? "var(--ink)" : "#C8C4BC",
                  width: i === active ? "3rem" : "1.5rem",
                  height: "2px",
                  border: "none",
                  padding: "8px 0",
                  cursor: "pointer",
                }}
              />
            ))}
          </div>
        </div>

        <blockquote ref={quoteRef}>
          <p
            className="mb-10 leading-snug"
            style={{
              color: "var(--ink)",
              fontFamily: "var(--font-body)",
              fontSize: "clamp(1.4rem, 2.8vw, 2.8rem)",
              letterSpacing: "-0.02em",
              lineHeight: 1.25,
            }}
          >
            &ldquo;{t.quote}&rdquo;
          </p>
          <footer className="flex flex-col gap-1">
            <p className="t-caption" style={{ color: "var(--ink)" }}>{t.author}</p>
            <p className="t-caption" style={{ color: "var(--muted)" }}>{t.title}</p>
          </footer>
        </blockquote>
      </div>
    </section>
  );
}
