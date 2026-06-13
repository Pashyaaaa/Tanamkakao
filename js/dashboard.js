(function () {
    "use strict";
   
    const featured = document.getElementById("news-featured");
    const newsList = document.getElementById("news-list");
    const filterBtns = document.querySelectorAll(".filter-btn");
   
    /**
     * @param {string} cat - Kategori yang dipilih ('semua' | 'tips' | 'harga' | 'info' | 'warn')
    */
    function filterBerita(cat) {
      const items = newsList.querySelectorAll(".news-item");
   
      if (cat === "semua" || featured.dataset.cat === cat) {
        featured.classList.remove("hidden");
      } else {
        featured.classList.add("hidden");
      }
   
      let adaHasil = false;
   
      items.forEach((item) => {
        const cocok = cat === "semua" || item.dataset.cat === cat;
        item.classList.toggle("hidden", !cocok);
        if (cocok) adaHasil = true;
      });
   
      tampilkanPesanKosong(!adaHasil && featured.classList.contains("hidden"));
    }
   
    /**
     * @param {boolean} tampil
     */
    function tampilkanPesanKosong(tampil) {
      let emptyEl = newsList.querySelector(".news-empty");
   
      if (!emptyEl) {
        emptyEl = document.createElement("li");
        emptyEl.className = "news-empty";
        emptyEl.textContent = "Tidak ada berita untuk kategori ini.";
        newsList.appendChild(emptyEl);
      }
   
      emptyEl.classList.toggle("visible", tampil);
    }
   
    function initFilter() {
      filterBtns.forEach((btn) => {
        btn.addEventListener("click", function () {

          filterBtns.forEach((b) => b.classList.remove("active"));
          this.classList.add("active");

          filterBerita(this.dataset.cat);
        });
      });
    }
   
    function initKlikItem() {
      const semuaItem = document.querySelectorAll(".news-item, .news-featured");
   
      semuaItem.forEach((item) => {
        item.addEventListener("click", function () {
          const judul = this.querySelector(
            ".news-headline, .news-featured-headline"
          );
          if (judul) {
            console.log("Berita diklik:", judul.textContent.trim());
           
          }
        });
      });
    }
   
    document.addEventListener("DOMContentLoaded", function () {
      initFilter();
      initKlikItem();
    });
  })();


  document.addEventListener("DOMContentLoaded", function() {
    const currentPath = window.location.pathname; 
    const navLinks = document.querySelectorAll('.nav-option');
  
    navLinks.forEach(link => {
      link.classList.remove('active');
  
      const linkPath = new URL(link.href, window.location.origin).pathname;

      if (currentPath === linkPath || currentPath.endsWith(link.getAttribute('href').replace('../', ''))) {
        link.classList.add('active');
      }
    });
  });

  const menuToggle = document.getElementById("menu-toggle");
  const navContainer = document.querySelector(".navcontainer");

  if (menuToggle && navContainer) {
    menuToggle.addEventListener("click", function() {
      navContainer.classList.toggle("show");
    });
  }

  document.addEventListener("click", function(event) {
    if (window.innerWidth <= 768) {
      if (!navContainer.contains(event.target) && !menuToggle.contains(event.target)) {
        navContainer.classList.remove("show");
      }
    }
  });

const profileWrap = document.getElementById('profileWrap');
const profileBtn  = document.getElementById('profileBtn');
const profileDropdown = document.getElementById('profileDropdown');

profileBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  const isOpen = profileWrap.classList.toggle('open');
  profileBtn.setAttribute('aria-expanded', isOpen);
});

document.addEventListener('click', () => {
  profileWrap.classList.remove('open');
  profileBtn.setAttribute('aria-expanded', 'false');
});

profileDropdown.addEventListener('click', (e) => e.stopPropagation());

const user = JSON.parse(localStorage.getItem('tanamkakao_session') || '{}');
const name  = user.name  || 'Petani';
const email = user.email || '';
const parts = name.trim().split(' ').filter(Boolean);
const initial = parts.length >= 2
  ? parts[0][0].toUpperCase() + parts[1][0].toUpperCase()
  : parts[0][0].toUpperCase();

document.getElementById('profileAvatar').textContent = initial;
document.getElementById('profileName').textContent   = name.split(' ')[0];
document.getElementById('dropdownName').textContent  = name;
document.getElementById('dropdownEmail').textContent = email || '—';