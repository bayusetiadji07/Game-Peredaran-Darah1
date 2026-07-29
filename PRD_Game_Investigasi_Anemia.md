# PRD: Detektif Peredaran Darah — Misteri Siswi Pucat dan Lemas

**Jenis produk:** Game edukasi web interaktif (single-page web app)
**Topik:** Sistem Peredaran Darah — Isu SSI (Socio-Scientific Issues): Anemia pada Remaja Putri
**Jenjang:** SMP Kelas VIII — Kurikulum Merdeka (Fase D)
**Disusun oleh:** Bayu Setiadji, S.Pd., Gr. — SMP Negeri 3 Besuki, Situbondo
**Sumber:** Diadaptasi dari dokumen storyboard "Storyboard_Game_Investigasi_Anemia"

---

## 1. Ringkasan Produk

Game investigasi berbasis web di mana siswa berperan sebagai "Detektif Kesehatan" yang menyelidiki kasus fiktif seorang siswi bernama **Rani** yang sering pucat, lemas, dan pingsan. Siswa mengumpulkan bukti (gejala klinis, hasil lab, mekanisme organ, dan faktor gaya hidup/sosial) melalui 8 scene (Scene 0–7), lalu menyusun kesimpulan diagnosis dan rekomendasi berbasis bukti.

Game menggabungkan pembelajaran konsep sains (sistem peredaran darah, eritrosit, hemoglobin) dengan penalaran isu sosiosaintifik (pola makan, gender, akses gizi remaja putri).

**Estimasi durasi bermain:** 35–45 menit (1–2 JP).

## 2. Tujuan Pembelajaran

- Menjelaskan struktur dan fungsi jantung, pembuluh darah, dan komponen darah (eritrosit, hemoglobin, plasma) dalam mengangkut oksigen.
- Menganalisis hubungan antara kadar hemoglobin rendah (anemia) dengan gejala yang dialami tubuh.
- Mengaitkan isu sosial (pola makan, gender, akses gizi) dengan fenomena anemia sebagai bentuk penalaran SSI.
- Menyusun kesimpulan dan rekomendasi berbasis bukti (evidence-based reasoning).

## 3. Karakter

| Karakter | Peran | Catatan Aset |
|---|---|---|
| Rani (14 tahun) | Siswi kelas VIII, objek investigasi | 2 varian: pucat/lemas (Scene 1–2) dan sehat (Scene 7) |
| Pemain (avatar "Detektif Kesehatan") | Dikendalikan siswa, nama & tampilan dapat dikustomisasi | 3–4 varian avatar, gender-netral |
| Bu Nita | Guru UKS — pemberi misi & narator | 2 pose (berdiri, menjelaskan) |
| Dr. Salma | Tenaga medis puskesmas — sumber data lab | 1–2 pose |
| Ibu Rani & teman sebangku | Narasumber wawancara (Scene 5) | Pose duduk/berdiri wawancara |

## 4. Struktur Game (8 Scene)

Alur linear dengan branching ringan di ending (Scene 7). Setiap scene punya tag "Konsep IPA" dan "Muatan SSI" — keduanya harus tampil ke siswa (mis. sebagai label kecil di pojok layar) agar guru bisa memetakan capaian.

### Scene 0 — Splash Screen & Menu Utama
- Layar judul dengan ilustrasi jantung berdenyut (animasi pulse loop).
- Tombol: Mulai Investigasi, Cara Bermain, Tentang, Keluar.
- Panel pembuatan avatar: input nama + pilih 1 dari 3–4 desain avatar detektif.
- Musik latar misteri ringan (opsional, tidak menakutkan).

### Scene 1 — Briefing Kasus (Ruang UKS)
- **Konsep IPA:** Fungsi umum sistem peredaran darah (mengedarkan oksigen & nutrisi).
- **Muatan SSI:** Gejala kesehatan siswi sering diabaikan/dianggap "biasa".
- Dialog visual-novel style: Bu Nita menjelaskan Rani baru pingsan saat upacara.
- Pemain menerima "Misi 1". Klik ikon buku catatan → membuka **Jurnal Investigasi** (menyimpan clue otomatis).

### Scene 2 — Pemeriksaan Gejala (TKP Awal)
- **Konsep IPA:** Kerja jantung & denyut nadi sebagai respons kompensasi saat oksigen berkurang.
- **Muatan SSI:** Normalisasi gejala oleh lingkungan sebagai kurangnya literasi kesehatan.
- Hotspot klik pada tubuh Rani: mata (konjungtiva pucat), kuku (koilonychia), nadi pergelangan tangan, dada (jantung berdebar).
- Tiap hotspot memunculkan pop-up data gejala (mis. denyut nadi 110/menit) → otomatis tersimpan sebagai clue card.
- Kuis mini pilihan ganda beralasan: "Mengapa jantung Rani berdebar lebih cepat?"

