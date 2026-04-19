---
title: "feat: Refresh hero screenshot viewer"
type: feat
status: completed
date: 2026-04-19
origin: docs/brainstorms/2026-04-19-agent-tunnel-hero-viewer-refresh-requirements.md
---

# feat: Refresh hero screenshot viewer

## Overview

Replace the current hero visual stack with a single-image screenshot viewer that tells the `list -> detail -> keyboard` story without shrinking the screenshots into unreadable cards. The implementation stays inside the existing Vite + hand-written template setup: refresh the hero assets, simplify the hero markup, add a restrained flip transition, and update responsive behavior and tests to match.

## Problem Frame

The current hero uses a terminal card plus two small screenshot frames. That composition no longer matches the product proof the page needs to show (see origin: `docs/brainstorms/2026-04-19-agent-tunnel-hero-viewer-refresh-requirements.md`). The user wants the hero to preserve real screenshot detail, crop only the top notification row, keep the screenshot body intact, and let people page through the three states directly on the image instead of via a separate control strip.

## Requirements Trace

- R1. Replace the hero screenshots with the three refreshed source images from `tmp/`.
- R2. Preserve the screenshots as real product images, without adding a fake device shell or visible viewer frame.
- R3. Remove only the top notification row from each screenshot.
- R4. Keep the remaining screenshot body fully visible after the top crop.
- R5. Use a single-image viewer in the hero instead of a multi-image composition.
- R6. Keep the screenshot order fixed as `list -> detail -> keyboard`.
- R7. Use a light left/right 3D page-flip transition.
- R8. Keep navigation manual only.
- R9. Put next/previous interaction on the screenshot itself rather than a separate control strip.
- R10. Keep desktop as copy-left / viewer-right.
- R11. Stack copy above viewer on tablet and phone.
- R12. Keep one consistent viewer language across breakpoints.
- R13. Keep desktop viewer size at medium visual weight.
- R14. Keep the hero visually minimal; the screenshot itself remains the proof.

## Scope Boundaries

- No rewrite of the rest of the page structure outside the hero.
- No new dependencies, slider libraries, or framework migration.
- No heavy cinematic curl animation or autoplay carousel behavior.
- No additional captions, thumbnail rails, or pagination UI under the hero viewer.

## Context & Research

### Relevant Code and Patterns

- `src/site-content.js` is the single source of truth for hero copy and screenshot metadata; update hero text and screenshot entries there first.
- `src/main.js` currently renders the hero via template strings, including `heroTerminalMarkup`, `heroScreenshotMarkup`, and the `.hero__visual` block. The viewer should follow the same plain-JS render style rather than introducing component abstractions.
- `src/styles.css` already centralizes hero layout and breakpoint behavior. Existing responsive switches happen at `980px`, `720px`, and `480px`, so the viewer should extend those breakpoints instead of inventing a parallel responsive system.
- `tests/landing-page.spec.ts` already covers the H1, hero visibility, setup flow, contact card, and mobile overflow. This is the right place to prove the new hero viewer behavior.
- `public/images/agent-tunnel-session-list.png` and `public/images/agent-tunnel-session-detail.png` are already `1080x2256`, while the new source images in `tmp/` are `1080x2376`. That shows an existing project pattern: preserve full width and remove roughly `120px` from the top. The new keyboard asset should follow that same export convention.
- `tmp/hero-flip-preview.html` captures the agreed interaction direction and sizing posture, but it is a discussion artifact rather than a production file.

### Institutional Learnings

- None found. `docs/solutions/` does not exist in this repo.

### External References

- None used. The repo already has strong local patterns for this static landing page, and this work does not touch a high-risk domain.

## Key Technical Decisions

- **Pre-crop the final hero assets in `public/images/` rather than cropping at runtime.** This matches the existing image pipeline, preserves full screenshot width, simplifies CSS, and avoids breakpoint-specific crop math.
- **Replace the whole right-side hero visual stack, not just the screenshot grid.** Keeping the terminal card above a single viewer would reintroduce the height problem the user rejected.
- **Model the viewer as a tiny state machine in `src/main.js`.** One active index, one transition lock, and directional enter/leave classes are enough; a carousel library would be unnecessary weight.
- **Use real `<button>` hotzones layered on the screenshot.** This satisfies the “click the left/right side of the image” interaction while preserving keyboard accessibility and focus behavior.
- **Keep hero copy/actions and the rest of the page intact.** Only the screenshot treatment changes; the existing `Setup` and `Access` sections stay as-is.

