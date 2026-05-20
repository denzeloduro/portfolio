"use client";

/**
 * `FlowRouter` — stack-based navigation coordinator for the MAA AR flow.
 *
 * Models the SwiftUI `NavigationStack` push/pop pattern in React:
 *   • A stack of `ScreenName`s. The top is what's currently visible.
 *   • `push(name)` adds a screen and slides it in from the right.
 *   • `pop()` removes the top screen and slides the previous one back from
 *     the left.
 *   • `replace(name)` swaps the top entry with crossfade (no slide). Useful
 *     for terminal states like "Success".
 *
 * Flow state (selected method, code typed, password typed, …) lives here as
 * `FlowState` and is exposed to every screen so they can read/write across
 * boundaries without prop-drilling.
 *
 * ─────────────────────────────────────────────────────────────────────────
 *  How to add a new screen (e.g. CodeEntryScreen):
 *  1. Append `"codeEntry"` to the `ScreenName` union in `types.ts`.
 *  2. Add any new fields it needs to `FlowState` (e.g. `codeEntered: string`).
 *  3. Create `screens/CodeEntryScreen.tsx`. Build it to consume props passed
 *     by `renderScreen` below (use `colors`, plus whatever flow state /
 *     callbacks it needs).
 *  4. Add it to the `renderScreen` switch below and pass it the right props.
 *  5. From the previous screen (e.g. Method Selector), call `push("codeEntry")`
 *     in its `onContinue`.
 * ─────────────────────────────────────────────────────────────────────────
 */

import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import IOSStatusBar from "../shared/IOSStatusBar";
import { useTheme } from "../accounts-center/theme";
import {
  INITIAL_FLOW_STATE,
  type FlowState,
  type MethodId,
  type ScreenName,
} from "./types";
import MethodSelectorScreen from "./screens/MethodSelectorScreen";

const SLIDE_DURATION = 0.32;
const SLIDE_EASE: [number, number, number, number] = [0.32, 0.72, 0, 1];

export default function FlowRouter({
  /** Screen the flow starts on. Defaults to the root method picker. */
  initialScreen = "methodSelector",
}: {
  initialScreen?: ScreenName;
} = {}) {
  const { colors } = useTheme();

  /** Screen stack — top of array is the visible screen. */
  const [stack, setStack] = useState<ScreenName[]>([initialScreen]);
  /** Direction of the most recent transition. Drives slide direction. */
  const [direction, setDirection] = useState<"forward" | "back" | "replace">(
    "forward",
  );
  const [flow, setFlow] = useState<FlowState>(INITIAL_FLOW_STATE);

  const current = stack[stack.length - 1];

  /* ----- Navigation API ----------------------------------------------- */

  const push = useCallback((name: ScreenName) => {
    setDirection("forward");
    setStack((s) => [...s, name]);
  }, []);

  const pop = useCallback(() => {
    setStack((s) => {
      if (s.length <= 1) return s;
      setDirection("back");
      return s.slice(0, -1);
    });
  }, []);

  // `replace` is unused today — exposed for future "Success" terminal states
  // that should swap the current screen with crossfade instead of slide.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const replace = useCallback((name: ScreenName) => {
    setDirection("replace");
    setStack((s) => [...s.slice(0, -1), name]);
  }, []);

  /* ----- Flow-state helpers ------------------------------------------- */

  const setSelectedMethod = useCallback((id: MethodId) => {
    setFlow((f) => ({ ...f, selectedMethod: id }));
  }, []);

  /* ----- Per-screen rendering ----------------------------------------- */

  const renderScreen = (name: ScreenName) => {
    switch (name) {
      case "methodSelector":
        return (
          <MethodSelectorScreen
            colors={colors}
            selected={flow.selectedMethod}
            onSelect={setSelectedMethod}
            onContinue={handleMethodContinue}
            onBack={stack.length > 1 ? pop : undefined}
          />
        );
      // case "codeEntry": …
      // case "passwordEntry": …
      // case "success": …
      default:
        return null;
    }
  };

  /* ----- Forward-action handlers per screen --------------------------- */

  function handleMethodContinue() {
    // Wire up forward navigation here once the next screen lands. For the
    // static portfolio tile we leave Continue inert; the button itself is
    // still enabled so the visual reads as "live".
    //
    // Example for the future:
    //   if (flow.selectedMethod === "password") push("passwordEntry");
    //   else push("codeEntry");
  }

  /* ----- Render ------------------------------------------------------- */

  // Slide directions match iOS push/pop:
  //   forward → new screen comes from right (+X)
  //   back    → new screen comes from left (-X)
  //   replace → crossfade, no slide
  const enterX =
    direction === "forward" ? "100%" : direction === "back" ? "-100%" : 0;
  const exitX =
    direction === "forward" ? "-30%" : direction === "back" ? "30%" : 0;

  return (
    <div
      className="relative w-full h-full overflow-hidden"
      style={{ backgroundColor: colors.surfaceBg }}
    >
      {/* Status bar — global chrome that stays fixed across screen
          transitions. Rendered above the sliding screen stack so it never
          translates with a push/pop. */}
      <IOSStatusBar tint={colors.iconPrimary} />

      <AnimatePresence initial={false} mode="sync">
        <motion.div
          key={current}
          className="absolute inset-0"
          initial={{ x: enterX, opacity: direction === "replace" ? 0 : 1 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{
            x: exitX,
            opacity: direction === "replace" ? 0 : 1,
          }}
          transition={{ duration: SLIDE_DURATION, ease: SLIDE_EASE }}
        >
          {renderScreen(current)}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
