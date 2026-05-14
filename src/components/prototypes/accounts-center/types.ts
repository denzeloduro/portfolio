/**
 * One entry from `accounts_center_settings.json`.
 *
 * The data is a flat list with parent-id pointers (not a nested tree).
 * Top-level entries have `parent === null`.
 */
export interface ACEntry {
  id: string;
  label: string;
  category: string;
  parent: string | null;
  path: string;
  description: string;
  keywords: string[];
}

/**
 * A result row as it should be rendered on screen — the raw entry plus the
 * resolved icon and parent breadcrumb based on what else is in the result set.
 */
export interface ACSearchResult {
  entry: ACEntry;
  /** Lucide icon component name (a key into `iconMap`), or null for a spacer. */
  iconKey: string | null;
  /** The parent's display label, shown beneath the row label as a breadcrumb. */
  parentLabel: string | null;
}
