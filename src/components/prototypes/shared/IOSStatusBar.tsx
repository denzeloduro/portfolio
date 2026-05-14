"use client";

/**
 * iOS 16/17 status bar — shared between prototypes.
 *
 * Drawn at the iPhone 14 Pro reference size (390×844). The bar itself is
 * 54pt tall (the dynamic-island safe-area inset), with the time on the left
 * and the cellular / wi-fi / battery cluster on the right.
 *
 * The SVGs are hand-tuned to match Apple's actual icon proportions:
 *   • Cellular: 4 vertical rounded bars at heights 4 / 6 / 8 / 10pt
 *   • Wi-Fi:    3 filled arc segments + a dot, rendered as path geometry
 *               (not stroked arcs) to match SF Symbol's `wifi` glyph
 *   • Battery:  rounded outline at ~35% alpha + solid inner fill + tip,
 *               width 25pt × height 13pt, matching the system battery glyph
 */
interface Props {
  /**
   * The status-bar tint (foreground color of time + glyphs). Pass the
   * underlying view's `iconPrimary` for the standard look, or `#fff` when
   * the bar sits over a dimmed backdrop (e.g. a `.bottomSheet(.full)`
   * presentation, where iOS would render `.lightContent`).
   */
  tint: string;
}

export default function IOSStatusBar({ tint }: Props) {
  return (
    <div
      className="absolute top-0 left-0 right-0 flex items-center justify-between pointer-events-none select-none"
      style={{
        height: 54,
        // Apple's reference layout: time baseline ≈ 17pt below the dynamic
        // island's safe-area top; right cluster vertically aligned to the
        // time's optical center.
        paddingTop: 17,
        paddingLeft: 33,
        paddingRight: 28,
        zIndex: 50,
        // SF Pro is the system font on Apple devices; the stack falls back
        // to Inter / system on other platforms which is visually close.
        fontFamily:
          '-apple-system, "SF Pro Text", "SF Pro", system-ui, sans-serif',
      }}
    >
      {/* Time — SF Pro Text, semibold, slightly tightened tracking. */}
      <span
        style={{
          fontSize: 17,
          fontWeight: 600,
          color: tint,
          letterSpacing: -0.4,
          lineHeight: "22px",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        9:41
      </span>

      {/* Right cluster — gap matches the system spacing. */}
      <div className="flex items-center" style={{ gap: 6 }}>
        <CellularBars tint={tint} />
        <WifiGlyph tint={tint} />
        <BatteryGlyph tint={tint} />
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Cellular signal — 4 vertical rounded bars, ascending heights.              */
/* -------------------------------------------------------------------------- */

function CellularBars({ tint }: { tint: string }) {
  // Bar widths and gaps match Apple's pixel grid: 3pt bars, 2pt gaps.
  const bars = [
    { x: 0, y: 6, h: 4 },
    { x: 5, y: 4, h: 6 },
    { x: 10, y: 2, h: 8 },
    { x: 15, y: 0, h: 10 },
  ];
  return (
    <svg
      width="18"
      height="10"
      viewBox="0 0 18 10"
      fill="none"
      aria-hidden
      role="presentation"
    >
      {bars.map((b) => (
        <rect
          key={b.x}
          x={b.x}
          y={b.y}
          width={3}
          height={b.h}
          rx={1}
          fill={tint}
        />
      ))}
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/* Wi-Fi glyph — 3 filled arc segments + dot. Path matches Apple's `wifi`     */
/* SF Symbol at the status-bar weight (regular, scale: medium).               */
/* -------------------------------------------------------------------------- */

function WifiGlyph({ tint }: { tint: string }) {
  return (
    <svg
      width="17"
      height="12"
      viewBox="0 0 17 12"
      fill={tint}
      aria-hidden
      role="presentation"
    >
      {/* Outer arc — filled "C" shape that hugs the upper hemisphere. */}
      <path d="M8.5 0.7c2.61 0 5.05 0.97 6.93 2.62a0.6 0.6 0 0 1 0.05 0.86l-1.07 1.16a0.6 0.6 0 0 1-0.84 0.05A8.07 8.07 0 0 0 8.5 3.46a8.07 8.07 0 0 0-5.07 1.93 0.6 0.6 0 0 1-0.84-0.05L1.52 4.18a0.6 0.6 0 0 1 0.05-0.86A10.46 10.46 0 0 1 8.5 0.7z" />
      {/* Middle arc. */}
      <path d="M8.5 4.62c1.6 0 3.09 0.55 4.27 1.49a0.6 0.6 0 0 1 0.07 0.87l-1.06 1.15a0.6 0.6 0 0 1-0.85 0.05 4.4 4.4 0 0 0-2.43-0.83 4.4 4.4 0 0 0-2.43 0.83 0.6 0.6 0 0 1-0.85-0.05L4.16 6.98a0.6 0.6 0 0 1 0.07-0.87A6.79 6.79 0 0 1 8.5 4.62z" />
      {/* Inner dot. */}
      <circle cx="8.5" cy="10.05" r="1.45" />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/* Battery — outline + inner fill + cap. Matches the system battery glyph     */
/* at full charge (the only state we ever render in a static status bar).     */
/* -------------------------------------------------------------------------- */

function BatteryGlyph({ tint }: { tint: string }) {
  return (
    <svg
      width="27"
      height="13"
      viewBox="0 0 27 13"
      fill="none"
      aria-hidden
      role="presentation"
    >
      {/* Outline — 1pt stroke at 35% alpha, matching iOS. */}
      <rect
        x="0.5"
        y="0.5"
        width="22"
        height="12"
        rx="3.8"
        ry="3.8"
        stroke={tint}
        strokeOpacity="0.35"
        fill="none"
      />
      {/* Battery cap on the right side. */}
      <path
        d="M24 4.4v4.2a1.3 1.3 0 0 0 0-4.2z"
        fill={tint}
        fillOpacity="0.4"
      />
      {/* Inner fill — 1.5pt inset from the outline, rounded. */}
      <rect
        x="2"
        y="2"
        width="19"
        height="9"
        rx="2.3"
        ry="2.3"
        fill={tint}
      />
    </svg>
  );
}