## Open Questions

### Resolved During Planning

- **How should the top notification row be removed?** Follow the existing asset convention already present in `public/images/`: keep full `1080px` width and export hero-ready images at roughly `2256px` height after trimming about `120px` from the top.
- **Should the viewer keep a bottom progress rail?** No. Navigation lives on the screenshot itself through left/right hotzones.
- **Does this need external research or a library?** No. The current repo structure is sufficient, and the interaction is small enough to implement directly.

### Deferred to Implementation

- **Exact animation timing and easing for the flip.** The motion should be tuned against the real page so it feels responsive without reading as theatrical.
- **Exact desktop width clamp and stacked breakpoint sizing.** The prototype established the direction, but final numbers should be tuned once the production hero markup and assets are in place.
- **Exact hover/focus affordance for the hotzone arrows.** The user wants the controls on-image, but the final visibility treatment can stay implementation-time so long as it remains restrained.

## High-Level Technical Design

> *This illustrates the intended approach and is directional guidance for review, not implementation specification. The implementing agent should treat it as context, not code to reproduce.*

```text
siteContent.hero
  -> titleLines = ["Run local agents.", "Check on phone."]
  -> screenshots = [list, detail, keyboard]  // final cropped assets in public/images/

main.js
  -> render hero copy as today
  -> render one hero viewer stage with initial screenshot = screenshots[0]
  -> attach in-image previous/next hotzone buttons
  -> on click:
       if transition lock is active, ignore
       compute next index from current index + direction
       mount incoming slide with directional class
       mark outgoing slide as leaving
       on animation end, remove old slide, unlock, keep one active slide

styles.css
  -> desktop: hero copy left, viewer right
  -> <= 980px: stack copy above viewer
  -> viewer uses only screenshot radius/shadow + hotzone overlay
  -> reduced-motion path drops transform-heavy animation
```

## Implementation Units

- [x] **Unit 1: Refresh hero assets and hero content data**

**Goal:** Replace the current two-image hero asset set with the three agreed screenshots and update the hero headline/content metadata to match the new direction.

**Requirements:** R1, R3, R4, R6

**Dependencies:** None.

**Files:**
- Modify: `public/images/agent-tunnel-session-list.png`
- Modify: `public/images/agent-tunnel-session-detail.png`
- Create: `public/images/agent-tunnel-session-keyboard.png`
- Modify: `src/site-content.js`
- Test: `tests/landing-page.spec.ts`

**Approach:**
- Re-export the `list` and `detail` hero assets from the new `tmp/` sources using the project’s existing full-width top-crop convention.
- Create the matching `keyboard` asset in `public/images/` using the same width and crop rules so all three slides share one display ratio.
- Update `siteContent.hero.titleLines` to `Run local agents.` and `Check on phone.`.
- Replace the existing two-entry `hero.screenshots` array with three entries ordered as `list`, `detail`, `keyboard`, each pointing at the final `public/images/` asset and carrying alt text that describes the visible state.
- Remove dead hero screenshot metadata fields only if they are no longer used by the new viewer; do not restructure unrelated sections.

**Patterns to follow:**
- Keep `src/site-content.js` as the only content source for hero text and screenshot paths.
- Follow the existing `public/images/agent-tunnel-session-*.png` naming pattern.

**Test scenarios:**
- Happy path: the initial hero screenshot metadata points at the refreshed `list` image and the other two entries remain in the fixed `detail`, `keyboard` order.
- Edge case: all three hero assets share the same final aspect ratio so the viewer does not resize during pagination.
- Integration: the updated heading text is the exact string the Playwright test will assert in the rendered page.

**Verification:**
- `src/site-content.js` references exactly three hero screenshots in the agreed order.
- The final hero-ready assets in `public/images/` preserve full width and no longer show the phone notification row.

