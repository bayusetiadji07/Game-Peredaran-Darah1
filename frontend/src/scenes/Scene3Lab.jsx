import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, ArrowRight, FlaskConical, AlertCircle } from "lucide-react";
import SceneShell from "../components/SceneShell";
import DialogBox from "../components/DialogBox";
import ClueUnlockedToast from "../components/ClueUnlockedToast";
import { SCENE3_LAB_ITEMS, SCENE3_DIALOG_INTRO } from "../data/gameContent";
import { useGame } from "../context/GameContext";
import { playClick } from "../components/AudioManager";
import useT from "../hooks/useT";

export default function Scene3Lab() {
  const [briefingDone, setBriefingDone] = useState(false);
  const { state, addClue, addScore, goToScene } = useGame();
  const t = useT();

  // placed[itemId] = "normal" | "rendah" | undefined (not yet placed)
  const [placed, setPlaced] = useState(() => ({}));
  const [feedback, setFeedback] = useState({}); // itemId -> "correct"|"wrong"
  const [dragOver, setDragOver] = useState(null);
  const [toast, setToast] = useState(null);

  const remaining = SCENE3_LAB_ITEMS.filter((it) => !placed[it.id]);
  const done = remaining.length === 0;
  const correctCount = Object.values(feedback).filter((v) => v === "correct").length;

  const clueIdsAdded = useMemo(
    () => new Set(state.journal.clues.map((c) => c.id)),
    [state.journal.clues]
  );

  const handleDrop = (itemId, zone) => {
    const item = SCENE3_LAB_ITEMS.find((i) => i.id === itemId);
    const correct = item.correct === zone;
    setPlaced((prev) => ({ ...prev, [itemId]: zone }));
    setFeedback((prev) => ({ ...prev, [itemId]: correct ? "correct" : "wrong" }));
    setDragOver(null);
    if (correct) {
      addScore("labSort", 5);
      if (!clueIdsAdded.has(item.clue.id)) {
        addClue(item.clue);
        setToast(item.clue);
        window.setTimeout(() => setToast(null), 3800);
      }
    }
  };

  return (
    <SceneShell
      bgUrl="/assets/background/bg-laboratorium.png"
      sceneTag="Eritrosit, Hemoglobin, Nilai Rujukan"
      ssiTag="Akses pemeriksaan gratis di Puskesmas"
    >
      {/* Scene label */}
      <div className="absolute left-6 top-24 md:top-28 z-20">
        <div className="bg-primary text-cream px-4 py-2 rounded-r-full shadow-card font-mono uppercase tracking-widest text-xs">
          Scene 3 · {t("scene.3.name")}
        </div>
        <h1 className="mt-3 font-display font-bold text-cream text-3xl md:text-4xl drop-shadow-[0_4px_10px_rgba(0,0,0,0.6)] leading-tight">
          {t("scene.3.title")}
        </h1>
      </div>

      {!briefingDone && (
        <DialogBox lines={SCENE3_DIALOG_INTRO} onComplete={() => setBriefingDone(true)} />
      )}

      {briefingDone && (
        <div className="absolute inset-0 pt-24 md:pt-32 pb-6 px-4 md:px-10 flex flex-col z-10">
          {/* Instruction */}
          <div className="mx-auto max-w-3xl bg-paper/95 border border-primary/15 shadow-card rounded-xl px-5 py-3 mb-5 text-center">
            <p className="font-body text-primary text-sm md:text-base">
              <b>Seret</b> setiap hasil pemeriksaan ke kotak <span className="text-teal-dark font-semibold">NORMAL</span> atau <span className="text-maroon font-semibold">RENDAH</span> berdasarkan rentang rujukan.
            </p>
          </div>

          <div className="flex-1 grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-4 md:gap-6">
            {/* Cards to drag */}
            <div className="bg-paper/95 rounded-2xl p-4 shadow-paper border border-primary/10 overflow-y-auto">
              <div className="font-mono uppercase text-[10px] tracking-widest text-primary/80 mb-2 flex items-center gap-2">
                <FlaskConical size={12} /> Lembar Hasil Lab
              </div>
              <div className="space-y-3">
                {SCENE3_LAB_ITEMS.map((item) => {
                  const isPlaced = !!placed[item.id];
                  return (
                    <div
                      key={item.id}
                      draggable={!isPlaced}
                      onDragStart={(e) => e.dataTransfer.setData("text/plain", item.id)}
                      onClick={() => !isPlaced && playClick()}
                      className={`select-none rounded-lg border-2 p-3 shadow-sm transition ${
                        isPlaced
                          ? feedback[item.id] === "correct"
                            ? "bg-teal/15 border-teal opacity-70"
                            : "bg-maroon/10 border-maroon opacity-70"
                          : "bg-paper border-primary/25 hover:border-teal cursor-grab active:cursor-grabbing"
                      }`}
                      data-testid={`lab-card-${item.id}`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="font-display font-semibold text-primary">
                          {item.label}
                        </div>
                        {isPlaced && (
                          feedback[item.id] === "correct"
                            ? <Check size={16} className="text-teal-dark" />
                            : <X size={16} className="text-maroon" />
                        )}
                      </div>
                      <div className="font-mono text-lg text-maroon mt-1">{item.value}</div>
                      <div className="font-body text-xs text-primary/80 mt-0.5">
                        {item.referenceText}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Drop zones */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <DropZone
                testid="dropzone-normal"
                label="NORMAL"
                color="teal"
                over={dragOver === "normal"}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragOver("normal");
                }}
                onDragLeave={() => setDragOver(null)}
                onDrop={(e) => {
                  e.preventDefault();
                  const id = e.dataTransfer.getData("text/plain");
                  if (id) handleDrop(id, "normal");
                }}
                items={SCENE3_LAB_ITEMS.filter((it) => placed[it.id] === "normal").map((i) => ({
                  ...i,
                  ok: feedback[i.id] === "correct",
                }))}
              />
              <DropZone
                testid="dropzone-rendah"
                label="RENDAH"
                color="maroon"
                over={dragOver === "rendah"}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragOver("rendah");
                }}
                onDragLeave={() => setDragOver(null)}
                onDrop={(e) => {
                  e.preventDefault();
                  const id = e.dataTransfer.getData("text/plain");
                  if (id) handleDrop(id, "rendah");
                }}
                items={SCENE3_LAB_ITEMS.filter((it) => placed[it.id] === "rendah").map((i) => ({
                  ...i,
                  ok: feedback[i.id] === "correct",
                }))}
              />
            </div>
          </div>

          {/* Bottom bar: cell comparison + continue */}
          <div className="mt-4 md:mt-6 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4 items-center">
            <div className="bg-paper/95 rounded-xl border border-primary/10 shadow-paper px-5 py-3 flex items-center gap-4">
              <img
                src="/assets/ilustrasi/diagram-sel-darah.png"
                alt="Sel darah normal vs anemia"
                className="h-16 w-auto object-contain"
                onError={(e) => (e.currentTarget.style.display = "none")}
              />
              <div>
                <div className="font-mono uppercase tracking-widest text-[10px] text-primary/80">
                  Pengamatan Mikroskopik
                </div>
                <div className="font-body text-primary text-sm max-w-md">
                  Sel darah merah Rani terlihat <b>lebih kecil dan pucat</b> dibanding sel normal — pola khas anemia defisiensi besi.
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="font-mono text-xs uppercase tracking-widest text-cream/90 bg-primary/80 rounded-full px-4 py-2 shadow-card">
                Benar: {correctCount}/{SCENE3_LAB_ITEMS.length}
              </div>
              {done ? (
                <button
                  onClick={() => {
                    playClick();
                    goToScene(4);
                  }}
                  className="btn-primary"
                  data-testid="scene3-continue-btn"
                >
                  Lanjut ke Scene 4 <ArrowRight size={16} />
                </button>
              ) : (
                <div className="text-cream/90 font-body text-sm flex items-center gap-1">
                  <AlertCircle size={14} /> Sisa {remaining.length} kartu
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <AnimatePresence>
        {toast && <ClueUnlockedToast clue={toast} onClose={() => setToast(null)} />}
      </AnimatePresence>
    </SceneShell>
  );
}

function DropZone({ testid, label, color, over, onDragOver, onDragLeave, onDrop, items }) {
  const colorMap = {
    teal: {
      border: "border-teal",
      bg: "bg-teal/10",
      chip: "bg-teal text-cream",
      overBg: "bg-teal/25",
    },
    maroon: {
      border: "border-maroon",
      bg: "bg-maroon/10",
      chip: "bg-maroon text-cream",
      overBg: "bg-maroon/25",
    },
  }[color];

  return (
    <div
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      data-testid={testid}
      className={`h-full min-h-[260px] rounded-2xl border-4 border-dashed ${colorMap.border} ${over ? colorMap.overBg : colorMap.bg} transition-colors p-4 flex flex-col`}
    >
      <div className="flex items-center justify-between mb-2">
        <span className={`px-3 py-1 rounded-full text-xs font-body font-bold uppercase tracking-widest ${colorMap.chip}`}>
          {label}
        </span>
        <span className="font-mono text-xs text-primary/80">{items.length} kartu</span>
      </div>
      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-2 content-start">
        {items.length === 0 && (
          <div className="col-span-full h-full grid place-items-center text-primary/80 font-body italic text-sm">
            Seret kartu ke sini
          </div>
        )}
        {items.map((it) => (
          <motion.div
            key={it.id}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`rounded-lg p-2 text-sm border-2 ${
              it.ok ? "bg-teal/15 border-teal" : "bg-maroon/15 border-maroon"
            }`}
          >
            <div className="font-display font-semibold text-primary flex items-center gap-1">
              {it.ok ? <Check size={12} className="text-teal-dark" /> : <X size={12} className="text-maroon" />}
              {it.label}
            </div>
            <div className="font-mono text-maroon text-xs">{it.value}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
