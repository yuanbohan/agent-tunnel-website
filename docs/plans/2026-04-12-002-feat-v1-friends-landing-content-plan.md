---
title: "feat: V1 Friends-Only Landing — Real Install, No Placeholders"
type: feat
status: completed
date: 2026-04-12
origin: docs/brainstorms/2026-04-12-agent-tunnel-v1-friends-landing-requirements.md
---

# feat: V1 Friends-Only Landing — Real Install, No Placeholders

## Overview

Ship the first real version of the landing page by replacing every placeholder with the reality Yuan Bo can deliver today: the real `tunnel` install command, no video, no public APK link, and a compact "ask for the APK" contact card. The change is content- and markup-scoped — no new dependencies, no build tooling changes — and preserves the existing dark-grid geek aesthetic.

## Problem Frame

The current page (see origin: `docs/brainstorms/2026-04-12-agent-tunnel-v1-friends-landing-requirements.md`) promises a video, an Android download, and an iOS build that do not exist, and it carries a deliberately fake install command marked "URL pending". Sharing it with friends as-is sends mixed signals about what is real. The site needs to stop pretending and give a friend exactly two things: a working install command for the `tunnel` CLI and a clear way to ask for the Android APK.

## Requirements Trace

- R1. Replace the install command with the real one from `tunnel/README.md`.
- R2. Remove the "URL pending" status chip and the "replace placeholder URL later" note.
- R3. Add a verify-install caption under the command (`tunnel --version`, writes to `~/.local/bin/tunnel`).
- R4. Remove the entire proof section (video placeholder + duplicate screenshot cards). Screenshots survive via the hero device frames.
- R5. Remove the Android APK and iOS CTA buttons from the install strip.
- R6. Add a compact "Get the Android app" contact card (mailto + GitHub) after the how-it-works section.
- R7. Keep the existing geek aesthetic. No brand-site tropes.
- R8. Keep the `Private preview` pill in the hero.
- R9. Update the footer note to match current reality; drop placeholder-swap language.
- R10. Scrub remaining placeholder language in `src/site-content.js` and update `README.md` to match.

## Scope Boundaries

- No walkthrough video or "video coming soon" framing.
- No iOS surface.
- No signup form, analytics, invite-code gate, or newsletter.
- No tunnel↔relay compatibility matrix or supported-targets list on the site (defer to `tunnel/README.md`).
- No build tooling, Vite config, or Playwright harness changes beyond what content edits require.
- No refactor of `src/main.js` render structure beyond removing/adding the affected sections. The hand-written template-literal render approach stays.

## Context & Research

### Relevant Code and Patterns

- `src/site-content.js` — single source of truth for all page copy; every content edit lands here.
- `src/main.js:35-55` — `screenshotMarkup` (hero device frames) and `proofShotMarkup` (proof section cards) both iterate `siteContent.proof.screenshots`. Hero device frames must keep working after proof removal.
- `src/main.js:127-153` — `<section class="section section--light" id="proof">` block to be deleted wholesale.
- `src/main.js:121-124` — `hero__actions` block inside `install-strip` renders the Android/iOS CTAs from `siteContent.install.actions`; remove this block.
- `src/main.js:116-119` — `install-strip__meta` renders the "URL pending" chip and placeholder note; remove this block.
- `src/styles.css:407-478` — `.proof-grid`, `.video-placeholder`, `.shot-card` rules become dead after R4. Delete them.
- `src/styles.css:324-371` — `.hero__actions` and `.cta` rules become dead after R5 (hero itself does not use `.hero__actions`; only the install strip did). Delete them.
- `src/styles.css:291-302` — `.status-chip` rule becomes dead after R2. Delete it.
- `src/styles.css:546-562, 596-600` — media-query rules that reference `.proof-grid`, `.hero__visuals`, `.video-placeholder` need trimming to match remaining selectors.
- `tests/landing-page.spec.ts:17-22, 43` — assertions on the disabled Android/iOS CTAs and `video-placeholder` must be rewritten; new assertions should cover the verify caption and contact card.
- `README.md:26-40` — "Placeholder content" and "First-party screenshots" sections need updating to reflect the new reality.

### Institutional Learnings

None found under `docs/solutions/` (directory does not exist). No prior institutional guidance applies.

