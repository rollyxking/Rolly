import { useMemo, useState } from "react";
import { Link, NavLink, Route, Routes, useParams } from "react-router-dom";
import { profile, categories, projects, statusLabel, services, availabilityLabel } from "./data.js";

const TYPES = ["Token website", "dApp interface", "Web3 dashboard", "Crypto community website", "Full-stack application", "Something else"];

function Layout({ children }) {
  return (
    <>
      <header className="bar">
        <Link to="/" className="logo mono">~/{profile.name.toLowerCase()}</Link>
        <nav aria-label="Main">
          <NavLink to="/projects">Projects</NavLink>
          <NavLink to="/web3-services">Web3 services</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </nav>
      </header>
      <main>{children}</main>
      <footer className="foot">
        <span>{profile.name}, {profile.title}</span>
        <span className="links">
          <a href={profile.github}>GitHub</a><a href={profile.telegram}>Telegram</a>
          <a href={profile.whatsapp}>WhatsApp</a><a href={`mailto:${profile.email}`}>Email</a>
        </span>
      </footer>
    </>
  );
}

function Home() {
  const featured = projects.filter((p) => p.url).slice(0, 6);
  return (
    <>
      <section className="hero wrap">
        <pre className="code mono" aria-label="Developer profile">
{`const developer = {
  name: "${profile.name}",
  role: "${profile.title}",
  stack: [${profile.stack.map((s) => `"${s}"`).join(", ")}],
  builds: ["websites", "dashboards", "full-stack apps"],
  web3: "interfaces and products, not smart contracts",
};`}
        </pre>
        <div>
          <h1>I build websites and apps that people can use on day one.</h1>
          <p className="lead">Full-stack developer working in React. I make project sites, dashboards and web apps for founders, communities and small businesses, with a focus on Web3 teams.</p>
          <p className="row">
            <Link className="btn" to="/projects">See my projects</Link>
            <Link className="btn ghost" to="/web3-services">Hire me for Web3 work</Link>
          </p>
        </div>
      </section>
      <section className="wrap">
        <h2>Live work</h2>
        <Cards list={featured} />
        <p><Link to="/projects">All {projects.length} projects</Link></p>
      </section>
    </>
  );
}

function Cards({ list }) {
  if (!list.length) return <p className="empty">No projects match. Clear the search or pick another category.</p>;
  return (
    <ul className="grid">
      {list.map((p) => (
        <li key={p.slug} className="card">
          <div className="meta"><span>{p.category}</span><span className={`chip ${p.status}`}>{statusLabel[p.status]}</span></div>
          <h3><Link to={`/projects/${p.slug}`}>{p.name}</Link></h3>
          <p>{p.blurb}</p>
          <p className="tags mono">{p.tags.join("  ")}</p>
          <p className="row small">
            <Link to={`/projects/${p.slug}`}>Case study</Link>
            {p.url && <a href={p.url} target="_blank" rel="noreferrer">Live demo</a>}
            {p.github && <a href={p.github} target="_blank" rel="noreferrer">Source</a>}
          </p>
        </li>
      ))}
    </ul>
  );
}

function Projects() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");
  const list = useMemo(() => projects.filter((p) =>
    (cat === "All" || p.category === cat) &&
    `${p.name} ${p.blurb} ${p.tags.join(" ")}`.toLowerCase().includes(q.trim().toLowerCase())), [q, cat]);
  return (
    <section className="wrap">
      <h1>Projects</h1>
      <p className="lead">Status labels show what has actually been checked. “Not yet audited” means the link is listed but its details haven’t been confirmed.</p>
      <label className="sr" htmlFor="q">Search projects</label>
      <input id="q" type="search" placeholder="Search projects" value={q} onChange={(e) => setQ(e.target.value)} />
      <div className="row filters" role="group" aria-label="Filter by category">
        {["All", ...categories].map((c) => (
          <button key={c} className={c === cat ? "pill on" : "pill"} aria-pressed={c === cat} onClick={() => setCat(c)}>{c}</button>
        ))}
      </div>
      <Cards list={list} />
    </section>
  );
}

function Project() {
  const p = projects.find((x) => x.slug === useParams().slug);
  if (!p) return <NotFound />;
  const unchecked = p.status === "unverified";
  return (
    <section className="wrap narrow">
      <p><Link to="/projects">Back to projects</Link></p>
      <h1>{p.name}</h1>
      <p className="meta"><span>{p.category}</span><span className={`chip ${p.status}`}>{statusLabel[p.status]}</span></p>
      <h2>What it is</h2><p>{p.blurb}</p>
      <h2>Technologies</h2>
      <p>{p.tags.length ? p.tags.join(", ") : "Pending audit. No technologies are listed until they are confirmed from source code."}</p>
      <h2>Features, role and limitations</h2>
      <p>{unchecked ? "Not documented yet. These sections will be filled in after the site has been opened and checked." : "Add verified features, your role and known limitations in src/data.js."}</p>
      <p className="row">
        {p.url ? <a className="btn" href={p.url} target="_blank" rel="noreferrer">Open live demo</a> : <span className="chip unverified">No live URL yet</span>}
        {p.altUrl && <a className="btn ghost" href={p.altUrl} target="_blank" rel="noreferrer">Second deployment</a>}
        {p.github && <a className="btn ghost" href={p.github} target="_blank" rel="noreferrer">Source on GitHub</a>}
      </p>
    </section>
  );
}

