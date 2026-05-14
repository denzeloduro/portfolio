"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import XmdsIcon from "./XmdsIcon";
import { UI_ICONS } from "./constants";
import { FONT, type ThemeColors } from "./theme";

interface Props {
  isSearching: boolean;
  searchText: string;
  onSearchTextChange: (text: string) => void;
  onOpenSearch: () => void;
  onCancel: () => void;
  colors: ThemeColors;
  isDark: boolean;
}

/**
 * Tokens are pulled directly from `MotionTokens.swift` — XMDS elastic spring
 * for surfaces that adapt size (the capsule's morph) and ambient linear for
 * pure opacity fades (the home navbar fading out behind it).
 */
const ELASTIC_SPRING = { type: "spring", duration: 0.5, bounce: 0.1 } as const;
const AMBIENT_FADE = { duration: 0.25, ease: "linear" as const };

const SEARCH_ICON_URL = `/prototypes/accounts-center/icons/${UI_ICONS.search}.svg`;

const COLLAPSED_W = 52;
const HORIZONTAL_PADDING = 16;
const CANCEL_GAP = 8;
// "Cancel" at 15pt medium ≈ 53pt rendered. A small buffer keeps the capsule
// from butting up against it during overshoot.
const CANCEL_RESERVED = 64;

/**
 * The morphing nav bar.
 *
 * Mirrors `AccountsCenterPreview.swift`'s `morphingNavBar`:
 *   1. Layer 1 — X close + Meta lockup, fades out behind the morph
 *   2. Layer 2 — capsule (right-anchored via `marginLeft: auto`) + an
 *      absolutely-positioned Cancel button.
 *
 * IMPORTANT — why no Framer Motion `layout` prop:
 *   `layout` uses the FLIP technique: it snaps the element's CSS box to its
 *   new size/position instantly, then plays a transform (translate + scale)
 *   to interpolate the visual. That transform cascades onto every child, so
 *   the icon ends up scale-X'd during the morph and visibly drifts to the
 *   left at the start of the cancel animation (the bug we're fixing).
 *
 *   By animating the capsule's `width` as an explicit numeric value instead,
 *   the actual CSS width changes each frame and children reflow naturally —
 *   exactly how SwiftUI's `.frame(maxWidth: …)` interpolates inside an
 *   `withAnimation` block. The icon stays anchored to the leading edge the
 *   whole way through.
 */
