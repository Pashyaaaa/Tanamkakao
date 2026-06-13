(function () {
  "use strict";

  const DATABASE_VARIETAS = [
    {
      id: "sulawesi_1",
      nama: "Sulawesi 1",
      asal: "Sulawesi Selatan (hasil seleksi nasional)",
      produktivitas: "1,8 – 2,5 ton/ha/tahun",
      beratBiji: "1,1 gram (kering)",
      kadarLemak: "48–50%",
      keunggulan: [
        "Tahan VSD",
        "Produktivitas tinggi",
        "Adaptif dataran rendah–menengah",
      ],
      kelemahan: ["Rentan PBK jika tidak dirawat", "Kadar lemak sedang"],
      syarat: {
        ketinggianMin: 0,
        ketinggianMax: 900,
        curahHujanMin: 1100,
        curahHujanMax: 3000,
        suhuMin: 21,
        suhuMax: 32,
        phMin: 5.5,
        phMax: 7.5,
        tanahCocok: ["latosol", "andosol", "alluvial", "podsolik"],
      },
      prioritasCocok: ["produktivitas", "tahan_hama"],
      tipePrioritas: {
        produktivitas: 10,
        tahan_hama: 8,
        fermentasi: 5,
        cepat_panen: 6,
      },
      sumber: "Kementan RI (anjuran 2014)",
    },
    {
      id: "sulawesi_2",
      nama: "Sulawesi 2",
      asal: "Sulawesi Selatan",
      produktivitas: "2,0 – 2,75 ton/ha/tahun",
      beratBiji: "1,1 gram (kering)",
      kadarLemak: "45–47%",
      keunggulan: [
        "Tahan busuk buah (Phytophthora)",
        "Tahan VSD",
        "Produktivitas tertinggi di kelas ini",
      ],
      kelemahan: ["Kadar lemak sedikit lebih rendah dari ICCRI"],
      syarat: {
        ketinggianMin: 0,
        ketinggianMax: 900,
        curahHujanMin: 1100,
        curahHujanMax: 3000,
        suhuMin: 21,
        suhuMax: 32,
        phMin: 5.5,
        phMax: 7.5,
        tanahCocok: ["latosol", "andosol", "alluvial", "podsolik"],
      },
      prioritasCocok: ["produktivitas", "tahan_hama"],
      tipePrioritas: {
        produktivitas: 12,
        tahan_hama: 10,
        fermentasi: 4,
        cepat_panen: 6,
      },
      sumber: "Kementan RI (anjuran 2014)",
    },
    {
      id: "iccri_03",
      nama: "ICCRI 03",
      asal: "Puslitkoka Jember",
      produktivitas: "2,09 ton/ha/tahun",
      beratBiji: "1,28 gram (kering)",
      kadarLemak: "55,01%",
      keunggulan: [
        "Kadar lemak tinggi (55%)",
        "Tahan busuk buah & PBK",
        "Biji besar untuk fermentasi",
      ],
      kelemahan: ["Perlu manajemen pemupukan intensif"],
      syarat: {
        ketinggianMin: 0,
        ketinggianMax: 700,
        curahHujanMin: 1500,
        curahHujanMax: 2500,
        suhuMin: 23,
        suhuMax: 31,
        phMin: 6.0,
        phMax: 7.0,
        tanahCocok: ["andosol", "alluvial", "latosol"],
      },
      prioritasCocok: ["fermentasi", "produktivitas"],
      tipePrioritas: {
        produktivitas: 9,
        tahan_hama: 8,
        fermentasi: 15,
        cepat_panen: 5,
      },
      sumber: "Puslitkoka Jember / Kementan RI (anjuran 2014)",
    },
    {
      id: "iccri_04",
      nama: "ICCRI 04",
      asal: "Puslitkoka Jember",
      produktivitas: "2,06 ton/ha/tahun",
      beratBiji: "1,27 gram (kering)",
      kadarLemak: "55,07%",
      keunggulan: [
        "Kadar lemak tertinggi (55%)",
        "Kualitas biji premium",
        "Tahan PBK",
      ],
      kelemahan: ["Rentan VSD", "Butuh kondisi optimal"],
      syarat: {
        ketinggianMin: 0,
        ketinggianMax: 600,
        curahHujanMin: 1500,
        curahHujanMax: 2500,
        suhuMin: 24,
        suhuMax: 31,
        phMin: 6.0,
        phMax: 7.0,
        tanahCocok: ["andosol", "alluvial", "latosol"],
      },
      prioritasCocok: ["fermentasi"],
      tipePrioritas: {
        produktivitas: 8,
        tahan_hama: 5,
        fermentasi: 15,
        cepat_panen: 5,
      },
      sumber: "Puslitkoka Jember / Kementan RI (anjuran 2014)",
    },
    {
      id: "tsh_858",
      nama: "TSH 858",
      asal: "Trinidad (diintroduksi ke Indonesia)",
      produktivitas: "1,5 – 2,0 ton/ha/tahun",
      beratBiji: "1,2 gram (kering)",
      kadarLemak: "50–53%",
      keunggulan: [
        "Adaptif dataran rendah–menengah",
        "Cocok lahan kering",
        "Umum & mudah didapat",
      ],
      kelemahan: [
        "Produktivitas lebih rendah dari ICCRI",
        "Perlu penyerbukan silang",
      ],
      syarat: {
        ketinggianMin: 0,
        ketinggianMax: 800,
        curahHujanMin: 1100,
        curahHujanMax: 3000,
        suhuMin: 20,
        suhuMax: 32,
        phMin: 5.5,
        phMax: 7.5,
        tanahCocok: ["latosol", "podsolik", "regosol", "alluvial", "andosol"],
      },
      prioritasCocok: ["produktivitas", "cepat_panen"],
      tipePrioritas: {
        produktivitas: 7,
        tahan_hama: 6,
        fermentasi: 8,
        cepat_panen: 10,
      },
      sumber: "Puslitkoka / Sariagri Perkebunan",
    },
    {
      id: "ics_60",
      nama: "ICS 60",
      asal: "Trinidad (International Cocoa Selection)",
      produktivitas: "1,5 – 1,9 ton/ha/tahun",
      beratBiji: "1,15 gram (kering)",
      kadarLemak: "50–52%",
      keunggulan: [
        "Batang bawah terbaik untuk okulasi",
        "Adaptif berbagai tanah",
        "Toleran naungan",
      ],
      kelemahan: [
        "Produktivitas lebih rendah",
        "Kurang ideal untuk monokultur",
      ],
      syarat: {
        ketinggianMin: 0,
        ketinggianMax: 700,
        curahHujanMin: 1100,
        curahHujanMax: 2500,
        suhuMin: 22,
        suhuMax: 32,
        phMin: 5.5,
        phMax: 7.5,
        tanahCocok: ["latosol", "alluvial", "andosol", "podsolik", "grumusol"],
      },
      prioritasCocok: ["tahan_hama", "cepat_panen"],
      tipePrioritas: {
        produktivitas: 5,
        tahan_hama: 9,
        fermentasi: 6,
        cepat_panen: 9,
      },
      sumber: "Puslitkoka / Sariagri Perkebunan",
    },
    {
      id: "mcc_02",
      nama: "MCC 02",
      asal: "Masamba, Luwu Utara (rekomendasi ACIAR × Puslitkoka)",
      produktivitas: "> 3,0 ton/ha/tahun",
      beratBiji: "1,3 gram (kering)",
      kadarLemak: "52–54%",
      keunggulan: [
        "Produktivitas tertinggi di Indonesia (>3 ton/ha)",
        "Cocok dataran rendah tropis",
      ],
      kelemahan: [
        "Inkompatibel penyerbukan sendiri (butuh klon pasangan)",
        "Ketersediaan bibit terbatas",
      ],
      syarat: {
        ketinggianMin: 0,
        ketinggianMax: 500,
        curahHujanMin: 1500,
        curahHujanMax: 3000,
        suhuMin: 24,
        suhuMax: 32,
        phMin: 6.0,
        phMax: 7.5,
        tanahCocok: ["alluvial", "latosol", "andosol"],
      },
      prioritasCocok: ["produktivitas"],
      tipePrioritas: {
        produktivitas: 18,
        tahan_hama: 5,
        fermentasi: 7,
        cepat_panen: 8,
      },
      sumber: "ACIAR × Puslitkoka",
    },
    {
      id: "scavina_6",
      nama: "Scavina 6 (Sca 6)",
      asal: "Peru (diintroduksi ICCO)",
      produktivitas: "1,2 – 1,8 ton/ha/tahun",
      beratBiji: "1,0 gram (kering)",
      kadarLemak: "48–50%",
      keunggulan: [
        "Ketahanan hama & penyakit terbaik (PBK, VSD, busuk buah)",
        "Sumber genetik tahan penyakit",
      ],
      kelemahan: [
        "Produktivitas relatif lebih rendah",
        "Lebih cocok sebagai komponen persilangan",
      ],
      syarat: {
        ketinggianMin: 100,
        ketinggianMax: 800,
        curahHujanMin: 1500,
        curahHujanMax: 2500,
        suhuMin: 22,
        suhuMax: 30,
        phMin: 6.0,
        phMax: 7.0,
        tanahCocok: ["andosol", "latosol", "alluvial"],
      },
      prioritasCocok: ["tahan_hama"],
      tipePrioritas: {
        produktivitas: 4,
        tahan_hama: 18,
        fermentasi: 6,
        cepat_panen: 4,
      },
      sumber: "Balittri Kementan RI / Kementan (anjuran 2014)",
    },
  ];

  const BATAS_UMUM = {
    ketinggianMax: 1000,
    curahHujanMin: 1000,
    curahHujanMax: 4500,
    suhuMin: 18,
    suhuMax: 35,
    phMin: 4.5,
    phMax: 8.5,
  };

  function hitungSkor(lahan, varietas) {
    const s = varietas.syarat;
    let skor = 0,
      detail = [];
    const ktg = parseFloat(lahan.ketinggian);
    if (ktg >= s.ketinggianMin && ktg <= s.ketinggianMax) {
      skor += 25;
      detail.push({ param: "Ketinggian", status: "optimal", poin: 25 });
    } else if (ktg < s.ketinggianMin) {
      const penalti = Math.min(25, ((s.ketinggianMin - ktg) / 200) * 10);
      skor += Math.max(0, 25 - penalti);
      detail.push({
        param: "Ketinggian",
        status: "rendah",
        poin: Math.max(0, 25 - penalti),
      });
    } else {
      const penalti = Math.min(25, ((ktg - s.ketinggianMax) / 100) * 12);
      skor += Math.max(0, 25 - penalti);
      detail.push({
        param: "Ketinggian",
        status: "tinggi",
        poin: Math.max(0, 25 - penalti),
      });
    }
    const ch = parseFloat(lahan.curahHujan);
    if (ch >= s.curahHujanMin && ch <= s.curahHujanMax) {
      skor += 20;
      detail.push({ param: "Curah Hujan", status: "optimal", poin: 20 });
    } else {
      const jarak =
        ch < s.curahHujanMin ? s.curahHujanMin - ch : ch - s.curahHujanMax;
      const penalti = Math.min(20, (jarak / 300) * 10);
      skor += Math.max(0, 20 - penalti);
      detail.push({
        param: "Curah Hujan",
        status: ch < s.curahHujanMin ? "kurang" : "berlebih",
        poin: Math.max(0, 20 - penalti),
      });
    }
    const suhu = parseFloat(lahan.suhu);
    if (suhu >= s.suhuMin && suhu <= s.suhuMax) {
      skor += 20;
      detail.push({ param: "Suhu", status: "optimal", poin: 20 });
    } else {
      const jarak = suhu < s.suhuMin ? s.suhuMin - suhu : suhu - s.suhuMax;
      const penalti = Math.min(20, jarak * 4);
      skor += Math.max(0, 20 - penalti);
      detail.push({
        param: "Suhu",
        status: suhu < s.suhuMin ? "dingin" : "panas",
        poin: Math.max(0, 20 - penalti),
      });
    }
    const ph = parseFloat(lahan.phTanah);
    if (ph >= s.phMin && ph <= s.phMax) {
      skor += 20;
      detail.push({ param: "pH Tanah", status: "optimal", poin: 20 });
    } else {
      const jarak = ph < s.phMin ? s.phMin - ph : ph - s.phMax;
      const penalti = Math.min(20, jarak * 6);
      skor += Math.max(0, 20 - penalti);
      detail.push({
        param: "pH",
        status: ph < s.phMin ? "asam" : "basa",
        poin: Math.max(0, 20 - penalti),
      });
    }
    if (s.tanahCocok.includes(lahan.jenisTanah)) {
      skor += 10;
      detail.push({ param: "Jenis Tanah", status: "cocok", poin: 10 });
    } else {
      skor += 3;
      detail.push({ param: "Jenis Tanah", status: "kurang cocok", poin: 3 });
    }
    const prioritasBonus = lahan.prioritas
      ? (varietas.tipePrioritas[lahan.prioritas] || 0) * 0.25
      : 0;
    skor = Math.min(100, Math.round(skor + prioritasBonus));
    return { skor, detail };
  }

  function cekSyaratUmum(lahan) {
    const peringatan = [],
      ktg = parseFloat(lahan.ketinggian),
      ch = parseFloat(lahan.curahHujan),
      suhu = parseFloat(lahan.suhu),
      ph = parseFloat(lahan.phTanah);
    if (ktg > BATAS_UMUM.ketinggianMax)
      peringatan.push(
        `⚠️ Ketinggian ${ktg} mdpl melebihi batas ideal (>1.000 mdpl).`,
      );
    if (ch < BATAS_UMUM.curahHujanMin)
      peringatan.push(`⚠️ Curah hujan ${ch} mm/th terlalu rendah.`);
    if (ch > BATAS_UMUM.curahHujanMax)
      peringatan.push(`⚠️ Curah hujan ${ch} mm/th sangat tinggi.`);
    if (suhu < BATAS_UMUM.suhuMin || suhu > BATAS_UMUM.suhuMax)
      peringatan.push(`⚠️ Suhu ${suhu}°C di luar rentang toleransi kakao.`);
    if (ph < BATAS_UMUM.phMin || ph > BATAS_UMUM.phMax)
      peringatan.push(`⚠️ pH ${ph} sangat ekstrem.`);
    return peringatan;
  }

  function rekomendasikan(lahan) {
    const peringatan = cekSyaratUmum(lahan);
    const skorList = DATABASE_VARIETAS.map((v) => {
      const { skor, detail } = hitungSkor(lahan, v);
      return { ...v, skor, detail };
    });
    skorList.sort((a, b) => b.skor - a.skor);
    const top3 = skorList.slice(0, 3);
    const analisis = buatAnalisis(lahan, top3);
    return { top3, peringatan, analisis };
  }

  function buatAnalisis(lahan, top3) {
    const ktg = parseFloat(lahan.ketinggian),
      ph = parseFloat(lahan.phTanah);
    const paragraf = [];
    let p1 = `Berdasarkan data lahan, kondisi kebun kamu termasuk kategori ${ktg <= 300 ? "dataran rendah tropis" : ktg <= 600 ? "dataran menengah" : "dataran agak tinggi"}. `;
    p1 +=
      ph >= 6.0 && ph <= 7.0
        ? "pH tanah ideal untuk hara maksimal."
        : ph < 6.0
          ? "pH agak asam, disarankan pengapuran."
          : "pH cenderung basa, tambahkan bahan organik.";
    paragraf.push(p1);
    const v1 = top3[0];
    let p2 = `Varietas ${v1.nama} mendapat skor ${v1.skor}/100 karena parameter lahan sesuai. Dengan potensi ${v1.produktivitas}, varietas ini sangat direkomendasikan.`;
    paragraf.push(p2);
    let p3 =
      "Tips: " +
      (ph < 6.0 ? "lakukan pengapuran, " : "") +
      "tanam di awal musim hujan, pasang tanaman penaung.";
    paragraf.push(p3);
    return paragraf.join("\n\n");
  }

  window.SmartSeedingEngine = { rekomendasikan, DATABASE_VARIETAS };
})();
