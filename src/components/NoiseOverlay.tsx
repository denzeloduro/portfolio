"use client";

import { useEffect, useRef } from "react";

export default function NoiseOverlay() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    const size = 256;
    canvas.width = size;
    canvas.height = size;

    let frame = 0;

    const renderNoise = () => {
      frame++;
      if (frame % 3 !== 0) {
        animationId = requestAnimationFrame(renderNoise);
        return;
      }

      const imageData = ctx.createImageData(size, size);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const value = Math.random() * 255;
        data[i] = value;
        data[i + 1] = value;
        data[i + 2] = value;
        data[i + 3] = 16;
      }

      ctx.putImageData(imageData, 0, 0);
      animationId = requestAnimationFrame(renderNoise);
    };

    renderNoise();
    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-20 h-full w-full transition-opacity duration-400"
      style={{ imageRendering: "pixelated", opacity: "var(--noise-opacity)" }}
    />
  );
}
