function buatJadwalPerawatan() {
  // 1. Ambil nilai tanggal dari form input HTML
  let tglInput = document.getElementById("input-tanggal-tanam").value;

  // Validasi jika user belum memilih tanggal
  if (!tglInput) {
    alert("Silakan pilih tanggal penanaman terlebih dahulu!");
    return;
  }

  // 2. Ambil elemen wadah timeline, lalu kosongkan isinya
  let tempatJadwal = document.getElementById("wadah-timeline-jadwal");
  tempatJadwal.innerHTML = "";

  // Konversi input string menjadi objek Date
  let tglMulai = new Date(tglInput);

  // 3. Data rencana perawatan master
  const rencanaRawat = [
    {
      ke: 1,
      tugas: "Pemupukan NPK Tahap I",
      detail:
        "Berikan pupuk NPK sebanyak 50 gram per pohon. Taburkan secara melingkar di bawah tajuk tanaman kakao.",
    },
    {
      ke: 3,
      tugas: "Penyiangan Gulma & Tunas Air",
      detail:
        "Bersihkan rumput liar di sekitar piringan tanaman dan pangkas tunas air yang tumbuh di batang utama.",
    },
    {
      ke: 6,
      tugas: "Pemangkasan Bentuk Tahap Awalan",
      detail:
        "Pilih 3-4 cabang primer (jorget) yang letaknya merata dan sehat, lalu potong cabang sekunder yang terlalu rapat.",
    },
    {
      ke: 12,
      tugas: "Penyulaman & Pemupukan Organik",
      detail:
        "Ganti bibit kakao yang mati/kerdil dengan bibit cadangan yang seumur. Tambahkan pupuk kandang/kompos 5-10 kg per lubang.",
    },
    {
      ke: 18,
      tugas: "Pemangkasan Pemeliharaan TBM",
      detail:
        "Atur percabangan agar tidak saling menutupi. Pastikan sinar matahari bisa menembus masuk ke bagian dalam tanaman.",
    },
  ];

  // Array Bulan Bahasa Indonesia
  const namaBulan = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];

  // 4. Lakukan perulangan untuk menyuntikkan HTML baru
  rencanaRawat.forEach((item) => {
    // Salin tanggal awal
    let tglTarget = new Date(tglMulai);
    
    // Tambahkan bulan secara dinamis
    tglTarget.setMonth(tglTarget.getMonth() + item.ke);

    // Ekstrak Tanggal, Bulan, Tahun
    let tanggal = tglTarget.getDate();
    let bulan = namaBulan[tglTarget.getMonth()];
    let tahun = tglTarget.getFullYear();
    let formatTgl = `${tanggal} ${bulan} ${tahun}`;

    // Buat elemen artikel
    const article = document.createElement("article");
    article.className = "kotak-timeline";
    
    article.innerHTML = `
      <div class="titik-penanda"></div>
      <span class="info-waktu">Bulan ke-${item.ke} &bull; <time>${formatTgl}</time></span>
      <h3 class="nama-kegiatan">${item.tugas}</h3>
      <p class="deskripsi-kegiatan">${item.detail}</p>
    `;
    
    // Masukkan ke dalam DOM
    tempatJadwal.appendChild(article);
  });
}

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