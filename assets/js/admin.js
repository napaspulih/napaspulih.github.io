/* =========================================================
   NAPAS PULIH — Halaman admin kelas
   Hanya email yang tercatat di tabel "admin" yang bisa
   menambah, mengubah, atau menghapus data (diatur oleh
   aturan keamanan database, bukan hanya oleh halaman ini).
   ========================================================= */

(function () {
  const $ = (s) => document.querySelector(s);
  const tampilkan = (nama) => {
    document.querySelectorAll("[data-keadaan]").forEach((b) => { b.hidden = b.dataset.keadaan !== nama; });
  };
  document.querySelectorAll("[data-keluar]").forEach((b) => b.addEventListener("click", keluar));

  let semuaPeserta = [];
  // Alamat Kelas Saya untuk pesan WhatsApp: ikuti alamat situs yang sedang dibuka,
  // kecuali saat dibuka di laptop (localhost atau file), pakai alamatWeb di pengaturan.js.
  const diLaptop = !/^https?:$/.test(location.protocol) || /^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname);
  const ALAMAT_KELAS = diLaptop
    ? `${PENGATURAN.alamatWeb.replace(/\/+$/, "")}/kelas.html`
    : new URL("kelas.html", location.href).href;

  /* ----- Tab ----- */
  const tab = { peserta: $("#tab-peserta"), materi: $("#tab-materi") };
  function pilihTab(nama) {
    for (const [k, b] of Object.entries(tab)) {
      b.setAttribute("aria-selected", k === nama);
      $(`#panel-${k}`).hidden = k !== nama;
    }
  }
  tab.peserta.addEventListener("click", () => pilihTab("peserta"));
  tab.materi.addEventListener("click", () => pilihTab("materi"));

  /* ----- Peserta ----- */
  function pesanKabar(nama, email) {
    return `Assalamu'alaikum ${nama}, terima kasih, pembayaran Anda sudah kami terima.\n\nAkun Pelatihan 5 Metode PULIH Anda sudah aktif. Cara masuk:\n1. Buka ${ALAMAT_KELAS}\n2. Ketik email: ${email}\n3. Buka tautan masuk yang dikirim ke email tersebut.\n\nSelamat berlatih.\nNapas Pulih`;
  }

  function barisPeserta(p) {
    const saklar = el("input", { type: "checkbox", "aria-label": `Aktifkan ${p.nama}` });
    saklar.checked = p.aktif;
    saklar.addEventListener("change", async () => {
      const { error } = await sb.from("peserta").update({ aktif: saklar.checked }).eq("email", p.email);
      if (error) { saklar.checked = !saklar.checked; toast("Gagal menyimpan. Coba lagi."); return; }
      p.aktif = saklar.checked;
      toast(saklar.checked ? `${p.nama} diaktifkan` : `${p.nama} dinonaktifkan`);
    });
    const kelas = el("select", { "aria-label": `Kelas ${p.nama}` },
      ["mandiri", "live", "lembaga"].map((k) => { const o = el("option", { value: k, text: NAMA_KELAS[k] }); if (k === p.kelas) o.selected = true; return o; }));
    kelas.addEventListener("change", async () => {
      const lama = p.kelas;
      const { error } = await sb.from("peserta").update({ kelas: kelas.value }).eq("email", p.email);
      if (error) { kelas.value = lama; toast("Gagal menyimpan. Coba lagi."); return; }
      p.kelas = kelas.value;
      toast("Kelas diperbarui");
    });
    const kabar = el("a", { class: "tautan-aksi", href: `https://wa.me/?text=${encodeURIComponent(pesanKabar(p.nama, p.email))}`, target: "_blank", rel: "noopener", text: "Kabari" });
    const hapus = el("button", { class: "tautan-aksi bahaya", type: "button", text: "Hapus" });
    hapus.addEventListener("click", async () => {
      if (!window.confirm(`Hapus ${p.nama} (${p.email})? Ia tidak bisa lagi membuka materi.`)) return;
      const { error } = await sb.from("peserta").delete().eq("email", p.email);
      if (error) { toast("Gagal menghapus. Coba lagi."); return; }
      toast(`${p.nama} dihapus`);
      muatPeserta();
    });
    return el("tr", {},
      el("td", { text: p.nama }),
      el("td", { class: "sel-email", text: p.email }),
      el("td", {}, kelas),
      el("td", {}, el("label", { class: "saklar" }, saklar)),
      el("td", { class: "sel-catatan", text: p.catatan || "" }),
      el("td", { class: "sel-aksi" }, kabar, hapus));
  }

  function gambarPeserta() {
    const q = $("#cari-peserta").value.trim().toLowerCase();
    const daftar = semuaPeserta.filter((p) => !q || p.nama.toLowerCase().includes(q) || p.email.includes(q));
    const isi = $("#isi-peserta");
    isi.replaceChildren(...(daftar.length ? daftar.map(barisPeserta)
      : [el("tr", {}, el("td", { colspan: "6", class: "sel-kosong", text: q ? "Tidak ada yang cocok." : "Belum ada peserta." }))]));
    $("#jumlah-peserta").textContent = `(${semuaPeserta.length})`;
  }

  async function muatPeserta() {
    const { data, error } = await sb.from("peserta").select("*").order("dibuat", { ascending: false });
    if (error) { toast("Daftar peserta belum bisa dimuat."); return; }
    semuaPeserta = data || [];
    gambarPeserta();
  }
  $("#cari-peserta").addEventListener("input", gambarPeserta);

  $("#form-peserta").addEventListener("submit", async (e) => {
    e.preventDefault();
    const galat = $("#galat-peserta");
    const nama = $("#p-nama").value.trim();
    const email = $("#p-email").value.trim().toLowerCase();
    if (!nama) { galat.textContent = "Isi nama peserta."; $("#p-nama").focus(); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { galat.textContent = "Tulis email peserta dengan benar."; $("#p-email").focus(); return; }
    galat.textContent = "";
    const baris = { nama, email, kelas: $("#p-kelas").value, catatan: $("#p-catatan").value.trim() || null, aktif: true };
    const { error } = await sb.from("peserta").insert(baris);
    if (error) {
      galat.textContent = error.code === "23505"
        ? "Email ini sudah terdaftar. Cari di daftar di bawah untuk mengaktifkan atau mengubah kelasnya."
        : "Gagal menyimpan. Coba lagi.";
      return;
    }
    $("#tombol-kabar").href = `https://wa.me/?text=${encodeURIComponent(pesanKabar(nama, email))}`;
    $("#info-wa").hidden = false;
    e.target.reset();
    toast(`${nama} sudah aktif`);
    muatPeserta();
  });

  /* ----- Materi ----- */
  function barisMateri(m) {
    const hapus = el("button", { class: "tautan-aksi bahaya", type: "button", text: "Hapus" });
    hapus.addEventListener("click", async () => {
      if (!window.confirm(`Hapus materi "${m.judul}"?`)) return;
      const { error } = await sb.from("materi").delete().eq("id", m.id);
      if (error) { toast("Gagal menghapus. Coba lagi."); return; }
      toast("Materi dihapus");
      muatMateri();
    });
    const judul = el("td", {}, el("a", { href: m.tautan, target: "_blank", rel: "noopener", text: m.judul }));
    return el("tr", {},
      el("td", { text: m.pekan === 0 ? "Awal" : m.pekan === 6 ? "Akhir" : String(m.pekan) }),
      el("td", { text: String(m.urutan) }),
      judul,
      el("td", { text: NAMA_JENIS[m.jenis] || m.jenis }),
      el("td", { text: (m.kelas || []).map((k) => NAMA_KELAS[k] || k).join(", ") }),
      el("td", { class: "sel-aksi" }, hapus));
  }

  async function muatMateri() {
    const { data, error } = await sb.from("materi").select("*").order("pekan").order("urutan");
    if (error) { toast("Daftar materi belum bisa dimuat."); return; }
    const isi = $("#isi-materi");
    isi.replaceChildren(...((data || []).length ? data.map(barisMateri)
      : [el("tr", {}, el("td", { colspan: "6", class: "sel-kosong", text: "Belum ada materi." }))]));
    $("#jumlah-materi").textContent = `(${(data || []).length})`;
  }

  $("#form-materi").addEventListener("submit", async (e) => {
    e.preventDefault();
    const galat = $("#galat-materi");
    const judul = $("#m-judul").value.trim();
    const tautan = $("#m-tautan").value.trim();
    const jenis = $("#m-jenis").value;
    const kelas = [...document.querySelectorAll('input[name="m-kelas"]:checked')].map((c) => c.value);
    if (!judul) { galat.textContent = "Isi judul materi."; $("#m-judul").focus(); return; }
    if (!tautan) { galat.textContent = "Tempel tautannya."; $("#m-tautan").focus(); return; }
    if (jenis !== "dokumen" && !idYouTube(tautan)) { galat.textContent = "Tautan YouTube tidak dikenali. Salin tautan dari tombol Bagikan di YouTube."; $("#m-tautan").focus(); return; }
    if (jenis === "dokumen" && !/^https?:\/\//.test(tautan)) { galat.textContent = "Tautan dokumen harus diawali https://"; $("#m-tautan").focus(); return; }
    if (!kelas.length) { galat.textContent = "Pilih minimal satu kelas."; return; }
    galat.textContent = "";
    const { error } = await sb.from("materi").insert({
      pekan: Number($("#m-pekan").value), urutan: Math.max(1, Number($("#m-urutan").value) || 1), judul, jenis, tautan, kelas,
    });
    if (error) { galat.textContent = "Gagal menyimpan. Coba lagi."; return; }
    $("#m-judul").value = "";
    $("#m-tautan").value = "";
    $("#m-urutan").value = String((Number($("#m-urutan").value) || 1) + 1);
    toast("Materi ditambahkan");
    muatMateri();
  });

  /* ----- Mulai ----- */
  async function mulai() {
    const { data: { session } } = await sb.auth.getSession();
    if (!session) { tampilkan("bukan-admin"); return; }
    const { data: admin } = await sb.from("admin").select("email").eq("email", (session.user.email || "").toLowerCase()).maybeSingle();
    if (!admin) { tampilkan("bukan-admin"); return; }
    tampilkan("admin");
    muatPeserta();
    muatMateri();
  }
  mulai();
})();
