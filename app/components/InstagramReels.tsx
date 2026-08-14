"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/app/lib/gsap";
import { useReducedMotion } from "@/app/hooks/useReducedMotion";

const REELS = [
  { src: "/images/reels/reels.mp4", poster: "/images/hero-speaking.jpg", title: "Institutional Leadership", subtitle: "Treasurer / SMV Group" },
  { src: "/images/reels/reels.mp4", poster: "/images/hero-standing-1.jpg", title: "Academic Vision", subtitle: "Pro Chancellor / Takshashila" },
  { src: "/images/reels/reels.mp4", poster: "/images/hero-standing-2.jpg", title: "EdTech Innovation", subtitle: "CEO / Bloombyte" },
  { src: "/images/reels/reels.mp4", poster: "/images/DSC04928.JPG.jpeg", title: "Campus at Scale", subtitle: "20,000+ Students" },
  { src: "/images/reels/reels.mp4", poster: "/images/MKA08259.JPG.jpeg", title: "Healthcare Impact", subtitle: "40L+ Free Treatments" },
];

function ReelCard({ src, poster, title, subtitle, index }: { src: string; poster: string; title: string; subtitle: string; index: number }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (hovered) {
      v.play().catch(() => {});
    } else {
      v.pause();
      v.currentTime = 0;
    }
  }, [hovered]);

  return (
    <div
      className="reel-card flex-shrink-0 relative overflow-hidden cursor-pointer"
      style={{
        width: "clamp(220px, 20vw, 300px)",
        aspectRatio: "9/16",
        borderRadius: "8px",
        background: "#111",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        preload="metadata"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center top",
          transition: "transform 0.6s cubic-bezier(0.16,1,0.3,1)",
          transform: hovered ? "scale(1.04)" : "scale(1)",
        }}
      />

      {/* Gradient overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to top, rgba(0,0,0,0.76) 18%, rgba(0,0,0,0.16) 64%, transparent 100%)",
          opacity: hovered ? 0 : 1,
          transition: "opacity 0.4s ease",
        }}
      />

      {/* Index */}
      <span
        className="t-caption absolute top-4 left-4"
        style={{
          color: "rgba(255,255,255,0.45)",
          opacity: hovered ? 0 : 1,
          transition: "opacity 0.4s ease",
        }}
      >
        0{index + 1}
      </span>

      {/* Text */}
      <div
        className="absolute bottom-0 left-0 right-0 p-4"
        style={{
          opacity: hovered ? 0 : 1,
          transition: "opacity 0.4s ease",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(0.92rem, 1.1vw, 1.08rem)",
            fontWeight: 600,
            letterSpacing: "-0.01em",
            color: "#fff",
            lineHeight: 1.15,
            marginBottom: "0.3rem",
            textTransform: "uppercase",
          }}
        >
          {title}
        </p>
        <p
          className="t-caption"
          style={{ color: "rgba(255,255,255,0.6)" }}
        >
          {subtitle}
        </p>
      </div>
    </div>
  );
}

