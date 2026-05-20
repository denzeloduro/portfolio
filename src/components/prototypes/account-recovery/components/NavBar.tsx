/**
 * XMDSNavBar `.standard` — back-only chrome, no title, no shadow. Matches
 * `ARMethodSelectorScreen.swift`'s `navbarConfig`. Future screens that need a
 * title or trailing actions can extend this component or render their own.
 *
 * Tap target follows Apple's 44pt minimum.
 */

import type { ThemeColors } from "../../accounts-center/theme";
import IconMask from "./IconMask";

export default function NavBar({
  colors,
  onBack,
  title,
}: {
  colors: ThemeColors;
  /** Tap handler for the back button. When omitted the button is inert
   *  (used by the root-of-flow screen where there's nothing to pop). */
  onBack?: () => void;
  /** Optional centered title. Omit for screens that should read as
   *  chrome-only (matches the Method Selector). */
  title?: string;
}) {
  const backInert = !onBack;
  return (
    <div
      className="relative w-full"
      style={{
        // Below the iOS status bar — 44pt nav content area (Apple standard)
        // plus the 8pt baseline that XMDSNavBar's `.standard` variant uses.
        marginTop: 54,
        height: 52,
      }}
    >
      <button
        type="button"
        aria-label="Back"
        onClick={onBack}
        disabled={backInert}
        className="absolute flex items-center justify-center active:opacity-75"
        style={{
          left: 8,
          top: "50%",
          transform: "translateY(-50%)",
          width: 44,
          height: 44,
          background: "none",
          border: "none",
          cursor: backInert ? "default" : "pointer",
          opacity: backInert ? 0.6 : 1,
        }}
      >
        <IconMask
          name="caret-left_Outline_24"
          size={24}
          color={colors.iconPrimary}
        />
      </button>

      {title && (
        <h1
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            margin: 0,
            fontFamily: "var(--font-optimistic), system-ui, sans-serif",
            fontSize: 17,
            fontWeight: 600,
            color: colors.textPrimary,
            letterSpacing: -0.2,
          }}
        >
          {title}
        </h1>
      )}
    </div>
  );
}
