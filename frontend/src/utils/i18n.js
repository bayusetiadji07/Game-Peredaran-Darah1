/**
 * i18n — Multi-bahasa untuk UI chrome game.
 *
 * Bahasa yang didukung:
 *  - id : Bahasa Indonesia (default)
 *  - jw : Bahasa Jawa (ngoko lugu — akrab untuk siswa)
 *  - su : Bahasa Sunda (loma — akrab untuk siswa)
 *
 * Cerita/dialog dan deskripsi konten IPA tetap dalam Bahasa Indonesia
 * karena mengikuti Kurikulum Merdeka. Localization ini menerjemahkan
 * navigasi, tombol, label, dan pesan sistem.
 */

export const LANGUAGES = [
  { code: "id", label: "Indonesia", flag: "🇮🇩" },
  { code: "jw", label: "Jawa", flag: "ꦗ" },
  { code: "su", label: "Sunda", flag: "ᮞ" },
];

const dict = {
  // ============ Menu / Splash (Scene 0) ============
  "menu.tagline": {
    id: "SMP KELAS VIII · FASE D",
    jw: "SMP KELAS VIII · FASE D",
    su: "SMP KELAS VIII · FASE D",
  },
  "menu.subtitleConcept": {
    id: "Sistem Peredaran Darah",
    jw: "Sistem Peredaran Getih",
    su: "Sistem Peredaran Getih",
  },
  "menu.title.line1": {
    id: "Detektif",
    jw: "Detektif",
    su: "Detektif",
  },
  "menu.title.line2": {
    id: "Peredaran",
    jw: "Peredaran",
    su: "Peredaran",
  },
  "menu.title.line3": {
    id: "Darah.",
    jw: "Getih.",
    su: "Getih.",
  },
  "menu.hero.body": {
    id: "Misteri siswi Rani yang sering pucat, lemas, dan pingsan menantimu. Kumpulkan bukti, pecahkan kasus, dan susun rekomendasi berbasis ilmu pengetahuan.",
    jw: "Misteri siswi Rani sing kerep pucet, lemes, lan semaput ngenteni sampeyan. Kumpulno bukti, pecahno kasuse, lan susun saran adhedhasar ilmu pengetahuan.",
    su: "Misteri siswi Rani anu remen pias, lemes, jeung teu emut ngantosan anjeun. Kumpulkeun bukti, pecahkeun perkarana, jeung susun saran dumasar élmu pangaweruh.",
  },
  "menu.mulai": {
    id: "Mulai Investigasi",
    jw: "Miwiti Investigasi",
    su: "Ngamimitian Panalungtikan",
  },
  "menu.caraBermain": {
    id: "Cara Bermain",
    jw: "Cara Dolanan",
    su: "Cara Ulin",
  },
  "menu.tentang": {
    id: "Tentang Game",
    jw: "Babagan Dolanan",
    su: "Ngeunaan Kaulinan",
  },
  "menu.keluar": {
    id: "Keluar",
    jw: "Metu",
    su: "Kaluar",
  },
  "menu.help.title": {
    id: "Cara Bermain",
    jw: "Cara Dolanan",
    su: "Cara Ulin",
  },
  "menu.about.title": {
    id: "Tentang Game",
    jw: "Babagan Dolanan",
    su: "Ngeunaan Kaulinan",
  },
  "menu.mengerti": {
    id: "Mengerti",
    jw: "Ngerti",
    su: "Ngartos",
  },

  // ============ Avatar Picker ============
  "avatar.title": {
    id: "Buat Karaktermu",
    jw: "Gawe Tokoh Sampeyan",
    su: "Damel Karakter Anjeun",
  },
  "avatar.subtitle": {
    id: "Pilih nama detektif dan tampilan avatar. Kamu akan tampil sebagai penyidik utama.",
    jw: "Pilih jeneng detektif lan tampilan avatar. Sampeyan bakal dadi juru selidik utama.",
    su: "Pilih ngaran detektif jeung tampilan avatar. Anjeun bakal jadi panalungtik utama.",
  },
  "avatar.namaLabel": {
    id: "Nama Detektif",
    jw: "Jeneng Detektif",
    su: "Ngaran Detektif",
  },
  "avatar.namaPlaceholder": {
    id: "Contoh: Sherlock Aini",
    jw: "Tuladha: Sherlock Aini",
    su: "Conto: Sherlock Aini",
  },
  "avatar.pilihAvatar": {
    id: "Pilih Avatar",
    jw: "Pilih Avatar",
    su: "Pilih Avatar",
  },
  "avatar.kembali": {
    id: "Kembali",
    jw: "Bali",
    su: "Uih",
  },

  // ============ HUD ============
  "hud.jurnal": {
    id: "Jurnal",
    jw: "Cathetan",
    su: "Buku Catetan",
  },
  "hud.aria.mute": {
    id: "Bisukan suara",
    jw: "Sirep swara",
    su: "Sepikan sora",
  },
  "hud.aria.unmute": {
    id: "Aktifkan suara",
    jw: "Uripake swara",
    su: "Hurungkeun sora",
  },
  "hud.aria.reset": {
    id: "Mulai ulang",
    jw: "Baleni",
    su: "Ngamimitian deui",
  },
  "hud.tag.concept": {
    id: "Konsep IPA",
    jw: "Konsep IPA",
    su: "Konsep IPA",
  },
  "hud.tag.ssi": {
    id: "SSI",
    jw: "SSI",
    su: "SSI",
  },

  // ============ Journal ============
  "journal.title": {
    id: "Jurnal Investigasi",
    jw: "Cathetan Investigasi",
    su: "Buku Catetan Panalungtikan",
  },
  "journal.count": {
    id: "petunjuk ditemukan",
    jw: "pituduh ketemu",
    su: "pituduh kapendak",
  },
  "journal.cards": {
    id: "kartu",
    jw: "kertu",
    su: "kartu",
  },
  "journal.empty.title": {
    id: "Belum ada petunjuk",
    jw: "Durung ana pituduh",
    su: "Can aya pituduh",
  },
  "journal.empty.body": {
    id: "Selidiki setiap ruang dan hotspot. Semua bukti yang kamu temukan akan menempel di papan ini.",
    jw: "Selidiki saben kamar lan titik penting. Kabeh bukti sing sampeyan temokake bakal nempel ing papan iki.",
    su: "Talungtik saban kamar sareng titik penting. Sadaya bukti anu anjeun pendakan bakal napel dina papan ieu.",
  },
  "journal.cetak": {
    id: "Cetak",
    jw: "Cithak",
    su: "Citak",
  },
  "journal.tersimpan": {
    id: "Tersimpan ke Jurnal Investigasi",
    jw: "Kasimpen ing Cathetan Investigasi",
    su: "Kasimpen kana Buku Catetan Panalungtikan",
  },
  "category.gejala": {
    id: "Gejala Klinis",
    jw: "Tandha Klinis",
    su: "Ciri Klinis",
  },
  "category.medis": {
    id: "Data Medis",
    jw: "Data Medis",
    su: "Data Médis",
  },
  "category.gayaHidup": {
    id: "Gaya Hidup / Sosial",
    jw: "Cara Urip / Sosial",
    su: "Cara Hirup / Sosial",
  },

  // ============ Toast ============
  "toast.new": {
    id: "Petunjuk Baru!",
    jw: "Pituduh Anyar!",
    su: "Pituduh Anyar!",
  },
  "toast.savedHint": {
    id: "Tersimpan ke Jurnal — klik untuk tutup",
    jw: "Kasimpen ing Cathetan — klik kanggo nutup",
    su: "Kasimpen kana Buku Catetan — klik pikeun nutup",
  },

  // ============ Dialog ============
  "dialog.lanjut": {
    id: "Lanjut",
    jw: "Terus",
    su: "Teraskeun",
  },
  "dialog.mulai": {
    id: "Mulai",
    jw: "Miwiti",
    su: "Mimitian",
  },
  "dialog.skip": {
    id: "Skip",
    jw: "Ndhelik",
    su: "Léwatan",
  },

  // ============ Common buttons ============
  "btn.tutup": {
    id: "Tutup",
    jw: "Tutup",
    su: "Tutup",
  },
  "btn.nantiSaja": {
    id: "Nanti Saja",
    jw: "Mengko Wae",
    su: "Engké Waé",
  },
  "btn.kirim": {
    id: "Kirim",
    jw: "Kirim",
    su: "Kirim",
  },
  "btn.download": {
    id: "Unduh",
    jw: "Undhuh",
    su: "Unduh",
  },
  "btn.preview": {
    id: "Preview",
    jw: "Pratayang",
    su: "Ténjo Heula",
  },
  "btn.mainLagi": {
    id: "Main Lagi",
    jw: "Dolanan Maneh",
    su: "Ulin Deui",
  },

  // ============ Preloader ============
  "preload.loading": {
    id: "Memuat aset",
    jw: "Ngunduh aset",
    su: "Ngunduh aset",
  },
  "preload.done": {
    id: "Semua aset siap",
    jw: "Kabeh aset siyaga",
    su: "Sadaya aset sayagi",
  },

  // ============ Scene labels ============
  "scene.0.name": {
    id: "Menu Utama",
    jw: "Menu Utama",
    su: "Menu Utama",
  },
  "scene.1.name": {
    id: "Briefing Kasus",
    jw: "Katrangan Kasus",
    su: "Katerangan Perkara",
  },
  "scene.1.location": {
    id: "Ruang UKS",
    jw: "Ruang UKS",
    su: "Rohangan UKS",
  },
  "scene.1.subtitle": {
    id: "Bu Nita, guru UKS, menjelaskan kondisi Rani. Dengarkan baik-baik — dari sini semua investigasi bermula.",
    jw: "Bu Nita, guru UKS, njelasake kahanane Rani. Rungokna sing tenanan — saka kene kabeh investigasi diwiwiti.",
    su: "Bu Nita, guru UKS, ngajéntrékeun kaayaan Rani. Regepkeun sing saé — ti dieu sadaya panalungtikan dimimitian.",
  },
  "scene.2.name": {
    id: "Pemeriksaan Gejala",
    jw: "Pamriksan Tandha",
    su: "Pamariksaan Ciri",
  },
  "scene.2.title": {
    id: "Periksa Tubuh Rani",
    jw: "Priksa Awak Rani",
    su: "Pariksa Awak Rani",
  },
  "scene.2.subtitle": {
    id: "Klik titik berdenyut untuk mengumpulkan bukti gejala klinis.",
    jw: "Klik titik sing kedhap-kedhep kanggo nglumpuk bukti tandha klinis.",
    su: "Klik titik anu ngajedud pikeun ngumpulkeun bukti ciri klinis.",
  },
  "scene.2.buktiLabel": {
    id: "Bukti Ditemukan",
    jw: "Bukti Ketemu",
    su: "Bukti Kapendak",
  },
  "scene.3.name": {
    id: "Laboratorium",
    jw: "Laboratorium",
    su: "Laboratorium",
  },
  "scene.3.title": {
    id: "Uji Darah Rani",
    jw: "Uji Getih Rani",
    su: "Uji Getih Rani",
  },
  "scene.4.name": {
    id: "Ruang Organ",
    jw: "Kamar Organ",
    su: "Rohangan Organ",
  },
  "scene.4.title": {
    id: "Peta Peredaran Darah",
    jw: "Peta Peredaran Getih",
    su: "Peta Peredaran Getih",
  },
  "scene.5.name": {
    id: "Interogasi Saksi",
    jw: "Interogasi Seksi",
    su: "Interogasi Saksi",
  },
  "scene.5.title": {
    id: "Wawancara Narasumber",
    jw: "Wawancara Narasumber",
    su: "Wawancara Narasumber",
  },
  "scene.5.loc.rumah": {
    id: "Rumah Rani",
    jw: "Omahé Rani",
    su: "Bumi Rani",
  },
  "scene.5.loc.kantin": {
    id: "Kantin Sekolah",
    jw: "Kantin Sekolah",
    su: "Kantin Sakola",
  },
  "scene.6.name": {
    id: "Ruang Kesimpulan",
    jw: "Kamar Kesimpulan",
    su: "Rohangan Kacindekan",
  },
  "scene.6.title": {
    id: "Susun Alur Sebab-Akibat",
    jw: "Susun Alur Sebab-Akibat",
    su: "Susun Alur Sabab-Akibat",
  },
  "scene.7.name": {
    id: "Epilog & Refleksi",
    jw: "Epilog & Refleksi",
    su: "Epilog & Refleksi",
  },
  "scene.7.title.utama": {
    id: "Kasus Terpecahkan!",
    jw: "Kasusé Kabukak!",
    su: "Perkarana Kapecah!",
  },
  "scene.7.title.pemula": {
    id: "Investigasi Berlanjut…",
    jw: "Investigasi Diterusake…",
    su: "Panalungtikan Diteraskeun…",
  },
  "scene.7.utama": {
    id: "Detektif Utama",
    jw: "Detektif Utama",
    su: "Detektif Utama",
  },
  "scene.7.pemula": {
    id: "Detektif Pemula",
    jw: "Detektif Wiwitan",
    su: "Detektif Pamimit",
  },
  "scene.7.totalSkor": {
    id: "Total Skor",
    jw: "Total Skor",
    su: "Total Skor",
  },
  "scene.7.ambangElite": {
    id: "Ambang Elite",
    jw: "Wates Elite",
    su: "Wates Elite",
  },
  "scene.7.ending": {
    id: "Ending",
    jw: "Pungkasan",
    su: "Panungtungan",
  },
  "scene.7.waktu": {
    id: "Waktu Bermain",
    jw: "Wektu Dolanan",
    su: "Waktos Ulin",
  },

  // ============ Version stamp ============
  "footer.version": {
    id: "v1.0 · Prototipe Scene 0–3",
    jw: "v1.0 · Prototipe Scene 0–3",
    su: "v1.0 · Prototipe Scene 0–3",
  },
};

/**
 * Get a translated string by key.
 * Falls back to Indonesia (id) if the key or language is missing.
 */
export function t(key, lang = "id") {
  const entry = dict[key];
  if (!entry) return key; // dev fallback: show missing key
  return entry[lang] || entry.id || key;
}

/** React hook wrapper that pulls language from GameContext */
export { dict };
