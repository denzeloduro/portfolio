"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CursorGlow() {
  const [hasMounted, setHasMounted] = useState(false);
  const mouseX = useMotionValue(-500);
  const mouseY = useMotionValue(-500);

  const springConfig = { damping: 20, stiffness: 100 };
  const slowSpring = { damping: 30, stiffness: 60 };

  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);
  const slowX = useSpring(mouseX, slowSpring);
  const slowY = useSpring(mouseY, slowSpring);

  useEffect(() => {
    setHasMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  if (!hasMounted) return null;

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-10 transition-opacity duration-400"
      style={{ opacity: "var(--glow-opacity)" }}
    >
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full"
        style={{
          x,
          y,
          translateX: "-50%",
          translateY: "-50%",
          background:
            "radial-gradient(circle, rgba(196,97,42,0.4) 0%, rgba(180,70,30,0.15) 40%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <motion.div
        className="absolute w-[250px] h-[600px] rounded-full"
        style={{
          x: slowX,
          y: slowY,
          translateX: "-30%",
          translateY: "-60%",
          background:
            "linear-gradient(180deg, rgba(210,120,50,0.3) 0%, rgba(180,50,60,0.2) 30%, rgba(200,80,120,0.15) 55%, rgba(60,100,160,0.1) 80%, transparent 100%)",
          filter: "blur(50px)",
          rotate: "-15deg",
        }}
      />

      <motion.div
        className="absolute w-[300px] h-[300px] rounded-full"
        style={{
          x: slowX,
          y: slowY,
          translateX: "-120%",
          translateY: "-30%",
          background:
            "radial-gradient(circle, rgba(40,120,100,0.2) 0%, rgba(30,80,70,0.08) 50%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />

      <motion.div
        className="absolute w-[350px] h-[250px] rounded-full"
        style={{
          x: slowX,
          y: slowY,
          translateX: "0%",
          translateY: "10%",
          background:
            "radial-gradient(circle, rgba(180,60,100,0.15) 0%, rgba(140,40,80,0.06) 50%, transparent 70%)",
          filter: "blur(45px)",
        }}
      />
    </motion.div>
  );
}