function Web3() {
  return (
    <>
      <section className="wrap narrow">
        <h1>Building Digital Experiences for Web3.</h1>
        <p className="lead">I help Web3 founders, crypto communities and early-stage teams turn ideas into responsive websites, dashboards and full-stack web apps that are easy to understand and use.</p>
        <p className="row">
          <a className="btn" href="#inquiry">Discuss your Web3 project</a>
          <a className="btn ghost" href="#inquiry">Request a project quote</a>
          <Link className="btn ghost" to="/projects">View Web3 projects</Link>
        </p>
      </section>
      <section className="wrap">
        <h2>What you can hire me for</h2>
        <ul className="grid">
          {services.map((s) => (
            <li key={s.t} className="card">
              <div className="meta"><span className={`chip ${s.a}`}>{availabilityLabel[s.a]}</span></div>
              <h3>{s.t}</h3><p>{s.d}</p>
            </li>
          ))}
        </ul>
      </section>
      <section className="wrap narrow">
        <h2>How I can help your Web3 project</h2>
        <ul className="plain">
          <li><b>Turn ideas into working interfaces.</b> From rough concept to a usable site or app.</li>
          <li><b>Make complex products easier to understand.</b> Clear layouts and readable information.</li>
          <li><b>Build across front end and back end.</b> React with APIs, a database and authentication.</li>
          <li><b>Work on every screen size.</b> Many Web3 users browse on their phones.</li>
          <li><b>Prepare for launch.</b> Polish, testing, deployment and performance.</li>
        </ul>
        <p className="note">I don’t promise user growth, token performance or returns.</p>
      </section>
      <section className="wrap narrow" id="inquiry">
        <h2>Tell me about your project</h2>
        <InquiryForm />
      </section>
    </>
  );
}

function InquiryForm() {
  const [state, setState] = useState({ s: "idle", msg: "" });
  async function submit(e) {
    e.preventDefault();
    setState({ s: "sending", msg: "" });
    const data = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const r = await fetch("/api/inquiry", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      const j = await r.json().catch(() => ({}));
      if (!r.ok) return setState({ s: "error", msg: j.error || "Something went wrong. Please try again." });
      e.currentTarget.reset();
      setState({ s: "ok", msg: "Thanks. Your inquiry was sent and I’ll reply by email." });
    } catch {
      setState({ s: "error", msg: "Couldn’t reach the server. Check your connection or email directly." });
    }
  }
  const F = ({ id, label, ...rest }) => (<><label htmlFor={id}>{label}</label><input id={id} name={id} {...rest} /></>);
  return (
    <form onSubmit={submit} className="form">
      <p className="note">Never send seed phrases, private keys or wallet passwords. I will never ask for them.</p>
      <F id="name" label="Name" required />
      <F id="email" label="Email" type="email" required />
      <F id="org" label="Project or organization" />
      <label htmlFor="type">Type of project</label>
      <select id="type" name="type" required defaultValue="">
        <option value="" disabled>Choose one</option>
        {TYPES.map((t) => <option key={t}>{t}</option>)}
      </select>
      <label htmlFor="message">Short project description</label>
      <textarea id="message" name="message" rows="5" required minLength="20" />
      <F id="deliverables" label="Expected deliverables" />
      <F id="budget" label="Budget range (optional)" />
      <F id="timeline" label="Timeline (optional)" />
      <label htmlFor="contact">Preferred contact method</label>
      <select id="contact" name="contact" defaultValue="Email"><option>Email</option><option>Telegram</option><option>WhatsApp</option></select>
      <input className="hp" name="website" tabIndex="-1" autoComplete="off" aria-hidden="true" />
      <button className="btn" disabled={state.s === "sending"}>{state.s === "sending" ? "Sending…" : "Send inquiry"}</button>
      <p role="status" className={`msg ${state.s}`}>{state.msg}</p>
    </form>
  );
}

function Contact() {
  return (
    <section className="wrap narrow">
      <h1>Contact</h1>
      <p className="lead">Hiring, a freelance project or a collaboration. Send an inquiry or reach me directly.</p>
      <p className="row small"><a href={`mailto:${profile.email}`}>{profile.email}</a><a href={profile.telegram}>Telegram</a><a href={profile.whatsapp}>WhatsApp</a><a href={profile.github}>GitHub</a></p>
      <InquiryForm />
    </section>
  );
}

function NotFound() {
  return <section className="wrap narrow"><h1>Page not found</h1><p>That page doesn’t exist. <Link to="/projects">Browse projects</Link> or <Link to="/">go home</Link>.</p></section>;
}

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:slug" element={<Project />} />
        <Route path="/web3-services" element={<Web3 />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}
