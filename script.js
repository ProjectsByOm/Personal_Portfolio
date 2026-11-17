const routes = [
  { id: "about", number: "01", label: "About", note: "The person behind the work", title: "A person, not a title.", lede: "A few notes on what I care about, how I learn, and what I’m curious to explore next." },
  { id: "education", number: "02", label: "Education", note: "Where the questions began", title: "Learning in layers.", lede: "The classrooms, courses, and questions that are shaping the way I think." },
  { id: "skills", number: "03", label: "Skills", note: "Things in the toolkit", title: "Tools, still evolving.", lede: "A working inventory of what I can do today and what I’m learning to do better." },
  { id: "projects", number: "04", label: "Projects", note: "Ideas made tangible", title: "Small ideas, made real.", lede: "Selected experiments and projects, with the thinking and making left visible." },
  { id: "achievements", number: "05", label: "Milestones", note: "Proof of progress", title: "Moments along the way.", lede: "Certifications, recognitions, and milestones that mark a chapter in the journey." },
  { id: "experience", number: "06", label: "Experience", note: "Where I have contributed", title: "Work in the world.", lede: "Teams, roles, and communities where I’ve had the chance to contribute and grow." },
  { id: "contact", number: "07", label: "Contact", note: "Open a conversation", title: "The next page is open.", lede: "Have a project, opportunity, or an interesting question? I’d be glad to hear from you." }
];

const page = document.body.dataset.page || "home";
const base = document.body.dataset.base || "./";
const profilePath = document.body.dataset.profile || `${base}profile.json`;
const app = document.querySelector("#app");

function node(tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text !== undefined && text !== null) element.textContent = text;
  return element;
}

function safeUrl(value, protocols) {
  if (typeof value !== "string" || !value.trim()) return "";
  try {
    const url = new URL(value, window.location.href);
    return protocols.includes(url.protocol) ? url.href : "";
  } catch {
    return "";
  }
}

function makeLink(label, href, className, external) {
  const anchor = node("a", className, label);
  anchor.href = href;
  if (external) {
    anchor.target = "_blank";
    anchor.rel = "noreferrer";
  }
  return anchor;
}

function makeHeader(profile) {
  const header = node("header", "site-header");
  const nav = node("nav", "nav shell");
  nav.setAttribute("aria-label", "Main navigation");
  const brand = makeLink("", base, "brand");
  const seal = node("span", "brand-seal", "OP");
  const brandName = node("span", "brand-name");
  brandName.append(document.createTextNode(profile.shortName || profile.name || "Name"));
  brandName.append(node("span", "brand-suffix", " / FIELD NOTES"));
  brand.append(seal, brandName);
  nav.append(brand);

  const toggle = node("button", "menu-toggle");
  toggle.type = "button";
  toggle.setAttribute("aria-expanded", "false");
  toggle.setAttribute("aria-controls", "site-nav");
  toggle.setAttribute("aria-label", "Open navigation");
  toggle.append(node("span"), node("span"));
  nav.append(toggle);

  const links = node("div", "site-nav");
  links.id = "site-nav";
  const allLinks = [{ id: "home", number: "00", label: "Index", href: base }, ...routes.map((item) => ({ ...item, href: `${base}${item.id}/` }))];
  for (const item of allLinks) {
    const anchor = makeLink(item.label, item.href);
    if (item.id === page) anchor.setAttribute("aria-current", "page");
    links.append(anchor);
  }
  nav.append(links);
  header.append(nav);

  toggle.addEventListener("click", () => {
    const expanded = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!expanded));
    toggle.setAttribute("aria-label", expanded ? "Open navigation" : "Close navigation");
    links.classList.toggle("is-open", !expanded);
  });
  links.addEventListener("click", (event) => {
    if (event.target instanceof Element && event.target.closest("a")) {
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open navigation");
      links.classList.remove("is-open");
    }
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open navigation");
      links.classList.remove("is-open");
    }
  });
  return header;
}

