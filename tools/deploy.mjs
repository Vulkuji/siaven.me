import { readFile, readdir, stat } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { setTimeout } from "node:timers/promises";

const root = fileURLToPath(new URL("../", import.meta.url));
const domain = "siaven.me";
const project = "siaven-portfolio";
const credentialPath = path.resolve(
  root,
  process.argv[2] ?? "../.cf_key_siaven",
);
const token = (await readFile(credentialPath, "utf8")).trim();
const apiRoot = "https://api.cloudflare.com/client/v4";

async function api(endpoint, method = "GET", body) {
  const response = await fetch(`${apiRoot}${endpoint}`, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: body === undefined ? undefined : JSON.stringify(body),
    signal: AbortSignal.timeout(30_000),
  });
  const data = await response.json();
  if (!response.ok || !data.success) {
    const detail = (data.errors ?? [])
      .map(({ code, message }) => `${code}: ${message}`)
      .join("; ");
    throw new Error(`${method} ${endpoint}: ${detail || response.status}`);
  }
  return data.result;
}

async function checkUpload(directory) {
  const allowed = new Set([
    ".html",
    ".css",
    ".js",
    ".json",
    ".webp",
    ".png",
    ".svg",
    ".txt",
    ".xml",
  ]);
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isSymbolicLink())
      throw new Error(`Symbolic link in upload: ${entry.name}`);
    if (entry.isDirectory()) {
      if (entry.name !== "assets")
        throw new Error(`Unexpected upload directory: ${entry.name}`);
      await checkUpload(fullPath);
      continue;
    }
    if (entry.name !== "_headers" && !allowed.has(path.extname(entry.name))) {
      throw new Error(`Unexpected upload file: ${entry.name}`);
    }
    if ((await stat(fullPath)).size > 25 * 1024 * 1024) {
      throw new Error(`Asset exceeds Pages limit: ${entry.name}`);
    }
  }
}

async function checkHomepage(url) {
  const expected = await readFile(path.join(root, "dist/index.html"), "utf8");
  let lastError;
  for (let attempt = 0; attempt < 6; attempt++) {
    try {
      const response = await fetch(url, {
        headers: { "Cache-Control": "no-cache" },
        signal: AbortSignal.timeout(10_000),
      });
      if (response.ok && (await response.text()) === expected) {
        return;
      }
      lastError = response.ok
        ? "New deployment is still propagating"
        : `HTTP ${response.status}`;
    } catch (error) {
      lastError = error.message;
    }
    if (attempt < 5) await setTimeout(2_000);
  }
  throw new Error(
    `Uploaded site did not pass the homepage check: ${lastError}`,
  );
}

async function main() {
  await checkUpload(path.join(root, "dist"));
  const zones = await api(`/zones?name=${domain}&status=active`);
  if (zones.length !== 1)
    throw new Error(`Expected one active zone for ${domain}`);
  const zone = zones[0];
  const projectBase = `/accounts/${zone.account.id}/pages/projects`;
  const projects = await api(projectBase);
  let site = projects.find((item) => item.name === project);
  if (!site) {
    site = await api(projectBase, "POST", {
      name: project,
      production_branch: "main",
    });
    console.log(`Created Pages project: ${site.name}`);
  }

  const deployment = spawnSync(
    path.join(root, "node_modules", ".bin", "wrangler"),
    [
      "pages",
      "deploy",
      "dist",
      "--project-name",
      project,
      "--branch",
      "main",
      "--commit-message",
      "Publish selected design work",
    ],
    {
      cwd: root,
      stdio: "inherit",
      env: {
        ...process.env,
        CLOUDFLARE_API_TOKEN: token,
        CLOUDFLARE_ACCOUNT_ID: zone.account.id,
        WRANGLER_SEND_METRICS: "false",
        CI: "true",
      },
    },
  );
  if (deployment.error) throw deployment.error;
  if (deployment.status !== 0)
    throw new Error(`Wrangler exited with ${deployment.status}`);

  const pagesURL = `https://${site.subdomain}`;
  await checkHomepage(pagesURL);

  const domains = await api(`${projectBase}/${project}/domains`);
  let binding = domains.find((item) => item.name === domain);
  if (!binding) {
    binding = await api(`${projectBase}/${project}/domains`, "POST", {
      name: domain,
    });
  }

  const dnsBase = `/zones/${zone.id}/dns_records`;
  const records = await api(`${dnsBase}?name=${domain}`);
  const addressRecords = records.filter((item) =>
    ["A", "AAAA", "CNAME"].includes(item.type),
  );
  if (
    addressRecords.some(
      (item) => item.type !== "CNAME" || item.content !== site.subdomain,
    )
  ) {
    throw new Error(
      "Domain has conflicting DNS records; uploaded Pages deployment is ready",
    );
  }
  if (addressRecords.length === 0) {
    await api(dnsBase, "POST", {
      type: "CNAME",
      name: domain,
      content: site.subdomain,
      proxied: true,
      ttl: 1,
    });
  }
  if (binding.status !== "active") {
    binding = await api(`${projectBase}/${project}/domains/${domain}`, "PATCH");
  }

  console.log(
    JSON.stringify({
      url: `https://${domain}`,
      pages: pagesURL,
      domainStatus: binding.status,
    }),
  );
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
