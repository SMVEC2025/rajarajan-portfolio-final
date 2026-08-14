"use client";

import Image from "next/image";

const TOP_LOGOS = [
  { name: "Manakula Vinayagar Institute of Technology", src: "/images/institution-logos/mvit.png" },
  { name: "Mailam Engineering College", src: "/images/institution-logos/mailam.png" },
  { name: "Thakshashila University", src: "/images/institution-logos/takshashila.png" },
];

const BOTTOM_LOGOS = [
  { name: "Bloombyte", src: "/images/institution-logos/bloombyte.png" },
  { name: "Manakula Vinayagar Medical College & Hospital", src: "/images/institution-logos/smvmch.png" },
  { name: "SMV Super Speciality Hospital", src: "/images/institution-logos/ssp.png" },
];

const CENTER_LOGO = {
  name: "Sri Manakula Vinayagar Engineering College",
  src: "/images/institution-logos/smvec.png",
};

const PHOTO_RIGHT = {
  src: "/images/mocked-images/rightupdated.png",
  alt: "Rajarajan Dhanasekaran speaking at an event",
};
const PHOTO_LEFT = {
  src: "/images/mocked-images/leftupdated.png",
  alt: "Rajarajan Dhanasekaran on stage",
};

const B = "1px solid #C8C4BC";

