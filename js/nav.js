/**
 * Navigation — mobile hamburger toggle, smooth scroll, active state
 * Enhanced scroll animations with directional reveals + stagger
 */
(function() {
  'use strict';

  const nav = document.querySelector('.site-nav');
  const header = document.querySelector('.site-header');
  const hamburger = document.querySelector('.nav-hamburger');
  const menu = document.querySelector('.nav-menu');
  const overlay = document.querySelector('.nav-overlay');
  const body = document.body;

  if (!hamburger || !menu) return;

  function openMenu() {
    hamburger.setAttribute('aria-expanded', 'true');
    menu.classList.add('is-open');
    if (overlay) overlay.classList.add('is-visible');
    body.classList.add('nav-open');
    const firstLink = menu.querySelector('a');
    if (firstLink) firstLink.focus();
  }

  function closeMenu() {
    hamburger.setAttribute('aria-expanded', 'false');
    menu.classList.remove('is-open');
    if (overlay) overlay.classList.remove('is-visible');
    body.classList.remove('nav-open');
    hamburger.focus();
  }

  function toggleMenu() {
    const isOpen = menu.classList.contains('is-open');
    isOpen ? closeMenu() : openMenu();
  }

  hamburger.addEventListener('click', toggleMenu);

  if (overlay) {
    overlay.addEventListener('click', closeMenu);
  }

  // Close on Escape
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && menu.classList.contains('is-open')) {
      closeMenu();
    }
  });

  // Close menu when a nav link is clicked (mobile)
  menu.querySelectorAll('a').forEach(function(link) {
    link.addEventListener('click', function() {
      if (menu.classList.contains('is-open')) {
        closeMenu();
      }
    });
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        history.pushState(null, '', targetId);
      }
    });
  });

  // Active nav item based on current page
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  menu.querySelectorAll('a').forEach(function(link) {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('is-active');
      link.setAttribute('aria-current', 'page');
    }
  });

  // --- Header scroll effect (glass → solid) ---
  let lastScroll = 0;
  window.addEventListener('scroll', function() {
    const scrollY = window.scrollY;
    if (header) {
      if (scrollY > 50) {
        header.classList.add('is-scrolled');
      } else {
        header.classList.remove('is-scrolled');
      }
    }
    lastScroll = scrollY;
  }, { passive: true });

  // --- Scroll reveal animations ---
  const fadeElements = document.querySelectorAll('.fade-in');
  if (fadeElements.length > 0 && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.08,
      rootMargin: '0px 0px -60px 0px'
    });

    fadeElements.forEach(function(el) {
      observer.observe(el);
    });
  }
})();