### External References

Not used. The tunnel README content needed was already gathered during brainstorming.

## Key Technical Decisions

- **Single-source content edits in `src/site-content.js`, structural edits in `src/main.js`.** The existing split already supports this cleanly; we do not need to move to a framework or component library.
- **Delete the proof section wholesale rather than gate it behind a flag.** When the video arrives, a fresh layout decision is cheaper than maintaining a transitional placeholder. Keep the screenshot assets in `public/images/` — they remain in use via the hero device frames.
- **Contact card as a new section between how-it-works and the footer, not an expanded footer.** Matches the existing section rhythm (`section section--dark` → `section section--light`) and keeps the footer tight. Reuses the existing `.section` / `.container` / `.section__intro` patterns with a small local card rule added.
- **Keep `siteContent.install.actions` out of the data model entirely.** Removing the array is cleaner than leaving an empty one and conveys that the page has no downloads to offer.
- **Keep `siteContent.proof.screenshots` but move it up under a `hero.screenshots` key.** Screenshots are still used by the hero device frames; relocating makes the data model honestly reflect what they're for and lets us delete the rest of `siteContent.proof`. Update `main.js` to read from `siteContent.hero.screenshots`.
- **Verify caption is rendered from a new `siteContent.install.verify` object**, not hard-coded in markup. Stays consistent with the existing content model and makes the future README-change update one-file.
- **No new dependencies.** `mailto:` and an `https://` anchor cover the contact card.

## Open Questions

### Resolved During Planning

- Where does the contact card sit? → New `section section--light` between `how-it-works` and `footer`, reusing existing section scaffolding.
- What happens to screenshot data after proof removal? → Moves to `siteContent.hero.screenshots`; hero device frames keep rendering it.
- What replaces the Playwright assertions that depended on deleted elements? → Replace with assertions on the verify caption and contact card; drop CTA-button assertions entirely.

### Deferred to Implementation

- Exact microcopy for the contact card headline and body. The implementer can pick one short line; the requirements only mandate the two links.
- Whether to keep or drop the `previewLabel` eyebrow duplication (the hero shows "Private preview" both as a pill in the topbar and as an eyebrow above H1). Out of scope for this plan; evaluate during implementation only if the eyebrow now reads awkwardly.

## Implementation Units

- [ ] **Unit 1: Rewrite `src/site-content.js` to the v1 data model**

**Goal:** Make the content module reflect the real install command, drop placeholder fields, and relocate screenshots to `hero`.

**Requirements:** R1, R2, R3, R5, R6, R9, R10

**Dependencies:** None.

**Files:**
- Modify: `src/site-content.js`

**Approach:**
- Replace `install.command` with `curl -fsSL https://raw.githubusercontent.com/yuanbohan/tunnel/main/install.sh | sh`.
- Remove `install.status`, `install.note`, and the entire `install.actions` array.
- Add `install.verify` with a short caption string covering `tunnel --version` and the `~/.local/bin/tunnel` install path.
- Move the existing `proof.screenshots` array to `hero.screenshots`. Delete the rest of `proof`.
- Add a new top-level `contact` object with `eyebrow`, `title`, short body, and two `links` entries (`mailto:yuanbo.han@gmail.com` and `https://github.com/yuanbohan`).
- Shorten `footer.note` to a one-liner that reflects early-stage status without mentioning placeholders to swap.
- Keep `brand`, `previewLabel`, `hero.title/body/kicker`, and all `flow` content unchanged.

**Patterns to follow:**
- Keep the existing object-literal style and key naming conventions.

**Test scenarios:**
- Test expectation: none — pure data module; behavior is exercised through the rendering and Playwright tests in Units 2 and 4.

**Verification:**
- `src/site-content.js` exports no references to video, Android APK, iOS, or "URL pending".
- `hero.screenshots` contains both existing PNG entries with their original `src`, `alt`, and captions.

- [ ] **Unit 2: Rewrite `src/main.js` markup to match the v1 data model**

**Goal:** Remove the proof section, the install-strip meta + actions blocks, and add a verify caption + contact section.

**Requirements:** R2, R3, R4, R5, R6, R8

**Dependencies:** Unit 1.

**Files:**
- Modify: `src/main.js`