function makeFooter(profile) {
  const footer = node("footer", "site-footer");
  const inner = node("div", "shell footer-inner");
  const mark = node("span", "footer-mark", "OP");
  inner.append(mark, node("p", "footer-credit", `Filed from ${profile.location || "somewhere"} · © ${new Date().getFullYear()} ${profile.name || "Your Name"}`));
  const links = node("div", "footer-links");
  const github = safeUrl(profile.github, ["https:", "http:"]);
  const linkedin = safeUrl(profile.linkedin, ["https:", "http:"]);
  if (linkedin) links.append(makeLink("LinkedIn ↗", linkedin, "", true));
  if (github) links.append(makeLink("GitHub ↗", github, "", true));
  links.append(makeLink("Top ↑", "#main"));
  inner.append(links);
  footer.append(inner);
  return footer;
}

function makePageHead(number, kicker, title, lede) {
  const head = node("header", "page-head");
  const breadcrumb = node("div", "breadcrumb");
  breadcrumb.append(makeLink("INDEX", base), node("span", "", "/"), node("span", "", `PLATE ${number}`));
  head.append(breadcrumb, node("p", "plate-kicker", `${number} / ${kicker}`), node("h1", "page-title", title), node("p", "page-lede", lede));
  return head;
}

function makeSectionHead(index, title, note) {
  const heading = node("div", "section-head");
  heading.append(node("span", "section-index", index), node("h2", "", title), node("span", "section-note", note));
  return heading;
}

function emptyNote(text) {
  return node("p", "empty-note", text);
}

function makeHome(profile) {
  const main = node("main", "home-page shell");
  main.id = "main";

  const hero = node("section", "home-hero");
  const copy = node("div", "hero-copy");
  const top = node("div", "hero-overline");
  top.append(node("span", "live-mark"), node("span", "", "PERSONAL FIELD ATLAS"), node("span", "overline-year", String(new Date().getFullYear())));
  copy.append(top, node("p", "hero-pretitle", "A PRACTICE OF NOTICING"), node("h1", "hero-title", profile.headline || "Learning by making."));
  const intro = node("p", "hero-intro");
  intro.append(document.createTextNode("I’m "), node("strong", "", profile.name || "Your Name"), document.createTextNode(` — ${profile.role || "a curious person"} in ${profile.location || "your corner of the world"}.`));
  copy.append(intro, node("p", "hero-story", profile.intro || "Write a short introduction in profile.json."));
  const actions = node("div", "hero-actions");
  actions.append(makeLink("Explore the work ↓", `${base}projects/`, "ink-button"), makeLink("A note about me ↗", `${base}about/`, "text-button"));
  copy.append(actions);
  const meta = node("div", "hero-coordinates");
  meta.append(node("span", "coordinate-label", "CURRENT POSITION"), node("span", "", profile.location || "Add your location"));
  copy.append(meta);

  const figure = node("figure", "atlas-figure");
  figure.setAttribute("aria-label", `Decorative contour map for ${profile.location || "the portfolio"}`);
  const map = node("div", "contour-map");
  map.setAttribute("aria-hidden", "true");
  map.append(node("span", "contour contour-one"), node("span", "contour contour-two"), node("span", "contour contour-three"), node("span", "map-crosshair"));
  const north = node("span", "north-mark", "N");
  const pin = node("span", "map-pin", "01");
  const stamp = node("div", "map-stamp");
  stamp.append(node("span", "", "FIELD NOTE"), node("strong", "", profile.shortName || profile.name || "OM"), node("span", "", "VOL. 01 — IN PROGRESS"));
  figure.append(map, north, pin, stamp, node("figcaption", "figure-caption", "FIG. 01 — A MAP OF WHAT I’M LEARNING"));

  hero.append(copy, figure);
  const index = node("div", "hero-index");
  index.append(node("span", "", "01—07"), node("span", "", profile.status || "OPEN FIELD / IN PROGRESS"), node("span", "", "SCROLL TO SURVEY ↓"));
  hero.append(index);
  main.append(hero);

  const indexSection = node("section", "atlas-index");
  indexSection.append(makeSectionHead("A", "A field guide to me", "SELECT A PLATE"));
  const list = node("div", "route-list");
  routes.forEach((route) => {
    const link = makeLink("", `${base}${route.id}/`, "route-row");
    link.append(node("span", "route-number", route.number), node("span", "route-name", route.label), node("span", "route-note", route.note), node("span", "route-arrow", "↗"));
    list.append(link);
  });
  indexSection.append(list);
  main.append(indexSection);

  const excerpt = node("section", "home-excerpt");
  excerpt.append(makeSectionHead("B", "A note from the notebook", "ABOUT / FIELD NOTES"));
  const quote = node("p", "excerpt-copy", profile.about || "Add your personal introduction in profile.json.");
  const aboutLink = makeLink("Read the full note ↗", `${base}about/`, "text-button");
  excerpt.append(quote, aboutLink);
  main.append(excerpt);

  const projectList = Array.isArray(profile.projects) ? profile.projects.filter((item) => item && item.title).slice(0, 2) : [];
  const featured = node("section", "featured-work");
  featured.append(makeSectionHead("C", "Things made along the way", "SELECTED WORK"));
  if (projectList.length) {
    const work = node("div", "featured-list");
    projectList.forEach((project, index) => {
      const row = node("article", "featured-row");
      row.append(node("span", "featured-number", `0${index + 1}`), node("h3", "", project.title), node("p", "", project.description || ""), makeLink("View all ↗", `${base}projects/`, "featured-arrow"));
      work.append(row);
    });
    featured.append(work);
  } else {
    featured.append(emptyNote("Add a project to the “projects” list in profile.json."));
  }
  featured.append(makeLink("Browse the project plate ↗", `${base}projects/`, "text-button"));
  main.append(featured);

  const contact = node("section", "home-closer");
  contact.append(node("span", "plate-kicker", "D / OPEN CORRESPONDENCE"), node("h2", "", "Have a question?"), node("p", "", "There’s room for another perspective in this notebook."), makeLink("Write a note ↗", `${base}contact/`, "ink-button"));
  main.append(contact);
  return main;
}