export default function MorphingSearchBar({
  isSearching,
  searchText,
  onSearchTextChange,
  onOpenSearch,
  onCancel,
  colors,
  isDark,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerW, setContainerW] = useState(0);

  // Measure the row so we can animate the capsule's width with a real number
  // instead of "auto", which Framer Motion can't tween directly.
  useEffect(() => {
    if (!containerRef.current) return;
    const el = containerRef.current;
    const measure = () => setContainerW(el.clientWidth);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const expandedW = Math.max(
    COLLAPSED_W,
    containerW - HORIZONTAL_PADDING * 2 - CANCEL_GAP - CANCEL_RESERVED,
  );

  useEffect(() => {
    if (isSearching) {
      // SwiftUI focuses the field 0.35s after the morph starts so the
      // keyboard arrives as the bar settles. We do the same with a slightly
      // shorter delay because there's no real keyboard to ride in.
      //
      // CRITICAL: `preventScroll: true`. The prototype lives deep inside a
      // 3D-transformed, scaled-down phone frame on the portfolio page. Browser
      // default behavior on focus is to scroll the input into view — which
      // shifts the entire page (and the phone with it) upward, making the
      // sheet appear to slide off the top of the iPhone. That's the visual bug
      // the user keeps catching: "the search bar moves all the way up, above
      // the sheet". Suppressing the scroll keeps the page anchored.
      const t = setTimeout(
        () => inputRef.current?.focus({ preventScroll: true }),
        250,
      );
      return () => clearTimeout(t);
    }
    inputRef.current?.blur();
  }, [isSearching]);

  return (
    // Production XMDSNavBar height (see XMDSNavBar.swift line 77).
    // Earlier I'd bumped this to 88pt to compensate for the iOS status bar
    // sitting flush against the navbar — the bottom-sheet wrapper now adds
    // that breathing room above the sheet, so we can return to Swift's spec.
    <div className="relative w-full" style={{ height: 68 }}>
      {/* Layer 1: home navbar (X close button + Meta lockup centered) */}
      <motion.div
        animate={{ opacity: isSearching ? 0 : 1 }}
        transition={AMBIENT_FADE}
        className="pointer-events-none absolute inset-0 flex items-center"
        style={{ paddingLeft: 8, paddingRight: 8 }}
      >
        <button
          type="button"
          aria-label="Close"
          className="pointer-events-auto flex items-center justify-center active:opacity-75"
          style={{ width: 52, height: 52 }}
        >
          <XmdsIcon name={UI_ICONS.close} size={24} color={colors.iconPrimary} />
        </button>

        <div className="flex-1 flex items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={
              isDark
                ? "/prototypes/accounts-center/icons/metaLockup_white.svg"
                : "/prototypes/accounts-center/icons/metaLockup.svg"
            }
            alt="Meta"
            style={{ height: 12, width: "auto" }}
            draggable={false}
          />
        </div>

        {/* Reserve space symmetrical to the close button — the search-icon
            overlay below sits in this slot when collapsed. */}
        <div style={{ width: 52, height: 52 }} aria-hidden />
      </motion.div>

      {/* Layer 2: morphing search element */}
      <div
        ref={containerRef}
        className="absolute inset-0 flex items-center"
        style={{ paddingLeft: HORIZONTAL_PADDING, paddingRight: HORIZONTAL_PADDING }}
      >
        {/* Capsule.
            Anchored to the trailing edge via `marginLeft: auto`. We animate:
              • width — between COLLAPSED_W (52) and the measured expandedW
              • marginRight — between 0 and (CANCEL_RESERVED + CANCEL_GAP),
                which slides the capsule's right edge inward to make room
                for the Cancel button when it appears.
            Both run on the same elastic spring so the right edge tracks the
            Cancel button perfectly during the morph. */}
        <motion.div
          onClick={isSearching ? undefined : onOpenSearch}
          className="flex items-center overflow-hidden rounded-full"
          initial={false}
          animate={{
            width: isSearching ? expandedW : COLLAPSED_W,
            marginRight: isSearching ? CANCEL_RESERVED + CANCEL_GAP : 0,
            backgroundColor: isSearching ? colors.surfaceCapsule : "rgba(0,0,0,0)",
            // Horizontal padding morphs (14 collapsed / 12 expanded — Swift spec).
            paddingLeft: isSearching ? 12 : 14,
            paddingRight: isSearching ? 12 : 14,
          }}
          transition={ELASTIC_SPRING}
          style={{
            // Height is fixed at 52pt in both states. The Swift original lets
            // the capsule's intrinsic height shrink to 36pt when expanded
            // (icon 16 + 10/10 padding), but visually we want the bar to
            // stay the navbar's full 52pt slot — otherwise the status bar
            // and the result list close in on it and the bar feels cramped.
            // Vertical centering of the icon is therefore handled by
            // `items-center`, not by paddingTop/Bottom.
            height: 52,
            boxSizing: "border-box",
            marginLeft: "auto",
            cursor: isSearching ? undefined : "pointer",
            flexShrink: 0,
          }}
          aria-label={isSearching ? undefined : "Search"}
          role={isSearching ? undefined : "button"}
        >
          {/* Icon — masked SVG. Width/height/color animate on the same spring
              as the capsule, so it settles into place exactly as the capsule
              finishes its morph. No layout transform inheritance, no jump.
              `marginRight` is the icon→text spacing (Swift's
              `XMDSSpacing.textSpanIconMargin = 8pt`), animated alongside
              everything else so it's never momentarily eaten by an overshoot. */}
          <motion.span
            initial={false}
            animate={{
              width: isSearching ? 16 : 24,
              height: isSearching ? 16 : 24,
              // Icon → text gap. Swift uses XMDSSpacing.textSpanIconMargin = 8pt.
              // Animated alongside size/color on the same elastic spring so
              // there's never a moment where the icon collides with the text.
              marginRight: isSearching ? 8 : 0,
              backgroundColor: isSearching ? colors.iconSecondary : colors.iconPrimary,
            }}
            transition={ELASTIC_SPRING}
            aria-hidden
            style={{
              display: "inline-block",
              flexShrink: 0,
              WebkitMaskImage: `url(${SEARCH_ICON_URL})`,
              maskImage: `url(${SEARCH_ICON_URL})`,
              WebkitMaskRepeat: "no-repeat",
              maskRepeat: "no-repeat",
              WebkitMaskPosition: "center",
              maskPosition: "center",
              WebkitMaskSize: "contain",
              maskSize: "contain",
            }}
          />

          {/* Text field — fades in slightly behind the morph so it doesn't
              pop into a half-grown capsule. */}
          <motion.div
            className="relative flex-1"
            initial={false}
            animate={{ opacity: isSearching ? 1 : 0 }}
            transition={{ duration: 0.2, delay: isSearching ? 0.15 : 0, ease: "linear" }}
            style={{ pointerEvents: isSearching ? "auto" : "none", minWidth: 0 }}
          >
            <input
              ref={inputRef}
              type="text"
              value={searchText}
              onChange={(e) => onSearchTextChange(e.target.value)}
              placeholder="Search in Accounts Center"
              aria-label="Search in Accounts Center"
              className="w-full bg-transparent focus:outline-none"
              style={{
                fontFamily: FONT,
                fontSize: 15,
                color: colors.textPrimary,
                lineHeight: "20px",
              }}
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
            />
            {!searchText && (
              <span
                className="pointer-events-none absolute inset-0 flex items-center"
                style={{
                  fontFamily: FONT,
                  fontSize: 15,
                  color: colors.textSecondary,
                  lineHeight: "20px",
                }}
              >
                Search in Accounts Center
              </span>
            )}
          </motion.div>

          {/* Clear button — only mounts when expanded + has text */}
          <AnimatePresence>
            {isSearching && searchText.length > 0 ? (
              <motion.button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onSearchTextChange("");
                  inputRef.current?.focus({ preventScroll: true });
                }}
                aria-label="Clear search"
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                transition={{ duration: 0.15 }}
                className="flex shrink-0 items-center justify-center"
                style={{ marginLeft: 8 }}
              >
                <XmdsIcon name={UI_ICONS.clear} size={16} color={colors.iconSecondary} />
              </motion.button>
            ) : null}
          </AnimatePresence>
        </motion.div>

        {/* Cancel button — absolutely positioned so its mount/unmount doesn't
            reflow the capsule's flex layout. Its slide is purely a transform,
            running on the same elastic spring. */}
        <AnimatePresence>
          {isSearching ? (
            <motion.button
              key="cancel"
              type="button"
              onClick={onCancel}
              initial={{ opacity: 0, x: 20, y: "-50%" }}
              animate={{ opacity: 1, x: 0, y: "-50%" }}
              exit={{ opacity: 0, x: 20, y: "-50%" }}
              transition={ELASTIC_SPRING}
              style={{
                position: "absolute",
                right: HORIZONTAL_PADDING,
                top: "50%",
                fontFamily: FONT,
                fontSize: 15,
                fontWeight: 500,
                color: colors.textPrimary,
                lineHeight: "20px",
              }}
            >
              Cancel
            </motion.button>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}
