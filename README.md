# LOCKDOWN — EventFlow

EventFlow is a working front-end event manager for remote event scheduling
and participant coordination, built for two user groups: **organizers** (who
create and manage events) and **attendees** (who register for events).

It is a **front-end-only** app on purpose: there is no backend, no account
system and no build step. Everything runs in the browser and your data is
stored in your browser's `localStorage`.

## Features

- **Create events** — title, date, time, category, organizer name, description.
- **Browse events** — search by title/organizer/description, filter by
  Upcoming / Past / My registrations, and filter by category.
- **Register / RSVP** — attendees register with their name; a registration
  can be cancelled any time. Duplicate registrations are refused.
- **Organizer / Attendee view toggle** — organizers see a create-event form
  and can delete events; attendees see register/cancel buttons. No login,
  no fake auth.
- **Persistence** — events survive a page refresh (localStorage). 4 sample
  events are seeded on first run and are clearly marked **Sample**; delete
  them and they stay deleted.
- **Live dashboard** — the stats, charts and insights in the AI section are
  computed from your real events (total events, total registrations,
  upcoming events, your registrations, registrations by event, events by
  category).

## Project structure

| Path | What it is |
| --- | --- |
| `index.html` | App shell (loads `css/style.css`, `js/events.js`, `js/app.js`) |
| `css/style.css` | All styling (dark theme, purple accent) |
| `js/events.js` | Event/store logic — no DOM, no dependencies, unit-tested |
| `js/app.js` | Landing-page interactions + Events workspace UI wiring |
| `tests/events.test.js` | Node tests for the event/store logic |
| `package.json` | Test/serve scripts (no dependencies) |

## How to run

Open `index.html` directly in a browser, or serve it:

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

No install step is needed. To run the tests:

```bash
npm test
```

## Data & privacy

- Events are stored under the localStorage key `eventflow_events_v1`,
  your view (`eventflow_view_v1`) and name (`eventflow_name_v1`) under
  their own keys. Nothing leaves your browser.
- Sample events are dated relative to the day you first open the app, so
  they always include upcoming ones.

## What this is not

- **Not full-stack.** There is no server or database; "full-stack" is
  deliberately not claimed anywhere.
- **No accounts.** The organizer/attendee toggle is a view switch, not a
  login — anyone using the same browser sees the same events.

## History

The original repo contained a single `README.md` (65 KB) embedding the
whole app as one HTML document with inline CSS/JS — a marketing landing
page with no working event features. This upgrade extracted it into a
proper project structure and made the event manager real, keeping the
EventFlow branding and dark purple theme.
