"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const ease = [0.25, 0.1, 0.25, 1] as const;

/**
 * Persistent top bar on every case study page. Provides a clear, low-key
 * way back to the work index without competing with the case study content.
 */
export default function CaseStudyNav() {
  return (
    <motion.div
      className="relative z-40 flex items-center"
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease }}
    >
      <Link
        href="/"
        className="group inline-flex items-center gap-[10px] text-[16px] text-secondary hover:text-foreground transition-colors duration-300"
      >
        <span
          aria-hidden="true"
          className="inline-flex items-center justify-center transition-transform duration-300 group-hover:-translate-x-[2px]"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M8.5 11L4.5 7L8.5 3"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        Back to work
      </Link>
    </motion.div>
  );
}