- [x] **Unit 2: Replace the hero visual markup with a single-image viewer**

**Goal:** Turn the current hero visual stack into one screenshot viewer with in-image previous/next hotzones and a small transition state machine.

**Requirements:** R2, R5, R6, R7, R8, R9, R10

**Dependencies:** Unit 1.

**Files:**
- Modify: `src/main.js`
- Test: `tests/landing-page.spec.ts`

**Approach:**
- Remove the hero terminal-card rendering and the two-screenshot grid rendering from the hero.
- Keep the left-side hero copy and CTA links intact.
- Render one hero viewer stage on the right side of the hero, seeded with the first screenshot.
- Implement a minimal viewer controller in `src/main.js` that:
  - tracks `activeIndex`
  - computes the next/previous index from the fixed screenshot array
  - ignores re-entry while an animation is in flight
  - swaps slides by applying directional enter/leave classes and cleaning up after `animationend`
- Layer two real `<button>` elements inside the screenshot stage so clicking/tapping the left side pages backward and the right side pages forward.
- Keep `data-testid="hero-visual"` on the viewer container or equivalent hero visual wrapper so existing smoke coverage can stay simple.

**Patterns to follow:**
- Mirror the existing `main.js` style: plain functions, template literals, and direct DOM event wiring.
- Reuse `escapeHtml` for all dynamic strings.

**Test scenarios:**
- Happy path: initial load shows the `list` screenshot as the only visible hero slide.
- Happy path: clicking the right hotzone advances from `list` to `detail`; clicking the left hotzone returns to `list`.
- Edge case: repeated rapid clicks during an active animation do not leave multiple visible slides in the DOM.
- Integration: the hero viewer coexists with the existing copy-button wiring; changing slides does not break the setup flow interactions below.

**Verification:**
- The hero renders a single screenshot stage instead of the old terminal-card + two-shot composition.
- Slide changes follow the fixed `list -> detail -> keyboard` order and reverse correctly.

- [x] **Unit 3: Rework hero viewer styling and responsive behavior**

**Goal:** Give the new viewer its final desktop and stacked layouts, with no visible outer frame, medium desktop scale, subtle radius/shadow, and restrained flip motion.

**Requirements:** R2, R7, R10, R11, R12, R13, R14

**Dependencies:** Unit 2.

**Files:**
- Modify: `src/styles.css`
- Test: `tests/landing-page.spec.ts`

**Approach:**
- Remove the old hero-specific visual rules that are no longer used: the terminal-card block, `.hero__phones`, `.phone-shot`, and any associated mobile overrides.
- Introduce a focused viewer rule set for:
  - desktop split layout with right-aligned medium-size viewer
  - stacked tablet/mobile layout with viewer below the copy
  - screenshot radius and shadow only, with no visible enclosing panel
  - in-image hotzone overlays and any minimal hover/focus affordance
  - directional enter/leave animation classes
- Preserve the current page-wide breakpoint rhythm (`980px`, `720px`, `480px`) unless implementation proves one threshold needs a small adjustment.
- Add a `prefers-reduced-motion` path that removes the transform-heavy flip effect while keeping manual navigation functional.

**Patterns to follow:**
- Extend the current CSS token system (`--line`, `--shadow`, `--radius-*`, accent colors) rather than inventing a new hero-only palette.
- Keep hero styling flat and grid-based, consistent with the rest of the page’s layout language.

**Test scenarios:**
- Happy path: on a desktop viewport, the hero still renders as a two-column composition with copy left and viewer right.
- Happy path: on a phone viewport, the viewer stacks below the copy and remains fully visible.
- Edge case: the mobile viewport has no horizontal overflow after the old multi-image grid rules are removed.
- Integration: slide transitions do not resize the hero because all viewer slides share one aspect ratio.

**Verification:**
- The hero viewer feels visually lighter than the old screenshot-card composition.
- Desktop height stays controlled while the screenshot remains readable.
- Mobile and tablet retain one-image-at-a-time behavior with no overflow.

