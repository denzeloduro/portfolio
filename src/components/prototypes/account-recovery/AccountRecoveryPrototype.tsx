"use client";

/**
 * Account Recovery — LARA "initiate view" (Method Selector).
 *
 * Ported from `ARMethodSelectorScreen.swift` in the `maa_ar_full_flow`
 * SwiftUI prototype. Shows the user a profile header (photo + name +
 * subtitle) and a list of authentication methods to pick from, each with a
 * leading XMDS icon, a short label, a "Get code to …" / equivalent
 * description, and a trailing radio button. A "No longer have access to
 * these?" link sits between the list and the persistent "Continue" button.
 *
 * The default settings from `MARPrototypeSettings.swift` are baked in:
 *   • Trust: vetted, US/Canada, unshared phone
 *   • Methods enabled: Email + WhatsApp + SMS (always-on Password appended)
 *   • User: Christy Song / christysong@gmail.com / +1 800-600-4660
 *
 * SMS-delay countdown and the "See more" affordance (ROW SMS-collapse) are
 * intentionally omitted — they only kick in for the Rest-of-world market
 * with 5+ methods, and this view is set to US/Canada defaults.
 */

import { useState } from "react";
import { motion } from "framer-motion";
import IOSStatusBar from "../shared/IOSStatusBar";
import { FONT, useTheme, type ThemeColors } from "../accounts-center/theme";

/* -------------------------------------------------------------------------- */
/* Methods — matches MARPrototypeSettings's `enabledChallengeMethods` order   */
/* for the default US/CA vetted user (email + WhatsApp + SMS), with the      */
/* always-on Password row appended.                                           */
/* -------------------------------------------------------------------------- */

type MethodId = "email" | "whatsApp" | "sms" | "password";

interface MethodDef {
  id: MethodId;
  /** Short label rendered as the row's primary text. */
  label: string;
  /** "Get code to …" / equivalent secondary line. */
  description: string;
  /** XMDS icon basename (under /prototypes/account-recovery/icons). */
  iconName: string;
}

const EMAIL = "christysong@gmail.com";
const PHONE = "+1 800-600-4660";
const FULL_NAME = "Christy Song";

const METHODS: MethodDef[] = [
  {
    id: "email",
    label: "Email",
    description: `Get code to\n${EMAIL}`,
    iconName: "shallow-v-rectangle_Outline_24",
  },
  {
    id: "whatsApp",
    label: "WhatsApp",
    description: `Get code to ${PHONE}`,
    iconName: "whatsapp_Outline_24",
  },
  {
    id: "sms",
    label: "SMS",
    description: `Get code to ${PHONE}`,
    iconName: "speech-bubble-stacked_Outline_24",
  },
  {
    id: "password",
    label: "Password",
    description: "Enter password to log in",
    iconName: "padlock-closed_Outline_24",
  },
];

const ICON_PATH = (name: string) =>
  `/prototypes/account-recovery/icons/${name}.svg`;

export default function AccountRecoveryPrototype() {
  const { colors } = useTheme();
  // Pre-selects the first method on appear — matches the Swift `.onAppear`
  // that pulls `enabledChallengeMethods.first` when the coordinator has no
  // prior selection. Keeps the user from staring at an empty list state.
  const [selected, setSelected] = useState<MethodId>("email");

  return (
    <div
      className="relative w-full h-full overflow-hidden flex flex-col"
      style={{ fontFamily: FONT, backgroundColor: colors.surfaceBg }}
    >
      <IOSStatusBar tint={colors.iconPrimary} />

      {/* XMDS nav bar — back-only chrome, no title, no shadow (matches
          ARMethodSelectorScreen's `navbarConfig`). */}
      <NavBar colors={colors} />

      {/* Scrollable content area between navbar and persistent footer. */}
      <div className="relative flex-1 overflow-y-auto">
        <div
          style={{
            paddingLeft: 16,
            paddingRight: 16,
            paddingTop: 8,
            paddingBottom: 24,
            display: "flex",
            flexDirection: "column",
            gap: 32, // XMDSSpacing.stackXLarge between header and list
          }}
        >
          <ProfileHeader colors={colors} />

          <MethodList
            methods={METHODS}
            selected={selected}
            onSelect={setSelected}
            colors={colors}
          />

          {/* "No longer have access to these?" — link styled, centered.
              Inert here (matches the Swift, where the action is `{}`). */}
          <button
            type="button"
            className="self-center"
            style={{
              fontFamily: FONT,
              fontSize: 15,
              fontWeight: 500,
              color: colors.accent,
              lineHeight: "20px",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "8px 12px",
            }}
          >
            No longer have access to these?
          </button>
        </div>
      </div>

      {/* XMDSPersistentFooter — divider + Continue button. Sticks to the
          bottom of the sheet (or whatever container we're embedded in). */}
      <PersistentFooter colors={colors} hasSelection={selected !== null} />
    </div>
  );
}

/* ========================================================================== */
/* Sub-components                                                              */
/* ========================================================================== */

function NavBar({ colors }: { colors: ThemeColors }) {
  return (
    <div
      className="relative w-full"
      style={{
        // Below the iOS status bar — leave 44pt nav content area (Apple's
        // standard) plus the 8pt baseline that XMDSNavBar's `.standard`
        // variant uses.
        marginTop: 54,
        height: 52,
      }}
    >
      <button
        type="button"
        aria-label="Back"
        className="absolute flex items-center justify-center active:opacity-75"
        style={{
          left: 8,
          top: "50%",
          transform: "translateY(-50%)",
          width: 44,
          height: 44,
          background: "none",
          border: "none",
          cursor: "pointer",
        }}
      >
        <IconMask
          name="caret-left_Outline_24"
          size={24}
          color={colors.iconPrimary}
        />
      </button>
    </div>
  );
}

