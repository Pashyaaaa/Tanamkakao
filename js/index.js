const pages = {
  home: `
        <div class="container">
            <h2>Selamat Datang di TanamKakao</h2>
            <p>Platform pendukung peremajaan kakao anda.</p>
        </div>`,
  seed: `
        <div class="container">
            <h2>Smart Seed Matching</h2>
            <input type="text" id="lahan" placeholder="Masukkan jenis tanah...">
            <button onclick="cekBibit()">Cek Rekomendasi</button>
            <p id="hasil"></p>
        </div>`,
  kebun: `
        <div class="container">
            <h2>Fitur Kebun Saya</h2>
            <div class="card">
                <h3>Log Aktivitas</h3>
                <input type="text" id="activity" placeholder="Contoh: Pemupukan">
                <button onclick="addActivity()">Tambah</button>
                <ul id="list-aktivitas"></ul>
            </div>
        </div>`,
};

function showPage(page) {
  document.getElementById("content").innerHTML = pages[page] || pages["home"];
}

function cekBibit() {
  const input = document.getElementById("lahan").value;
  document.getElementById("hasil").innerText = input
    ? "Rekomendasi untuk " + input + ": Bibit MCC-02"
    : "Masukkan jenis tanah dulu!";
}

function addActivity() {
  const act = document.getElementById("activity").value;
  const ul = document.getElementById("list-aktivitas");
  if (act) {
    ul.innerHTML += `<li>${act}</li>`;
    document.getElementById("activity").value = "";
  }
}

// Init
showPage("home");
