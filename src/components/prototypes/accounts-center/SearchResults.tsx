"use client";

import SearchResultRow from "./SearchResultRow";
import { FONT, type ThemeColors } from "./theme";
import type { ACEntry, ACSearchResult } from "./types";

interface Props {
  query: string;
  results: ACSearchResult[];
  colors: ThemeColors;
  onResultClick?: (entry: ACEntry) => void;
}

/**
 * Body content for search mode.
 *
 * - Empty query: render nothing (parent shows the home content cross-faded out).
 * - Query with matches: render a card containing one row per result.
 * - Query with no matches: render a centered "No results" message.
 */
export default function SearchResults({ query, results, colors, onResultClick }: Props) {
  const hasQuery = query.trim().length > 0;
  if (!hasQuery) return null;

  if (results.length === 0) {
    return (
      <div
        className="flex flex-col items-center"
        style={{ paddingTop: 64 }}
      >
        <p
          style={{
            fontFamily: FONT,
            fontSize: 15,
            color: colors.textSecondary,
            lineHeight: "20px",
          }}
        >
          No results
        </p>
      </div>
    );
  }

  return (
    // 8pt top padding matches the Swift original. The bottom-sheet wrapper
    // gives the search bar enough breathing room from the status bar that
    // the result card no longer needs to fight for vertical space.
    <div style={{ paddingLeft: 16, paddingRight: 16, paddingTop: 8 }}>
      <div
        className="overflow-hidden"
        style={{
          borderRadius: 16,
          backgroundColor: colors.surfaceCard,
          border: `1px solid ${colors.border}`,
        }}
      >
        {results.map((result, index) => (
          <SearchResultRow
            key={result.entry.id}
            result={result}
            colors={colors}
            showDivider={index < results.length - 1}
            onClick={onResultClick ? () => onResultClick(result.entry) : undefined}
          />
        ))}
      </div>
    </div>
  );
}
