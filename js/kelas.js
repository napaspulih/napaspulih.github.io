/* =========================================================
   NAPAS PULIH — Halaman "Kelas Saya"
   Alur: belum masuk -> kirim tautan ke email -> masuk ->
   cek terdaftar sebagai peserta aktif -> tampilkan materi.
   ========================================================= */

(function () {
  const tampilkan = (nama) => {
    document.querySelectorAll("[data-keadaan]").forEach((b) => { b.hidden = b.dataset.keadaan !== nama; });
  };

  document.querySelectorAll("[data-keluar]").forEach((b) => b.addEventListener("click", keluar));

  /* ----- Form masuk ----- */
  const form = document.getElementById("form-masuk");
  const galat = document.getElementById("galat-masuk");
  const tombol = document.getElementById("tombol-masuk");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("email-masuk").value.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      galat.textContent = "Tulis alamat email yang benar, misalnya nama@gmail.com.";
      return;
    }
    galat.textContent = "";
    tombol.disabled = true;
    tombol.textContent = "Mengirim…";
    const { error } = await kirimTautanMasuk(email);
    tombol.disabled = false;
    tombol.textContent = "Kirim tautan masuk";
    if (error) {
      galat.textContent = /rate|limit|seconds/i.test(error.message)
        ? "Terlalu banyak permintaan. Tunggu beberapa menit, lalu coba lagi."
        : "Tautan belum terkirim. Coba lagi sebentar lagi, atau hubungi kami lewat WhatsApp.";
      return;
    }
    document.getElementById("email-terkirim").textContent = email;
    document.getElementById("info-terkirim").hidden = false;
    form.hidden = true;
  });

  /* ----- Pesan galat dari tautan email (kedaluwarsa, sudah dipakai) ----- */
  const hash = new URLSearchParams(window.location.hash.slice(1));
  if (hash.get("error")) {
    galat.textContent = "Tautan masuk sudah kedaluwarsa atau sudah dipakai. Minta tautan baru di bawah ini.";
    history.replaceState(null, "", halamanIni());
  }

  /* ----- Daftar materi ----- */
  function kartuMateri(m) {
    const id = (m.jenis === "video" || m.jenis === "audio") ? idYouTube(m.tautan) : null;
    const isi = [];
    if (id) {
      isi.push(el("div", { class: "bingkai-video" },
        el("iframe", {
          src: `https://www.youtube-nocookie.com/embed/${id}?rel=0&modestbranding=1`,
          title: m.judul,
          loading: "lazy",
          allow: "accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen",
          allowfullscreen: true,
          referrerpolicy: "strict-origin-when-cross-origin",
        })));
    }
    const badan = el("div", { class: "materi-badan" },
      el("span", { class: "materi-jenis", text: NAMA_JENIS[m.jenis] || m.jenis }),
      el("h3", { text: m.judul }));
    if (!id) {
      badan.append(el("a", { class: "tombol tombol-garis tombol-kecil", href: m.tautan, target: "_blank", rel: "noopener", text: m.jenis === "dokumen" ? "Buka dokumen" : "Buka" }));
    }
    isi.push(badan);
    return el("article", { class: "kartu-materi" + (id ? " ada-video" : "") }, isi);
  }

  function tampilkanMateri(materi) {
    const wadah = document.getElementById("daftar-materi");
    wadah.replaceChildren();
    if (!materi.length) {
      wadah.append(el("div", { class: "kotak-info" },
        el("h2", { text: "Materi segera hadir" }),
        el("p", { text: "Materi kelas Anda sedang disiapkan. Kabar terbaru dikirim lewat WhatsApp." })));
      return;
    }
    const perPekan = new Map();
    materi.forEach((m) => { if (!perPekan.has(m.pekan)) perPekan.set(m.pekan, []); perPekan.get(m.pekan).push(m); });
    [...perPekan.keys()].sort((a, b) => a - b).forEach((p) => {
      wadah.append(el("section", { class: "kelompok-pekan" },
        el("h2", { text: NAMA_PEKAN[p] || `Pekan ${p}` }),
        el("div", { class: "grid-materi" }, perPekan.get(p).map(kartuMateri))));
    });
  }

  /* ----- Mulai ----- */
  let putaran = 0;
  async function mulai() {
    const nomor = ++putaran;
    const { data: { session } } = await sb.auth.getSession();
    if (nomor !== putaran) return;
    if (!session) { tampilkan("masuk"); return; }
    if (window.location.hash.includes("access_token")) history.replaceState(null, "", halamanIni());

    const email = (session.user.email || "").toLowerCase();
    const [peserta, admin] = await Promise.all([
      sb.from("peserta").select("nama, kelas, aktif").eq("email", email).maybeSingle(),
      sb.from("admin").select("email").eq("email", email).maybeSingle(),
    ]);
    if (nomor !== putaran) return;
    const adalahAdmin = !!admin.data;
    const p = peserta.data;

    if ((!p || !p.aktif) && !adalahAdmin) {
      document.getElementById("email-belum-aktif").textContent = email;
      document.getElementById("wa-aktivasi").href = tautanWA(`Halo Napas Pulih, saya sudah transfer untuk Pelatihan 5 Metode PULIH. Mohon aktifkan akun saya.\n\nEmail: ${email}\nNama: `);
      tampilkan("belum-aktif");
      return;
    }

    document.getElementById("sapaan").textContent = p ? `Selamat datang, ${p.nama.split(" ")[0]}` : "Selamat datang, Admin";
    document.getElementById("label-kelas").textContent = p ? NAMA_KELAS[p.kelas] || "Kelas Saya" : "Pratinjau admin: semua materi";
    document.getElementById("tautan-admin").hidden = !adalahAdmin;
    tampilkan("kelas");

    const { data: materi, error } = await sb.from("materi").select("pekan, urutan, judul, jenis, tautan").order("pekan").order("urutan");
    if (nomor !== putaran) return;
    if (error) {
      document.getElementById("daftar-materi").replaceChildren(el("p", { class: "pesan-galat", text: "Materi belum bisa dimuat. Muat ulang halaman ini." }));
      return;
    }
    tampilkanMateri(materi || []);
  }

  sb.auth.onAuthStateChange((event) => { if (event === "SIGNED_IN" || event === "SIGNED_OUT") mulai(); });
  mulai();
})();
