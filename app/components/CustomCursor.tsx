"use client";
import { useEffect, useRef } from "react";
import { gsap } from "@/app/lib/gsap";
import { useReducedMotion } from "@/app/hooks/useReducedMotion";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !cursorRef.current) return;

    const cursor = cursorRef.current;
    let mouseX = 0, mouseY = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      gsap.to(cursor, {
        x: mouseX,
        y: mouseY,
        duration: 0.6,
        ease: "power3.out",
      });
    };

    const onEnter = () => cursor.classList.add("cursor--hover");
    const onLeave = () => cursor.classList.remove("cursor--hover");

    window.addEventListener("mousemove", onMove);

    const interactives = document.querySelectorAll("a, button, [data-cursor]");
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    return () => {
      window.removeEventListener("mousemove", onMove);
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  }, [reduced]);

  if (reduced) return null;

  return <div ref={cursorRef} className="cursor" aria-hidden="true" />;
}
