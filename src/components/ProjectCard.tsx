"use client";

import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const PROTOTYPE_WIDTH = 375;

interface ProjectHint {
  text: string;
  icon?: React.ReactNode;
  /** Where the tooltip docks inside the card. Defaults to "bottom". */
  position?: "top" | "bottom";
}

/** Which way the 3D phone leans. `right` is the default (right edge recedes,
 *  phone faces upper-left); `left` is its mirror — used to create rhythmic
 *  balance when two phones sit side-by-side on the page. */
export type ProjectTilt = "left" | "right";

interface ProjectCardProps {
  title: string;
  context: string;
  aspectRatio?: "square" | "wide";
  delay?: number;
  imageSrc?: string;
  children?: React.ReactNode;
  /** Hover hint shown over the prototype. Defaults to a swipe-to-delete cue. */
  hint?: ProjectHint;
  /** 3D tilt direction. Defaults to `"right"`. */
  tilt?: ProjectTilt;
  /** When provided, the title + context become a navigation link to a case
   *  study page. The interactive prototype above stays separately interactive. */
  href?: string;
}

export default function ProjectCard({ title, context, aspectRatio = "square", delay = 0, imageSrc, children, hint, tilt, href }: ProjectCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setGlowPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <motion.div
      ref={ref}
      className="flex-1 min-w-0"
      initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
      animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 1.2, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <motion.div
        className={`relative w-full overflow-hidden rounded-[40px] ${children ? "cursor-default" : "cursor-pointer"} ${
          aspectRatio === "wide" ? "h-[400px] lg:h-[600px]" : "h-[400px] lg:aspect-square lg:h-auto"
        }`}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={children ? undefined : { scale: 1.01 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <div
          className="absolute inset-0 transition-all duration-400"
          style={{ background: "var(--card-bg)" }}
        />

        {imageSrc && (
          <img
            src={imageSrc}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
        )}

        {children && (
          <PrototypeContainer hint={hint} tilt={tilt}>
            {children}
          </PrototypeContainer>
        )}

      </motion.div>

      {href ? (
        <Link href={href} className="group/link inline-block mt-[16px]">
          <p className="text-[24px] font-medium text-foreground inline-flex items-center gap-[10px] transition-colors duration-300 group-hover/link:text-[#FF6200]">
            {title}
            <span
              aria-hidden="true"
              className="inline-flex transition-transform duration-300 group-hover/link:translate-x-[2px]"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M5.5 3.5L10 8L5.5 12.5"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </p>
          <p className="text-[24px] text-secondary">{context}</p>
        </Link>
      ) : (
        <>
          <p className="text-[24px] font-medium text-foreground mt-[16px]">{title}</p>
          <p className="text-[24px] text-secondary">{context}</p>
        </>
      )}
    </motion.div>
  );
}

function SwipeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      {/* Finger / pointer hint sliding left */}
      <path
        d="M11.5 4.5 L5.5 8 L11.5 11.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 8 L8 8"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity="0.55"
      />
    </svg>
  );
}

const DEFAULT_HINT: ProjectHint = {
  text: "swipe to delete",
  icon: <SwipeIcon />,
};

function useIsDark() {
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    const check = () => setIsDark(document.documentElement.classList.contains("dark"));
    check();
    const observer = new MutationObserver(check);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);
  return isDark;
}

// Phone shell palettes — black hardware in light mode reads as a classic
// iPhone; in dark mode we shift to a Space Gray-ish metallic so the silhouette
// stays visible against the dark card. Bezel around the screen stays black in
// both modes (matches every real iPhone).
const PHONE_FRAME_LIGHT = {
  back: "linear-gradient(135deg, #1c1c1e 0%, #0a0a0b 60%, #000 100%)",
  sideRight: "linear-gradient(90deg, #2c2c2e 0%, #1a1a1c 50%, #050506 100%)",
  sideLeft: "linear-gradient(90deg, #050506 0%, #1a1a1c 50%, #2c2c2e 100%)",
  bezel: "#000",
};
const PHONE_FRAME_DARK = {
  back: "linear-gradient(135deg, #2E2E30 0%, #1F1F22 55%, #131316 100%)",
  sideRight: "linear-gradient(90deg, #3A3A3C 0%, #232326 50%, #131316 100%)",
  sideLeft: "linear-gradient(90deg, #131316 0%, #232326 50%, #3A3A3C 100%)",
  bezel: "#1F1F22",
};

