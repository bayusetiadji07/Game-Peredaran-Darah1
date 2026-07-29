// Static dialogue & clue data — Bahasa Indonesia (Grade 8)

export const AVATARS = [
  { id: "avatar-detektif-1", src: "/assets/karakter/avatar-detektif-1.png", name: "Detektif Alfa" },
  { id: "avatar-detektif-2", src: "/assets/karakter/avatar-detektif-2.png", name: "Detektif Bravo" },
  { id: "avatar-detektif-3", src: "/assets/karakter/avatar-detektif-3.png", name: "Detektif Charlie" },
  { id: "avatar-detektif-4", src: "/assets/karakter/avatar-detektif-4.png", name: "Detektif Delta" },
];

export const SCENE1_DIALOG = [
  {
    speaker: "Bu Nita",
    portrait: "/assets/karakter/bu-nita-menjelaskan.png",
    text:
      "Selamat datang di UKS, Detektif! Terima kasih sudah cepat datang. Ada kasus yang perlu kamu selidiki.",
  },
  {
    speaker: "Bu Nita",
    portrait: "/assets/karakter/bu-nita-menjelaskan.png",
    text:
      "Ini Rani, siswi kelas VIII. Tadi pagi ia baru saja pingsan saat upacara bendera. Padahal cuaca tidak terlalu panas.",
  },
  {
    speaker: "Bu Nita",
    portrait: "/assets/karakter/bu-nita-berdiri.png",
    text:
      "Menurut teman-temannya, Rani sering terlihat pucat dan cepat lelah. Katanya sih, \"biasa saja\" — tapi Ibu merasa ada yang tidak beres.",
  },
  {
    speaker: "Bu Nita",
    portrait: "/assets/karakter/bu-nita-menjelaskan.png",
    text:
      "Tugasmu: kumpulkan bukti dari kondisi tubuh Rani, hasil laboratorium, dan wawancara. Susun kesimpulan berbasis bukti — bukan tebakan!",
  },
  {
    speaker: "Bu Nita",
    portrait: "/assets/karakter/bu-nita-berdiri.png",
    text:
      "Semua petunjuk yang kamu temukan akan otomatis masuk ke Jurnal Investigasi. Buka jurnalmu kapan saja lewat tombol di kanan atas.",
  },
  {
    speaker: "Bu Nita",
    portrait: "/assets/karakter/bu-nita-menjelaskan.png",
    text: "Siap memulai penyelidikan?",
    isFinal: true,
  },
];

// Scene 2 hotspots on Rani's body
export const SCENE2_HOTSPOTS = [
  {
    id: "hs-mata",
    label: "Kelopak Mata",
    x: 50,
    y: 22,
    clue: {
      id: "clue-konjungtiva-pucat",
      title: "Konjungtiva Pucat",
      category: "gejala",
      description:
        "Bagian dalam kelopak mata bawah Rani tampak pucat, bukan merah muda. Ini tanda umum berkurangnya sel darah merah.",
      unlockedInScene: 2,
    },
  },
  {
    id: "hs-kuku",
    label: "Kuku Tangan",
    x: 25,
    y: 74,
    clue: {
      id: "clue-koilonychia",
      title: "Kuku Cekung (Koilonychia)",
      category: "gejala",
      description:
        "Beberapa kuku Rani terlihat cekung seperti sendok. Ini pertanda kekurangan zat besi dalam jangka waktu lama.",
      unlockedInScene: 2,
    },
  },
  {
    id: "hs-nadi",
    label: "Nadi Pergelangan Tangan",
    x: 75,
    y: 65,
    clue: {
      id: "clue-nadi-cepat",
      title: "Denyut Nadi 110×/menit",
      category: "gejala",
      description:
        "Nadi Rani berdenyut cepat (normal remaja 60–100×/mnt). Jantung memompa lebih kencang untuk mengompensasi oksigen yang kurang.",
      unlockedInScene: 2,
    },
  },
  {
    id: "hs-dada",
    label: "Dada / Jantung",
    x: 50,
    y: 45,
    clue: {
      id: "clue-jantung-berdebar",
      title: "Jantung Berdebar",
      category: "gejala",
      description:
        "Rani sering merasa jantungnya berdebar meski tidak berolahraga. Sinyal bahwa sistem peredaran darah bekerja lebih keras.",
      unlockedInScene: 2,
    },
  },
];

