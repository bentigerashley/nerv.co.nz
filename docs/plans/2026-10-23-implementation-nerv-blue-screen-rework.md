---
artifact_contract: ce-implementation-plan/v1
source: docs/ideation/2026-10-23-nerv-blue-screen-rework.html
date: 2026-10-23
execution: code
---

# Implementation plan: blue NERV screen rework

## Goal

Replace the current `inspo/index.html` dashboard with a sparse, screen-led NGE interface. The page must open through an automatic `nge11.gif`-style warning gate, then show a landing screen, Directory screen, and the original-style External Signals screen over a cyan dotted interface field.

## Technical decisions

- Keep `inspo/index.html` as a standalone static document; do not edit the existing Next.js site.
- Translate NERV-UI patterns into local HTML/CSS: a TitleScreen-like gate, HexGridBackground, NavigationTabs, TargetingContainer framing, and SystemDialog-style directory cards. Do not install the package because its peer dependency range is incompatible with this project’s Framer Motion and Tailwind versions.
- Keep the original display face (`Times New Roman` compressed horizontally) and use glow/shadow treatment for title-card typography.
- Remove all loading-gate controls, skip links, keyboard bypasses, and pointer bypasses. The gate resolves automatically; reduced-motion mode shortens its duration.
- Preserve the Directory links/text exactly. Keep External Signals at the bottom with the original heading and GitHub, Discord, and LinkedIn icon links.

## Implementation units

### U1. Replace the boot surface

Create a full-screen loader that uses CSS hex tessellation, red/orange hazard color, a central warning mark, and timed phases. Set the page state only after the automatic sequence completes; retain no manual dismissal mechanism.

### U2. Build the three-screen composition

Use viewport-sized snap sections for a minimal landing/title card, a Directory section with the retained four records, and the bottom External Signals section. Add compact previous/next screen rails and semantic headings.

### U3. Create the background and geometric system

Layer cyan dot matrices, grain, orange circuit rails, striped masks, and clipped corner frames to echo `nge6.webp` and `nge7.webp`. Keep foreground content readable and responsive across narrow layouts.

### U4. Preserve outbound content and access

Reuse the original social icon assets and destinations on External Signals. Add semantic labels and strong focus styles. Honor reduced motion by suppressing decorative animation and shortening the loader.

### U5. Verify

Check the loader has no dismiss controls, the expected three screen landmarks and retained outbound links exist, the local image paths resolve, the script parses, and the original app’s lint/build remain healthy.

## Definition of done

The reworked standalone page visibly follows the requested warning and blue-dot direction, contains only the requested initial screen content, preserves the original Directory and External Signals content, and leaves the existing Next.js application unchanged.
