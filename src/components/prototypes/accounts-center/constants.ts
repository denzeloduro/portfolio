/**
 * Maps each top-level entry id (parent === null in the JSON) to an XMDS
 * outline icon asset name (without `.svg`). Mirrors `topLevelIcons` from
 * `AccountsCenterSearchData.swift`.
 *
 * Children inherit no icon by default — they show the parent breadcrumb
 * instead, unless the parent isn't in the current result set, in which case
 * `searchLogic.ts` looks up the parent's icon here.
 */
export const TOP_LEVEL_ICONS: Record<string, string> = {
  profiles: "person-circle_Outline_24",
  connected_experiences: "person-arrow-right_Outline_24",
  accounts: "person-circle_Outline_24",
  personal_details: "torso-line-square_Outline_24",
  password_security: "shield_Outline_24",
  your_info_permissions: "square-lines-stamp_Outline_24",
  ad_preferences: "bullhorn_Outline_24",
  payments: "credit-card_Outline_24",
  supervision: "person-checkmark_Outline_24",
  meta_verified: "checkmark-spiked-circle_Outline_24",
  subscriptions: "dollar-sign-double-clockwise-arrow_Outline_24",
  manage_account: "gear_Outline_24",
  cross_profile_experiences: "person-arrow-right_Outline_24",
  login_security: "key_Outline_24",
};

export const UI_ICONS = {
  search: "circle-handle_Outline_24",
  close: "x_Outline_24",
  clear: "x-circle_Filled_24",
  caretRight: "caret-right_Outline_24",
} as const;
