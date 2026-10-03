/**
 * Personal Portfolio Website - Interactive Scripts
 * Handles Theme Toggling, Mobile Navigation, Project Filtering,
 * and Contact Form Validation.
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initMobileMenu();
  initActiveNavOnScroll();
  initProjectFilters();
  initContactForm();
  initScrollToTop();
  updateFooterYear();
});

/* ==========================================================================
   1. Theme Toggle (Dark / Light Mode)
   ========================================================================== */
function initTheme() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const root = document.documentElement;

  // Retrieve saved theme or fallback to user preference or default 'dark'
  const savedTheme = localStorage.getItem('portfolio-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');

  root.setAttribute('data-theme', initialTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = root.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      root.setAttribute('data-theme', newTheme);
      localStorage.setItem('portfolio-theme', newTheme);
    });
  }
}

/* ==========================================================================
   2. Mobile Hamburger Navigation
   ========================================================================== */
function initMobileMenu() {
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!menuToggle || !navMenu) return;

  function toggleMenu() {
    const isOpen = navMenu.classList.contains('open');
    menuToggle.classList.toggle('open', !isOpen);
    navMenu.classList.toggle('open', !isOpen);
    menuToggle.setAttribute('aria-expanded', String(!isOpen));
  }

  function closeMenu() {
    menuToggle.classList.remove('open');
    navMenu.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  }

  menuToggle.addEventListener('click', toggleMenu);

  // Close when clicking any nav link
  navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close when clicking outside of nav menu
  document.addEventListener('click', (event) => {
    if (
      navMenu.classList.contains('open') &&
      !navMenu.contains(event.target) &&
      !menuToggle.contains(event.target)
    ) {
      closeMenu();
    }
  });
}

/* ==========================================================================
   3. Active Navigation Link Highlighting on Scroll
   ========================================================================== */
function initActiveNavOnScroll() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function updateActiveLink() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink, { passive: true });
  updateActiveLink();
}

/* ==========================================================================
   4. Projects Filter
   ========================================================================== */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (!filterBtns.length || !projectCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active state on buttons
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const categories = (card.getAttribute('data-category') || '').split(' ');
        
        if (filterValue === 'all' || categories.includes(filterValue)) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.4s ease';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   5. Contact Form Validation & Submission Feedback
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const alertBox = document.getElementById('form-alert');
  const alertMsg = document.getElementById('form-alert-msg');

  if (!form) return;

  const fields = {
    name: {
      input: document.getElementById('name'),
      error: document.getElementById('name-error'),
      validate: val => val.trim().length >= 2
    },
    email: {
      input: document.getElementById('email'),
      error: document.getElementById('email-error'),
      validate: val => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim())
    },
    subject: {
      input: document.getElementById('subject'),
      error: document.getElementById('subject-error'),
      validate: val => val.trim().length >= 3
    },
    message: {
      input: document.getElementById('message'),
      error: document.getElementById('message-error'),
      validate: val => val.trim().length >= 10
    }
  };

  // Add real-time input event listeners to clear errors on typing
  Object.values(fields).forEach(({ input, error, validate }) => {
    if (!input || !error) return;

    input.addEventListener('input', () => {
      if (validate(input.value)) {
        input.classList.remove('error');
        error.classList.remove('visible');
      }
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let hasError = false;

    // Validate each field
    Object.values(fields).forEach(({ input, error, validate }) => {
      if (!input || !error) return;

      if (!validate(input.value)) {
        input.classList.add('error');
        error.classList.add('visible');
        hasError = true;
      } else {
        input.classList.remove('error');
        error.classList.remove('visible');
      }
    });

    if (hasError) return;

    if (alertBox && alertMsg) {
      alertMsg.textContent = 'This demo form does not send or store messages. Connect a form service before publishing.';
      alertBox.style.display = 'flex';
    }
  });
}

/* ==========================================================================
   6. Scroll To Top Button
   ========================================================================== */
function initScrollToTop() {
  const scrollTopBtn = document.getElementById('scroll-top-btn');
  if (!scrollTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  }, { passive: true });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* ==========================================================================
   7. Footer Year
   ========================================================================== */
function updateFooterYear() {
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}
