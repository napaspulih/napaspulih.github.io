/* =========================================================
   NAPAS PULIH — Skrip umum (header, footer, keranjang, WhatsApp)
   Menu navigasi diatur di DAFTAR_MENU di bawah ini.
   ========================================================= */

const DAFTAR_MENU = [
  { href: "index.html", label: "Beranda", id: "beranda" },
  { href: "latihan.html", label: "Latihan Napas", id: "latihan" },
  { href: "pelatihan.html", label: "Pelatihan PULIH", id: "pelatihan" },
  { href: "pendampingan.html", label: "Pendampingan", id: "pendampingan" },
  { href: "toko.html", label: "Toko", id: "toko" },
  { href: "tentang.html", label: "Tentang", id: "tentang" },
  { href: "kelas.html", label: "Kelas Saya", id: "kelas" },
];

const IKON = {
  wa: '<svg class="ikon-wa" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.5 14.4c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.4-.5c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4-.1-.2-.3-.3-.6-.4zM12 21.5c-1.7 0-3.3-.5-4.7-1.3l-.3-.2-3.5.9.9-3.4-.2-.4A9.4 9.4 0 0 1 2.6 12C2.6 6.8 6.8 2.6 12 2.6S21.4 6.8 21.4 12 17.2 21.5 12 21.5zM12 .8C5.8.8.8 5.8.8 12c0 2 .5 3.9 1.5 5.6L.7 23.3l5.9-1.5c1.6.9 3.5 1.4 5.4 1.4 6.2 0 11.2-5 11.2-11.2S18.2.8 12 .8z"/></svg>',
  ig: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4.2"/><circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none"/></svg>',
  yt: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M22.5 7.2a2.8 2.8 0 0 0-2-2C18.8 4.8 12 4.8 12 4.8s-6.8 0-8.5.4a2.8 2.8 0 0 0-2 2C1.1 8.9 1.1 12 1.1 12s0 3.1.4 4.8a2.8 2.8 0 0 0 2 2c1.7.4 8.5.4 8.5.4s6.8 0 8.5-.4a2.8 2.8 0 0 0 2-2c.4-1.7.4-4.8.4-4.8s0-3.1-.4-4.8zM9.8 15.1V8.9l5.6 3.1-5.6 3.1z"/></svg>',
  fb: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M13.5 21.9v-8.2h2.8l.4-3.2h-3.2V8.4c0-.9.3-1.6 1.6-1.6h1.7V4a23 23 0 0 0-2.5-.1c-2.5 0-4.2 1.5-4.2 4.3v2.4H7.3v3.2h2.8v8.2h3.4z"/></svg>',
  keranjang: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 7h14l-1.3 10.2a2 2 0 0 1-2 1.8H8.3a2 2 0 0 1-2-1.8L5 7z"/><path d="M9 7V6a3 3 0 0 1 6 0v1"/></svg>',
  menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M4 8h16M4 16h16"/></svg>',
  tutup: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>',
};

/* ---------- Penyimpanan aman (tetap jalan walau diblokir) ---------- */
const simpan = {
  ambil(kunci, bawaan) {
    try { const v = localStorage.getItem(kunci); return v ? JSON.parse(v) : bawaan; } catch (e) { return bawaan; }
  },
  taruh(kunci, nilai) {
    try { localStorage.setItem(kunci, JSON.stringify(nilai)); } catch (e) { /* abaikan */ }
  },
};

const rupiah = (n) => "Rp" + Number(n).toLocaleString("id-ID");
const tautanWA = (pesan) => `https://wa.me/${PENGATURAN.whatsapp}?text=${encodeURIComponent(pesan)}`;

function bukaWA(pesan, wadahCadangan) {
  const url = tautanWA(pesan);
  const jendela = window.open(url, "_blank", "noopener");
  if (!jendela && wadahCadangan) {
    wadahCadangan.innerHTML = `<a class="tombol tombol-utama" href="${url}" target="_blank" rel="noopener">${IKON.wa} Buka WhatsApp</a>`;
  }
}

/* ---------- Toast ---------- */
let toastTimer;
function toast(teks) {
  let el = document.querySelector(".toast");
  if (!el) { el = document.createElement("div"); el.className = "toast"; el.setAttribute("role", "status"); document.body.appendChild(el); }
  el.textContent = teks;
  el.classList.add("tampil");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("tampil"), 2400);
}

