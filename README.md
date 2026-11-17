<div align="center">

# OM POUNEKAR / FIELD ATLAS

**A portfolio as a living field notebook.**

Projects, learning, and ideas — mapped as they happen.

`HTML` &nbsp; `CSS` &nbsp; `JavaScript` &nbsp; `GitHub Pages`

</div>

---

## What this is

This site treats a portfolio less like a template and more like a **field atlas**: numbered plates, marginal notes, coordinate marks, contour lines, and project records. Its night-survey palette uses deep aubergine ink, quiet celadon, and dusty lilac with soft copper marks—a calmer dark theme than the familiar black-and-neon terminal layout.

It is a small static site: no build step, dependencies, or framework. Seven portfolio sections have their own route, while a single profile file supplies the content everywhere.

## The atlas

| Plate | Route | What you’ll find |
|:--|:--|:--|
| 00 | `/` | Index and featured work |
| 01 | `/about/` | About me |
| 02 | `/education/` | Education |
| 03 | `/skills/` | Skills |
| 04 | `/projects/` | Projects |
| 05 | `/achievements/` | Achievements and certifications |
| 06 | `/experience/` | Experience |
| 07 | `/contact/` | Email, LinkedIn, and GitHub |

## Make it yours

**Edit [`profile.json`](./profile.json) first.** It is the one place for your name, role, location, bio, education, skills, projects, achievements, experience, email, and social links. Save it, then refresh any page; the same profile is used throughout the atlas.

Quick start:

1. Replace the sample prompts in `profile.json` with accurate details.
2. Add or remove entries in its arrays to match your own experience.
3. Replace the example email and social URLs with your real public links.
4. Open the homepage and check every plate, especially project links and mobile layouts.

Each project supports `liveUrl` and `sourceUrl`; each achievement supports a verification `url`. Leave a link empty if there is nothing to link to. Never add private contact details you don’t want published.

## Preview locally

Because the browser fetches `profile.json`, use a local web server rather than opening the HTML directly as a `file://` URL.

- In VS Code, install/open **Live Server**, right-click `index.html`, then select **Open with Live Server**.
- Or run `python -m http.server 8000` from the repository folder and visit `http://localhost:8000`.

No package install or build command is needed.

## Publish on GitHub Pages

1. Push the repository to GitHub.
2. Open **Settings → Pages**.
3. Choose **Deploy from a branch**, select `main` and `/ (root)`, then save.
4. Open the deployed URL shown on the Pages settings screen.

Every section is a folder with an `index.html`, so routes such as `/projects/` work with GitHub Pages. The pages load shared `style.css`, `script.js`, and `profile.json` from the repository root.

## Design research

I compared portfolio collections with a few individual sites, looking for useful patterns without cloning a specific design:

| Reference | What stood out | What this site takes from it |
|:--|:--|:--|
| [Awwwards portfolio collection](https://www.awwwards.com/websites/portfolio/) | The collection spans very different visual approaches; the portfolio format does not have to mean one dark hero plus a grid of cards. | Make the presentation feel authored, but keep the work and navigation clear. |
| [Tom de Koning](https://www.tomdekoning.work/) | Role, availability, experience, and work are easy to scan before reading the longer introduction. | Put identity and location up front, then make every section easy to find. |
| [Romain Avalle](https://romainavalle.dev/) | A narrative biography is paired with an indexed body of work and recognizable contribution details. | Use numbered “plates” and chronological records, not anonymous project tiles. |
| [Quang Dinh](https://www.quangdinh.im/) | The process is described as a sequence—brief, concept, design, development—so the work has context. | Treat education, practice, and experience as parts of a journey rather than isolated badges. |
| [Brutalist Websites](https://brutalistwebsites.com/) | Its stated philosophy favors a strong point of view over familiar web conventions. | Choose a distinctive editorial field-atlas metaphor; borrow the confidence, not the intentionally rough usability. |
| [web.dev: responsive web design basics](https://web.dev/articles/responsive-web-design-basics) | Responsive sites reflow for different widths and interactions instead of forcing sideways scrolling. | Reflow the atlas index and records for touch-sized screens; verify overflow at mobile widths. |

### The direction

The portfolio is designed as a **personal field atlas**: survey-grid texture, contour-map marks, numbered plates, marginal notes, and specimen-like project records. A muted aubergine base and mineral accents keep it dark but calm. The map artwork is drawn in CSS, so the site does not depend on stock photography or copied portfolio assets.

## Project files

```text
.
├── profile.json        # Edit your portfolio information here
├── index.html          # Home-page shell
├── style.css           # Shared field-atlas visual system
├── script.js           # Shared page rendering and navigation
├── about/
├── education/
├── skills/
├── projects/
├── achievements/
└── experience/
└── contact/
```

Each section folder contains its own `index.html` shell. Shared content comes from `profile.json`.
