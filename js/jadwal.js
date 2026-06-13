function buatJadwalPerawatan() {
  let tglInput = document.getElementById("input-tanggal-tanam").value;

  if (!tglInput) {
    alert("Silakan pilih tanggal penanaman terlebih dahulu!");
    return;
  }

  localStorage.setItem("tanggalTanamKakao", tglInput);

  let tempatJadwal = document.getElementById("wadah-timeline-jadwal");
  tempatJadwal.innerHTML = "";

  let tglMulai = new Date(tglInput);

  const rencanaRawat = [
    {
      ke: 1,
      tugas: "Pemupukan NPK Tahap I",
      detail: "Berikan pupuk NPK sebanyak 50 gram per pohon. Taburkan secara melingkar di bawah tajuk tanaman kakao.",
    },
    {
      ke: 3,
      tugas: "Penyiangan Gulma & Tunas Air",
      detail: "Bersihkan rumput liar di sekitar piringan tanaman dan pangkas tunas air yang tumbuh di batang utama.",
    },
    {
      ke: 6,
      tugas: "Pemangkasan Bentuk Tahap Awalan",
      detail: "Pilih 3-4 cabang primer (jorget) yang letaknya merata dan sehat, lalu potong cabang sekunder yang terlalu rapat.",
    },
    {
      ke: 12,
      tugas: "Penyulaman & Pemupukan Organik",
      detail: "Ganti bibit kakao yang mati/kerdil dengan bibit cadangan yang seumur. Tambahkan pupuk kandang/kompos 5-10 kg per lubang.",
    },
    {
      ke: 18,
      tugas: "Pemangkasan Pemeliharaan TBM",
      detail: "Atur percabangan agar tidak saling menutupi. Pastikan sinar matahari bisa menembus masuk ke bagian dalam tanaman.",
    },
  ];

  const namaBulan = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];

  rencanaRawat.forEach((item) => {
    let tglTarget = new Date(tglMulai);
    
    tglTarget.setMonth(tglTarget.getMonth() + item.ke);

    let tanggal = tglTarget.getDate();
    let bulan = namaBulan[tglTarget.getMonth()];
    let tahun = tglTarget.getFullYear();
    let formatTgl = `${tanggal} ${bulan} ${tahun}`;

    const article = document.createElement("article");
    article.className = "kotak-timeline";
    
    article.innerHTML = `
      <div class="titik-penanda"></div>
      <span class="info-waktu">Bulan ke-${item.ke} &bull; <time>${formatTgl}</time></span>
      <h3 class="nama-kegiatan">${item.tugas}</h3>
      <p class="deskripsi-kegiatan">${item.detail}</p>
    `;
    
    tempatJadwal.appendChild(article);
  });
}

window.onload = function() {
  let tglSimpanan = localStorage.getItem("tanggalTanamKakao");

  if (tglSimpanan) {
    document.getElementById("input-tanggal-tanam").value = tglSimpanan;
    buatJadwalPerawatan();
  }
};