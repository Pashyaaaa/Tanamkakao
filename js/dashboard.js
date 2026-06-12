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