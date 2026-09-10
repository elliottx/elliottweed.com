# Director Positioning Design

## Goal

Update elliottweed.com so it immediately establishes Elliott Weed as a Salesforce Success Architecture Director and a future-facing enterprise AI operating leader, using specific public-safe proof rather than self-congratulatory language.

## Audience

The primary readers are executive leaders, recruiters, prospective collaborators, customers, and technical peers who find Elliott through search and need to understand his level, usefulness, and trajectory quickly.

## Positioning thesis

Elliott solves enterprise AI problems that do not fit neatly inside one team. His differentiator is the combination of product judgment, architecture depth, transformation experience, and multiplier leadership: he resolves difficult cross-functional problems, shapes production-ready architecture, turns the solution into a reusable operating pattern, and scales that judgment across the field.

The tone should convey effortless authority: plainspoken, specific, and earned. The page should make Elliott's level obvious through role, scope, and proof—not hype, self-ranking, or praise adjectives.

## Experience

Preserve the existing dark, cinematic visual identity. Strengthen hierarchy and language rather than redesigning the site. The first viewport should communicate, in order:

1. Formal role: `Success Architecture Director at Salesforce`.
2. Future-facing promise: `I solve enterprise AI problems that do not fit neatly inside one team.`
3. Scope: Agentforce, Data 360, strategy, data, architecture, product, and delivery.
4. Proof: `19+ years in enterprise technology`, `10+ years across the Salesforce ecosystem`, and `40+ architects enabled`.

Add one concise authority section before the personal timeline. It should explain Elliott's repeatable value in three moves:

- turn ambiguity into architecture;
- scale judgment beyond one engagement; and
- connect technical systems to business outcomes.

Rename `What I Build` to `Where I Lead` and evolve the cards toward Enterprise AI & Agentforce, Data 360 & Trusted Context, and Architecture at Scale. Keep Marketing Cloud visible in supporting copy because it is a durable part of Elliott's depth.

## Content updates

- Update the page title, description, social metadata, and Person JSON-LD to the formal Director title and enterprise AI positioning.
- Update the hero, proof strip, LinkedIn summary, and all stale `Senior AI & Data Success Architect` references.
- Add a 2026 timeline milestone for the Success Architecture Director promotion.
- Keep the 2025 timeline entry as the return to Salesforce in the Senior AI & Data Success Architect role.
- Do not publish named-customer rankings, contract-value claims, internal project names, performance-review details, compensation, or other confidential Salesforce information.
- Preserve the existing contact form, journey, certifications, links, imagery, animation system, and responsive structure.
- Strip EXIF, IPTC, and XMP metadata from public photo assets while preserving their displayed orientation and image content.
- Keep unlinked high-resolution originals in a non-public source-assets directory so the deployment does not expose them.

## Search positioning

The visible copy and metadata should consistently associate Elliott Weed with:

- Success Architecture Director;
- enterprise AI architecture;
- Agentforce;
- Data 360 / Data Cloud;
- trusted AI architecture and production readiness;
- architecture leadership at scale.

The page must remain indexable, canonical to `https://elliottweed.com`, and structurally valid.

## Acceptance criteria

- The formal Director title is prominent in the hero, document title, meta description, LinkedIn card, timeline, and JSON-LD.
- The hero contains the approved production-oriented thesis and all three quantified proof points.
- A visible authority section explains Elliott's repeatable usefulness without hype or confidential claims.
- `Where I Lead` presents future-facing leadership scope and retains Marketing Cloud context.
- No visible or metadata occurrence of the stale `Senior AI & Data Success Architect` title remains except the historically accurate 2025 timeline milestone.
- Navigation remains valid, section order matches the navigation, and reduced-motion users receive a non-animated experience.
- Public photo assets contain no embedded EXIF, IPTC, or XMP metadata, and the build contains no unlinked originals directory.
- The Astro production build passes.
- Automated regression checks verify the public positioning, canonical URL, metadata, historical-title containment, and absence of confidential customer/project language.

## Post-launch hardening addendum

The final review sharpened the same approved design principles: professional authority, public safety, accessibility, and credibility.

- Keep the public journey professionally useful. Do not name Elliott's spouse or minor children, publish children's birth years, or deploy family photographs. Generalize the current location to the Midwest.
- A fixed navigation that is visually hidden must not accept invisible keyboard focus. Reveal it on `:focus-within` and give navigation links an explicit `:focus-visible` treatment.
- Meaningful normal-sized copy must meet WCAG AA contrast against the page background.
- Deployed image extensions must agree with their encoded bytes so hosts and browsers use the correct MIME type.
- Search descriptions must distinguish 19+ years in enterprise technology from Elliott's more recent enterprise AI specialization.
