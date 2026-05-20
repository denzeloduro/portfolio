/**
 * Method Selector — first screen of `maa_ar_full_flow`'s LARA "initiate view".
 *
 * Ported from `ARMethodSelectorScreen.swift`. Shows the user a profile header,
 * a list of authentication methods to pick from (each with a leading XMDS
 * icon, label, "Get code to …" description, and a trailing radio button), the
 * "No longer have access to these?" escape link, and a persistent "Continue"
 * footer.
 *
 * Visual behavior is intentionally static for the portfolio tile right now —
 * `Continue` is wired to call `onContinue` via the `FlowRouter`, but the flow
 * doesn't yet know how to push the next screen. Wire that up in
 * `FlowRouter.tsx`'s `handleContinue` when the next screen lands.
 *
 * SMS-delay countdown and the "See more" collapse affordance are intentionally
 * omitted — they only kick in for the Rest-of-world market with 5+ methods,
 * and this view is set to US/Canada defaults.
 */

import { motion } from "framer-motion";
import { FONT, type ThemeColors } from "../../accounts-center/theme";
import NavBar from "../components/NavBar";
import PersistentFooter from "../components/PersistentFooter";
import IconMask from "../components/IconMask";
import { METHODS, USER, type MethodDef, type MethodId } from "../types";

export interface MethodSelectorScreenProps {
  colors: ThemeColors;
  /** Currently picked method (lives in `FlowState`). */
  selected: MethodId | null;
  /** Tap a method row. */
  onSelect: (id: MethodId) => void;
  /** Tap the "Continue" CTA. Routed through the flow coordinator so it can
   *  push the next screen when one is registered. */
  onContinue: () => void;
  /** Tap the back button. Omitted at the root, where there's nothing to pop. */
  onBack?: () => void;
}

export default function MethodSelectorScreen({
  colors,
  selected,
  onSelect,
  onContinue,
  onBack,
}: MethodSelectorScreenProps) {
  return (
    <div
      className="relative w-full h-full overflow-hidden flex flex-col"
      style={{ fontFamily: FONT, backgroundColor: colors.surfaceBg }}
    >
      <NavBar colors={colors} onBack={onBack} />

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
            onSelect={onSelect}
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

      <PersistentFooter
        colors={colors}
        label="Continue"
        onPress={onContinue}
        disabled={selected === null}
      />
    </div>
  );
}

/* ========================================================================== */
/* Sub-components                                                              */
/* ========================================================================== */

function ProfileHeader({ colors }: { colors: ThemeColors }) {
  return (
    <header
      className="flex flex-col items-center"
      style={{ gap: 8, paddingTop: 8 }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={USER.photo}
        alt={USER.fullName}
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
        {USER.fullName}
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
  selected: MethodId | null;
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
