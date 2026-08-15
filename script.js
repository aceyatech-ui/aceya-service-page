/* ============================================================
   ACEYA SYSTEMS — Script
   ============================================================ */

// Progressive enhancement: add .js class to html
document.documentElement.classList.add('js');

document.addEventListener('DOMContentLoaded', function () {
  const burger = document.getElementById('navBurger');
  const navLinks = document.getElementById('navLinks');
  const revealElements = document.querySelectorAll('.reveal');

  // ---------- NAV ----------

  if (burger && navLinks) {
    function closeMenu() {
      navLinks.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
      burger.setAttribute('aria-label', 'Open navigation');
    }

    function openMenu() {
      navLinks.classList.add('open');
      burger.setAttribute('aria-expanded', 'true');
      burger.setAttribute('aria-label', 'Close navigation');
    }

    // Toggle menu
    burger.addEventListener('click', function () {
      const isOpen = navLinks.classList.contains('open');

      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        closeMenu();
      });
    });

    // Close menu with Escape
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && navLinks.classList.contains('open')) {
        closeMenu();
        burger.focus();
      }
    });

    // Close mobile menu when resizing back to desktop
    window.addEventListener('resize', function () {
      if (window.innerWidth > 768) {
        closeMenu();
      }
    });
  }

  // ---------- REVEAL ANIMATIONS ----------

  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  // Show everything immediately for reduced-motion users
  if (prefersReducedMotion) {
    revealElements.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  // Use IntersectionObserver when supported
  else if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1
      }
    );

    revealElements.forEach(function (el) {
      observer.observe(el);
    });
  }

  // Fallback for older browsers
  else {
    revealElements.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }
});