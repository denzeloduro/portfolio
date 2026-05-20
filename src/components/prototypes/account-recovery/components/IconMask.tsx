/**
 * Tintable XMDS icon — loads an outline SVG via CSS mask so we can recolor it
 * per-theme without shipping multiple files. Identical in spirit to the
 * accounts-center `XmdsIcon`, but it resolves asset paths under
 * `/prototypes/account-recovery/icons` via the shared `ICON_PATH` helper.
 */

import { ICON_PATH } from "../types";

export default function IconMask({
  name,
  size,
  color,
}: {
  /** XMDS icon basename, e.g. `"caret-left_Outline_24"`. */
  name: string;
  size: number;
  color: string;
}) {
  const url = ICON_PATH(name);
  return (
    <span
      aria-hidden
      style={{
        display: "inline-block",
        flexShrink: 0,
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
      }}
    />
  );
}
