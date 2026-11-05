interface Env {
  ASSETS: Fetcher;
  RESUME_STORE: KVNamespace;
  RESUME_LIMITER: RateLimit;
  RESUME_PASSWORD?: string;
}

const pdfKey = "resume.pdf";
const fileName = "lingshan.zhu-resume.pdf";
const maxPasswordLength = 200;

const security = {
  "Cache-Control": "no-store",
  "X-Content-Type-Options": "nosniff",
};

const reply = (status: number) =>
  new Response(null, { status, headers: security });

const digest = (text: string) =>
  crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));

async function passwordMatches(given: string, expected: string) {
  const [a, b] = await Promise.all([digest(given), digest(expected)]);
  return crypto.subtle.timingSafeEqual(a, b);
}

async function readPassword(request: Request) {
  try {
    const body = await request.json<{ password?: unknown }>();
    return typeof body.password === "string" &&
      body.password.length <= maxPasswordLength
      ? body.password
      : null;
  } catch {
    return null;
  }
}

/** The resume holds private details, so it lives in KV and leaves only for the right password. */
async function downloadResume(request: Request, env: Env) {
  if (request.method !== "POST") return reply(405);

  const visitor = request.headers.get("CF-Connecting-IP") ?? "unknown";
  const { success } = await env.RESUME_LIMITER.limit({ key: visitor });
  if (!success) return reply(429);

  const expected = env.RESUME_PASSWORD;
  if (!expected) return reply(503);

  const password = await readPassword(request);
  if (password === null) return reply(400);
  if (!(await passwordMatches(password, expected))) return reply(401);

  const pdf = await env.RESUME_STORE.get(pdfKey, "arrayBuffer");
  if (!pdf) return reply(503);
  return new Response(pdf, {
    headers: {
      ...security,
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${fileName}"`,
    },
  });
}

export default {
  fetch(request, env) {
    const { pathname } = new URL(request.url);
    return pathname === "/api/resume"
      ? downloadResume(request, env)
      : env.ASSETS.fetch(request);
  },
} satisfies ExportedHandler<Env>;
