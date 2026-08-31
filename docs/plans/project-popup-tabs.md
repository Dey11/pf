# Project popup tabs

Status: deferred product direction

## Goal

Give project popups a clearer case-study structure without turning every project into a forced template or adding empty tabs.

## Chosen structure

- **Details:** The project overview, role, status, duration, links, and concise product description.
- **Build:** Architecture, technical decisions, constraints, and the parts Shreyan directly implemented.
- **Retrospective:** What worked, what changed during the build, lessons learned, and what would be approached differently now.
- **Chat:** The existing source-aware project assistant.
- **Results:** Conditional. Render this tab only when the project has verified metrics, client outcomes, testimonials, awards, or other meaningful evidence.

The image gallery remains a persistent desktop panel and a mobile-only Images tab unless a later popup redesign changes that relationship.

## Non-goals

- Do not build these tabs yet.
- Do not manufacture results to make every project look uniform.
- Do not duplicate the same long-form copy across Details, Build, and Retrospective.
- Do not weaken the existing bounded, source-aware Chat behavior.

## Content requirements before implementation

Each project needs an explicit role, defensible technical decisions, and enough first-hand material for a retrospective. Results require a source or direct confirmation. Projects without a section should omit its tab rather than render filler.