function ProfileHeader({ colors }: { colors: ThemeColors }) {
  return (
    <header
      className="flex flex-col items-center"
      style={{ gap: 8, paddingTop: 8 }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/prototypes/account-recovery/photos/profilePhoto1.jpg"
        alt={FULL_NAME}
        draggable={false}
        style={{
          width: 100,
          height: 100,
          borderRadius: "50%",
          objectFit: "cover",
        }}
      />

      <p
        style={{
          fontFamily: FONT,
          // XMDS typography label1: 22pt, weight 700, line-height ~28pt.
          fontSize: 22,
          fontWeight: 700,
          color: colors.textPrimary,
          letterSpacing: -0.4,
          lineHeight: "28px",
          textAlign: "center",
        }}
      >
        {FULL_NAME}
      </p>

      <p
        style={{
          fontFamily: FONT,
          fontSize: 15,
          color: colors.textSecondary,
          lineHeight: "20px",
          textAlign: "center",
        }}
      >
        Choose a way to confirm your account.
      </p>
    </header>
  );
}

function MethodList({
  methods,
  selected,
  onSelect,
  colors,
}: {
  methods: MethodDef[];
  selected: MethodId;
  onSelect: (id: MethodId) => void;
  colors: ThemeColors;
}) {
  return (
    <div
      className="overflow-hidden"
      style={{
        borderRadius: 16,
        backgroundColor: colors.surfaceCard,
        border: `1px solid ${colors.border}`,
      }}
      role="radiogroup"
      aria-label="Account recovery methods"
    >
      {methods.map((method, index) => (
        <MethodRow
          key={method.id}
          method={method}
          isSelected={selected === method.id}
          onSelect={() => onSelect(method.id)}
          showDivider={index < methods.length - 1}
          colors={colors}
        />
      ))}
    </div>
  );
}

function MethodRow({
  method,
  isSelected,
  onSelect,
  showDivider,
  colors,
}: {
  method: MethodDef;
  isSelected: boolean;
  onSelect: () => void;
  showDivider: boolean;
  colors: ThemeColors;
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={isSelected}
      onClick={onSelect}
      className="flex w-full items-center text-left active:bg-black/[0.03]"
      style={{
        gap: 12, // XMDSSpacing.horizontal12
        paddingLeft: 16,
        paddingRight: 16,
        // 12pt vertical inset reads as ~52pt min-height with 16pt icon + 2 lines
        paddingTop: 12,
        paddingBottom: 12,
        minHeight: 60,
        background: "none",
        border: "none",
        borderBottom: showDivider ? `0.5px solid ${colors.divider}` : "none",
        cursor: "pointer",
      }}
    >
      <IconMask
        name={method.iconName}
        size={24}
        color={colors.iconPrimary}
      />

      <div className="flex min-w-0 flex-1 flex-col" style={{ gap: 2 }}>
        <span
          style={{
            fontFamily: FONT,
            fontSize: 15,
            fontWeight: 500,
            color: colors.textPrimary,
            lineHeight: "20px",
          }}
        >
          {method.label}
        </span>
        <span
          style={{
            fontFamily: FONT,
            fontSize: 13,
            color: colors.textSecondary,
            lineHeight: "18px",
            // Description text uses `\n` for the email row's wrap (Swift
            // hardcodes the newline so the email address always sits on
            // its own line). `white-space: pre-line` preserves that.
            whiteSpace: "pre-line",
            wordBreak: "break-word",
          }}
        >
          {method.description}
        </span>
      </div>

      <RadioButton isSelected={isSelected} colors={colors} />
    </button>
  );
}

/**
 * XMDS-style radio. 22pt outer ring; on select, fills with the accent color
 * and reveals a centered white dot. Animates with a quick spring so the tap
 * feedback feels tactile without overshooting.
 */
function RadioButton({
  isSelected,
  colors,
}: {
  isSelected: boolean;
  colors: ThemeColors;
}) {
  const OUTER = 22;
  return (
    <div
      className="relative flex shrink-0 items-center justify-center"
      style={{ width: OUTER, height: OUTER }}
      aria-hidden
    >
      <motion.div
        initial={false}
        animate={{
          backgroundColor: isSelected ? colors.accent : "transparent",
          borderColor: isSelected ? colors.accent : colors.iconTertiary,
          borderWidth: isSelected ? 0 : 1.5,
        }}
        transition={{ type: "spring", duration: 0.25, bounce: 0.2 }}
        style={{
          width: OUTER,
          height: OUTER,
          borderRadius: "50%",
          borderStyle: "solid",
        }}
      />
      <motion.div
        initial={false}
        animate={{
          opacity: isSelected ? 1 : 0,
          scale: isSelected ? 1 : 0.4,
        }}
        transition={{ type: "spring", duration: 0.25, bounce: 0.3 }}
        style={{
          position: "absolute",
          width: 8,
          height: 8,
          borderRadius: "50%",
          backgroundColor: "#FFFFFF",
        }}
      />
    </div>
  );
}

function PersistentFooter({
  colors,
  hasSelection,
}: {
  colors: ThemeColors;
  hasSelection: boolean;
}) {
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
        disabled={!hasSelection}
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
          cursor: hasSelection ? "pointer" : "not-allowed",
          opacity: hasSelection ? 1 : 0.45,
        }}
      >
        Continue
      </button>
    </footer>
  );
}

/* -------------------------------------------------------------------------- */
/* IconMask — local, identical to accounts-center/XmdsIcon but resolves       */
/* asset paths under /prototypes/account-recovery/.                           */
/* -------------------------------------------------------------------------- */

function IconMask({
  name,
  size,
  color,
}: {
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
