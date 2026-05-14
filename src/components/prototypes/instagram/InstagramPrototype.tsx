"use client";

import { useState, useCallback, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import IOSStatusBar from "../shared/IOSStatusBar";
import SwipeToDeleteCell from "./SwipeToDeleteCell";

const FONT = "var(--font-optimistic), system-ui, -apple-system, sans-serif";

interface DialogState {
  username: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const LIGHT = {
  surfaceBg: "#FFFFFF",
  surfaceCard: "#FFFFFF",
  textPrimary: "#0A1317",
  textSecondary: "#465A69",
  iconPrimary: "#0A1317",
  iconSecondary: "#5D6C7B",
  chevron: "#5D6C7B",
  borderUnfocused: "#DDE2E8",
  buttonSecondaryStroke: "#CBD2D9",
  buttonPrimaryBg: "#0064E0",
  buttonPrimaryText: "#FFFFFF",
  notifBadge: "#DC373C",
  inputBg: "#FAFAFA",
  inputPlaceholder: "#8E8E8E",
  // iOS system alert tokens (light)
  alertBg: "rgba(255,255,255,0.95)",
  alertTitle: "#000000",
  alertBody: "#3C3C43",
  alertSeparator: "rgba(60,60,67,0.36)",
  alertDestructive: "#FF3B30",
  alertDefault: "#007AFF",
};

const DARK = {
  surfaceBg: "#0A1317",
  surfaceCard: "#1C2B33",
  textPrimary: "#F1F4F7",
  textSecondary: "#96A6B4",
  iconPrimary: "#F1F4F7",
  iconSecondary: "#96A6B4",
  chevron: "#96A6B4",
  borderUnfocused: "#3D4F5C",
  buttonSecondaryStroke: "#5D6C7B",
  buttonPrimaryBg: "#4BA9FE",
  buttonPrimaryText: "#0A1317",
  notifBadge: "#FB7D87",
  inputBg: "#152127",
  inputPlaceholder: "#748695",
  // iOS system alert tokens (dark) — Apple spec
  alertBg: "rgba(40,40,42,0.85)",
  alertTitle: "#FFFFFF",
  alertBody: "#EBEBF5",
  alertSeparator: "rgba(84,84,88,0.6)",
  alertDestructive: "#FF453A",
  alertDefault: "#0A84FF",
};

function useThemeColors() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const check = () => setIsDark(document.documentElement.classList.contains("dark"));
    check();
    const observer = new MutationObserver(check);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return isDark ? DARK : LIGHT;
}

interface Account {
  id: string;
  username: string;
  photo: string;
  notifications?: number;
}

const initialAccounts: Account[] = [
  { id: "1", username: "christy_song_01", photo: "/images/instagram/profile1.jpg" },
  { id: "2", username: "james_less", photo: "/images/instagram/profile2.jpg" },
  { id: "3", username: "sophie_song", photo: "/images/instagram/profile3.jpg", notifications: 6 },
];

export default function InstagramPrototype() {
  const COLORS = useThemeColors();
  const [accounts, setAccounts] = useState<Account[]>(initialAccounts);
  const [showManualLogin, setShowManualLogin] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [dialog, setDialog] = useState<DialogState | null>(null);

  const removeAccount = (id: string) => {
    if (!hasInteracted) setHasInteracted(true);
    setAccounts((prev) => {
      const next = prev.filter((a) => a.id !== id);
      if (next.length === 0) {
        setTimeout(() => setShowManualLogin(true), 300);
      }
      return next;
    });
  };

  const resetDemo = () => {
    setShowManualLogin(false);
    setAccounts(initialAccounts);
    setHasInteracted(false);
  };

  const handleRequestDialog = useCallback(
    (username: string, onConfirm: () => void, onCancel: () => void) => {
      setDialog({ username, onConfirm, onCancel });
    },
    []
  );

  const dismissDialog = useCallback(() => {
    const d = dialog;
    setDialog(null);
    d?.onCancel();
  }, [dialog]);

  const confirmDialog = useCallback(() => {
    const d = dialog;
    setDialog(null);
    d?.onConfirm();
  }, [dialog]);

  return (
    <div
      className="relative w-full h-full overflow-hidden"
      style={{ fontFamily: FONT, backgroundColor: COLORS.surfaceBg }}
    >
      <div
        className="flex h-full"
        style={{
          width: "200%",
          transform: showManualLogin ? "translateX(-50%)" : "translateX(0)",
          transition: "transform 0.5s cubic-bezier(0.32, 0.72, 0, 1)",
        }}
      >
        {/* AYMH Page */}
        <div className="w-1/2 h-full flex flex-col" style={{ paddingTop: 54 }}>
          {/* Nav bar — 68pt production XMDSNavBar height */}
          <div className="flex items-center justify-end px-[8px] shrink-0" style={{ height: 68 }}>
            <button
              className="flex items-center justify-center active:opacity-75"
              style={{ width: 52, height: 52 }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4m-6 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4m12 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4" fill={COLORS.iconPrimary} />
              </svg>
            </button>
          </div>

          <div className="flex-1 flex flex-col items-center">
            {/* Spacer to position logo at ~128px from top (44+52+32=128) */}
            <div style={{ height: 32 }} className="shrink-0" />

            {/* Instagram logo — actual asset from project */}
            <div className="shrink-0" style={{ width: 60, height: 60 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/instagram/ig-logo.svg"
                alt="Instagram"
                width={60}
                height={60}
              />
            </div>

            {/* Gap between logo and cells — positions cells at ~252px from top */}
            <div style={{ height: 64 }} className="shrink-0" />

            {/* Account cells + button group — gap = stackMedium (12pt) */}
            <div className="w-full px-[16px] flex flex-col" style={{ gap: 12 }}>
              {/* Account list — gap = stackMedium (12pt) */}
              <div className="flex flex-col" style={{ gap: 12 }}>
                <AnimatePresence mode="popLayout">
                  {accounts.map((account) => (
                    <motion.div
                      key={account.id}
                      layout
                      initial={{ opacity: 1 }}
                      exit={{
                        opacity: 0,
                        height: 0,
                        marginBottom: -12,
                        transition: {
                          height: { delay: 0.08, duration: 0.25, ease: [0.25, 0.1, 0.25, 1] },
                          opacity: { duration: 0.15 },
                        },
                      }}
                    >
                      <SwipeToDeleteCell
                        username={account.username}
                        onDelete={() => removeAccount(account.id)}
                        onRequestDialog={handleRequestDialog}
                      >
                        <AccountCell account={account} colors={COLORS} />
                      </SwipeToDeleteCell>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Log into another account — secondary button */}
              <button
                className="w-full flex items-center justify-center active:scale-[0.98] active:opacity-75 transition-all"
                style={{
                  minHeight: 44,
                  borderRadius: 9999,
                  border: `1px solid ${COLORS.buttonSecondaryStroke}`,
                  backgroundColor: "transparent",
                  padding: "12px 20px",
                }}
                onClick={() => setShowManualLogin(true)}
              >
                <span style={{
                  fontSize: 15,
                  fontWeight: 500,
                  color: COLORS.textPrimary,
                  fontFamily: FONT,
                  lineHeight: "19px",
                }}>
                  Log into another account
                </span>
              </button>
            </div>

            {/* Swipe hint */}
            <AnimatePresence>
              {!hasInteracted && accounts.length > 0 && (
                <motion.p
                  className="text-center px-[16px]"
                  style={{ fontSize: 11, color: "#BBBBBB", marginTop: 12, fontFamily: FONT }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 1.2, duration: 0.5 }}
                >
                  ← swipe a cell to try
                </motion.p>
              )}
            </AnimatePresence>

            <div className="flex-1" />

            {/* Footer */}
            <div className="w-full px-[16px]">
              {/* Create new account — primary outline */}
              <button
                className="w-full flex items-center justify-center active:scale-[0.98] active:opacity-75 transition-all"
                style={{
                  minHeight: 44,
                  borderRadius: 9999,
                  border: `1px solid ${COLORS.buttonPrimaryBg}`,
                  backgroundColor: "transparent",
                  padding: "12px 20px",
                }}
              >
                <span style={{
                  fontSize: 15,
                  fontWeight: 500,
                  color: COLORS.buttonPrimaryBg,
                  fontFamily: FONT,
                  lineHeight: "19px",
                }}>
                  Create new account
                </span>
              </button>
            </div>

            {/* Meta lockup — paddingTop 20, paddingBottom insetXLarge (20) */}
            <div className="flex justify-center" style={{ paddingTop: 20, paddingBottom: 20 }}>
              <svg width="60" height="12" viewBox="0 0 60 12" fill="none" style={{ opacity: 0.5 }}>
                <text x="30" y="10" textAnchor="middle" fill={COLORS.textSecondary} style={{ fontSize: 11, fontFamily: FONT, fontWeight: 400, letterSpacing: "0.5px" }}>Meta</text>
              </svg>
            </div>
          </div>
        </div>

        {/* Manual Login Page */}
        <div className="w-1/2 h-full flex flex-col" style={{ paddingTop: 54, backgroundColor: COLORS.surfaceBg }}>
          {/* Nav bar — 68pt production XMDSNavBar height */}
          <div className="flex items-center px-[8px] shrink-0" style={{ height: 68 }}>
            <button
              className="flex items-center justify-center active:opacity-75"
              style={{ width: 52, height: 52 }}
              onClick={resetDemo}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M15 19l-7-7 7-7" stroke={COLORS.iconPrimary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          <div className="flex-1 flex flex-col items-center px-[16px]">
            {/* 80pt Spacer in Swift, layered behind 68pt navbar → 80 - 68 = 12pt below navbar */}
            <div style={{ height: 12 }} />

            <div style={{ width: 60, height: 60 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/instagram/ig-logo.svg" alt="Instagram" width={60} height={60} />
            </div>

            {/* logoToInputGap: 86pt when keyboard hidden */}
            <div style={{ height: 86 }} />

            {/* Username input — XMDSTextInput minHeight 60pt */}
            <div
              className="w-full flex items-center"
              style={{
                minHeight: 60,
                borderRadius: 12,
                backgroundColor: COLORS.inputBg,
                border: `1px solid ${COLORS.borderUnfocused}`,
                paddingLeft: 16,
                paddingRight: 16,
              }}
            >
              <span style={{ fontSize: 15, color: COLORS.inputPlaceholder, fontFamily: FONT }}>
                Username, email or mobile number
              </span>
            </div>

            {/* stackMedium: 12pt */}
            <div style={{ height: 12 }} />

            {/* Password input */}
            <div
              className="w-full flex items-center"
              style={{
                minHeight: 60,
                borderRadius: 12,
                backgroundColor: COLORS.inputBg,
                border: `1px solid ${COLORS.borderUnfocused}`,
                paddingLeft: 16,
                paddingRight: 16,
              }}
            >
              <span style={{ fontSize: 15, color: COLORS.inputPlaceholder, fontFamily: FONT }}>
                Password
              </span>
            </div>

            {/* stackXLarge: 24pt */}
            <div style={{ height: 24 }} />

            {/* Log in — primary disabled */}
            <button
              className="w-full flex items-center justify-center"
              style={{
                minHeight: 44,
                borderRadius: 9999,
                backgroundColor: COLORS.buttonPrimaryBg,
                opacity: 0.4,
                padding: "12px 20px",
              }}
            >
              <span style={{ fontSize: 15, fontWeight: 500, color: COLORS.buttonPrimaryText, fontFamily: FONT, lineHeight: "19px" }}>
                Log in
              </span>
            </button>

            {/* stackMedium: 12pt */}
            <div style={{ height: 12 }} />

            <button className="self-center">
              <span style={{ fontSize: 15, color: COLORS.textPrimary, fontFamily: FONT }}>
                Forgot password?
              </span>
            </button>

            <div className="flex-1" />

            <button
              className="w-full flex items-center justify-center active:scale-[0.98] active:opacity-75 transition-all"
              style={{
                minHeight: 44,
                borderRadius: 9999,
                border: `1px solid ${COLORS.buttonPrimaryBg}`,
                backgroundColor: "transparent",
                padding: "12px 20px",
              }}
            >
              <span style={{
                fontSize: 15,
                fontWeight: 500,
                color: COLORS.buttonPrimaryBg,
                fontFamily: FONT,
                lineHeight: "19px",
              }}>
                Create new account
              </span>
            </button>

            {/* Meta lockup — paddingTop 20, paddingBottom insetXLarge (20) */}
            <div className="flex justify-center" style={{ paddingTop: 20, paddingBottom: 20 }}>
              <svg width="60" height="12" viewBox="0 0 60 12" fill="none" style={{ opacity: 0.5 }}>
                <text x="30" y="10" textAnchor="middle" fill={COLORS.textSecondary} style={{ fontSize: 11, fontFamily: FONT, fontWeight: 400, letterSpacing: "0.5px" }}>Meta</text>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* iOS status bar — pinned to top, sits above sliding pages */}
      <IOSStatusBar tint={COLORS.iconPrimary} />

      {/* iOS system alert — rendered at prototype root level */}
      <AnimatePresence>
        {dialog && (
          <motion.div
            className="absolute inset-0 z-[100] flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="absolute inset-0 bg-black/30" onClick={dismissDialog} />
            <motion.div
              className="relative z-10 overflow-hidden"
              style={{
                width: 270,
                borderRadius: 14,
                backgroundColor: COLORS.alertBg,
                backdropFilter: "blur(40px)",
                WebkitBackdropFilter: "blur(40px)",
                fontFamily: "-apple-system, SF Pro Text, system-ui, sans-serif",
              }}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2, ease: [0.2, 0, 0, 1] }}
            >
              <div className="px-[16px] pt-[20px] pb-[16px] text-center">
                <p style={{ fontSize: 17, fontWeight: 600, color: COLORS.alertTitle, lineHeight: 1.24, letterSpacing: -0.4 }}>
                  Remove {dialog.username}?
                </p>
                <p style={{ fontSize: 13, fontWeight: 400, color: COLORS.alertBody, opacity: 0.6, lineHeight: 1.38, marginTop: 4 }}>
                  You&apos;ll need to enter your phone or email and password the next time you log in.
                </p>
              </div>
              <div style={{ borderTop: `0.5px solid ${COLORS.alertSeparator}` }}>
                <button
                  className="w-full flex items-center justify-center active:bg-black/5"
                  style={{ height: 44, borderBottom: `0.5px solid ${COLORS.alertSeparator}` }}
                  onClick={confirmDialog}
                >
                  <span style={{ fontSize: 17, fontWeight: 600, color: COLORS.alertDestructive, letterSpacing: -0.4 }}>Remove</span>
                </button>
                <button
                  className="w-full flex items-center justify-center active:bg-black/5"
                  style={{ height: 44 }}
                  onClick={dismissDialog}
                >
                  <span style={{ fontSize: 17, fontWeight: 400, color: COLORS.alertDefault, letterSpacing: -0.4 }}>Cancel</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function AccountCell({ account, colors }: { account: Account; colors: typeof LIGHT }) {
  return (
    <div
      className="flex items-center"
      style={{
        // HStack spacing inlineMedium = 12pt
        gap: 12,
        // padding(.horizontal, insetLarge=16) padding(.vertical, insetMedium=12)
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 12,
        paddingBottom: 12,
        // cornerRadius 16 + borderRadius 16
        borderRadius: 16,
        border: `1px solid ${colors.borderUnfocused}`,
        backgroundColor: colors.surfaceCard,
        minHeight: 52,
        fontFamily: FONT,
      }}
    >
      {/* xLarge profile photo = 60pt */}
      <div className="shrink-0 rounded-full overflow-hidden" style={{ width: 60, height: 60 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={account.photo}
          alt={account.username}
          width={60}
          height={60}
          className="w-full h-full object-cover"
        />
      </div>

      {/* VStack(spacing: listCellTextPadding=5) */}
      <div className="flex-1 min-w-0 flex flex-col" style={{ gap: 5 }}>
        <p
          className="truncate"
          style={{
            fontSize: 15,
            fontWeight: 500,
            color: colors.textPrimary,
            lineHeight: "19px",
            letterSpacing: 0,
            fontFamily: FONT,
          }}
        >
          {account.username}
        </p>
        {account.notifications && (
          <div className="flex items-center" style={{ gap: 4 }}>
            <div
              className="rounded-full"
              style={{ width: 5, height: 5, backgroundColor: colors.notifBadge }}
            />
            <span
              style={{
                fontSize: 13,
                fontWeight: 400,
                color: colors.textSecondary,
                lineHeight: "18px",
                letterSpacing: -0.04,
                fontFamily: FONT,
              }}
            >
              {account.notifications} notifications
            </span>
          </div>
        )}
      </div>

      {/* iOS chevron.right at 12×12 — matches SF Symbol weight */}
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="shrink-0">
        <path
          d="M4 2l4 4-4 4"
          stroke={colors.chevron}
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
