---
artifact_contract: ce-implementation-plan/v1
source: docs/plans/2026-10-18-2350-product-nerv-command-site-plan.md
date: 2026-10-18
execution: code
---

# Implementation plan: NERV command-site rebuild

## Goal

Deliver a standalone portfolio experience in `inspo/` without changing the existing Next.js site. The new entry point will be `inspo/index.html` and will load only local sibling images plus inline CSS/JavaScript.

## Constraints carried from the product contract

- Preserve the four existing Directory records and their current URLs.
- Preserve GitHub, Discord, and LinkedIn destinations.
- Keep the existing display (`Times New Roman` with a compressed treatment) and mono font stacks.
- Show a warning hexagon gate before the main content, with automatic reveal, a bypass control, keyboard support, and reduced-motion accommodation.
- Use design motifs from the supplied NGE reference files without reproducing a franchise logo.

## Implementation units

### U1. Build the document shell and warning gate

Create `inspo/index.html` with semantic header, navigation, main, sections, and footer. Add an initially visible loading overlay containing generated hexagons, alert labels, a progress line, and a clearly labeled bypass button. Script the automatic reveal and `Escape`/button bypass, move focus to the main content after the gate closes, and reduce the delay to zero for reduced-motion preferences.

### U2. Establish the visual system and command graphics

Embed CSS variables for black, off-white, red, orange, and mint. Construct reusable panel, segmented meter, stripe, grid, waveform, and radar treatment with CSS and inline SVG. Use responsive grids that collapse into one column and retain keyboard-visible focus styles.

### U3. Rebuild retained content as high-priority operations data

Add a clearly marked Directory section with the four retained repository cards, their existing descriptions, and each external destination. Add External Signals with named GitHub, Discord, and LinkedIn cards using the existing destinations. Include external-link context in accessible labels.

### U4. Add the reference archive and operating interactions

Use selected local `nge*.jpg`, `.webp`, and `.gif` assets in a captioned image archive below core actions. Lazy-load imagery. Add navigation scroll behavior, a live local-time field, and a compact mobile navigation state without external dependencies.

### U5. Verify standalone operation and project safety

Run static checks for required links/content, inspect the page in a browser at wide and narrow sizes, confirm the gate opens and can be bypassed, run the repository build/lint to ensure the existing app remains healthy, and inspect the final diff to ensure production changes are confined to `inspo/`.

## Verification contract

1. `node` can parse any inline script extracted from the page.
2. A static assertion checks the retained links, Directory/External Signals labels, bypass label, reduced-motion rule, and all referenced local assets.
3. Browser inspection confirms initial gate state, automatic/bypass reveal, keyboard focus, responsive reflow, and working outbound links.
4. `npm run build` and `npm run lint` pass for the original Next.js project.

## Definition of done

The new static site is complete under `inspo/`, the current app source remains untouched, the required information and links are preserved, and verification evidence is recorded in the delivery summary.
