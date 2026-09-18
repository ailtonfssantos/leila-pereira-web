// Loading Screen
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loadingScreen').classList.add('hidden');
  }, 1500);
});

// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Mobile menu
function toggleMenu() {
  const toggle = document.getElementById('menuToggle');
  const menu = document.getElementById('mobileMenu');
  toggle.classList.toggle('active');
  menu.classList.toggle('active');
  document.body.style.overflow = menu.classList.contains('active') ? 'hidden' : '';
}

function closeMenu() {
  const toggle = document.getElementById('menuToggle');
  const menu = document.getElementById('mobileMenu');
  toggle.classList.remove('active');
  menu.classList.remove('active');
  document.body.style.overflow = '';
}

// Scroll animations
const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), index * 100);
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));

// Form submission - Integração WhatsApp com Leila Pereira
function handleFormSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const nombre = form.nombre.value;
  const telefono = form.telefono.value;
  const tratamiento = form.tratamiento.value;
  const ciudad = form.ciudad.value;
  const fecha = form.fecha.value;
  const mensaje = form.mensaje.value;

  // Mensagem personalizada para Leila Pereira
  let waMessage = `¡Hola Leila! 👋%0A%0AMe gustaría reservar una cita.%0A%0A`;
  waMessage += `*Nombre:* ${nombre}%0A`;
  waMessage += `*Teléfono:* ${telefono}%0A`;
  waMessage += `*Zona:* ${ciudad}%0A`;
  waMessage += `*Tratamiento:* ${tratamiento}%0A`;
  if (fecha) waMessage += `*Fecha preferida:* ${fecha}%0A`;
  if (mensaje) waMessage += `*Mensaje:* ${mensaje}%0A`;
  waMessage += `%0A¡Gracias!`;

  // Substitua pelo número real de Leila
  const whatsappNumber = '34602624342';
  window.open(`https://wa.me/${whatsappNumber}?text=${waMessage}`, '_blank');

  // Feedback visual
  const btn = form.querySelector('.form-submit');
  const originalText = btn.textContent;
  btn.textContent = '¡Solicitud Enviada! ✓';
  btn.style.background = '#25D366';
  setTimeout(() => {
    btn.textContent = originalText;
    btn.style.background = '';
    form.reset();
  }, 3000);
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Counter animation for hero stats
function animateCounters() {
  const counters = document.querySelectorAll('.hero-stat-number, .float-card-number, .accent-number');
  counters.forEach(counter => {
    const text = counter.textContent;
    const match = text.match(/(\d[\d.]*)/);
    if (match) {
      const target = parseFloat(match[1].replace('.', ''));
      const suffix = text.replace(match[1], '');
      const prefix = text.substring(0, text.indexOf(match[1]));
      let current = 0;
      const increment = target / 60;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          counter.textContent = text;
          clearInterval(timer);
        } else {
          const formatted = Math.floor(current).toLocaleString('es-ES');
          counter.textContent = prefix + formatted + suffix;
        }
      }, 30);
    }
  });
}

const heroObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      setTimeout(animateCounters, 800);
      heroObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const heroSection = document.querySelector('.hero');
if (heroSection) heroObserver.observe(heroSection);

// Panel de Preferencias de Cookies
document.getElementById('cookie-preferences')?.addEventListener('click', (e) => {
  e.preventDefault();
  window.location.href = 'legal/politica-cookies.html#gestion';
});

// Verificar consentimiento de cookies al cargar
document.addEventListener('DOMContentLoaded', () => {
  const consent = localStorage.getItem('cookie_consent');
  if (!consent) {
    // Mostrar banner de cookies (implementación básica)
    const banner = document.createElement('div');
    banner.innerHTML = `
      <div style="position: fixed; bottom: 0; left: 0; right: 0; background: var(--text-dark); color: white; padding: 16px 24px; z-index: 9999; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; font-size: 0.85rem;">
        <span>Este sitio utiliza cookies para mejorar su experiencia. <a href="legal/politica-cookies.html" style="color: var(--gold); text-decoration: none;">Más información</a></span>
        <div style="display: flex; gap: 8px;">
          <button id="cookie-reject" style="background: transparent; border: 1px solid rgba(255,255,255,0.3); color: white; padding: 8px 16px; border-radius: 6px; cursor: pointer;">Rechazar</button>
          <button id="cookie-accept" style="background: var(--gold); border: none; color: white; padding: 8px 16px; border-radius: 6px; cursor: pointer;">Aceptar</button>
        </div>
      </div>
    `;
    document.body.appendChild(banner);
    
    document.getElementById('cookie-accept').onclick = () => {
      localStorage.setItem('cookie_consent', 'accepted');
      banner.remove();
      // Aquí se cargarían las cookies analíticas
    };
    document.getElementById('cookie-reject').onclick = () => {
      localStorage.setItem('cookie_consent', 'rejected');
      banner.remove();
      // Solo cookies técnicas
    };
  }
});