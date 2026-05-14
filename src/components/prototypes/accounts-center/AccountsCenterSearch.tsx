"use client";

import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import data from "./accounts_center_settings.json";

import IOSStatusBar from "../shared/IOSStatusBar";
import MorphingSearchBar from "./MorphingSearchBar";
import SearchResults from "./SearchResults";
import XmdsIcon from "./XmdsIcon";
import { TOP_LEVEL_ICONS, UI_ICONS } from "./constants";
import { buildIndex, search } from "./searchLogic";
import { FONT, useTheme, type ThemeColors } from "./theme";
import type { ACEntry } from "./types";

const ENTRIES = data as ACEntry[];

interface Props {
  onResultClick?: (entry: ACEntry) => void;
}

/**
 * Top-level showcase for the morphing search interaction.
 *
 * Renders a mocked Accounts Center home as the resting state; the morphing
 * search bar transforms the entire experience into a live filtered settings
 * search. Designed to be embedded in a 375pt-wide phone frame.
 */
export default function AccountsCenterSearch({ onResultClick }: Props) {
  const { colors, isDark } = useTheme();
  const [isSearching, setIsSearching] = useState(false);
  const [searchText, setSearchText] = useState("");

  const byID = useMemo(() => buildIndex(ENTRIES), []);
  const results = useMemo(
    () => search(searchText, ENTRIES, byID),
    [searchText, byID],
  );

  const handleCancel = () => {
    setSearchText("");
    setIsSearching(false);
  };

  return (
    /* ────────────────────────────────────────────────────────────────────
       Bottom sheet presentation
       ────────────────────────────────────────────────────────────────────
       Mirrors XMDS's `.bottomSheet(variant: .full)` — see
       `BottomSheetPresentationController.swift`. The visual layering in iOS,
       back-to-front, is:
           1. presentingView (Card A, the parent app, scaled 91%)
           2. dimmingView    (containerView.bounds, 60% black) ← covers Card A
           3. presentedView  (Card B, front sheet) — drawn ON TOP of the dim,
                              so it's never dimmed itself
       The dim is `containerView.bounds` (the entire screen). It's only ever
       visible in the slice above the front sheet, because Card B occludes it
       below. That's why the area above the sheet reads as a uniform dim — not
       as a separate "peek strip" with a visible color shift.
       Tokens (also from BottomSheetPresentationController.swift):
         • sheetHeightRatio:        0.92  → sheet top at 8% (65pt on 812pt)
         • frontSheetCornerRadius:  32pt
         • backSheetCornerRadius:   24pt  (subtle peek, often invisible
                                          through 60% dim — kept anyway for
                                          the slight depth cue at the curve)
         • topPeekDistance:         12pt
         • dimmingView alpha:       0.6 black
         • status bar style:        .lightContent (white) over the dim
    */
    <div
      className="relative w-full h-full overflow-hidden"
      style={{
        fontFamily: FONT,
        // Card A — the parent app showing through the dim. We don't have a
        // real parent app to render here, so we paint the surface color
        // directly. Critical: NOT black. With a black backdrop the 0.6 dim
        // reads as solid black; against the surface color it reads as the
        // medium gray you see in the iOS reference (light bg dimmed 60%).
        backgroundColor: colors.surfaceBg,
      }}
    >
      {/* Card A's rounded top peek. Sits 12pt above the front sheet's top
          edge with a 24pt rounded corner. The dim layer above means this is
          *barely* perceptible (mostly hidden by the dim's color) — but it
          softens the silhouette of the front sheet's curve and matches the
          double-curve effect you can see in the iOS reference. */}
      <div
        className="absolute left-0 right-0"
        style={{
          top: SHEET_TOP - BACK_CARD_PEEK,
          bottom: 0,
          backgroundColor: colors.surfaceBg,
          borderTopLeftRadius: BACK_CARD_RADIUS,
          borderTopRightRadius: BACK_CARD_RADIUS,
        }}
        aria-hidden
      />

      {/* Dim — full container. The front sheet covers it from `SHEET_TOP`
          down, so it's only visible above the sheet. Drawing it full-bleed
          (instead of clipping it to the area above the sheet) is what gives
          the smooth, uniform tone you see in the reference: there's no
          seam where the dim ends and an "undimmed peek" starts. */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
        aria-hidden
      />

      {/* iOS status bar — `.lightContent` style sits over the dimmed area. */}
      <IOSStatusBar tint="#FFFFFF" />

      {/* Front sheet — Card B. Rendered AFTER the dim so it occludes it.
          This is the "92% sheet" — top at SHEET_TOP, bottom at the screen
          bottom, with a 32pt rounded top.
          The 16pt `paddingTop` lets the search experience (navbar + results)
          breathe away from the sheet's rounded edge — without it, the
          magnifier hugs the curve and the whole thing feels cramped. */}
      <div
        className="absolute left-0 right-0 bottom-0 flex flex-col overflow-hidden"
        style={{
          top: SHEET_TOP,
          borderTopLeftRadius: FRONT_SHEET_RADIUS,
          borderTopRightRadius: FRONT_SHEET_RADIUS,
          backgroundColor: colors.surfaceBg,
          paddingTop: SHEET_CONTENT_TOP_INSET,
        }}
      >
        <MorphingSearchBar
          isSearching={isSearching}
          searchText={searchText}
          onSearchTextChange={setSearchText}
          onOpenSearch={() => setIsSearching(true)}
          onCancel={handleCancel}
          colors={colors}
          isDark={isDark}
        />

        {/* Body — Swift's ZStack pattern: both views are always mounted and
            occupy the same space; only opacity & hit-testing toggle. This
            mirrors `AccountsCenterPreview.body`'s
                ZStack {
                    homeContent.opacity(isSearching ? 0 : 1)
                    AccountsCenterSearchContent(...).opacity(isSearching ? 1 : 0)
                }
            and avoids the unmount/remount reflow that AnimatePresence's
            mode="wait" introduces. Reflow during the morph is what made the
            sheet appear to nudge upward when the user typed. */}
        <div className="relative flex-1 overflow-hidden">
          <motion.div
            className="absolute inset-0 overflow-y-auto"
            animate={{ opacity: isSearching ? 0 : 1 }}
            initial={false}
            transition={{ duration: 0.2 }}
            style={{
              pointerEvents: isSearching ? "none" : "auto",
            }}
            aria-hidden={isSearching}
          >
            <HomeContent colors={colors} />
          </motion.div>

          <motion.div
            className="absolute inset-0 overflow-y-auto"
            animate={{ opacity: isSearching ? 1 : 0 }}
            initial={false}
            transition={{ duration: 0.2 }}
            style={{
              pointerEvents: isSearching ? "auto" : "none",
            }}
            aria-hidden={!isSearching}
          >
            <SearchResults
              query={searchText}
              results={results}
              colors={colors}
              onResultClick={onResultClick}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// Bottom-sheet geometry tokens — pulled directly from
// `BottomSheetPresentationController.swift`.
const FRONT_SHEET_RADIUS = 32;
const BACK_CARD_RADIUS = 24;
const BACK_CARD_PEEK = 12;
// 8% of the iPhone frame's 812pt design height ≈ 65pt of backdrop visible
// above the front sheet. Matches `sheetHeightRatio: 0.92`.
const SHEET_TOP = 65;
// Breathing room between the front sheet's rounded top edge and the first
// piece of content (the morphing nav bar). Without this, the search icon
// hugs the curve and the search experience feels cramped.
const SHEET_CONTENT_TOP_INSET = 16;

/* -------------------------------------------------------------------------- */
/* Home content — believable AC mock to set the stage for the search reveal.  */
/* Section structure mirrors AccountsCenterScreen1Content from the Swift src. */
/* -------------------------------------------------------------------------- */

interface HomeRow {
  id: string;
  label: string;
  description?: string;
  detail?: string;
  variant?: "icon" | "stackedPhotos";
}

interface HomeSection {
  title?: string;
  rows: HomeRow[];
}

const HOME_SECTIONS: HomeSection[] = [
  {
    rows: [
      {
        id: "profiles",
        label: "Profiles",
        description: "Robbie Manson, robbiemanson and mademountain",
        detail: "3",
        variant: "stackedPhotos",
      },
    ],
  },
  {
    title: "Account settings",
    rows: [
      { id: "password_security", label: "Password and security" },
      { id: "personal_details", label: "Personal details" },
      { id: "your_info_permissions", label: "Your information and permissions" },
      { id: "ad_preferences", label: "Ad preferences" },
      { id: "payments", label: "Meta Pay" },
      { id: "subscriptions", label: "Subscriptions" },
    ],
  },
];

function HomeContent({ colors }: { colors: ThemeColors }) {
  return (
    <div style={{ paddingLeft: 16, paddingRight: 16, paddingBottom: 48, paddingTop: 8 }}>
      {/* Page header — XMDSTextPairing.level1, center alignment */}
      <header
        className="text-center"
        style={{
          paddingTop: 8,
          paddingBottom: 28,
        }}
      >
        <h1
          style={{
            fontFamily: FONT,
            fontSize: 22,
            fontWeight: 700,
            color: colors.textPrimary,
            letterSpacing: -0.4,
            lineHeight: "28px",
          }}
        >
          Accounts Center
        </h1>
        <p
          style={{
            fontFamily: FONT,
            fontSize: 13,
            color: colors.textSecondary,
            lineHeight: "18px",
            marginTop: 8,
          }}
        >
          Manage your connected experiences and account settings across Meta
          technologies such as Facebook, Instagram and Meta Horizon.{" "}
          <span style={{ color: colors.accent, fontWeight: 600 }}>Learn more</span>
        </p>
      </header>

      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        {HOME_SECTIONS.map((section, sectionIndex) => (
          <section key={sectionIndex}>
            {section.title ? (
              <h2
                style={{
                  fontFamily: FONT,
                  fontSize: 15,
                  fontWeight: 600,
                  color: colors.textPrimary,
                  lineHeight: "20px",
                  marginBottom: 12,
                  paddingLeft: 4,
                }}
              >
                {section.title}
              </h2>
            ) : null}
            <div
              className="overflow-hidden"
              style={{
                borderRadius: 16,
                backgroundColor: colors.surfaceCard,
                border: `1px solid ${colors.border}`,
              }}
            >
              {section.rows.map((row, rowIndex) => (
                <HomeListCell
                  key={row.id}
                  row={row}
                  colors={colors}
                  showDivider={rowIndex < section.rows.length - 1}
                />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

function HomeListCell({
  row,
  colors,
  showDivider,
}: {
  row: HomeRow;
  colors: ThemeColors;
  showDivider: boolean;
}) {
  return (
    <div
      className="flex items-center"
      style={{
        gap: 12,
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 12,
        paddingBottom: 12,
        minHeight: 52,
        borderBottom: showDivider ? `0.5px solid ${colors.divider}` : "none",
      }}
    >
      <LeftAddOn row={row} colors={colors} />

      <div className="flex min-w-0 flex-1 flex-col" style={{ gap: 2 }}>
        <span
          className="truncate"
          style={{
            fontFamily: FONT,
            fontSize: 15,
            fontWeight: 500,
            color: colors.textPrimary,
            lineHeight: "20px",
          }}
        >
          {row.label}
        </span>
        {row.description ? (
          <span
            style={{
              fontFamily: FONT,
              fontSize: 13,
              color: colors.textSecondary,
              lineHeight: "18px",
            }}
          >
            {row.description}
          </span>
        ) : null}
      </div>

      {/* Trailing: optional count + chevron (XMDS .chevronWithDetail) */}
      <div className="flex shrink-0 items-center" style={{ gap: 4 }}>
        {row.detail ? (
          <span
            style={{
              fontFamily: FONT,
              fontSize: 15,
              color: colors.textSecondary,
              lineHeight: "20px",
            }}
          >
            {row.detail}
          </span>
        ) : null}
        <XmdsIcon name={UI_ICONS.caretRight} size={12} color={colors.iconTertiary} />
      </div>
    </div>
  );
}

function LeftAddOn({ row, colors }: { row: HomeRow; colors: ThemeColors }) {
  if (row.variant === "stackedPhotos") {
    return <StackedProfilePhotos ringColor={colors.surfaceCard} />;
  }

  const iconName = TOP_LEVEL_ICONS[row.id] ?? null;
  return (
    <div
      className="flex shrink-0 items-center justify-center"
      style={{ width: 24, height: 24 }}
    >
      {iconName ? (
        <XmdsIcon name={iconName} size={24} color={colors.iconPrimary} />
      ) : null}
    </div>
  );
}

/**
 * Two profile photos overlapping — matches XMDSStackedProfilePhoto with two
 * .medium-size images. Real source uses 40pt photos with ~14pt overlap.
 * The ring around each photo matches the row's surface color so the photos
 * read as cleanly stacked without a visible seam.
 */
function StackedProfilePhotos({ ringColor }: { ringColor: string }) {
  const SIZE = 40;
  const OVERLAP = 14;

  return (
    <div
      className="relative shrink-0"
      style={{ width: SIZE * 2 - OVERLAP, height: SIZE }}
    >
      {[
        "/prototypes/accounts-center/photos/profilePhoto2.jpg",
        "/prototypes/accounts-center/photos/profilePhoto1.jpg",
      ].map((src, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={src}
          src={src}
          alt=""
          draggable={false}
          style={{
            position: "absolute",
            top: 0,
            left: i * (SIZE - OVERLAP),
            width: SIZE,
            height: SIZE,
            borderRadius: "50%",
            objectFit: "cover",
            boxShadow: `0 0 0 2px ${ringColor}`,
            zIndex: i,
          }}
        />
      ))}
    </div>
  );
}
