/**
 * XMDSPersistentFooter — top divider + a single primary CTA button. Sticks to
 * the bottom of whatever container we're embedded in. Used by every screen in
 * the flow that has a forward action (`Continue`, `Verify`, `Done`, …).
 */

import type { ThemeColors } from "../../accounts-center/theme";
import { FONT } from "../../accounts-center/theme";

export default function PersistentFooter({
  colors,
  label = "Continue",
  onPress,
  disabled = false,
}: {
  colors: ThemeColors;
  /** CTA copy. Defaults to `"Continue"` since most screens use that verb. */
  label?: string;
  /** Tap handler. Optional — omit on the static entry view. */
  onPress?: () => void;
  /** Render disabled (greyed-out, not interactive). */
  disabled?: boolean;
}) {
  const inert = disabled || !onPress;
  return (
    <footer
      className="shrink-0"
      style={{
        borderTop: `0.5px solid ${colors.divider}`,
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 12,
        // Standard iOS home-indicator inset so the button doesn't sit on the
        // hardware swipe handle.
        paddingBottom: 34,
        backgroundColor: colors.surfaceBg,
      }}
    >
      <button
        type="button"
        onClick={onPress}
        disabled={inert}
        className="w-full active:opacity-90"
        style={{
          height: 52,
          borderRadius: 26,
          backgroundColor: colors.accent,
          color: "#FFFFFF",
          fontFamily: FONT,
          fontSize: 17,
          fontWeight: 600,
          letterSpacing: -0.2,
          border: "none",
          cursor: inert ? "not-allowed" : "pointer",
          opacity: inert ? 0.45 : 1,
        }}
      >
        {label}
      </button>
    </footer>
  );
}
