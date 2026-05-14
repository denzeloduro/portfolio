/**
 * Single source of truth for portfolio projects.
 *
 * The homepage uses this registry to decide where a `ProjectCard` should
 * link, and individual case study pages can pull metadata (title, year,
 * role) from here so we never let the homepage and case study drift apart.
 *
 * Add a new entry whenever a new case study page lands; the homepage will
 * automatically link to it via `slug` → `/projects/${slug}`.
 */
export interface ProjectMeta {
  slug: string;
  title: string;
  /** Short context line used on cards, e.g. "Meta, 2022" */
  context: string;
  /** Optional longer subtitle for the case study hero. */
  subtitle?: string;
  /** Year shown in the case study meta block. */
  year: string;
  /** Org/company shown in the case study meta block. */
  company: string;
  /** Designer's role on the project. */
  role: string;
  /** Whether a dedicated case study page exists. If false, the card on the
   *  homepage stays non-clickable. */
  hasCaseStudy: boolean;
}

export const PROJECTS: Record<string, ProjectMeta> = {
  "search-in-accounts-center": {
    slug: "search-in-accounts-center",
    title: "Search in Accounts Center",
    context: "Meta, 2022",
    subtitle:
      "Helping people find shared settings across the Family of Apps with a fast, forgiving search experience.",
    year: "2022",
    company: "Meta",
    role: "Product Designer",
    hasCaseStudy: true,
  },
  "login-on-instagram": {
    slug: "login-on-instagram",
    title: "Login on Instagram",
    context: "Meta, 2026",
    subtitle:
      "Re-thinking AYMH — the front door to login — to reduce abandonment, cut visual clutter, and help 123M people a day land in the right account faster.",
    year: "2026",
    company: "Meta",
    role: "Product Designer",
    hasCaseStudy: true,
  },
  "account-recovery-on-instagram": {
    slug: "account-recovery-on-instagram",
    title: "Account Recovery on Instagram",
    context: "Meta, 2024",
    year: "2024",
    company: "Meta",
    role: "Product Designer",
    hasCaseStudy: false,
  },
};

export function getProject(slug: string): ProjectMeta | undefined {
  return PROJECTS[slug];
}
