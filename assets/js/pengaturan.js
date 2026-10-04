/* =========================================================
   PENGATURAN WEBSITE NAPAS PULIH
   ---------------------------------------------------------
   Ini satu-satunya file yang paling sering perlu Anda ubah.
   Ganti teks di antara tanda kutip "...". Jangan hapus koma
   di akhir baris. Simpan (Ctrl+S), lalu muat ulang browser.
   ========================================================= */

const PENGATURAN = {
  // Nomor WhatsApp untuk semua tombol pendaftaran & pemesanan.
  // Tulis dengan kode negara 62, TANPA tanda +, spasi, atau angka 0 di depan.
  // Contoh: 0851-1714-2198  ->  "6285117142198"
  whatsapp: "6285117142198",

  email: "dikaduwiyanto@gmail.com",

  // Tautan media sosial. Kosongkan ("") jika belum ada; tombolnya akan tersembunyi.
  instagram: "https://www.instagram.com/napaspulih",
  youtube: "https://www.youtube.com/@napaspulih",
  facebook: "",

  // Kota untuk sesi tatap muka
  kota: "Semarang",
};

/* =========================================================
   DAFTAR PRODUK TOKO
   ---------------------------------------------------------
   Setiap produk ada di antara { ... }.
   - id        : kode unik, huruf kecil tanpa spasi
   - kategori  : "buku", "alat", atau "digital"
   - harga     : angka saja, tanpa titik (89000 = Rp89.000)
   - hargaCoret: harga lama (opsional), isi 0 jika tidak ada
   - status    : "tersedia", "preorder", atau "habis"
   - gambar    : (opsional) foto produk, mis. "assets/img/produk/buku.jpg"
                 Jika kosong, sampul otomatis dibuat dari "sampul".
   CATATAN: Harga & produk di bawah adalah CONTOH. Sesuaikan.
   ========================================================= */

const PRODUK = [
  {
    id: "buku-napas-pulih",
    nama: "Buku Napas Pulih",
    kategori: "buku",
    harga: 89000,
    hargaCoret: 0,
    status: "tersedia",
    deskripsi: "Panduan dasar memperbaiki pola napas sehari-hari: napas hidung, napas ringan, dan latihan singkat untuk tenang dan tidur.",
    gambar: "",
    sampul: { warna: "#008081", teks: "#ffffff", sub: "Panduan memperbaiki pola napas untuk hidup yang lebih tenang" },
  },
  {
    id: "buku-5-metode-pulih",
    nama: "5 Metode PULIH",
    kategori: "buku",
    harga: 99000,
    hargaCoret: 120000,
    status: "preorder",
    deskripsi: "Lima pilar pulih lahir dan batin: napas, gerak, kesadaran, istirahat, serta hidrasi dan nutrisi, dijalankan bersama.",
    gambar: "",
    sampul: { warna: "#0B3F41", teks: "#F3ECDD", sub: "Pulih lahir dan batin lewat lima pilar yang dijalankan bersama" },
  },
  {
    id: "paket-dua-buku",
    nama: "Paket 2 Buku",
    kategori: "buku",
    harga: 169000,
    hargaCoret: 188000,
    status: "preorder",
    deskripsi: "Napas Pulih dan 5 Metode PULIH dalam satu paket. Buku kedua dikirim saat terbit.",
    gambar: "",
    sampul: { warna: "#C9AE7E", teks: "#0B3F41", sub: "Napas Pulih + 5 Metode PULIH" },
  },
  {
    id: "plester-mulut",
    nama: "Plester Mulut Tidur",
    kategori: "alat",
    harga: 65000,
    hargaCoret: 0,
    status: "tersedia",
    deskripsi: "Isi 30 lembar. Membantu menjaga mulut tetap tertutup agar napas lewat hidung selama tidur. Lembut di kulit.",
    gambar: "",
    sampul: { ikon: "plester" },
  },
  {
    id: "audio-7-hari",
    nama: "Audio Panduan Napas 7 Hari",
    kategori: "digital",
    harga: 49000,
    hargaCoret: 0,
    status: "tersedia",
    deskripsi: "Tujuh rekaman latihan berpandu suara (10–15 menit) untuk pagi, siang, dan menjelang tidur. Dikirim lewat WhatsApp.",
    gambar: "",
    sampul: { ikon: "audio" },
  },
  {
    id: "jurnal-30-hari",
    nama: "Jurnal Latihan Napas 30 Hari",
    kategori: "digital",
    harga: 35000,
    hargaCoret: 0,
    status: "tersedia",
    deskripsi: "Lembar kerja siap cetak (PDF) untuk mencatat latihan harian, skor tes jeda napas, dan kualitas tidur.",
    gambar: "",
    sampul: { ikon: "jurnal" },
  },
];
