/**
 * i18n — Kamus string UI dalam Bahasa Indonesia.
 *
 * Infrastructure ini disiapkan sebagai wrapper `t(key)` di seluruh
 * UI chrome (menu, tombol, jurnal, HUD, judul scene) supaya string
 * terpusat & mudah dikelola. Multi-bahasa (Jawa/Sunda) sengaja
 * dihapus per permintaan user; jika diperlukan lagi di masa depan,
 * cukup tambahkan properti bahasa baru ke setiap entry di `dict`.
 */

const dict = {
  // ============ Menu / Splash (Scene 0) ============
  "menu.tagline": "SMP KELAS VIII · FASE D",
  "menu.subtitleConcept": "Sistem Peredaran Darah",
  "menu.title.line1": "Detektif",
  "menu.title.line2": "Peredaran",
  "menu.title.line3": "Darah.",
  "menu.hero.body":
    "Misteri siswi Rani yang sering pucat, lemas, dan pingsan menantimu. Kumpulkan bukti, pecahkan kasus, dan susun rekomendasi berbasis ilmu pengetahuan.",
  "menu.mulai": "Mulai Investigasi",
  "menu.caraBermain": "Cara Bermain",
  "menu.tentang": "Tentang Game",
  "menu.keluar": "Keluar",
  "menu.help.title": "Cara Bermain",
  "menu.about.title": "Tentang Game",
  "menu.mengerti": "Mengerti",

  // ============ Avatar Picker ============
  "avatar.title": "Buat Karaktermu",
  "avatar.subtitle":
    "Pilih nama detektif dan tampilan avatar. Kamu akan tampil sebagai penyidik utama.",
  "avatar.namaLabel": "Nama Detektif",
  "avatar.namaPlaceholder": "Contoh: Sherlock Aini",
  "avatar.pilihAvatar": "Pilih Avatar",
  "avatar.kembali": "Kembali",

  // ============ HUD ============
  "hud.jurnal": "Jurnal",
  "hud.aria.mute": "Bisukan suara",
  "hud.aria.unmute": "Aktifkan suara",
  "hud.aria.reset": "Mulai ulang",
  "hud.tag.concept": "Konsep IPA",
  "hud.tag.ssi": "SSI",

  // ============ Journal ============
  "journal.title": "Jurnal Investigasi",
  "journal.count": "petunjuk ditemukan",
  "journal.cards": "kartu",
  "journal.empty.title": "Belum ada petunjuk",
  "journal.empty.body":
    "Selidiki setiap ruang dan hotspot. Semua bukti yang kamu temukan akan menempel di papan ini.",
  "journal.cetak": "Cetak",
  "journal.tersimpan": "Tersimpan ke Jurnal Investigasi",
  "category.gejala": "Gejala Klinis",
  "category.medis": "Data Medis",
  "category.gayaHidup": "Gaya Hidup / Sosial",

  // ============ Toast ============
  "toast.new": "Petunjuk Baru!",
  "toast.savedHint": "Tersimpan ke Jurnal — klik untuk tutup",

  // ============ Dialog ============
  "dialog.lanjut": "Lanjut",
  "dialog.mulai": "Mulai",
  "dialog.skip": "Skip",

  // ============ Common buttons ============
  "btn.tutup": "Tutup",
  "btn.nantiSaja": "Nanti Saja",
  "btn.kirim": "Kirim",
  "btn.download": "Unduh",
  "btn.preview": "Preview",
  "btn.mainLagi": "Main Lagi",

  // ============ Preloader ============
  "preload.loading": "Memuat aset",
  "preload.done": "Semua aset siap",

  // ============ Scene labels ============
  "scene.0.name": "Menu Utama",
  "scene.1.name": "Briefing Kasus",
  "scene.1.location": "Ruang UKS",
  "scene.1.subtitle":
    "Bu Nita, guru UKS, menjelaskan kondisi Rani. Dengarkan baik-baik — dari sini semua investigasi bermula.",
  "scene.2.name": "Pemeriksaan Gejala",
  "scene.2.title": "Periksa Tubuh Rani",
  "scene.2.subtitle":
    "Klik titik berdenyut untuk mengumpulkan bukti gejala klinis.",
  "scene.2.buktiLabel": "Bukti Ditemukan",
  "scene.3.name": "Laboratorium",
  "scene.3.title": "Uji Darah Rani",
  "scene.4.name": "Ruang Organ",
  "scene.4.title": "Peta Peredaran Darah",
  "scene.5.name": "Interogasi Saksi",
  "scene.5.title": "Wawancara Narasumber",
  "scene.5.loc.rumah": "Rumah Rani",
  "scene.5.loc.kantin": "Kantin Sekolah",
  "scene.6.name": "Ruang Kesimpulan",
  "scene.6.title": "Susun Alur Sebab-Akibat",
  "scene.7.name": "Epilog & Refleksi",
  "scene.7.title.utama": "Kasus Terpecahkan!",
  "scene.7.title.pemula": "Investigasi Berlanjut…",
  "scene.7.utama": "Detektif Utama",
  "scene.7.pemula": "Detektif Pemula",
  "scene.7.totalSkor": "Total Skor",
  "scene.7.ambangElite": "Ambang Elite",
  "scene.7.ending": "Ending",
  "scene.7.waktu": "Waktu Bermain",

  // ============ Version stamp ============
  "footer.version": "v1.0",
};

/**
 * Get a translated string by key. Returns the key itself if not found
 * (development-friendly fallback).
 */
export function t(key) {
  return dict[key] || key;
}

export { dict };