/* ---------- Header & Footer ---------- */
function merekHTML() {
  return `<a class="merek" href="index.html" aria-label="Napas Pulih, ke beranda">
    <img src="assets/img/logo.png" alt="" width="27" height="42">
    <span class="merek-kata" aria-hidden="true"><span>Napas</span><span>Pulih</span></span>
  </a>`;
}

function pasangHeader() {
  const tempat = document.getElementById("header");
  if (!tempat) return;
  const aktif = document.body.dataset.halaman;
  tempat.outerHTML = `
  <header class="header" id="header">
    <div class="wadah header-isi">
      ${merekHTML()}
      <nav class="nav" id="nav" aria-label="Menu utama">
        ${DAFTAR_MENU.map((m) => `<a href="${m.href}"${m.id === aktif ? ' aria-current="page"' : ""}>${m.label}</a>`).join("")}
      </nav>
      <div class="header-aksi">
        <a class="tombol tombol-utama tombol-kecil tombol-header" href="latihan.html">Mulai latihan</a>
        <button class="tombol-keranjang" type="button" data-buka-keranjang aria-label="Buka keranjang">
          ${IKON.keranjang}<span class="jumlah-keranjang" hidden>0</span>
        </button>
        <button class="tombol-menu" type="button" aria-label="Buka menu" aria-expanded="false" aria-controls="nav">${IKON.menu}</button>
      </div>
    </div>
  </header>`;

  const header = document.getElementById("header");
  const nav = document.getElementById("nav");
  const tMenu = header.querySelector(".tombol-menu");
  tMenu.addEventListener("click", () => {
    const buka = nav.classList.toggle("buka");
    tMenu.setAttribute("aria-expanded", buka);
    tMenu.innerHTML = buka ? IKON.tutup : IKON.menu;
  });
  const cekGulir = () => header.classList.toggle("tergulir", window.scrollY > 8);
  window.addEventListener("scroll", cekGulir, { passive: true });
  cekGulir();
}

function pasangFooter() {
  const tempat = document.getElementById("footer");
  if (!tempat) return;
  const P = PENGATURAN;
  const sos = [
    P.instagram && `<li><a href="${P.instagram}" target="_blank" rel="noopener">Instagram</a></li>`,
    P.youtube && `<li><a href="${P.youtube}" target="_blank" rel="noopener">YouTube</a></li>`,
    P.facebook && `<li><a href="${P.facebook}" target="_blank" rel="noopener">Facebook</a></li>`,
  ].filter(Boolean).join("");
  const tahun = new Date().getFullYear();
  tempat.outerHTML = `
  <footer class="footer">
    <div class="wadah">
      <div class="footer-grid">
        <div>
          <a class="merek" href="index.html" aria-label="Napas Pulih">
            <img src="assets/img/logo-putih.png" alt="" width="27" height="42">
            <span class="merek-kata" aria-hidden="true"><span>Napas</span><span>Pulih</span></span>
          </a>
          <p class="footer-disclaimer">Pelatihan napas fungsional dan pendampingan bersama Dika Duwiyanto, S.Ag., M.Psi. Materi di situs ini bersifat edukasi dan tidak menggantikan diagnosis atau pengobatan dari tenaga kesehatan.</p>
        </div>
        <div>
          <h4>Belajar</h4>
          <ul>
            <li><a href="latihan.html">Latihan napas</a></li>
            <li><a href="latihan.html#tes">Tes jeda napas</a></li>
            <li><a href="pelatihan.html">Pelatihan 5 Metode PULIH</a></li>
            <li><a href="pendampingan.html">Pendampingan personal</a></li>
            <li><a href="kelas.html">Kelas Saya (peserta)</a></li>
          </ul>
        </div>
        <div>
          <h4>Toko</h4>
          <ul>
            <li><a href="toko.html#ebook">E-book</a></li>
            <li><a href="toko.html#buku">Buku</a></li>
            <li><a href="toko.html#alat">Alat bantu napas</a></li>
            <li><a href="toko.html#digital">Produk digital</a></li>
          </ul>
        </div>
        <div>
          <h4>Hubungi</h4>
          <ul>
            <li><a href="${tautanWA("Halo Napas Pulih, saya ingin bertanya.")}" target="_blank" rel="noopener">WhatsApp</a></li>
            ${P.email ? `<li><a href="mailto:${P.email}">${P.email}</a></li>` : ""}
            ${sos}
          </ul>
        </div>
      </div>
      <div class="footer-bawah">
        <span>© ${tahun} Napas Pulih · Dika Duwiyanto</span>
        <span>Hentikan latihan bila pusing atau tidak nyaman.</span>
      </div>
    </div>
  </footer>`;
}

