"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";

const ease = [0.25, 0.1, 0.25, 1] as const;

export default function GradientHeading({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const [mouseX, setMouseX] = useState(-1);
  const isHovered = mouseX >= 0;

  const handleMouseMove = (e: React.MouseEvent<HTMLHeadingElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMouseX(((e.clientX - rect.left) / rect.width) * 100);
  };

  const handleMouseLeave = () => {
    setMouseX(-1);
  };

  return (
    <motion.h1
      ref={ref}
      className="font-[family-name:var(--font-ultra)] leading-[0.95] w-full whitespace-nowrap overflow-hidden cursor-default"
      style={{
        fontSize: "calc((100vw - var(--page-margin) * 2) * 0.115)",
        backgroundImage: isHovered
          ? `radial-gradient(circle at ${mouseX}% 50%, #FF9900 0%, #FF6200 50%, #FF6200 100%)`
          : "none",
        color: isHovered ? undefined : "#FF6200",
        backgroundClip: "text",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: isHovered ? "transparent" : "#FF6200",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 40, filter: "blur(12px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 1.4, ease }}
    >
      {children}
    </motion.h1>
  );
}
