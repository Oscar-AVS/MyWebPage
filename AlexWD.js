/* ============================================================
   main.js — Portfolio Alexander Vilchis
   ============================================================ */

// ── NAV: shadow + active link on scroll ──────────────────────
const nav      = document.getElementById('nav');
const sections = document.querySelectorAll('[id]');
const navLinks = document.querySelectorAll('.nav-links a[data-section]');

function updateNav() {
  // scrolled class
  nav.classList.toggle('scrolled', window.scrollY > 20);

  // active link
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 140) current = sec.id;
  });
  navLinks.forEach(a => {
    a.classList.toggle('active', a.dataset.section === current);
  });
}

window.addEventListener('scroll', updateNav, { passive: true });
updateNav();

// ── HAMBURGER MENU ───────────────────────────────────────────
const menuBtn  = document.getElementById('menuBtn');
const navMenu  = document.getElementById('navLinks');

menuBtn.addEventListener('click', () => {
  const isOpen = navMenu.classList.toggle('open');
  menuBtn.classList.toggle('open', isOpen);
  menuBtn.setAttribute('aria-expanded', String(isOpen));
});

navMenu.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => {
    navMenu.classList.remove('open');
    menuBtn.classList.remove('open');
  })
);

// ── SCROLL REVEAL ─────────────────────────────────────────────
const reveals = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('in'), i * 55);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

reveals.forEach(el => revealObserver.observe(el));

// ── COUNTER ANIMATION (SpeedUp CUDA) ─────────────────────────
const cudaEl = document.getElementById('cudaCounter');

function animateCounter(el, target, duration = 1400) {
  const start    = performance.now();
  const update   = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased    = 1 - Math.pow(1 - progress, 3);  // ease-out cubic
    el.textContent = (eased * target).toFixed(2) + '×';
    if (progress < 1) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}

// Only start counting when the stat card enters view
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(cudaEl, 30.35);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

if (cudaEl) counterObserver.observe(cudaEl);

// ── CONTACT FORM ──────────────────────────────────────────────
const form     = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name  = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const msg   = document.getElementById('msg').value.trim();

    if (!name || !email || !msg) {
      formNote.textContent = '// completa todos los campos';
      formNote.style.color = '#f87171';
      return;
    }

    // Aquí conectarías tu propio backend o servicio (Resend, EmailJS, etc.)
    formNote.textContent = `// mensaje recibido, gracias ${name}!`;
    formNote.style.color = 'var(--accent)';
    form.reset();

    setTimeout(() => { formNote.textContent = ''; }, 5000);
  });
}
