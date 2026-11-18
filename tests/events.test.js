'use strict';

const { describe, test } = require('node:test');
const assert = require('node:assert/strict');

const EventFlow = require('../js/events.js');

const NOW = new Date('2026-11-18T12:00:00');

function fakeStorage() {
    const map = new Map();
    return {
        getItem: (key) => (map.has(key) ? map.get(key) : null),
        setItem: (key, value) => map.set(key, String(value)),
        removeItem: (key) => map.delete(key),
    };
}

function makeEvent(overrides) {
    return Object.assign({
        id: 'evt-' + Math.random().toString(36).slice(2),
        title: 'Test Event',
        date: '2026-11-20',
        time: '10:00',
        category: 'workshop',
        organizer: 'Tester',
        description: 'A test event.',
        attendees: [],
        sample: false,
        createdAt: NOW.toISOString(),
    }, overrides || {});
}

describe('seedEvents', () => {
    test('returns 4 sample events, 3 upcoming and 1 past, with unique ids', () => {
        const seeds = EventFlow.seedEvents(NOW);
        assert.equal(seeds.length, 4);
        assert.ok(seeds.every((e) => e.sample === true));
        assert.equal(new Set(seeds.map((e) => e.id)).size, 4);
        assert.equal(seeds.filter((e) => EventFlow.isUpcoming(e, NOW)).length, 3);
        assert.equal(seeds.filter((e) => EventFlow.isPast(e, NOW)).length, 1);
        assert.ok(seeds.every((e) => EventFlow.CATEGORIES.includes(e.category)));
    });
});

describe('createEvent', () => {
    test('adds an event with defaults and trims strings', () => {
        const events = [];
        const event = EventFlow.createEvent(events, {
            title: '  My Event ',
            organizer: '  Abhishek ',
            date: '2026-12-01',
        }, NOW);
        assert.equal(events.length, 1);
        assert.equal(event.title, 'My Event');
        assert.equal(event.organizer, 'Abhishek');
        assert.equal(event.time, '10:00');
        assert.equal(event.category, 'other');
        assert.deepEqual(event.attendees, []);
        assert.equal(event.sample, false);
        assert.ok(event.id);
    });

    test('throws on missing title, organizer, bad date, bad time, unknown category', () => {
        const events = [];
        assert.throws(() => EventFlow.createEvent(events, { title: '  ', organizer: 'A', date: '2026-12-01' }), /title/);
        assert.throws(() => EventFlow.createEvent(events, { title: 'T', organizer: '', date: '2026-12-01' }), /Organizer/);
        assert.throws(() => EventFlow.createEvent(events, { title: 'T', organizer: 'A', date: '2026-13-40' }), /date/);
        assert.throws(() => EventFlow.createEvent(events, { title: 'T', organizer: 'A', date: '2026-12-01', time: '25:00' }), /Time/);
        assert.throws(() => EventFlow.createEvent(events, { title: 'T', organizer: 'A', date: '2026-12-01', category: 'nope' }), /category/);
        assert.equal(events.length, 0);
    });
});

describe('deleteEvent', () => {
    test('removes by id and reports false for unknown ids', () => {
        const events = [makeEvent({ id: 'a' }), makeEvent({ id: 'b' })];
        assert.equal(EventFlow.deleteEvent(events, 'a'), true);
        assert.equal(events.length, 1);
        assert.equal(EventFlow.deleteEvent(events, 'zzz'), false);
        assert.equal(events.length, 1);
    });
});

describe('register / cancel', () => {
    test('registers once, refuses duplicates case-insensitively, cancels', () => {
        const events = [makeEvent({ id: 'a' })];
        assert.deepEqual(EventFlow.registerAttendee(events, 'a', 'Abhishek'), { registered: true });
        assert.equal(events[0].attendees.length, 1);
        assert.deepEqual(EventFlow.registerAttendee(events, 'a', '  abhishek  '), { registered: false, reason: 'already' });
        assert.equal(events[0].attendees.length, 1);
        assert.equal(EventFlow.isRegistered(events[0], 'ABHISHEK'), true);
        assert.equal(EventFlow.cancelRegistration(events, 'a', 'abhishek'), true);
        assert.equal(events[0].attendees.length, 0);
        assert.equal(EventFlow.cancelRegistration(events, 'a', 'abhishek'), false);
    });

    test('throws on empty name and unknown event', () => {
        const events = [makeEvent({ id: 'a' })];
        assert.throws(() => EventFlow.registerAttendee(events, 'a', '   '), /name/);
        assert.throws(() => EventFlow.registerAttendee(events, 'nope', 'Abhishek'), /not found/);
        assert.throws(() => EventFlow.cancelRegistration(events, 'nope', 'Abhishek'), /not found/);
    });
});

