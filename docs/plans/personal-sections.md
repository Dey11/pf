# Screening Room and Field Notes

Status: Screening Room mounted; Field Notes retained but unmounted

## Goal

Add personal material to the homepage without breaking its black, white, and red editorial identity or introducing generic profile cards.

## Screening Room

Screening Room is a typographic film leader rather than a poster gallery. Perforated edges, frame counters, a large current title, and a three-frame favorites reel provide the cinema reference without relying on third-party poster APIs or image rights.

Initial content comes from the dormant hobbies section:

- Now screening: Stranger Things
- Favorites: Better Call Saul, Breaking Bad, and The Office

Keep the content local and manually curated. If the list grows, preserve one current title and a small favorites edit rather than turning the section into a complete watch history.

### Prototype round

Three replacement directions are available at `/prototypes/screening-room`. They stay isolated from the homepage until one is explicitly selected:

- **Index:** a dense editorial ledger with a selected-title reading pane.
- **Channel:** a broadcast tuner where each title occupies a channel.
- **Tickets:** a tactile stack of selectable cinema stubs and a title marquee.

The route accepts `?v=1`, `?v=2`, or `?v=3` and includes the standard prototype picker. After a direction is chosen, promote only that version and remove the prototype surface unless asked to retain it.

### Refined poster round

The first round remains available unchanged. A quieter second round lives at `/prototypes/screening-room/refined` and uses original abstract poster studies rather than third-party key art:

- **Gallery:** four equal poster studies with restrained captions and selection detail.
- **Focus:** one dominant poster paired with a slim title index.
- **Shelf:** a lightly overlapping poster archive with a small hover lift.

This round deliberately limits motion to 1–2% poster scaling and a four-pixel lift. The visual hierarchy must remain complete without hover, and reduced-motion users receive no movement.

## Field Notes

Field Notes is a loose stack of editorial slips. The slight offsets make it read like working material on a desk, while the solid neutral and brand-red treatments connect it to the project bento.

The section is currently unmounted from the homepage. Keep the component available for a later editorial pass rather than presenting it before the writing surface is ready.

Initial entries:

- React 19's useOptimistic Hook, an existing archived article
- RAG without the hand-waving, a working-note topic derived from the existing learning list
- Microanimations worth keeping, a working-note topic derived from the existing animation interest

Published and working notes must remain visibly distinct. A working title does not imply that a full article exists.

## Interaction and accessibility

- Screening Room is primarily static; favorite titles use a restrained color hover only.
- Field-note slips straighten and scale by one percent on precise-pointer hover. The hover target stays still so the movement cannot flicker.
- Reduced-motion users receive straight, non-moving slips.
- The layouts remain legible without hover and collapse into a single-column reading order on mobile.

## Non-goals

- No external movie database, poster, Spotify, or publishing API in the first version.
- No restoration of the disabled `/blogs` routes as part of this work.
- No fabricated reviews, ratings, reading statistics, or published articles.

## Follow-up

Replace or reorder the local entries as Shreyan's current viewing and writing changes. If full articles return, connect only published notes to real routes and keep working notes non-interactive.
