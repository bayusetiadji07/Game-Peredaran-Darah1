# PRD — Detektif Peredaran Darah: Misteri Siswi Pucat dan Lemas

## Original Problem
User (Bayu Setiadji, S.Pd., Gr., SMP Negeri 3 Besuki, Situbondo) provided a GitHub repository `bayusetiadji07/Game-Peredaran-Darah1` containing a full PRD document and 4 folders of assets (background, karakter, ilustrasi, ikon) for building an educational web game titled "Detektif Peredaran Darah: Misteri Siswi Pucat dan Lemas". Target: SMP Kelas VIII (Kurikulum Merdeka Fase D). Topic: Sistem Peredaran Darah + Socio-Scientific Issue (SSI) anemia pada remaja putri. Estimated play duration: 35–45 minutes.

## User Personas
- **Siswa SMP Kelas VIII** (14 tahun) — pemain utama, berperan sebagai Detektif Kesehatan
- **Guru IPA / UKS** — fasilitator pembelajaran, memantau progres dan mencetak laporan siswa

## Core Requirements (Static)
- Game single-page berbasis web (React), offline-capable
- 8 Scene linear (0–7) dengan kemampuan buka Jurnal dari mana pun
- Progres tersimpan otomatis di `localStorage` (tanpa backend/database/login)
- Bahasa Indonesia sederhana untuk siswa Grade 8
- Palet warna: maroon `#8B1E1E`, navy `#1F3864`, teal `#0F6674`, mustard, krem/putih
- Prinsip desain: flat-vector edukatif, child-friendly, tetap ilmiah akurat
- Aset ilustrasi disediakan user (folder `/frontend/public/assets/`)
- Ekspor laporan via `window.print()` (dan jsPDF di scene 7)

## Tech Stack
- Frontend: React 18, Tailwind, framer-motion, lucide-react, jspdf (untuk scene 7 nanti)
- Backend: FastAPI minimal (health endpoint saja) — sesuai environment platform
- Storage: `localStorage` (kunci `detektif_peredaran_darah_state_v1`)
- Fonts: Fraunces (display), Outfit (body), Space Mono (data)

## Implemented (Session #1 — 29 Jul 2026)
- ✅ Scaffolding frontend React + backend FastAPI minimal
- ✅ Copy semua aset dari repo ke `/app/frontend/public/assets/`
- ✅ `GameContext` dengan localStorage persistence, actions: setPlayer, goToScene, addClue, answerQuiz, setLabData, addScore, toggleMute, reset
- ✅ `HUD` (tags konsep IPA + SSI, tombol mute, reset, jurnal dengan badge counter)
- ✅ `Journal` (cork-board modal, kartu clue berputar sedikit, 3 kategori warna, tombol Cetak)
- ✅ `DialogBox` (visual-novel dengan efek typewriter, portrait karakter, skip-on-click)
- ✅ `SceneShell` (background + vignette + grain overlay + HUD)
- ✅ `ClueUnlockedToast` (notifikasi "Petunjuk Baru!")
- ✅ `AudioManager` (musik latar misteri + SFX klik dari CDN Pixabay)
- ✅ **Scene 0 — Splash + Menu**: heart pulse animation, 4 avatar picker, nama detektif, panel Cara Bermain & Tentang
- ✅ **Scene 1 — Briefing UKS**: 6-line dialog Bu Nita, transisi ke Scene 2
- ✅ **Scene 2 — Pemeriksaan Gejala**: 4 hotspot pada Rani (mata, kuku, nadi, dada), clue modal, kuis mini beralasan
- ✅ **Scene 3 — Laboratorium**: intro Dr. Salma, drag-and-drop 4 kartu lab ke zona NORMAL/RENDAH, mikroskop bar

