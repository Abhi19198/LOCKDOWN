'use strict';

// Full-app smoke test: boots index.html in jsdom, drives the real UI
// (create event, register, cancel, delete) and proves data survives a
// simulated refresh via localStorage. Skipped when jsdom is not installed
// (jsdom is dev-only: npm install --no-save jsdom).
const fs = require('node:fs');
const path = require('node:path');
const { describe, test } = require('node:test');
const assert = require('node:assert/strict');

let JSDOM = null;
let VirtualConsole = null;
try {
    ({ JSDOM, VirtualConsole } = require('jsdom'));
} catch (e) { /* jsdom not installed: tests below skip */ }

const ROOT = path.join(__dirname, '..');
const HTML = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const EVENTS_JS = fs.readFileSync(path.join(ROOT, 'js', 'events.js'), 'utf8');
const APP_JS = fs.readFileSync(path.join(ROOT, 'js', 'app.js'), 'utf8');

function boot(storedJson) {
    const virtualConsole = new VirtualConsole(); // swallow jsdom "not implemented" notes
    const dom = new JSDOM(HTML, {
        url: 'http://localhost/',
        runScripts: 'outside-only',
        virtualConsole,
        beforeParse(window) {
            if (storedJson) {
                window.localStorage.setItem('eventflow_events_v1', storedJson);
            }
        },
    });
    dom.window.confirm = () => true;
    dom.window.alert = () => {};
    dom.window.eval(EVENTS_JS);
    dom.window.eval(APP_JS);
    return dom;
}

function cardTitles(dom) {
    return Array.from(dom.window.document.querySelectorAll('.event-card h3'))
        .map((el) => el.textContent);
}

function storedEvents(dom) {
    return JSON.parse(dom.window.localStorage.getItem('eventflow_events_v1'));
}

describe('smoke (jsdom)', () => {
    test('boots with 4 seeded sample events and real dashboard stats', (t) => {
        if (!JSDOM) return t.skip('jsdom not installed');
        const dom = boot();
        assert.equal(cardTitles(dom).length, 4);
        assert.match(dom.window.document.getElementById('eventsStats').textContent, /4 events/);
        assert.equal(dom.window.document.getElementById('statTotalEvents').textContent, '4');
    });

    test('create event adds a card and persists it', (t) => {
        if (!JSDOM) return t.skip('jsdom not installed');
        const dom = boot();
        const doc = dom.window.document;
        doc.getElementById('eventTitle').value = 'My Test Meetup';
        doc.getElementById('eventOrganizer').value = 'Abhishek';
        doc.getElementById('eventDate').value = '2026-12-05';
        doc.getElementById('eventTime').value = '15:00';
        doc.getElementById('eventCategory').value = 'meetup';
        doc.getElementById('eventDescription').value = 'A test meetup.';
        doc.getElementById('eventForm').dispatchEvent(
            new dom.window.Event('submit', { bubbles: true, cancelable: true }));
        assert.equal(cardTitles(dom).length, 5);
        assert.ok(cardTitles(dom).includes('My Test Meetup'));
        assert.equal(storedEvents(dom).length, 5);
        assert.equal(dom.window.document.getElementById('statTotalEvents').textContent, '5');
    });

    test('attendee can register and cancel', (t) => {
        if (!JSDOM) return t.skip('jsdom not installed');
        const dom = boot();
        const doc = dom.window.document;
        doc.getElementById('attendeeViewBtn').click();
        assert.equal(doc.getElementById('eventFormCard').style.display, 'none');
        const nameInput = doc.getElementById('attendeeName');
        nameInput.value = 'Abhishek';
        nameInput.dispatchEvent(new dom.window.Event('input', { bubbles: true }));
        const firstCard = doc.querySelector('.event-card');
        firstCard.querySelector('[data-action="register"]').click();
        // render() replaces the grid, so re-query the fresh card
        const updatedCard = doc.querySelector('.event-card');
        assert.ok(updatedCard.textContent.includes('Registered'));
        assert.ok(updatedCard.textContent.includes('Abhishek'));
        assert.equal(dom.window.document.getElementById('statMyRegistrations').textContent, '1');
        updatedCard.querySelector('[data-action="cancel"]').click();
        assert.ok(!doc.querySelector('.event-card').textContent.includes('Registered'));
    });

    test('organizer can delete an event', (t) => {
        if (!JSDOM) return t.skip('jsdom not installed');
        const dom = boot();
        const doc = dom.window.document;
        doc.querySelector('.event-card [data-action="delete"]').click();
        assert.equal(cardTitles(dom).length, 3);
        assert.equal(storedEvents(dom).length, 3);
    });

    test('data survives a refresh (new page load, same localStorage)', (t) => {
        if (!JSDOM) return t.skip('jsdom not installed');
        const dom1 = boot();
        const doc1 = dom1.window.document;
        doc1.getElementById('eventTitle').value = 'Persistent Event';
        doc1.getElementById('eventOrganizer').value = 'Abhishek';
        doc1.getElementById('eventDate').value = '2026-12-05';
        doc1.getElementById('eventForm').dispatchEvent(
            new dom1.window.Event('submit', { bubbles: true, cancelable: true }));
        doc1.getElementById('attendeeViewBtn').click();
        const nameInput = doc1.getElementById('attendeeName');
        nameInput.value = 'Abhishek';
        nameInput.dispatchEvent(new dom1.window.Event('input', { bubbles: true }));
        doc1.querySelector('.event-card [data-action="register"]').click();

        const saved = dom1.window.localStorage.getItem('eventflow_events_v1');
        const dom2 = boot(saved);
        assert.equal(cardTitles(dom2).length, 5);
        assert.ok(cardTitles(dom2).includes('Persistent Event'));
        assert.ok(dom2.window.document.querySelector('.event-card').textContent.includes('Abhishek'));
    });
});
