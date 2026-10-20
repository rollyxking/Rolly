// Vercel serverless function. Validates, blocks bots, rate-limits, then emails via Resend.
// Returns 503 when email is not configured, so the UI never shows a false success.
const hits = new Map();
const TYPES = ["Token website", "dApp interface", "Web3 dashboard", "Crypto community website", "Full-stack application", "Something else"];
const clean = (v, n) => String(v ?? "").trim().slice(0, n);
const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  const ip = String(req.headers["x-forwarded-for"] || "").split(",")[0] || "unknown";
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < 600000);
  if (recent.length >= 3) return res.status(429).json({ error: "Too many requests. Try again in a few minutes." });
  hits.set(ip, [...recent, now]);

  const b = req.body || {};
  if (b.website) return res.status(200).json({ ok: true }); // honeypot: silently drop bots
  const d = {
    name: clean(b.name, 100), email: clean(b.email, 200), org: clean(b.org, 150), type: clean(b.type, 60),
    message: clean(b.message, 3000), deliverables: clean(b.deliverables, 500),
    budget: clean(b.budget, 60), timeline: clean(b.timeline, 60), contact: clean(b.contact, 40),
  };
  if (d.name.length < 2) return res.status(400).json({ error: "Enter your name." });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email)) return res.status(400).json({ error: "Enter a valid email address." });
  if (!TYPES.includes(d.type)) return res.status(400).json({ error: "Choose a project type." });
  if (d.message.length < 20) return res.status(400).json({ error: "Describe your project in at least 20 characters." });
  if (/seed phrase|private key|recovery phrase|wallet password/i.test(JSON.stringify(d)))
    return res.status(400).json({ error: "Never send seed phrases, private keys or wallet passwords. Remove them and try again." });

  const key = process.env.RESEND_API_KEY, to = process.env.INQUIRY_TO;
  if (!key || !to) return res.status(503).json({ error: "Inquiries aren’t set up yet. Please email directly instead." });
  const rows = Object.entries(d).map(([k, v]) => `<p><b>${k}:</b> ${esc(v) || "—"}</p>`).join("");
  try {
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST", headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from: process.env.INQUIRY_FROM || "Portfolio <onboarding@resend.dev>", to: [to], reply_to: d.email,
        subject: `New ${d.type} inquiry from ${d.name}`, html: rows }),
    });
    if (!r.ok) return res.status(502).json({ error: "Couldn’t send your inquiry. Please try again or email directly." });
    return res.status(200).json({ ok: true });
  } catch {
    return res.status(502).json({ error: "Couldn’t send your inquiry. Please try again or email directly." });
  }
}