/* ---------- Tautan WhatsApp otomatis ----------
   Tambahkan atribut data-wa="isi pesan" pada <a> mana pun. */
function pasangTautanWA() {
  document.querySelectorAll("[data-wa]").forEach((a) => {
    a.href = tautanWA(a.dataset.wa);
    a.target = "_blank";
    a.rel = "noopener";
  });
  document.querySelectorAll("[data-sosial]").forEach((wadah) => {
    const P = PENGATURAN;
    const daftar = [
      P.instagram && `<a href="${P.instagram}" target="_blank" rel="noopener">${IKON.ig} Instagram</a>`,
      P.youtube && `<a href="${P.youtube}" target="_blank" rel="noopener">${IKON.yt} YouTube</a>`,
      P.facebook && `<a href="${P.facebook}" target="_blank" rel="noopener">${IKON.fb} Facebook</a>`,
    ].filter(Boolean);
    wadah.innerHTML = daftar.join("");
  });
  document.querySelectorAll("[data-ikon-wa]").forEach((el) => el.insertAdjacentHTML("afterbegin", IKON.wa));
}

/* ---------- Formulir ke WhatsApp ----------
   <form data-form-wa="Judul pesan"> dengan isian yang punya data-label. */
function pasangFormWA() {
  document.querySelectorAll("form[data-form-wa]").forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const galat = form.querySelector(".pesan-galat");
      const kosong = [...form.querySelectorAll("[required]")].find((el) => !el.value.trim());
      if (kosong) {
        if (galat) galat.textContent = `Lengkapi isian "${kosong.dataset.label}" terlebih dahulu.`;
        kosong.focus();
        return;
      }
      if (galat) galat.textContent = "";
      const baris = [...form.querySelectorAll("[data-label]")]
        .filter((el) => el.value.trim())
        .map((el) => `${el.dataset.label}: ${el.value.trim()}`);
      const pesan = `Halo Napas Pulih, ${form.dataset.formWa}\n\n${baris.join("\n")}`;
      bukaWA(pesan, form.querySelector(".cadangan-wa"));
    });
  });
}

/* =========================================================
   PRODUK & KERANJANG
   ========================================================= */
const NAMA_KATEGORI = { ebook: "E-book", buku: "Buku", alat: "Alat bantu napas", digital: "Produk digital" };
const KATEGORI_DIGITAL = ["ebook", "digital"];
const NAMA_STATUS = { preorder: "Pre-order", habis: "Stok habis" };

