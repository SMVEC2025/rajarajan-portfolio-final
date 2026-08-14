"use client";
import { useEffect, useState } from "react";

export default function Clock({ light = false }: { light?: boolean }) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-IN", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }) + " IST"
      );
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span
      className="tabular-nums"
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: "0.65rem",
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color: light ? "rgba(255,255,255,0.45)" : "var(--muted)",
      }}
      aria-label="Current time in Puducherry"
    >
      {time}
    </span>
  );
}
