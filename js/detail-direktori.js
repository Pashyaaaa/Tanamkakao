let dataPenjual = [
  {
    id: 1,
    nama: "Tani Jaya Kakao",
    lokasi: "Banyuwangi",
    stok: "Sulawesi 1 (300 pohon), MCC 02 (150 pohon)",
    kontak: "0813-XXXX-XXXX",
    deskripsi:
      "Menyediakan bibit kakao unggulan dengan sertifikasi resmi dan garansi pertumbuhan.",
    gambar: "../assets/img/bibit-kakao.jpg",
  },
  {
    id: 2,
    nama: "Kebun Subur Makmur",
    lokasi: "Jember",
    stok: "MCC 02 (500 pohon)",
    kontak: "0812-XXXX-XXXX",
    deskripsi:
      "Spesialis bibit klon MCC 02 kualitas super, siap kirim antar kota.",
    gambar: "../assets/img/bibit-kakao.jpg",
  },
  {
    id: 3,
    nama: "Bibit Unggul Madura",
    lokasi: "Bangkalan",
    stok: "ICCRI 03 (200 pohon)",
    kontak: "0852-XXXX-XXXX",
    deskripsi:
      "Menyediakan bibit lokal Madura yang adaptif terhadap cuaca panas.",
    gambar: "../assets/img/bibit-kakao.jpg",
  },
  {
    id: 4,
    nama: "Kakao Nusantara",
    lokasi: "Malang",
    stok: "Sulawesi 1 (100 pohon)",
    kontak: "0819-XXXX-XXXX",
    deskripsi: "Penyedia bibit skala kecil dan besar untuk perkebunan rakyat.",
    gambar: "../assets/img/bibit-kakao.jpg",
  },
];

let URLParams = new URLSearchParams(window.location.search);
let idDicari = parseInt(URLParams.get("id"));

let dataKetemu = dataPenjual.find((p) => p.id === idDicari);

if (dataKetemu) {
  document.getElementById("namaPenjual").innerText = dataKetemu.nama;
  document.getElementById("lokasiPenjual").innerText = dataKetemu.lokasi;
  document.getElementById("kontakPenjual").innerText = dataKetemu.kontak;
  document.getElementById("stokPenjual").innerText = dataKetemu.stok;
  document.getElementById("deskripsiPenjual").innerText = dataKetemu.deskripsi;
  document.getElementById("imgPenjual").src = dataKetemu.gambar;
} else {
  document.getElementById("namaPenjual").innerText =
    "Data Penjual Tidak Ditemukan";
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