**Approach:**
- Point `screenshotMarkup` at `siteContent.hero.screenshots`. Delete `proofShotMarkup`.
- Delete the `<section class="section section--light" id="proof">` block in full.
- Inside `install-strip__inner`: delete the `install-strip__meta` div and the `hero__actions` div. Keep `install-strip__intro` and `install-command`.
- Under the install command, render a new `<p class="install-verify">` element from `siteContent.install.verify`. Apply simple markup only; any light emphasis on `tunnel --version` and the path can use plain `<code>` elements populated in `site-content.js` or produced in `main.js` via escape-safe string assembly (no raw HTML injection from content).
- Add a new `<section class="section section--light" id="contact">` between `#how-it-works` and the `<footer>`, built from `siteContent.contact`. Render the two links as a small inline action cluster with `mailto:` and `https://github.com/yuanbohan` anchors. Give the section a `data-testid="contact-card"` attribute.
- Delete the `actionTag` helper (no longer used) and the `copy-button--active` class toggle stays exactly as-is.
- Keep `escapeHtml`, the `copyButton` wiring, and the flow rendering unchanged.

**Patterns to follow:**
- Continue using template literals + `escapeHtml` for every dynamic string.
- Match the `section section--light` / `section__intro` / `container section__grid` scaffolding used by the existing `how-it-works` section.

**Test scenarios:**
- Test expectation: none directly — covered via the Playwright test rewrite in Unit 4.

**Verification:**
- Page renders with: hero + install strip (command + verify caption) + how-it-works + contact card + footer. No proof section. No Android/iOS buttons. No "URL pending" chip.
- Hero still shows the two screenshot device frames.
- `npm run dev` serves the page without console errors.

- [ ] **Unit 3: Trim `src/styles.css` to match the new markup and add minimal contact-card styling**

**Goal:** Remove dead rules, adjust responsive rules that reference deleted selectors, and add a small `.install-verify` and contact-card style that stay within the existing visual language.

**Requirements:** R3, R6, R7

**Dependencies:** Unit 2.

**Files:**
- Modify: `src/styles.css`

**Approach:**
- Delete rules: `.proof-grid`, `.proof-grid__shots`, `.video-placeholder` (and descendants), `.shot-card` (only if unused after proof removal — confirm during implementation), `.status-chip`, `.hero__actions`, `.cta` (and `.cta--*` variants).
- Trim the `@media (max-width: 1080px)` selector list to remove `.proof-grid` and keep remaining targets (`.hero__stage`, `.install-strip__inner`, `.step-list`). Leave `.hero__visuals { display: none }` in that breakpoint as-is so device frames continue to collapse on narrow viewports.
- Remove the `.video-placeholder` rule from the `@media (max-width: 760px)` block and drop `.hero__actions` references there if present.
- Add a small `.install-verify` rule: IBM Plex Mono, muted color, placed directly under the install command inside the dark install strip. Keep it visually secondary to the command itself.
- Add a small contact-card rule set scoped to the new section: a single `.contact-actions` row with two restrained anchor buttons styled with the existing border + radius vocabulary (`var(--line-light)`, `var(--radius)`). No new accent color, no new shadow token.
- Do not introduce new CSS variables.

**Patterns to follow:**
- Mirror the restraint of existing section styles — sparse borders, monospace accents, no gradients.
- Reuse `var(--radius)`, `var(--line-light)`, `var(--text-muted-light)`, `var(--accent-strong)`.

**Test scenarios:**
- Test expectation: none directly — visual/responsive behavior is exercised by the Playwright overflow test in Unit 4.

**Verification:**
- No selector references removed markup (`grep` for `.proof-grid`, `.video-placeholder`, `.status-chip`, `.hero__actions`, `.cta` and confirm zero matches outside this check itself).
- Mobile viewport still has no horizontal overflow.
- Contact card sits visually consistent with surrounding sections.

- [ ] **Unit 4: Rewrite `tests/landing-page.spec.ts` for the v1 surface**

**Goal:** Update Playwright assertions so they match what the page actually renders now and cover the new verify caption and contact card.

**Requirements:** R1, R3, R4, R5, R6

**Dependencies:** Unit 2.

**Files:**
- Modify: `tests/landing-page.spec.ts`