## Implemented (Session #4 — 29 Jul 2026 — POLISH)
- ✅ **Timer play-time akurat**: Tick 1s tepat via `setInterval` di `GameContext`. Auto-pause saat `document.visibilityState !== "visible"` (tab tidak aktif), auto-resume saat kembali. Persist ke `localStorage`. Ditampilkan di HUD (kanan atas, badge kecil dengan ikon jam) selama gameplay dan sebagai stat card di Scene 7 (format MM:SS).
- ✅ **PDF Preview Modal**: Tombol baru `Preview PDF` di Scene 7 → membuka modal 92vh dengan iframe `blob:` URL. Header berisi filename + tombol "Unduh Sekarang" + close. Fallback message tersedia untuk browser tanpa PDF viewer bawaan (contoh WebKit headless) → link "buka di tab baru". `buildPdf()` di-refactor jadi fungsi murni yang dipakai bersama oleh Preview dan Download.
- ✅ **Bugfix visual — background asset karakter**: Terdeteksi 3 file (`ibu-rani.png`, `dr-salma.png`, `teman-rani.png`) memakai mode RGB dengan latar putih solid → tampak sebagai "kotak putih" di scene. Diperbaiki via script Python + Pillow:
  1. Flood-fill dari pinggir gambar mendeteksi pixel near-white (RGB ≥ 225) yang terhubung ke tepi → dijadikan transparan (alpha=0). Ini aman: highlight putih di dalam karakter (mata, gigi, kerah baju) tidak ikut hilang karena tidak terhubung ke tepi.
  2. Feather alpha (Gaussian blur 1.2px) untuk mengurangi halo pinggir.
  3. Semua file karakter juga di-resize ke max width 900px untuk optimasi web.
  4. Ukuran folder karakter: **~13MB → ~2.3MB (85% reduction)** — loading scene jadi jauh lebih cepat.
  5. Aset asli tersimpan di `/app/frontend/public/assets/karakter_orig/` sebagai backup.
- ✅ **Scene 6 — Ruang Kesimpulan**: Cork-board sebab-akibat 4 kolom (Gejala → Data Lab → Mekanisme Organ → Penyebab Gaya Hidup) dengan drag-and-drop HTML5 dari tray kartu Jurnal. Kolom otomatis berdasarkan `unlockedInScene`. Skor +5 per penempatan benar. Form Laporan Rekomendasi (6 pilihan, min 3, 4 ideal + 2 keliru). Feedback modal dengan akurasi persen setelah kirim laporan. Tombol lepaskan kartu dari kolom.
- ✅ **Scene 7 — Epilog & Refleksi**: Ending bercabang berdasarkan `state.score.total` (ambang batas = 55) → "Detektif Utama" (Trophy, warna teal) atau "Detektif Pemula" (Award, warna mustard). Ilustrasi Rani sehat dengan badge "Beberapa Minggu Kemudian". Kuis refleksi 5 soal mixing konsep IPA + SSI (fungsi Hb, alur pulmonal, interpretasi Hb rendah, faktor sosial anemia remaja putri, kebijakan sekolah). Jawaban benar +3 poin, feedback langsung. Tombol Cetak (window.print) + Unduh PDF (jsPDF native, tanpa server) + Main Lagi.
- ✅ Export PDF terstruktur: header identitas siswa, ringkasan bukti dikelompokkan per kategori, kesimpulan diagnosis & rekomendasi standar. Nama file `laporan-detektif-{nama_siswa}.pdf`
- ✅ Verifikasi visual seluruh flow: Scene 6 cork board + tray, Scene 7 dua varian ending (Elite & Pemula), quiz answering dengan skor auto-update, PDF trigger sukses tanpa error.

## Prioritized Backlog
### P0 — Iterasi Berikutnya (untuk sesi selanjutnya)
_Semua 8 scene sudah selesai. Backlog di bawah bersifat opsional peningkatan._

### P1 — Enhancement
- ~~Timer play-time tracker~~ ✅ done in Session #4
- Preload gambar & audio agar tidak ada flicker
- Tooltip yang lebih rich untuk hotspot (dengan gambar close-up)
- Panel guru untuk melihat progres semua siswa (butuh backend + akun)

### P2 — Nice-to-have
- Multibahasa (Bahasa Jawa/Sunda opsional)
- Mode multipemain / kelompok
- Ekspor sebagai APK PWA offline
- Analitik pembelajaran untuk guru

## Notes
- Musik latar dan SFX klik memakai Pixabay CDN (CC0). Jika CDN tidak dapat diakses, audio silent (tidak crash).
- Hotspot Scene 2 diposisikan relatif terhadap image Rani; jika ingin lebih presisi, atur ulang koordinat x/y di `SCENE2_HOTSPOTS` (file `src/data/gameContent.js`).
- Semua text Bahasa Indonesia disusun sesuai jenjang SMP Kelas VIII.

## Implemented (Session #4 — 29 Jul 2026 — POLISH)