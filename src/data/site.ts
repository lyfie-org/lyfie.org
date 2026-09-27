// Facts about the organisation, in one place. Links are verified against the
// product repos (luthor/apps/web/src/config/site.ts, papyra/papyra.app/src/data/site.ts).

export const SITE_NAME = "Lyfie";
export const TAGLINE = "Free, open software that outpaces the horizon.";
export const DESCRIPTION =
  "Lyfie builds free, open-source software — libraries, apps and games — with no paywalls, no trackers and no lock-in.";

export const GITHUB_ORG_URL = "https://github.com/lyfie-org";
export const SPONSORS_URL = "https://github.com/sponsors/lyfie-org";
export const GOOD_FIRST_ISSUES_URL =
  "https://github.com/search?q=org%3Alyfie-org+label%3A%22good+first+issue%22+state%3Aopen&type=issues";
export const X_URL = "https://x.com/lyfieapp";

export const CREATOR_NAME = "Rahul N. Anand";
export const CREATOR_URL = "https://www.rahulnsanand.com";

export const NAV = [
  { href: "/projects/", label: "Projects" },
  { href: "/manifesto/", label: "Manifesto" },
  { href: "/changelog/", label: "Changelog" },
  { href: "/contribute/", label: "Contribute" }
] as const;
