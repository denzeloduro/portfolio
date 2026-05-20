"use client";

/**
 * Account Recovery — entry point for the `maa_ar_full_flow` SwiftUI prototype
 * port. This component is intentionally thin: it just renders the
 * `FlowRouter` starting at the Method Selector screen.
 *
 * The full flow is structured as a screen stack inside `FlowRouter`, so to
 * extend this prototype (e.g. add a code-entry, password-entry, or success
 * screen during a future iteration) follow the instructions at the top of
 * `FlowRouter.tsx`. The Method Selector remains the default visible state on
 * the portfolio tile until a forward navigation is wired up.
 *
 * Today's behavior:
 *   • Method Selector visible.
 *   • Tap row → updates the selected method (lives in `FlowState`).
 *   • Tap Continue → inert (no next screen exists yet).
 *   • Tap Back → inert at the root (no screen to pop to).
 */

import FlowRouter from "./FlowRouter";

export default function AccountRecoveryPrototype() {
  return <FlowRouter initialScreen="methodSelector" />;
}
