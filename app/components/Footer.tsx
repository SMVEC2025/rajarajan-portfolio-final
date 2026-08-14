"use client";

import Image from "next/image";

function XIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.63 5.905-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4.5"/>
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}

const SOCIAL = [
  { label: "X", href: "https://x.com/", icon: <XIcon /> },
  { label: "Instagram", href: "https://instagram.com/", icon: <InstagramIcon /> },
  { label: "LinkedIn", href: "https://linkedin.com/in/rajarajandhanasekaran", icon: <LinkedInIcon /> },
];

const NAV = [
  { label: "Home", href: "#" },
  { label: "About", href: "#about" },
  { label: "Instagram", href: "#instagram" },
  { label: "LinkedIn", href: "#linkedin" },
  { label: "Meeting", href: "#contact" },
];

export default function Footer() {
  return (
    <footer>
      {/* ── Hero banner ── */}
      <div data-dark="" className="relative overflow-hidden" style={{ height: "clamp(400px, 55vw, 900px)" }}>
        <Image
          src="/images/footer/footerbg.webp"
          alt=""
          fill
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "center center" }}
          priority
          aria-hidden="true"
        />

        {/* bottom gradient to bleed into dark footer */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to bottom, transparent 40%, rgba(15,15,15,0.6) 85%, #0f0f0f 100%)",
          }}
          aria-hidden="true"
        />

        {/* FOLLOW … ME + social icons */}
        <div className="absolute bottom-0 left-0 right-0 pb-8">
        <div className="max-w-screen-2xl mx-auto px-8 sm:px-16 lg:px-24 flex items-end justify-between">
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.2rem, 5vw, 5.5rem)",
              fontWeight: 700,
              color: "#fff",
              letterSpacing: "-0.02em",
              lineHeight: 1,
              textTransform: "uppercase",
            }}
          >
            FOLLOW
          </span>

          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.2rem, 5vw, 5.5rem)",
                fontWeight: 700,
                color: "#fff",
                letterSpacing: "-0.02em",
                lineHeight: 1,
                textTransform: "uppercase",
              }}
            >
              ME
            </span>
            <div style={{ display: "flex", gap: "0.75rem" }}>
              {SOCIAL.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  style={{
                    width: "clamp(32px, 3.5vw, 48px)",
                    height: "clamp(32px, 3.5vw, 48px)",
                    borderRadius: "50%",
                    background: "#fff",
                    color: "#0f0f0f",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "background 0.2s, transform 0.2s",
                    flexShrink: 0,
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLAnchorElement).style.background = "#e8e8e8";
                    (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1.08)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLAnchorElement).style.background = "#fff";
                    (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1)";
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>{/* end container */}
        </div>{/* end absolute */}
      </div>

      {/* ── Dark info bar ── */}
      <div style={{ background: "#0f0f0f", paddingTop: "3rem", paddingBottom: "1.5rem" }}>
        <div className="max-w-screen-2xl mx-auto px-8 sm:px-16 lg:px-24">

          {/* Main row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-10" style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}>

            {/* Identity */}
            <div className="flex flex-col gap-4">
              <p style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.1rem, 1.5vw, 1.4rem)", fontWeight: 700, color: "#fff", letterSpacing: "-0.01em", textTransform: "uppercase" }}>
                Rajarajan Dhanasekaran
              </p>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.72rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.7 }}>
                Treasurer · SMV Group &amp; MSSE Trust<br />
                Pro Chancellor · Takshashila University<br />
                CEO · Bloombyte Edtech
              </p>
              <div className="flex gap-3 mt-1">
                {SOCIAL.map(s => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    style={{
                      width: "34px", height: "34px", borderRadius: "50%",
                      border: "1px solid rgba(255,255,255,0.2)",
                      color: "rgba(255,255,255,0.6)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      transition: "border-color 0.2s, color 0.2s",
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.6)";
                      (e.currentTarget as HTMLAnchorElement).style.color = "#fff";
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.2)";
                      (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.6)";
                    }}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Nav links */}
            <div className="flex flex-col gap-3">
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.6rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: "0.25rem" }}>
                Navigate
              </p>
              {NAV.map(n => (
                <a
                  key={n.label}
                  href={n.href}
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.8rem",
                    color: "rgba(255,255,255,0.55)",
                    textDecoration: "none",
                    letterSpacing: "0.02em",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = "#fff"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.55)"; }}
                >
                  {n.label}
                </a>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-col gap-4 md:items-end md:text-right">
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.6rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)" }}>
                Let's connect
              </p>
              <p style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1rem, 1.8vw, 1.5rem)", fontWeight: 400, color: "#fff", lineHeight: 1.3, letterSpacing: "-0.01em", textTransform: "uppercase" }}>
                Open to the right<br />conversations.
              </p>
              <a
                href="#contact"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.4em",
                  fontFamily: "var(--font-body)",
                  fontSize: "0.72rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#fff",
                  textDecoration: "none",
                  borderBottom: "1px solid rgba(255,255,255,0.35)",
                  paddingBottom: "2px",
                  transition: "border-color 0.2s",
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "#fff"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.35)"; }}
              >
                Schedule a meeting ↗
              </a>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="flex items-center justify-between pt-5">
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.62rem", color: "rgba(255,255,255,0.25)", letterSpacing: "0.04em" }}>
              © 2026 All rights reserved.
            </p>
          
          </div>

        </div>
      </div>
    </footer>
  );
}
