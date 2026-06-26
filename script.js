// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// Hamburger menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  hamburger.textContent = navLinks.classList.contains('open') ? '✕' : '☰';
});
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.textContent = '☰';
  });
});

// Scroll animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.fade-up, .service-card').forEach(el => {
  if (el.classList.contains('service-card')) {
    const delay = el.dataset.delay || 0;
    el.style.transitionDelay = delay + 'ms';
  }
  observer.observe(el);
});

// Add fade-up to sections
document.querySelectorAll('.section-header, .why-text, .why-image, .contact-info, .contact-form-wrap, .brand-item, .gallery-item').forEach(el => {
  el.classList.add('fade-up');
  observer.observe(el);
});

// Form submit -> WhatsApp
function handleSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const inputs = form.querySelectorAll('input, select, textarea');
  const [ad, tel, arac, konu, mesaj] = Array.from(inputs).map(i => i.value.trim());

  const text =
    `*Vastam Garage – Görüş/Şikayet*\n` +
    `\n👤 *Ad Soyad:* ${ad || '-'}` +
    `\n📞 *Telefon:* ${tel || '-'}` +
    `\n🚗 *Araç:* ${arac || '-'}` +
    `\n📌 *Konu:* ${konu || '-'}` +
    `\n\n💬 *Mesaj:*\n${mesaj || '-'}`;

  const url = `https://wa.me/905346507085?text=${encodeURIComponent(text)}`;
  window.open(url, '_blank', 'noopener');

  const btn = form.querySelector('button[type="submit"]');
  const original = btn.textContent;
  btn.textContent = 'WhatsApp\'a yönlendiriliyor... ✓';
  btn.style.background = '#25D366';
  setTimeout(() => {
    btn.textContent = original;
    btn.style.background = '';
    form.reset();
  }, 2500);
}

// Smooth active nav highlighting
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 100) current = s.id;
  });
  navLinks.querySelectorAll('a').forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + current ? 'var(--red)' : '';
  });
}, { passive: true });
