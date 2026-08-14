"use client";
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, SplitText } from "@/app/lib/gsap";
import { useReducedMotion } from "@/app/hooks/useReducedMotion";
import Marquee from "@/app/components/Marquee";

const INSTITUTIONS = [
  { name: "SMVEC", href: "https://smvec.ac.in/" },
  { name: "SMVMCH", href: "https://smvmch.ac.in/" },
  { name: "MVIT", href: "https://mvit.edu.in/" },
  { name: "SMVPTC", href: "https://smvptc.edu.in/" },
  { name: "SMVNC", href: "https://smvnc.ac.in/" },
  { name: "SMV School", href: "https://smvschool.com/" },
  { name: "SMV Hospitals", href: "https://smvhospitals.com/" },
  { name: "Mailam Engg", href: "https://mailamengg.ac.in/about-us/" },
  { name: "Mailam Nursing", href: "https://mnc.ac.in/about-us/" },
  { name: "MIHM", href: "https://mihm.ac.in/about-us/" },
  { name: "Takshashila Univ", href: "https://takshashilauniv.ac.in/" },
  { name: "Bloombyte", href: "https://bloombyte.io/" },
];

export default function CTAFooter() {
  const sectionRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLHeadingElement>(null);
  const btnRef = useRef<HTMLAnchorElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !ctaRef.current) return;

    const ctx = gsap.context(() => {
      const split = new SplitText(ctaRef.current, { type: "lines,words" });
      gsap.set(split.words, { y: "110%", opacity: 0 });
      ScrollTrigger.create({
        trigger: ctaRef.current,
        start: "top 82%",
        once: true,
        onEnter: () => {
          gsap.to(split.words, { y: "0%", opacity: 1, duration: 1, ease: "power3.out", stagger: 0.038 });
        },
      });

      gsap.set(btnRef.current, { opacity: 0, y: 18 });
      ScrollTrigger.create({
        trigger: btnRef.current,
        start: "top 92%",
        once: true,
        onEnter: () => {
          gsap.to(btnRef.current, { opacity: 1, y: 0, duration: 0.7, delay: 0.25, ease: "power2.out" });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <footer ref={sectionRef}>
      {/* CTA section */}
      <section
        className="px-6 md:px-12"
        style={{
          background: "var(--bg)",
          paddingTop: "var(--section-gap)",
          paddingBottom: "calc(var(--section-gap) * 0.7)",
          borderTop: "1px solid #C8C4BC",
        }}
        aria-labelledby="cta-heading"
      >
        <div className="max-w-7xl mx-auto">
          <p className="t-caption mb-8" style={{ color: "var(--accent)" }}>
            Connect & collaborate
          </p>
          <div className="overflow-clip mb-12">
            <h2
              ref={ctaRef}
              id="cta-heading"
              className="t-hero"
              style={{ color: "var(--ink)", fontSize: "clamp(2.8rem, 8vw, 8rem)" }}
            >
              Let&apos;s build something that lasts.
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
            <a
              ref={btnRef}
              href="mailto:design@smvec.ac.in"
              className="inline-flex items-center gap-4 group opacity-0"
              style={{ textDecoration: "none" }}
              data-cursor
              aria-label="Send an email to Rajarajan"
            >
              <span
                className="border-b transition-colors duration-300 group-hover:border-accent"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "clamp(1.1rem, 2vw, 1.8rem)",
                  color: "var(--ink)",
                  borderColor: "#C8C4BC",
                  paddingBottom: "2px",
                  letterSpacing: "-0.01em",
                }}
              >
                design@smvec.ac.in
              </span>
              <span
                className="flex-shrink-0 w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 group-hover:bg-accent group-hover:border-accent group-hover:text-bg text-accent"
                style={{ borderColor: "var(--accent)", color: "var(--accent)", fontSize: "1rem" }}
                aria-hidden="true"
              >
                ↗
              </span>
            </a>
          </div>

          {/* Open-to tags */}
          <div className="mt-12 flex flex-wrap gap-2" aria-label="Areas of engagement">
            {[
              "Academic Collaborations",
              "Governance & Leadership",
              "EdTech & Digital Transformation",
              "Strategic Partnerships",
            ].map((tag) => (
              <span
                key={tag}
                className="t-caption px-3 py-1 rounded-full border"
                style={{ borderColor: "#C8C4BC", color: "var(--muted)" }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Institution links grid */}
      <section
        className="px-6 md:px-12 py-16 border-t border-b"
        style={{ borderColor: "#C8C4BC", background: "var(--surface)" }}
        aria-label="Institutions"
      >
        <div className="max-w-7xl mx-auto">
          <p className="t-caption mb-8" style={{ color: "var(--muted)" }}>The institutions</p>
          <div className="flex flex-wrap gap-x-6 gap-y-3">
            {INSTITUTIONS.map((inst) => (
              <a
                key={inst.name}
                href={inst.href}
                target="_blank"
                rel="noopener noreferrer"
                className="t-caption transition-colors duration-200 hover:text-accent"
                style={{ color: "var(--muted)", textDecoration: "none" }}
                data-cursor
              >
                {inst.name} ↗
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Scrolling name band */}
      <div
        className="py-6 border-b overflow-hidden"
        style={{ borderColor: "#C8C4BC", background: "var(--bg)" }}
        aria-hidden="true"
      >
        <Marquee
          items={["Rajarajan Dhanasekaran"]}
          speed={28}
          className="t-display opacity-[0.12] uppercase select-none"
          separator="·"
        />
      </div>

      {/* Footer bar */}
      <div
        className="px-6 md:px-12 py-7 flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
        style={{ background: "var(--bg)" }}
      >
        <p className="t-caption" style={{ color: "var(--muted)" }}>
          © {new Date().getFullYear()} Rajarajan Dhanasekaran. All rights reserved.
        </p>
        <nav aria-label="Footer navigation">
          <ul className="flex flex-wrap gap-6 list-none p-0 m-0">
            {[
              { label: "Bloombyte", href: "https://bloombyte.io/" },
              { label: "Takshashila University", href: "https://takshashilauniv.ac.in/" },
              { label: "SMVEC", href: "https://smvec.ac.in/" },
              { label: "Email", href: "mailto:design@smvec.ac.in" },
            ].map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="t-caption transition-colors duration-200 hover:text-ink"
                  style={{ color: "var(--muted)", textDecoration: "none" }}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  data-cursor
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
