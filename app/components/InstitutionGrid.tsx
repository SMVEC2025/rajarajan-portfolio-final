"use client";

import Image from "next/image";

const TOP_LOGOS = [
  { name: "Manakula Vinayagar Institute of Technology", src: "/images/institution-logos/mvit.png", href: "https://mvit.edu.in/" },
  { name: "Mailam Engineering College", src: "/images/institution-logos/mailam.png", href: "https://mailamengg.ac.in/" },
  { name: "Thakshashila University", src: "/images/institution-logos/takshashila.png", href: "https://takshashilauniv.ac.in/" },
];

const BOTTOM_LOGOS = [
  { name: "Bloombyte", src: "/images/institution-logos/bloombyte.png", href: "https://bloombyte.io/" },
  { name: "Manakula Vinayagar Medical College & Hospital", src: "/images/institution-logos/smvmch.png", href: "https://smvmch.ac.in/" },
  { name: "SMV Super Speciality Hospital", src: "/images/institution-logos/ssp.png", href: "https://smvhospitals.com/" },
];

const CENTER_LOGO = {
  name: "Sri Manakula Vinayagar Engineering College",
  src: "/images/institution-logos/smvec.png",
  href: "https://smvec.ac.in/",
};

const SCHOOL_LOGO = {
  name: "SMV School",
  src: "/images/institution-logos/smvschool.png",
  href: "https://smvschool.com/",
};

/* Fourth row — flanking the bottom frame photo */
const ROW4_LOGOS = [
  { name: "Sri Manakula Vinayagar Nursing College", src: "/images/institution-logos/nursing.png", href: "https://smvnc.ac.in/" },
  { name: "Sri Manakula Vinayagar Polytechnic College", src: "/images/institution-logos/polytechnic.png", href: "https://smvptc.edu.in/" },
  { name: "Venkateswara College of Education", src: "/images/institution-logos/venkateshwaraa.png", href: "https://vcedu.ac.in/" },
];

const PHOTO_RIGHT = {
  src: "/images/mocked-images/rightupdated.png",
  alt: "Rajarajan Dhanasekaran speaking at an event",
};
const PHOTO_LEFT = {
  src: "/images/mocked-images/leftupdated.png",
  alt: "Rajarajan Dhanasekaran on stage",
};
const PHOTO_BOTTOM = {
  src: "/images/mocked-images/frame-bottom.png",
  alt: "Rajarajan Dhanasekaran addressing an audience",
};

const B = "1px solid #C8C4BC";

function LogoCell({ name, src, href }: { name: string; src: string; href?: string }) {
  const inner = (
    <>
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
    </>
  );

  const boxStyle: React.CSSProperties = { padding: "2rem" };

  if (!href) {
    return (
      <div className="w-full h-full flex items-center justify-center" style={boxStyle}>
        {inner}
      </div>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${name} — opens in a new tab`}
      className="logo-cell-link w-full h-full flex items-center justify-center"
      style={boxStyle}
    >
      {inner}
    </a>
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
            gridTemplateRows: "160px 220px 160px 200px",
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
              borderBottom: B,
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

          {/* R2 C2 — SMVEC center logo */}
          <div
            style={{
              gridRow: "2",
              gridColumn: "2",
              borderRight: B,
              borderBottom: B,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "2rem",
            }}
          >
            <a
              href={CENTER_LOGO.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${CENTER_LOGO.name} — opens in a new tab`}
              className="logo-cell-link flex items-center justify-center"
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
            </a>
          </div>

          {/* R2 C3 — SMV School */}
          <div style={{ gridRow: "2", gridColumn: "3", borderRight: B, borderBottom: B }}>
            <LogoCell {...SCHOOL_LOGO} />
          </div>

          {/* R3 C2 — Bloombyte */}
          <div style={{ gridRow: "3", gridColumn: "2", borderRight: B, borderBottom: B }}>
            <LogoCell {...BOTTOM_LOGOS[0]} />
          </div>

          {/* R3 C3 — MVMCH */}
          <div style={{ gridRow: "3", gridColumn: "3", borderRight: B, borderBottom: B }}>
            <LogoCell {...BOTTOM_LOGOS[1]} />
          </div>

          {/* R3 C4 — SMV Hospital */}
          <div style={{ gridRow: "3", gridColumn: "4", borderBottom: B }}>
            <LogoCell {...BOTTOM_LOGOS[2]} />
          </div>

          {/* R4 C1 — Nursing College */}
          <div style={{ gridRow: "4", gridColumn: "1", borderRight: B }}>
            <LogoCell {...ROW4_LOGOS[0]} />
          </div>

          {/* R4 C2 — Polytechnic College */}
          <div style={{ gridRow: "4", gridColumn: "2", borderRight: B }}>
            <LogoCell {...ROW4_LOGOS[1]} />
          </div>

          {/* R4 C3 — Bottom frame photo, overlaps upward like the ref */}
          <div
            style={{
              gridRow: "4",
              gridColumn: "3",
              borderRight: B,
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "center",
              padding: "0 12px",
            }}
          >
            {/* z-index lifts the mat above the row's top border so the photo
                overlaps the grid line instead of being crossed by it. */}
            <div style={{ background: "#8A7461", padding: "15px", width: "fit-content", position: "relative", marginTop: "-40px", zIndex: 1 }}>
              <Image
                src={PHOTO_BOTTOM.src}
                alt={PHOTO_BOTTOM.alt}
                width={320}
                height={240}
                style={{ width: "100%", height: "auto", display: "block" }}
              />
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
                  The Address
                </p>
                <p style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.65rem",
                  lineHeight: 1.3,
                  color: "rgba(255,255,255,0.75)",
                }}>
                  Addressing students and faculty across the group&apos;s campuses.
                </p>
              </div>
            </div>
          </div>

          {/* R4 C4 — Venkateswara College of Education */}
          <div style={{ gridRow: "4", gridColumn: "4" }}>
            <LogoCell {...ROW4_LOGOS[2]} />
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
          <div style={{ borderBottom: B, padding: "16px 12px" }}>
            <div className="relative w-full" style={{ height: "200px" }}>
              <Image src={PHOTO_BOTTOM.src} alt={PHOTO_BOTTOM.alt} fill sizes="100vw" style={{ objectFit: "contain" }} />
            </div>
          </div>
          <div className="grid grid-cols-2">
            {[CENTER_LOGO, ...TOP_LOGOS, SCHOOL_LOGO, ...BOTTOM_LOGOS, ...ROW4_LOGOS].map((logo, i, arr) => (
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
