// JS/script.js
(function() {
    'use strict';

    // --- DOM Elements ---
    const nav = document.querySelector('.navbar');
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');
    const scrollElements = document.querySelectorAll('.stat, .program-card, .plan, .testimonial');

    // --- Mobile Menu Toggle ---
    function toggleMenu() {
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        menuToggle.setAttribute('aria-expanded', !isExpanded);
        document.body.style.overflow = !isExpanded ? 'hidden' : '';
    }

    function closeMenu() {
        if (navMenu.classList.contains('active')) {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }
    }

    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMenu);
    }

    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // --- Navbar Background on Scroll ---
    function updateNavBackground() {
        if (window.scrollY > 60) {
            nav.style.background = 'rgba(10, 10, 10, 0.97)';
        } else {
            nav.style.background = 'linear-gradient(to bottom, rgba(10, 10, 10, 0.95), transparent)';
        }
    }
    window.addEventListener('scroll', updateNavBackground);
    updateNavBackground();

    // --- Smooth Scroll for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const offset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - offset;
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Scroll Reveal using Intersection Observer ---
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -20px 0px'
    });

    scrollElements.forEach(el => {
        revealObserver.observe(el);
    });

    // --- Dynamic Year in Footer (optional) ---
    const footerYear = document.querySelector('.footer-bottom p:first-child');
    if (footerYear) {
        const currentYear = new Date().getFullYear();
        footerYear.innerHTML = footerYear.innerHTML.replace('2026', currentYear);
    }

    // --- Small enhancement: pre-reveal any elements already visible ---
    function preRevealVisible() {
        scrollElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            if (rect.top < windowHeight - 100) {
                el.classList.add('revealed');
                revealObserver.unobserve(el);
            }
        });
    }
    preRevealVisible();
    window.addEventListener('resize', preRevealVisible);
})();