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

export const SCENE2_QUIZ = {
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
};

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
