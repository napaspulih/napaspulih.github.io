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
├── kelas.html          ← Kelas Saya (ruang belajar peserta, perlu masuk)
├── admin.html          ← Admin kelas (daftar peserta & materi, khusus admin)
├── PANDUAN.md          ← file ini
└── assets/
    ├── css/style.css       ← warna, huruf, tata letak
    ├── img/                ← logo & foto
    └── js/
        ├── pengaturan.js   ← ★ ALAMAT WEB, NOMOR WA, MEDIA SOSIAL, DAFTAR PRODUK
        ├── main.js         ← menu, keranjang, WhatsApp
        ├── akun.js         ← sambungan ke database Supabase (login)
        ├── kelas.js        ← halaman Kelas Saya
        ├── admin.js        ← halaman Admin kelas
        └── latihan.js      ← mesin latihan napas & tes jeda napas
```

Di laptop, folder ini juga berisi file yang **tidak ikut diunggah** ke website:

```
├── BACA DULU - Tentang Website Napas Pulih.html  ← penjelasan lengkap website (buka di browser)
├── CLAUDE.md               ← catatan kerja untuk Claude
└── Bahan/                  ← semua file kerja, TIDAK BOLEH diunggah
    ├── Buku/               ← PDF e-book berbayar dan mockup sampul
    ├── Materi Kelas PULIH/ ← naskah, slide, dan lembar latihan kelas
    ├── Foto dan Logo Asli/ ← logonp.png, Profil Dika.jpg (file asli, belum diperkecil)
    └── Sertifikat/         ← desain sertifikat
```

Simpan semua file kerja baru (PDF, Word, slide, foto asli) di dalam `Bahan/`.

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
| `alamatWeb` | Alamat website yang sudah online, saat ini `https://napaspulih.github.io` (tanpa `/` di akhir). Dipakai di pesan WhatsApp untuk peserta kelas saat halaman admin dibuka di laptop. |
| `whatsapp` | Saat ini diisi `6285117142198` (WA Napas Pulih). Tulis dengan awalan 62, tanpa 0, spasi, atau tanda +. |
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

### Setelah mengubah file di `assets/` (CSS atau JS)
Browser pengunjung menyimpan salinan lama file CSS dan JS. Agar perubahan langsung terlihat, ganti nomor versi di semua file `.html`:

1. Di VS Code, tekan **Ctrl+Shift+H** (cari dan ganti di semua file).
2. Di kotak atas ketik nomor lama, misalnya `v=20261009-1`.
3. Di kotak bawah ketik nomor baru, misalnya `v=20261015-1` (tanggal hari ini).
4. Klik ikon **Replace All** di sebelah kanan kotak bawah.

Perubahan pada file `.html` tidak perlu langkah ini.

### Pratinjau tautan di WhatsApp dan Facebook
Saat tautan website dibagikan, WhatsApp menampilkan judul, keterangan, dan foto. Isinya diatur oleh baris `<meta property="og:...">` di bagian atas setiap file `.html`. Alamat di baris itu harus lengkap (diawali `https://`). Foto yang dipakai: `assets/img/dika-potret.jpg`.

WhatsApp dan Facebook menyimpan pratinjau lama selama beberapa hari. Untuk memperbaruinya di Facebook, buka https://developers.facebook.com/tools/debug/, tempel alamat halaman, lalu klik **Scrape Again**.

---

## 5. Cara kerja pemesanan

Toko, pendaftaran pelatihan, dan pendampingan **tidak memakai database**. Semuanya dikirim lewat WhatsApp. (Hanya halaman **Kelas Saya** dan **Admin** yang memakai database Supabase; lihat bagian 7.)

- **Toko**: pengunjung memasukkan produk ke keranjang, mengisi nama & alamat, lalu menekan "Pesan lewat WhatsApp". Pesan berisi daftar pesanan dan total otomatis muncul di WhatsApp Anda.
- **Pelatihan & pendampingan**: formulir pendaftaran juga dikirim ke WhatsApp.
- Anda membalas dengan total ongkir dan nomor rekening.

Nanti, bila pesanan sudah ramai, sistem ini bisa ditingkatkan dengan pembayaran otomatis (misalnya Midtrans atau Xendit).

---

## 6. Mempublikasikan website (gratis)

Website saat ini online di **https://napaspulih.github.io** (GitHub Pages).

### ⚠ Hanya unggah file website

Semua yang diunggah bisa dibuka siapa saja yang tahu alamatnya, termasuk PDF e-book berbayar. Yang diunggah **hanya**:

```
index.html  latihan.html  pelatihan.html  pendampingan.html
toko.html   tentang.html  kelas.html      admin.html
assets/     (seluruh isinya)
```

`PANDUAN.md` juga boleh ikut diunggah.

**Jangan** unggah folder `Bahan/`, file `BACA DULU…html`, `CLAUDE.md`, atau file `.zip`, `.docx`, `.pptx`, `.pdf`.

Bila Claude yang mengunggah, aturan ini sudah dijaga otomatis.

Bila salah satunya sudah terlanjur online, hapus dari GitHub: buka file itu di halaman repositori, klik ikon **⋯** di kanan atas, pilih **Delete file**, lalu **Commit changes**.

**Pilihan A: GitHub Pages (yang dipakai sekarang)**
1. Buka repositori website Anda di github.com.
2. Klik **Add file → Upload files**.
3. Seret file yang sudah diubah (dari daftar di atas saja). Untuk file di dalam `assets/`, seret folder `assets` utuh agar letaknya tetap benar.
4. Klik **Commit changes**. Website diperbarui dalam 1–2 menit.

