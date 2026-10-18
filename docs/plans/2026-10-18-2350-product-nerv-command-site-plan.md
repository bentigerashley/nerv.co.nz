---
artifact_contract: ce-unified-plan/v1
product_contract_source: ce-brainstorm
title: NERV command-site rebuild
date: 2026-10-18
---

# NERV command-site rebuild

## Goal capsule

Create a new, self-contained portfolio site in `inspo/` that uses the supplied NGE interface references as its visual source. It must open with an animated hexagonal warning gate, then reveal a responsive NERV-style command screen. The existing application remains untouched. The retained content is the project **DIRECTORY**, the **EXTERNAL SIGNALS** links, and the existing NGE-inspired display and mono font stacks.

Product authority: the user's supplied references and explicit scope. Open blockers: none.

## Product contract

### Outcome

Visitors arrive at an immediate, legible command-interface experience instead of a generic portfolio. After the short gate, they can scan the owner identity, project directory, system telemetry, visual reference deck, and external profiles without decoding decorative UI.

### Primary audience and jobs

- A hiring manager or collaborator needs to identify the developer and open a relevant project quickly.
- An NGE/design-minded visitor needs the interface language to feel intentional and recognisable without obscuring content.
- A keyboard, touch, or reduced-motion user needs to bypass the gate and reach the same links and information.

### Key decisions

- Build only inside `inspo/`; do not replace pages, components, styles, or configuration in the current Next application. `session-settled: user request`
- Use a portable static HTML/CSS/JavaScript implementation so the new version can be previewed directly from its folder. `session-settled: implementation boundary inferred from user scope`
- The first state is a timed hex-warning boot gate with an explicit **BYPASS GATE** control; it automatically opens the main screen after a brief interval. `session-settled: user request`
- The information hierarchy starts with identity/status and navigation, followed by DIRECTORY and EXTERNAL SIGNALS. Dense graphics support these actions rather than replacing them. `session-settled: user request + UX synthesis`
- Preserve the existing project records and GitHub, Discord, and LinkedIn destinations. `session-settled: user request`
- Preserve the existing display and mono font language through local/system font stacks instead of downloading a replacement font. `session-settled: user request`

### Experience requirements

1. Render a full-screen loading gate with multiple hazard hexagons, live status text, progress indication, and a usable bypass button.
2. Transition to the main surface without trapping focus; support reduced motion by removing the waiting animation and presenting the main page quickly.
3. Establish a readable header with the NERV identity, timestamp/state labels, and section navigation.
4. Present a hero/operations panel that uses meter bars, a waveform, a circular/radar-style graphic, and terse telemetry to convey the inspiration's data language.
5. Keep the four existing directory entries, descriptions, and repository links available as visibly labeled cards.
6. Keep GitHub, Discord, and LinkedIn as distinct external-signal actions.
7. Use supplied `inspo/nge*` material as a reference/deck section where it improves the command-screen atmosphere; do not let it compete with primary navigation or links.
8. Work from a small palette of near-black, alert red, safety orange, terminal mint, and warm off-white. Use color as a state signal with text labels so it is not the only cue.
9. Maintain keyboard focus states, semantic landmarks, external-link labels, responsive reflow, and restrained animation.

### Scope boundaries

In scope: one static microsite under `inspo/`, visual direction from local reference images, retained directory/social data, responsive and accessible interaction.

Out of scope: changes to the existing homepage, content management, a functional contact form, copied franchise marks/logos, and a framework migration.

### Acceptance signals

- Opening `inspo/index.html` shows the warning gate first and reveals the dashboard automatically or through bypass.
- Project and social links match the existing site destinations.
- The page is usable at narrow and wide viewports, by keyboard, and with reduced-motion preferences.
- The existing Next application remains unchanged.

### Sources / research

- User-supplied reference set: `inspo/nge1.jpg` through `inspo/nge13.gif`.
- Existing retained source data: `pages/index.tsx`, `components/Posts/Posts.tsx`, `components/Socials/Socials.tsx`.
- Interface synthesis: screenshots show red bar graphs, mint signal traces, radial maps, diagonal hazard stripes, segmented panels, and repeated hex warning motifs. External visual research corroborates this vocabulary: [Curio's NGE design overview](https://designbycurio.com/learn/evangelion-1995) and the [NERV interface artboard study](https://github.com/charlintosh/evangelion-ui-artboard).
