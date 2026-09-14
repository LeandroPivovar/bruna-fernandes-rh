// ---- ano no rodapé ----
document.getElementById('ano').textContent = new Date().getFullYear();

// ---- menu mobile ----
const toggle = document.querySelector('.nav__toggle');
const menu = document.getElementById('menu-mobile');

toggle.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') === 'true';
  toggle.setAttribute('aria-expanded', String(!open));
  toggle.setAttribute('aria-label', open ? 'Abrir menu' : 'Fechar menu');
  menu.hidden = open;
});

menu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    menu.hidden = true;
    toggle.setAttribute('aria-expanded', 'false');
  });
});

// ---- reveal on scroll ----
const targets = document.querySelectorAll(
  '.section .kicker, .section .h2, .pain__list, .about__portrait, .about__text > p, .ticks, .card, .steps li, .stat, .quote, .who__item, .accordion, .cta__sub, .cta__actions, .cta__meta'
);

targets.forEach(el => el.classList.add('reveal'));

const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('is-in');
    io.unobserve(entry.target);
  });
}, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });

targets.forEach((el, i) => {
  el.style.transitionDelay = `${(i % 4) * 90}ms`;
  io.observe(el);
});

// ---- accordion: um aberto por vez ----
const items = document.querySelectorAll('.accordion details');
items.forEach(d => {
  d.addEventListener('toggle', () => {
    if (!d.open) return;
    items.forEach(other => { if (other !== d) other.open = false; });
  });
});
