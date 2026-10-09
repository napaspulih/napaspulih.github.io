/* =========================================================
   PENGATURAN WEBSITE NAPAS PULIH
   ---------------------------------------------------------
   Ini satu-satunya file yang paling sering perlu Anda ubah.
   Ganti teks di antara tanda kutip "...". Jangan hapus koma
   di akhir baris. Simpan (Ctrl+S), lalu muat ulang browser.
   ========================================================= */

const PENGATURAN = {
  // Alamat website yang sudah online, TANPA garis miring di akhir.
  // Dipakai di pesan WhatsApp untuk peserta kelas. Ganti bila pindah domain,
  // misalnya "https://napaspulih.com".
  alamatWeb: "https://napaspulih.github.io",

  // Nomor WhatsApp untuk semua tombol pendaftaran & pemesanan.
  // Tulis dengan kode negara 62, TANPA tanda +, spasi, atau angka 0 di depan.
  // Contoh: 0851-1714-2198  ->  "6285117142198"
  whatsapp: "6285117142198",

  email: "napaspulih@gmail.com",

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
   - kategori  : "ebook", "buku", "alat", atau "digital"
   - detail    : (opsional) keterangan singkat, mis. "E-book PDF, 111 halaman"
   - harga     : angka saja, tanpa titik (89000 = Rp89.000)
   - hargaCoret: harga lama (opsional), isi 0 jika tidak ada
   - status    : "tersedia", "preorder", atau "habis"
   - gambar    : (opsional) foto produk, mis. "assets/img/produk/buku.jpg"
                 Jika kosong, sampul otomatis dibuat dari "sampul".
   CATATAN: Harga & produk di bawah adalah CONTOH. Sesuaikan.
   ========================================================= */

const PRODUK = [
  /* ----- Seri e-book Napas Pulih ----- */
  {
    id: "ebook-napas-dan-emosi",
    nama: "Napas dan Emosi",
    kategori: "ebook",
    harga: 150000,
    hargaCoret: 0,
    status: "tersedia",
    detail: "E-book PDF, 111 halaman",
    deskripsi: "Jalan dua arah antara napas dan perasaan: sistem saraf, saraf vagus, pola napas khas setiap emosi, hingga lingkaran napas dan kecemasan. Dilengkapi latihan langkah demi langkah dan cara memilih teknik sesuai emosi yang sedang dirasakan.",
    gambar: "assets/img/produk/ebook-napas-dan-emosi.jpg",
  },
  {
    id: "ebook-napas-dan-performa",
    nama: "Napas dan Performa",
    kategori: "ebook",
    harga: 135000,
    hargaCoret: 0,
    status: "tersedia",
    detail: "E-book PDF, 117 halaman",
    deskripsi: "Napas sebagai alat performa yang sering terlupakan: tenaga, daya tahan, pemulihan, dan fokus di bawah tekanan. Untuk atlet, pekerja, pelajar, dan siapa pun yang harus tampil, lengkap dengan program latihan empat minggu.",
    gambar: "assets/img/produk/ebook-napas-dan-performa.jpg",
  },
  {
    id: "ebook-napas-dan-kesadaran",
    nama: "Napas dan Kesadaran",
    kategori: "ebook",
    harga: 175000,
    hargaCoret: 0,
    status: "tersedia",
    detail: "E-book PDF, 70 halaman",
    deskripsi: "Mengapa hampir semua latihan napas dimulai dengan \"perhatikan napas Anda\"? Mengenal kesadaran dari sudut ilmu saraf, pikiran yang mengembara, dan latihan kesadaran napas yang bisa dipilih sesuai kebutuhan.",
    gambar: "assets/img/produk/ebook-napas-dan-kesadaran.jpg",
  },
  {
    id: "ebook-napas-dan-metabolisme",
    nama: "Napas dan Metabolisme",
    kategori: "ebook",
    harga: 150000,
    hargaCoret: 0,
    status: "tersedia",
    detail: "E-book PDF, 158 halaman",
    deskripsi: "Hubungan napas dengan energi, gula darah, pencernaan, dan rasa kenyang, disandingkan dengan adab makan Rasulullah ﷺ dan puasa. Dilengkapi latihan praktis dan program empat minggu.",
    gambar: "assets/img/produk/ebook-napas-dan-metabolisme.jpg",
  },
  {
    id: "ebook-napas-dan-tidur",
    nama: "Napas dan Tidur",
    kategori: "ebook",
    harga: 160000,
    hargaCoret: 0,
    status: "tersedia",
    detail: "E-book PDF, 171 halaman",
    deskripsi: "Napas mulut, mendengkur, insomnia, dan sleep apnea dari sudut ilmu napas dan ilmu tidur, beserta adab tidur Rasulullah ﷺ. Berisi sepuluh latihan praktis dan program empat minggu.",
    gambar: "assets/img/produk/ebook-napas-dan-tidur.jpg",
  },
  {
    id: "ebook-napas-dan-tumbuh-kembang-anak",
    nama: "Napas dan Tumbuh Kembang Anak",
    kategori: "ebook",
    harga: 175000,
    hargaCoret: 0,
    status: "tersedia",
    detail: "E-book PDF, 190 halaman",
    deskripsi: "Panduan untuk orang tua: napas anak dari bayi hingga remaja awal, napas hidung dan pertumbuhan wajah, emosi, tidur, dan fokus. Latihan napas di rumah yang sesuai usia, penuh permainan, dan tanpa paksaan.",
    gambar: "assets/img/produk/ebook-napas-dan-tumbuh-kembang-anak.jpg",
  },

  /* ----- Produk lain (CONTOH, sesuaikan atau hapus) ----- */
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
