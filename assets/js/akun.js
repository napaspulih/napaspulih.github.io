/* =========================================================
   NAPAS PULIH — Akun peserta (Supabase)
   ---------------------------------------------------------
   Alamat dan kunci di bawah ini AMAN ditaruh di website:
   kunci "publishable" hanya bisa membaca data yang diizinkan
   aturan keamanan database (peserta hanya melihat materinya
   sendiri, hanya admin yang bisa menambah atau menghapus).
   ========================================================= */

const AKUN = {
  supabaseUrl: "https://dcekxwhqzbyhfjhgwinc.supabase.co",
  supabaseKey: "sb_publishable_hX90gEmJxIleBbcF-_l1tA__uykj1Sh",
};

const NAMA_KELAS = { mandiri: "Kelas Mandiri", live: "Kelas Live", lembaga: "Untuk Lembaga" };
const NAMA_PEKAN = {
  0: "Sebelum mulai",
  1: "Pekan 1 · Perbaiki Pola Napas",
  2: "Pekan 2 · Usahakan Gerak Fisik",
  3: "Pekan 3 · Latih Kesadaran",
  4: "Pekan 4 · Istirahat Berkualitas",
  5: "Pekan 5 · Hidrasi, Nutrisi, dan Penyatuan",
  6: "Setelah program",
};
const NAMA_JENIS = { video: "Video", audio: "Audio", dokumen: "Dokumen" };

const sb = window.supabase.createClient(AKUN.supabaseUrl, AKUN.supabaseKey, {
  auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true, flowType: "implicit" },
});

/* Ambil ID video dari tautan YouTube apa pun (watch, youtu.be, shorts, embed) atau ID langsung. */
function idYouTube(tautan) {
  const t = String(tautan || "").trim();
  if (/^[\w-]{11}$/.test(t)) return t;
  try {
    const u = new URL(t);
    if (u.hostname.endsWith("youtu.be")) return u.pathname.slice(1, 12) || null;
    if (u.hostname.includes("youtube")) {
      if (u.searchParams.get("v")) return u.searchParams.get("v").slice(0, 11);
      const m = u.pathname.match(/\/(embed|shorts|live)\/([\w-]{11})/);
      if (m) return m[2];
    }
  } catch (e) { /* bukan URL */ }
  return null;
}

/* Membuat elemen dengan aman (teks selalu sebagai teks, bukan HTML). */
function el(tag, atribut = {}, ...anak) {
  const e = document.createElement(tag);
  for (const [k, v] of Object.entries(atribut)) {
    if (v === null || v === undefined || v === false) continue;
    if (k === "class") e.className = v;
    else if (k === "text") e.textContent = v;
    else if (k.startsWith("on")) e.addEventListener(k.slice(2), v);
    else e.setAttribute(k, v === true ? "" : v);
  }
  for (const a of anak.flat()) if (a !== null && a !== undefined && a !== false) e.append(a);
  return e;
}

function halamanIni() {
  return window.location.origin + window.location.pathname;
}

async function kirimTautanMasuk(email) {
  return sb.auth.signInWithOtp({ email: email.trim().toLowerCase(), options: { emailRedirectTo: halamanIni() } });
}

async function keluar() {
  await sb.auth.signOut();
  window.location.href = halamanIni();
}
