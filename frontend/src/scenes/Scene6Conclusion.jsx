import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, X, AlertCircle, PencilLine, Sparkles } from "lucide-react";
import SceneShell from "../components/SceneShell";
import { SCENE6_COLUMNS, SCENE6_RECOMMENDATIONS, CATEGORY_COLOR } from "../data/gameContent";
import { useGame } from "../context/GameContext";
import { playClick } from "../components/AudioManager";
import useT from "../hooks/useT";

/**
 * Scene 6 — Cork Board sebab-akibat
 * Player drags each unlocked clue from the tray into 1 of 4 columns.
 * Column determined by clue.unlockedInScene:
 *   Scene 2 -> gejala, 3 -> data-lab, 4 -> mekanisme, 5 -> penyebab
 * Correct placement = +5 poin, wrong = 0.
 */
export default function Scene6Conclusion() {
  const { state, addScore, goToScene } = useGame();
  const t = useT();
  const clues = state.journal.clues;

  // Local placements: { [clueId]: columnId }
  const [placements, setPlacements] = useState(() => ({}));
  const [dragOver, setDragOver] = useState(null);
  const [recommendations, setRecommendations] = useState(() => new Set()); // Set of rec ids
  const [submitted, setSubmitted] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  const placedCount = Object.keys(placements).length;
  const unplacedClues = clues.filter((c) => !placements[c.id]);

  const getCorrectColumnId = (clue) => {
    const col = SCENE6_COLUMNS.find((c) => c.matchScene === clue.unlockedInScene);
    return col ? col.id : null;
  };

  const clueColumnCorrectness = useMemo(() => {
    const m = {};
    for (const [clueId, colId] of Object.entries(placements)) {
      const clue = clues.find((c) => c.id === clueId);
      if (!clue) continue;
      m[clueId] = getCorrectColumnId(clue) === colId;
    }
    return m;
  }, [placements, clues]);

  const correctPlacements = Object.values(clueColumnCorrectness).filter(Boolean).length;

  const idealRecs = SCENE6_RECOMMENDATIONS.filter((r) => r.ideal).map((r) => r.id);
  const chosenIdealCount = [...recommendations].filter((r) => idealRecs.includes(r)).length;
  const chosenNonIdealCount = [...recommendations].filter((r) => !idealRecs.includes(r)).length;

  const handleDrop = (columnId, e) => {
    e.preventDefault();
    const clueId = e.dataTransfer.getData("text/plain");
    if (!clueId) return;
    setPlacements((prev) => ({ ...prev, [clueId]: columnId }));
    setDragOver(null);
    playClick();
  };

  const toggleRec = (id) => {
    playClick();
    setRecommendations((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const canSubmit =
    placedCount === clues.length && recommendations.size >= 3 && clues.length > 0;

  const submitReport = () => {
    if (!canSubmit) return;
    playClick();
    // Score: 5 per correct placement + 5 per ideal recommendation - 3 per bad recommendation
    let pts = correctPlacements * 5 + chosenIdealCount * 5 - chosenNonIdealCount * 3;
    if (pts < 0) pts = 0;
    addScore("reasoningFlow", pts);
    setSubmitted(true);
    setShowFeedback(true);
  };

  return (
    <SceneShell
      sceneTag="Sintesis Bukti Ilmiah"
      ssiTag="Argumentasi & pengambilan keputusan"
    >
      {/* Custom cork background full-screen */}
      <div className="absolute inset-0 cork-bg" />
      <div className="absolute inset-0 bg-grain opacity-40 mix-blend-multiply pointer-events-none" />

      {/* Scene label */}
      <div className="absolute left-6 top-24 md:top-28 z-20">
        <div className="bg-maroon text-cream px-4 py-2 rounded-r-full shadow-card font-mono uppercase tracking-widest text-xs">
          Scene 6 · {t("scene.6.name")}
        </div>
        <h1 className="mt-3 font-display font-bold text-cream text-3xl md:text-4xl leading-tight drop-shadow-[0_4px_10px_rgba(0,0,0,0.7)]">
          {t("scene.6.title")}
        </h1>
      </div>

      {/* Progress */}
      <div className="absolute right-6 top-24 md:top-28 z-20 bg-paper/95 backdrop-blur rounded-xl px-4 py-3 shadow-card border border-primary/10">
        <div className="font-mono uppercase text-[10px] tracking-widest text-primary/80">
          Kartu Ditempel
        </div>
        <div className="font-display font-bold text-2xl text-maroon leading-none">
          {placedCount}
          <span className="text-primary/80 text-lg">/{clues.length}</span>
        </div>
      </div>

      {/* Main layout */}
      <div className="relative w-full min-h-screen pt-32 md:pt-40 pb-28 px-4 md:px-6 flex flex-col gap-4 z-10">
        {/* Board area */}
        <div className="min-h-0 grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-3">
          {/* 4-column cork board */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 overflow-hidden">
            {SCENE6_COLUMNS.map((col) => {
              const placedInCol = clues.filter((c) => placements[c.id] === col.id);
              return (
                <div
                  key={col.id}
                  data-testid={`col-${col.id}`}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragOver(col.id);
                  }}
                  onDragLeave={() => setDragOver(null)}
                  onDrop={(e) => handleDrop(col.id, e)}
                  className={`relative rounded-xl bg-paper/95 border-t-8 shadow-paper overflow-hidden transition ${
                    col.color === "maroon"
                      ? "border-maroon"
                      : col.color === "teal"
                      ? "border-teal"
                      : col.color === "mustard"
                      ? "border-mustard"
                      : "border-primary"
                  } ${dragOver === col.id ? "ring-4 ring-cream/70" : ""}`}
                >
                  <div className="p-3 border-b border-primary/10">
                    <div className="font-display font-bold text-primary text-sm leading-tight">
                      {col.label}
                    </div>
                    <div className="text-primary/80 text-[11px] font-body mt-0.5">
                      {col.subtitle}
                    </div>
                  </div>
                  <div className="p-2 space-y-2 overflow-y-auto max-h-[calc(100%-52px)]">
                    {placedInCol.length === 0 && (
                      <div className="text-primary/80 italic text-xs font-body text-center py-4">
                        Seret kartu ke sini
                      </div>
                    )}
                    {placedInCol.map((c) => (
                      <PlacedClue
                        key={c.id}
                        clue={c}
                        submitted={submitted}
                        correct={clueColumnCorrectness[c.id]}
                        onRemove={() =>
                          !submitted && setPlacements((p) => {
                            const { [c.id]: _, ...rest } = p;
                            return rest;
                          })
                        }
                      />
                    ))}
                  </div>
                  {/* Red string decoration between cards (visual) */}
                  {placedInCol.length >= 2 && (
                    <div className="absolute right-2 top-14 bottom-2 w-[3px] dashed-string opacity-70 pointer-events-none" />
                  )}
                </div>
              );
            })}
          </div>

          {/* Tray: unplaced clues */}
          <div className="rounded-xl bg-paper/95 shadow-paper border border-primary/15 flex flex-col overflow-hidden">
            <div className="p-3 border-b border-primary/10 flex items-center gap-2">
              <Sparkles size={14} className="text-mustard" />
              <div className="font-mono uppercase text-[10px] tracking-widest text-primary/85">
                Kartu Dari Jurnal
              </div>
              <span className="ml-auto text-primary/80 font-mono text-xs">{unplacedClues.length}</span>
            </div>
            <div className="flex-1 overflow-y-auto p-2 space-y-2">
              {clues.length === 0 && (
                <div className="text-primary/80 text-sm font-body text-center py-6">
                  Belum ada petunjuk terkumpul. Kembali dan mainkan Scene 2–5.
                </div>
              )}
              {unplacedClues.map((c) => (
                <TrayClue key={c.id} clue={c} />
              ))}
              {unplacedClues.length === 0 && clues.length > 0 && (
                <div className="text-teal-dark text-sm font-body text-center py-6 flex flex-col items-center gap-1">
                  <Check size={20} /> Semua kartu sudah ditempel!
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Recommendation form */}
        <RecForm
          recommendations={recommendations}
          toggleRec={toggleRec}
          submitted={submitted}
        />
      </div>

      {/* Bottom action */}
      <div className="fixed inset-x-0 bottom-4 z-40 flex justify-center px-6">
        <div className="bg-paper border-2 border-primary/15 rounded-full shadow-floating px-5 py-2.5 flex flex-wrap items-center gap-4">
          {clues.length === 0 ? (
            <div className="flex items-center gap-2 text-primary/80 font-body text-sm">
              <AlertCircle size={16} className="text-maroon" />
              Belum ada petunjuk. Selesaikan Scene 2–5 dulu.
            </div>
          ) : !submitted ? (
            <>
              <div className="text-primary/85 font-body text-sm">
                {canSubmit
                  ? "Semua kartu ditempel & rekomendasi dipilih. Kirim laporan?"
                  : `Tempel semua ${clues.length} kartu & pilih min. 3 rekomendasi.`}
              </div>
              <button
                data-testid="scene6-submit-btn"
                disabled={!canSubmit}
                onClick={submitReport}
                className={`btn-primary !py-2 ${!canSubmit ? "opacity-40 cursor-not-allowed" : ""}`}
              >
                Kirim Laporan <PencilLine size={14} />
              </button>
            </>
          ) : (
            <button
              data-testid="scene6-continue-btn"
              onClick={() => {
                playClick();
                goToScene(7);
              }}
              className="btn-primary !py-2"
            >
              Lanjut ke Epilog <ArrowRight size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Submission feedback modal */}
      <AnimatePresence>
        {showFeedback && (
          <FeedbackModal
            totalClues={clues.length}
            correct={correctPlacements}
            ideal={chosenIdealCount}
            nonIdeal={chosenNonIdealCount}
            onClose={() => setShowFeedback(false)}
          />
        )}
      </AnimatePresence>
    </SceneShell>
  );
}

function TrayClue({ clue }) {
  const color = CATEGORY_COLOR[clue.category];
  const border =
    color === "maroon" ? "border-l-maroon" : color === "teal" ? "border-l-teal" : "border-l-mustard";
  return (
    <div
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData("text/plain", clue.id);
      }}
      className={`select-none rounded-md bg-cream border-2 border-primary/20 ${border} border-l-8 shadow-sm p-2 cursor-grab active:cursor-grabbing hover:border-maroon transition`}
      data-testid={`tray-clue-${clue.id}`}
    >
      <div className="font-display font-semibold text-primary text-sm leading-tight">
        {clue.title}
      </div>
      <div className="text-[10px] font-mono uppercase tracking-widest text-primary/85 mt-0.5">
        Scene {clue.unlockedInScene}
      </div>
    </div>
  );
}

function PlacedClue({ clue, submitted, correct, onRemove }) {
  const color = CATEGORY_COLOR[clue.category];
  const ring = submitted
    ? correct
      ? "border-teal bg-teal/10"
      : "border-maroon bg-maroon/10"
    : color === "maroon"
    ? "border-maroon/60"
    : color === "teal"
    ? "border-teal/60"
    : "border-mustard/60";
  return (
    <div className={`relative rounded-md bg-cream border-2 ${ring} p-2 shadow-pinned`}>
      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-3 bg-maroon/70 rotate-[-3deg] rounded-sm" />
      <div className="font-display font-semibold text-primary text-[13px] leading-tight pr-4">
        {clue.title}
      </div>
      {submitted && (
        <div className={`absolute top-1 right-1 grid place-items-center h-5 w-5 rounded-full ${correct ? "bg-teal" : "bg-maroon"} text-cream`}>
          {correct ? <Check size={12} /> : <X size={12} />}
        </div>
      )}
      {!submitted && (
        <button
          onClick={onRemove}
          className="absolute top-1 right-1 grid place-items-center h-5 w-5 rounded-full bg-primary/70 text-cream hover:bg-maroon"
          aria-label="Lepaskan kartu"
          data-testid={`remove-${clue.id}`}
        >
          <X size={10} />
        </button>
      )}
    </div>
  );
}

function RecForm({ recommendations, toggleRec, submitted }) {
  return (
    <div className="rounded-xl bg-paper/95 shadow-paper border border-primary/15 p-4">
      <div className="flex items-center gap-2 mb-2">
        <PencilLine size={14} className="text-mustard" />
        <div className="font-display font-bold text-primary">Laporan Rekomendasi</div>
        <span className="text-primary/80 font-mono text-xs uppercase tracking-widest ml-1">
          Pilih min. 3 · terpilih: {recommendations.size}
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {SCENE6_RECOMMENDATIONS.map((r) => {
          const chosen = recommendations.has(r.id);
          const revealed = submitted && chosen;
          return (
            <button
              key={r.id}
              data-testid={`rec-${r.id}`}
              disabled={submitted}
              onClick={() => toggleRec(r.id)}
              className={`text-left rounded-lg px-3 py-2 border-2 transition font-body text-sm ${
                revealed
                  ? r.ideal
                    ? "border-teal bg-teal/15 text-teal-dark"
                    : "border-maroon bg-maroon/10 text-maroon"
                  : chosen
                  ? "border-mustard bg-mustard/15 text-primary"
                  : "border-primary/15 bg-cream text-primary hover:border-mustard"
              }`}
            >
              <span className="flex items-start gap-2">
                <span
                  className={`mt-0.5 grid place-items-center h-4 w-4 rounded border ${
                    chosen ? "bg-mustard border-mustard text-cream" : "border-primary/40"
                  }`}
                >
                  {chosen && <Check size={10} />}
                </span>
                <span>{r.text}</span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function FeedbackModal({ totalClues, correct, ideal, nonIdeal, onClose }) {
  const acc = totalClues > 0 ? Math.round((correct / totalClues) * 100) : 0;
  return (
    <motion.div
      className="fixed inset-0 z-[65] bg-black/70 grid place-items-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      data-testid="feedback-modal"
    >
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="paper-bg w-full max-w-lg rounded-2xl shadow-floating p-8 border-t-8 border-teal"
      >
        <div className="tag-concept mb-3">Laporan Terkirim</div>
        <h3 className="font-display font-bold text-primary text-2xl">Analisis Detektifmu</h3>
        <div className="mt-4 space-y-2 font-body text-primary/85">
          <div className="flex justify-between">
            <span>Kartu ditempatkan tepat</span>
            <span className="font-mono">
              {correct}/{totalClues} <b className="text-teal-dark">({acc}%)</b>
            </span>
          </div>
          <div className="flex justify-between">
            <span>Rekomendasi ideal dipilih</span>
            <span className="font-mono text-teal-dark">{ideal}</span>
          </div>
          <div className="flex justify-between">
            <span>Rekomendasi kurang tepat</span>
            <span className={`font-mono ${nonIdeal > 0 ? "text-maroon" : "text-primary/85"}`}>{nonIdeal}</span>
          </div>
        </div>
        <p className="mt-4 text-primary/85 text-sm font-body">
          Papan buktimu tersimpan. Buka jurnal kapan pun untuk meninjau ulang, lalu lanjut ke Epilog untuk melihat hasil akhir & mencetak laporan.
        </p>
        <div className="mt-5 flex justify-end">
          <button onClick={onClose} className="btn-primary" data-testid="feedback-close-btn">
            Mengerti
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
