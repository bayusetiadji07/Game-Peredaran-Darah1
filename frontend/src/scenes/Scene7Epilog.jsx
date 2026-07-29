import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { jsPDF } from "jspdf";
import {
  Printer,
  Download,
  RotateCcw,
  Trophy,
  Award,
  Sparkles,
  Check,
  X,
  Eye,
  Clock,
} from "lucide-react";
import SceneShell from "../components/SceneShell";
import PdfPreviewModal from "../components/PdfPreviewModal";
import { SCENE7_QUIZ, ENDING_THRESHOLD, CATEGORY_LABEL } from "../data/gameContent";
import { useGame } from "../context/GameContext";
import { playClick } from "../components/AudioManager";
import useT from "../hooks/useT";

export default function Scene7Epilog() {
  const { state, addScore, answerQuiz, reset } = useGame();
  const t = useT();

  const [answers, setAnswers] = useState(state.quizAnswers || {}); // local mirror to reflect updates instantly
  const [showResults, setShowResults] = useState(false);
  const [pdfPreview, setPdfPreview] = useState(null); // { url, blob, filename }

  const totalScore = state.score.total;
  const isElite = totalScore >= ENDING_THRESHOLD;

  const answerCount = SCENE7_QUIZ.filter((q) => answers[q.id]).length;
  const allAnswered = answerCount === SCENE7_QUIZ.length;
  const correctCount = SCENE7_QUIZ.filter((q) => {
    const chosen = q.choices.find((c) => c.id === answers[q.id]);
    return chosen && chosen.correct;
  }).length;

  const handleAnswer = (qid, choice) => {
    if (answers[qid]) return; // one-shot per question
    playClick();
    setAnswers((prev) => ({ ...prev, [qid]: choice.id }));
    answerQuiz(qid, choice.id);
    if (choice.correct) addScore("reflectionQuiz", 3);
  };

  const finalTotal = useMemo(() => state.score.total, [state.score.total]);
  const grade = isElite ? t("scene.7.utama") : t("scene.7.pemula");

  const formatTime = (sec) => {
    const s = Math.max(0, Math.floor(sec || 0));
    const m = Math.floor(s / 60);
    const rs = s % 60;
    return `${String(m).padStart(2, "0")}:${String(rs).padStart(2, "0")}`;
  };

  // Build the PDF document (used by both preview and download)
  const buildPdf = () => {
    const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
    const marginX = 15;
    let y = 18;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.setTextColor(31, 56, 100);
    doc.text("LAPORAN INVESTIGASI", marginX, y);
    y += 6;
    doc.setFontSize(12);
    doc.setTextColor(139, 30, 30);
    doc.text("Detektif Peredaran Darah: Misteri Siswi Pucat dan Lemas", marginX, y);
    y += 8;
    doc.setDrawColor(31, 56, 100);
    doc.setLineWidth(0.4);
    doc.line(marginX, y, 210 - marginX, y);
    y += 8;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.setTextColor(40, 40, 40);
    const info = [
      ["Nama Detektif", state.player.name || "-"],
      ["Kelas / Jenjang", "SMP · Kelas VIII (Fase D)"],
      [
        "Tanggal Cetak",
        new Date().toLocaleDateString("id-ID", { day: "2-digit", month: "long", year: "numeric" }),
      ],
      ["Waktu Bermain", formatTime(state.playTimeSeconds)],
      ["Total Skor", `${finalTotal} poin`],
      ["Peringkat", grade],
    ];
    info.forEach(([k, v]) => {
      doc.setFont("helvetica", "bold");
      doc.text(`${k}:`, marginX, y);
      doc.setFont("helvetica", "normal");
      doc.text(String(v), marginX + 45, y);
      y += 6;
    });

    y += 3;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.setTextColor(31, 56, 100);
    doc.text("RINGKASAN BUKTI (JURNAL)", marginX, y);
    y += 5;
    doc.setDrawColor(180, 180, 180);
    doc.line(marginX, y, 210 - marginX, y);
    y += 5;

    doc.setFontSize(10);
    doc.setTextColor(40, 40, 40);
    const grouped = state.journal.clues.reduce((acc, c) => {
      (acc[c.category] = acc[c.category] || []).push(c);
      return acc;
    }, {});
    Object.keys(CATEGORY_LABEL).forEach((cat) => {
      const list = grouped[cat] || [];
      if (list.length === 0) return;
      if (y > 260) {
        doc.addPage();
        y = 18;
      }
      doc.setFont("helvetica", "bold");
      doc.setTextColor(139, 30, 30);
      doc.text(`${CATEGORY_LABEL[cat]} (${list.length})`, marginX, y);
      y += 5;
      doc.setFont("helvetica", "normal");
      doc.setTextColor(40, 40, 40);
      list.forEach((c) => {
        if (y > 275) {
          doc.addPage();
          y = 18;
        }
        const lines = doc.splitTextToSize(`• ${c.title}: ${c.description}`, 210 - marginX * 2);
        doc.text(lines, marginX, y);
        y += lines.length * 4.5 + 1;
      });
      y += 2;
    });

    y += 3;
    if (y > 260) {
      doc.addPage();
      y = 18;
    }
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.setTextColor(31, 56, 100);
    doc.text("KESIMPULAN & REKOMENDASI", marginX, y);
    y += 5;
    doc.setDrawColor(180, 180, 180);
    doc.line(marginX, y, 210 - marginX, y);
    y += 5;
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(40, 40, 40);
    const kesimpulan = [
      "Berdasarkan bukti klinis, laboratorium, dan wawancara, Rani mengalami anemia defisiensi",
      "besi (Hb 9 g/dL; MCV 70 fL). Kondisi ini muncul akibat kombinasi faktor biologis (menstruasi",
      "rutin) dan sosial-budaya (pola pembagian makanan tidak setara, TTD kurang dikonsumsi,",
      "literasi kesehatan menstruasi masih rendah).",
      "",
      "Rekomendasi utama:",
      "1. Rani mengonsumsi Tablet Tambah Darah (TTD) rutin sesuai anjuran.",
      "2. Keluarga memperbaiki pola makan agar seluruh anggota memperoleh sumber zat besi setara.",
      "3. Sekolah menguatkan program edukasi gizi & menstruasi untuk siswi.",
      "4. Kantin sekolah menyediakan menu bergizi terjangkau sebagai alternatif jajanan.",
    ];
    kesimpulan.forEach((l) => {
      if (y > 275) {
        doc.addPage();
        y = 18;
      }
      doc.text(l, marginX, y);
      y += 5;
    });

    y += 8;
    if (y > 275) {
      doc.addPage();
      y = 18;
    }
    doc.setFont("helvetica", "italic");
    doc.setFontSize(9);
    doc.setTextColor(100, 100, 100);
    doc.text(
      'Laporan ini dihasilkan otomatis oleh game edukasi "Detektif Peredaran Darah" — SMP N 3 Besuki.',
      marginX,
      y
    );

    const filename = `laporan-detektif-${(state.player.name || "siswa").replace(/\s+/g, "_")}.pdf`;
    return { doc, filename };
  };

  const openPdfPreview = () => {
    playClick();
    const { doc, filename } = buildPdf();
    // Generate blob URL for preview
    const blob = doc.output("blob");
    const url = URL.createObjectURL(blob);
    setPdfPreview({ url, blob, filename });
  };

  const closePdfPreview = () => {
    if (pdfPreview && pdfPreview.url) URL.revokeObjectURL(pdfPreview.url);
    setPdfPreview(null);
  };

  const downloadPdf = () => {
    playClick();
    if (pdfPreview) {
      // download from preview
      const a = document.createElement("a");
      a.href = pdfPreview.url;
      a.download = pdfPreview.filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } else {
      const { doc, filename } = buildPdf();
      doc.save(filename);
    }
  };

  return (
    <SceneShell sceneTag="Retensi & Refleksi Akhir" ssiTag="Kebijakan pencegahan anemia">
      {/* Gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            isElite
              ? "radial-gradient(circle at 30% 20%, #F4EEDC 0%, #EBE1C6 45%, #B48761 100%)"
              : "radial-gradient(circle at 70% 30%, #F4EEDC 0%, #EBE1C6 55%, #7d6a52 100%)",
        }}
      />
      <div className="absolute inset-0 bg-grain opacity-40 mix-blend-multiply pointer-events-none" />

      {/* Scene label */}
      <div className="absolute left-6 top-24 md:top-28 z-20">
        <div className="bg-primary text-cream px-4 py-2 rounded-r-full shadow-card font-mono uppercase tracking-widest text-xs">
          Scene 7 · {t("scene.7.name")}
        </div>
      </div>

      <div className="relative w-full min-h-screen pt-32 md:pt-36 pb-28 px-4 md:px-8 z-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[minmax(0,42%)_1fr] gap-6">
          {/* Epilog Card */}
          <EpilogCard
            isElite={isElite}
            grade={grade}
            totalScore={finalTotal}
            player={state.player}
            playTime={formatTime(state.playTimeSeconds)}
            t={t}
          />

          {/* Refleksi Quiz */}
          <ReflectionSection
            quiz={SCENE7_QUIZ}
            answers={answers}
            onAnswer={handleAnswer}
            correctCount={correctCount}
            answerCount={answerCount}
            allAnswered={allAnswered}
            showResults={showResults}
            setShowResults={setShowResults}
          />
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="fixed inset-x-0 bottom-4 z-40 flex justify-center px-6">
        <div className="bg-paper border-2 border-primary/15 rounded-full shadow-floating px-5 py-2.5 flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 pr-3 border-r border-primary/15 font-mono text-xs uppercase tracking-widest text-primary/85">
            <Clock size={13} /> {formatTime(state.playTimeSeconds)}
          </div>
          <button
            onClick={() => {
              playClick();
              window.print();
            }}
            className="btn-secondary !py-2"
            data-testid="scene7-print-btn"
          >
            <Printer size={14} /> Cetak
          </button>
          <button
            onClick={openPdfPreview}
            className="btn-primary !py-2"
            data-testid="scene7-preview-btn"
          >
            <Eye size={14} /> Preview PDF
          </button>
          <button
            onClick={downloadPdf}
            className="btn-secondary !py-2"
            data-testid="scene7-pdf-btn"
          >
            <Download size={14} /> Unduh PDF
          </button>
          <button
            onClick={() => {
              if (window.confirm("Mulai ulang seluruh investigasi? Progres akan hilang.")) {
                playClick();
                reset();
              }
            }}
            className="btn-ghost"
            data-testid="scene7-reset-btn"
          >
            <RotateCcw size={14} /> Main Lagi
          </button>
        </div>
      </div>

      <AnimatePresence>
        {pdfPreview && (
          <PdfPreviewModal
            data={pdfPreview}
            onDownload={downloadPdf}
            onClose={closePdfPreview}
          />
        )}
      </AnimatePresence>
    </SceneShell>
  );
}

