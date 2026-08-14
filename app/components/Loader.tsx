"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "@/app/lib/gsap";
import { useReducedMotion } from "@/app/hooks/useReducedMotion";

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const loaderRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (reduced) {
      setDone(true);
      onComplete();
      return;
    }

    const obj = { val: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        setDone(true);
        onComplete();
      },
    });

    tl.to(obj, {
      val: 100,
      duration: 1.4,
      ease: "power2.inOut",
      onUpdate() {
        if (countRef.current) {
          countRef.current.textContent = Math.round(obj.val).toString();
        }
      },
    }).to(loaderRef.current, {
      yPercent: -100,
      duration: 0.9,
      ease: "power3.inOut",
      delay: 0.1,
    });
  }, [reduced, onComplete]);

  if (done) return null;

  return (
    <div
      ref={loaderRef}
      className="loader"
      role="status"
      aria-label="Loading"
      data-done={done}
    >
      <span ref={countRef} className="loader__count select-none" aria-hidden="true">
        0
      </span>
    </div>
  );
}