### Scene 3 — Laboratorium: Uji Darah Fiktif
- **Konsep IPA:** Peran eritrosit & hemoglobin dalam mengikat/mengangkut oksigen; nilai rujukan Hb normal vs rendah.
- **Muatan SSI:** Peran fasilitas kesehatan (puskesmas) dan akses pemeriksaan gratis/mudah bagi remaja.
- Dr. Salma menyerahkan lembar hasil lab digital: Hb 9 g/dL (rujukan normal remaja putri 12–15 g/dL), eritrosit rendah, MCV rendah.
- Mini-game drag-and-drop: pemain menyeret nilai hasil lab ke kategori "Normal" atau "Rendah" berdasarkan rentang rujukan.
- Animasi perbandingan mikroskopik sel darah merah normal vs anemia (mikrositik-hipokromik).

### Scene 4 — Ruang Organ: Simulasi Peta Peredaran Darah
- **Konsep IPA:** Jalur peredaran darah besar (sistemik) & kecil (pulmonal); mekanisme jantung memompa darah beroksigen, kaitan dengan anemia.
- Mini-game drag-and-drop/urutkan: pemain menyusun urutan jalur peredaran darah kecil (jantung → paru-paru → jantung) dan besar (jantung → seluruh tubuh → jantung).
- Klik tiap organ (jantung, paru-paru, arteri, vena) → penjelasan singkat (teks/audio naratif Bu Nita).
- Toggle "Normal vs Rani" untuk membandingkan kepadatan/warna partikel sel darah merah yang bergerak di pembuluh.
- Tantangan akhir: pemain memilih argumen mengapa jantung Rani bekerja lebih keras meski oksigen dalam darahnya berkurang.

### Scene 5 — Interogasi Saksi: Gaya Hidup & Gender
- **Konsep IPA:** Kaitan asupan zat besi (Fe), pola makan, dan kehilangan darah saat menstruasi terhadap kadar hemoglobin.
- **Muatan SSI (inti dilema sosial):** Norma sosial-budaya (pola makan tidak setara antar anggota keluarga, kurangnya edukasi menstruasi) sebagai faktor risiko anemia remaja putri.
- Dua sub-lokasi: rumah Rani dan kantin sekolah.
- Pemain memilih 3 saksi: Ibu Rani, Rani sendiri, teman sebangku.
- Sistem dialog percabangan sederhana; pemain memilih pertanyaan (pola makan, siklus menstruasi, kebiasaan jajan).
- Tiap jawaban saksi memunculkan clue baru (warna beda dari clue medis, agar mudah dibedakan di jurnal).
- Pertanyaan reflektif/diskusi: "Mengapa remaja putri secara umum lebih berisiko anemia dibanding remaja putra?"

### Scene 6 — Ruang Kesimpulan: Laporan Diagnosis
- **Konsep IPA:** Sintesis seluruh bukti (gejala, hasil lab, mekanisme organ) menjadi kesimpulan ilmiah yang koheren.
- **Muatan SSI:** Argumentasi berbasis bukti sebagai keterampilan pengambilan keputusan atas isu kesehatan-sosial.
- Papan gabus (cork board) interaktif: pemain drag clue card dari jurnal ke papan, disusun sebagai alur sebab-akibat (urutan: gejala → data lab → mekanisme organ → penyebab gaya hidup), dihubungkan "benang merah".
- Sistem memberi skor/umpan balik atas ketepatan alur logika.
- Pemain menuliskan/memilih rekomendasi (mis. konsumsi tablet tambah darah, perbaikan pola makan, edukasi ke keluarga) via formulir "Laporan Rekomendasi".

### Scene 7 — Epilog & Refleksi Isu Sosial (Ending Bercabang)
- **Konsep IPA:** Penguatan retensi — ringkasan fungsi organ peredaran darah dan peran hemoglobin.
- **Muatan SSI:** Refleksi dilema sosial — bagaimana sekolah/masyarakat dapat mencegah anemia pada remaja putri (kebijakan TTD di sekolah, edukasi gender-sensitif).
- Narasi epilog: Rani terlihat lebih segar setelah rekomendasi diikuti (beberapa minggu kemudian).
- Ending bercabang ringan berdasarkan skor Scene 6 (mis. "Detektif Utama" vs "Detektif Pemula, perlu belajar lagi") — **tanpa unsur menghukum**, tetap memotivasi.
- Kuis refleksi singkat (3–5 soal) menggabungkan konsep organ + isu sosial.
- Layar ringkasan/statistik akhir (jumlah clue ditemukan, skor laporan, waktu bermain).
- Tombol "Bagikan Laporan" — ekspor ringkasan hasil investigasi (dapat dicetak guru untuk bahan diskusi kelas).

