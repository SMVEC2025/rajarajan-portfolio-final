"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/app/lib/gsap";
import { useReducedMotion } from "@/app/hooks/useReducedMotion";

const POSTS = [
  {
    id: 1,
    image: "https://media.licdn.com/dms/image/v2/D5622AQHET38risBA7w/feedshare-image-high-res/B56Z.JUXGQJoAU-/0/1784715244478?e=1788393600&v=beta&t=aGvtCZDYOgnMQo2PqHDaEeSYFkfv1zZQMMUGceonEMw",
    tag: "IEEE TEMS",
    title: "IEEE TEMS Horizon 75",
    subtitle: "Treasurer · SMV Group",
    text: "Honoured to be a part of IEEE TEMS HORIZON 75 — a remarkable event celebrating 75 years of the IEEE Technology and Engineering Management Society (TEMS), hosted at Sri Manakula Vinayagar Engineering College. Truly delighted to have shared the stage with distinguished leaders and eminent academicians.",
    likes: 108,
    comments: 6,
    time: "3w",
  },
  {
    id: 2,
    image: "https://media.licdn.com/dms/image/v2/D5622AQF10XPa7HrC2g/feedshare-image-high-res/B56Z6MnmtbJQAU-/0/1780475653478?e=1788393600&v=beta&t=x289tPJpxH20-KfEF_7tInnvS4vgEBVAf1YUFJLpSn8",
    tag: "Placements",
    title: "Xultation 2026",
    subtitle: "SMVEC · School of Arts and Science",
    text: "Grateful to have been a part of Xultation 2026, a remarkable placement initiative where 400+ students were issued offer letters, marking a significant milestone in their career journeys. Proud to contribute to an initiative that bridges academics and professional success.",
    likes: 83,
    comments: 3,
    time: "2mo",
  },
  {
    id: 3,
    image: "https://media.licdn.com/dms/image/v2/D5622AQGeu36p4jataA/feedshare-image-high-res/B56Z5O.ODaKQAY-/0/1779441394630?e=1788393600&v=beta&t=glH8cZqAOIwi_pjvKE874QgIEo6EFgy2z68W4RQSATU",
    tag: "Innovation",
    title: "Sri Sairam Techno Incubator",
    subtitle: "Treasurer · SMVET",
    text: "Innovation grows stronger when institutions learn from successful ecosystems. A great experience visiting the Sri Sairam Techno Incubator Foundation with the SMV VisionX team — understanding their approach to entrepreneurship, incubation, and innovation-driven initiatives, and building stronger industry–academia connections.",
    likes: 111,
    comments: 1,
    time: "2mo",
  },
  {
    id: 4,
    image: "https://media.licdn.com/dms/image/v2/D5622AQHL3c9IPe8a5g/feedshare-shrink_800/B56Z5ELjKZGgAc-/0/1779260339110?e=1788393600&v=beta&t=yS761_AUZ7hxdXQALKW8cnBM9Rf1N2PGgORpiKQ1b7Y",
    tag: "Mindset",
    title: "Careers Don't Stand Still",
    subtitle: "Treasurer · SMV Group",
    text: "Progress doesn't happen by pause. It comes from consistent effort, clarity of purpose, and a willingness to move forward — every day. Growth is a choice. Choose it daily.",
    likes: 35,
    comments: 0,
    time: "2mo",
  },
  {
    id: 5,
    image: "https://media.licdn.com/dms/image/v2/D5622AQENW1Cmzqimqw/feedshare-shrink_800/B56Z4mJdH4H8Ac-/0/1778756473685?e=1788393600&v=beta&t=vC5AaO9hv1RBC8XGwjkyGVN5lpGpeNLH3ZxO2gZHBMU",
    tag: "AI",
    title: "AI Is Already Here",
    subtitle: "Treasurer · SMV Group",
    text: "We are witnessing the biggest shift in learning since the invention of the internet. Earlier, people searched for answers. Now, people interact with intelligence. The smartest skill today is not just knowing information — it's knowing how to use AI effectively. The future belongs to those who adapt fast.",
    likes: 0,
    comments: 0,
    time: "2mo",
  },
];

function LinkedInIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}

