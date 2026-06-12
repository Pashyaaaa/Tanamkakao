document.addEventListener("DOMContentLoaded", () => {
  const KEBUN_KEY = "tanamkakao_kebun";

  // 1. Fungsi mengambil data dari Local Storage
  function getKebunData() {
    return JSON.parse(localStorage.getItem(KEBUN_KEY) || "[]");
  }

  // 2. Fungsi menyimpan data ke Local Storage
  function saveKebunData(data) {
    localStorage.setItem(KEBUN_KEY, JSON.stringify(data));
  }

  // 3. Fungsi utama untuk me-render antarmuka (UI)
  function tampilkanKebun() {
    const kebunData = getKebunData();
    const wadahGrid = document.getElementById("blokGrid");

    // Kosongkan area grid sebelum diisi ulang
    wadahGrid.innerHTML = "";

    let totalLuasLahan = 0;
    let totalPohonCount = 0;

    // Looping data kebun untuk ditampilkan
    kebunData.forEach((blok, index) => {
      // Kalkulasi akumulasi total
      totalLuasLahan += parseFloat(blok.luas);
      totalPohonCount += parseInt(blok.populasi);

      // Pembuatan elemen kartu (card)
      const card = document.createElement("div");
      card.className = "blok-card";

      // Penentuan warna badge status
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

    // 4. Update ringkasan angka di bagian paling atas
    document.getElementById("totalLuas").innerHTML =
      `${totalLuasLahan.toFixed(1)} <span>Hektar</span>`;
    document.getElementById("totalPohon").innerHTML =
      `${totalPohonCount.toLocaleString("id-ID")} <span>Pohon</span>`;
    document.getElementById("totalBlok").innerHTML =
      `${kebunData.length} <span>Blok</span>`;
  }

  // 5. Fungsi hapus data (dijadikan global agar bisa diakses onclick di HTML)
  window.hapusBlok = function (index) {
    if (confirm("Apakah Anda yakin ingin menghapus blok lahan ini?")) {
      let kebunData = getKebunData();
      kebunData.splice(index, 1);
      saveKebunData(kebunData);
      tampilkanKebun();
    }
  };

  // 6. Logika Modal Form Tambah Data
  const modal = document.getElementById("modalBlok");
  const form = document.getElementById("formBlok");

  function bukaModalForm() {
    modal.style.display = "flex";
  }
  function tutupModalForm() {
    modal.style.display = "none";
    form.reset();
  }

  // Event Listeners untuk interaksi tombol modal
  document
    .getElementById("btnBukaModal")
    .addEventListener("click", bukaModalForm);
  document
    .getElementById("btnTutupModal")
    .addEventListener("click", tutupModalForm);
  document.getElementById("btnBatal").addEventListener("click", tutupModalForm);

  // 7. Proses submit data form
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Tangkap data dari inputan user
    const baru = {
      nama: document.getElementById("namaBlok").value.trim(),
      varietas: document.getElementById("varietas").value.trim(),
      populasi: document.getElementById("populasi").value,
      luas: document.getElementById("luasBlok").value,
      status: document.getElementById("status").value,
    };

    // Ambil data lama, tambahkan data baru, lalu simpan kembali
    const kebunData = getKebunData();
    kebunData.push(baru);
    saveKebunData(kebunData);

    // Sembunyikan form dan perbarui tampilan web
    tutupModalForm();
    tampilkanKebun();
  });

  // Panggil fungsi render pertama kali saat web dibuka
  tampilkanKebun();
});