function LogoCell({ name, src }: { name: string; src: string }) {
  return (
    <div
      className="w-full h-full flex items-center justify-center"
      style={{ padding: "2rem" }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={name}
        className="logo-cell-img"
        style={{ maxHeight: "52px", maxWidth: "160px", objectFit: "contain", display: "block" }}
        onError={(e) => {
          const t = e.currentTarget as HTMLImageElement;
          t.style.display = "none";
          const fb = t.nextElementSibling as HTMLElement | null;
          if (fb) fb.style.display = "block";
        }}
      />
      <span className="t-caption text-center" style={{ color: "var(--muted)", display: "none" }}>
        {name}
      </span>
    </div>
  );
}

export default function InstitutionGrid() {
  return (
    <section
      aria-label="Institutions and ventures"
      style={{
        background: "var(--bg)",
        paddingTop: "4rem",
        paddingBottom: "var(--section-gap)",
      }}
    >
      <div className="px-6 md:px-12 max-w-7xl mx-auto">

        {/* ── Desktop grid (md+) ── */}
        {/*
          4 cols × 3 rows.
          Col 4 rows 1-2: right photo
          Col 1 rows 2-3: left photo
          Col 2-3 row 2: SMVEC logo
          All internal lines drawn per-cell so every line is complete.
        */}
        <div
          className="hidden md:grid institution-grid"
          style={{
            gridTemplateColumns: "repeat(4, 1fr)",
            gridTemplateRows: "160px 220px 160px",
          }}
        >
          {/* R1C1 — MVIT */}
          <div style={{ borderRight: B, borderBottom: B }}>
            <LogoCell {...TOP_LOGOS[0]} />
          </div>

          {/* R1C2 — Mailam */}
          <div style={{ borderRight: B, borderBottom: B }}>
            <LogoCell {...TOP_LOGOS[1]} />
          </div>

          {/* R1C3 — Thakshashila */}
          <div style={{ borderRight: B, borderBottom: B }}>
            <LogoCell {...TOP_LOGOS[2]} />
          </div>

          {/* R1-2 C4 — Right photo, spans 2 rows */}
          <div
            style={{
              gridRow: "1 / 3",
              gridColumn: "4",
              borderBottom: B,
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "flex-start",
              padding: "0 0 28px 28px",
            }}
          >
            <div style={{ background: "#8A7461", padding: "15px", width: "fit-content", height: "fit-content", position: "relative" }}>
              <Image
                src={PHOTO_RIGHT.src}
                alt={PHOTO_RIGHT.alt}
                width={320}
                height={380}
                style={{ width: "100%", height: "auto", display: "block" }}
              />
              {/* Bottom overlay */}
              <div
                style={{
                  position: "absolute",
                  bottom: "15px",
                  left: "15px",
                  right: "15px",
                  padding: "7px",
                  background: "linear-gradient(to top, rgba(0,0,0,0.82) 60%, transparent 100%)",
                }}
              >
                <p style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1rem",
                  fontWeight: 600,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "#fff",
                  marginBottom: "0.15rem",
                }}>
                  The Faculty
                </p>
                <p style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.65rem",
                  lineHeight: 1.3,
                  color: "rgba(255,255,255,0.75)",
                }}>
                  Treasurer of the SMV Group &amp; MSSE Trust, overseeing 10 institutions across education and healthcare.
                </p>
              </div>
            </div>
          </div>

          {/* R2-3 C1 — Left photo, spans 2 rows */}
          <div
            style={{
              gridRow: "2 / 4",
              gridColumn: "1",
              borderRight: B,
              borderTop: B,
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "flex-end",
              padding: "28px 28px 0 0",
            }}
          >
            <div style={{ background: "#8A7461", padding: "15px", width: "fit-content", height: "fit-content", position: "relative" }}>
              <Image
                src={PHOTO_LEFT.src}
                alt={PHOTO_LEFT.alt}
                width={320}
                height={380}
                style={{ width: "100%", height: "auto", display: "block" }}
              />
              {/* Bottom overlay */}
              <div
                style={{
                  position: "absolute",
                  bottom: "15px",
                  left: "15px",
                  right: "15px",
                  padding: "7px",
                  background: "linear-gradient(to top, rgba(0,0,0,0.82) 60%, transparent 100%)",
                }}
              >
                <p style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1rem",
                  fontWeight: 600,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "#fff",
                  marginBottom: "0.15rem",
                }}>
                  The Stage
                </p>
                <p style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.65rem",
                  lineHeight: 1.3,
                  color: "rgba(255,255,255,0.75)",
                }}>
                  Leading events and cultural initiatives across the SMV Group institutions.
                </p>
              </div>
            </div>
          </div>

          {/* R2 C2-3 — SMVEC center logo, spans 2 cols */}
          <div
            style={{
              gridRow: "2",
              gridColumn: "2 / 4",
              borderRight: B,
              borderBottom: B,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "2rem",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={CENTER_LOGO.src}
              alt={CENTER_LOGO.name}
              className="logo-cell-img-center"
            style={{ maxHeight: "64px", maxWidth: "280px", objectFit: "contain", display: "block" }}
              onError={(e) => {
                const t = e.currentTarget as HTMLImageElement;
                t.style.display = "none";
                const fb = t.nextElementSibling as HTMLElement | null;
                if (fb) fb.style.display = "block";
              }}
            />
            <span className="t-caption text-center" style={{ color: "var(--muted)", display: "none" }}>
              {CENTER_LOGO.name}
            </span>
          </div>

          {/* R3 C2 — Bloombyte */}
          <div style={{ gridRow: "3", gridColumn: "2", borderRight: B, borderTop: B }}>
            <LogoCell {...BOTTOM_LOGOS[0]} />
          </div>

          {/* R3 C3 — MVMCH */}
          <div style={{ gridRow: "3", gridColumn: "3", borderRight: B, borderTop: B }}>
            <LogoCell {...BOTTOM_LOGOS[1]} />
          </div>

          {/* R3 C4 — SMV Hospital */}
          <div style={{ gridRow: "3", gridColumn: "4", borderTop: B }}>
            <LogoCell {...BOTTOM_LOGOS[2]} />
          </div>
        </div>

        {/* ── Mobile layout ── */}
        <div className="md:hidden">
          <div className="grid grid-cols-2" style={{ height: "260px", borderBottom: B }}>
            <div style={{ borderRight: B, padding: "12px" }}>
              <div className="relative w-full h-full">
                <Image src={PHOTO_LEFT.src} alt={PHOTO_LEFT.alt} fill sizes="50vw" style={{ objectFit: "contain" }} />
              </div>
            </div>
            <div style={{ padding: "12px" }}>
              <div className="relative w-full h-full">
                <Image src={PHOTO_RIGHT.src} alt={PHOTO_RIGHT.alt} fill sizes="50vw" style={{ objectFit: "contain" }} />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2">
            {[CENTER_LOGO, ...TOP_LOGOS, ...BOTTOM_LOGOS].map((logo, i, arr) => (
              <div
                key={logo.name}
                style={{
                  borderRight: i % 2 === 0 ? B : undefined,
                  borderBottom: i < arr.length - 2 ? B : undefined,
                  height: "100px",
                }}
              >
                <LogoCell {...logo} />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
