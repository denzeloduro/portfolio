"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const ease = [0.25, 0.1, 0.25, 1] as const;

interface CaseStudyCalloutProps {
  /** Small label (e.g. "GOAL", "INSIGHT"). */
  label?: string;
  children: React.ReactNode;
}

/**
 * Pulled-out callout for goals, insights, or design principles. Anchored to
 * the brand orange so important statements punch through.
 */
export default function CaseStudyCallout({
  label = "Goal",
  children,
}: CaseStudyCalloutProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.aside
      ref={ref}
      className="relative my-[24px] md:my-[40px] pl-[24px] md:pl-[32px]"
      style={{
        borderLeft: "3px solid #FF6200",
      }}
      initial={{ opacity: 0, x: -12 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.9, ease }}
    >
      <p
        className="text-[12px] uppercase tracking-[0.22em] mb-[12px] md:mb-[16px]"
        style={{ color: "#FF6200" }}
      >
        {label}
      </p>
      <div className="text-[22px] md:text-[28px] leading-[1.4] text-foreground max-w-[820px]">
        {children}
      </div>
    </motion.aside>
  );
}
