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

function tampilkanData(data) {
  let wadah = document.getElementById("daftarPenjual");
  wadah.innerHTML = "";

  if (data.length === 0) {
    wadah.innerHTML =
      "<li class='empty-state'>Penjual nggak ketemu nih. Coba kata kunci lain.</li>";
    return;
  }

  for (let i = 0; i < data.length; i++) {
    let p = data[i];
    let li = document.createElement("li");
    li.className = "seller-card";

    li.innerHTML =
      "<article class='card-content'>" +
      "<img src='" +
      p.gambar +
      "' alt='Bibit Kakao' class='seller-img' style='width:100px; height:100px; object-fit:cover;'> " +
      "<h3 class='card-title'>" +
      p.nama +
      "</h3>" +
      "<p class='card-location'>Lokasi: " +
      p.lokasi +
      "</p>" +
      "<a href='detail-direktori.html?id=" +
      p.id +
      "' class='btn-secondary'>Lihat Detail Lengkap & Stok</a>" +
      "</article>";

    wadah.appendChild(li);
  }
}

tampilkanData(dataPenjual);

function filterPenjual() {
  let kataKunci = document.getElementById("cariLokasi").value.toLowerCase();
  let hasilFilter = dataPenjual.filter(
    (p) =>
      p.nama.toLowerCase().includes(kataKunci) ||
      p.lokasi.toLowerCase().includes(kataKunci)
  );
  tampilkanData(hasilFilter);
}

document.getElementById("cariLokasi").addEventListener("input", filterPenjual);
