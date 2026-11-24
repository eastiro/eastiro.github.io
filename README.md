# eastiro.github.io

Source for my personal homepage, served by **GitHub Pages** at
<https://eastiro.github.io>.

This repository is named `eastiro.github.io` on purpose. GitHub Pages treats a
repository whose name matches `<username>.github.io` as a *user site*, and
publishes it at the bare apex URL above. Any other repository name would be
published as a sub-path (`eastiro.github.io/<repo>/`) instead, which reads as a
project rather than as a homepage.

---

## What the site is

A single-page portfolio presenting four core research systems and two lightweight side projects:

| Project | Category | Topic |
|---|---|---|
| [vct-first-blood-analytics](https://github.com/eastiro/vct-first-blood-analytics) | Esports analytics | VCT 2026 first-blood analysis across 32,786 rounds with a live static site |
| [cs-tactical-lens](https://github.com/eastiro/cs-tactical-lens) | Esports analytics | Cross-team pre-contact positioning analysis of 135 verified CS2 match demos |
| [airports-under-stress](https://github.com/eastiro/airports-under-stress) | Systems &amp; strategy | How U.S. flight delays propagate and recover along 549,388 aircraft rotations |
| [f1-strategy-lab](https://github.com/eastiro/f1-strategy-lab) | Systems &amp; strategy | Five-season wet-to-slick pit-call audit on public OpenF1 / FastF1 data |
| [STEAM-INFOR-](https://github.com/eastiro/STEAM-INFOR-) | Side experiment | Steam Cyber Verdict generator built with Streamlit and the Steam Web API |

## Structure

```
index.html              the whole page (Bento layout + bespoke inline SVGs)
assets/css/style.css    all styling (dark + light themes, responsive Bento grid)
assets/js/main.js       theme toggle, category filter, spotlight hover, scroll reveal
assets/favicon.svg      tab icon
.nojekyll               tells Pages to skip Jekyll processing
```

## Two engineering decisions worth stating

**No dependencies, no build step.** No framework, no bundler, no CDN, no web
font. The page is hand-written HTML, CSS, and ~6.8 KB of vanilla JavaScript,
totalling 55,801 bytes (~54.5 KB) across four files. Nothing is fetched from a
third party. This was a deliberate choice: it means the page has no supply chain,
no build to break, and — relevant to the coursework that produced it — every byte
observed in a packet capture belongs to this site.

**The Apple-style look is built inside that constraint.** The design borrows
Apple's product-page grammar — one enormous headline, generous white space,
hairline rules instead of drop shadows, a translucent 48 px navigation bar, and a
tile grid on a 12 px gutter — and Apple's colour values (`#f5f5f7`, `#1d1d1f`,
`#0071e3`). It borrows no web font: the type resolves to the platform UI font,
which is what Apple's own pages do. A font CDN would have broken the
"no external request" property the coursework measure depends on.

**The theme toggle is a CSS custom-property swap, not a second stylesheet.** The
light palette lives in `:root` and is overridden under `[data-theme="dark"]`, so
switching themes changes one attribute on `<html>`. A tiny inline script sets
that attribute *before* first paint, so a visitor whose system prefers dark mode
never sees a light flash.

## Accessibility

Skip link, landmark elements, labelled controls, `:focus-visible` outlines,
`aria-pressed` on the theme toggle, and full `prefers-reduced-motion` support.
The content is readable with JavaScript disabled — the scroll animation is only
*added* when the script runs, so the failure mode is "no animation", never
"no page".

## Running locally

Open `index.html` in a browser. There is no build step and no server required;
the page also works when served over HTTP exactly as it does on Pages.
