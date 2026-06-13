document.addEventListener("DOMContentLoaded", () => {
  const KEBUN_KEY = "tanamkakao_kebun";

  function getKebunData() {
    return JSON.parse(localStorage.getItem(KEBUN_KEY) || "[]");
  }

  function saveKebunData(data) {
    localStorage.setItem(KEBUN_KEY, JSON.stringify(data));
  }

  function tampilkanKebun() {
    const kebunData = getKebunData();
    const wadahGrid = document.getElementById("blokGrid");

    wadahGrid.innerHTML = "";

    let totalLuasLahan = 0;
    let totalPohonCount = 0;

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

    document.getElementById("totalLuas").innerHTML =
      `${totalLuasLahan.toFixed(1)} <span>Hektar</span>`;
    document.getElementById("totalPohon").innerHTML =
      `${totalPohonCount.toLocaleString("id-ID")} <span>Pohon</span>`;
    document.getElementById("totalBlok").innerHTML =
      `${kebunData.length} <span>Blok</span>`;
  }

  window.hapusBlok = function (index) {
    if (confirm("Apakah Anda yakin ingin menghapus data kebun ini?")) {
      let kebunData = getKebunData();
      kebunData.splice(index, 1);
      saveKebunData(kebunData);
      tampilkanKebun();
    }
  };

  window.editBlok = function (index) {
    const kebunData = getKebunData();
    const data = kebunData[index];

    if (!data) return;

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

    document.getElementById("modalTitle").innerText = "Edit Kebun";
    document.getElementById("btnSimpan").innerText = "Perbarui Kebun";

    modal.style.display = "flex";
  };

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

  document.getElementById("btnHitung").addEventListener("click", () => {
    const luas = parseFloat(document.getElementById("luasBlok").value);
    const jarakPerPohon = parseInt(document.getElementById("jarakTanam").value);
    const mdpl = parseInt(document.getElementById("ketinggian").value);

    if (!luas || isNaN(mdpl)) {
      alert("Harap isi Luas Lahan dan Ketinggian MDPL terlebih dahulu!");
      return;
    }

    const totalMeterPersegi = luas * 10000;
    const estimasiPopulasi = Math.floor(totalMeterPersegi / jarakPerPohon);

    document.getElementById("populasi").value = estimasiPopulasi;
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (document.getElementById("populasi").value === "") {
      alert(
        "Silakan klik tombol 'Hitung Rekomendasi' terlebih dahulu untuk mendapatkan estimasi populasi!",
      );
      return;
    }

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
      kebunData.push(dataBaru);
    } else {
      kebunData[editIndex] = dataBaru;
    }

    saveKebunData(kebunData);
    tutupDanResetModal();
    tampilkanKebun();
  });

  tampilkanKebun();
});

document.addEventListener("DOMContentLoaded", function () {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll(".nav-option");

  navLinks.forEach((link) => {
    link.classList.remove("active");
    const linkPath = new URL(link.href, window.location.origin).pathname;
    if (
      currentPath === linkPath ||
      currentPath.endsWith(link.getAttribute("href").replace("../", ""))
    ) {
      link.classList.add("active");
    }
  });
});

const menuToggle = document.getElementById("menu-toggle");
const navContainer = document.querySelector(".navcontainer");

if (menuToggle && navContainer) {
  menuToggle.addEventListener("click", function () {
    navContainer.classList.toggle("show");
  });
}

document.addEventListener("click", function (event) {
  if (window.innerWidth <= 768) {
    if (
      !navContainer.contains(event.target) &&
      !menuToggle.contains(event.target)
    ) {
      navContainer.classList.remove("show");
    }
  }
});
