// Post-build smoke test: validates dist/, then serves it through `wrangler dev`
// — the real workerd runtime with the same wrangler.jsonc that production uses —
// and checks what Cloudflare will actually answer: pages, assets, the 404 page,
// and the security headers from public/_headers.
//
//   pnpm build && pnpm smoke
import { spawn, spawnSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const DIST = "dist";
const PORT = Number(process.env.SMOKE_PORT ?? 8788);
const BASE = `http://127.0.0.1:${PORT}`;
const PAGES = [
  "/",
  "/projects/",
  "/projects/luthor/",
  "/projects/papyra/",
  "/manifesto/",
  "/changelog/",
  "/contribute/"
];
const failures = [];

function check(condition, message) {
  if (condition) {
    console.log(`  ok   ${message}`);
  } else {
    console.error(`  FAIL ${message}`);
    failures.push(message);
  }
}

// ---- 1. Static build output ----
console.log("Build output");
for (const page of PAGES) {
  check(existsSync(join(DIST, page, "index.html")), `dist${page}index.html exists`);
}
check(existsSync(join(DIST, "404.html")), "dist/404.html exists");
check(existsSync(join(DIST, "_headers")), "dist/_headers shipped");
check(existsSync(join(DIST, "sitemap-index.xml")), "sitemap generated");
check(existsSync(join(DIST, "og.png")), "og.png shipped");

const home = existsSync(join(DIST, "index.html"))
  ? readFileSync(join(DIST, "index.html"), "utf8")
  : "";
const assetRefs = [...home.matchAll(/(?:src|href)="(\/(?:_astro|fonts)\/[^"]+)"/g)].map(
  (m) => m[1]
);
check(assetRefs.length > 0, "home page references /_astro or /fonts assets");
for (const ref of assetRefs) check(existsSync(join(DIST, ref)), `${ref} exists on disk`);

// ---- 2. Served through workerd ----
console.log(`\nRuntime (wrangler dev on ${BASE})`);
const server = spawn(
  "pnpm",
  ["exec", "wrangler", "dev", "--port", String(PORT), "--ip", "127.0.0.1"],
  {
    stdio: ["ignore", "pipe", "pipe"],
    shell: process.platform === "win32",
    env: { ...process.env, WRANGLER_SEND_METRICS: "false" },
    // own process group on POSIX so the whole tree (pnpm -> wrangler -> workerd) can be killed
    detached: process.platform !== "win32"
  }
);
let serverLog = "";
server.stdout.on("data", (d) => (serverLog += d));
server.stderr.on("data", (d) => (serverLog += d));

async function waitForServer(timeoutMs = 60_000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      await fetch(BASE);
      return true;
    } catch {
      await new Promise((r) => setTimeout(r, 500));
    }
  }
  return false;
}

async function expect(path, { status = 200, type, contains } = {}) {
  const res = await fetch(BASE + path, { redirect: "manual" });
  const body = await res.text();
  const ct = res.headers.get("content-type") ?? "";
  check(res.status === status, `GET ${path} -> ${res.status} (want ${status})`);
  if (type) check(ct.includes(type), `GET ${path} content-type "${ct}" ~ ${type}`);
  if (contains) check(body.includes(contains), `GET ${path} body contains ${contains}`);
  return res;
}

try {
  if (!(await waitForServer())) {
    check(false, "wrangler dev started");
  } else {
    const res = await expect("/", { type: "text/html", contains: ">Lyfie</h1>" });
    const csp = res.headers.get("content-security-policy") ?? "";
    check(csp.includes("font-src 'self'"), "CSP header from _headers is applied");
    check(
      res.headers.get("x-content-type-options") === "nosniff",
      "X-Content-Type-Options header applied"
    );

    for (const page of PAGES.slice(1)) await expect(page, { type: "text/html" });
    for (const ref of assetRefs) await expect(ref);
    await expect("/fonts/marcellus-400-latin.woff2", { type: "font/woff2" });
    await expect("/favicon.ico");
    await expect("/robots.txt", { contains: "Sitemap:" });
    // Unknown routes must be a real 404 with the styled page, not the home page.
    await expect("/definitely/not/a/page", { status: 404, contains: "Nothing here" });
  }
} catch (err) {
  check(false, `runtime checks threw: ${err.message}`);
} finally {
  if (process.platform === "win32") {
    // Synchronous: process.exit below must not beat the kill, or workerd lingers.
    spawnSync("taskkill", ["/pid", String(server.pid), "/T", "/F"], { stdio: "ignore" });
  } else {
    process.kill(-server.pid, "SIGTERM");
  }
}

if (failures.length) {
  console.error(`\n${failures.length} check(s) failed.`);
  if (serverLog) console.error("\n--- wrangler dev output ---\n" + serverLog);
  process.exit(1);
}
console.log("\nAll smoke checks passed.");
