"use client";
import Marquee from "@/app/components/Marquee";

const CREDENTIALS = [
  "Treasurer · SMV Trust",
  "Treasurer · MSSE Trust",
  "Pro Chancellor · Takshashila University",
  "CEO · Bloombyte EdTech ERP",
  "10 Institutions",
  "20,000+ Students",
  "1,180-Bed Teaching Hospital",
  "40 Lakh+ Free Treatments",
  "AI-Driven Campus Management",
];

export default function IdentityBand() {
  return (
    <section
      className="py-9 border-b"
      style={{ borderColor: "#C8C4BC", background: "var(--surface)" }}
      aria-label="Key credentials"
    >
      <Marquee
        items={CREDENTIALS}
        speed={38}
        className="t-caption"
        separator="·"
      />
    </section>
  );
}
