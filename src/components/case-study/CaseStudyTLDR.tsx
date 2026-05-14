"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const ease = [0.25, 0.1, 0.25, 1] as const;

interface CaseStudyTLDRProps {
  /** Either a single string for a paragraph TL;DR, or a list of bullets. */
  body?: string;
  bullets?: string[];
}

/**
 * Big, scannable summary block for the very top of a case study. Visitors
 * who don't read the whole story should still leave with the gist.
 */
export default function CaseStudyTLDR({ body, bullets }: CaseStudyTLDRProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      className="relative w-full overflow-hidden rounded-[32px] md:rounded-[40px] p-[28px] md:p-[48px]"
      style={{
        background: "var(--card-bg)",
        border: "1px solid var(--card-border)",
      }}
      initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
      animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 1.0, ease }}
    >
      <p
        className="text-[12px] uppercase tracking-[0.22em] mb-[16px] md:mb-[24px]"
        style={{ color: "#FF6200" }}
      >
        TL;DR
      </p>

      {body && (
        <p className="text-[22px] md:text-[28px] leading-[1.4] text-foreground">
          {body}
        </p>
      )}

      {bullets && bullets.length > 0 && (
        <ul className="space-y-[16px] md:space-y-[20px]">
          {bullets.map((b, i) => (
            <li
              key={i}
              className="flex gap-[16px] text-[18px] md:text-[22px] leading-[1.45] text-foreground"
            >
              <span
                aria-hidden="true"
                className="mt-[14px] md:mt-[16px] shrink-0 rounded-full"
                style={{
                  width: 6,
                  height: 6,
                  backgroundColor: "#FF6200",
                }}
              />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      )}
    </motion.div>
  );
}
