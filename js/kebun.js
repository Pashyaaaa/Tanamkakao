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
      totalLuasLahan += parseFloat(blok.luas);
      totalPohonCount += parseInt(blok.populasi);

      const card = document.createElement("article");
      card.className = "blok-card";
      const badgeClass = blok.status === "Masa TM" ? "status-tm" : "status-tbm";

      card.innerHTML = `
        <header class="blok-header">
          <h4>${blok.nama}</h4>
          <span class="status-badge ${badgeClass}">${blok.status}</span>
        </header>
        <div class="blok-body">
          <p><strong>Populasi:</strong> <span>${blok.populasi} Pohon</span></p>
          <p><strong>Luas Blok:</strong> <span>${blok.luas} Ha</span></p>
        </div>
        <footer class="blok-footer">
          <button class="btn-hapus" onclick="hapusBlok(${index})">
            <i class="fa-solid fa-trash"></i> Hapus Blok
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
    if (confirm("Apakah Anda yakin ingin menghapus blok lahan ini?")) {
      let kebunData = getKebunData();
      kebunData.splice(index, 1);
      saveKebunData(kebunData);
      tampilkanKebun();
    }
  };

  // =========================================
  // 4. KONTROL MODAL FORM
  // =========================================
  const modal = document.getElementById("modalBlok");
  const form = document.getElementById("formBlok");

  document
    .getElementById("btnBukaModal")
    .addEventListener("click", () => (modal.style.display = "flex"));
  document.getElementById("btnTutupModal").addEventListener("click", () => {
    modal.style.display = "none";
    form.reset();
  });
  document.getElementById("btnBatal").addEventListener("click", () => {
    modal.style.display = "none";
    form.reset();
  });

  // =========================================
  // 5. ALGORITMA REKOMENDASI PINTAR
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
  // 6. SUBMIT DATA KE DASBOR
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

    // Ambil semua value dari form
    const baru = {
      nama: document.getElementById("namaBlok").value.trim(),
      populasi: document.getElementById("populasi").value,
      luas: document.getElementById("luasBlok").value,
      status: document.getElementById("status").value,
    };

    // Push ke storage
    const kebunData = getKebunData();
    kebunData.push(baru);
    saveKebunData(kebunData);

    // Reset dan update UI
    modal.style.display = "none";
    form.reset();
    tampilkanKebun();
  });

  // Panggil fungsi render saat halaman pertama kali dibuka
  tampilkanKebun();
});
