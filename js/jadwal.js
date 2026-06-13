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