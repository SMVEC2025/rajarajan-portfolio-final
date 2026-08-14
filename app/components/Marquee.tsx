"use client";
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/app/lib/gsap";
import { useReducedMotion } from "@/app/hooks/useReducedMotion";

interface MarqueeProps {
  items: string[];
  speed?: number;
  direction?: "left" | "right";
  className?: string;
  separator?: string;
}

export default function Marquee({
  items,
  speed = 40,
  direction = "left",
  className = "",
  separator = "✦",
}: MarqueeProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const track1Ref = useRef<HTMLDivElement>(null);
  const track2Ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !track1Ref.current || !track2Ref.current) return;

    const trackWidth = track1Ref.current.offsetWidth;
    const sign = direction === "left" ? -1 : 1;
    let velocity = 0;
    let prevScrollY = 0;

    const tl = gsap.timeline({ repeat: -1 });
    tl.fromTo(
      [track1Ref.current, track2Ref.current],
      { x: direction === "left" ? 0 : -trackWidth },
      {
        x: direction === "left" ? -trackWidth : 0,
        duration: trackWidth / speed,
        ease: "none",
        modifiers: {
          x: gsap.utils.unitize((x: string) => {
            const base = parseFloat(x);
            return base + velocity * sign * 5;
          }),
        },
      }
    );

    /* Scroll-velocity reaction */
    ScrollTrigger.create({
      trigger: wrapRef.current,
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => {
        const delta = scrollY - prevScrollY;
        velocity = gsap.utils.clamp(-1, 1, delta / 30);
        prevScrollY = scrollY;
        gsap.to(tl, { timeScale: 1 + Math.abs(velocity) * 2, duration: 0.3 });
      },
    });

    return () => {
      tl.kill();
    };
  }, [reduced, speed, direction]);

  const content = items
    .map((item) => `${item} ${separator} `)
    .join("");

  return (
    <div
      ref={wrapRef}
      className={`overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <div className="flex">
        <div ref={track1Ref} className="marquee-track flex-shrink-0">
          <span>{content.repeat(4)}</span>
        </div>
        <div ref={track2Ref} className="marquee-track flex-shrink-0" aria-hidden="true">
          <span>{content.repeat(4)}</span>
        </div>
      </div>
    </div>
  );
}
