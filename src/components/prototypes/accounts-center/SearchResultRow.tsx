"use client";

import XmdsIcon from "./XmdsIcon";
import { TOP_LEVEL_ICONS, UI_ICONS } from "./constants";
import { FONT, type ThemeColors } from "./theme";
import type { ACSearchResult } from "./types";

interface Props {
  result: ACSearchResult;
  showDivider: boolean;
  colors: ThemeColors;
  onClick?: () => void;
}

/**
 * One row in the results list. Renders an icon column (real icon or invisible
 * spacer for indented children), the label, an optional parent breadcrumb,
 * and a trailing chevron.
 *
 * Spacing follows XMDS list cell spec:
 *  - vertical padding: 12pt
 *  - horizontal padding: 16pt (insetLarge)
 *  - gap between left add-on and label column: 12pt
 *  - large icon size: 24pt
 *  - chevron: 12pt SF chevron-right
 */
export default function SearchResultRow({ result, showDivider, colors, onClick }: Props) {
  const { entry, iconKey, parentLabel } = result;
  const iconName = iconKey ? TOP_LEVEL_ICONS[iconKey] : null;

  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center text-left ${
        onClick ? "active:opacity-70" : "cursor-default"
      }`}
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
      {/* Icon column — always reserves 24px so children (no icon) align with parents */}
      <div
        className="flex shrink-0 items-center justify-center"
        style={{ width: 24, height: 24 }}
      >
        {iconName ? (
          <XmdsIcon name={iconName} size={24} color={colors.iconPrimary} />
        ) : null}
      </div>

      {/* Label + optional breadcrumb */}
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
          {entry.label}
        </span>
        {parentLabel ? (
          <span
            className="truncate"
            style={{
              fontFamily: FONT,
              fontSize: 13,
              color: colors.textSecondary,
              lineHeight: "18px",
            }}
          >
            {parentLabel}
          </span>
        ) : null}
      </div>

      {/* Trailing chevron */}
      <XmdsIcon name={UI_ICONS.caretRight} size={12} color={colors.iconTertiary} />
    </button>
  );
}