function PrototypeContainer({
  children,
  hint,
  tilt = "right",
}: {
  children: React.ReactNode;
  hint?: ProjectHint;
  tilt?: ProjectTilt;
}) {
  const shellRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const isDark = useIsDark();
  const FRAME = isDark ? PHONE_FRAME_DARK : PHONE_FRAME_LIGHT;
  const activeHint = hint ?? DEFAULT_HINT;
  const hintPosition = activeHint.position ?? "bottom";
  const hintOffset = hintPosition === "top" ? -6 : 6;

  useEffect(() => {
    const compute = () => {
      if (!shellRef.current) return;
      const parentWidth = shellRef.current.parentElement?.clientWidth ?? 0;
      const target = Math.min(390, Math.max(375, parentWidth * 0.55));
      setScale(target / PROTOTYPE_WIDTH);
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  const displayWidth = PROTOTYPE_WIDTH * scale;
  const PHONE_DEPTH = 40;
  // `right` tilts the right edge of the phone away from the viewer (default);
  // `left` mirrors it. When two phones sit side-by-side with opposing tilts
  // they lean toward each other like the open spread of a book, which gives
  // the row some rhythmic balance instead of two phones leaning the same way.
  const tiltDirection = tilt === "left" ? -1 : 1;
  const TILT_Y = isHovered ? 0 : 18 * tiltDirection;
  const TILT_X = isHovered ? 0 : -4;

  return (
    <div
      ref={shellRef}
      className="absolute z-10 flex justify-center pointer-events-none"
      style={{
        inset: 0,
        perspective: "1400px",
        perspectiveOrigin: "50% 30%",
      }}
    >
      {/* Hover discovery tooltip — docks to the configured corner of the card,
          flat to the viewport. Slide direction follows the dock so the tooltip
          always animates inward from its anchor edge. */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute z-30 pointer-events-none"
            style={
              hintPosition === "top"
                ? { top: 24, right: 24 }
                : { bottom: 24, right: 24 }
            }
            initial={{ opacity: 0, y: hintOffset }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: hintOffset }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div
              className="flex items-center gap-[8px] px-[14px] py-[8px] rounded-full"
              style={{
                background: "rgba(10,10,12,0.92)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                color: "rgba(255,255,255,0.95)",
                fontSize: 13,
                fontWeight: 500,
                letterSpacing: -0.1,
                boxShadow:
                  "0 8px 24px rgba(0,0,0,0.18), 0 1px 0 rgba(255,255,255,0.08) inset",
                whiteSpace: "nowrap",
              }}
            >
              {activeHint.icon}
              {activeHint.text}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div
        ref={phoneRef}
        className="absolute pointer-events-auto"
        style={{
          top: 40,
          width: displayWidth + 10,
          // Natural iPhone aspect (375:812). Bottom is cropped by card's overflow-hidden,
          // ensuring inner content has Swift-spec breathing room (~812pt).
          height: (displayWidth + 10) * (812 / 375),
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* 3D context: the rotated phone body */}
        <motion.div
          className="relative w-full h-full"
          style={{
            transformStyle: "preserve-3d",
            transformOrigin: "center center",
          }}
          animate={{
            rotateX: TILT_X,
            rotateY: TILT_Y,
          }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {/* Back face — phone's rear shell */}
          <div
            className="absolute rounded-t-[48px]"
            style={{
              inset: 0,
              background: FRAME.back,
              transform: `translateZ(-${PHONE_DEPTH}px)`,
            }}
          />

          {/* Right side face — tucked under the rounded screen corner */}
          <div
            className="absolute"
            style={{
              top: 16,
              bottom: 0,
              right: 0,
              width: PHONE_DEPTH,
              background: FRAME.sideRight,
              transform: `translateX(${PHONE_DEPTH / 2}px) rotateY(90deg)`,
              transformOrigin: "left center",
            }}
          />

          {/* Left side face */}
          <div
            className="absolute"
            style={{
              top: 16,
              bottom: 0,
              left: 0,
              width: PHONE_DEPTH,
              background: FRAME.sideLeft,
              transform: `translateX(-${PHONE_DEPTH / 2}px) rotateY(-90deg)`,
              transformOrigin: "right center",
            }}
          />

          {/* Front face — screen with 5px internal bezel.
              Bezel color matches the 3D frame in dark mode so any tiny gap
              where the side face meets the corner blends instead of showing
              as a black sliver. */}
          <div
            className="relative rounded-t-[48px] h-full"
            style={{
              padding: "5px 5px 0 5px",
              background: FRAME.bezel,
              transform: "translateZ(0.5px)",
            }}
          >
            <div
              className="relative"
              style={{
                width: displayWidth,
                height: "100%",
                // clip-path survives compositing changes (e.g. when dialog's
                // backdrop-filter forces a GPU layer flip).
                clipPath: "inset(0 0 0 0 round 43px 43px 0 0)",
                WebkitClipPath: "inset(0 0 0 0 round 43px 43px 0 0)",
                isolation: "isolate",
                transform: "translateZ(0)",
                willChange: "transform",
              }}
            >
              <div
                style={{
                  width: PROTOTYPE_WIDTH,
                  height: `${100 / scale}%`,
                  transform: `scale(${scale})`,
                  transformOrigin: "top left",
                }}
              >
                {children}
              </div>

              {/* Glass sheen — sells the "physical screen" illusion */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(110deg, rgba(255,255,255,0.20) 0%, rgba(255,255,255,0) 22%, rgba(255,255,255,0) 78%, rgba(0,0,0,0.08) 100%)",
                  mixBlendMode: "overlay",
                }}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
