# Director Positioning Implementation Plan

> **For agentic workers:** Use subagent-driven-development to implement this plan.

**Goal:** Reposition elliottweed.com around Elliott's formal Director role, evidenced multiplier impact, and future-facing enterprise AI leadership.

**Architecture:** Keep the existing Astro single-page site and visual system. Update source content in the page, layout metadata/schema, and timeline data; add a focused Node regression test that verifies the public positioning across those surfaces.

**Tech Stack:** Astro 5, Tailwind CSS 4, GSAP, Node test runner, Netlify static hosting.

## File structure

- Modify `src/pages/index.astro`: hero, proof strip, authority section, leadership cards, LinkedIn summary, and page metadata props.
- Modify `src/layouts/Layout.astro`: default description and Person JSON-LD.
- Modify `src/data/timeline.json`: 2026 Director promotion milestone.
- Create `tests/director-positioning.test.mjs`: source and built-output regression checks for required claims, metadata, privacy, accessibility, and stale-title containment.
- Modify `public/photos/**`: remove embedded EXIF, IPTC, and XMP metadata without changing the visible assets; move unused high-resolution originals outside the public tree.
- Modify `package.json`: expose the Node regression test through `npm test`.

## Task 1: Lock the required positioning with a failing test

- [x] Create `tests/director-positioning.test.mjs` with one behavior-focused test for each required surface, the sole historical-title exception, and public-copy confidentiality boundaries.
- [x] Add the `test` script to `package.json`.
- [x] Run `npm test` and confirm it fails because the current site still contains the stale title and lacks the Director positioning.

## Task 2: Implement the approved content system

- [x] Update the hero role, thesis, supporting copy, and proof numbers in `src/pages/index.astro`.
- [x] Add the three-part authority section before the timeline.
- [x] Rename and rewrite the expertise section as `Where I Lead`.
- [x] Update the LinkedIn summary and page-level metadata props.
- [x] Update default metadata and Person JSON-LD in `src/layouts/Layout.astro`.
- [x] Add the 2026 promotion milestone in `src/data/timeline.json`.
- [x] Keep the navigation order aligned with the page and gate motion-heavy JavaScript behind the reduced-motion preference.
- [x] Run `npm test` and confirm all positioning checks pass.

## Task 3: Verify the complete site

- [x] Run `npm run build` and confirm Astro emits the production page successfully.
- [x] Run `npm test` against the final source.
- [x] Inspect `dist/index.html` with bounded text checks for title, description, canonical URL, Director title, thesis, proof points, and forbidden confidential terms.
- [x] Remove EXIF, IPTC, and XMP data from every public photo asset, normalize any EXIF-dependent orientation first, move unused originals outside `public/`, and verify the assets remain valid.
- [x] Run `git diff --check`.
- [x] Review the change for spec compliance, content quality, accessibility, search clarity, confidentiality, and regression risk.

## Task 4: Publish and verify

- [x] Commit the reviewed change on the feature branch.
- [x] Merge it into local `main` without discarding the existing unpushed SEO commit.
- [x] Push the exact reviewed `main` state to the configured GitHub remote so Netlify can deploy it.
- [x] Confirm the live site returns HTTP 200 and exposes the new title and Director positioning.

## Task 5: Post-launch accessibility, privacy, and asset hardening

- [x] Extend the regression test for public family details, generalized location, focus-safe navigation, WCAG-AA text classes, truthful tenure wording, and image magic-byte/extension agreement.
- [x] Run `npm test` and confirm the new checks fail against the published source for the expected reasons.
- [x] Remove family/minor milestones and public family images while preserving private local copies outside the repository.
- [x] Add keyboard focus visibility, raise secondary-text contrast, correct image extensions and references, and calibrate the search description.
- [x] Run `npm test`, `npm run build`, and `git diff --check`.
- [x] Obtain independent spec, quality, and adversarial review; fix credible findings and rerun proof.
- [x] Commit, fast-forward `main`, push, and verify the live build matches the reviewed source.

Historical photo blobs in the public Git repository require a separate destructive history rewrite. Do not rewrite or force-push history without Elliott's explicit approval.
