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
