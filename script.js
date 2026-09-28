// ---- configuração de contato ----
const WHATSAPP = '554899088463';

const waUrl = (text) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`;

const serviceMessage = (service) => service
  ? `Olá, Bruna! Encontrei seu site e gostaria de saber mais sobre o serviço de ${service}.`
  : 'Olá, Bruna! Encontrei seu site e gostaria de conversar sobre um orçamento.';

// eventos para Google Tag Manager / Google Ads (ignorados se o GTM não estiver instalado)
window.dataLayer = window.dataLayer || [];
const track = (event, params = {}) => window.dataLayer.push({ event, ...params });

// ---- ano no rodapé ----
document.getElementById('ano').textContent = new Date().getFullYear();

// ---- links de WhatsApp com mensagem por serviço ----
document.querySelectorAll('[data-wa]').forEach(link => {
  const service = link.dataset.wa;
  link.href = waUrl(serviceMessage(service));
  link.addEventListener('click', () => track('whatsapp_click', { service: service || 'geral' }));
});

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

// ---- WhatsApp flutuante: escolha do serviço ----
const wa = document.getElementById('wa');
const waBtn = wa.querySelector('.wa__btn');
const waPanel = document.getElementById('wa-panel');

const setWaOpen = (open) => {
  waPanel.hidden = !open;
  waBtn.setAttribute('aria-expanded', String(open));
};

waBtn.addEventListener('click', () => setWaOpen(waPanel.hidden));
waPanel.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setWaOpen(false)));
document.addEventListener('click', (e) => { if (!wa.contains(e.target)) setWaOpen(false); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setWaOpen(false); });

// ---- formulário de orçamento → WhatsApp ----
const form = document.getElementById('orcamento');
const formError = form.querySelector('.quote-form__error');

const showError = (msg, field) => {
  formError.textContent = msg;
  formError.hidden = false;
  if (field) {
    field.setAttribute('aria-invalid', 'true');
    field.focus();
  }
};

form.addEventListener('input', (e) => {
  e.target.removeAttribute('aria-invalid');
  formError.hidden = true;
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const nome = data.get('nome').trim();
  const whatsapp = data.get('whatsapp').trim();
  const email = data.get('email').trim();
  const empresa = data.get('empresa').trim();
  const mensagem = data.get('mensagem').trim();
  const servicos = data.getAll('servico');

  if (!nome) return showError('Informe o seu nome.', form.elements.nome);
  if (whatsapp.replace(/\D/g, '').length < 10) return showError('Informe um WhatsApp válido, com DDD.', form.elements.whatsapp);
  if (email && !form.elements.email.checkValidity()) return showError('Confira o e-mail informado.', form.elements.email);
  if (!servicos.length) return showError('Escolha pelo menos um serviço.', form.querySelector('[name="servico"]'));

  const campos = [
    `*Nome:* ${nome}`,
    `*WhatsApp:* ${whatsapp}`,
    email && `*E-mail:* ${email}`,
    empresa && `*Empresa/Negócio:* ${empresa}`,
    `*Serviço(s):* ${servicos.join(', ')}`,
    mensagem && `*O que preciso:* ${mensagem}`,
  ].filter(Boolean);
  const texto = ['Olá, Bruna! Encontrei seu site e gostaria de solicitar um orçamento.', '', ...campos].join('\n');

  track('generate_lead', { form: 'orcamento', services: servicos.join(', ') });
  window.open(waUrl(texto), '_blank', 'noopener');
});

// ---- reveal on scroll ----
const targets = document.querySelectorAll(
  '.section .kicker, .section .h2, .pain__list, .about__portrait, .about__text > p, .about__cols, .about__badge, .service, .manifesto__photo, .chips--lg, .feature, .steps li, .hiring__photo, .formats, .accordion, .cta__sub, .contact-list, .quote-form'
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
