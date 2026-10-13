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

A single-page portfolio for three research projects:

| Project | Topic |
|---|---|
| [cs-tactical-lens](https://github.com/eastiro/cs-tactical-lens) | Cross-team pre-contact positioning analysis of professional CS2 match demos |
| [airports-under-stress](https://github.com/eastiro/airports-under-stress) | How U.S. flight delays propagate and recover along aircraft rotations |
| [f1-strategy-lab](https://github.com/eastiro/f1-strategy-lab) | Wet-to-slick pit-call research on public OpenF1 / FastF1 data |

## Structure

```
index.html              the whole page
assets/css/style.css    all styling (dark + light themes)
assets/js/main.js       theme toggle, scroll reveal, nav highlight
assets/favicon.svg      tab icon
.nojekyll               tells Pages to skip Jekyll processing
```

## Two engineering decisions worth stating

**No dependencies, no build step.** No framework, no bundler, no CDN, no web
font. The page is hand-written HTML and CSS plus ~3 KB of vanilla JavaScript,
and it totals under 30 KB across four files. Nothing is fetched from a third
party. This was a deliberate choice: it means the page has no supply chain, no
build to break, and — relevant to the coursework that produced it — every byte
observed in a packet capture belongs to this site.

**The theme toggle is a CSS custom-property swap, not a second stylesheet.** The
palette lives in `:root` and is overridden under `[data-theme="light"]`, so
switching themes changes one attribute on `<html>`. A tiny inline script sets
that attribute *before* first paint, so a visitor whose system prefers light mode
never sees a dark flash.

## Accessibility

Skip link, landmark elements, labelled controls, `:focus-visible` outlines,
`aria-pressed` on the theme toggle, and full `prefers-reduced-motion` support.
The content is readable with JavaScript disabled — the scroll animation is only
*added* when the script runs, so the failure mode is "no animation", never
"no page".

## Running locally

Open `index.html` in a browser. There is no build step and no server required;
the page also works when served over HTTP exactly as it does on Pages.
