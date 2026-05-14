"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const ease = [0.25, 0.1, 0.25, 1] as const;

interface MediaProps {
  /** Path to a slide image, screenshot, or diagram. */
  src?: string;
  alt?: string;
  /** Caption rendered beneath the visual. Supports basic line breaks. */
  caption?: string;
  /** Aspect ratio for the empty placeholder when no `src` is provided. */
  ratio?: "video" | "wide" | "square";
}

/**
 * A standardized container for case study visuals — slide exports, mocks,
 * diagrams. When no `src` is provided yet, renders a labeled placeholder
 * so it's obvious where art still needs to drop in.
 */
export default function CaseStudyMedia({
  src,
  alt = "",
  caption,
  ratio = "video",
}: MediaProps) {
  // `<figure>` has no dedicated DOM interface — TS types it as `HTMLElement`.
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const ratioClass =
    ratio === "wide"
      ? "aspect-[21/9]"
      : ratio === "square"
        ? "aspect-square"
        : "aspect-video";

  return (
    <motion.figure
      ref={ref}
      className="my-[24px] md:my-[40px]"
      initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
      animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 1.0, ease }}
    >
      <div
        className={`relative w-full overflow-hidden rounded-[24px] md:rounded-[32px] ${ratioClass}`}
        style={{
          background: "var(--card-bg)",
          border: "1px solid var(--card-border)",
        }}
      >
        {src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={alt}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center px-[24px]">
              <p
                className="text-[12px] uppercase tracking-[0.2em] mb-[8px]"
                style={{ color: "#FF6200" }}
              >
                Visual placeholder
              </p>
              <p className="text-[14px] md:text-[16px] text-secondary max-w-[400px]">
                {alt || "Drop a slide export, screenshot, or diagram here."}
              </p>
            </div>
          </div>
        )}
      </div>

      {caption && (
        <figcaption className="mt-[16px] text-[14px] md:text-[15px] leading-[1.5] text-secondary max-w-[760px]">
          {caption}
        </figcaption>
      )}
    </motion.figure>
  );
}