export const SCENE2_QUIZZES = [
  {
    id: "q-jantung-berdetak-cepat",
    question: "Mengapa jantung Rani berdenyut lebih cepat meski ia hanya berdiri?",
    choices: [
      {
        id: "a",
        text: "Karena Rani takut diperiksa detektif.",
        correct: false,
        feedback: "Kurang tepat. Coba hubungkan dengan fungsi darah dalam mengangkut oksigen.",
      },
      {
        id: "b",
        text: "Karena darahnya kekurangan sel pembawa oksigen, jantung harus memompa lebih sering untuk memenuhi kebutuhan tubuh.",
        correct: true,
        feedback: "Tepat! Ini disebut mekanisme kompensasi jantung — bekerja lebih cepat saat oksigen yang diedarkan kurang.",
      },
      {
        id: "c",
        text: "Karena jantungnya rusak permanen.",
        correct: false,
        feedback:
          "Belum tentu. Jantung Rani sehat, tetapi bekerja ekstra karena darahnya kurang membawa oksigen.",
      },
    ],
  },
  {
    id: "q-konjungtiva-pucat",
    question:
      "Konjungtiva (bagian dalam kelopak mata) Rani tampak pucat. Apa penyebab paling mungkin?",
    choices: [
      {
        id: "a",
        text: "Rani baru bangun tidur, jadi wajar terlihat pucat.",
        correct: false,
        feedback:
          "Kurang tepat. Kepucatan konjungtiva bertahan lebih lama daripada efek bangun tidur biasa.",
      },
      {
        id: "b",
        text: "Kadar hemoglobin dalam darah Rani rendah, sehingga warna merah muda alaminya berkurang.",
        correct: true,
        feedback:
          "Tepat! Konjungtiva merah muda berasal dari darah kaya hemoglobin. Ketika hemoglobin rendah, warna khas itu meredup dan tampak pucat.",
      },
      {
        id: "c",
        text: "Rani mengenakan makeup yang menutupi warna asli mata.",
        correct: false,
        feedback:
          "Belum tepat. Yang diperiksa adalah bagian dalam kelopak mata (konjungtiva), bukan bagian luar yang bisa ditutupi kosmetik.",
      },
    ],
  },
  {
    id: "q-koilonychia",
    question:
      "Kuku Rani mulai berbentuk cekung seperti sendok (koilonychia). Apa maknanya secara medis?",
    choices: [
      {
        id: "a",
        text: "Rani sering menggigit kuku, sehingga bentuknya berubah.",
        correct: false,
        feedback:
          "Kurang tepat. Menggigit kuku umumnya membuat kuku pendek/tidak rata, bukan berbentuk cekung sendok.",
      },
      {
        id: "b",
        text: "Kuku hanya butuh diberi vitamin dari salon.",
        correct: false,
        feedback:
          "Belum tepat. Bentuk koilonychia adalah tanda tubuh — bukan sekadar masalah perawatan luar.",
      },
      {
        id: "c",
        text: "Ini pertanda kekurangan zat besi dalam jangka waktu lama — bahan baku hemoglobin.",
        correct: true,
        feedback:
          "Tepat! Koilonychia klasik terjadi karena defisiensi zat besi kronis. Zat besi diperlukan tubuh untuk memproduksi hemoglobin yang cukup.",
      },
    ],
  },
];

// Backward-compat: expose the first quiz as SCENE2_QUIZ (was used in tests).
export const SCENE2_QUIZ = SCENE2_QUIZZES[0];

