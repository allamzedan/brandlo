const EMAIL_ADDRESS = 'domains@mazajcontent.com';

function injectStructuredData() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Ervlo.com',
    description: 'Premium 5-letter .com brandable domain available for acquisition. Ideal for tech, AI, fintech, or consumer brand startups.',
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: 'Mazaj Content',
        email: EMAIL_ADDRESS
      }
    }
  };

  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(structuredData);
  document.head.appendChild(script);
}

function showToast() {
  const toast = document.getElementById('toast');

  if (!toast) return;

  toast.classList.add('show');

  window.setTimeout(() => {
    toast.classList.remove('show');
  }, 2800);
}

function copyEmail(email) {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(email).then(showToast).catch(() => {
      fallbackCopyEmail(email);
    });

    return;
  }

  fallbackCopyEmail(email);
}

function fallbackCopyEmail(email) {
  const textarea = document.createElement('textarea');
  textarea.value = email;
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'absolute';
  textarea.style.left = '-9999px';

  document.body.appendChild(textarea);
  textarea.select();

  try {
    document.execCommand('copy');
    showToast();
  } finally {
    document.body.removeChild(textarea);
  }
}

function initCopyButtons() {
  document.querySelectorAll('[data-copy-email]').forEach((button) => {
    button.addEventListener('click', () => {
      copyEmail(button.dataset.copyEmail || EMAIL_ADDRESS);
    });
  });
}

function initFadeUpAnimations() {
  const fadeElements = document.querySelectorAll('.fade-up');

  if (!('IntersectionObserver' in window)) {
    fadeElements.forEach((element) => element.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.12 });

  fadeElements.forEach((element) => observer.observe(element));
  document.querySelectorAll('#hero .fade-up').forEach((element) => element.classList.add('visible'));
}

function initNavShrink() {
  const nav = document.querySelector('nav');

  if (!nav) return;

  const setNavPadding = () => {
    if (window.scrollY > 50) {
      nav.style.padding = window.innerWidth <= 900 ? '12px 24px' : '12px 40px';
    } else {
      nav.style.padding = window.innerWidth <= 900 ? '16px 24px' : '20px 40px';
    }
  };

  setNavPadding();

  window.addEventListener('scroll', setNavPadding, { passive: true });
  window.addEventListener('resize', setNavPadding);
}

function initMobileNav() {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');

  if (!toggle || !links) return;

  const closeMenu = () => {
    toggle.setAttribute('aria-expanded', 'false');
    links.classList.remove('is-open');
  };

  toggle.addEventListener('click', () => {
    const isExpanded = toggle.getAttribute('aria-expanded') === 'true';

    toggle.setAttribute('aria-expanded', String(!isExpanded));
    links.classList.toggle('is-open', !isExpanded);
  });

  links.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) closeMenu();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  injectStructuredData();
  initCopyButtons();
  initFadeUpAnimations();
  initNavShrink();
  initMobileNav();
});