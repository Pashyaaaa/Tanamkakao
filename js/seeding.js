/**
 * smart-seeding.js — Logika UI Smart Seeding Matching (tanpa AI)
 * Bergantung pada: smart-seeding-engine.js (harus dimuat lebih dulu)
 */

(function () {
  "use strict";

  /* ─── INISIALISASI UI ──────────────────────────────────────── */

  // Sinkronisasi slider ketinggian ↔ input angka
  const ketinggianInput = document.getElementById("ketinggian");
  const ketinggianSlider = document.getElementById("ketinggian-slider");

  if (ketinggianInput && ketinggianSlider) {
    ketinggianSlider.addEventListener("input", function () {
      ketinggianInput.value = this.value;
    });
    ketinggianInput.addEventListener("input", function () {
      const val = Math.min(2000, Math.max(0, parseInt(this.value) || 0));
      ketinggianSlider.value = val;
    });
  }

  // Update indikator pH
  const phInput = document.getElementById("ph-tanah");
  const phIndicator = document.getElementById("ph-indicator");

  function updatePhIndicator() {
    const val = parseFloat(phInput.value) || 7;
    const pct = ((val - 4) / (9 - 4)) * 100;
    phIndicator.style.left = Math.min(100, Math.max(0, pct)) + "%";
  }

  if (phInput && phIndicator) {
    phInput.addEventListener("input", updatePhIndicator);
  }

  // Tombol prioritas — pilih satu
  const priorityBtns = document.querySelectorAll(".ss-priority-btn");
  priorityBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      priorityBtns.forEach((b) => b.classList.remove("selected"));
      this.classList.toggle("selected");
    });
  });

  /* ─── AMBIL & VALIDASI FORM ───────────────────────────────── */

  function ambilDataForm() {
    const priorityEl = document.querySelector(".ss-priority-btn.selected");
    return {
      ketinggian: document.getElementById("ketinggian").value,
      curahHujan: document.getElementById("curah-hujan").value,
      suhu: document.getElementById("suhu").value,
      jenisTanah: document.getElementById("jenis-tanah").value,
      phTanah: document.getElementById("ph-tanah").value,
      luasLahan: document.getElementById("luas-lahan").value,
      prioritas: priorityEl ? priorityEl.dataset.val : "",
      catatan: document.getElementById("catatan").value,
    };
  }

  function validasiForm(data) {
    const wajib = [
      { key: "ketinggian", label: "Ketinggian Lahan" },
      { key: "curahHujan", label: "Curah Hujan" },
      { key: "suhu", label: "Suhu Rata-rata" },
      { key: "jenisTanah", label: "Jenis Tanah" },
      { key: "phTanah", label: "pH Tanah" },
    ];
    for (const f of wajib) {
      if (!data[f.key]) return `Mohon isi kolom "${f.label}" terlebih dahulu.`;
    }
    const ph = parseFloat(data.phTanah);
    if (ph < 4 || ph > 9) return "pH tanah harus antara 4 dan 9.";
    return null;
  }

  /* ─── STATE MANAGER ───────────────────────────────────────── */

  function tampilkanState(state) {
    ["idle", "loading", "result", "error"].forEach((s) => {
      const el = document.getElementById("ss-state-" + s);
      if (!el) return;
      if (s === state) {
        el.style.display = s === "result" ? "block" : "flex";
      } else {
        el.style.display = "none";
      }
    });
  }

  /* ─── ANIMASI LOADING ─────────────────────────────────────── */

  let loadingTimer = null;

  function mulaiAnimasiLoading() {
    const steps = ["step-1", "step-2", "step-3"];
    const texts = [
      "Membaca kondisi lahan kamu...",
      "Mencocokkan ke database 8 varietas...",
      "Menghitung skor kesesuaian...",
    ];
    let i = 0;
    steps.forEach((s) => {
      const el = document.getElementById(s);
      if (el) el.classList.remove("active", "done");
    });
    function nextStep() {
      if (i > 0) {
        const prev = document.getElementById(steps[i - 1]);
        if (prev) { prev.classList.remove("active"); prev.classList.add("done"); }
      }
      if (i < steps.length) {
        const cur = document.getElementById(steps[i]);
        if (cur) cur.classList.add("active");
        const t = document.getElementById("ss-loading-text");
        if (t) t.textContent = texts[i];
        i++;
        loadingTimer = setTimeout(nextStep, 700);
      }
    }
    nextStep();
  }

  function stopAnimasiLoading() {
    if (loadingTimer) clearTimeout(loadingTimer);
  }

  /* ─── RENDER HASIL ────────────────────────────────────────── */

  function renderLahanSummary(data) {
    const labelTanah = {
      latosol: "Latosol", andosol: "Andosol", podsolik: "Podsolik",
      alluvial: "Alluvial", regosol: "Regosol", grumusol: "Grumusol",
    };
    const chips = [
      { icon: "fa-mountain", teks: `${data.ketinggian} mdpl` },
      { icon: "fa-cloud-rain", teks: `${data.curahHujan} mm/th` },
      { icon: "fa-temperature-half", teks: `${data.suhu}°C` },
      { icon: "fa-layer-group", teks: labelTanah[data.jenisTanah] || data.jenisTanah },
      { icon: "fa-flask", teks: `pH ${data.phTanah}` },
    ];
    if (data.luasLahan) chips.push({ icon: "fa-vector-square", teks: `${data.luasLahan} Ha` });
    document.getElementById("ss-lahan-summary").innerHTML = chips
      .map((c) => `<span class="ss-lahan-chip"><i class="fa-solid ${c.icon}"></i> ${c.teks}</span>`)
      .join("");
  }

  function renderRekomendasi(top3) {
    const container = document.getElementById("ss-rekomendasi-list");
    container.innerHTML = top3
      .map((v, idx) => {
        const rankClass = `rank-${idx + 1}`;
        const isTop = idx === 0;

        // Bar skor visual
        const barColor = v.skor >= 80 ? "#688f4e" : v.skor >= 60 ? "#ff8000" : "#b3b3b3";

        // Detail parameter
        const detailHtml = v.detail
          .map((d) => {
            const icon = d.status === "optimal"
              ? `<i class="fa-solid fa-circle-check" style="color:#688f4e"></i>`
              : `<i class="fa-solid fa-circle-exclamation" style="color:#ff8000"></i>`;
            return `<span class="ss-param-chip">${icon} ${d.param}</span>`;
          })
          .join("");

        // Keunggulan
        const keunggulanHtml = v.keunggulan
          .map((k) => `<li><i class="fa-solid fa-check" style="color:#688f4e;font-size:10px"></i> ${k}</li>`)
          .join("");

        return `
          <div class="ss-rekom-card ${rankClass}">
            ${isTop ? '<span class="ss-best-badge">✦ Terbaik</span>' : ""}
            <div class="ss-rekom-top">
              <div class="ss-rekom-rank">${idx + 1}</div>
              <div class="ss-rekom-body">
                <div class="ss-rekom-name">${v.nama}</div>
                <div class="ss-rekom-asal">${v.asal}</div>
              </div>
              <div class="ss-rekom-score-wrap">
                <div class="ss-score-value" style="color:${barColor}">${v.skor}</div>
                <div class="ss-score-label">/ 100</div>
                <div class="ss-score-bar-mini">
                  <div style="width:${v.skor}%;background:${barColor};height:4px;border-radius:2px;transition:width 0.8s ease"></div>
                </div>
              </div>
            </div>

            <div class="ss-rekom-detail">
              <div class="ss-rekom-stat-row">
                <div class="ss-rekom-stat">
                  <span class="ss-stat-label">Produktivitas</span>
                  <span class="ss-stat-value">${v.produktivitas}</span>
                </div>
                <div class="ss-rekom-stat">
                  <span class="ss-stat-label">Kadar Lemak</span>
                  <span class="ss-stat-value">${v.kadarLemak}</span>
                </div>
                <div class="ss-rekom-stat">
                  <span class="ss-stat-label">Berat Biji</span>
                  <span class="ss-stat-value">${v.beratBiji}</span>
                </div>
              </div>

              <div class="ss-rekom-params">${detailHtml}</div>

              <ul class="ss-rekom-keunggulan">${keunggulanHtml}</ul>

              <div class="ss-rekom-sumber">
                <i class="fa-solid fa-book-open" style="font-size:10px"></i>
                Sumber: ${v.sumber}
              </div>
            </div>
          </div>`;
      })
      .join("");

    // Trigger animasi bar setelah render
    setTimeout(() => {
      document.querySelectorAll(".ss-score-bar-mini div").forEach((el) => {
        el.style.width = el.style.width;
      });
    }, 100);
  }

  function renderAnalisis(teks, peringatan) {
    // Peringatan
    const warningContainer = document.getElementById("ss-peringatan");
    if (warningContainer) {
      if (peringatan && peringatan.length > 0) {
        warningContainer.innerHTML = peringatan
          .map((p) => `<div class="ss-warning-item">${p}</div>`)
          .join("");
        warningContainer.style.display = "block";
      } else {
        warningContainer.style.display = "none";
      }
    }

    // Analisis teks — efek ketik
    const el = document.getElementById("ss-ai-explanation-body");
    if (!el) return;
    el.textContent = "";
    el.classList.add("ss-typing");
    const kata = teks.split(" ");
    let i = 0;
    function ketikKata() {
      if (i < kata.length) {
        el.textContent += (i === 0 ? "" : " ") + kata[i];
        i++;
        setTimeout(ketikKata, 15);
      } else {
        el.classList.remove("ss-typing");
      }
    }
    ketikKata();
  }

  /* ─── MAIN: JALANKAN ANALISIS ─────────────────────────────── */

  window.jalankanAnalisis = function () {
    const data = ambilDataForm();
    const errorMsg = validasiForm(data);
    if (errorMsg) { alert(errorMsg); return; }

    const submitBtn = document.getElementById("ss-submit-btn");
    submitBtn.disabled = true;

    tampilkanState("loading");
    mulaiAnimasiLoading();

    // Jalankan engine setelah animasi step 1 selesai
    setTimeout(() => {
      stopAnimasiLoading();

      const hasil = window.SmartSeedingEngine.rekomendasikan(data);

      renderLahanSummary(data);
      renderRekomendasi(hasil.top3);
      tampilkanState("result");
      renderAnalisis(hasil.analisis, hasil.peringatan);

      submitBtn.disabled = false;
    }, 2200);
  };

  /* ─── RESET ───────────────────────────────────────────────── */

  window.resetForm = function () {
    document.getElementById("ketinggian").value = "";
    if (ketinggianSlider) ketinggianSlider.value = 300;
    document.getElementById("curah-hujan").value = "";
    document.getElementById("suhu").value = "";
    document.getElementById("jenis-tanah").value = "";
    document.getElementById("ph-tanah").value = "";
    document.getElementById("luas-lahan").value = "";
    document.getElementById("catatan").value = "";
    priorityBtns.forEach((b) => b.classList.remove("selected"));
    if (phIndicator) phIndicator.style.left = "50%";
    tampilkanState("idle");
  };
})();

document.addEventListener("DOMContentLoaded", function() {
  const currentPath = window.location.pathname; 
  const navLinks = document.querySelectorAll('.nav-option');

  navLinks.forEach(link => {
    // 1. Hapus class active dari semua link untuk berjaga-jaga jika ada yang "nyangkut" dari HTML
    link.classList.remove('active');

    // 2. Ekstrak pathname yang bersih dari URL link navigasi
    const linkPath = new URL(link.href, window.location.origin).pathname;

    // 3. Jika path saat ini sama dengan path pada link, aktifkan class-nya!
    if (currentPath === linkPath || currentPath.endsWith(link.getAttribute('href').replace('../', ''))) {
      link.classList.add('active');
    }
  });
});

// 1. Ambil elemen tombol hamburger dan wadah sidebar
const menuToggle = document.getElementById("menu-toggle");
const navContainer = document.querySelector(".navcontainer");

// 2. Jika tombol diklik, tambahkan atau hapus class 'show' pada sidebar
if (menuToggle && navContainer) {
  menuToggle.addEventListener("click", function() {
    navContainer.classList.toggle("show");
  });
}

// (Opsional) Tutup menu jika user mengklik area lain di luar sidebar pada mode HP
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