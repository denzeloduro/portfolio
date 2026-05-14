"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const TRACK_HEIGHT = 56;
const RAIL_GAP = 12;
const MIN_THUMB_HEIGHT = 6;
const MIN_THUMB_WIDTH = 14;
const MAX_THUMB_WIDTH = 28;
const IDLE_TIMEOUT = 1500;

export default function ScrollIndicator() {
  const [visible, setVisible] = useState(false);
  const [idle, setIdle] = useState(true);
  const [thumbRatio, setThumbRatio] = useState(1);
  const [viewportAspect, setViewportAspect] = useState(16 / 9);
  const scrollProgress = useMotionValue(0);
  const smoothProgress = useSpring(scrollProgress, { stiffness: 100, damping: 18 });
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const thumbHeight = Math.max(MIN_THUMB_HEIGHT, TRACK_HEIGHT * thumbRatio);
  const thumbWidth = Math.max(MIN_THUMB_WIDTH, Math.min(MAX_THUMB_WIDTH, thumbHeight * viewportAspect));
  const travel = TRACK_HEIGHT - thumbHeight;

  const thumbY = useTransform(smoothProgress, [0, 1], [0, travel]);

  const wake = useCallback(() => {
    setIdle(false);
    if (idleTimer.current) clearTimeout(idleTimer.current);
    idleTimer.current = setTimeout(() => setIdle(true), IDLE_TIMEOUT);
  }, []);

  const update = useCallback(() => {
    const docHeight = document.documentElement.scrollHeight;
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;

    setThumbRatio(Math.min(1, viewportHeight / docHeight));
    setViewportAspect(viewportWidth / viewportHeight);

    const scrollable = docHeight - viewportHeight;
    if (scrollable > 0) {
      scrollProgress.set(window.scrollY / scrollable);
    } else {
      scrollProgress.set(0);
    }

    wake();
  }, [scrollProgress, wake]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setVisible(true);
      wake();
    }, 1200);

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    update();

    return () => {
      clearTimeout(timeout);
      if (idleTimer.current) clearTimeout(idleTimer.current);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update, wake]);

  const railLeft = (thumbWidth - RAIL_GAP) / 2;
  const railRight = (thumbWidth - RAIL_GAP) / 2;

  if (!visible || thumbRatio >= 1) return null;

  return (
    <motion.div
      className="fixed bottom-[32px] left-1/2 -translate-x-1/2 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: idle ? 0 : 1 }}
      transition={{ duration: idle ? 0.8 : 0.25 }}
    >
      <div
        className="relative"
        style={{ width: thumbWidth, height: TRACK_HEIGHT }}
      >
        <div
          className="absolute top-0 bottom-0 rounded-full transition-colors duration-400"
          style={{
            left: railLeft,
            width: 2.5,
            backgroundColor: "var(--scroll-rail)",
          }}
        />

        <div
          className="absolute top-0 bottom-0 rounded-full transition-colors duration-400"
          style={{
            right: railRight,
            width: 2.5,
            backgroundColor: "var(--scroll-rail)",
          }}
        />

        <motion.div
          className="absolute transition-colors duration-400"
          style={{
            left: 0,
            width: thumbWidth,
            height: thumbHeight,
            y: thumbY,
            border: "1.5px solid var(--scroll-thumb)",
            backgroundColor: "transparent",
            borderRadius: 3,
          }}
        />
      </div>
    </motion.div>
  );
}
