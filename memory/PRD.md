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
- ✅ SceneComingSoon placeholder untuk Scene 4–7
- ✅ Data-testid pada semua elemen interaktif
- ✅ Verifikasi visual via screenshot (Scene 0, avatar, Scene 1 dialog, Scene 2 hotspots + clue modal + toast + journal, Scene 3 lab)

## Prioritized Backlog
### P0 — Iterasi Berikutnya (untuk sesi selanjutnya)
- Scene 4 — Ruang Organ: peta peredaran darah interaktif, drag-drop urutan pulmonal & sistemik, toggle Normal vs Rani
- Scene 5 — Interogasi Saksi: 3 saksi (Ibu Rani, Rani sendiri, teman sebangku), branching dialog, clue Gaya Hidup
- Scene 6 — Ruang Kesimpulan: cork board interaktif, drag clue card, benang merah untuk sebab-akibat, formulir rekomendasi
- Scene 7 — Epilog & Refleksi: ending bercabang berdasar skor, kuis refleksi 3–5 soal, export ringkasan PDF (jsPDF)

### P1 — Enhancement
- Timer play-time tracker (currently placeholder)
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
