document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu toggle
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });

    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
      });
    });
  }

  // Scroll Reveal Animations using IntersectionObserver
  const revealElements = document.querySelectorAll('.reveal');
  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));
  }

  // 3D Coverflow Framework Carousel (Matching Reference Image)
  const coverflowCards = document.querySelectorAll('.coverflow-card');
  const cfPrev = document.getElementById('cf-prev');
  const cfNext = document.getElementById('cf-next');
  const cfDotsContainer = document.getElementById('cf-dots');
  const cfCounter = document.getElementById('cf-counter');

  if (coverflowCards.length > 0 && cfPrev && cfNext && cfDotsContainer) {
    let currentCFIndex = 0;
    const totalCFCards = coverflowCards.length;
    const cfBaseClasses = Array.from(coverflowCards).map(card => card.className);
    let cfAutoplayTimer = null;
    const cfAutoplayDelay = 3500;

    for (let i = 0; i < totalCFCards; i++) {
      const dot = document.createElement('div');
      dot.classList.add('coverflow-dot');
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => { goToCF(i); restartCFAutoplay(); });
      cfDotsContainer.appendChild(dot);
    }

    const cfDots = cfDotsContainer.querySelectorAll('.coverflow-dot');

    function updateCoverflow() {
      coverflowCards.forEach((card, index) => {
        card.className = cfBaseClasses[index];

        const diff = (index - currentCFIndex + totalCFCards) % totalCFCards;

        if (diff === 0) {
          card.classList.add('active');
        } else if (diff === 1) {
          card.classList.add('next-1');
        } else if (diff === 2) {
          card.classList.add('next-2');
        } else if (diff === totalCFCards - 1) {
          card.classList.add('prev-1');
        } else if (diff === totalCFCards - 2) {
          card.classList.add('prev-2');
        } else if (diff > 2 && diff < totalCFCards - 2) {
          if (diff < totalCFCards / 2) {
            card.classList.add('hidden-right');
          } else {
            card.classList.add('hidden-left');
          }
        }
      });

      cfDots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === currentCFIndex);
      });

      if (cfCounter) {
        const current = String(currentCFIndex + 1).padStart(2, '0');
        const total = String(totalCFCards).padStart(2, '0');
        cfCounter.textContent = `${current} of ${total}`;
      }
    }

    function goToCF(index) {
      currentCFIndex = index;
      updateCoverflow();
    }

    function startCFAutoplay() {
      if (cfAutoplayTimer) return;
      cfAutoplayTimer = setInterval(() => {
        currentCFIndex = (currentCFIndex + 1) % totalCFCards;
        updateCoverflow();
      }, cfAutoplayDelay);
    }

    function stopCFAutoplay() {
      clearInterval(cfAutoplayTimer);
      cfAutoplayTimer = null;
    }

    function restartCFAutoplay() {
      stopCFAutoplay();
      startCFAutoplay();
    }

    cfNext.addEventListener('click', () => {
      currentCFIndex = (currentCFIndex + 1) % totalCFCards;
      updateCoverflow();
      restartCFAutoplay();
    });

    cfPrev.addEventListener('click', () => {
      currentCFIndex = (currentCFIndex - 1 + totalCFCards) % totalCFCards;
      updateCoverflow();
      restartCFAutoplay();
    });

    coverflowCards.forEach((card, index) => {
      card.addEventListener('click', () => {
        goToCF(index);
        restartCFAutoplay();
      });
    });

    const cfStageEl = coverflowCards[0]?.closest('.coverflow-stage');
    if (cfStageEl) {
      cfStageEl.addEventListener('mouseenter', stopCFAutoplay);
      cfStageEl.addEventListener('mouseleave', startCFAutoplay);
    }

    updateCoverflow();
    startCFAutoplay();
  }

  // Redesigned Core Expertise Horizontal Accordion Matrix
  const matrixCards = document.querySelectorAll('.matrix-card');
  if (matrixCards.length > 0) {
    matrixCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        matrixCards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');
      });

      card.addEventListener('click', () => {
        matrixCards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');
      });
    });
  }

  // Mouse Spotlight Effect on Glass Cards
  const glassCards = document.querySelectorAll('.glass-card');
  glassCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  // Form Validation & Submission
  const contactForm = document.getElementById('contact-form');
  const formSuccess = document.getElementById('form-success');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      const fields = [
        { id: 'fullName' },
        { id: 'email', isEmail: true },
        { id: 'subject' },
        { id: 'message' }
      ];

      fields.forEach(field => {
        const input = document.getElementById(field.id);
        if (!input) return;
        const group = input.closest('.form-group');
        let fieldValid = true;

        if (!input.value.trim()) {
          fieldValid = false;
        } else if (field.isEmail) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(input.value.trim())) {
            fieldValid = false;
          }
        }

        if (!fieldValid) {
          group.classList.add('has-error');
          isValid = false;
        } else {
          group.classList.remove('has-error');
        }
      });

      if (isValid) {
        if (formSuccess) {
          formSuccess.classList.add('active');
        }
        contactForm.reset();
      }
    });
  }

  // 3D Flipping Card Tap/Click Toggle for Mobile/Touch
  const flipCards = document.querySelectorAll('.flip-card-inner');
  flipCards.forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('a')) return;
      card.classList.toggle('is-flipped');
    });
  });

  // Subtle Animated Micro Particle Canvas for Inner Hero Sections (.hero-compact)
  const heroCompact = document.querySelector('.hero-compact');
  if (heroCompact) {
    const canvas = document.createElement('canvas');
    canvas.className = 'hero-compact-canvas';
    heroCompact.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    let width = (canvas.width = heroCompact.offsetWidth);
    let height = (canvas.height = heroCompact.offsetHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = heroCompact.offsetWidth;
      height = canvas.height = heroCompact.offsetHeight;
    });

    const particles = Array.from({ length: 32 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.35 + 0.1,
      vy: -(Math.random() * 0.3 + 0.1),
      vx: (Math.random() - 0.5) * 0.2
    }));

    function animateParticles() {
      ctx.clearRect(0, 0, width, height);

      particles.forEach(p => {
        p.y += p.vy;
        p.x += p.vx;

        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(228, 228, 231, ${p.alpha})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = 'rgba(255, 255, 255, 0.4)';
        ctx.fill();
      });

      requestAnimationFrame(animateParticles);
    }

    animateParticles();
  }

  // 3D Perspective Flipping Books (Why BYC Page)
  const flipBookWrappers = document.querySelectorAll('.flip-book-wrapper');
  if (flipBookWrappers.length > 0) {
    flipBookWrappers.forEach(wrapper => {
      wrapper.addEventListener('click', () => {
        const isOpen = wrapper.classList.contains('is-open');
        flipBookWrappers.forEach(w => w.classList.remove('is-open'));
        if (!isOpen) {
          wrapper.classList.add('is-open');
        }
      });
    });
  }
});