**Pilihan B: Netlify Drop**
1. Buat folder baru, misalnya `Unggah Napas Pulih`, lalu salin ke dalamnya hanya file dari daftar di atas.
2. Buka https://app.netlify.com/drop dan buat akun gratis (bisa pakai Gmail).
3. Seret folder `Unggah Napas Pulih` (bukan folder `Web Napas Pulih`) ke halaman itu.
4. Website online dengan alamat seperti `napaspulih.netlify.app`. Nama bisa diubah di **Site settings**.
5. Untuk memperbarui, seret ulang folder tersebut di menu **Deploys**.

**Pilihan C: Domain sendiri (napaspulih.com / napaspulih.id)**
Beli domain di Niagahoster, Rumahweb, atau Hostinger (sekitar Rp150–300 ribu per tahun), lalu hubungkan ke GitHub Pages atau Netlify. Atau unggah file dari daftar di atas ke hosting tersebut lewat File Manager ke folder `public_html`.

### Bila alamat website berubah
Misalnya dari `napaspulih.github.io` ke `napaspulih.com`. Ubah empat hal ini:

1. `assets/js/pengaturan.js` → `alamatWeb`.
2. Alamat di pratinjau tautan: di VS Code tekan **Ctrl+Shift+H**, cari `https://napaspulih.github.io`, ganti dengan alamat baru, lalu **Replace All**.
3. Supabase → **Authentication → URL Configuration**: ganti **Site URL** dan tambahkan alamat baru di **Redirect URLs** (lihat bagian 7).
4. Alamat di bio Instagram, YouTube, dan materi promosi.

Halaman admin otomatis memakai alamat situs yang sedang dibuka saat menyiapkan pesan WhatsApp untuk peserta. `alamatWeb` hanya dipakai bila halaman admin dibuka di laptop.

---

## 7. Kelas Saya: akses peserta pelatihan

Peserta yang sudah membayar masuk ke **napaspulih.github.io/kelas.html** dengan email (tanpa kata sandi), lalu menonton video dan audio pelatihan yang diunggah di YouTube dengan status **Tidak publik (Unlisted)**. Video hanya tampil untuk email yang Anda daftarkan.

Data peserta dan materi disimpan di Supabase, proyek **napaspulih** (https://supabase.com/dashboard/project/dcekxwhqzbyhfjhgwinc).

### Pengaturan sekali saja (wajib)
1. Supabase → **Authentication → URL Configuration**:
   - **Site URL**: `https://napaspulih.github.io/kelas.html`
   - **Redirect URLs**, tambahkan: `https://napaspulih.github.io/**`
   Tanpa ini, tautan masuk di email akan mengarah ke alamat yang salah.
2. Supabase → **Authentication → Emails → SMTP Settings**: sambungkan layanan email sendiri (misalnya Brevo atau Resend, keduanya punya paket gratis). Layanan email bawaan Supabase hanya untuk uji coba dan dibatasi beberapa email per jam, jadi tidak cukup untuk peserta sungguhan.
3. (Disarankan) Supabase → **Authentication → Emails → Templates → Magic Link**: ganti ke bahasa Indonesia, misalnya:
   - Subjek: `Tautan masuk Kelas Napas Pulih`
   - Isi: `<p>Assalamu'alaikum,</p><p>Klik tautan berikut untuk masuk ke Kelas Saya:</p><p><a href="{{ .ConfirmationURL }}">Masuk ke Kelas Napas Pulih</a></p><p>Tautan ini hanya berlaku sekali dan untuk waktu singkat. Abaikan email ini bila Anda tidak memintanya.</p>`

### Admin
- Email admin: `dikaduwiyanto@gmail.com`. Masuk di halaman Kelas Saya dengan email ini, lalu klik **Halaman admin** (atau buka `admin.html`).
- Menambah admin lain: Supabase → **Table Editor → admin** → Insert row, isi email-nya (huruf kecil).

### Alur setiap ada peserta baru
1. Peserta transfer dan mengirim bukti lewat WhatsApp.
2. Buka **admin.html → Peserta**, isi nama, email, dan kelas, lalu klik **Daftarkan dan aktifkan**.
3. Klik **Kirim kabar lewat WhatsApp**. Pesan berisi cara masuk sudah disiapkan.
4. Peserta membuka kelas.html, mengetik email, lalu membuka tautan masuk di emailnya.

Menonaktifkan peserta: matikan sakelar **Aktif**. Peserta yang dinonaktifkan langsung tidak bisa melihat materi lagi.

### Menambah video
1. Di YouTube Studio, unggah video dengan visibilitas **Tidak publik**. Pastikan **Izinkan penyematan** (Allow embedding) aktif.
2. Salin tautannya (tombol **Bagikan**).
3. Buka **admin.html → Materi**, pilih pekan, isi judul, tempel tautan, pilih kelas yang boleh melihat, lalu klik **Tambah materi**.
4. Untuk lembar latihan atau jurnal, pilih jenis **Dokumen** dan tempel tautan PDF (misalnya dari Google Drive yang dibagikan "Siapa saja yang memiliki link").

**Catatan:** tautan video Tidak publik tetap bisa dibuka siapa pun yang memegang tautannya. Sistem ini menyembunyikan tautan dari orang yang tidak terdaftar, tetapi tidak bisa mencegah peserta membagikannya.

---

## 8. Langkah berikutnya yang disarankan

- Tambahkan **testimoni asli** peserta (beserta izin mereka) di beranda.
- Tambahkan halaman **Artikel** untuk tulisan Anda.
- Tambahkan **video YouTube** pilihan di halaman Latihan.
- Rekam **audio latihan** dengan suara Anda sendiri untuk menggantikan aba-aba suara otomatis.
