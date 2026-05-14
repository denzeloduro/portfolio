"use client";

import { Fragment, useRef } from "react";
import { motion, useInView } from "framer-motion";

const ease = [0.25, 0.1, 0.25, 1] as const;

interface FlowStep {
  label: string;
  /** Optional caption beneath the label. */
  caption?: string;
}

interface CaseStudyFlowProps {
  /** Optional small label above the flow, e.g. "FLOW OVERVIEW". */
  label?: string;
  steps: FlowStep[];
}

/**
 * Renders a horizontal step → step → step diagram. Falls back to a vertical
 * stack on mobile so flows stay readable. Used for the slide-style flow
 * overviews ("Entry point → Search homepage → Search results → Page").
 */
export default function CaseStudyFlow({ label, steps }: CaseStudyFlowProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      className="my-[24px] md:my-[40px]"
      initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
      animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 1.0, ease }}
    >
      {label && (
        <p
          className="text-[12px] uppercase tracking-[0.2em] mb-[20px] md:mb-[24px]"
          style={{ color: "#FF6200" }}
        >
          {label}
        </p>
      )}

      <div className="flex flex-col md:flex-row md:items-stretch md:flex-wrap gap-[16px] md:gap-[12px]">
        {steps.map((step, i) => (
          <Fragment key={i}>
            <div
              className="flex-1 min-w-0 rounded-[20px] md:rounded-[24px] p-[20px] md:p-[24px]"
              style={{
                background: "var(--card-bg)",
                border: "1px solid var(--card-border)",
                minWidth: 0,
              }}
            >
              <p
                className="text-[11px] tabular-nums uppercase tracking-[0.18em] text-secondary mb-[8px]"
              >
                {String(i + 1).padStart(2, "0")}
              </p>
              <p className="text-[16px] md:text-[18px] text-foreground leading-[1.3]">
                {step.label}
              </p>
              {step.caption && (
                <p className="mt-[8px] text-[13px] md:text-[14px] text-secondary leading-[1.45]">
                  {step.caption}
                </p>
              )}
            </div>
            {i < steps.length - 1 && (
              <div
                className="self-center text-secondary"
                aria-hidden="true"
              >
                <svg
                  className="hidden md:block"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M5 10H15M15 10L10.5 5.5M15 10L10.5 14.5"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <svg
                  className="md:hidden mx-auto"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M10 5V15M10 15L5.5 10.5M10 15L14.5 10.5"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            )}
          </Fragment>
        ))}
      </div>
    </motion.div>
  );
}