// Scene 3 — Lab items to sort into Normal or Rendah
export const SCENE3_LAB_ITEMS = [
  {
    id: "lab-hb",
    label: "Hemoglobin (Hb)",
    value: "9,0 g/dL",
    referenceText: "Normal remaja putri: 12–15 g/dL",
    correct: "rendah",
    clue: {
      id: "clue-hb-rendah",
      title: "Hemoglobin 9 g/dL",
      category: "medis",
      description:
        "Kadar hemoglobin Rani jauh di bawah rentang normal remaja putri (12–15). Hemoglobin adalah protein pengikat oksigen di sel darah merah.",
      unlockedInScene: 3,
    },
  },
  {
    id: "lab-eritrosit",
    label: "Sel Darah Merah",
    value: "3,4 juta/µL",
    referenceText: "Normal: 4,0–5,2 juta/µL",
    correct: "rendah",
    clue: {
      id: "clue-eritrosit-rendah",
      title: "Eritrosit Rendah",
      category: "medis",
      description:
        "Jumlah sel darah merah Rani lebih sedikit dari normal, sehingga kapasitas mengangkut oksigen berkurang.",
      unlockedInScene: 3,
    },
  },
  {
    id: "lab-mcv",
    label: "MCV (Ukuran Sel)",
    value: "70 fL",
    referenceText: "Normal: 80–100 fL",
    correct: "rendah",
    clue: {
      id: "clue-mcv-rendah",
      title: "Sel Darah Kecil (MCV Rendah)",
      category: "medis",
      description:
        "Sel darah merah Rani lebih kecil dari seharusnya. Pola sel kecil-pucat (mikrositik-hipokromik) khas anemia defisiensi besi.",
      unlockedInScene: 3,
    },
  },
  {
    id: "lab-leukosit",
    label: "Sel Darah Putih",
    value: "7.500/µL",
    referenceText: "Normal: 4.500–11.000/µL",
    correct: "normal",
    clue: {
      id: "clue-leukosit-normal",
      title: "Sel Darah Putih Normal",
      category: "medis",
      description:
        "Sel darah putih Rani dalam rentang normal — artinya tidak ada tanda infeksi berat.",
      unlockedInScene: 3,
    },
  },
];

export const SCENE3_DIALOG_INTRO = [
  {
    speaker: "Dr. Salma",
    portrait: "/assets/karakter/dr-salma.png",
    text:
      "Halo, Detektif! Saya Dr. Salma dari Puskesmas. Hasil lab Rani sudah keluar. Yuk kita analisis bersama.",
  },
  {
    speaker: "Dr. Salma",
    portrait: "/assets/karakter/dr-salma.png",
    text:
      "Cara mainnya: tarik setiap hasil pemeriksaan ke kotak NORMAL atau RENDAH sesuai rentang rujukan. Nilai yang benar akan tersimpan ke Jurnal.",
    isFinal: true,
  },
];

// ============================================================
// SCENE 4 — RUANG ORGAN (Simulasi Peta Peredaran Darah)
// ============================================================

// Organs positioned on the full-body diagram (percent from top-left).
// Positions target diagram-peredaran-darah.png.
export const SCENE4_ORGANS = [
  {
    id: "jantung",
    label: "Jantung",
    x: 50, y: 40,
    info: "Jantung adalah pompa berotot yang mendorong darah ke seluruh tubuh. Terdiri dari 4 ruang: 2 serambi (atrium) & 2 bilik (ventrikel).",
  },
  {
    id: "paru",
    label: "Paru-paru",
    x: 68, y: 34,
    info: "Di paru-paru, darah melepas karbon dioksida dan mengikat oksigen. Ini adalah tempat pertukaran gas untuk peredaran darah kecil.",
  },
  {
    id: "arteri",
    label: "Arteri (Aorta)",
    x: 50, y: 26,
    info: "Arteri membawa darah kaya oksigen dari jantung ke seluruh tubuh. Dindingnya tebal dan elastis karena tekanan darahnya tinggi.",
  },
  {
    id: "vena",
    label: "Vena Cava",
    x: 42, y: 52,
    info: "Vena membawa darah miskin oksigen kembali ke jantung. Bertekanan rendah, memiliki katup agar darah tak berbalik arah.",
  },
];

// Two circulation paths — student must arrange the middle steps in correct order.
export const SCENE4_PATHS = {
  pulmonal: {
    id: "pulmonal",
    label: "Peredaran Darah Kecil (Pulmonal)",
    desc: "Rute darah dari jantung ke paru-paru dan kembali ke jantung untuk mengambil oksigen.",
    fixedStart: "Bilik Kanan Jantung",
    fixedEnd: "Serambi Kiri Jantung",
    correctOrder: ["Arteri Pulmonalis", "Paru-paru", "Vena Pulmonalis"],
    // shuffle-able tokens (subset that includes distractors — must equal correctOrder length)
    tokens: ["Vena Pulmonalis", "Paru-paru", "Arteri Pulmonalis"],
  },
  sistemik: {
    id: "sistemik",
    label: "Peredaran Darah Besar (Sistemik)",
    desc: "Rute darah dari jantung ke seluruh tubuh dan kembali membawa CO₂ ke jantung.",
    fixedStart: "Bilik Kiri Jantung",
    fixedEnd: "Serambi Kanan Jantung",
    correctOrder: ["Aorta", "Seluruh Tubuh", "Vena Cava"],
    tokens: ["Vena Cava", "Aorta", "Seluruh Tubuh"],
  },
};

