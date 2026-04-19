---
date: 2026-04-19
topic: agent-tunnel-hero-viewer-refresh
---

# Agent Tunnel Hero Viewer Refresh

## Problem Frame

The current hero screenshot treatment does not preserve enough meaningful product detail once the images are reduced into a multi-image composition. The refreshed hero should keep the screenshots readable, remove the distracting phone notification row at the top of each image, and present the three states as one coherent story instead of three small proof cards.

## Requirements

**Image Treatment**
- R1. Replace the current hero screenshots with the three images in `tmp/`: `session-list.jpg`, `session-detail.jpg`, and `session-keyboard.jpg`.
- R2. Preserve each screenshot as a real product image without adding a fake device shell, visible outer frame, or alternate cropping treatment beyond removing the top notification row.
- R3. Remove only the top notification/status row from each screenshot. The remaining screenshot content shall stay intact.
- R4. Keep each screenshot fully visible within the hero viewer after that top-row crop. Do not crop the bottom or intermediate content to force a shorter composition.

**Narrative and Interaction**
- R5. Present the three screenshots through a single-image hero viewer rather than showing multiple screenshots side by side in the final hero.
- R6. The viewer sequence shall be fixed as `list -> detail -> keyboard`.
- R7. The viewer shall use a light left/right 3D page-flip style transition between screenshots.
- R8. Screenshot changes shall be manual only. Do not auto-rotate or auto-advance the viewer.
- R9. The viewer controls shall live on the screenshot itself: clicking or tapping the left side moves backward and the right side moves forward. Do not show a separate progress bar, page count, labels, captions, or thumbnail previews beneath the viewer.

**Responsive Layout**
- R10. On desktop and wide screens, keep the hero as a split layout with copy on the left and the single-image viewer on the right.
- R11. On tablet and phone layouts, stack the hero with copy first and the single-image viewer below it.
- R12. Across desktop, tablet, and phone, keep one consistent viewer language: one image visible at a time, the same transition style, and the same control pattern.
- R13. On desktop, size the viewer to a medium visual weight relative to the copy: large enough to read real product detail, but not so tall that it dominates the full hero height.

**Visual Tone**
- R14. Keep the hero viewer visually minimal. The screenshot itself should carry the proof; supporting depth may come from subtle shadow and motion only.

## Success Criteria
- The hero reads as one focused product story instead of three small screenshots competing for attention.
- The screenshots remain readable enough that important UI detail is still visible after hero scaling.
- The top notification row no longer appears in the hero screenshots.
- The viewer behavior and placement feel consistent across desktop, tablet, and phone.

## Scope Boundaries
- This refresh only changes the hero screenshot treatment and its related responsive behavior.
- Rewriting hero copy, changing the rest of the page layout, or introducing additional proof sections is out of scope.
- Designing a heavy cinematic page curl effect is out of scope; the motion should stay restrained.

## Key Decisions
- **Single-image viewer over multi-image collage**: the screenshots contain enough dense product detail that preserving readability matters more than showing all three at once.
- **Keep the full screenshot body after top-row crop**: the user prefers preserving the real product content over creating a shorter hero through extra cropping.
- **Manual navigation only**: auto-rotation would compete with headline reading and make the hero feel more like a carousel than product proof.
- **No visible frame around the screenshot**: the image should feel like direct product proof, not a decorative card inside the hero.

## Dependencies / Assumptions
- The three screenshots in `tmp/` remain the source assets for the refresh.
- The current prototype direction in `tmp/hero-flip-preview.html` is a discussion aid, not a final implementation spec.

## Outstanding Questions

### Deferred to Planning
- [Affects R3][Needs research] Confirm the exact top-row crop amount per screenshot so the notification row disappears cleanly without shaving meaningful app chrome.
- [Affects R7][Technical] Tune the page-flip transition so it feels responsive on both desktop and touch devices without adding visual heaviness.
- [Affects R13][Technical] Determine the final viewer width and responsive breakpoints that preserve screenshot readability while keeping the hero height controlled.

## Next Steps
→ /prompts:ce-plan for structured implementation planning
