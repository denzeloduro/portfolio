"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const ease = [0.25, 0.1, 0.25, 1] as const;

interface CaseStudyFooterProps {
  /** Optional next case study link. */
  nextHref?: string;
  nextTitle?: string;
}

/**
 * End-of-case-study CTA. Always offers a quick way home, plus an optional
 * pointer to the next project so visitors can keep going through the work.
 */
export default function CaseStudyFooter({
  nextHref,
  nextTitle,
}: CaseStudyFooterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.footer
      ref={ref}
      className="relative pt-[100px] md:pt-[160px] pb-[40px] md:pb-[60px]"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.0, ease }}
    >
      <hr
        className="border-0 h-px mb-[60px] md:mb-[80px]"
        style={{ backgroundColor: "var(--divider)" }}
      />
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-[40px]">
        <div>
          <p className="text-[14px] uppercase tracking-[0.18em] text-secondary mb-[12px]">
            Thanks for reading
          </p>
          <Link
            href="/"
            className="inline-block font-[family-name:var(--font-clash-display)] text-[40px] md:text-[64px] leading-[1.05] tracking-[-0.015em] text-foreground hover:text-[#FF6200] transition-colors duration-300"
          >
            Back to work →
          </Link>
        </div>

        {nextHref && nextTitle && (
          <div className="md:text-right">
            <p className="text-[14px] uppercase tracking-[0.18em] text-secondary mb-[12px]">
              Next project
            </p>
            <Link
              href={nextHref}
              className="inline-block font-[family-name:var(--font-clash-display)] text-[28px] md:text-[40px] leading-[1.1] tracking-[-0.01em] text-foreground hover:text-[#FF6200] transition-colors duration-300"
            >
              {nextTitle} →
            </Link>
          </div>
        )}
      </div>
    </motion.footer>
  );
}