## 5. Pemetaan Tahapan SSI ke Alur Game

| Tahap SSI | Scene | Aktivitas Kunci | Indikator Capaian |
|---|---|---|---|
| 1. Pemunculan Isu | 0–1 | Pengenalan kasus Rani | Siswa merumuskan pertanyaan investigasi awal |
| 2. Eksplorasi Konsep Sains | 2–4 | Pemeriksaan gejala, uji lab, simulasi peredaran darah | Siswa menjelaskan fungsi jantung, pembuluh darah, eritrosit & hemoglobin |
| 3. Analisis Data/Bukti | 3–4 | Membandingkan nilai rujukan normal vs data Rani | Siswa menginterpretasi data kuantitatif (Hb, MCV) secara tepat |
| 4. Diskusi Dimensi Sosial | 5 | Wawancara saksi (pola makan, menstruasi, norma keluarga) | Siswa mengidentifikasi faktor sosial-budaya penyebab anemia |
| 5. Pengambilan Keputusan/Argumentasi | 6–7 | Menyusun laporan sebab-akibat & rekomendasi, refleksi kebijakan | Siswa menyusun argumentasi berbasis bukti dan solusi kontekstual |

## 6. Data & State Model

Gunakan state di memori/browser (localStorage), tidak butuh server/backend — sesuai untuk 1 kali sesi pertemuan di lab komputer sekolah.

```
GameState {
  player: { name: string, avatarId: string }
  currentScene: number (0-7)
  journal: {
    clues: Clue[]           // setiap clue punya id, kategori (gejala|medis|gayaHidup), teks, sourceScene
  }
  quizAnswers: { [questionId]: string }
  labData: { hbLevel: number, eritrosit: string, mcv: string }  // hasil drag-drop Scene 3
  circulationOrder: { pulmonal: string[], sistemik: string[] }  // hasil urutan Scene 4
  interviewLog: { witnessId: string, questionId: string, answerClueId: string }[]
  corkBoardLayout: { clueId: string, position: number, connectedTo: string[] }[]  // Scene 6
  recommendation: string                                        // rekomendasi akhir siswa
  score: { symptomQuiz: number, labSort: number, reasoningFlow: number, reflectionQuiz: number, total: number }
  ending: "detektif_utama" | "detektif_pemula"
  playTimeSeconds: number
}
```

Clue card minimal punya field: `id`, `title`, `category` (gejala / medis / gayaHidup — 3 warna berbeda), `description`, `unlockedInScene`.

## 7. Daftar Aset (sudah tersedia — untuk di-mapping ke komponen)

> Catatan: bagian ini HANYA daftar referensi nama file/kategori aset sesuai storyboard asli. Sesuaikan nama file aset yang sudah Bapak buat ke daftar ini saat integrasi ke Emergent.

| Nama Aset | Kategori | Digunakan di Scene |
|---|---|---|
| Avatar Detektif (3–4 varian) | Karakter/Pemain | Scene 0, sepanjang UI |
| Rani — versi pucat/lemas | Karakter/NPC | Scene 1, 2 |
| Rani — versi sehat | Karakter/NPC | Scene 7 |
| Bu Nita (Guru UKS) | Karakter/NPC | Scene 1, 4, 7 |
| Dr. Salma (Nakes) | Karakter/NPC | Scene 3 |
| Ibu Rani & Teman Sebangku | Karakter/NPC | Scene 5 |
| Ilustrasi Jantung Animasi (pulse loop) | Ikon/Animasi | Scene 0 |
| Background Ruang UKS | Latar | Scene 1 |
| Background TKP/Close-up Tubuh + hotspot | Latar/Diagram | Scene 2 |
| Background Laboratorium | Latar | Scene 3 |
| Diagram Sel Darah (Normal vs Anemia) | Ilustrasi Ilmiah | Scene 3 |
| Diagram Sistem Peredaran Darah Full-Body (label togglable) | Ilustrasi Ilmiah/Interaktif | Scene 4 |
| Partikel Animasi Sel Darah Merah (2 varian warna) | Animasi | Scene 4 |
| Background Rumah Rani & Kantin | Latar | Scene 5 |
| Ikon Makanan (Fe tinggi/rendah) | Ikon | Scene 5 |
| Jurnal Investigasi & Clue Card (3 warna kategori) | UI/Item | Scene 1–6 |
| Papan Gabus (Cork Board) & Benang Merah | UI/Latar Interaktif | Scene 6 |
| Lencana Pencapaian (2–3 desain) | UI/Reward | Scene 7 |
| UI Dialog Box & Tombol | UI Kit | Seluruh scene |

