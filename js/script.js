function initFooterParticles(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let particles = [];
  const particleCount = 80;
  let mouseX = 0,
    mouseY = 0;

  function resize() {
    const container = canvas.parentElement;
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
  }

  function createParticles() {
    particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 4 + 2,
        baseRadius: Math.random() * 4 + 2,
        speedX: (Math.random() - 0.5) * 0.2,
        speedY: (Math.random() - 0.5) * 0.2,
        opacity: Math.random() * 0.4 + 0.2,
        color: `hsla(${85 + Math.random() * 30}, 70%, 60%, ${Math.random() * 0.3 + 0.2})`,
        pulse: Math.random() * Math.PI * 2,
      });
    }
  }

  function update() {
    particles.forEach((p) => {
      let dx = p.x - mouseX;
      let dy = p.y - mouseY;
      let distance = Math.sqrt(dx * dx + dy * dy);
      const maxDistance = 100;
      if (
        distance < maxDistance &&
        mouseX > 0 &&
        mouseY > 0 &&
        mouseX < canvas.width &&
        mouseY < canvas.height
      ) {
        let force = (maxDistance - distance) / maxDistance;
        let angle = Math.atan2(dy, dx);
        p.speedX += Math.cos(angle) * force * 0.1;
        p.speedY += Math.sin(angle) * force * 0.1;
      }
      p.x += p.speedX;
      p.y += p.speedY;
      p.speedX *= 0.98;
      p.speedY *= 0.98;
      p.pulse += 0.02;
      p.radius = p.baseRadius + Math.sin(p.pulse) * 0.5;

      if (p.x < -50) p.x = canvas.width + 50;
      if (p.x > canvas.width + 50) p.x = -50;
      if (p.y < -50) p.y = canvas.height + 50;
      if (p.y > canvas.height + 50) p.y = -50;
    });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 70) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          const gradient = ctx.createLinearGradient(
            particles[i].x,
            particles[i].y,
            particles[j].x,
            particles[j].y,
          );
          gradient.addColorStop(
            0,
            `rgba(104, 143, 78, ${0.06 * (1 - distance / 70)})`,
          );
          gradient.addColorStop(
            1,
            `rgba(177, 209, 130, ${0.06 * (1 - distance / 70)})`,
          );
          ctx.strokeStyle = gradient;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    particles.forEach((p) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.shadowBlur = 8;
      ctx.shadowColor = `rgba(104, 143, 78, 0.6)`;
      ctx.fill();
      ctx.shadowBlur = 0;
    });
  }

  function animate() {
    update();
    draw();
    requestAnimationFrame(animate);
  }

  window.addEventListener("mousemove", (e) => {
    const rect = canvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
  });

  window.addEventListener("resize", () => {
    resize();
    createParticles();
  });

  resize();
  createParticles();
  animate();
}

function initHeroParallax() {
  const element = document.querySelector(".hero-parallax-image");
  if (!element) return;

  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;
    element.style.transform = `translateY(${scrolled * 0.1}px)`;
  });
}

function initTiltEffect(elements) {
  elements.forEach((el) => {
    el.addEventListener("mousemove", (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -45;
      const rotateY = ((x - centerX) / centerX) * 45;
      el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });
    el.addEventListener("mouseleave", () => {
      el.style.transform = "";
    });
  });
}

function initScrollReveal() {
  const selectors = [
    ".feat-card",
    ".about-grid > div",
    ".about-visual",
    ".contact-card",
    ".contact-form",
    ".hero-stats .stat-item",
    ".hero-badge",
    "#heroTitle",
    "#heroDesc",
    ".hero-cta",
  ];

  const elements = [];
  selectors.forEach((sel) => {
    document.querySelectorAll(sel).forEach((el) => {
      if (!el.classList.contains("scroll-reveal")) {
        el.classList.add("scroll-reveal");
        elements.push(el);
      }
    });
  });

  function checkVisibility() {
    elements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100 && rect.bottom > 0) {
        el.classList.add("revealed");
      }
    });
  }

  window.addEventListener("scroll", checkVisibility);
  window.addEventListener("resize", checkVisibility);
  checkVisibility();
}

