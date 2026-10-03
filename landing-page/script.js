/**
 * NexusFlow - Interactive Landing Page Script
 * Features:
 * - Theme Switcher (Dark / Light mode with persistence)
 * - Mobile Navigation Drawer & Hamburger Animation
 * - Active Link ScrollSpy (IntersectionObserver)
 * - Pricing Billing Frequency Toggle (Monthly / Annual with 20% discount)
 * - Interactive Feature Tabs Switcher
 * - Form Validation & Toast Feedback
 * - Back to Top Button
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. THEME SWITCHER (DARK / LIGHT MODE)
  // --------------------------------------------------------------------------
  const themeToggleBtn = document.getElementById('theme-toggle');
  const rootHtml = document.documentElement;

  // Retrieve saved theme or evaluate system preference
  const savedTheme = localStorage.getItem('nexusflow_theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme) {
    rootHtml.setAttribute('data-theme', savedTheme);
  } else {
    rootHtml.setAttribute('data-theme', systemPrefersDark ? 'dark' : 'light');
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = rootHtml.getAttribute('data-theme');
      const targetTheme = currentTheme === 'dark' ? 'light' : 'dark';
      rootHtml.setAttribute('data-theme', targetTheme);
      localStorage.setItem('nexusflow_theme', targetTheme);
      showToast(`Switched to ${targetTheme === 'dark' ? 'Dark' : 'Light'} theme`);
    });
  }

  // --------------------------------------------------------------------------
  // 2. MOBILE HAMBURGER MENU & DRAWER
  // --------------------------------------------------------------------------
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const mobileNav = document.getElementById('mobile-nav');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link, .mobile-nav-btn');

  function toggleMobileMenu(forceClose = false) {
    if (!mobileNav || !hamburgerBtn) return;
    const isCurrentlyOpen = hamburgerBtn.classList.contains('active');
    const shouldOpen = forceClose ? false : !isCurrentlyOpen;

    hamburgerBtn.classList.toggle('active', shouldOpen);
    hamburgerBtn.setAttribute('aria-expanded', shouldOpen ? 'true' : 'false');
    mobileNav.classList.toggle('open', shouldOpen);
    mobileNav.setAttribute('aria-hidden', shouldOpen ? 'false' : 'true');

    // Prevent body scroll when mobile menu is open
    document.body.style.overflow = shouldOpen ? 'hidden' : '';
  }

  if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', () => toggleMobileMenu());
  }

  // Close mobile drawer when clicking any link
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => toggleMobileMenu(true));
  });

  // Close mobile menu on Escape key press
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && hamburgerBtn && hamburgerBtn.classList.contains('active')) {
      toggleMobileMenu(true);
    }
  });

  // --------------------------------------------------------------------------
  // 3. SCROLLSPY & ACTIVE NAV LINK HIGHLIGHTING
  // --------------------------------------------------------------------------
  const navLinks = document.querySelectorAll('.nav-desktop .nav-link');
  const sections = document.querySelectorAll('section[id], header[id]');

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          const href = link.getAttribute('href');
          if (href === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(sec => sectionObserver.observe(sec));

  // --------------------------------------------------------------------------
  // 4. INTERACTIVE FEATURE TABS SWITCHER
  // --------------------------------------------------------------------------
  const tabTriggers = document.querySelectorAll('.tab-trigger');
  const tabPanels = document.querySelectorAll('.tab-panel');

  tabTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      // Deactivate all tabs
      tabTriggers.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tabPanels.forEach(p => p.classList.remove('active'));

      // Activate selected tab & corresponding panel
      trigger.classList.add('active');
      trigger.setAttribute('aria-selected', 'true');
      const targetPanelId = trigger.getAttribute('aria-controls');
      const targetPanel = document.getElementById(targetPanelId);
      if (targetPanel) {
        targetPanel.classList.add('active');
      }
    });
  });

  // --------------------------------------------------------------------------
  // 5. PRICING BILLING SWITCH (MONTHLY / YEARLY)
  // --------------------------------------------------------------------------
  const billingSwitch = document.getElementById('billing-switch');
  const labelMonthly = document.querySelector('.billing-monthly');
  const labelYearly = document.querySelector('.billing-yearly');
  const priceAmounts = document.querySelectorAll('.price-amount');
  const annualNotices = document.querySelectorAll('.billed-annually-notice');

  let isYearly = false;

  function updatePricing() {
    priceAmounts.forEach(amountEl => {
      const monthlyVal = amountEl.getAttribute('data-monthly');
      const yearlyVal = amountEl.getAttribute('data-yearly');
      amountEl.textContent = isYearly ? yearlyVal : monthlyVal;
    });

    annualNotices.forEach(notice => {
      notice.style.display = isYearly ? 'block' : 'none';
    });

    if (billingSwitch) {
      billingSwitch.setAttribute('aria-checked', isYearly ? 'true' : 'false');
    }

    if (labelMonthly && labelYearly) {
      labelMonthly.classList.toggle('active', !isYearly);
      labelYearly.classList.toggle('active', isYearly);
    }
  }

  if (billingSwitch) {
    billingSwitch.addEventListener('click', () => {
      isYearly = !isYearly;
      updatePricing();
      showToast(`Pricing switched to ${isYearly ? 'Annual (20% Off)' : 'Monthly'}`);
    });
  }

  if (labelMonthly) {
    labelMonthly.addEventListener('click', () => {
      if (isYearly) {
        isYearly = false;
        updatePricing();
      }
    });
  }

  if (labelYearly) {
    labelYearly.addEventListener('click', () => {
      if (!isYearly) {
        isYearly = true;
        updatePricing();
      }
    });
  }

  // --------------------------------------------------------------------------
  // 6. LEAD FORM SUBMISSION & VALIDATION
  // --------------------------------------------------------------------------
  const leadForm = document.getElementById('lead-form');
  const emailInput = document.getElementById('user-email');
  const feedbackEl = document.getElementById('form-feedback');

  if (leadForm && emailInput && feedbackEl) {
    leadForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = emailInput.value.trim();

      // Simple email regex validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email || !emailRegex.test(email)) {
        feedbackEl.textContent = 'Please enter a valid work email address.';
        feedbackEl.className = 'form-feedback error';
        emailInput.focus();
        return;
      }

      // Success feedback
      feedbackEl.textContent = `Success! Instant trial invitation sent to ${email}.`;
      feedbackEl.className = 'form-feedback success';
      emailInput.value = '';
      showToast('Account created! Welcome to NexusFlow.');
    });
  }

  // Mini Newsletter Form
  const newsletterForm = document.getElementById('newsletter-form');
  const newsletterStatus = document.getElementById('newsletter-status');

  if (newsletterForm && newsletterStatus) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = newsletterForm.querySelector('input');
      if (input && input.value) {
        newsletterStatus.textContent = 'Subscribed! Check your inbox.';
        newsletterStatus.style.color = '#34D399';
        input.value = '';
        showToast('Subscribed to developer newsletter.');
      }
    });
  }

  // --------------------------------------------------------------------------
  // 7. FLOATING BACK TO TOP BUTTON
  // --------------------------------------------------------------------------
  const scrollTopBtn = document.getElementById('scroll-top-btn');

  window.addEventListener('scroll', () => {
    if (!scrollTopBtn) return;
    if (window.scrollY > 450) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  }, { passive: true });

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // --------------------------------------------------------------------------
  // 8. TOAST NOTIFICATION HELPER
  // --------------------------------------------------------------------------
  let toastTimeout;
  function showToast(message) {
    const toast = document.getElementById('toast-notification');
    const toastMsg = document.getElementById('toast-message');
    if (!toast || !toastMsg) return;

    toastMsg.textContent = message;
    toast.classList.add('active');

    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toast.classList.remove('active');
    }, 3500);
  }

  // --------------------------------------------------------------------------
  // 9. DYNAMIC FOOTER CURRENT YEAR
  // --------------------------------------------------------------------------
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});