function PostCard({ post, index }: { post: typeof POSTS[0]; index: number }) {
  const [liked, setLiked] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="li-card flex-shrink-0 flex flex-col overflow-hidden"
      style={{
        width: "clamp(240px, 26vw, 300px)",
        borderRadius: "8px",
        background: "#fff",
        border: "1px solid #e0e0e0",
        cursor: "pointer",
        transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1), border-color 0.3s, box-shadow 0.3s",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        borderColor: hovered ? "rgba(10,102,194,0.4)" : "#e0e0e0",
        boxShadow: hovered ? "0 8px 24px rgba(0,0,0,0.1)" : "0 1px 4px rgba(0,0,0,0.05)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div className="relative overflow-hidden" style={{ height: "180px" }}>
        <Image
          src={post.image}
          alt=""
          fill
          sizes="300px"
          style={{
            objectFit: "cover",
            objectPosition: "center top",
            transition: "transform 0.6s cubic-bezier(0.16,1,0.3,1)",
            transform: hovered ? "scale(1.04)" : "scale(1)",
          }}
          aria-hidden="true"
        />
        {/* gradient */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 55%)",
          }}
        />
        {/* index number */}
        <span
          style={{
            position: "absolute",
            top: "12px",
            left: "14px",
            fontFamily: "var(--font-body)",
            fontSize: "0.6rem",
            letterSpacing: "0.1em",
            color: "rgba(255,255,255,0.45)",
          }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        {/* tag */}
        <span
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            background: "rgba(10,102,194,0.85)",
            color: "#fff",
            fontSize: "0.55rem",
            fontFamily: "var(--font-body)",
            fontWeight: 600,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            padding: "3px 8px",
            borderRadius: "3px",
          }}
        >
          {post.tag}
        </span>
        {/* bottom title */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(0.85rem, 1.1vw, 1rem)",
              fontWeight: 600,
              letterSpacing: "-0.01em",
              color: "#fff",
              lineHeight: 1.2,
              textTransform: "uppercase",
              marginBottom: "0.2rem",
            }}
          >
            {post.title}
          </p>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.6rem", color: "rgba(255,255,255,0.55)", letterSpacing: "0.05em" }}>
            {post.subtitle}
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 px-4 pt-4 pb-4 gap-3">
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.72rem",
            color: "#444",
            lineHeight: 1.7,
            display: "-webkit-box",
            WebkitLineClamp: 4,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {post.text}
        </p>

        {/* Divider */}
        <div style={{ borderTop: "1px solid #efefef", paddingTop: "0.75rem", marginTop: "auto" }}>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setLiked(l => !l)}
              className="flex items-center gap-1"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.65rem",
                color: liked ? "#0a66c2" : "#888",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
                transition: "color 0.2s",
              }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M7 10v12M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z"/>
              </svg>
              {(post.likes + (liked ? 1 : 0)).toLocaleString("en-IN")}
            </button>
            <button
              className="flex items-center gap-1"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.65rem",
                color: "#888",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
              }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
              {post.comments}
            </button>
            <span style={{ fontFamily: "var(--font-body)", fontSize: "0.6rem", color: "#bbb", marginLeft: "auto" }}>
              {post.time}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LinkedInFeed() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef   = useRef<HTMLDivElement>(null);
  const headRef    = useRef<HTMLDivElement>(null);
  const reduced    = useReducedMotion();
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const CARD_W = () => {
    const card = trackRef.current?.querySelector<HTMLElement>(".li-card");
    return card ? card.offsetWidth + 20 : 320;
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

      const cards = gsap.utils.toArray<HTMLElement>(".li-card");
      gsap.set(cards, { opacity: 0, y: 30 });
      ScrollTrigger.create({
        trigger: trackRef.current, start: "top 88%", once: true,
        onEnter: () => gsap.to(cards, { opacity: 1, y: 0, duration: 0.7, stagger: 0.08, ease: "power3.out" }),
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={sectionRef}
      aria-label="LinkedIn posts"
      style={{
        background: "var(--bg)",
        paddingTop: "var(--section-gap)",
        paddingBottom: "var(--section-gap)",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>

        {/* Header */}
        <div ref={headRef} className="px-6 md:px-12 flex items-end justify-between mb-10">
          <div>
            {/* Same navy as the heading below it */}
            <p className="t-caption mb-3" style={{ color: "#1a3062" }}>
              Thoughts &amp; updates
            </p>
            {/* Matches the hero name's typography (Google Sans, GRAD 0) */}
            <h2
              style={{
                color: "#1a3062",
                lineHeight: 1,
                fontFamily: '"Google Sans", sans-serif',
                fontOpticalSizing: "auto",
                fontSize: "clamp(2rem, 4vw, 4.6rem)",
                fontWeight: 400,
                fontStyle: "normal",
                fontVariationSettings: '"GRAD" 0',
                letterSpacing: "-0.045em",
                whiteSpace: "nowrap",
              }}
            >
              On LinkedIn
            </h2>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="https://www.linkedin.com/in/rajarajan-dhanasekaran-6ba5009a"
              target="_blank"
              rel="noopener noreferrer"
              className="t-caption"
              style={{
                color: "#0a66c2",
                textDecoration: "none",
                letterSpacing: "0.1em",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.6rem",
                border: "1px solid rgba(10,102,194,0.3)",
                borderRadius: "999px",
                padding: "0.5rem 1rem 0.5rem 0.6rem",
                transition: "border-color 0.2s, background 0.2s",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = "#0a66c2";
                (e.currentTarget as HTMLAnchorElement).style.background = "rgba(10,102,194,0.06)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(10,102,194,0.3)";
                (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
              }}
            >
              <LinkedInIcon />
              @rajarajan ↗
            </a>

            {/* Prev / Next */}
            <div className="hidden md:flex gap-2">
              {(["prev", "next"] as const).map(dir => (
                <button
                  key={dir}
                  onClick={() => scroll(dir)}
                  disabled={dir === "prev" ? !canPrev : !canNext}
                  aria-label={dir === "prev" ? "Previous" : "Next"}
                  style={{
                    width: "40px", height: "40px", borderRadius: "50%",
                    border: "1px solid",
                    borderColor: (dir === "prev" ? canPrev : canNext) ? "rgba(0,0,0,0.25)" : "rgba(0,0,0,0.08)",
                    background: "transparent",
                    color: (dir === "prev" ? canPrev : canNext) ? "var(--ink)" : "rgba(0,0,0,0.2)",
                    cursor: (dir === "prev" ? canPrev : canNext) ? "pointer" : "default",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "0.9rem",
                    transition: "all 0.2s",
                  }}
                >
                  {dir === "prev" ? "←" : "→"}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Card track */}
        <div
          ref={trackRef}
          className="flex gap-5 overflow-x-auto overflow-y-hidden px-6 md:px-12"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none", cursor: "grab" }}
        >
          {POSTS.map((post, i) => (
            <PostCard key={post.id} post={post} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}
