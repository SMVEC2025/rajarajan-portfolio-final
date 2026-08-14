"use client";
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, SplitText } from "@/app/lib/gsap";
import { useReducedMotion } from "@/app/hooks/useReducedMotion";
import Marquee from "@/app/components/Marquee";

const ENGAGEMENTS = [
  {
    title: "Academic & Institutional Collaborations",
    description:
      "Building partnerships between institutions, industry, and government that create real value — research pipelines, dual-degree programmes, and joint ventures that outlast the handshake.",
  },
  {
    title: "Governance & Leadership Advisory",
    description:
      "Practical guidance on institutional governance, trust administration, and financial stewardship — from setting up audit frameworks to navigating regulatory compliance.",
  },
  {
    title: "EdTech & Digital Transformation",
    description:
      "Strategy and implementation for AI-driven campus operations, data infrastructure, and technology adoption — the kind of change that sticks because it solves real problems.",
  },
  {
    title: "Strategic Partnerships",
    description:
      "Structuring alliances that make strategic sense and operational sense. Introductions, joint ventures, and long-term collaborations across education, healthcare, and technology.",
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLHeadingElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !headRef.current) return;

    const ctx = gsap.context(() => {
      const split = new SplitText(headRef.current, { type: "lines" });
      gsap.set(split.lines, { y: "100%", opacity: 0 });
      ScrollTrigger.create({
        trigger: headRef.current,
        start: "top 82%",
        once: true,
        onEnter: () => {
          gsap.to(split.lines, { y: "0%", opacity: 1, duration: 1, ease: "power3.out", stagger: 0.1 });
        },
      });

      const items = gsap.utils.toArray<HTMLElement>(".engagement-item");
      items.forEach((item, i) => {
        gsap.set(item, { opacity: 0, x: -16 });
        ScrollTrigger.create({
          trigger: item,
          start: "top 90%",
          once: true,
          onEnter: () => {
            gsap.to(item, { opacity: 1, x: 0, duration: 0.65, delay: i * 0.07, ease: "power2.out" });
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={sectionRef}
      style={{
        background: "var(--ink)",
        paddingTop: "var(--section-gap)",
        paddingBottom: "var(--section-gap)",
      }}
      aria-labelledby="engagement-heading"
    >
      {/* Background marquee — very faint */}
      <div className="mb-16 md:mb-24 overflow-hidden" aria-hidden="true">
        <Marquee
          items={["Open to"]}
          speed={20}
          className="t-display opacity-[0.06] select-none pointer-events-none"
          separator=""
        />
      </div>

      <div className="px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 md:gap-28 items-start">
          {/* Left */}
          <div>
            <p className="t-caption mb-6" style={{ color: "var(--accent2)" }}>
              Professional engagement
            </p>
            <div className="overflow-clip">
              <h2
                ref={headRef}
                id="engagement-heading"
                className="t-display"
                style={{ color: "var(--bg)" }}
              >
                Open to the right conversations.
              </h2>
            </div>
            <p className="t-body mt-8" style={{ color: "var(--muted)" }}>
              If you&apos;re building something in education, healthcare, or technology — and you need a partner who understands both institutions and innovation — let&apos;s talk.
            </p>
          </div>

          {/* Right */}
          <div className="space-y-0">
            {ENGAGEMENTS.map((item, i) => (
              <div
                key={item.title}
                className="engagement-item border-b py-8"
                style={{ borderColor: "#2A2A2A" }}
              >
                <p className="t-caption mb-3" style={{ color: "var(--muted)" }}>0{i + 1}</p>
                <h3 className="t-heading mb-3" style={{ color: "var(--bg)", fontSize: "clamp(1rem, 1.5vw, 1.3rem)" }}>
                  {item.title}
                </h3>
                <p className="t-body" style={{ color: "var(--muted)", fontSize: "0.95rem" }}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
