"use client";
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/app/lib/gsap";
import { useReducedMotion } from "@/app/hooks/useReducedMotion";

const PROJECTS = [
  {
    index: "01",
    title: "SMV Group & MSSE Trust",
    category: "Institutional Governance",
    role: "Treasurer",
    description:
      "Overseeing strategy and operations for 10 institutions — engineering, medical, nursing, polytechnic, school, and hotel management — plus a 1,180-bed super-speciality hospital delivering 40 lakh+ free treatments. Every budget defended, every audit passed.",
    link: "https://smvec.ac.in/",
    accent: "#1A4D8F",
  },
  {
    index: "02",
    title: "Takshashila University",
    category: "Academic Leadership",
    role: "Pro Chancellor",
    description:
      "Providing academic vision and strategic leadership to strengthen research culture, drive innovation, and build student-centric education at scale. The job no one sees but everyone depends on.",
    link: "https://takshashilauniv.ac.in/",
    accent: "#C4622D",
  },
  {
    index: "03",
    title: "Bloombyte EdTech ERP",
    category: "Entrepreneurship & Digital Transformation",
    role: "Chief Executive Officer",
    description:
      "Built an AI-powered, cloud-native campus management platform from the ground up. Designed to streamline academic operations, improve institutional efficiency, and enable data-driven decision-making across institutions in India.",
    link: "https://bloombyte.io/",
    accent: "#2D7A4F",
  },
  {
    index: "04",
    title: "Mailam Subramaniya Swamy Trust",
    category: "Multi-Campus Stewardship",
    role: "Trustee & Treasurer",
    description:
      "Financial and strategic oversight of Mailam Engineering College, Mailam Nursing College, and Mailam Institute of Hotel Management — a diverse portfolio demanding precision resource allocation across disciplines.",
    link: "https://mailamengg.ac.in/about-us/",
    accent: "#7A4D8F",
  },
];

export default function SelectedWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".work-card");
      cards.forEach((card) => {
        gsap.set(card, { opacity: 0, y: 50 });
        ScrollTrigger.create({
          trigger: card,
          start: "top 87%",
          once: true,
          onEnter: () => {
            gsap.to(card, { opacity: 1, y: 0, duration: 0.85, ease: "power3.out" });
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={sectionRef}
      className="px-6 md:px-12"
      style={{
        paddingTop: "var(--section-gap)",
        paddingBottom: "var(--section-gap)",
        background: "var(--bg)",
      }}
      aria-labelledby="work-heading"
    >
      <div className="max-w-7xl mx-auto">
        <div
          className="flex items-end justify-between mb-16 md:mb-20 pb-8 border-b"
          style={{ borderColor: "#C8C4BC" }}
        >
          <h2 id="work-heading" className="t-display" style={{ color: "var(--ink)" }}>
            Roles &<br />Ventures
          </h2>
          <p className="t-caption hidden md:block" style={{ color: "var(--muted)" }}>
            Active positions
          </p>
        </div>

        <div>
          {PROJECTS.map((project) => (
            <a
              key={project.index}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="work-card group block border-b py-10 md:py-14 grid md:grid-cols-12 gap-4 md:gap-8 items-start no-underline"
              style={{ borderColor: "#C8C4BC", textDecoration: "none" }}
              data-cursor
              aria-label={`${project.title} — ${project.role}`}
            >
              <span
                className="t-caption md:col-span-1 pt-1"
                style={{ color: "var(--muted)" }}
                aria-hidden="true"
              >
                {project.index}
              </span>

              <div className="md:col-span-4">
                <p className="t-caption mb-2" style={{ color: project.accent }}>
                  {project.category}
                </p>
                <h3
                  className="t-heading mb-1 transition-colors duration-300 group-hover:underline"
                  style={{ color: "var(--ink)", textUnderlineOffset: "4px" }}
                >
                  {project.title}
                </h3>
                <p className="t-caption" style={{ color: "var(--muted)" }}>
                  {project.role}
                </p>
              </div>

              <p
                className="t-body md:col-span-6 md:col-start-6"
                style={{ color: "var(--muted)" }}
              >
                {project.description}
              </p>

              <div
                className="md:col-span-1 flex justify-end items-start pt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                aria-hidden="true"
              >
                <span style={{ color: "var(--accent)", fontSize: "1.25rem" }}>↗</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
