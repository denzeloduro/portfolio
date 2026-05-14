"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const ease = [0.25, 0.1, 0.25, 1] as const;

interface CaseStudySectionProps {
  /** Numeric chapter label, e.g. "01" — keeps the deck-style rhythm. */
  index?: string;
  /** Short uppercase label above the title, e.g. "CONTEXT". */
  eyebrow?: string;
  /** The section title. Optional so callers can render fully custom content. */
  title?: string;
  /** Optional lead paragraph rendered immediately below the title. */
  lead?: string;
  children?: React.ReactNode;
}

/**
 * Standardized chapter wrapper for case study sections. Establishes vertical
 * rhythm, in-view fade for content beneath the fold, and the small numeric
 * "01 / Context" eyebrow that mirrors the source deck's pacing.
 */
export default function CaseStudySection({
  index,
  eyebrow,
  title,
  lead,
  children,
}: CaseStudySectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.section
      ref={ref}
      className="relative py-[80px] md:py-[140px]"
      initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
      animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 1.0, ease }}
    >
      {(index || eyebrow) && (
        <div className="flex items-baseline gap-[16px] mb-[24px] md:mb-[32px]">
          {index && (
            <span className="text-[14px] tabular-nums text-secondary tracking-[0.18em]">
              {index}
            </span>
          )}
          {eyebrow && (
            <span className="text-[14px] uppercase tracking-[0.18em] text-secondary">
              {eyebrow}
            </span>
          )}
        </div>
      )}

      {title && (
        <h2 className="font-[family-name:var(--font-clash-display)] text-[40px] md:text-[64px] leading-[1.05] tracking-[-0.015em] text-foreground max-w-[1000px]">
          {title}
        </h2>
      )}

      {lead && (
        <p className="mt-[28px] md:mt-[36px] max-w-[760px] text-[20px] md:text-[24px] leading-[1.45] text-foreground/85">
          {lead}
        </p>
      )}

      {children && <div className="mt-[40px] md:mt-[60px]">{children}</div>}
    </motion.section>
  );
}
