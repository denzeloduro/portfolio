"use client";

import { useEffect, useState } from "react";

/**
 * XMDS color tokens, ported approximately from the Optimistic/AC iOS template.
 * Light mode tracks `Color.xmds.surfaceBackground` / `surfaceCard` etc.
 */
export const LIGHT = {
  surfaceBg: "#FFFFFF",
  surfaceCard: "#FFFFFF",
  surfaceCapsule: "rgba(0, 0, 0, 0.05)",
  textPrimary: "#0A1317",
  textSecondary: "#465A69",
  textTertiary: "#5D6C7B",
  iconPrimary: "#0A1317",
  iconSecondary: "#5D6C7B",
  iconTertiary: "#8E9AA5",
  divider: "#EDF0F2",
  border: "#DDE2E8",
  accent: "#0064E0",
};

export const DARK = {
  surfaceBg: "#0A1317",
  surfaceCard: "#1C2B33",
  surfaceCapsule: "rgba(255, 255, 255, 0.08)",
  textPrimary: "#F1F4F7",
  textSecondary: "#96A6B4",
  textTertiary: "#7E8E9C",
  iconPrimary: "#F1F4F7",
  iconSecondary: "#96A6B4",
  iconTertiary: "#7E8E9C",
  divider: "rgba(255, 255, 255, 0.08)",
  border: "rgba(255, 255, 255, 0.10)",
  accent: "#4BA9FE",
};

export type ThemeColors = typeof LIGHT;

export function useTheme(): { colors: ThemeColors; isDark: boolean } {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const check = () =>
      setIsDark(document.documentElement.classList.contains("dark"));
    check();
    const observer = new MutationObserver(check);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  return { colors: isDark ? DARK : LIGHT, isDark };
}

export const FONT =
  "var(--font-optimistic), system-ui, -apple-system, sans-serif";
