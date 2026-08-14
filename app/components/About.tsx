"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/app/lib/gsap";
import { useReducedMotion } from "@/app/hooks/useReducedMotion";

const STATS = [
  { value: 10,    suffix: "",   label: "Institutions under stewardship" },
  { value: 20000, suffix: "+",  label: "Students served across campuses" },
  { value: 40,    suffix: "L+", label: "Free treatments delivered" },
  { value: 1180,  suffix: "",   label: "Hospital beds — teaching & super-speciality" },
];

function AnimatedCounter({ value, suffix, reduced }: { value: number; suffix: string; reduced: boolean }) {
  const numRef = useRef<HTMLSpanElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!numRef.current || !triggerRef.current) return;
    if (reduced) { numRef.current.textContent = value.toLocaleString("en-IN"); return; }
    const obj = { val: 0 };
    ScrollTrigger.create({
      trigger: triggerRef.current,
      start: "top 80%",
      once: true,
      onEnter: () => {
        gsap.to(obj, {
          val: value,
          duration: 2.2,
          ease: "power2.out",
          onUpdate() {
            if (numRef.current)
              numRef.current.textContent = Math.round(obj.val).toLocaleString("en-IN");
          },
        });
      },
    });
  }, [value, reduced]);

  return (
    <div ref={triggerRef}>
      <span ref={numRef} className="tabular-nums">0</span>{suffix}
    </div>
  );
}

export default function About() {
  const sectionRef   = useRef<HTMLElement>(null);
  const labelRef     = useRef<HTMLParagraphElement>(null);
  const para2Ref     = useRef<HTMLParagraphElement>(null);
  const para3Ref     = useRef<HTMLParagraphElement>(null);
  const closingRef   = useRef<HTMLParagraphElement>(null);
  const reduced      = useReducedMotion();

  useEffect(() => {
    if (reduced) return;

    const ctx = gsap.context(() => {
      /* label */
      gsap.set(labelRef.current, { opacity: 0, y: 10 });
      ScrollTrigger.create({
        trigger: labelRef.current, start: "top 85%", once: true,
        onEnter: () => gsap.to(labelRef.current, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }),
      });

      /* paragraphs */
      [para2Ref, para3Ref, closingRef].forEach((ref, i) => {
        gsap.set(ref.current, { opacity: 0, y: 18 });
        ScrollTrigger.create({
          trigger: ref.current, start: "top 90%", once: true,
          onEnter: () =>
            gsap.to(ref.current, { opacity: 1, y: 0, duration: 0.75, delay: i * 0.07, ease: "power2.out" }),
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="about-heading"
      className="px-6 md:px-12"
      style={{
        paddingTop: "var(--section-gap)",
        paddingBottom: "4rem",
        background: "var(--bg)",
      }}
    >
      <div className="max-w-7xl mx-auto w-full">

        {/* ── Top row: label + section tag ── */}
        <div className="flex items-center gap-6 mb-16">
          <p ref={labelRef} className="t-caption" style={{ color: "#815933" }}>About</p>
          <div className="flex-1 h-px" style={{ background: "#C8C4BC" }} />
        </div>

        {/* ── Body copy ── */}
        <div className="grid md:grid-cols-12 gap-10 md:gap-16 items-stretch">

          {/* Left — image + caption below, image stretches to match right column height */}
          <div className="md:col-span-6 flex flex-col gap-5">
            <div className="relative overflow-hidden w-full flex-1" style={{ minHeight: "320px" }}>
              <Image
                src="/images/about/about-me.webp"
                alt="Rajarajan Dhanasekaran"
                fill
                sizes="60vw"
                style={{ objectFit: "cover", objectPosition: "center top" }}
              />
            </div>
          </div>

          {/* Detail paragraphs — right column */}
          <div className="md:col-span-6 flex flex-col gap-7">
            <p ref={para2Ref} className="t-body" style={{ color: "var(--muted)" }}>
              As Treasurer of Sri Manakula Vinayagar Educational Trust &amp; Mailam Subramaniya Swamy Trust, I oversee strategy and operations for 10 institutions serving 20,000+ students, supported by a 1,180-bed teaching hospital delivering 40 lakh+ free treatments.
            </p>

            <p ref={para3Ref} className="t-body" style={{ color: "var(--muted)" }}>
              I also serve as Pro Chancellor of Takshashila University and as CEO of Bloombyte, where we build AI-powered, cloud-native campus management platforms for institutions across India.
            </p>

            {/* Closing belief — stripped back, no border */}
            <p
              ref={closingRef}
              className="t-body"
              style={{
                color: "var(--ink)",
                paddingTop: "1.5rem",
                borderTop: "1px solid #C8C4BC",
                fontStyle: "italic",
                letterSpacing: "0.01em",
              }}
            >
              Systems should scale. Data should decide. Technology should amplify human potential.
            </p>
          </div>
        </div>

        {/* ── Stats row ── */}
        <div style={{ borderTop: "1px solid #C8C4BC", borderBottom: "1px solid #C8C4BC", marginTop: "3rem" }}>
          <div className="grid grid-cols-2 md:grid-cols-4">
            {STATS.map((stat, i) => (
              <div
                key={stat.label}
                className="px-6 py-8"
                style={{ borderRight: i < 3 ? "1px solid #C8C4BC" : "none" }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-josefin)",
                    fontSize: "clamp(1.6rem, 3vw, 3rem)",
                    fontWeight: 300,
                    lineHeight: 1,
                    color: "var(--ink)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} reduced={reduced} />
                </div>
                <p className="t-caption mt-2" style={{ color: "var(--muted)" }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
