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

  /* ---------- Header scroll state ---------- */
  const header = document.getElementById('header');
  if (header) {
    const onScroll = () => {
      header.classList.toggle('is-scrolled', window.scrollY > 12);
    };
    onScroll(); // Executa na carga inicial
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------- Mobile nav toggle ---------- */
  const navToggle = document.getElementById('navToggle');
  const nav = document.getElementById('nav');
  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('is-open');
      navToggle.classList.toggle('is-active', isOpen);
      document.body.classList.toggle('nav-open', isOpen);
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Fecha o menu ao clicar em um link (usando delegação de eventos)
    nav.addEventListener('click', (e) => {
      if (e.target.matches('.nav__link')) {
        nav.classList.remove('is-open');
        navToggle.classList.remove('is-active');
        document.body.classList.remove('nav-open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll('[data-reveal]');
  if (revealEls.length > 0) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealEls.forEach(el => {
      // Se o elemento tiver o atributo para animar os filhos, aplicamos o delay
      if (el.hasAttribute('data-reveal-children')) {
        Array.from(el.children).forEach((child, i) => {
          child.style.transitionDelay = `${i * 100}ms`;
        });
      }
      revealObserver.observe(el);
    });
  }

  /* ---------- FAQ Accordion ---------- */
  const accordionTriggers = document.querySelectorAll('.accordion__trigger');
  accordionTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const item = trigger.closest('.accordion__item');
      const wasOpen = item.classList.contains('is-open');
      item.parentElement.querySelectorAll('.accordion__item').forEach(i => i.classList.remove('is-open'));
      if (!wasOpen) item.classList.add('is-open');
    });
  });

  /* ---------- Contact form (front-end only placeholder) ---------- */
  const contactForm = document.getElementById('contactForm');
  const formNote = document.getElementById('formNote');
  if (contactForm && formNote) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const formData = new FormData(contactForm);
      const nome = formData.get('nome');
      const telefone = formData.get('telefone');
      const assunto = formData.get('assunto');
      const mensagem = formData.get('mensagem');
      const whatsappNumber = '5586988422265';

      const textoMensagem = `Olá! Vim pelo site e gostaria de uma simulação.

*Nome:* ${nome}
*Telefone:* ${telefone}
*Interesse em:* ${assunto}
*Mensagem:* ${mensagem || 'Nenhuma mensagem adicional.'}`;

      const urlWhatsapp = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(textoMensagem)}`;

      window.open(urlWhatsapp, '_blank');

      formNote.textContent = 'Abrindo o WhatsApp para você enviar a mensagem...';
      formNote.style.opacity = 1;
      formNote.style.color = 'var(--color-success, green)';
      contactForm.reset();
    });
  }

  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Typewriter effect for hero title ---------- */
  const typingTarget = document.querySelector('.hero h1 .typewriter-text');
  if (typingTarget && !prefersReducedMotion) {
    const originalHTML = typingTarget.innerHTML;
    const textContent = typingTarget.textContent;
    typingTarget.innerHTML = ''; // Limpa o conteúdo para começar a digitar
    typingTarget.classList.add('is-typing');

    let i = 0;
    const type = () => {
      if (i < textContent.length) {
        // Para preservar o HTML, digitamos o conteúdo de texto e no final restauramos o HTML original
        typingTarget.textContent += textContent.charAt(i);
        i++;
        const typingSpeed = 70 + Math.random() * 50;
        setTimeout(type, typingSpeed);
      } else {
        typingTarget.innerHTML = originalHTML; // Restaura o HTML para garantir a cor do highlight
        typingTarget.classList.remove('is-typing');
        typingTarget.classList.add('is-done-typing');
      }
    };

    // Adiciona um pequeno atraso antes de começar a digitar
    setTimeout(type, 800);
  }

  /* ---------- Cookie Consent Banner ---------- */
  const cookieBanner = document.getElementById('cookieBanner');
  const acceptCookiesBtn = document.getElementById('acceptCookies');

  if (cookieBanner && acceptCookiesBtn) {
    if (!localStorage.getItem('cookiesAccepted')) {
      setTimeout(() => {
        cookieBanner.classList.add('is-visible');
      }, 1500);
    }

    acceptCookiesBtn.addEventListener('click', () => {
      localStorage.setItem('cookiesAccepted', 'true');
      cookieBanner.classList.remove('is-visible');
    });
  }
});
