"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const ease = [0.25, 0.1, 0.25, 1] as const;

interface Person {
  name: string;
  role: string;
}

interface CaseStudyTeamProps {
  /** Section heading for the group, e.g. "Core team" or "Consulted". */
  title: string;
  people: Person[];
}

/**
 * Acknowledgments grid for collaborators. Uses a compact two-column layout
 * on small screens and a four-up grid on wider viewports so even a long
 * list of consultees stays scannable.
 */
export default function CaseStudyTeam({ title, people }: CaseStudyTeamProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      className="my-[24px] md:my-[32px]"
      initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
      animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.9, ease }}
    >
      <p className="text-[14px] uppercase tracking-[0.18em] text-secondary mb-[24px]">
        {title}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-[24px] gap-x-[40px]">
        {people.map((p) => (
          <div key={p.name}>
            <p className="text-[18px] md:text-[20px] text-foreground">
              {p.name}
            </p>
            <p className="text-[14px] md:text-[15px] text-secondary mt-[4px]">
              {p.role}
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
