# Daily English Display — Design

## Goal

Create a GitHub Pages-ready, single-page English conversation display for a 27-inch touch monitor. It shows one practical English prompt per Korean calendar day, its Korean translation, a likely English reply with translation, and a key-expression translation.

## Experience

- A refined, high-contrast dark display designed to be readable from a distance.
- Large central English prompt, followed by its Korean meaning, a likely reply, and a compact key-expression card.
- Touch-friendly course tabs and a large next-sentence button let the viewer change the course or sentence at any time.
- A small counter displays the position in the active course.
- The visual state changes automatically at the next midnight in `Asia/Seoul` time, including when the browser has remained open overnight. A manual selection is retained until that KST date changes.

## Architecture

- `index.html` contains the touch-first layout and styling; `app.js` holds content, state, and interaction logic.
- A `courses` collection holds expandable course objects. Each object includes stable metadata (`id`, `label`, `shortLabel`) and a `lessons` array. New courses can be added without changes to the UI rendering code.
- Each lesson includes prompt, prompt translation, likely reply, reply translation, expression, and expression translation. The initial `travel` and `business` courses will each contain 300 lessons.
- The current entry is selected from the count of KST calendar days since a fixed epoch, modulo the active course length. This makes the daily default deterministic on every device.
- A small local browser state stores manually selected course and lesson offset for the current KST date only.
- JavaScript uses `Intl.DateTimeFormat` with `timeZone: 'Asia/Seoul'`; it does not rely on the viewer's local timezone.
- A timer schedules the next render immediately after the upcoming KST midnight, then schedules subsequent transitions.

## Publishing

- The repository's `main` branch root will be the GitHub Pages publishing source.
- No build system, server, secret, or dependency is required.

## Verification

- Automated browserless checks will validate the expandable course schema, 300 complete lessons in each initial course, KST date selection, and wraparound.
- A local static-server check will confirm `index.html` is served.
