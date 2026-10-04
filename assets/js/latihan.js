/* =========================================================
   NAPAS PULIH — Latihan napas interaktif & Tes jeda napas
   Teknik bisa ditambah/diubah di daftar TEKNIK.
   pola: [tarik, tahan, buang, tahan] dalam detik (0 = dilewati)
   ========================================================= */

const TEKNIK = [
  {
    id: "tenang",
    nama: "Napas Tenang",
    pola: [5.5, 0, 5.5, 0],
    ringkas: "Menyeimbangkan sistem saraf. Latihan dasar harian.",
    manfaat: "Ritme sekitar enam napas per menit membantu detak jantung dan sistem saraf kembali seimbang.",
    cara: "Tarik napas lewat hidung sampai perut mengembang lembut, lalu hembuskan pelan lewat hidung. Tetap ringan, tidak perlu menghirup sebanyak-banyaknya.",
    kapan: "Pagi hari, sebelum bekerja, atau kapan pun merasa tegang. Mulai 5 menit sehari.",
  },
  {
    id: "lega",
    nama: "Napas Lega",
    pola: [4, 0, 6, 0],
    ringkas: "Hembusan lebih panjang untuk meredakan cemas.",
    manfaat: "Hembusan yang lebih panjang dari tarikan membantu tubuh beralih ke mode istirahat dan cerna.",
    cara: "Tarik napas lewat hidung dengan lembut, lalu hembuskan lebih lama dan pelan, seperti meniup lilin dari jauh tanpa membuatnya padam.",
    kapan: "Saat cemas, gelisah, marah, atau setelah kejadian yang membuat kaget.",
  },
  {
    id: "kotak",
    nama: "Napas Kotak",
    pola: [4, 4, 4, 4],
    ringkas: "Empat sisi yang sama untuk fokus dan kendali diri.",
    manfaat: "Pola yang rata dan teratur membantu pikiran fokus dan tubuh tetap tenang di bawah tekanan.",
    cara: "Tarik napas lewat hidung, tahan dengan rileks, hembuskan, lalu tahan lagi. Jaga bahu tetap turun dan wajah santai.",
    kapan: "Sebelum ujian, rapat penting, berbicara di depan umum, atau saat pikiran kacau.",
  },
  {
    id: "tidur",
    nama: "Napas Menjelang Tidur",
    pola: [4, 7, 8, 0],
    ringkas: "Pola 4-7-8 untuk memperlambat tubuh sebelum tidur.",
    manfaat: "Tahanan dan hembusan yang panjang memperlambat ritme tubuh sehingga lebih mudah terlelap.",
    cara: "Tarik napas lewat hidung, tahan dengan tenang, lalu hembuskan perlahan. Jika menahan terasa berat, pilih Napas Lega.",
    kapan: "Di tempat tidur dengan lampu redup. Cukup 4 sampai 8 putaran.",
  },
  {
    id: "ringan",
    nama: "Napas Ringan",
    pola: [3, 0, 4, 0],
    ringkas: "Mengurangi volume napas, dasar napas fungsional.",
    manfaat: "Melatih tubuh terbiasa dengan napas yang lebih sedikit dan efisien. Latihan ini membantu menaikkan skor tes jeda napas.",
    cara: "Letakkan satu tangan di dada dan satu di perut. Tarik napas lebih kecil dari biasanya, lalu biarkan hembusan keluar santai. Rasa sedikit kurang udara itu wajar. Jika terlalu kuat, bernapas biasa 15 detik lalu lanjutkan.",
    kapan: "Dua sampai tiga kali sehari, masing-masing 3 sampai 5 menit.",
  },
  {
    id: "kustom",
    nama: "Atur Sendiri",
    pola: [4, 2, 6, 0],
    ringkas: "Tentukan sendiri hitungan tiap fase.",
    manfaat: "Cocok bila Anda sudah mendapat pola khusus dari pelatih atau ingin menaikkan durasi bertahap.",
    cara: "Isi lama tarik, tahan, buang, dan tahan (dalam detik). Isi 0 untuk melewati fase tahan.",
    kapan: "Sesuai program dari pendamping Anda.",
  },
];