function makeTimeline(items, emptyText, kind) {
  const list = node("div", "timeline");
  if (!Array.isArray(items) || !items.length) {
    list.append(emptyNote(emptyText));
    return list;
  }
  items.forEach((item, index) => {
    const row = node("article", `timeline-row ${kind || ""}`);
    row.append(node("span", "timeline-index", String(index + 1).padStart(2, "0")), node("span", "timeline-date", item.period || item.year || "—"));
    const content = node("div", "timeline-content");
    content.append(node("h2", "", item.qualification || item.role || item.title || "Untitled"), node("p", "timeline-place", [item.institution || item.organization || item.issuer, item.location].filter(Boolean).join(" · ")));
    if (item.details) content.append(node("p", "timeline-description", item.details));
    if (item.url) {
      const url = safeUrl(item.url, ["https:", "http:"]);
      if (url) content.append(makeLink("View credential ↗", url, "record-link", true));
    }
    row.append(content, node("span", "timeline-symbol", "↗"));
    list.append(row);
  });
  return list;
}

function makeAbout(profile) {
  const main = node("main", "page-shell shell");
  main.id = "main";
  main.append(makePageHead("01", "THE PERSON", "A person, not a title.", `I’m ${profile.name || "Your Name"}, ${profile.role || "a student / aspiring developer"} based in ${profile.location || "your city"}.`));
  const story = node("section", "story-sheet");
  story.append(node("span", "sheet-label", "FIELD NOTE 01 / A SHORT INTRODUCTION"), node("p", "story-copy", profile.about || "Write your introduction in profile.json."));
  const side = node("aside", "interest-sheet");
  side.append(node("span", "sheet-label", "OBSERVATIONS / INTERESTS"), node("h2", "", "Things I return to."));
  const interests = node("ul", "interest-list");
  (Array.isArray(profile.interests) ? profile.interests : []).forEach((interest, index) => interests.append(node("li", "", `${String(index + 1).padStart(2, "0")} — ${interest}`)));
  side.append(interests);
  const composition = node("div", "about-composition");
  composition.append(story, side);
  main.append(composition, makeSectionHead("MARGIN", "A few coordinates", "THE CURRENT PICTURE"));
  main.append(makeTimeline([{ period: "NOW", qualification: profile.role, institution: "Current focus", location: profile.location, details: profile.status }], "Add your current focus in profile.json.", "current-row"));
  return main;
}