- [x] **Unit 4: Refresh test coverage and supporting docs for the new hero**

**Goal:** Update the existing browser smoke test and README so they describe and verify the new hero viewer rather than the retired two-screenshot device-frame layout.

**Requirements:** R1, R5, R8, R9, R12

**Dependencies:** Units 1-3.

**Files:**
- Modify: `tests/landing-page.spec.ts`
- Modify: `README.md`

**Approach:**
- Update the H1 assertion to `Run local agents. Check on phone.`.
- Keep the existing hero-visual visibility smoke assertion, but add interaction coverage for the new viewer:
  - assert only one hero screenshot is visible on initial load
  - click/tap the right-side hotzone and assert the `detail` screenshot becomes active
  - optionally click/tap back to confirm reverse navigation
- Keep the mobile overflow test and ensure the viewer remains visible below the copy on a narrow viewport.
- Add negative coverage that the old screenshot labels/device-frame composition are gone if the DOM still exposes a convenient assertion target.
- Update the README screenshot note so it describes the hero as a single-image viewer using first-party screenshots from `public/images/`, rather than “device frames”.

**Patterns to follow:**
- Keep Playwright coverage in the existing two-test style unless one extra viewer interaction assertion makes a third test clearer.
- Keep README wording factual and brief.

**Test scenarios:**
- Happy path: desktop page renders the updated heading and hero viewer, and forward navigation reveals the second slide.
- Happy path: mobile page renders without horizontal overflow and still shows the viewer below the copy.
- Edge case: reverse navigation from the second slide returns to the first slide without duplicating hero screenshots.
- Integration: setup flow and contact card assertions continue to pass after the hero rewrite.

**Verification:**
- The Playwright suite covers both hero rendering and hero interaction, not just static visibility.
- The README no longer describes the retired device-frame layout.

## System-Wide Impact

- **Interaction graph:** The new viewer logic lives alongside the existing copy-button logic in `src/main.js`; both event systems must coexist without selector collisions or shared state.
- **Error propagation:** If viewer initialization misfires, the failure should stay isolated to hero interaction; setup-flow copy behavior and the rest of the page should remain untouched.
- **State lifecycle risks:** The main UI risk is transition re-entry, which can leave duplicate slides mounted or produce a broken active index. The implementation should lock during animation and clean up deterministically.
- **API surface parity:** No external API or data contract changes. The only public-facing contract change is the visible hero heading text.
- **Integration coverage:** Browser coverage should prove both desktop interaction and mobile overflow behavior because unit-level assertions alone will not catch layout regressions.
- **Unchanged invariants:** The topbar, hero CTA links, setup flow, access/contact section, footer, and build/test pipeline remain in place.

## Risks & Dependencies

- **Asset-prep risk:** If one screenshot is cropped to a different final height, the viewer will jump during pagination. Mitigation: standardize all three final assets before wiring the viewer.
- **Interaction discoverability risk:** Completely invisible hotzones may feel too hidden on desktop. Mitigation: keep a restrained hover/focus affordance without reintroducing a bottom control rail.
- **Motion risk:** A flip effect can look heavier in production than in isolation. Mitigation: keep the transform mild and provide a reduced-motion fallback.
- **Dependency:** Final hero assets must be exported into `public/images/` before the hero viewer can be wired cleanly.

## Documentation / Operational Notes

- `tmp/hero-flip-preview.html` should remain a local discussion artifact unless the implementer explicitly wants to keep it for future reference.
- No rollout checklist is needed; this is a static-site visual refresh with local build/test verification only.

## Sources & References

- Origin requirements: `docs/brainstorms/2026-04-19-agent-tunnel-hero-viewer-refresh-requirements.md`
- Existing implementation: `src/site-content.js`, `src/main.js`, `src/styles.css`, `tests/landing-page.spec.ts`
- Existing hero assets: `public/images/agent-tunnel-session-list.png`, `public/images/agent-tunnel-session-detail.png`
- New source assets: `tmp/session-list.jpg`, `tmp/session-detail.jpg`, `tmp/session-keyboard.jpg`
- Prototype reference: `tmp/hero-flip-preview.html`
