document.addEventListener('DOMContentLoaded', () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Falling bills (hero ambient animation) ---------- */
  const billsFall = document.getElementById('billsFall');
  if (billsFall && !prefersReducedMotion) {
    const BILL_COUNT = 14;
    for (let i = 0; i < BILL_COUNT; i++) {
      const bill = document.createElement('div');
      bill.className = 'bill';
      const duration = 9 + Math.random() * 7; // 9s–16s
      const delay = -(Math.random() * duration); // negative delay = starts mid-fall
      bill.style.setProperty('--x', `${Math.random() * 100}%`);
      bill.style.setProperty('--dur', `${duration}s`);
      bill.style.setProperty('--delay', `${delay}s`);
      bill.style.setProperty('--drift', `${(Math.random() - 0.5) * 120}px`);
      bill.style.setProperty('--spin', `${180 + Math.random() * 360}deg`);
      bill.style.setProperty('--s', `${0.7 + Math.random() * 0.6}`);
      bill.style.setProperty('--o', `${0.1 + Math.random() * 0.14}`);
      bill.innerHTML = '<div class="bill__note">R$</div>';
      billsFall.appendChild(bill);
    }
  }

  /* ---------- Count-up numbers ---------- */
  function animateCount(el, target, { prefix = '', duration = 1400 } = {}) {
    if (prefersReducedMotion) {
      el.textContent = prefix + target.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      return;
    }
    const start = performance.now();
    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = target * eased;
      el.textContent = prefix + value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  const heroCounter = document.getElementById('heroCounter');
  if (heroCounter) {
    animateCount(heroCounter, 1250, { prefix: 'R$ ' });
  }

  /* ---------- Header scroll state ---------- */
  const header = document.getElementById('header');
  const onScroll = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 12);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Mobile nav toggle ---------- */
  const navToggle = document.getElementById('navToggle');
  const nav = document.getElementById('nav');
  navToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    navToggle.classList.toggle('is-active', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
  nav.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      navToggle.classList.remove('is-active');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll('[data-reveal]');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => revealObserver.observe(el));

  /* ---------- FAQ Accordion ---------- */
  document.querySelectorAll('.accordion__trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const item = trigger.closest('.accordion__item');
      const wasOpen = item.classList.contains('is-open');
      item.parentElement.querySelectorAll('.accordion__item').forEach(i => i.classList.remove('is-open'));
      if (!wasOpen) item.classList.add('is-open');
    });
  });

  /* ---------- Loan simulator ---------- */
  const valorInput = document.getElementById('valor');
  const parcelasInput = document.getElementById('parcelas');
  const valorOutput = document.getElementById('valorOutput');
  const parcelasOutput = document.getElementById('parcelasOutput');
  const resultadoParcela = document.getElementById('resultadoParcela');
  const simulatorCta = document.getElementById('simulatorCta');

  const formatBRL = (value) =>
    value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  function updateSimulator() {
    const valor = Number(valorInput.value);
    const parcelas = Number(parcelasInput.value);
    // Estimativa ilustrativa (taxa fictícia de referência ~1,8% a.m.)
    const taxaMensal = 0.018;
    const parcela = (valor * taxaMensal) / (1 - Math.pow(1 + taxaMensal, -parcelas));

    valorOutput.textContent = formatBRL(valor);
    parcelasOutput.textContent = `${parcelas}x`;
    resultadoParcela.textContent = `${formatBRL(parcela)} /mês`;
    if (!prefersReducedMotion) {
      resultadoParcela.classList.remove('is-pulsing');
      // eslint-disable-next-line no-unused-expressions
      resultadoParcela.offsetWidth; // restart animation
      resultadoParcela.classList.add('is-pulsing');
    }

    const msg = encodeURIComponent(
      `Olá! Simulei no site: valor de ${formatBRL(valor)} em ${parcelas}x (parcela estimada ${formatBRL(parcela)}). Quero continuar.`
    );
    simulatorCta.href = `https://wa.me/5586988422265?text=${msg}`;
  }

  if (valorInput && parcelasInput) {
    valorInput.addEventListener('input', updateSimulator);
    parcelasInput.addEventListener('input', updateSimulator);
    updateSimulator();
  }

  /* ---------- Contact form (front-end only placeholder) ---------- */
  const contactForm = document.getElementById('contactForm');
  const formNote = document.getElementById('formNote');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      // TODO: integrar com backend/serviço de e-mail (ex: Formspree, EmailJS) ou WhatsApp API.
      formNote.textContent = 'Mensagem recebida! Em breve um consultor entrará em contato.';
      contactForm.reset();
    });
  }

  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