export const SCENE4_ARGUMENT = {
  id: "q-scene4-argumen",
  question:
    "Berdasarkan simulasi, mengapa jantung Rani harus bekerja lebih keras walau ia tidak berolahraga?",
  choices: [
    {
      id: "a",
      text: "Karena pembuluh darahnya menyempit total.",
      correct: false,
      feedback: "Belum tepat. Pembuluh darah Rani tidak menyempit; masalahnya ada pada muatan oksigen di darahnya.",
    },
    {
      id: "b",
      text: "Karena kadar hemoglobinnya rendah, sehingga tiap tetes darah membawa lebih sedikit oksigen — jantung harus memompa lebih sering supaya kebutuhan oksigen tubuh tetap terpenuhi.",
      correct: true,
      feedback:
        "Tepat! Ini disebut mekanisme kompensasi kardiovaskular. Jantung menaikkan frekuensi pompa untuk mengangkut oksigen yang sama dengan darah yang muatannya berkurang.",
    },
    {
      id: "c",
      text: "Karena paru-parunya sudah tidak bisa mengambil oksigen.",
      correct: false,
      feedback:
        "Kurang tepat. Paru-paru Rani sehat; ia bisa menghirup oksigen normal, tetapi darahnya kurang pembawa oksigen (hemoglobin).",
    },
  ],
};

// Clues automatically unlocked when the student completes the simulation:
export const SCENE4_CLUES = [
  {
    id: "clue-pulmonal-benar",
    title: "Alur Peredaran Kecil Terpetakan",
    category: "medis",
    description:
      "Bilik kanan → arteri pulmonalis → paru-paru → vena pulmonalis → serambi kiri. Di paru-paru, oksigen diambil untuk diedarkan.",
    unlockedInScene: 4,
  },
  {
    id: "clue-sistemik-benar",
    title: "Alur Peredaran Besar Terpetakan",
    category: "medis",
    description:
      "Bilik kiri → aorta → seluruh tubuh → vena cava → serambi kanan. Sel tubuh menyerap oksigen dan melepas karbondioksida.",
    unlockedInScene: 4,
  },
  {
    id: "clue-kompensasi-jantung",
    title: "Kompensasi Jantung",
    category: "medis",
    description:
      "Karena darah Rani kurang oksigen (Hb rendah), jantung memompa lebih cepat untuk memenuhi kebutuhan oksigen tubuh — inilah sebab denyut nadi cepat & jantung berdebar.",
    unlockedInScene: 4,
  },
];

// ============================================================
// SCENE 5 — INTEROGASI SAKSI (Gaya Hidup & Gender)
// ============================================================

export const SCENE5_LOCATIONS = {
  rumah: {
    id: "rumah",
    label: "Rumah Rani",
    bg: "/assets/background/bg-rumah-rani.png",
  },
  kantin: {
    id: "kantin",
    label: "Kantin Sekolah",
    bg: "/assets/background/bg-kantin.png",
  },
};

