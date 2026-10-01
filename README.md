# Portfolio

React + Vite (JavaScript, plain CSS) implementation of the full Claude
Design project — the animated landing scene plus every subpage.

## Pages / routes

| Route          | Page                                                     |
| -------------- | --------------------------------------------------------- |
| `/`             | Landing scene — scroll-driven GSAP "walk" past buildings that link to the other pages |
| `/about`        | About Me                                                  |
| `/experience`   | Experience (timeline)                                     |
| `/projects`     | Projects                                                   |
| `/qa-lab`       | QA Lab — simulated Playwright/Postman test runner          |

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Test (Playwright, in `e2e/`)

```bash
npx playwright install chromium   # once
npm run test:e2e
npm run test:e2e:ui               # interactive runner
```

`playwright.config.js` builds and serves the app itself (`npm run build &&
npm run preview`), so no dev server needs to be running first. One spec
file per page (`e2e/home.spec.js`, `about.spec.js`, `experience.spec.js`,
`projects.spec.js`, `qa-lab.spec.js`), 23 tests total.

## Structure

```
src/
  components/
    ImageSlot/        drag-and-drop image placeholder (persists via localStorage)
    ProjectCard/       one project entry: hanging plate + title/blurb/tags/links
    CloudsBackground/  decorative cloud sprite backdrop
    SwingingSign/      the rope-and-hanger sign that sways and pays out on scroll
    HomeButton/        fixed top-right "Home" pill link
    BackLink/          "← Back to the walk" link
    PageScene/         shared subpage shell (gradient bg, clouds, rope, vignette, Home button)
    PageTitle/         big red outlined page title
    Timeline/          vertical timeline used by the Experience page
  pages/
    Home.jsx           the animated landing/"walk" scene (GSAP + ScrollTrigger + MotionPathPlugin)
    About.jsx
    Experience.jsx
    Projects.jsx
    QaLab.jsx
  data/
    kaiju.js, about.js, experience.js, projects.js, qaLab.js, decor.js
      — content and layout presets, edit these rather than the components
e2e/
  home.spec.js, about.spec.js, experience.spec.js, projects.spec.js, qa-lab.spec.js
```

Subpages (About, Experience, Projects, QA Lab) share `PageScene`,
`PageTitle`, and `BackLink` for the common background/clouds/rope/Home-button
frame — only their own content differs. The landing page (`Home`) is
a standalone scene built directly from GSAP, since its scroll-driven
mechanics don't fit that shared shell.