function initStatsCounter() {
  const counters = document.querySelectorAll(".stat-num");
  let animated = false;

  function animateNumbers() {
    counters.forEach((counter) => {
      const target = counter.innerText;
      const numericValue = parseInt(target.replace(/[^0-9]/g, ""));
      const suffix = target.replace(/[0-9+]/g, "");
      if (!isNaN(numericValue)) {
        let current = 0;
        const increment = numericValue / 60;
        function updateCounter() {
          current += increment;
          if (current < numericValue) {
            counter.innerText = Math.floor(current) + suffix;
            requestAnimationFrame(updateCounter);
          } else {
            counter.innerText = numericValue + suffix;
          }
        }
        updateCounter();
      }
    });
  }

  window.addEventListener("scroll", () => {
    if (!animated) {
      const statsSection = document.querySelector(".hero-stats");
      if (statsSection) {
        const rect = statsSection.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
          animateNumbers();
          animated = true;
        }
      }
    }
  });
}

function initHeroContentDepth() {
  const elements = document.querySelectorAll(
    ".hero-badge, #heroTitle, #heroDesc, .cta-primary, .cta-secondary",
  );
  if (!elements.length) return;

  function onScroll() {
    const scrolled = window.pageYOffset;
    const offsetY = scrolled * 0.1;
    elements.forEach((el) => {
      el.style.transform = `translateY(${offsetY}px)`;
    });
  }

  window.addEventListener("scroll", onScroll);
  onScroll();
}

function initFloatingCocoas(
  containerId,
  imagePath,
  smallCount = 8,
  largeCount = 5,
) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = "";

  const images = [];
  const data = [];

  for (let i = 0; i < smallCount; i++) {
    const img = document.createElement("img");
    img.src = imagePath;
    img.alt = "";
    const size = 40 + Math.random() * 30;
    img.style.width = `${size}px`;
    img.style.top = `${15 + Math.random() * 18}%`;
    img.style.left = `${5 + Math.random() * 85}%`;
    img.style.opacity = 0.5;
    img.style.filter = `blur(${4 + Math.random() * 4}px)`;
    container.appendChild(img);
    images.push(img);
    data.push({
      speedY: 0.08 + Math.random() * 0.25,
      speedRot: (Math.random() - 0.5) * 0.02,
      phaseX: Math.random() * Math.PI * 2,
      ampX: 10 + Math.random() * 25,
      initialRot: Math.random() * 360,
    });
  }

  const colorVariations = [
    "sepia(0.4) hue-rotate(80deg) saturate(1.5) brightness(0.9)",
  ];

  for (let i = 0; i < largeCount; i++) {
    const img = document.createElement("img");
    img.src = imagePath;
    img.alt = "";

    const size = 40 + Math.random() * 30;
    const randomColor =
      colorVariations[Math.floor(Math.random() * colorVariations.length)];
    const randomBlur = `blur(8px)`;

    img.style.width = `${size}px`;
    img.style.top = `${60 + Math.random() * 20}%`;
    img.style.left = `${5 + Math.random() * 85}%`;
    img.style.opacity = 1;
    img.style.filter = `${randomBlur} ${randomColor}`.trim();
    container.appendChild(img);
    images.push(img);
    data.push({
      speedY: 0.5 + Math.random() * 0.4,
      speedRot: (Math.random() - 0.5) * 0.04,
      phaseX: Math.random() * Math.PI * 2,
      ampX: 20 + Math.random() * 40,
      initialRot: Math.random() * 360,
    });
  }

  function onScroll() {
    const scrolled = window.pageYOffset;

    images.forEach((img, i) => {
      const d = data[i];
      const y = -scrolled * d.speedY;
      const x = Math.sin(scrolled * 0.015 + d.phaseX) * d.ampX;
      const rot = d.initialRot + scrolled * d.speedRot;

      img.style.transform = `translateY(${y}px) translateX(${x}px) rotate(${rot}deg)`;
    });
  }

  window.addEventListener("scroll", onScroll);
  onScroll();
}

