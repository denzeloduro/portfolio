import type { ACEntry, ACSearchResult } from "./types";

/**
 * Build a fast lookup table from id → entry for parent resolution.
 */
export function buildIndex(entries: ACEntry[]): Record<string, ACEntry> {
  const index: Record<string, ACEntry> = {};
  for (const e of entries) index[e.id] = e;
  return index;
}

/**
 * Filter the corpus by case-insensitive label substring.
 * Keywords are intentionally NOT consulted (matches the Swift prototype).
 */
export function filterEntries(query: string, entries: ACEntry[]): ACEntry[] {
  const trimmed = query.trim();
  if (!trimmed) return [];
  const lower = trimmed.toLowerCase();
  return entries.filter((e) => e.label.toLowerCase().includes(lower));
}

/**
 * Given the matched entries, decide each row's icon and breadcrumb.
 *
 * Rules:
 * - Top-level entry → its own icon
 * - Child whose parent is also in the results → no icon (rendered as spacer
 *   so the row indents and visually groups under its parent)
 * - Child whose parent is NOT in the results → parent's icon (so the row
 *   has its own visual identity)
 */
export function resolveResults(
  matches: ACEntry[],
  byID: Record<string, ACEntry>,
): ACSearchResult[] {
  const matchedIDs = new Set(matches.map((e) => e.id));

  return matches.map((entry) => {
    const parentLabel =
      entry.parent != null ? byID[entry.parent]?.label ?? null : null;

    let iconKey: string | null;
    if (entry.parent == null) {
      iconKey = entry.id;
    } else if (matchedIDs.has(entry.parent)) {
      iconKey = null;
    } else {
      iconKey = entry.parent;
    }

    return { entry, iconKey, parentLabel };
  });
}

/**
 * Convenience: full pipeline — filter then resolve.
 */
export function search(
  query: string,
  entries: ACEntry[],
  byID: Record<string, ACEntry>,
): ACSearchResult[] {
  const matches = filterEntries(query, entries);
  return resolveResults(matches, byID);
}
