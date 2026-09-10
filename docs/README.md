# Repository documentation

This directory is the maintainer-facing source of truth for how the portfolio is structured and changed. The root `README.md` remains the short setup and orientation entry point; detailed guidance belongs here.

## Current system

- [Architecture](architecture.md) explains active routes, rendering boundaries, data flow, external services, and intentional constraints.
- [Content and assets](content-and-assets.md) explains how to update homepage copy, project records, technology metadata, and R2-hosted images.
- [Component map](maintenance/component-map.md) records current component responsibilities, coupling, and evidence-backed cleanup seams for the planned revamp.

## Internal content research

Files under [`content/`](content/) are unpublished working material. Repository research can support copy, but names, roles, metrics, client details, and implementation claims must be verified before publication.

- [Project inventory](content/projects-inventory.md) preserves the broader project list and source links.
- [Project blog drafts](content/project-blog-drafts.md) contains long-form starting points for possible future case studies.

## Plans and decisions

Material features, migrations, and architectural changes belong under [`plans/`](plans/). A plan should state its status and keep goal, context, scope, non-goals, chosen architecture, alternatives, validation, and risks current throughout the work.

Existing records:

- [Nebius chat and dependency upgrade](plans/nebius-and-dependency-upgrade.md) was implemented locally. Hosted follow-up was pending when last updated.
- [R2 asset migration](plans/r2-asset-migration.md) is the completed migration record.

Create a new plan when the upcoming component work has an agreed product scope. Do not turn early observations in the component map into commitments before that scope is settled.

## Documentation maintenance

- Update the root `README.md` when setup, commands, environment variables, deployment expectations, or active routes change.
- Update `architecture.md` when ownership, data flow, service boundaries, or runtime behavior changes.
- Update `content-and-assets.md` when a content source, asset rule, or editorial workflow changes.
- Update the component map during the cleanup so it reflects the resulting ownership boundaries rather than preserving a history of every edit.
- Keep temporary debugging notes, generated output, credentials, and environment-specific details out of documentation.
