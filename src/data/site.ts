// Facts about the organisation, in one place. Links are verified against the
// product repos (luthor/apps/web/src/config/site.ts, papyra/papyra.app/src/data/site.ts).

export const SITE_NAME = "Lyfie";
export const SITE_URL = "https://www.lyfie.org";
export const TAGLINE = "Free, open software that outpaces the horizon.";
export const DESCRIPTION =
  "Lyfie makes free, open-source software: Luthor, a rich-text editor for React, and Papyra, a self-hosted notes app. No paywalls, no trackers, no lock-in.";

export const GITHUB_ORG_URL = "https://github.com/lyfie-org";
export const SPONSORS_URL = "https://github.com/sponsors/lyfie-org";
export const GOOD_FIRST_ISSUES_URL =
  "https://github.com/search?q=org%3Alyfie-org+label%3A%22good+first+issue%22+state%3Aopen&type=issues";
export const X_URL = "https://x.com/lyfieapp";

/** The products' own sites. Project pages read theirs from content frontmatter. */
export const LUTHOR_URL = "https://www.luthor.fyi";
export const PAPYRA_URL = "https://papyra.app";

export const CREATOR_NAME = "Rahul N. Anand";
export const CREATOR_URL = "https://www.rahulnsanand.com";
export const CREATOR_GITHUB_URL = "https://github.com/rahulnsanand";

export const NAV = [
  { href: "/projects/", label: "Projects" },
  { href: "/manifesto/", label: "Manifesto" },
  { href: "/changelog/", label: "Changelog" },
  { href: "/contribute/", label: "Contribute" }
] as const;