function makeEducation(profile) {
  const main = node("main", "page-shell shell");
  main.id = "main";
  main.append(makePageHead("02", "LEARNING & EDUCATION", "Learning in layers.", "The classrooms, courses, and questions that are shaping the way I think."));
  main.append(makeSectionHead("02.A", "Places of study", "EDUCATION RECORD"));
  main.append(makeTimeline(profile.education, "Add your education entries in profile.json.", "education-row"));
  const note = node("aside", "margin-note");
  note.append(node("span", "sheet-label", "MARGIN NOTE"), node("p", "", "The most useful things I’ve learned don’t always fit neatly on a transcript."));
  main.append(note);
  return main;
}

function makeSkills(profile) {
  const main = node("main", "page-shell shell");
  main.id = "main";
  main.append(makePageHead("03", "TOOLS & PRACTICE", "Tools, still evolving.", "A working inventory of what I can do today and what I’m learning to do better."));
  const board = node("div", "skills-board");
  (Array.isArray(profile.skills) ? profile.skills : []).forEach((group, index) => {
    const sheet = node("section", "skill-sheet");
    sheet.append(node("span", "skill-sheet-number", `SHEET 0${index + 1}`), node("h2", "", group.group || "Skill group"));
    const list = node("ul", "skill-list");
    (Array.isArray(group.items) ? group.items : []).forEach((skill) => list.append(node("li", "", skill)));
    sheet.append(list);
    board.append(sheet);
  });
  if (!board.children.length) board.append(emptyNote("Add skills and groups in profile.json."));
  main.append(board);
  const note = node("p", "margin-note", "An honest inventory beats a long list. Keep the skills you can show in practice.");
  main.append(note);
  return main;
}

function makeProjects(profile) {
  const main = node("main", "page-shell shell");
  main.id = "main";
  main.append(makePageHead("04", "SELECTED WORK", "Small ideas, made real.", "Selected experiments and projects, with the thinking and making left visible."));
  const projects = Array.isArray(profile.projects) ? profile.projects : [];
  if (!projects.length) main.append(emptyNote("Add your projects to the “projects” list in profile.json."));
  projects.forEach((project, index) => {
    const record = node("article", "project-record");
    const indexBlock = node("div", "project-index-block");
    indexBlock.append(node("span", "project-index", `FIG. ${String(index + 1).padStart(2, "0")}`), node("span", "project-period", project.period || "—"));
    const content = node("div", "project-description");
    content.append(node("span", "sheet-label", project.category || "PROJECT"), node("h2", "", project.title || "Untitled project"), node("p", "", project.description || ""));
    if (Array.isArray(project.stack) && project.stack.length) {
      const tags = node("ul", "project-tags");
      project.stack.forEach((tag) => tags.append(node("li", "", tag)));
      content.append(tags);
    }
    const actions = node("div", "project-actions");
    const live = safeUrl(project.liveUrl, ["https:", "http:"]);
    const source = safeUrl(project.sourceUrl, ["https:", "http:"]);
    if (live) actions.append(makeLink("Live project ↗", live, "record-link", true));
    if (source) actions.append(makeLink("Source code ↗", source, "record-link", true));
    if (actions.children.length) content.append(actions);
    const drawing = node("div", `project-drawing drawing-${index % 3}`);
    drawing.setAttribute("aria-hidden", "true");
    drawing.append(node("span", "drawing-ring ring-one"), node("span", "drawing-ring ring-two"), node("span", "drawing-center", String(index + 1).padStart(2, "0")));
    record.append(indexBlock, content, drawing);
    main.append(record);
  });
  return main;
}