function terang(hex) {
  const h = hex.replace("#", "");
  const r = parseInt(h.substr(0, 2), 16), g = parseInt(h.substr(2, 2), 16), b = parseInt(h.substr(4, 2), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 150;
}

const ILUSTRASI = {
  plester: '<svg class="ilustrasi-produk" viewBox="0 0 120 120" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><circle cx="52" cy="58" r="34" fill="#fff"/><circle cx="52" cy="58" r="14"/><path d="M80 78l26 12-4 12-30-10" fill="#fff" stroke-linejoin="round"/><path d="M52 24a34 34 0 0 1 30 50" stroke-dasharray="3 6"/></svg>',
  audio: '<svg class="ilustrasi-produk" viewBox="0 0 120 120" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true"><rect x="30" y="12" width="60" height="96" rx="12" fill="#fff"/><path d="M44 60v0M50 52v16M56 44v32M62 50v20M68 40v40M74 54v12"/><circle cx="60" cy="96" r="4"/></svg>',
  jurnal: '<svg class="ilustrasi-produk" viewBox="0 0 120 120" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true"><rect x="28" y="14" width="66" height="92" rx="6" fill="#fff"/><path d="M28 30h-6M28 46h-6M28 62h-6M28 78h-6M28 94h-6"/><path d="M44 40h34M44 52h34M44 64h22"/><circle cx="72" cy="84" r="9"/><path d="M72 79v5l3 2"/></svg>',
};

function sampulHTML(p) {
  if (p.gambar) return `<img src="${p.gambar}" alt="${p.nama}" loading="lazy">`;
  if (p.sampul && p.sampul.ikon) return ILUSTRASI[p.sampul.ikon] || "";
  const s = p.sampul || { warna: "#008081", teks: "#fff", sub: "" };
  const logo = terang(s.warna) ? "assets/img/logo.png" : "assets/img/logo-putih.png";
  return `<div class="buku" style="background:${s.warna};color:${s.teks}" aria-hidden="true">
      <div><img class="buku-logo" src="${logo}" alt=""><div class="buku-judul">${p.nama.replace(/^Buku /, "")}</div></div>
      <div><div class="buku-sub">${s.sub || ""}</div><div class="buku-penulis" style="margin-top:8px">Dika Duwiyanto</div></div>
    </div>`;
}

function kartuProdukHTML(p) {
  const status = NAMA_STATUS[p.status];
  const habis = p.status === "habis";
  return `<article class="produk" data-kategori="${p.kategori}">
    <div class="produk-sampul">${sampulHTML(p)}${status ? `<span class="produk-status">${status}</span>` : ""}</div>
    <div class="produk-info">
      <span class="produk-kategori">${p.detail || NAMA_KATEGORI[p.kategori] || ""}</span>
      <h3>${p.nama}</h3>
    </div>
    <p class="produk-desk">${p.deskripsi}</p>
    <div class="produk-bawah">
      <span class="harga">${rupiah(p.harga)}${p.hargaCoret ? `<s>${rupiah(p.hargaCoret)}</s>` : ""}</span>
      <button class="tombol tombol-garis tombol-kecil" type="button" data-tambah="${p.id}"${habis ? " disabled" : ""}>${habis ? "Stok habis" : p.status === "preorder" ? "Pesan dulu" : "Tambah ke keranjang"}</button>
    </div>
  </article>`;
}

function tampilkanProduk(wadah, saring) {
  const daftar = PRODUK.filter(saring || (() => true));
  wadah.innerHTML = daftar.map(kartuProdukHTML).join("");
}

const Keranjang = {
  kunci: "napaspulih-keranjang",
  isi: [],
  muat() { this.isi = simpan.ambil(this.kunci, []).filter((b) => PRODUK.some((p) => p.id === b.id)); },
  simpan() { simpan.taruh(this.kunci, this.isi); this.gambar(); },
  tambah(id) {
    const b = this.isi.find((x) => x.id === id);
    if (b) b.qty += 1; else this.isi.push({ id, qty: 1 });
    this.simpan();
    const p = PRODUK.find((x) => x.id === id);
    toast(`${p.nama} masuk keranjang`);
  },
  ubah(id, d) {
    const b = this.isi.find((x) => x.id === id);
    if (!b) return;
    b.qty += d;
    if (b.qty <= 0) this.isi = this.isi.filter((x) => x.id !== id);
    this.simpan();
  },
  jumlah() { return this.isi.reduce((s, b) => s + b.qty, 0); },
  total() { return this.isi.reduce((s, b) => s + b.qty * PRODUK.find((p) => p.id === b.id).harga, 0); },
  perluAlamat() { return this.isi.some((b) => !KATEGORI_DIGITAL.includes(PRODUK.find((p) => p.id === b.id).kategori)); },

  pasang() {
    document.body.insertAdjacentHTML("beforeend", `
      <div class="lapis" data-tutup-keranjang></div>
      <aside class="laci" id="laci" aria-label="Keranjang belanja" aria-hidden="true">
        <div class="laci-kepala"><h2>Keranjang</h2><button class="tombol-tutup" type="button" data-tutup-keranjang aria-label="Tutup keranjang">${IKON.tutup}</button></div>
        <div class="laci-isi" id="laci-isi"></div>
        <div class="laci-kaki" id="laci-kaki"></div>
      </aside>`);
    document.addEventListener("click", (e) => {
      const t = e.target.closest("[data-tambah],[data-buka-keranjang],[data-tutup-keranjang],[data-qty]");
      if (!t) return;
      if (t.dataset.tambah) this.tambah(t.dataset.tambah);
      else if (t.hasAttribute("data-buka-keranjang")) this.buka(true);
      else if (t.hasAttribute("data-tutup-keranjang")) this.buka(false);
      else if (t.dataset.qty) this.ubah(t.dataset.id, Number(t.dataset.qty));
    });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") this.buka(false); });
    this.muat();
    this.gambar();
  },
  buka(ya) {
    const laci = document.getElementById("laci");
    laci.classList.toggle("buka", ya);
    laci.setAttribute("aria-hidden", !ya);
    document.querySelector(".lapis").classList.toggle("buka", ya);
    if (ya) laci.querySelector(".tombol-tutup").focus();
  },
  gambar() {
    const n = this.jumlah();
    document.querySelectorAll(".jumlah-keranjang").forEach((el) => { el.textContent = n; el.hidden = n === 0; });
    const isi = document.getElementById("laci-isi");
    const kaki = document.getElementById("laci-kaki");
    if (!isi) return;
    if (!n) {
      isi.innerHTML = `<div class="keranjang-kosong"><p>Keranjang masih kosong.</p><a class="tombol tombol-garis tombol-kecil" href="toko.html">Lihat produk di toko</a></div>`;
      kaki.innerHTML = "";
      return;
    }
    isi.innerHTML = this.isi.map((b) => {
      const p = PRODUK.find((x) => x.id === b.id);
      return `<div class="baris-keranjang">
        <span class="nama">${p.nama}${p.status === "preorder" ? ' <span class="kecil">(pre-order)</span>' : ""}</span>
        <span class="harga">${rupiah(p.harga * b.qty)}</span>
        <span class="qty"><button type="button" data-qty="-1" data-id="${p.id}" aria-label="Kurangi">−</button><span>${b.qty}</span><button type="button" data-qty="1" data-id="${p.id}" aria-label="Tambah">+</button></span>
      </div>`;
    }).join("");
    const alamat = this.perluAlamat();
    kaki.innerHTML = `
      <div class="total"><span>Total</span><span>${rupiah(this.total())}</span></div>
      <p class="kecil">${alamat ? "Belum termasuk ongkos kirim. " : ""}Admin akan mengonfirmasi total dan cara pembayaran lewat WhatsApp.${this.isi.some((b) => KATEGORI_DIGITAL.includes(PRODUK.find((p) => p.id === b.id).kategori)) ? " E-book dan produk digital dikirim lewat WhatsApp setelah pembayaran dikonfirmasi." : ""}</p>
      <form class="form" id="form-pesanan" novalidate>
        <div class="isian"><label for="psn-nama">Nama</label><input id="psn-nama" autocomplete="name" required></div>
        ${alamat ? `<div class="isian"><label for="psn-alamat">Alamat pengiriman</label><textarea id="psn-alamat" autocomplete="street-address" required placeholder="Jalan, kecamatan, kota, kode pos"></textarea></div>` : ""}
        <p class="pesan-galat" aria-live="polite"></p>
        <button class="tombol tombol-utama tombol-penuh" type="submit">${IKON.wa} Pesan lewat WhatsApp</button>
        <div class="cadangan-wa"></div>
      </form>`;
    document.getElementById("form-pesanan").addEventListener("submit", (e) => {
      e.preventDefault();
      const nama = document.getElementById("psn-nama").value.trim();
      const alEl = document.getElementById("psn-alamat");
      const galat = kaki.querySelector(".pesan-galat");
      if (!nama) { galat.textContent = "Tulis nama Anda terlebih dahulu."; return; }
      if (alEl && !alEl.value.trim()) { galat.textContent = "Tulis alamat pengiriman terlebih dahulu."; return; }
      const daftar = this.isi.map((b) => {
        const p = PRODUK.find((x) => x.id === b.id);
        return `• ${p.nama} x${b.qty} = ${rupiah(p.harga * b.qty)}${p.status === "preorder" ? " (pre-order)" : ""}`;
      }).join("\n");
      const pesan = `Halo Napas Pulih, saya ingin memesan:\n\n${daftar}\n\nTotal: ${rupiah(this.total())}${alEl ? " (belum ongkir)" : ""}\n\nNama: ${nama}${alEl ? `\nAlamat: ${alEl.value.trim()}` : ""}`;
      bukaWA(pesan, kaki.querySelector(".cadangan-wa"));
    });
  },
};

/* ---------- Jalankan ---------- */
document.addEventListener("DOMContentLoaded", () => {
  pasangHeader();
  pasangFooter();
  pasangTautanWA();
  pasangFormWA();
  Keranjang.pasang();
  document.querySelectorAll("[data-produk]").forEach((w) => {
    const ids = w.dataset.produk ? w.dataset.produk.split(",") : null;
    tampilkanProduk(w, ids ? (p) => ids.includes(p.id) : null);
  });
});
