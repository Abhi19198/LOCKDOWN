        // DOM Elements
        const header = document.getElementById('header');
        const logo = document.getElementById('logo');
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const navLinks = document.getElementById('navLinks');
        const getStartedBtn = document.getElementById('getStartedBtn');
        const startPlanningBtn = document.getElementById('startPlanningBtn');
        const watchDemoBtn = document.getElementById('watchDemoBtn');
        const discoverAIBtn = document.getElementById('discoverAIBtn');
        const backToTop = document.getElementById('backToTop');
        const demoModal = document.getElementById('demoModal');
        const closeModal = document.getElementById('closeModal');
        const heroSection = document.querySelector('.hero');
        const sections = document.querySelectorAll('.section');
        const featureCards = document.querySelectorAll('.feature-card');
        const testimonialCards = document.querySelectorAll('.testimonial-card');
        const aiFeatures = document.querySelectorAll('.ai-feature');
        const pricingButtons = document.querySelectorAll('.pricing-card .cta-button');
        const loading = document.getElementById('loading');

        // Current page state
        let currentPage = 'home';

        // Loading animation
        window.addEventListener('load', () => {
            setTimeout(() => {
                loading.classList.add('hidden');
            }, 1000);
        });

        // Scroll Event Listener
        window.addEventListener('scroll', () => {
            // Header scroll effect
            if (window.scrollY > 50) {
                header.classList.add('header-scrolled');
            } else {
                header.classList.remove('header-scrolled');
            }

            // Back to top button visibility
            if (window.scrollY > 500) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }

            // Hero section animation
            if (window.scrollY < 100 && currentPage === 'home') {
                heroSection.classList.add('animate');
            }

            // Section animations
            if (currentPage === 'home') {
                sections.forEach(section => {
                    const sectionTop = section.getBoundingClientRect().top;
                    const windowHeight = window.innerHeight;
                    
                    if (sectionTop < windowHeight * 0.85) {
                        section.classList.add('animate');
                        
                        // Animate feature cards
                        if (section.id === 'features') {
                            featureCards.forEach((card, index) => {
                                setTimeout(() => {
                                    card.classList.add('animate');
                                }, index * 150);
                            });
                        }
                        
                        // Animate testimonial cards
                        if (section.id === 'testimonials') {
                            testimonialCards.forEach((card, index) => {
                                setTimeout(() => {
                                    card.classList.add('animate');
                                }, index * 150);
                            });
                        }
                    }
                });

                // Update active nav link
                updateActiveNavLink();
            }
        });

        // Update active navigation link based on scroll position
        function updateActiveNavLink() {
            const scrollPosition = window.scrollY;
            
            document.querySelectorAll('.nav-links a').forEach(link => {
                const section = document.querySelector(link.getAttribute('href'));
                if (section) {
                    const sectionTop = section.offsetTop - 100;
                    const sectionBottom = sectionTop + section.offsetHeight;
                    
                    if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                }
            });
        }

        // Mobile menu toggle
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileMenuBtn.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Smooth scrolling for navigation links
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                
                if (currentPage === 'home') {
                    const targetSection = document.querySelector(targetId);
                    
                    if (targetSection) {
                        window.scrollTo({
                            top: targetSection.offsetTop - 80,
                            behavior: 'smooth'
                        });
                    }
                }
                
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    mobileMenuBtn.querySelector('i').classList.remove('fa-times');
                    mobileMenuBtn.querySelector('i').classList.add('fa-bars');
                }
            });
        });

        // Back to top functionality
        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Modal functionality
        function openModal() {
            demoModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeModalFunc() {
            demoModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }

        watchDemoBtn.addEventListener('click', openModal);
        closeModal.addEventListener('click', closeModalFunc);
        demoModal.addEventListener('click', (e) => {
            if (e.target === demoModal) {
                closeModalFunc();
            }
        });


        // Button click handlers
        getStartedBtn.addEventListener('click', () => {
            scrollToEvents();
        });

        startPlanningBtn.addEventListener('click', () => {
            if (currentPage === 'home') {
                window.scrollTo({
                    top: document.getElementById('events').offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });

        discoverAIBtn.addEventListener('click', () => {
            if (currentPage === 'home') {
                window.scrollTo({
                    top: document.getElementById('ai').offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });


        // Pricing buttons
        pricingButtons.forEach(button => {
            button.addEventListener('click', () => {
                scrollToEvents();
            });
        });



        // Logo click handler
        logo.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        // AI Features interaction
        aiFeatures.forEach(feature => {
            feature.addEventListener('click', () => {
                // Remove active class from all features
                aiFeatures.forEach(f => f.style.background = 'transparent');
                
                // Add active class to clicked feature
                feature.style.background = 'rgba(124, 58, 237, 0.2)';
            });
        });

        // Initialize animations on page load
        window.addEventListener('load', () => {
            heroSection.classList.add('animate');
            
            // Trigger scroll event to check initial positions
            window.dispatchEvent(new Event('scroll'));
        });

        // Add some interactive effects to feature cards
        featureCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                const icon = card.querySelector('.feature-icon');
                icon.style.transform = 'scale(1.1)';
            });
            
            card.addEventListener('mouseleave', () => {
                const icon = card.querySelector('.feature-icon');
                icon.style.transform = 'scale(1)';
            });
        });

/* ===== Events workspace (working app) ===== */

// Scroll helper used by the Get Started / pricing buttons above.
function scrollToEvents() {
    var el = document.getElementById('events');
    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
}

(function initEventsApp() {
    if (typeof EventFlow === 'undefined') return; // events.js failed to load
    var grid = document.getElementById('eventsGrid');
    if (!grid) return;

    var VIEW_KEY = 'eventflow_view_v1';
    var NAME_KEY = 'eventflow_name_v1';

    var events = EventFlow.loadEvents(window.localStorage);
    var view = window.localStorage.getItem(VIEW_KEY) || 'organizer';
    if (view !== 'organizer' && view !== 'attendee') view = 'organizer';

    var els = {
        organizerBtn: document.getElementById('organizerViewBtn'),
        attendeeBtn: document.getElementById('attendeeViewBtn'),
        search: document.getElementById('eventSearch'),
        filter: document.getElementById('eventFilter'),
        categoryFilter: document.getElementById('eventCategoryFilter'),
        attendeeName: document.getElementById('attendeeName'),
        stats: document.getElementById('eventsStats'),
        formCard: document.getElementById('eventFormCard'),
        form: document.getElementById('eventForm'),
        formError: document.getElementById('eventFormError'),
        empty: document.getElementById('eventsEmpty'),
    };
    els.attendeeName.value = window.localStorage.getItem(NAME_KEY) || '';

    function attendeeName() { return els.attendeeName.value.trim(); }

    function esc(s) {
        return String(s).replace(/[&<>"']/g, function (c) {
            return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
        });
    }

    function categoryLabel(cat) {
        return cat.charAt(0).toUpperCase() + cat.slice(1);
    }

    function render() {
        els.organizerBtn.classList.toggle('active', view === 'organizer');
        els.attendeeBtn.classList.toggle('active', view === 'attendee');
        els.formCard.style.display = view === 'organizer' ? '' : 'none';

        var filtered = EventFlow.filterEvents(events, {
            search: els.search.value,
            filter: els.filter.value,
            category: els.categoryFilter.value,
            attendeeName: attendeeName(),
            now: new Date(),
        });

        var stats = EventFlow.getStats(events, attendeeName());
        els.stats.textContent =
            stats.totalEvents + ' event' + (stats.totalEvents === 1 ? '' : 's') +
            ' · ' + stats.totalRegistrations + ' registration' + (stats.totalRegistrations === 1 ? '' : 's') +
            ' · ' + stats.upcoming + ' upcoming';

        if (!filtered.length) {
            grid.innerHTML = '';
            els.empty.hidden = false;
            els.empty.textContent = events.length === 0
                ? 'No events yet — create your first one above.'
                : 'No events match your search or filters.';
        } else {
            els.empty.hidden = true;
            grid.innerHTML = filtered.map(function (event) {
                var registered = EventFlow.isRegistered(event, attendeeName());
                var past = EventFlow.isPast(event);
                var badges = '<span class="badge badge-category">' + esc(categoryLabel(event.category)) + '</span>'
                    + (event.sample ? ' <span class="badge badge-sample">Sample</span>' : '')
                    + (past ? ' <span class="badge badge-past">Past</span>' : '');
                var names = event.attendees.map(function (a) { return esc(a.name); }).join(', ');
                var actions = '';
                if (view === 'attendee') {
                    actions = registered
                        ? '<span class="btn-registered">Registered ✓</span><button class="btn-secondary" data-action="cancel" data-id="' + event.id + '">Cancel registration</button>'
                        : '<button class="cta-button" data-action="register" data-id="' + event.id + '">Register</button>';
                } else {
                    actions = '<button class="btn-danger" data-action="delete" data-id="' + event.id + '">Delete event</button>';
                }
                return '<article class="event-card">' +
                    '<div class="event-card-top">' + badges + '</div>' +
                    '<h3>' + esc(event.title) + '</h3>' +
                    '<p class="event-meta"><i class="fas fa-calendar-alt"></i>' + esc(EventFlow.formatEventDateTime(event)) + '</p>' +
                    '<p class="event-meta"><i class="fas fa-user"></i>Organized by ' + esc(event.organizer) + '</p>' +
                    (event.description ? '<p class="event-desc">' + esc(event.description) + '</p>' : '') +
                    '<p class="event-attendees"><i class="fas fa-users"></i>' + event.attendees.length +
                    ' registered' + (names ? ': ' + names : '') + '</p>' +
                    '<div class="event-actions">' + actions + '</div>' +
                    '</article>';
            }).join('');
        }

        updateDashboard(stats);
    }

    // The AI-section dashboard shows real numbers from your events now,
    // instead of the old hard-coded figures.
    function updateDashboard(stats) {
        function set(id, value) {
            var el = document.getElementById(id);
            if (el) el.textContent = value;
        }
        set('statTotalEvents', stats.totalEvents);
        set('statTotalRegistrations', stats.totalRegistrations);
        set('statUpcoming', stats.upcoming);
        set('statMyRegistrations', stats.myRegistrations);

        var insights = document.getElementById('insightsList');
        if (insights) {
            var lines = [];
            if (!stats.totalEvents) {
                lines.push('No events yet — create your first event above to see insights here.');
            } else {
                var top = stats.registrationsByEvent[0];
                if (top && top.count > 0) {
                    lines.push('Your largest event is "' + top.title + '" with ' + top.count +
                        ' registration' + (top.count === 1 ? '' : 's') + '.');
                }
                var next = EventFlow.filterEvents(events, { filter: 'upcoming' })[0];
                if (next) {
                    lines.push('Your next event is "' + next.title + '" on ' +
                        EventFlow.formatEventDateTime(next) + '.');
                } else {
                    lines.push('No upcoming events — all your events are in the past.');
                }
                lines.push(stats.totalEvents + ' events in total, ' + stats.totalRegistrations +
                    ' registrations so far.');
            }
            insights.innerHTML = lines.map(function (l) {
                return '<li>' + esc(l) + '</li>';
            }).join('');
        }

        var regChart = document.getElementById('registrationsChart');
        if (regChart) {
            var top5 = stats.registrationsByEvent.slice(0, 5);
            if (!top5.length || top5[0].count === 0) {
                regChart.innerHTML = '<p class="chart-empty">No registrations yet.</p>';
            } else {
                var max = top5[0].count;
                regChart.innerHTML = top5.map(function (row) {
                    var pct = Math.round((row.count / max) * 100);
                    return '<div class="chart-bar-row"><span class="chart-bar-label">' + esc(row.title) + '</span>' +
                        '<div class="chart-bar-track"><div class="chart-bar-fill" style="width:' + pct + '%"></div></div>' +
                        '<span class="chart-bar-value">' + row.count + '</span></div>';
                }).join('');
            }
        }

        var catChart = document.getElementById('categoryChart');
        if (catChart) {
            var entries = Object.keys(stats.byCategory).map(function (cat) {
                return { cat: cat, count: stats.byCategory[cat] };
            }).sort(function (a, b) { return b.count - a.count; });
            if (!entries.length) {
                catChart.innerHTML = '<p class="chart-empty">No events yet.</p>';
            } else {
                var maxCat = entries[0].count;
                catChart.innerHTML = entries.map(function (row) {
                    var pct = Math.round((row.count / maxCat) * 100);
                    return '<div class="chart-bar-row"><span class="chart-bar-label">' + esc(categoryLabel(row.cat)) + '</span>' +
                        '<div class="chart-bar-track"><div class="chart-bar-fill" style="width:' + pct + '%"></div></div>' +
                        '<span class="chart-bar-value">' + row.count + '</span></div>';
                }).join('');
            }
        }
    }

    function persist() {
        EventFlow.saveEvents(window.localStorage, events);
    }

    function setView(next) {
        view = next;
        try { window.localStorage.setItem(VIEW_KEY, view); } catch (e) { /* ignore */ }
        render();
    }

    els.organizerBtn.addEventListener('click', function () { setView('organizer'); });
    els.attendeeBtn.addEventListener('click', function () { setView('attendee'); });
    els.search.addEventListener('input', render);
    els.filter.addEventListener('change', render);
    els.categoryFilter.addEventListener('change', render);
    els.attendeeName.addEventListener('input', function () {
        try { window.localStorage.setItem(NAME_KEY, els.attendeeName.value); } catch (e) { /* ignore */ }
        render();
    });

    els.form.addEventListener('submit', function (e) {
        e.preventDefault();
        els.formError.hidden = true;
        try {
            EventFlow.createEvent(events, {
                title: document.getElementById('eventTitle').value,
                organizer: document.getElementById('eventOrganizer').value,
                date: document.getElementById('eventDate').value,
                time: document.getElementById('eventTime').value,
                category: document.getElementById('eventCategory').value,
                description: document.getElementById('eventDescription').value,
            });
            persist();
            els.form.reset();
            render();
            grid.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        } catch (err) {
            els.formError.textContent = err.message;
            els.formError.hidden = false;
        }
    });

    grid.addEventListener('click', function (e) {
        var btn = e.target.closest('[data-action]');
        if (!btn) return;
        var id = btn.getAttribute('data-id');
        var action = btn.getAttribute('data-action');
        if (action === 'delete') {
            var event = events.find(function (ev) { return ev.id === id; });
            if (event && window.confirm('Delete "' + event.title + '"? This cannot be undone.')) {
                EventFlow.deleteEvent(events, id);
                persist();
                render();
            }
        } else if (action === 'register') {
            if (!attendeeName()) {
                els.attendeeName.focus();
                els.attendeeName.placeholder = 'Enter your name first to register';
                return;
            }
            try {
                EventFlow.registerAttendee(events, id, attendeeName());
                persist();
                render();
            } catch (err) {
                alert(err.message);
            }
        } else if (action === 'cancel') {
            EventFlow.cancelRegistration(events, id, attendeeName());
            persist();
            render();
        }
    });

    render();
})();
