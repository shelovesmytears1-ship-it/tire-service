/* ============================================================
   TireForce Pro — script.js
   Vanilla JS: Nav, Mobile Menu, IntersectionObserver reveals,
   Countdown Timer, Progressive Form, Validation
   ============================================================ */

(function () {
  'use strict';

  /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
     1. DOM REFERENCES
     ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  const siteNav    = document.getElementById('site-nav');
  const navBurger  = document.getElementById('nav-burger');
  const mobileMenu = document.getElementById('mobile-menu');
  const navLinks   = document.querySelectorAll('.nav-link');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link, .mobile-nav-cta');

  /* Timer */
  const timerDays    = document.getElementById('timer-days');
  const timerHours   = document.getElementById('timer-hours');
  const timerMinutes = document.getElementById('timer-minutes');
  const timerSeconds = document.getElementById('timer-seconds');

  /* Form */
  const bookingForm  = document.getElementById('booking-form');
  const formStep1    = document.getElementById('form-step-1');
  const formStep2    = document.getElementById('form-step-2');
  const formStep3    = document.getElementById('form-step-3');
  const formSuccess  = document.getElementById('form-success');

  const clientName   = document.getElementById('client-name');
  const clientPhone  = document.getElementById('client-phone');
  const vehicleType  = document.getElementById('vehicle-type');
  const serviceType  = document.getElementById('service-type');
  const bookingDate  = document.getElementById('booking-date');
  const bookingTime  = document.getElementById('booking-time');

  /* Section anchors for active nav */
  const sections = document.querySelectorAll('section[id]');

  /* All reveal elements */
  const revealEls = document.querySelectorAll('.reveal-el');

  /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
     2. NAVIGATION — SCROLL + ACTIVE LINKS
     ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  function handleNavScroll() {
    if (window.scrollY > 40) {
      siteNav.classList.add('nav-scrolled');
    } else {
      siteNav.classList.remove('nav-scrolled');
    }
  }

  function updateActiveNavLink() {
    let currentId = '';
    sections.forEach(function (section) {
      const sectionTop    = section.offsetTop - 120;
      const sectionBottom = sectionTop + section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach(function (link) {
      const href = link.getAttribute('href').replace('#', '');
      if (href === currentId) {
        link.classList.add('is-active');
        link.setAttribute('aria-current', 'true');
      } else {
        link.classList.remove('is-active');
        link.removeAttribute('aria-current');
      }
    });
  }

  window.addEventListener('scroll', function () {
    handleNavScroll();
    updateActiveNavLink();
  }, { passive: true });

  handleNavScroll();
  updateActiveNavLink();

  /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
     3. MOBILE MENU
     ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  var menuIsOpen = false;

  function openMenu() {
    menuIsOpen = true;
    mobileMenu.hidden = false;
    /* rAF to allow display to take effect before class triggers transition */
    requestAnimationFrame(function () {
      mobileMenu.classList.add('is-open');
    });
    navBurger.setAttribute('aria-expanded', 'true');
    navBurger.setAttribute('aria-label', 'Zamknij menu');
    document.body.style.overflow = 'hidden';
    document.body.classList.add('menu-open');
    /* Move focus to first link */
    var firstLink = mobileMenu.querySelector('a, button');
    if (firstLink) {
      firstLink.focus();
    }
  }

  function closeMenu() {
    menuIsOpen = false;
    mobileMenu.classList.remove('is-open');
    navBurger.setAttribute('aria-expanded', 'false');
    navBurger.setAttribute('aria-label', 'Otwórz menu');
    document.body.style.overflow = '';
    document.body.classList.remove('menu-open');
    /* Hide after transition */
    var TRANSITION_DURATION = 350;
    setTimeout(function () {
      if (!menuIsOpen) {
        mobileMenu.hidden = true;
      }
    }, TRANSITION_DURATION);
    navBurger.focus();
  }

  navBurger.addEventListener('click', function () {
    if (menuIsOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  /* Close on ESC */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && menuIsOpen) {
      closeMenu();
    }
  });

  /* Close on mobile link click */
  mobileNavLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      closeMenu();
    });
  });

  /* Close on overlay click (outside nav) */
  mobileMenu.addEventListener('click', function (e) {
    if (e.target === mobileMenu) {
      closeMenu();
    }
  });

  /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
     4. INTERSECTION OBSERVER — REVEAL ELEMENTS
     ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    revealEls.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    /* Reduced motion or no IO support: show everything */
    revealEls.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
     5. COUNTDOWN TIMER
     ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  function getEndOfMonth() {
    var now  = new Date();
    var year = now.getFullYear();
    var month = now.getMonth();
    /* Last moment of current month, Warsaw timezone offset approx UTC+1/UTC+2 */
    var end = new Date(year, month + 1, 0, 23, 59, 59, 999);
    return end;
  }

  function pad(n) {
    return String(n).padStart(2, '0');
  }

  function updateTimer() {
    var now  = Date.now();
    var end  = getEndOfMonth().getTime();
    var diff = end - now;

    if (diff <= 0) {
      /* Month rolled over — recalculate for new month */
      diff = getEndOfMonth().getTime() - Date.now();
    }

    var totalSeconds = Math.floor(diff / 1000);
    var days    = Math.floor(totalSeconds / 86400);
    var hours   = Math.floor((totalSeconds % 86400) / 3600);
    var minutes = Math.floor((totalSeconds % 3600) / 60);
    var seconds = totalSeconds % 60;

    if (timerDays)    timerDays.textContent    = pad(days);
    if (timerHours)   timerHours.textContent   = pad(hours);
    if (timerMinutes) timerMinutes.textContent = pad(minutes);
    if (timerSeconds) timerSeconds.textContent = pad(seconds);
  }

  if (timerDays && timerHours && timerMinutes && timerSeconds) {
    updateTimer();
    setInterval(updateTimer, 1000);
  }

  /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
     6. BOOKING FORM — MIN DATE
     ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  if (bookingDate) {
    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    var yyyy = tomorrow.getFullYear();
    var mm   = pad(tomorrow.getMonth() + 1);
    var dd   = pad(tomorrow.getDate());
    bookingDate.setAttribute('min', yyyy + '-' + mm + '-' + dd);
  }

  /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
     7. FORM VALIDATION HELPERS
     ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  function showError(inputEl, errorElId, message) {
    var errorEl = document.getElementById(errorElId);
    inputEl.classList.add('has-error');
    if (errorEl) {
      errorEl.textContent = message;
    }
  }

  function clearError(inputEl, errorElId) {
    var errorEl = document.getElementById(errorElId);
    inputEl.classList.remove('has-error');
    if (errorEl) {
      errorEl.textContent = '';
    }
  }

  function validateName(value) {
    if (!value || value.trim().length < 2) {
      return 'Podaj imię (minimum 2 znaki).';
    }
    return '';
  }

  function validatePhone(value) {
    /* Accept formats: +48XXXXXXXXX, 0XXXXXXXXX, XXXXXXXXX (9 digits), spaces/dashes allowed */
    var cleaned = value.replace(/[\s\-\(\)]/g, '');
    var pattern = /^(\+48)?[0-9]{9}$/;
    if (!value || !pattern.test(cleaned)) {
      return 'Podaj poprawny numer telefonu (9 cyfr).';
    }
    return '';
  }

  function validateRequired(value, fieldName) {
    if (!value || value === '') {
      return 'Pole "' + fieldName + '" jest wymagane.';
    }
    return '';
  }

  /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
     8. PROGRESSIVE DISCLOSURE
     ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  var step2Revealed = false;
  var step3Revealed = false;

  function revealStep(stepEl) {
    if (!stepEl) return;
    stepEl.classList.remove('form-step--hidden');
    stepEl.classList.add('form-step--visible');
    stepEl.removeAttribute('aria-hidden');
  }

  function checkStep1Complete() {
    if (step2Revealed) return;
    var nameVal  = clientName  ? clientName.value.trim()  : '';
    var phoneVal = clientPhone ? clientPhone.value.trim() : '';
    var nameOk  = validateName(nameVal)    === '';
    var phoneOk = validatePhone(phoneVal)  === '';
    if (nameOk && phoneOk) {
      step2Revealed = true;
      revealStep(formStep2);
    }
  }

  function checkStep2Complete() {
    if (step3Revealed) return;
    var vehicleVal = vehicleType ? vehicleType.value : '';
    var serviceVal = serviceType ? serviceType.value : '';
    if (vehicleVal && serviceVal) {
      step3Revealed = true;
      revealStep(formStep3);
    }
  }

  /* Listen for changes on step 1 inputs */
  if (clientName) {
    clientName.addEventListener('blur', function () {
      var err = validateName(clientName.value.trim());
      if (err) {
        showError(clientName, 'client-name-error', err);
      } else {
        clearError(clientName, 'client-name-error');
        checkStep1Complete();
      }
    });

    clientName.addEventListener('input', function () {
      if (clientName.classList.contains('has-error') && validateName(clientName.value.trim()) === '') {
        clearError(clientName, 'client-name-error');
        checkStep1Complete();
      }
    });
  }

  if (clientPhone) {
    clientPhone.addEventListener('blur', function () {
      var err = validatePhone(clientPhone.value.trim());
      if (err) {
        showError(clientPhone, 'client-phone-error', err);
      } else {
        clearError(clientPhone, 'client-phone-error');
        checkStep1Complete();
      }
    });

    clientPhone.addEventListener('input', function () {
      if (clientPhone.classList.contains('has-error') && validatePhone(clientPhone.value.trim()) === '') {
        clearError(clientPhone, 'client-phone-error');
        checkStep1Complete();
      }
    });
  }

  /* Listen for changes on step 2 selects */
  if (vehicleType) {
    vehicleType.addEventListener('change', function () {
      clearError(vehicleType, 'vehicle-type-error');
      checkStep2Complete();
    });
  }

  if (serviceType) {
    serviceType.addEventListener('change', function () {
      clearError(serviceType, 'service-type-error');
      checkStep2Complete();
    });
  }

  /* Listen for changes on step 3 */
  if (bookingDate) {
    bookingDate.addEventListener('change', function () {
      clearError(bookingDate, 'booking-date-error');
    });
    bookingDate.addEventListener('blur', function () {
      var err = validateRequired(bookingDate.value, 'Data');
      if (err) showError(bookingDate, 'booking-date-error', err);
      else     clearError(bookingDate, 'booking-date-error');
    });
  }

  if (bookingTime) {
    bookingTime.addEventListener('change', function () {
      clearError(bookingTime, 'booking-time-error');
    });
    bookingTime.addEventListener('blur', function () {
      var err = validateRequired(bookingTime.value, 'Godzina');
      if (err) showError(bookingTime, 'booking-time-error', err);
      else     clearError(bookingTime, 'booking-time-error');
    });
  }

  /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
     9. FORM SUBMISSION
     ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  if (bookingForm) {
    bookingForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var isValid = true;

      /* Validate all fields */
      var nameErr = validateName(clientName ? clientName.value.trim() : '');
      if (nameErr) {
        showError(clientName, 'client-name-error', nameErr);
        isValid = false;
      }

      var phoneErr = validatePhone(clientPhone ? clientPhone.value.trim() : '');
      if (phoneErr) {
        showError(clientPhone, 'client-phone-error', phoneErr);
        isValid = false;
      }

      if (!vehicleType || !vehicleType.value) {
        showError(vehicleType, 'vehicle-type-error', 'Wybierz typ pojazdu.');
        isValid = false;
      }

      if (!serviceType || !serviceType.value) {
        showError(serviceType, 'service-type-error', 'Wybierz usługę.');
        isValid = false;
      }

      if (!bookingDate || !bookingDate.value) {
        showError(bookingDate, 'booking-date-error', 'Wybierz datę wizyty.');
        isValid = false;
      }

      if (!bookingTime || !bookingTime.value) {
        showError(bookingTime, 'booking-time-error', 'Wybierz godzinę wizyty.');
        isValid = false;
      }

      if (!isValid) {
        /* Focus first error field */
        var firstError = bookingForm.querySelector('.has-error');
        if (firstError) {
          firstError.focus();
        }
        return;
      }

      /* All valid — show success */
      bookingForm.querySelectorAll('.form-step').forEach(function (step) {
        step.style.display = 'none';
      });

      if (formSuccess) {
        formSuccess.hidden = false;
        formSuccess.focus();

        /* Smooth scroll to success */
        formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  }

  /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
     10. SMOOTH SCROLL POLYFILL (anchor clicks)
     ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;
      var targetEl = document.querySelector(targetId);
      if (!targetEl) return;

      e.preventDefault();
      var navHeight = siteNav ? siteNav.offsetHeight : 80;
      var targetTop = targetEl.getBoundingClientRect().top + window.pageYOffset - navHeight - 16;

      window.scrollTo({
        top: targetTop,
        behavior: 'smooth'
      });

      /* Re-close mobile menu if open */
      if (menuIsOpen) {
        closeMenu();
      }
    });
  });

  /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
     11. TRAP FOCUS IN MOBILE MENU
     ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  document.addEventListener('keydown', function (e) {
    if (!menuIsOpen || e.key !== 'Tab') return;

    var focusableEls = Array.from(
      mobileMenu.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')
    );

    if (focusableEls.length === 0) return;

    var firstFocusable = focusableEls[0];
    var lastFocusable  = focusableEls[focusableEls.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === firstFocusable) {
        e.preventDefault();
        lastFocusable.focus();
      }
    } else {
      if (document.activeElement === lastFocusable) {
        e.preventDefault();
        firstFocusable.focus();
      }
    }
  });

}());
