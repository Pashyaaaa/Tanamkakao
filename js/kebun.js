document.addEventListener("DOMContentLoaded", () => {
  const KEBUN_KEY = "tanamkakao_kebun";

  // =========================================
  // 1. FUNGSI PENYIMPANAN (LOCAL STORAGE)
  // =========================================
  function getKebunData() {
    return JSON.parse(localStorage.getItem(KEBUN_KEY) || "[]");
  }

  function saveKebunData(data) {
    localStorage.setItem(KEBUN_KEY, JSON.stringify(data));
  }

  // =========================================
  // 2. FUNGSI RENDER TAMPILAN KE LAYAR
  // =========================================
  function tampilkanKebun() {
    const kebunData = getKebunData();
    const wadahGrid = document.getElementById("blokGrid");

    // Kosongkan grid sebelum dirender ulang
    wadahGrid.innerHTML = "";

    let totalLuasLahan = 0;
    let totalPohonCount = 0;

    // Render setiap kartu blok lahan
    kebunData.forEach((blok, index) => {
      totalLuasLahan += parseFloat(blok.luas || 0);
      totalPohonCount += parseInt(blok.populasi || 0);

      const card = document.createElement("article");
      card.className = "blok-card";
      const badgeClass = blok.status === "Masa TM" ? "status-tm" : "status-tbm";

      card.innerHTML = `
        <header class="blok-header">
          <h4>${blok.nama}</h4>
          <span class="status-badge ${badgeClass}">${blok.status}</span>
        </header>
        <div class="blok-body">
          <p><strong>Luas Blok:</strong> <span>${blok.luas} Ha</span></p>
          <p><strong>Populasi:</strong> <span>${parseInt(blok.populasi).toLocaleString("id-ID")} Pohon</span></p>
          <p><strong>Curah Hujan:</strong> <span>${blok.curahHujan || "-"} mm/thn</span></p>
          <p><strong>Suhu Rata-rata:</strong> <span>${blok.suhuRataRata || "-"} °C</span></p>
          <p><strong>Jenis Tanah:</strong> <span>${blok.jenisTanah || "-"}</span></p>
          <p><strong>pH Tanah:</strong> <span>${blok.phTanah || "-"}</span></p>
        </div>
        <footer class="blok-footer" style="display: flex; gap: 10px; margin-top: 20px;">
          <button class="btn-edit" onclick="editBlok(${index})" style="flex: 1; background-color: transparent; color: var(--secondary-color); border: 1.5px solid var(--secondary-color); padding: 8px; border-radius: 6px; font-family: 'Poppins', sans-serif; font-weight: 600; cursor: pointer; transition: all 0.2s ease;">
            <i class="fa-solid fa-pen-to-square"></i> Edit
          </button>
          <button class="btn-hapus" onclick="hapusBlok(${index})" style="flex: 1; padding: 8px;">
            <i class="fa-solid fa-trash"></i> Hapus
          </button>
        </footer>
      `;
      wadahGrid.appendChild(card);
    });

    // Perbarui angka ringkasan di atas
    document.getElementById("totalLuas").innerHTML =
      `${totalLuasLahan.toFixed(1)} <span>Hektar</span>`;
    document.getElementById("totalPohon").innerHTML =
      `${totalPohonCount.toLocaleString("id-ID")} <span>Pohon</span>`;
    document.getElementById("totalBlok").innerHTML =
      `${kebunData.length} <span>Blok</span>`;
  }

  // =========================================
  // 3. FUNGSI HAPUS DATA BLOK
  // =========================================
  window.hapusBlok = function (index) {
    if (confirm("Apakah Anda yakin ingin menghapus data kebun ini?")) {
      let kebunData = getKebunData();
      kebunData.splice(index, 1);
      saveKebunData(kebunData);
      tampilkanKebun();
    }
  };

  // =========================================
  // 4. FUNGSI EDIT DATA BLOK
  // =========================================
  window.editBlok = function (index) {
    const kebunData = getKebunData();
    const data = kebunData[index];

    if (!data) return;

    // Isi data ke form modal
    document.getElementById("editIndex").value = index;
    document.getElementById("namaBlok").value = data.nama;
    document.getElementById("luasBlok").value = data.luas;
    document.getElementById("jarakTanam").value = data.jarakTanam || "9";
    document.getElementById("ketinggian").value = data.ketinggian || "";
    document.getElementById("populasi").value = data.populasi;
    document.getElementById("curahHujan").value = data.curahHujan || "";
    document.getElementById("suhuRataRata").value = data.suhuRataRata || "";
    document.getElementById("jenisTanah").value = data.jenisTanah || "";
    document.getElementById("phTanah").value = data.phTanah || "";
    document.getElementById("status").value = data.status;

    // Ubah judul modal dan teks tombol simpan
    document.getElementById("modalTitle").innerText = "Edit Kebun";
    document.getElementById("btnSimpan").innerText = "Perbarui Kebun";

    // Buka modal
    modal.style.display = "flex";
  };

  // =========================================
  // 5. KONTROL MODAL FORM & RESET
  // =========================================
  const modal = document.getElementById("modalBlok");
  const form = document.getElementById("formBlok");

  function tutupDanResetModal() {
    modal.style.display = "none";
    form.reset();
    document.getElementById("editIndex").value = "-1";
    document.getElementById("modalTitle").innerText = "Tambah Kebun";
    document.getElementById("btnSimpan").innerText = "Simpan ke Dasbor";
  }

  document.getElementById("btnBukaModal").addEventListener("click", () => {
    document.getElementById("editIndex").value = "-1";
    document.getElementById("modalTitle").innerText = "Tambah Kebun";
    document.getElementById("btnSimpan").innerText = "Simpan ke Dasbor";
    modal.style.display = "flex";
  });

  document
    .getElementById("btnTutupModal")
    .addEventListener("click", tutupDanResetModal);
  document
    .getElementById("btnBatal")
    .addEventListener("click", tutupDanResetModal);

  // =========================================
  // 6. ALGORITMA REKOMENDASI PINTAR
  // =========================================
  document.getElementById("btnHitung").addEventListener("click", () => {
    const luas = parseFloat(document.getElementById("luasBlok").value);
    const jarakPerPohon = parseInt(document.getElementById("jarakTanam").value);
    const mdpl = parseInt(document.getElementById("ketinggian").value);

    // Validasi kosong
    if (!luas || isNaN(mdpl)) {
      alert("Harap isi Luas Lahan dan Ketinggian MDPL terlebih dahulu!");
      return;
    }

    // Kalkulasi Populasi (1 Hektar = 10.000 meter persegi)
    const totalMeterPersegi = luas * 10000;
    const estimasiPopulasi = Math.floor(totalMeterPersegi / jarakPerPohon);

    // Suntikkan hasil ke dalam form (readonly)
    document.getElementById("populasi").value = estimasiPopulasi;
  });

  // =========================================
  // 7. SUBMIT DATA KE DASBOR (TAMBAH & EDIT)
  // =========================================
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Validasi pencegahan jika user lupa klik tombol Hitung Rekomendasi
    if (document.getElementById("populasi").value === "") {
      alert(
        "Silakan klik tombol 'Hitung Rekomendasi' terlebih dahulu untuk mendapatkan estimasi populasi!",
      );
      return;
    }

    // Ambil data pengisian form objek baru
    const dataBaru = {
      nama: document.getElementById("namaBlok").value.trim(),
      luas: document.getElementById("luasBlok").value,
      jarakTanam: document.getElementById("jarakTanam").value,
      ketinggian: document.getElementById("ketinggian").value,
      populasi: document.getElementById("populasi").value,
      curahHujan: document.getElementById("curahHujan").value,
      suhuRataRata: document.getElementById("suhuRataRata").value,
      jenisTanah: document.getElementById("jenisTanah").value.trim(),
      phTanah: document.getElementById("phTanah").value,
      status: document.getElementById("status").value,
    };

    const kebunData = getKebunData();
    const editIndex = parseInt(document.getElementById("editIndex").value);

    if (editIndex === -1) {
      // MODE TAMBAH BARU
      kebunData.push(dataBaru);
    } else {
      // MODE EDIT DATA LAMA
      kebunData[editIndex] = dataBaru;
    }

    saveKebunData(kebunData);
    tutupDanResetModal();
    tampilkanKebun();
  });

  // Panggil fungsi render saat halaman pertama kali dibuka
  tampilkanKebun();
});

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