describe('isPast / isUpcoming', () => {
    test('today is upcoming, yesterday is past', () => {
        assert.equal(EventFlow.isUpcoming(makeEvent({ date: '2026-11-18' }), NOW), true);
        assert.equal(EventFlow.isPast(makeEvent({ date: '2026-11-17' }), NOW), true);
        assert.equal(EventFlow.isUpcoming(makeEvent({ date: '2026-11-19' }), NOW), true);
    });
});

describe('filterEvents', () => {
    function sample() {
        const events = [
            makeEvent({ id: '1', title: 'Coding Workshop', date: '2026-11-20', category: 'workshop', organizer: 'Abhishek' }),
            makeEvent({ id: '2', title: 'AI Conference', date: '2026-11-10', category: 'conference', organizer: 'Priya' }),
            makeEvent({ id: '3', title: 'Music Night', date: '2026-11-25', category: 'social', organizer: 'Rahul', description: 'Live coding music jam' }),
        ];
        EventFlow.registerAttendee(events, '1', 'Abhishek');
        return events;
    }

    test('search matches title, organizer and description, case-insensitively', () => {
        const events = sample();
        assert.deepEqual(EventFlow.filterEvents(events, { search: 'coding' }).map((e) => e.id), ['1', '3']);
        assert.deepEqual(EventFlow.filterEvents(events, { search: 'PRIYA' }).map((e) => e.id), ['2']);
        assert.deepEqual(EventFlow.filterEvents(events, { search: 'nothing-here' }), []);
    });

    test('upcoming / past / mine filters', () => {
        const events = sample();
        assert.deepEqual(EventFlow.filterEvents(events, { filter: 'upcoming', now: NOW }).map((e) => e.id), ['1', '3']);
        assert.deepEqual(EventFlow.filterEvents(events, { filter: 'past', now: NOW }).map((e) => e.id), ['2']);
        assert.deepEqual(EventFlow.filterEvents(events, { filter: 'mine', attendeeName: 'abhishek', now: NOW }).map((e) => e.id), ['1']);
    });

    test('category filter and date-ascending sort', () => {
        const events = sample();
        assert.deepEqual(EventFlow.filterEvents(events, { category: 'workshop' }).map((e) => e.id), ['1']);
        assert.deepEqual(EventFlow.filterEvents(events, { now: NOW }).map((e) => e.id), ['2', '1', '3']);
    });
});

describe('getStats', () => {
    test('counts events, registrations, upcoming and per-category totals', () => {
        const events = EventFlow.seedEvents(NOW);
        EventFlow.registerAttendee(events, events[0].id, 'Abhishek');
        EventFlow.registerAttendee(events, events[0].id, 'Priya');
        const stats = EventFlow.getStats(events, 'Abhishek', NOW);
        assert.equal(stats.totalEvents, 4);
        assert.equal(stats.totalRegistrations, 2);
        assert.equal(stats.upcoming, 3);
        assert.equal(stats.past, 1);
        assert.equal(stats.myRegistrations, 1);
        assert.equal(stats.byCategory.workshop, 1);
        assert.equal(stats.registrationsByEvent[0].count, 2);
    });
});

describe('formatEventDateTime', () => {
    test('includes the date and the time', () => {
        const text = EventFlow.formatEventDateTime(makeEvent({ date: '2026-11-20', time: '18:30' }));
        assert.match(text, /2026/);
        assert.match(text, /18:30/);
    });
});

describe('loadEvents / saveEvents', () => {
    test('seeds on first run, round-trips through storage, and does not reseed an empty list', () => {
        const storage = fakeStorage();
        const first = EventFlow.loadEvents(storage, NOW);
        assert.equal(first.length, 4);
        assert.ok(storage.getItem(EventFlow.STORAGE_KEY));

        const second = EventFlow.loadEvents(storage, NOW);
        assert.equal(second.length, 4);
        assert.deepEqual(second.map((e) => e.id), first.map((e) => e.id));

        EventFlow.saveEvents(storage, []);
        assert.deepEqual(EventFlow.loadEvents(storage, NOW), []);
    });

    test('corrupt stored data is replaced by fresh samples', () => {
        const storage = fakeStorage();
        storage.setItem(EventFlow.STORAGE_KEY, '{not json');
        assert.equal(EventFlow.loadEvents(storage, NOW).length, 4);
        storage.setItem(EventFlow.STORAGE_KEY, '"just a string"');
        assert.equal(EventFlow.loadEvents(storage, NOW).length, 4);
    });
});