export const SCENE5_WITNESSES = [
  {
    id: "ibu-rani",
    name: "Ibu Rani",
    portrait: "/assets/karakter/ibu-rani.png",
    location: "rumah",
    role: "Ibu kandung Rani, ibu rumah tangga.",
    intro:
      "Halo, Detektif. Silakan duduk. Ibu memang khawatir dengan kondisi Rani belakangan ini…",
    questions: [
      {
        id: "ibu-q1",
        text: "Apa menu makan sehari-hari keluarga Ibu?",
        answer:
          "Biasanya nasi, sayur asem, tempe, kadang telur. Jarang beli daging karena mahal. Kalau ada lauk daging, biasanya Bapak dan adik laki-lakinya dulu yang ambil — Rani menyusul kalau masih ada.",
        clue: {
          id: "clue-pola-makan-timpang",
          title: "Pola Makan Tak Setara",
          category: "gayaHidup",
          description:
            "Sumber protein hewani (daging, telur) di keluarga Rani lebih dulu diberikan pada anggota laki-laki. Rani sering hanya kebagian sedikit — asupan zat besi berkurang.",
          unlockedInScene: 5,
        },
      },
      {
        id: "ibu-q2",
        text: "Bagaimana kondisi menstruasi Rani, Bu?",
        answer:
          "Menstruasi Rani lumayan banyak, kadang sampai 7 hari. Ibu belum pernah mengajaknya cek darah, karena Ibu kira itu wajar buat perempuan.",
        clue: {
          id: "clue-menstruasi-banyak",
          title: "Kehilangan Darah Menstruasi",
          category: "gayaHidup",
          description:
            "Menstruasi Rani cenderung banyak (7 hari). Setiap menstruasi tubuh kehilangan zat besi — bila tak diimbangi asupan, berisiko anemia.",
          unlockedInScene: 5,
        },
      },
      {
        id: "ibu-q3",
        text: "Apakah Rani rutin sarapan sebelum sekolah?",
        answer:
          "Kadang cuma teh manis dan sepotong roti. Ibu sibuk pagi hari, jadi Rani sering langsung berangkat saja.",
        clue: {
          id: "clue-sarapan-minim",
          title: "Sarapan Minim Gizi",
          category: "gayaHidup",
          description:
            "Sarapan Rani hanya karbohidrat sederhana (roti, teh manis) tanpa protein/zat besi. Ini menurunkan cadangan energi & besi harian.",
          unlockedInScene: 5,
        },
      },
    ],
  },
  {
    id: "rani",
    name: "Rani",
    portrait: "/assets/karakter/rani-pucat.png",
    location: "rumah",
    role: "Objek investigasi (14 tahun, kelas VIII).",
    intro:
      "Halo Kak Detektif… iya, aku memang sering merasa cepat capek dan pusing kalau berdiri lama.",
    questions: [
      {
        id: "rani-q1",
        text: "Apa jajanan favoritmu di sekolah?",
        answer:
          "Aku suka mie instan pedas atau gorengan, Kak. Sekali-kali beli teh manis dingin. Kalau nasi kotak dari kantin agak mahal, jadi jarang aku beli.",
        clue: {
          id: "clue-jajan-rendah-fe",
          title: "Jajanan Rendah Zat Besi",
          category: "gayaHidup",
          description:
            "Pilihan jajan Rani dominan karbo & lemak (mie, gorengan) — minim protein hewani & sayur hijau yang kaya zat besi.",
          unlockedInScene: 5,
        },
      },
      {
        id: "rani-q2",
        text: "Apakah kamu pernah minum tablet tambah darah dari sekolah?",
        answer:
          "Pernah dibagikan… tapi rasanya kurang enak dan bikin mual. Jadi kadang aku simpan saja atau tidak diminum. Teman-teman lain juga banyak yang begitu.",
        clue: {
          id: "clue-ttd-tidak-diminum",
          title: "TTD Tidak Dikonsumsi",
          category: "gayaHidup",
          description:
            "Program Tablet Tambah Darah (TTD) di sekolah sudah dibagikan, tapi banyak siswi termasuk Rani tidak meminumnya karena efek samping ringan — kesempatan mencegah anemia terlewat.",
          unlockedInScene: 5,
        },
      },
      {
        id: "rani-q3",
        text: "Bagaimana perasaanmu tentang tubuhmu belakangan ini?",
        answer:
          "Aku sering merasa lemas dan pusing, apalagi pas menstruasi. Tapi… aku pikir semua perempuan memang begitu, jadi aku tidak cerita ke siapa-siapa.",
        clue: {
          id: "clue-normalisasi-lemas",
          title: "Normalisasi Rasa Lemas",
          category: "gayaHidup",
          description:
            "Rani menganggap lemas & pusing saat menstruasi adalah hal wajar bagi perempuan, sehingga tidak segera mencari bantuan — literasi kesehatan remaja putri masih minim.",
          unlockedInScene: 5,
        },
      },
    ],
  },
  {
    id: "teman",
    name: "Sinta",
    portrait: "/assets/karakter/teman-rani.png",
    location: "kantin",
    role: "Teman sebangku Rani.",
    intro:
      "Halo, Detektif! Aku sebangku dengan Rani dari kelas VII. Aku ingin bantu apa saja biar dia sembuh.",
    questions: [
      {
        id: "teman-q1",
        text: "Kamu sering lihat Rani makan apa di kantin?",
        answer:
          "Sama sepertiku, sih. Kami sering patungan beli gorengan atau cilok. Uang jajan kami memang pas-pasan, dan menu bergizi seperti nasi + telur agak mahal.",
        clue: {
          id: "clue-akses-gizi-terbatas",
          title: "Akses Gizi Terbatas",
          category: "gayaHidup",
          description:
            "Faktor ekonomi & harga di kantin membatasi remaja putri mengakses makanan bergizi seimbang. Isu SSI: kebijakan kantin sehat & subsidi menu bergizi perlu diperkuat.",
          unlockedInScene: 5,
        },
      },
      {
        id: "teman-q2",
        text: "Apakah Rani pernah pingsan di kelas sebelum ini?",
        answer:
          "Beberapa kali dia hampir pingsan pas pelajaran olahraga. Katanya kepala berputar. Tapi guru menyuruhnya istirahat sebentar, dan kami pikir dia hanya lelah.",
        clue: {
          id: "clue-pingsan-berulang",
          title: "Kejadian Pingsan Berulang",
          category: "gayaHidup",
          description:
            "Rani sudah beberapa kali hampir pingsan di sekolah, tapi tidak dirujuk untuk pemeriksaan lanjutan. Sistem UKS perlu deteksi dini kasus berulang.",
          unlockedInScene: 5,
        },
      },
      {
        id: "teman-q3",
        text: "Kamu tahu tentang tablet tambah darah?",
        answer:
          "Tahu, Kak. Tapi banyak dari kami malas minum karena rasanya. Guru IPA sebenarnya sudah menjelaskan manfaatnya, tapi orang tua di rumah kadang bilang, 'Ah, itu obat, jangan sering-sering.'",
        clue: {
          id: "clue-mitos-ttd",
          title: "Mitos Seputar TTD",
          category: "gayaHidup",
          description:
            "Ada persepsi keliru di keluarga bahwa TTD adalah 'obat keras'. Edukasi masyarakat tentang gizi mikro (zat besi) belum merata — hambatan sosial-budaya nyata.",
          unlockedInScene: 5,
        },
      },
    ],
  },
];

