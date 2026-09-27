// Fail if any built page or stylesheet references a third-party font origin.
//
// Fonts are self-hosted (scripts/fetch-fonts.mjs) and the CSP pins font-src to
// 'self', so a stray Google Fonts link would silently break typography in
// production. Ported from papyra.app's CI gate.
//
//   pnpm build && pnpm check:fonts

import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, resolve } from "node:path";

const DIST = resolve(import.meta.dirname, "../dist");
const BANNED =
  /fonts\.googleapis\.com|fonts\.gstatic\.com|use\.typekit\.net|fonts\.bunny\.net/;

if (!existsSync(DIST)) {
  console.error("check-fonts: dist/ not found. Run the build first.");
  process.exit(1);
}

const hits = [];
(function walk(dir) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full);
    else if (/\.(html|css)$/.test(entry) && BANNED.test(readFileSync(full, "utf8"))) {
      hits.push(full.slice(DIST.length + 1));
    }
  }
})(DIST);

if (hits.length > 0) {
  console.error("check-fonts: third-party font origin referenced in:");
  for (const h of hits) console.error("  " + h);
  process.exit(1);
}
console.log("check-fonts: no third-party font origin in the built pages.");
