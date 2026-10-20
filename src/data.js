// Single source of truth. Edit here. Nothing is marked "verified" until you have opened and checked it.
export const profile = {
  name: "ROLLY", title: "Full-Stack Developer",
  email: "kcrolly3@gmail.com",
  github: "https://github.com/rollyxking",
  telegram: "https://t.me/rollyofweb3",
  whatsapp: "https://wa.me/2348085073402",
  stack: ["React", "JavaScript", "Tailwind CSS", "Web3 frontends"],
};

export const categories = ["Web3 & Crypto", "Event Ticketing", "E-commerce", "Creative & Brand", "Full-Stack Apps"];

// status: "unverified" | "verified" | "unavailable" | "attention"
// tags: list only technologies confirmed from source code.
const P = (slug, name, category, url, extra = {}) => ({
  slug, name, category, url, status: "unverified", tags: [], github: null, altUrl: null,
  blurb: "Live deployment supplied by the owner. Purpose and features are pending audit.", ...extra,
});

export const projects = [
  P("bitcoin", "Bitcoin project", "Web3 & Crypto", "https://bitcoin-xi-six.vercel.app/"),
  P("megenmate", "MegenMate", "Web3 & Crypto", "https://megenmate.vercel.app/"),
  P("kris", "KRIS", "Web3 & Crypto", "https://kris-of2x.vercel.app/"),
  P("dogedakota", "DogeDakota", "Web3 & Crypto", "https://dogedakota.vercel.app/"),
  P("flashofficial", "FlashOfficial", "Web3 & Crypto", "https://flashofficial.vercel.app/"),
  P("ticketbuddy", "TicketBuddy", "Event Ticketing", "https://ticketsbuddy.vercel.app/", {
    altUrl: "https://ticket-buddy-q144.vercel.app/", tags: ["React", "Vite", "Vercel"],
    blurb: "Event-ticketing front end. A second deployment URL was supplied; whether it is the same app is still to be confirmed.",
  }),
  P("easyeasy", "EasyEasy", "E-commerce", "https://easyeasy-theta.vercel.app/"),
  P("online-store", "Online Store", "E-commerce", "https://onlinestore-brown.vercel.app/"),
  P("phatcat", "PhatCat", "Creative & Brand", "https://phatcat.vercel.app/"),
  P("treasuretech-hub", "TreasureTech Hub", "Creative & Brand", "https://treasuretech-hub.vercel.app/"),
  P("spun-yarn-visuals", "Spun Yarn Visuals", "Creative & Brand", "https://spun-yarn-visuals.vercel.app/"),
  P("teo-couture", "TEO Couture", "Creative & Brand", "https://te-oocouture-21iq.vercel.app/"),
  P("agriconnect", "AgriConnect", "Full-Stack Apps", null, {
    tags: ["React", "Vite"], blurb: "Agriculture marketplace. Live URL and repository still to be located.",
  }),
  P("degenmatecoin-meme-lab", "DegenMateCoin Meme Lab", "Full-Stack Apps", null, {
    tags: ["React", "Vite", "Node.js", "TypeScript"],
    blurb: "Meme generator with a React front end and a Node/TypeScript backend. Live URL still to be confirmed.",
  }),
];

export const statusLabel = {
  unverified: "Not yet audited", verified: "Verified live", unavailable: "Unavailable", attention: "Needs attention",
};

// a: "offered" | "collaboration" | "not-offered"
export const services = [
  { t: "Web3 & crypto project websites", a: "offered", d: "Landing pages, project information, roadmaps, community links and launch pages. Responsive and fast." },
  { t: "Token & community websites", a: "offered", d: "Identity, roadmap, FAQ and community navigation. Only verified external links; no investment claims." },
  { t: "Launch & marketing pages", a: "offered", d: "Clear messaging, calls to action and SEO for announcements, campaigns and event sign-ups." },
  { t: "Dashboards & admin panels", a: "offered", d: "React interfaces for project data, campaigns and admin tools, fed by your own APIs or database." },
  { t: "Full-stack applications", a: "offered", d: "Accounts, authentication, data storage, admin interfaces and third-party API integrations." },
  { t: "Prototypes & MVPs", a: "offered", d: "Turn an early idea into a working web app. Scope depends on your requirements." },
  { t: "Wallet connection & on-chain interfaces", a: "collaboration", d: "Wallet connect, token balances and transaction status. Not yet delivered by me; possible as a collaboration alongside a Web3 engineer." },
  { t: "Smart contracts, audits & protocol work", a: "not-offered", d: "Not a service I provide. Your project would need a specialist for this." },
];
export const availabilityLabel = { offered: "Offered", collaboration: "Collaboration only", "not-offered": "Not offered" };
