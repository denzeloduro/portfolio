"use client";

/**
 * Renders an XMDS template SVG icon as a recolorable mask, mirroring SwiftUI's
 * `Image(...).renderingMode(.template).foregroundStyle(...)`.
 *
 * The SVG asset itself has hardcoded fills (e.g. `#0A1317`); using it as a
 * CSS mask lets us paint the silhouette with whatever color we pass in.
 */
export default function XmdsIcon({
  name,
  size = 24,
  color,
  className,
}: {
  /** Filename without extension, e.g. "shield_Outline_24". */
  name: string;
  size?: number;
  color: string;
  className?: string;
}) {
  const url = `/prototypes/accounts-center/icons/${name}.svg`;

  return (
    <span
      className={className}
      aria-hidden
      style={{
        display: "inline-block",
        width: size,
        height: size,
        backgroundColor: color,
        WebkitMaskImage: `url(${url})`,
        maskImage: `url(${url})`,
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
        WebkitMaskSize: "contain",
        maskSize: "contain",
        flexShrink: 0,
      }}
    />
  );
}
