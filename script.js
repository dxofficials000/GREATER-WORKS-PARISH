// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function () {
  const toggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.mobile-menu');
  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      menu.classList.toggle('open');
    });
  }

  // Scroll reveal
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('in'); });
  }, { threshold: 0.15 });
  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

  // Particle field — moving specks of light across the hero (homepage only)
  try {
    const canvas = document.getElementById('particleField');
    if (canvas && canvas.getContext) {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const ctx = canvas.getContext('2d');
      const hero = canvas.closest('.hero');
      let particles = [];
      let w, h;

      function resize() {
        w = canvas.width = hero.offsetWidth || window.innerWidth;
        h = canvas.height = hero.offsetHeight || window.innerHeight;
      }
      resize();
      window.addEventListener('resize', resize);
      window.addEventListener('load', resize);

      const colors = ['rgba(232,199,102,0.9)', 'rgba(255,255,255,0.85)', 'rgba(150,190,255,0.7)'];
      const count = Math.min(70, Math.max(20, Math.floor((w * h) / 14000)));

      function makeParticle() {
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          r: Math.random() * 2 + 0.6,
          speedY: Math.random() * 0.4 + 0.15,
          driftX: (Math.random() - 0.5) * 0.3,
          color: colors[Math.floor(Math.random() * colors.length)],
          twinkle: Math.random() * Math.PI * 2,
        };
      }
      for (let i = 0; i < count; i++) particles.push(makeParticle());

      function draw() {
        ctx.clearRect(0, 0, w, h);
        particles.forEach((p) => {
          p.twinkle += 0.02;
          const alpha = 0.4 + Math.sin(p.twinkle) * 0.3;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = Math.max(0.1, alpha);
          ctx.fill();
          ctx.globalAlpha = 1;

          p.y -= p.speedY;
          p.x += p.driftX;
          if (p.y < -10) { p.y = h + 10; p.x = Math.random() * w; }
          if (p.x < -10) p.x = w + 10;
          if (p.x > w + 10) p.x = -10;
        });
      }

      if (prefersReducedMotion) {
        draw();
      } else {
        function loop() { draw(); requestAnimationFrame(loop); }
        loop();
      }
    }
  } catch (err) {
    console.warn('Particle animation skipped:', err);
  }

  // Gallery filter (only present on gallery page)
  const filterBtns = document.querySelectorAll('.gallery-filters button');
  const galleryItems = document.querySelectorAll('.gallery-item');
  filterBtns.forEach((btn) => {
    btn.addEventListener('click', function () {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      galleryItems.forEach((item) => {
        item.style.display = (filter === 'all' || item.dataset.type === filter) ? 'flex' : 'none';
      });
    });
  });
});