function EpilogCard({ isElite, grade, totalScore, player, playTime, t }) {
  const Icon = isElite ? Trophy : Award;
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative rounded-2xl border-2 shadow-floating p-6 md:p-8 ${
        isElite ? "bg-cream border-teal" : "bg-cream border-mustard"
      }`}
      data-testid="epilog-card"
    >
      {/* Rani sehat portrait */}
      <div className="relative flex items-center justify-center mb-4">
        <img
          src="/assets/karakter/rani-sehat.png"
          alt="Rani terlihat lebih sehat"
          className="h-52 w-auto object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.25)]"
          onError={(e) => (e.currentTarget.style.display = "none")}
        />
        <span className="absolute -top-2 -right-2 bg-teal text-cream px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest shadow-card flex items-center gap-1">
          <Sparkles size={12} /> Beberapa Minggu Kemudian
        </span>
      </div>

      <div className="text-center">
        <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full font-mono uppercase text-[11px] tracking-widest ${
          isElite ? "bg-teal text-cream" : "bg-mustard text-ink"
        }`}>
          <Icon size={14} /> {grade}
        </div>
        <h2 className="font-display font-black text-primary text-3xl md:text-4xl leading-tight mt-3">
          {isElite ? t("scene.7.title.utama") : t("scene.7.title.pemula")}
        </h2>
        <p className="mt-3 font-body text-primary/85 leading-relaxed">
          {isElite ? (
            <>
              Berkat kerja detektifmu, <b>{player.name || "Detektif"}</b>, Rani rutin minum TTD dan
              memperbaiki pola makan. Beberapa minggu kemudian ia tampak lebih segar, tidak lagi pingsan
              saat upacara. Sekolah pun mulai mengevaluasi program edukasi gizi & menstruasi mereka.
            </>
          ) : (
            <>
              Kamu telah mengumpulkan bukti, <b>{player.name || "Detektif"}</b>. Namun beberapa
              kesimpulan masih perlu diperkuat. Rani mulai lebih sadar akan kondisinya, tapi perubahan
              menyeluruh menuntut edukasi lebih lanjut — buka lagi Jurnalmu, pelajari kembali, dan coba lagi.
            </>
          )}
        </p>

        <div className="mt-5 grid grid-cols-4 gap-2">
          <StatBox label="Total Skor" value={totalScore} />
          <StatBox label="Ambang Elite" value={ENDING_THRESHOLD} />
          <StatBox label="Ending" value={isElite ? "UTAMA" : "PEMULA"} />
          <StatBox label="Waktu Bermain" value={playTime} testid="epilog-playtime" />
        </div>
      </div>
    </motion.div>
  );
}