function makeAchievements(profile) {
  const main = node("main", "page-shell shell");
  main.id = "main";
  main.append(makePageHead("05", "RECOGNITION & LEARNING", "Moments along the way.", "Certifications, recognitions, and milestones that mark a chapter in the journey."));
  main.append(makeTimeline(profile.achievements, "Add awards or certifications in profile.json.", "achievement-row"));
  return main;
}

function makeExperience(profile) {
  const main = node("main", "page-shell shell");
  main.id = "main";
  main.append(makePageHead("06", "WORK & CONTRIBUTION", "Work in the world.", "Teams, roles, and communities where I’ve had the chance to contribute and grow."));
  main.append(makeTimeline(profile.experience, "Add work, volunteer, or community experience in profile.json.", "experience-row"));
  return main;
}

function makeContact(profile) {
  const main = node("main", "page-shell shell");
  main.id = "main";
  main.append(makePageHead("07", "OPEN CORRESPONDENCE", "The next page is open.", "Have a project, opportunity, or an interesting question? I’d be glad to hear from you."));
  const contacts = node("div", "contact-records");
  const email = profile.email ? safeUrl(`mailto:${profile.email}`, ["mailto:"]) : "";
  const linkedin = safeUrl(profile.linkedin, ["https:", "http:"]);
  const github = safeUrl(profile.github, ["https:", "http:"]);
  if (email) contacts.append(makeLink("EMAIL", email, "contact-record contact-email"), node("span", "contact-detail", profile.email));
  if (linkedin) contacts.append(makeLink("LINKEDIN", linkedin, "contact-record", true), node("span", "contact-detail", "Professional profile"));
  if (github) contacts.append(makeLink("GITHUB", github, "contact-record", true), node("span", "contact-detail", "Code and experiments"));
  if (!contacts.children.length) contacts.append(emptyNote("Add an email address or profile link in profile.json."));
  main.append(contacts);
  const note = node("aside", "contact-note");
  note.append(node("span", "sheet-label", "POSTSCRIPT"), node("p", "", "Good conversations often start with a small question. No elaborate introduction required."));
  main.append(note);
  return main;
}

const renderers = {
  home: makeHome,
  about: makeAbout,
  education: makeEducation,
  skills: makeSkills,
  projects: makeProjects,
  achievements: makeAchievements,
  experience: makeExperience,
  contact: makeContact
};

function showError(message) {
  app.replaceChildren();
  const panel = node("section", "load-error");
  panel.append(node("h1", "", "The notebook couldn’t be opened."), node("p", "", message), node("p", "", "Run this site through VS Code Live Server or another local web server so profile.json can be loaded."));
  app.append(panel);
}

async function start() {
  if (!app) return;
  try {
    const response = await fetch(profilePath);
    if (!response.ok) throw new Error(`Could not load ${profilePath} (HTTP ${response.status}).`);
    const profile = await response.json();
    if (!profile || typeof profile !== "object" || !profile.name) throw new Error("profile.json must contain a profile name.");

    document.title = page === "home" ? `${profile.name} — Field Atlas` : `${routes.find((route) => route.id === page)?.label || "Portfolio"} — ${profile.name}`;
    const description = document.querySelector('meta[name="description"]');
    if (description) description.content = `${profile.name} — ${profile.intro || "A personal field atlas of projects, learning, and ideas."}`;
    const header = makeHeader(profile);
    const main = (renderers[page] || makeHome)(profile);
    const footer = makeFooter(profile);
    app.replaceChildren(header, main, footer);
  } catch (error) {
    showError(error instanceof Error ? error.message : "An unexpected error occurred while loading profile.json.");
    console.error("Portfolio initialization failed:", error);
  }
}

start();
