"use client";

export default function Vignette() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-20 transition-opacity duration-400"
      style={{
        background:
          "radial-gradient(ellipse at center, transparent 55%, var(--vignette-color) 100%)",
      }}
    />
  );
}