const NAMA_FASE = ["Tarik", "Tahan", "Hembuskan", "Tahan"];
const UCAPAN_FASE = ["Tarik", "Tahan", "Buang", "Tahan"];

(function () {
  const $ = (s) => document.querySelector(s);
  const el = {
    daftar: $("#daftar-teknik"), judul: $("#teknik-judul"), ringkas: $("#teknik-ringkas"),
    orb: $("#orb"), fase: $("#orb-fase"), hitung: $("#orb-hitung"), progres: $("#orb-progres-isi"),
    durasi: $("#pilih-durasi"), suara: $("#suara"), panduan: $("#panduan-suara"),
    kustom: $("#atur-kustom"), sisa: $("#sisa-waktu"), putaran: $("#putaran"),
    mulai: $("#tombol-mulai"), henti: $("#tombol-henti"), selesai: $("#pesan-selesai"),
    manfaat: $("#info-manfaat"), cara: $("#info-cara"), kapan: $("#info-kapan"),
  };
  if (!el.orb) return;

  const KECIL = 0.58, BESAR = 1;
  const KELILING = 2 * Math.PI * 49;
  el.progres.style.strokeDasharray = KELILING;
  el.progres.style.strokeDashoffset = KELILING;

  let teknik = TEKNIK[0];
  let menitDipilih = 3;
  let status = "siap"; // siap | bersiap | jalan | jeda | selesai
  let waktuMulai = 0, waktuJeda = 0, totalJeda = 0, faseTerakhir = -1, hitungTerakhir = -1;
  let rafId = 0, kunciLayar = null, audioCtx = null;

  /* ----- Daftar teknik ----- */
  el.daftar.innerHTML = TEKNIK.map((t) => `
    <button class="teknik" type="button" data-id="${t.id}" aria-pressed="${t === teknik}">
      <strong>${t.nama}</strong>
      <span class="pola">${polaTeks(t.pola)}</span>
    </button>`).join("");
  el.daftar.addEventListener("click", (e) => {
    const b = e.target.closest(".teknik");
    if (!b) return;
    pilihTeknik(b.dataset.id);
  });

  function polaTeks(p) {
    const f = (n) => String(n).replace(".", ",");
    const bagian = [`Tarik ${f(p[0])}`];
    if (p[1]) bagian.push(`tahan ${f(p[1])}`);
    bagian.push(`buang ${f(p[2])}`);
    if (p[3]) bagian.push(`tahan ${f(p[3])}`);
    return bagian.join(", ") + " detik";
  }

  function pilihTeknik(id) {
    hentikan();
    teknik = TEKNIK.find((t) => t.id === id) || TEKNIK[0];
    el.daftar.querySelectorAll(".teknik").forEach((b) => b.setAttribute("aria-pressed", b.dataset.id === teknik.id));
    el.judul.textContent = teknik.nama;
    el.ringkas.textContent = teknik.ringkas;
    el.manfaat.textContent = teknik.manfaat;
    el.cara.textContent = teknik.cara;
    el.kapan.textContent = teknik.kapan;
    el.kustom.hidden = teknik.id !== "kustom";
    if (teknik.id === "kustom") isiKustom();
    perbaruiStatusAwal();
    simpan.taruh("napaspulih-teknik", teknik.id);
  }

  /* ----- Pola kustom ----- */
  const inputKustom = ["#k-tarik", "#k-tahan1", "#k-buang", "#k-tahan2"].map((s) => $(s));
  function isiKustom() { inputKustom.forEach((inp, i) => (inp.value = teknik.pola[i])); }
  inputKustom.forEach((inp, i) => inp.addEventListener("input", () => {
    let v = parseFloat(String(inp.value).replace(",", "."));
    if (isNaN(v) || v < 0) v = 0;
    if (v > 30) v = 30;
    if ((i === 0 || i === 2) && v < 1) v = 1;
    TEKNIK.find((t) => t.id === "kustom").pola[i] = v;
    if (status !== "siap") hentikan();
    perbaruiStatusAwal();
  }));

  /* ----- Durasi ----- */
  el.durasi.addEventListener("click", (e) => {
    const b = e.target.closest("button[data-menit]");
    if (!b) return;
    menitDipilih = Number(b.dataset.menit);
    el.durasi.querySelectorAll("button").forEach((x) => x.setAttribute("aria-pressed", x === b));
    if (status !== "siap") hentikan();
    perbaruiStatusAwal();
  });

  /* ----- Perhitungan sesi ----- */
  function fasePola() { return teknik.pola.map((d, i) => ({ i, d })).filter((f) => f.d > 0); }
  function panjangPutaran() { return teknik.pola.reduce((a, b) => a + b, 0); }
  function jumlahPutaran() { return Math.max(1, Math.round((menitDipilih * 60) / panjangPutaran())); }
  function totalDetik() { return jumlahPutaran() * panjangPutaran(); }
  const mmss = (s) => { s = Math.max(0, Math.ceil(s)); return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`; };
  const halus = (p) => 0.5 - Math.cos(Math.PI * p) / 2;

  function perbaruiStatusAwal() {
    el.sisa.textContent = mmss(totalDetik());
    el.putaran.textContent = `0 / ${jumlahPutaran()}`;
    el.fase.textContent = "Siap";
    el.hitung.textContent = "";
    el.orb.style.transform = `scale(${KECIL})`;
    el.progres.style.strokeDashoffset = KELILING;
    el.selesai.hidden = true;
  }

  /* ----- Suara ----- */
  function nada(frek, lama) {
    if (!el.suara.checked) return;
    try {
      audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
      const o = audioCtx.createOscillator(), g = audioCtx.createGain();
      o.type = "sine"; o.frequency.value = frek;
      g.gain.setValueAtTime(0, audioCtx.currentTime);
      g.gain.linearRampToValueAtTime(0.12, audioCtx.currentTime + 0.05);
      g.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + lama);
      o.connect(g).connect(audioCtx.destination);
      o.start(); o.stop(audioCtx.currentTime + lama + 0.05);
    } catch (e) { /* abaikan */ }
  }
  function ucap(teks) {
    if (!el.panduan.checked || !("speechSynthesis" in window)) return;
    try {
      speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(teks);
      u.lang = "id-ID"; u.rate = 0.85; u.pitch = 0.95;
      const suaraId = speechSynthesis.getVoices().find((v) => v.lang && v.lang.toLowerCase().startsWith("id"));
      if (suaraId) u.voice = suaraId;
      speechSynthesis.speak(u);
    } catch (e) { /* abaikan */ }
  }
  const FREK = [528, 440, 396, 440];

  /* ----- Kontrol ----- */
  el.mulai.addEventListener("click", () => {
    if (status === "siap" || status === "selesai") mulaiSesi();
    else if (status === "jalan" || status === "bersiap") jeda();
    else if (status === "jeda") lanjut();
  });
  el.henti.addEventListener("click", hentikan);

  async function pegangLayar() {
    try { if ("wakeLock" in navigator) kunciLayar = await navigator.wakeLock.request("screen"); } catch (e) { kunciLayar = null; }
  }
  function lepasLayar() { try { kunciLayar && kunciLayar.release(); } catch (e) {} kunciLayar = null; }

  function mulaiSesi() {
    if (audioCtx && audioCtx.state === "suspended") audioCtx.resume();
    status = "bersiap";
    el.selesai.hidden = true;
    totalJeda = 0; faseTerakhir = -1; hitungTerakhir = -1;
    waktuMulai = performance.now() + 3000; // 3 detik bersiap
    el.mulai.textContent = "Jeda";
    el.henti.hidden = false;
    pegangLayar();
    nada(660, 0.15);
    ucap("Bersiap");
    cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(langkah);
  }
  function jeda() {
    status = "jeda"; waktuJeda = performance.now();
    el.mulai.textContent = "Lanjutkan";
    el.fase.textContent = "Jeda";
    cancelAnimationFrame(rafId);
    try { speechSynthesis.cancel(); } catch (e) {}
  }
  function lanjut() {
    totalJeda += performance.now() - waktuJeda;
    status = performance.now() - totalJeda < waktuMulai ? "bersiap" : "jalan";
    el.mulai.textContent = "Jeda";
    faseTerakhir = -1;
    rafId = requestAnimationFrame(langkah);
  }
  function hentikan() {
    cancelAnimationFrame(rafId);
    status = "siap";
    el.mulai.textContent = "Mulai";
    el.henti.hidden = true;
    lepasLayar();
    try { speechSynthesis.cancel(); } catch (e) {}
    perbaruiStatusAwal();
  }
  function selesai() {
    cancelAnimationFrame(rafId);
    status = "selesai";
    el.mulai.textContent = "Ulangi";
    el.henti.hidden = true;
    el.fase.textContent = "Selesai";
    el.hitung.textContent = "";
    el.orb.style.transform = `scale(${KECIL})`;
    el.progres.style.strokeDashoffset = 0;
    el.sisa.textContent = "0:00";
    el.putaran.textContent = `${jumlahPutaran()} / ${jumlahPutaran()}`;
    el.selesai.hidden = false;
    lepasLayar();
    nada(528, 0.6); setTimeout(() => nada(660, 0.8), 350);
    ucap("Selesai. Bernapaslah seperti biasa.");
  }

  function langkah(now) {
    const t = (now - totalJeda - waktuMulai) / 1000;
    if (t < 0) {
      status = "bersiap";
      el.fase.textContent = "Bersiap";
      const n = Math.ceil(-t);
      el.hitung.textContent = n;
      if (n !== hitungTerakhir) { hitungTerakhir = n; }
      rafId = requestAnimationFrame(langkah);
      return;
    }
    status = "jalan";
    const total = totalDetik();
    if (t >= total) { selesai(); return; }

    const P = panjangPutaran();
    const dalam = t % P;
    const ke = Math.floor(t / P);
    let acc = 0, fase = null;
    for (const f of fasePola()) { if (dalam < acc + f.d) { fase = f; break; } acc += f.d; }
    if (!fase) fase = fasePola()[0];
    const p = (dalam - acc) / fase.d;

    let skala;
    if (fase.i === 0) skala = KECIL + (BESAR - KECIL) * halus(p);
    else if (fase.i === 1) skala = BESAR;
    else if (fase.i === 2) skala = BESAR - (BESAR - KECIL) * halus(p);
    else skala = KECIL;
    el.orb.style.transform = `scale(${skala.toFixed(4)})`;

    const kunci = ke * 4 + fase.i;
    if (kunci !== faseTerakhir) {
      faseTerakhir = kunci;
      el.fase.textContent = NAMA_FASE[fase.i];
      nada(FREK[fase.i], fase.i % 2 ? 0.25 : 0.5);
      ucap(UCAPAN_FASE[fase.i]);
    }
    el.hitung.textContent = Math.ceil(fase.d - (dalam - acc));
    el.sisa.textContent = mmss(total - t);
    el.putaran.textContent = `${ke + 1} / ${jumlahPutaran()}`;
    el.progres.style.strokeDashoffset = KELILING * (1 - t / total);
    rafId = requestAnimationFrame(langkah);
  }

  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible" && (status === "jalan" || status === "bersiap")) pegangLayar();
  });
  if ("speechSynthesis" in window) { try { speechSynthesis.getVoices(); } catch (e) {} }
  else { el.panduan.closest("label").hidden = true; }

  // Pilih teknik dari tautan (#ringan, dll.) atau pilihan terakhir
  const dariHash = TEKNIK.find((t) => "#" + t.id === location.hash);
  pilihTeknik(dariHash ? dariHash.id : simpan.ambil("napaspulih-teknik", "tenang"));
})();

/* =========================================================
   TES JEDA NAPAS (BOLT)
   ========================================================= */
(function () {
  const $ = (s) => document.querySelector(s);
  const angka = $("#tes-angka"), tombol = $("#tes-tombol"), hasil = $("#tes-hasil"),
        penunjuk = $("#skala-penunjuk"), riwayatEl = $("#tes-riwayat"), hapus = $("#tes-hapus");
  if (!angka) return;

  const KATEGORI = [
    { batas: 10, judul: "Perlu perhatian", teks: "Napas Anda kemungkinan cepat dan berat dalam keseharian. Mulailah dengan Napas Ringan dan Napas Tenang secara rutin, dan pertimbangkan pendampingan agar dasarnya terbangun dengan benar." },
    { batas: 20, judul: "Masih rendah", teks: "Masih ada ruang besar untuk perbaikan. Biasakan napas lewat hidung siang dan malam, dan latih Napas Ringan 2 sampai 3 kali sehari." },
    { batas: 30, judul: "Cukup baik", teks: "Pola napas Anda cukup baik. Latihan rutin dapat membantu Anda naik bertahap mendekati 40 detik." },
    { batas: 40, judul: "Baik", teks: "Napas Anda sudah ringan dan efisien. Pertahankan dengan latihan harian dan napas hidung saat tidur." },
    { batas: Infinity, judul: "Sangat baik", teks: "Skor ini menunjukkan pola napas yang sangat ringan. Pertahankan kebiasaan baik Anda." },
  ];

  let mulai = 0, raf = 0, jalan = false;
  let riwayat = simpan.ambil("napaspulih-tes", []);

  function tampilRiwayat() {
    if (!riwayat.length) { riwayatEl.innerHTML = '<p class="kecil">Hasil tes Anda akan tersimpan di sini, di perangkat ini saja.</p>'; hapus.hidden = true; return; }
    riwayatEl.innerHTML = "<strong>Riwayat tes</strong><ul>" + riwayat.slice().reverse().map((r) =>
      `<li><span>${new Date(r.t).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}</span><span>${r.d} detik</span></li>`).join("") + "</ul>";
    hapus.hidden = false;
  }

  function putar() {
    const d = (performance.now() - mulai) / 1000;
    angka.innerHTML = `${d.toFixed(1).replace(".", ",")}<small> dtk</small>`;
    raf = requestAnimationFrame(putar);
  }

  tombol.addEventListener("click", () => {
    if (!jalan) {
      jalan = true; mulai = performance.now();
      tombol.textContent = "Berhenti, saya perlu bernapas";
      hasil.hidden = true;
      raf = requestAnimationFrame(putar);
    } else {
      jalan = false; cancelAnimationFrame(raf);
      const d = Math.round((performance.now() - mulai) / 1000);
      angka.innerHTML = `${d}<small> dtk</small>`;
      tombol.textContent = "Ulangi tes";
      if (d < 1) return;
      const k = KATEGORI.find((x) => d < x.batas);
      hasil.innerHTML = `<strong>${k.judul}: ${d} detik</strong><p>${k.teks}</p>`;
      hasil.hidden = false;
      penunjuk.style.left = Math.min(100, (d / 40) * 100) + "%";
      riwayat.push({ t: Date.now(), d });
      riwayat = riwayat.slice(-7);
      simpan.taruh("napaspulih-tes", riwayat);
      tampilRiwayat();
    }
  });
  hapus.addEventListener("click", () => { riwayat = []; simpan.taruh("napaspulih-tes", riwayat); tampilRiwayat(); });
  tampilRiwayat();
})();