function StatBox({ label, value, testid }) {
  return (
    <div
      className="rounded-lg bg-paper border border-primary/15 py-2 px-2 text-center"
      data-testid={testid}
    >
      <div className="font-mono uppercase text-[9px] tracking-widest text-primary/80">{label}</div>
      <div className="font-display font-bold text-primary text-lg leading-none mt-0.5">{value}</div>
    </div>
  );
}

function PdfPreviewModalLegacy() { return null; }
// PdfPreviewModal is now imported from /components/PdfPreviewModal.jsx

function ReflectionSection({ quiz, answers, onAnswer, correctCount, answerCount, allAnswered, showResults, setShowResults }) {
  return (
    <div className="rounded-2xl bg-cream/95 shadow-floating border border-primary/15 p-5">
      <div className="flex items-center justify-between mb-3">
        <div>
          <div className="tag-ssi">Refleksi Akhir</div>
          <h3 className="font-display font-bold text-primary text-2xl mt-1">Kuis 5 Soal</h3>
          <div className="font-body text-primary/85 text-sm">
            Uji pemahaman konsep IPA dan pemikiran SSI-mu.
          </div>
        </div>
        <div className="text-right">
          <div className="font-mono uppercase text-[10px] tracking-widest text-primary/80">Terjawab</div>
          <div className="font-display font-bold text-primary text-2xl leading-none">
            {answerCount}<span className="text-primary/80 text-base">/{quiz.length}</span>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {quiz.map((q, idx) => {
          const chosenId = answers[q.id];
          const chosen = q.choices.find((c) => c.id === chosenId);
          const isAnswered = !!chosen;
          const showAll = isAnswered || showResults;
          return (
            <div key={q.id} className="rounded-xl border-2 border-primary/10 bg-paper p-4" data-testid={`refl-q-${q.id}`}>
              <div className="font-display font-semibold text-primary">
                <span className="font-mono text-maroon mr-2">Q{idx + 1}.</span> {q.question}
              </div>
              <div className="mt-3 space-y-1.5">
                {q.choices.map((c) => {
                  const selected = chosenId === c.id;
                  return (
                    <button
                      key={c.id}
                      data-testid={`refl-choice-${q.id}-${c.id}`}
                      disabled={isAnswered}
                      onClick={() => onAnswer(q.id, c)}
                      className={`w-full text-left rounded-lg px-3 py-2 border-2 font-body text-sm transition ${
                        showAll
                          ? c.correct
                            ? "border-teal bg-teal/15 text-teal-dark"
                            : selected
                            ? "border-maroon bg-maroon/10 text-maroon"
                            : "border-primary/15 text-primary/80"
                          : "border-primary/20 bg-cream text-primary hover:border-maroon"
                      }`}
                    >
                      <span className="font-mono text-xs mr-2 uppercase">{c.id})</span>
                      {c.text}
                      {showAll && c.correct && (
                        <Check size={14} className="inline ml-2 text-teal-dark" />
                      )}
                      {showAll && !c.correct && selected && (
                        <X size={14} className="inline ml-2 text-maroon" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 flex items-center gap-3">
        {allAnswered ? (
          <div className="text-teal-dark font-mono text-sm">
            <b>{correctCount}/{quiz.length}</b> jawaban benar · +{correctCount * 3} poin refleksi
          </div>
        ) : (
          <div className="text-primary/80 font-mono text-sm">Selesaikan semua soal untuk memvalidasi ending-mu.</div>
        )}
      </div>
    </div>
  );
}