export const SCENE5_REFLECTION = {
  id: "q-scene5-refleksi",
  question:
    "Mengapa remaja putri secara umum lebih berisiko mengalami anemia dibanding remaja putra?",
  choices: [
    {
      id: "a",
      text: "Karena tubuh perempuan lebih lemah secara alami.",
      correct: false,
      feedback:
        "Bukan itu penyebab utamanya. Ini stereotip; secara biologis, kebutuhan zat besi meningkat karena faktor spesifik.",
    },
    {
      id: "b",
      text: "Karena remaja putri mengalami menstruasi (kehilangan darah rutin) sekaligus kadang kalah prioritas dalam pembagian makanan bergizi di keluarga — dua faktor ini menaikkan risiko kekurangan zat besi.",
      correct: true,
      feedback:
        "Tepat! Ini adalah dilema Socio-Scientific Issue: gabungan faktor biologis (menstruasi) dengan faktor sosial-budaya (pola pembagian makanan berbasis gender) membuat anemia lebih rentan pada remaja putri.",
    },
    {
      id: "c",
      text: "Karena remaja putri suka diet ketat.",
      correct: false,
      feedback:
        "Diet memang bisa berkontribusi, tapi bukan penyebab utama secara populasi. Ada faktor menstruasi dan akses gizi yang lebih menentukan.",
    },
  ],
};


export const CATEGORY_LABEL = {
  gejala: "Gejala Klinis",
  medis: "Data Medis",
  gayaHidup: "Gaya Hidup / Sosial",
};

export const CATEGORY_COLOR = {
  gejala: "maroon",
  medis: "teal",
  gayaHidup: "mustard",
};

// ============================================================
// SCENE 6 — RUANG KESIMPULAN (Cork Board Reasoning)
// ============================================================

