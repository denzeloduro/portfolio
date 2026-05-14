"use client";

import { motion } from "framer-motion";

const ease = [0.25, 0.1, 0.25, 1] as const;

interface MetaItem {
  label: string;
  value: string;
}

interface CaseStudyHeroProps {
  /** Eyebrow label rendered above the title (e.g. "Case study"). */
  eyebrow?: string;
  title: string;
  subtitle?: string;
  /** Compact metadata grid rendered below the title — role, year, company, etc. */
  meta?: MetaItem[];
}

/**
 * Top of every case study. Sets the tone with a large display title in the
 * portfolio's accent orange and a tight metadata grid (role / year / company)
 * so visitors can size up the project at a glance before scrolling.
 */
export default function CaseStudyHero({
  eyebrow = "Case study",
  title,
  subtitle,
  meta = [],
}: CaseStudyHeroProps) {
  return (
    <header className="relative">
      <motion.p
        className="text-[14px] uppercase tracking-[0.18em] text-secondary mb-[20px] md:mb-[28px]"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.05, ease }}
      >
        {eyebrow}
      </motion.p>

      <motion.h1
        className="font-[family-name:var(--font-clash-display)] leading-[1.02] tracking-[-0.02em] text-[56px] md:text-[88px] lg:text-[112px]"
        style={{ color: "#FF6200" }}
        initial={{ opacity: 0, y: 40, filter: "blur(12px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 1.2, delay: 0.1, ease }}
      >
        {title}
      </motion.h1>

      {subtitle && (
        <motion.p
          className="mt-[28px] md:mt-[40px] max-w-[820px] text-[22px] md:text-[28px] leading-[1.35] text-foreground"
          initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.0, delay: 0.35, ease }}
        >
          {subtitle}
        </motion.p>
      )}

      {meta.length > 0 && (
        <motion.dl
          className="mt-[48px] md:mt-[72px] grid grid-cols-2 md:grid-cols-4 gap-y-[24px] gap-x-[40px] max-w-[820px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.0, delay: 0.55, ease }}
        >
          {meta.map((item) => (
            <div key={item.label}>
              <dt className="text-[12px] uppercase tracking-[0.18em] text-secondary mb-[8px]">
                {item.label}
              </dt>
              <dd className="text-[18px] md:text-[20px] text-foreground">
                {item.value}
              </dd>
            </div>
          ))}
        </motion.dl>
      )}
    </header>
  );
}