export default function InstagramReels() {
  const sectionRef  = useRef<HTMLElement>(null);
  const trackRef    = useRef<HTMLDivElement>(null);
  const headRef     = useRef<HTMLDivElement>(null);
  const reduced     = useReducedMotion();
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const CARD_W = () => {
    const card = trackRef.current?.querySelector<HTMLElement>(".reel-card");
    return card ? card.offsetWidth + 20 : 300;
  };

  const scroll = (dir: "prev" | "next") => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: dir === "next" ? CARD_W() * 2 : -CARD_W() * 2, behavior: "smooth" });
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const update = () => {
      setCanPrev(track.scrollLeft > 10);
      setCanNext(track.scrollLeft < track.scrollWidth - track.clientWidth - 10);
    };
    track.addEventListener("scroll", update, { passive: true });
    update();
    return () => track.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      gsap.set(headRef.current, { opacity: 0, y: 20 });
      ScrollTrigger.create({
        trigger: headRef.current, start: "top 85%", once: true,
        onEnter: () => gsap.to(headRef.current, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }),
      });

      const cards = gsap.utils.toArray<HTMLElement>(".reel-card");
      gsap.set(cards, { opacity: 0, y: 30 });
      ScrollTrigger.create({
        trigger: trackRef.current, start: "top 88%", once: true,
        onEnter: () =>
          gsap.to(cards, { opacity: 1, y: 0, duration: 0.7, stagger: 0.08, ease: "power3.out" }),
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={sectionRef}
      aria-label="Instagram reels"
      style={{
        background: "var(--ink)",
        paddingTop: "var(--section-gap)",
        paddingBottom: "var(--section-gap)",
        overflow: "hidden",
      }}
    >
      {/* Header row */}
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
      <div
        ref={headRef}
        className="px-6 md:px-12 flex items-end justify-between mb-10"
      >
        <div>
          <p className="t-caption mb-3" style={{ color: "#d9d9d9" }}>
            Follow along
          </p>
          {/* Matches the hero name's typography (Google Sans, GRAD 0) */}
          <h2
            style={{
              color: "var(--bg)",
              lineHeight: 1,
              fontFamily: '"Google Sans", sans-serif',
              fontOpticalSizing: "auto",
              fontSize: "clamp(2rem, 4vw, 4.6rem)",
              fontWeight: 400,
              fontStyle: "normal",
              fontVariationSettings: '"GRAD" 0',
              letterSpacing: "-0.045em",
            }}
          >
            On Instagram
          </h2>
        </div>

        <div className="flex items-center gap-6">
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="t-caption"
            style={{
              color: "#fff",
              textDecoration: "none",
              letterSpacing: "0.1em",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.6rem",
              border: "1px solid rgba(255,255,255,0.25)",
              borderRadius: "999px",
              padding: "0.5rem 1rem 0.5rem 0.6rem",
              transition: "border-color 0.2s, background 0.2s",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.6)";
              (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.06)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.25)";
              (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
            }}
          >
            {/* Instagram SVG icon */}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <defs>
                <radialGradient id="ig-grad" cx="30%" cy="107%" r="130%">
                  <stop offset="0%" stopColor="#ffd600"/>
                  <stop offset="30%" stopColor="#ff6930"/>
                  <stop offset="60%" stopColor="#e0177f"/>
                  <stop offset="100%" stopColor="#8b2fc9"/>
                </radialGradient>
              </defs>
              <rect x="2" y="2" width="20" height="20" rx="6" stroke="url(#ig-grad)" strokeWidth="2"/>
              <circle cx="12" cy="12" r="4.5" stroke="url(#ig-grad)" strokeWidth="2"/>
              <circle cx="17.5" cy="6.5" r="1" fill="url(#ig-grad)"/>
            </svg>
            @rajarajan ↗
          </a>

          {/* Prev / Next */}
          <div className="hidden md:flex gap-2">
            <button
              onClick={() => scroll("prev")}
              disabled={!canPrev}
              aria-label="Previous"
              style={{
                width: "40px", height: "40px", borderRadius: "50%",
                border: "1px solid",
                borderColor: canPrev ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.1)",
                background: "transparent",
                color: canPrev ? "var(--bg)" : "rgba(255,255,255,0.2)",
                cursor: canPrev ? "pointer" : "default",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "0.9rem",
                transition: "all 0.2s",
              }}
            >
              ←
            </button>
            <button
              onClick={() => scroll("next")}
              disabled={!canNext}
              aria-label="Next"
              style={{
                width: "40px", height: "40px", borderRadius: "50%",
                border: "1px solid",
                borderColor: canNext ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.1)",
                background: "transparent",
                color: canNext ? "var(--bg)" : "rgba(255,255,255,0.2)",
                cursor: canNext ? "pointer" : "default",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "0.9rem",
                transition: "all 0.2s",
              }}
            >
              →
            </button>
          </div>
        </div>
      </div>

      {/* Scrollable track — left edge matches header */}
      <div
        ref={trackRef}
        className="flex gap-5 overflow-x-auto overflow-y-hidden px-6 md:px-12"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          cursor: "grab",
        }}
      >
        {REELS.map((reel, i) => (
          <ReelCard key={i} {...reel} index={i} />
        ))}
      </div>
      </div>{/* end max-width wrapper */}
    </section>
  );
}