// Column mapping — clues placed in the *correct* column earn points.
// Column determined by `unlockedInScene` on each clue.
export const SCENE6_COLUMNS = [
  {
    id: "gejala",
    label: "1. Gejala Klinis",
    subtitle: "Apa yang tampak pada tubuh Rani?",
    color: "maroon",
    matchScene: 2,
  },
  {
    id: "data-lab",
    label: "2. Data Laboratorium",
    subtitle: "Apa kata hasil pemeriksaan darah?",
    color: "teal",
    matchScene: 3,
  },
  {
    id: "mekanisme",
    label: "3. Mekanisme Organ",
    subtitle: "Bagaimana peredaran darah bereaksi?",
    color: "primary",
    matchScene: 4,
  },
  {
    id: "penyebab",
    label: "4. Penyebab Gaya Hidup",
    subtitle: "Faktor sosial & pola apa yang memicu?",
    color: "mustard",
    matchScene: 5,
  },
];

export const SCENE6_RECOMMENDATIONS = [
  {
    id: "rec-ttd",
    text: "Rani mengonsumsi Tablet Tambah Darah (TTD) rutin sesuai anjuran, meski awalnya kurang nyaman.",
    ideal: true,
  },
  {
    id: "rec-pola-makan",
    text: "Keluarga memperbaiki pola makan agar setiap anggota mendapat porsi protein hewani & sayur hijau setara — tidak dibedakan berbasis gender.",
    ideal: true,
  },
  {
    id: "rec-edukasi-menstruasi",
    text: "Sekolah & orang tua mengedukasi Rani tentang gizi selama menstruasi dan pentingnya deteksi dini anemia.",
    ideal: true,
  },
  {
    id: "rec-kantin-sehat",
    text: "Sekolah menyediakan menu kantin bergizi terjangkau (nasi + telur/ikan + sayur) sebagai alternatif jajanan.",
    ideal: true,
  },
  {
    id: "rec-diet-ketat",
    text: "Rani menjalani diet rendah kalori agar tampak lebih segar.",
    ideal: false,
  },
  {
    id: "rec-obat-keras",
    text: "Rani langsung diberi transfusi darah rutin agar cepat sembuh.",
    ideal: false,
  },
];

// ============================================================
// SCENE 7 — EPILOG & REFLEKSI
// ============================================================

export const SCENE7_QUIZ = [
  {
    id: "refl-q1",
    question: "Apa fungsi utama hemoglobin dalam sel darah merah?",
    choices: [
      { id: "a", text: "Menyerang bakteri asing.", correct: false },
      { id: "b", text: "Mengikat dan mengangkut oksigen ke seluruh tubuh.", correct: true },
      { id: "c", text: "Membekukan darah saat terluka.", correct: false },
    ],
  },
  {
    id: "refl-q2",
    question:
      "Peredaran darah kecil (pulmonal) menempuh jalur:",
    choices: [
      { id: "a", text: "Jantung → seluruh tubuh → jantung.", correct: false },
      { id: "b", text: "Jantung → paru-paru → jantung.", correct: true },
      { id: "c", text: "Paru-paru → hati → paru-paru.", correct: false },
    ],
  },
  {
    id: "refl-q3",
    question:
      "Kadar Hb Rani = 9 g/dL (normal remaja putri 12–15 g/dL). Interpretasi paling tepat:",
    choices: [
      { id: "a", text: "Normal, tidak ada masalah.", correct: false },
      { id: "b", text: "Anemia — perlu tindak lanjut medis & perbaikan gizi.", correct: true },
      { id: "c", text: "Kelebihan zat besi.", correct: false },
    ],
  },
  {
    id: "refl-q4",
    question:
      "Faktor sosial-budaya yang paling relevan menyebabkan anemia pada remaja putri di Indonesia:",
    choices: [
      { id: "a", text: "Kurangnya jam olahraga di sekolah.", correct: false },
      { id: "b", text: "Pola pembagian makanan tidak setara dalam keluarga + literasi menstruasi rendah.", correct: true },
      { id: "c", text: "Terlalu banyak minum air putih.", correct: false },
    ],
  },
  {
    id: "refl-q5",
    question:
      "Kebijakan sekolah yang paling tepat untuk mencegah anemia pada siswi:",
    choices: [
      { id: "a", text: "Menghapus jam pelajaran olahraga.", correct: false },
      {
        id: "b",
        text: "Program TTD mingguan + edukasi gizi seimbang + kantin sehat bergizi terjangkau.",
        correct: true,
      },
      { id: "c", text: "Melarang siswi keluar kelas saat menstruasi.", correct: false },
    ],
  },
];

export const ENDING_THRESHOLD = 55; // total score >= 55 => Detektif Utama

