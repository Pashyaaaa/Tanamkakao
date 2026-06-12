document.addEventListener("DOMContentLoaded", () => {
  const KEBUN_KEY = "tanamkakao_kebun";

  // 1. Fungsi Local Storage
  function getKebunData() {
    return JSON.parse(localStorage.getItem(KEBUN_KEY) || "[]");
  }
  function saveKebunData(data) {
    localStorage.setItem(KEBUN_KEY, JSON.stringify(data));
  }

  // 2. Render UI Kebun
  function tampilkanKebun() {
    const kebunData = getKebunData();
    const wadahGrid = document.getElementById("blokGrid");
    wadahGrid.innerHTML = "";

    let totalLuasLahan = 0;
    let totalPohonCount = 0;

    kebunData.forEach((blok, index) => {
      totalLuasLahan += parseFloat(blok.luas);
      totalPohonCount += parseInt(blok.populasi);

      const card = document.createElement("div");
      card.className = "blok-card";
      const badgeClass = blok.status === "Masa TM" ? "status-tm" : "status-tbm";

      card.innerHTML = `
        <div class="blok-header">
          <h4>${blok.nama}</h4>
          <span class="status-badge ${badgeClass}">${blok.status}</span>
        </div>
        <div class="blok-body">
          <p><strong>Varietas:</strong> <span>${blok.varietas}</span></p>
          <p><strong>Populasi:</strong> <span>${blok.populasi} Pohon</span></p>
          <p><strong>Luas Blok:</strong> <span>${blok.luas} Ha</span></p>
        </div>
        <div class="blok-footer">
          <button class="btn-hapus" onclick="hapusBlok(${index})">
            <i class="fa-solid fa-trash"></i> Hapus Blok
          </button>
        </div>
      `;
      wadahGrid.appendChild(card);
    });

    document.getElementById("totalLuas").innerHTML =
      `${totalLuasLahan.toFixed(1)} <span>Hektar</span>`;
    document.getElementById("totalPohon").innerHTML =
      `${totalPohonCount.toLocaleString("id-ID")} <span>Pohon</span>`;
    document.getElementById("totalBlok").innerHTML =
      `${kebunData.length} <span>Blok</span>`;
  }

  // 3. Fungsi Hapus
  window.hapusBlok = function (index) {
    if (confirm("Apakah Anda yakin ingin menghapus blok lahan ini?")) {
      let kebunData = getKebunData();
      kebunData.splice(index, 1);
      saveKebunData(kebunData);
      tampilkanKebun();
    }
  };

  // 4. Modal Handler
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

  // 5. FITUR: Kalkulator Rekomendasi Pintar (Smart Seeding)
  document.getElementById("btnHitung").addEventListener("click", () => {
    const luas = parseFloat(document.getElementById("luasBlok").value);
    const jarakPerPohon = parseInt(document.getElementById("jarakTanam").value);
    const mdpl = parseInt(document.getElementById("ketinggian").value);

    // Validasi kosong
    if (!luas || isNaN(mdpl)) {
      alert("Harap isi Luas Lahan dan Ketinggian MDPL terlebih dahulu!");
      return;
    }

    // Hitung Populasi (1 Hektar = 10.000 meter persegi)
    const totalMeterPersegi = luas * 10000;
    const estimasiPopulasi = Math.floor(totalMeterPersegi / jarakPerPohon);

    // Penentuan Varietas berdasarkan Ketinggian
    let rekomendasiVarietas = "";
    if (mdpl < 400) {
      rekomendasiVarietas = "ICCRI 03 (Dataran Rendah)";
    } else if (mdpl <= 700) {
      rekomendasiVarietas = "Sulawesi 1 (Dataran Menengah)";
    } else {
      rekomendasiVarietas = "Klon MCC 02 (Dataran Tinggi)";
    }

    // Tampilkan hasil di form readonly
    document.getElementById("populasi").value = estimasiPopulasi;
    document.getElementById("varietas").value = rekomendasiVarietas;
  });

  // 6. Simpan Form
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Validasi jika user lupa klik Hitung Rekomendasi
    if (document.getElementById("varietas").value === "") {
      alert("Silakan klik tombol 'Hitung Rekomendasi' terlebih dahulu!");
      return;
    }

    const baru = {
      nama: document.getElementById("namaBlok").value.trim(),
      varietas: document.getElementById("varietas").value,
      populasi: document.getElementById("populasi").value,
      luas: document.getElementById("luasBlok").value,
      status: document.getElementById("status").value,
    };

    const kebunData = getKebunData();
    kebunData.push(baru);
    saveKebunData(kebunData);

    modal.style.display = "none";
    form.reset();
    tampilkanKebun();
  });

  tampilkanKebun();
});
