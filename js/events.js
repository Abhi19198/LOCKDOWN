/* EventFlow — event store logic (no DOM, no dependencies).
 *
 * Pure functions over a plain array of events, plus a tiny storage
 * adapter so the same code runs in the browser (localStorage) and in
 * Node tests (any object with getItem/setItem).
 *
 * Event shape:
 *   { id, title, date: 'YYYY-MM-DD', time: 'HH:MM', category,
 *     organizer, description, attendees: [{ name, at }], sample, createdAt }
 *
 * Works in the browser as window.EventFlow and in Node as module.exports.
 */
(function (global) {
    'use strict';

    var STORAGE_KEY = 'eventflow_events_v1';
    var CATEGORIES = ['conference', 'workshop', 'meetup', 'social', 'virtual', 'other'];

    function generateId() {
        if (typeof crypto !== 'undefined' && crypto.randomUUID) {
            return crypto.randomUUID();
        }
        return 'evt-' + Date.now().toString(36) + '-' +
            Math.floor(Math.random() * 1e9).toString(36);
    }

    function isoDate(date) {
        var y = date.getFullYear();
        var m = String(date.getMonth() + 1).padStart(2, '0');
        var d = String(date.getDate()).padStart(2, '0');
        return y + '-' + m + '-' + d;
    }

    function addDays(date, days) {
        var d = new Date(date.getTime());
        d.setDate(d.getDate() + days);
        return d;
    }

    function isValidDateString(value) {
        if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
        var parts = value.split('-').map(Number);
        var d = new Date(parts[0], parts[1] - 1, parts[2]);
        return d.getFullYear() === parts[0] &&
            d.getMonth() === parts[1] - 1 &&
            d.getDate() === parts[2];
    }

    function isValidTimeString(value) {
        return typeof value === 'string' && /^([01]\d|2[0-3]):[0-5]\d$/.test(value);
    }

    /** Sample events, dated relative to `now` so they never go stale. */
    function seedEvents(now) {
        now = now || new Date();
        function seed(offsetDays, title, time, category, organizer, description) {
            return {
                id: generateId(),
                title: title,
                date: isoDate(addDays(now, offsetDays)),
                time: time,
                category: category,
                organizer: organizer,
                description: description,
                attendees: [],
                sample: true,
                createdAt: new Date().toISOString(),
            };
        }
        return [
            seed(3, 'Weekend Coding Workshop', '10:00', 'workshop', 'EventFlow Team',
                'A hands-on Saturday workshop: build a small web app from scratch. ' +
                'Bring a laptop; beginners welcome.'),
            seed(7, 'Tech Talk: AI in Everyday Life', '18:00', 'conference', 'EventFlow Team',
                'An evening talk on how AI is used in everyday products, followed by open Q&A.'),
            seed(14, 'Remote Team Meetup', '16:00', 'virtual', 'EventFlow Team',
                'Monthly online meetup for remote event organizers to share what worked.'),
            seed(-2, 'College Cultural Fest', '09:00', 'social', 'EventFlow Team',
                'A day of music, dance and food stalls on campus. This one already happened.'),
        ];
    }

    function validateInput(input) {
        var errors = [];
        if (!input || typeof input.title !== 'string' || !input.title.trim()) {
            errors.push('Event title is required.');
        } else if (input.title.trim().length > 120) {
            errors.push('Event title must be 120 characters or fewer.');
        }
        if (!input || typeof input.organizer !== 'string' || !input.organizer.trim()) {
            errors.push('Organizer name is required.');
        } else if (input.organizer.trim().length > 80) {
            errors.push('Organizer name must be 80 characters or fewer.');
        }
        if (!input || !isValidDateString(input.date)) {
            errors.push('A valid event date is required.');
        }
        if (input && input.time && !isValidTimeString(input.time)) {
            errors.push('Time must be in 24-hour HH:MM format.');
        }
        if (input && input.category && CATEGORIES.indexOf(input.category) === -1) {
            errors.push('Unknown event category.');
        }
        if (input && typeof input.description === 'string' && input.description.length > 500) {
            errors.push('Description must be 500 characters or fewer.');
        }
        return errors;
    }

    /** Validate and append a new event. Returns the created event. Throws on invalid input. */
    function createEvent(events, input, now) {
        var errors = validateInput(input);
        if (errors.length) throw new Error(errors.join(' '));
        var event = {
            id: generateId(),
            title: input.title.trim(),
            date: input.date,
            time: input.time || '10:00',
            category: input.category || 'other',
            organizer: input.organizer.trim(),
            description: (input.description || '').trim(),
            attendees: [],
            sample: false,
            createdAt: (now || new Date()).toISOString(),
        };
        events.push(event);
        return event;
    }

    /** Remove an event by id. Returns true when something was removed. */
    function deleteEvent(events, id) {
        for (var i = 0; i < events.length; i++) {
            if (events[i].id === id) {
                events.splice(i, 1);
                return true;
            }
        }
        return false;
    }

    function findEvent(events, id) {
        for (var i = 0; i < events.length; i++) {
            if (events[i].id === id) return events[i];
        }
        return null;
    }

    function normaliseName(name) {
        return String(name || '').trim().toLowerCase();
    }

    /** Register an attendee. Returns { registered: true } or { registered: false, reason: 'already' }. */
    function registerAttendee(events, eventId, name) {
        if (!name || !String(name).trim()) throw new Error('Your name is required to register.');
        var event = findEvent(events, eventId);
        if (!event) throw new Error('Event not found.');
        var wanted = normaliseName(name);
        for (var i = 0; i < event.attendees.length; i++) {
            if (normaliseName(event.attendees[i].name) === wanted) {
                return { registered: false, reason: 'already' };
            }
        }
        event.attendees.push({ name: String(name).trim(), at: new Date().toISOString() });
        return { registered: true };
    }

    /** Cancel a registration. Returns true when a registration was removed. */
    function cancelRegistration(events, eventId, name) {
        if (!name || !String(name).trim()) throw new Error('Your name is required to cancel.');
        var event = findEvent(events, eventId);
        if (!event) throw new Error('Event not found.');
        var wanted = normaliseName(name);
        for (var i = 0; i < event.attendees.length; i++) {
            if (normaliseName(event.attendees[i].name) === wanted) {
                event.attendees.splice(i, 1);
                return true;
            }
        }
        return false;
    }

    function isRegistered(event, name) {
        if (!name) return false;
        var wanted = normaliseName(name);
        return event.attendees.some(function (a) { return normaliseName(a.name) === wanted; });
    }

    /** An event is past once its date is before today (date-only comparison). */
    function isPast(event, now) {
        return event.date < isoDate(now || new Date());
    }

    function isUpcoming(event, now) {
        return !isPast(event, now);
    }

    function eventDateTime(event) {
        return new Date(event.date + 'T' + (event.time || '00:00') + ':00');
    }

    /**
     * Filter + search + sort. opts: { search, filter: 'all'|'upcoming'|'past'|'mine',
     * category, attendeeName, now }. Returns a new array, earliest first.
     */
    function filterEvents(events, opts) {
        opts = opts || {};
        var now = opts.now || new Date();
        var search = (opts.search || '').trim().toLowerCase();
        var result = events.filter(function (event) {
            if (opts.category && opts.category !== 'all' && event.category !== opts.category) return false;
            if (opts.filter === 'upcoming' && isPast(event, now)) return false;
            if (opts.filter === 'past' && !isPast(event, now)) return false;
            if (opts.filter === 'mine' && !isRegistered(event, opts.attendeeName)) return false;
            if (search) {
                var haystack = [event.title, event.organizer, event.description || '']
                    .join(' ').toLowerCase();
                if (haystack.indexOf(search) === -1) return false;
            }
            return true;
        });
        result.sort(function (a, b) {
            return eventDateTime(a) - eventDateTime(b);
        });
        return result;
    }

    /** Counts used by the stats row and the dashboard. */
    function getStats(events, attendeeName, now) {
        now = now || new Date();
        var byCategory = {};
        var registrationsByEvent = [];
        var totalRegistrations = 0;
        var upcoming = 0;
        var myRegistrations = 0;
        events.forEach(function (event) {
            byCategory[event.category] = (byCategory[event.category] || 0) + 1;
            totalRegistrations += event.attendees.length;
            if (isUpcoming(event, now)) upcoming++;
            if (isRegistered(event, attendeeName)) myRegistrations++;
            registrationsByEvent.push({
                id: event.id,
                title: event.title,
                count: event.attendees.length,
            });
        });
        registrationsByEvent.sort(function (a, b) { return b.count - a.count; });
        return {
            totalEvents: events.length,
            totalRegistrations: totalRegistrations,
            upcoming: upcoming,
            past: events.length - upcoming,
            myRegistrations: myRegistrations,
            byCategory: byCategory,
            registrationsByEvent: registrationsByEvent,
        };
    }

    /** e.g. "Sat, 22 Nov 2026 · 10:00". */
    function formatEventDateTime(event) {
        var d = new Date(event.date + 'T00:00:00');
        var datePart = d.toLocaleDateString('en-IN', {
            weekday: 'short', day: 'numeric', month: 'short', year: 'numeric',
        });
        return datePart + ' · ' + (event.time || '10:00');
    }

    /** Load events from storage; seed with samples on first run or corrupt data. */
    function loadEvents(storage, now) {
        var raw = null;
        try { raw = storage.getItem(STORAGE_KEY); } catch (e) { raw = null; }
        if (raw) {
            try {
                var parsed = JSON.parse(raw);
                if (Array.isArray(parsed)) {
                    return parsed.filter(function (e) {
                        return e && typeof e.id === 'string' &&
                            typeof e.title === 'string' && typeof e.date === 'string';
                    }).map(function (e) {
                        if (!Array.isArray(e.attendees)) e.attendees = [];
                        return e;
                    });
                }
            } catch (e) { /* fall through to seeding */ }
        }
        var seeded = seedEvents(now);
        saveEvents(storage, seeded);
        return seeded;
    }

    function saveEvents(storage, events) {
        try { storage.setItem(STORAGE_KEY, JSON.stringify(events)); } catch (e) { /* storage full/blocked: keep in-memory only */ }
    }

    var api = {
        STORAGE_KEY: STORAGE_KEY,
        CATEGORIES: CATEGORIES,
        generateId: generateId,
        seedEvents: seedEvents,
        validateInput: validateInput,
        createEvent: createEvent,
        deleteEvent: deleteEvent,
        registerAttendee: registerAttendee,
        cancelRegistration: cancelRegistration,
        isRegistered: isRegistered,
        isPast: isPast,
        isUpcoming: isUpcoming,
        filterEvents: filterEvents,
        getStats: getStats,
        formatEventDateTime: formatEventDateTime,
        loadEvents: loadEvents,
        saveEvents: saveEvents,
    };

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = api;
    } else {
        global.EventFlow = api;
    }
})(typeof window !== 'undefined' ? window : globalThis);