document.addEventListener("DOMContentLoaded", () => {
  initFooterParticles("footerParticleCanvas");
  initHeroParallax();
  initTiltEffect(document.querySelectorAll(".about-visual"));
  initScrollReveal();
  initStatsCounter();
  initFloatingCocoas("floatingCocoas", "assets/img/cocoa.png", 20, 20);

  const session = getSession();
  const navLinks = document.getElementById("navLinks");
  const heroCta = document.getElementById("heroCta");
  const noticeBar = document.getElementById("noticeBar");
  const nav = document.getElementById("mainNav");

  function adjustNavPosition() {
    if (noticeBar && noticeBar.style.display !== "none") {
      nav.style.top = noticeBar.offsetHeight + "px";
    } else {
      nav.style.top = "0px";
    }
  }

  if (session) {
    noticeBar.style.display = "none";
    adjustNavPosition();

    const initials = session.name
      .split(" ")
      .map((w) => w[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

    navLinks.innerHTML = `
      <a href="#features" class="nav-text">Fitur</a>
      <a href="#about" class="nav-text">Tentang</a>
      <a href="#contact" class="nav-text">Kontak</a>
      <div class="profile-wrap" id="profileWrap">
        <button class="profile-btn" id="profileBtn">
          <div class="profile-avatar">${initials}</div>
          ${session.name.split(" ")[0]}
          <svg class="profile-chevron" viewBox="0 0 16 16" fill="none" width="14" height="14">
            <path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
          </svg>
        </button>
        <div class="profile-dropdown">
          <div class="dropdown-header">
            <div class="dropdown-name">${session.name}</div>
            <div class="dropdown-email">${session.email}</div>
          </div>
          <div class="dropdown-menu">
            <a href="Dashboard/index.html" class="dropdown-item">🌿 Dasbor</a>
            <a href="#" class="dropdown-item" id="manageProfileBtn">👤 Kelola Profil</a>
            <div class="dropdown-sep"></div>
            <button class="dropdown-item danger" id="logoutBtn">🚪 Keluar</button>
          </div>
        </div>
      </div>
    `;
    heroCta.innerHTML = `<a href="Dashboard/index.html" class="cta-primary">🌿 Buka Dasbor</a>`;

    const profileWrap = document.getElementById("profileWrap");
    const profileBtn = document.getElementById("profileBtn");
    profileBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      profileWrap.classList.toggle("open");
    });
    document.addEventListener("click", (e) => {
      if (!profileWrap.contains(e.target)) {
        profileWrap.classList.remove("open");
      }
    });

    document.getElementById("logoutBtn")?.addEventListener("click", () => {
      logout();
      adjustNavPosition();
    });
    document
      .getElementById("manageProfileBtn")
      ?.addEventListener("click", (e) => {
        e.preventDefault();
        alert("Fitur kelola profil akan segera hadir!");
      });
  } else {
    noticeBar.style.display = "block";
    adjustNavPosition();
    navLinks.innerHTML = `
      <a href="#features" class="nav-text">Fitur</a>
      <a href="#about" class="nav-text">Tentang</a>
      <a href="#contact" class="nav-text">Kontak</a>
      <a href="auth/login.html" class="nav-login">Masuk</a>
      <a href="auth/register.html" class="nav-register">Daftar Gratis</a>
    `;
    heroCta.innerHTML = `
      <a href="auth/register.html" class="cta-primary">🌱 Mulai Gratis</a>
      <a href="auth/login.html" class="cta-secondary">Sudah Terdaftar? Masuk</a>
    `;
  }

  initHeroContentDepth();

  window.addEventListener("resize", adjustNavPosition);

  document.getElementById("contactForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("cfName").value.trim();
    const email = document.getElementById("cfEmail").value.trim();
    const msg = document.getElementById("cfMsg").value.trim();
    if (!name || !email || !msg) return;
    const success = document.getElementById("cfSuccess");
    success.style.display = "block";
    e.target.reset();
    setTimeout(() => (success.style.display = "none"), 5000);
  });

  const navToggle = document.getElementById("nav-toggle");
  const navLinksContainer = document.querySelector(".nav-links");
  navLinksContainer.addEventListener("click", (e) => {
    const target = e.target.closest("a, button");
    if (!target) return;
    if (window.innerWidth <= 768) {
      if (!target.closest(".profile-btn")) {
        navToggle.checked = false;
      }
    }
  });
});