**Approach:**
- Keep the H1 assertion and the `install-command` testid check.
- Keep the copy-button enabled assertion.
- Replace the Android/iOS disabled-button assertions with assertions that those buttons do **not** exist (e.g., `expect(page.getByRole("button", { name: /android/i })).toHaveCount(0)`).
- Replace `getByTestId("video-placeholder")` assertions with `expect(page.getByTestId("video-placeholder")).toHaveCount(0)`.
- Add an assertion that the install command text equals the real install command from `site-content.js` (via visible text).
- Add an assertion that the verify caption (`install-verify` element, either by role/text or a new `data-testid="install-verify"`) is visible and references `tunnel --version`.
- Add an assertion that `data-testid="contact-card"` is visible and contains both a `mailto:yuanbo.han@gmail.com` link and an `href="https://github.com/yuanbohan"` link.
- Keep the mobile viewport overflow test; remove the `video-placeholder` check and add the contact card visibility check inside the same test.

**Patterns to follow:**
- Match the existing test style: two tests (desktop reduced surface, mobile no-overflow), Playwright `expect` idioms, `getByTestId`/`getByRole`.

**Test scenarios:**
- Happy path: desktop landing renders H1, install command, copy button enabled, verify caption, contact card with both links.
- Happy path: mobile landing has no horizontal overflow and shows install command + contact card.
- Negative: Android, iOS, and video-placeholder surfaces are absent (count === 0).
- Negative: no status-chip with "URL pending" text is present (assert `getByText(/URL pending/i)` count === 0).

**Verification:**
- `npm test` passes locally against `npm run build && npm run preview`.
- Assertions do not depend on any string still present in the deleted placeholder copy.

- [ ] **Unit 5: Update `README.md` to match the v1 reality**

**Goal:** Stop calling install URL, Android APK, and video "placeholders" since the install command is real and the other two are explicit scope boundaries now.

**Requirements:** R10

**Dependencies:** Unit 1.

**Files:**
- Modify: `README.md`

**Approach:**
- Replace the "Placeholder content" section with a short "Content model" section that describes `src/site-content.js` as the single source of truth.
- Note that Android APK distribution is invite-only via the contact card and that a walkthrough video section will be re-introduced when a video exists.
- Keep Local development, Build, and Browser smoke tests sections as-is.
- Keep the "First-party screenshots" section, updating its one-liner to reflect that the screenshots now live in the hero device frames.

**Patterns to follow:**
- Match existing README tone and section structure.

**Test scenarios:**
- Test expectation: none — documentation-only change.

**Verification:**
- README no longer promises an APK link, iOS build, or forthcoming video placeholder swap.

## System-Wide Impact

- **Interaction graph:** The only runtime entry point is `src/main.js` and the clipboard handler attached to the copy button. No other interactions change.
- **API surface parity:** N/A — no external API surface.
- **Unchanged invariants:** Hero heading, `Private preview` pill, copy-install-to-clipboard behavior, 4-step how-it-works, existing typography and accent palette, Vite build/test pipeline.

## Risks & Dependencies

| Risk | Mitigation |
|------|------------|
| Dead CSS selectors left behind after markup deletion | Explicit grep-based verification step in Unit 3. |
| Breaking `screenshotMarkup` when relocating screenshots from `proof` to `hero` | Playwright assertion on H1 + first-paint render in Unit 4 catches missing element errors; also covered by local `npm run dev` smoke check. |
| Publishing a mailto to `yuanbo.han@gmail.com` on a public site invites spam | Accepted risk (see origin decision). No obfuscation requested. |
| Contact card styling drifts from geek aesthetic into brand-site territory | Unit 3 constrains styling to existing CSS variables and restrained borders; reviewer should flag any new accent color or shadow. |

## Documentation / Operational Notes

- README update lives in Unit 5. No other docs or runbooks apply.
- No deployment, rollout, or monitoring changes — this is a static site.

## Sources & References

- **Origin document:** `docs/brainstorms/2026-04-12-agent-tunnel-v1-friends-landing-requirements.md`
- Related code: `src/site-content.js`, `src/main.js`, `src/styles.css`, `tests/landing-page.spec.ts`
- Upstream install command source: `https://github.com/yuanbohan/tunnel/blob/main/README.md`
