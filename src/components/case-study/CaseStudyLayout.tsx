"use client";

import { motion } from "framer-motion";
import NoiseOverlay from "@/components/NoiseOverlay";
import Vignette from "@/components/Vignette";
import ThemeToggle from "@/components/ThemeToggle";
import CaseStudyNav from "./CaseStudyNav";

const ease = [0.25, 0.1, 0.25, 1] as const;

/**
 * Page chrome for every case study — sets up the same surface treatment as
 * the homepage (noise, vignette, theme toggle) and pads the content with
 * the shared `--page-margin` so the cadence carries across the portfolio.
 *
 * Children receive a clean centered column to drop sections into.
 */
export default function CaseStudyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen px-[24px] py-[48px] md:px-[80px] lg:px-[160px] md:py-[72px]">
      <ThemeToggle />
      <NoiseOverlay />
      <Vignette />

      <div className="relative z-30">
        <CaseStudyNav />

        <motion.main
          className="mt-[40px] md:mt-[64px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease }}
        >
          {children}
        </motion.main>
      </div>
    </div>
  );
}
