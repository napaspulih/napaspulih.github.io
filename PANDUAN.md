# Panduan Website Napas Pulih

Panduan ini ditulis untuk pemula. Ikuti langkahnya pelan-pelan.

---

## 1. Isi folder

```
Web Napas Pulih/
├── index.html          ← Beranda
├── latihan.html        ← Latihan napas interaktif + Tes jeda napas
├── pelatihan.html      ← Pelatihan 5 Metode PULIH
├── pendampingan.html   ← Pendampingan napas personal
├── toko.html           ← Toko (buku & produk)
├── tentang.html        ← Profil Dika
├── PANDUAN.md          ← file ini
└── assets/
    ├── css/style.css       ← warna, huruf, tata letak
    ├── img/                ← logo & foto
    └── js/
        ├── pengaturan.js   ← ★ NOMOR WA, MEDIA SOSIAL, DAFTAR PRODUK
        ├── main.js         ← menu, keranjang, WhatsApp
        └── latihan.js      ← mesin latihan napas & tes jeda napas
```

File `logonp.png` dan `Profil Dika.jpg` yang asli tetap di folder ini dan tidak diubah.

---

## 2. Melihat website di laptop

**Cara paling mudah:** klik dua kali `index.html`. Website terbuka di browser.

**Cara yang disarankan (dengan VS Code):**

1. Buka VS Code.
2. Menu **File → Open Folder…**, pilih folder `Web Napas Pulih`.
3. Klik ikon kotak-kotak di kiri (Extensions), cari **Live Server** (buatan Ritwick Dey), klik **Install**.
4. Klik kanan `index.html` → **Open with Live Server**.
5. Setiap kali Anda menyimpan perubahan (Ctrl+S), browser otomatis memuat ulang.

---

## 3. Hal yang WAJIB dicek sebelum website dipublikasikan

Buka `assets/js/pengaturan.js` di VS Code.

| Yang dicek | Keterangan |
|---|---|
| `whatsapp` | Saat ini diisi `6282137447852`. Pastikan ini nomor yang benar untuk Napas Pulih. Tulis dengan awalan 62, tanpa 0, spasi, atau tanda +. |
| `instagram`, `youtube`, `facebook` | Pastikan tautannya benar. Kosongkan (`""`) jika belum ada. |
| Harga produk | Semua harga di `PRODUK` adalah **contoh**. Ganti sesuai harga Anda. |
| Status buku | `"tersedia"`, `"preorder"`, atau `"habis"`. |

Harga **pelatihan** dan **pendampingan** ada langsung di `pelatihan.html` dan `pendampingan.html`. Tekan **Ctrl+F**, ketik `Rp`, lalu ganti angkanya. Itu juga contoh.

Detail program yang juga perlu Anda sesuaikan: jumlah peserta maksimal (20), durasi sesi (90 menit live, 60 menit pendampingan), isi tiap paket, dan aturan jadwal ulang.

---

## 4. Mengubah isi yang sering diganti

### Menambah produk baru
Di `pengaturan.js`, salin satu blok `{ ... },` produk, tempel di bawahnya, lalu ubah isinya. Pastikan `id` berbeda dari produk lain.

### Memakai foto produk asli
1. Buat folder `assets/img/produk/`.
2. Simpan foto di sana, misalnya `buku-napas-pulih.jpg` (sebaiknya rasio 4:4,4 dan ukuran di bawah 300 KB).
3. Di `pengaturan.js`, isi `gambar: "assets/img/produk/buku-napas-pulih.jpg",`

Jika `gambar` kosong, sampul dibuat otomatis.

### Mengubah tulisan
Buka file `.html` yang ingin diubah, tekan **Ctrl+F**, cari kalimatnya, lalu ganti. Jangan menghapus tanda `<` `>` di sekitar tulisan.

### Menambah teknik napas
Buka `assets/js/latihan.js`. Di bagian atas ada daftar `TEKNIK`. Salin satu blok, ubah `id`, `nama`, dan `pola` (detik untuk tarik, tahan, buang, tahan).

### Mengubah menu
Buka `assets/js/main.js`, ubah `DAFTAR_MENU` di bagian atas. Menu otomatis berubah di semua halaman.

### Mengubah warna
Buka `assets/css/style.css`. Di bagian paling atas ada daftar warna (`--teal`, `--anyaman`, dll.).

---

## 5. Cara kerja pemesanan

Website ini **tidak memerlukan server atau database**. Semua pendaftaran dan pemesanan dikirim lewat WhatsApp:

- **Toko**: pengunjung memasukkan produk ke keranjang, mengisi nama & alamat, lalu menekan "Pesan lewat WhatsApp". Pesan berisi daftar pesanan dan total otomatis muncul di WhatsApp Anda.
- **Pelatihan & pendampingan**: formulir pendaftaran juga dikirim ke WhatsApp.
- Anda membalas dengan total ongkir dan nomor rekening.

Nanti, bila pesanan sudah ramai, sistem ini bisa ditingkatkan dengan pembayaran otomatis (misalnya Midtrans atau Xendit).

---

## 6. Mempublikasikan website (gratis)

**Pilihan A: Netlify Drop (paling mudah, 5 menit)**
1. Buka https://app.netlify.com/drop
2. Buat akun gratis (bisa pakai Gmail).
3. Seret seluruh folder `Web Napas Pulih` ke halaman itu.
4. Website langsung online dengan alamat seperti `napaspulih.netlify.app`. Nama bisa diubah di **Site settings**.
5. Untuk memperbarui, seret ulang folder yang sudah diedit di menu **Deploys**.

**Pilihan B: Domain sendiri (napaspulih.com / napaspulih.id)**
Beli domain di Niagahoster, Rumahweb, atau Hostinger (sekitar Rp150–300 ribu per tahun), lalu hubungkan ke Netlify lewat **Domain management**. Atau unggah folder ini ke hosting tersebut lewat File Manager ke folder `public_html`.

---

## 7. Langkah berikutnya yang disarankan

- Tambahkan **testimoni asli** peserta (beserta izin mereka) di beranda.
- Tambahkan halaman **Artikel** untuk tulisan Anda.
- Tambahkan **video YouTube** pilihan di halaman Latihan.
- Rekam **audio latihan** dengan suara Anda sendiri untuk menggantikan aba-aba suara otomatis.
