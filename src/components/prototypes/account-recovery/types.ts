/**
 * Shared types + constants for the MAA AR (Account Recovery) flow.
 *
 * `FlowState` holds the data that crosses screen boundaries (e.g. which method
 * the user picked on the selector, the code they typed on a future code-entry
 * screen, etc). Add fields here as we port additional screens.
 *
 * `ScreenName` is the registry of screens the `FlowRouter` knows how to render.
 * Adding a new screen is:
 *   1. Append its name to `ScreenName`.
 *   2. Add `<name>: <Component>` to the `SCREENS` map in `FlowRouter.tsx`.
 *   3. Push it from wherever a screen wants to navigate forward.
 */

export type MethodId = "email" | "whatsApp" | "sms" | "password";

/** Registry of every screen the flow can render. Today: just the entry. */
export type ScreenName =
  | "methodSelector";
  // | "codeEntry"      // future — verify-code screen for email/SMS/WhatsApp
  // | "passwordEntry"  // future — password challenge screen
  // | "success";       // future — completion / "you're back in" screen

/** Persistent data shared across all screens in the flow. */
export interface FlowState {
  /** Method the user is currently on / picked. `null` only on a fresh mount
   *  before `.onAppear` defaulting kicks in. */
  selectedMethod: MethodId | null;
  // codeEntered?: string;
  // passwordEntered?: string;
}

export const INITIAL_FLOW_STATE: FlowState = {
  // Mirrors the Swift `.onAppear` that pre-selects the first enabled method.
  selectedMethod: "email",
};

/* -------------------------------------------------------------------------- */
/* Static seed data — defaults from `MARPrototypeSettings.swift`:             */
/*   Trust: vetted, US/CA, unshared phone                                     */
/*   Methods enabled: Email + WhatsApp + SMS (Password is always appended)    */
/* -------------------------------------------------------------------------- */

export const USER = {
  fullName: "Christy Song",
  email: "christysong@gmail.com",
  phone: "+1 800-600-4660",
  /** Profile photo path (relative to /public). */
  photo: "/prototypes/account-recovery/photos/profilePhoto1.jpg",
} as const;

export interface MethodDef {
  id: MethodId;
  /** Short label rendered as the row's primary text. */
  label: string;
  /** "Get code to …" / equivalent secondary line. */
  description: string;
  /** XMDS icon basename (under /prototypes/account-recovery/icons). */
  iconName: string;
}

export const METHODS: MethodDef[] = [
  {
    id: "email",
    label: "Email",
    description: `Get code to\n${USER.email}`,
    iconName: "shallow-v-rectangle_Outline_24",
  },
  {
    id: "whatsApp",
    label: "WhatsApp",
    description: `Get code to ${USER.phone}`,
    iconName: "whatsapp_Outline_24",
  },
  {
    id: "sms",
    label: "SMS",
    description: `Get code to ${USER.phone}`,
    iconName: "speech-bubble-stacked_Outline_24",
  },
  {
    id: "password",
    label: "Password",
    description: "Enter password to log in",
    iconName: "padlock-closed_Outline_24",
  },
];

/** Resolve an XMDS icon basename to its public asset path. */
export const ICON_PATH = (name: string) =>
  `/prototypes/account-recovery/icons/${name}.svg`;
