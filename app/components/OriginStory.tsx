"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/app/lib/gsap";
import { useReducedMotion } from "@/app/hooks/useReducedMotion";

const BLOCKS = [
  {
    image: "/images/DSC07519.JPG.jpeg",
    position: "left" as const,
    caption: "Background & Early Stewardship",
    body: "Born into a family that believed institutions could change lives, I took on the stewardship of SMV Group & MSSE Trust at a formative age. What began as learning the ropes became a lifelong conviction: that the right education, delivered with care, is the most equitable force in society.",
  },
  {
    image: "/images/DSC09809.JPG.jpeg",
    position: "right" as const,
    caption: "Institutional Reach & Impact",
    body: "Today I oversee 10 institutions — engineering colleges, a medical school, a super-speciality hospital, and a nursing college — with 20,000+ students and 40 lakh free treatments delivered. Every number is a decision I have been accountable for.",
  },
];

export default function OriginStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      // Fade-up each text block on scroll
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.set(el, { opacity: 0, y: 30 });
        ScrollTrigger.create({
          trigger: el,
          start: "top 85%",
          once: true,
          onEnter: () => gsap.to(el, { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" }),
        });
      });

      // Parallax on images
      gsap.utils.toArray<HTMLElement>("[data-parallax-img]").forEach((img) => {
        gsap.to(img, {
          yPercent: -8,
          ease: "none",
          scrollTrigger: { trigger: img, start: "top bottom", end: "bottom top", scrub: 1.5 },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={sectionRef}
      style={{ background: "var(--bg)" }}
      aria-labelledby="origin-heading"
    >
      {/* ── Container ────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12" style={{ paddingTop: "var(--section-gap)" }}>

        {/* ── Intro rule ── */}
        <div className="flex items-center gap-6 mb-12">
          <span className="t-caption" style={{ color: "var(--accent)" }}>About</span>
          <div className="flex-1 h-px" style={{ background: "#C8C4BC" }} />
          <span className="t-caption" style={{ color: "var(--muted)" }}>Rajarajan Dhanasekaran</span>
        </div>

        {/* ── Two editorial blocks ── */}
        {BLOCKS.map((block, i) => (
          <div
            key={i}
            className="grid md:grid-cols-2 mb-px items-stretch"
            style={{}}
          >
            {/* Image side */}
            <div
              className={`relative overflow-hidden ${block.position === "right" ? "md:order-2" : ""}`}
              style={{ minHeight: "280px" }}
            >
              <div data-parallax-img className="absolute inset-0" style={{ top: "-8%", bottom: "-8%" }}>
                <Image
                  src={block.image}
                  alt=""
                  fill
                  sizes="40vw"
                  style={{ objectFit: "cover", objectPosition: "center top", filter: "grayscale(18%)" }}
                  aria-hidden="true"
                />
              </div>
            </div>

            {/* Text side */}
            <div
              className={`flex flex-col justify-start px-8 py-10 ${block.position === "right" ? "md:order-1" : ""}`}
              style={{ background: "var(--bg)" }}
            >
              <p
                data-reveal
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "clamp(0.65rem, 0.75vw, 0.75rem)",
                  fontWeight: 500,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--accent)",
                  marginBottom: "0.75rem",
                }}
              >
                {block.caption}
              </p>
              <p
                data-reveal
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "clamp(0.8rem, 0.95vw, 0.9rem)",
                  color: "var(--ink)",
                  lineHeight: 1.8,
                }}
              >
                {block.body}
              </p>
            </div>
          </div>
        ))}


      </div>{/* end container */}
    </section>
  );
}