### Palet Warna
- Merah marun `#8B1E1E` — elemen medis/darah
- Navy `#1F3864` — UI utama
- Teal `#0F6674` — aksen interaktif
- Krem/putih — latar netral

### Prinsip Desain
- Hindari ilustrasi darah/medis realistis-grafis; gaya diagram edukatif/flat vector, child-friendly namun tetap ilmiah akurat.
- Karakter beragam (gender, tanpa stereotip fisik berlebihan) agar isu gender tersampaikan halus.
- Ikon dan UI konsisten (line-icon/flat-icon) di seluruh scene.

## 8. Spesifikasi Teknis (untuk Emergent)

- **Platform target:** Single-page web app, dapat dijalankan offline di lab komputer sekolah (tanpa dependensi server wajib).
- **Stack:** React (disukai Emergent) dengan komponen per scene; state global via React Context/useState, disimpan ke `localStorage` per sesi (tidak perlu backend/database).
- **Navigasi:** Scene manager linear (0→7) dengan kemampuan "kembali ke jurnal" dari scene mana pun tanpa reset progres.
- **Responsif:** Optimalkan untuk layar desktop/laptop lab komputer (rasio 16:9), dukungan minimum di tablet.
- **Aset:** Semua ilustrasi/gambar sudah tersedia dari Bapak — import sebagai file statis (folder `/assets`), tidak perlu generate ulang.
- **Audio:** Musik latar & efek suara bersifat opsional (tombol mute tersedia).
- **Ekspor laporan (Scene 7):** Generate ringkasan hasil investigasi (nama pemain, clue ditemukan, skor, rekomendasi) sebagai teks yang bisa di-print via `window.print()` — tidak perlu generate PDF di server.
- **Tanpa akun/login** — sesuai untuk 1x sesi pembelajaran per siswa/kelompok.

## 9. Kriteria Selesai (Definition of Done)

- [ ] Seluruh 8 scene dapat dimainkan berurutan tanpa error.
- [ ] Jurnal Investigasi mengumpulkan clue otomatis dari tiap scene dan dapat dibuka kapan saja.
- [ ] Mini-game drag-drop (Scene 3, 4, 6) berfungsi dan memberi feedback benar/salah.
- [ ] Ending bercabang (Scene 7) merespons skor dari Scene 6 dengan benar.
- [ ] Progres tersimpan di localStorage (refresh browser tidak menghilangkan progres dalam 1 sesi).
- [ ] Seluruh teks dalam Bahasa Indonesia, sesuai jenjang SMP kelas VIII.
- [ ] Tampilan sesuai palet warna & prinsip desain (poin 7) menggunakan aset yang sudah disediakan.
- [ ] Fitur ekspor/print ringkasan laporan di akhir game berfungsi.

## 10. Di Luar Cakupan (Out of Scope v1)

- Multiplayer / mode kelas kolaboratif.
- Backend server, database, atau sistem login guru-siswa.
- Analitik penilaian otomatis terintegrasi LMS.
- Localization ke bahasa lain selain Bahasa Indonesia.

## 11. Contoh Prompt Awal untuk Emergent

Tempel PRD lengkap ini ke Emergent, lalu tambahkan instruksi pembuka berikut di kolom prompt:

> Buatkan web app game edukasi single-page berjudul "Detektif Peredaran Darah: Misteri Siswi Pucat dan Lemas" menggunakan React, mengikuti PRD berikut secara detail (8 scene, jurnal investigasi, mini-game drag-drop, sistem clue card, cork board, dan ending bercabang). Saya sudah punya seluruh aset ilustrasi/gambar yang akan saya upload ke folder assets — gunakan nama file yang saya berikan, jangan generate ilustrasi baru. State cukup disimpan di localStorage, tidak perlu backend/database/login. Target pengguna: siswa SMP kelas VIII, jadi semua teks dan instruksi harus dalam Bahasa Indonesia yang sederhana dan jelas. Ikuti palet warna (merah marun #8B1E1E, navy #1F3864, teal #0F6674, krem/putih) dan prinsip desain yang tercantum di bagian 7 PRD.

**Tips saat upload aset ke Emergent:**
- Beri nama file aset sesuai kategori di tabel bagian 7 (mis. `avatar-detektif-1.png`, `rani-pucat.png`, `bg-uks.png`) agar Emergent mudah mengaitkan aset ke komponen yang tepat.
- Jika ukuran project besar, minta Emergent membangun scene demi scene (mulai Scene 0–1 dulu, lalu iterasi ke scene berikutnya) daripada sekaligus 8 scene — ini biasanya menghasilkan hasil yang lebih presisi mengikuti storyboard.
