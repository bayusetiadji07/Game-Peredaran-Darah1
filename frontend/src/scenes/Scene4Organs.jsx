import React, { useMemo, useState } from "react";
import { motion, AnimatePresence, Reorder } from "framer-motion";
import { ArrowRight, Check, X, AlertCircle, Heart, ToggleLeft, ToggleRight, Info, Route } from "lucide-react";
import SceneShell from "../components/SceneShell";
import ClueUnlockedToast from "../components/ClueUnlockedToast";
import CloseUpDiagram from "../components/CloseUpDiagram";
import { SCENE4_ORGANS, SCENE4_PATHS, SCENE4_ARGUMENT, SCENE4_CLUES } from "../data/gameContent";
import { useGame } from "../context/GameContext";
import { playClick } from "../components/AudioManager";
import useT from "../hooks/useT";

// Shuffle helper (Fisher–Yates) — deterministic per session by re-running when tokens change.
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function Scene4Organs() {
  const { state, addClue, addScore, answerQuiz, goToScene } = useGame();
  const t = useT();
  const [activeOrgan, setActiveOrgan] = useState(null);
  const [mode, setMode] = useState("normal"); // 'normal' | 'rani'
  const [toast, setToast] = useState(null);

  const [pulmonalOrder, setPulmonalOrder] = useState(() => shuffle(SCENE4_PATHS.pulmonal.tokens));
  const [sistemikOrder, setSistemikOrder] = useState(() => shuffle(SCENE4_PATHS.sistemik.tokens));
  const [pulmonalSubmitted, setPulmonalSubmitted] = useState(false);
  const [sistemikSubmitted, setSistemikSubmitted] = useState(false);

  const pulmonalCorrect =
    pulmonalSubmitted &&
    pulmonalOrder.join("|") === SCENE4_PATHS.pulmonal.correctOrder.join("|");
  const sistemikCorrect =
    sistemikSubmitted &&
    sistemikOrder.join("|") === SCENE4_PATHS.sistemik.correctOrder.join("|");

  const [argOpen, setArgOpen] = useState(false);
  const [argChosen, setArgChosen] = useState(null);

  const clueIdsAdded = useMemo(
    () => new Set(state.journal.clues.map((c) => c.id)),
    [state.journal.clues]
  );

  const showToast = (clue) => {
    setToast(clue);
    window.setTimeout(() => setToast(null), 3600);
  };

  const submitPulmonal = () => {
    playClick();
    setPulmonalSubmitted(true);
    const ok = pulmonalOrder.join("|") === SCENE4_PATHS.pulmonal.correctOrder.join("|");
    if (ok) {
      addScore("reasoningFlow", 10);
      const clue = SCENE4_CLUES.find((c) => c.id === "clue-pulmonal-benar");
      if (!clueIdsAdded.has(clue.id)) {
        addClue(clue);
        showToast(clue);
      }
    }
  };
  const submitSistemik = () => {
    playClick();
    setSistemikSubmitted(true);
    const ok = sistemikOrder.join("|") === SCENE4_PATHS.sistemik.correctOrder.join("|");
    if (ok) {
      addScore("reasoningFlow", 10);
      const clue = SCENE4_CLUES.find((c) => c.id === "clue-sistemik-benar");
      if (!clueIdsAdded.has(clue.id)) {
        addClue(clue);
        showToast(clue);
      }
    }
  };
  const resetPulmonal = () => {
    setPulmonalOrder(shuffle(SCENE4_PATHS.pulmonal.tokens));
    setPulmonalSubmitted(false);
  };
  const resetSistemik = () => {
    setSistemikOrder(shuffle(SCENE4_PATHS.sistemik.tokens));
    setSistemikSubmitted(false);
  };

  const handleArg = (choice) => {
    playClick();
    setArgChosen(choice);
    answerQuiz(SCENE4_ARGUMENT.id, choice.id);
    if (choice.correct) {
      addScore("reasoningFlow", 15);
      const clue = SCENE4_CLUES.find((c) => c.id === "clue-kompensasi-jantung");
      if (!clueIdsAdded.has(clue.id)) {
        addClue(clue);
        showToast(clue);
      }
    }
  };

  const allDone =
    pulmonalCorrect &&
    sistemikCorrect &&
    !!state.quizAnswers[SCENE4_ARGUMENT.id];

  return (
    <SceneShell
      sceneTag="Peredaran Kecil & Besar · Kompensasi Jantung"
      ssiTag="Argumentasi berbasis bukti"
    >
      {/* Custom dark cinematic background instead of a photo */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,#1F3864_0%,#0a1226_60%,#000_100%)]" />
      <div className="absolute inset-0 bg-grain opacity-40 mix-blend-multiply pointer-events-none" />

      {/* Scene label */}
      <div className="absolute left-6 top-24 md:top-28 z-20">
        <div className="bg-teal text-cream px-4 py-2 rounded-r-full shadow-card font-mono uppercase tracking-widest text-xs">
          Scene 4 · {t("scene.4.name")}
        </div>
        <h1 className="mt-3 font-display font-bold text-cream text-3xl md:text-4xl leading-tight drop-shadow-[0_4px_10px_rgba(0,0,0,0.9)]">
          {t("scene.4.title")}
        </h1>
      </div>

      {/* Toggle Normal vs Rani */}
      <div className="absolute right-6 top-24 md:top-28 z-20">
        <button
          data-testid="scene4-toggle-mode"
          onClick={() => {
            playClick();
            setMode(mode === "normal" ? "rani" : "normal");
          }}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-full shadow-card border-2 font-body font-semibold transition ${
            mode === "normal"
              ? "bg-teal border-teal text-cream"
              : "bg-maroon border-maroon text-cream"
          }`}
        >
          {mode === "normal" ? <ToggleLeft size={18} /> : <ToggleRight size={18} />}
          Tampilan: {mode === "normal" ? "Darah Normal" : "Darah Rani"}
        </button>
      </div>

      {/* Layout: left diagram — right sequencer */}
      <div className="relative w-full min-h-screen pt-32 md:pt-40 pb-28 px-4 md:px-8 grid grid-cols-1 lg:grid-cols-[minmax(0,42%)_1fr] gap-6 z-10">
        {/* Diagram panel */}
        <div className="relative rounded-2xl bg-cream/95 shadow-floating border border-primary/10 p-4 overflow-hidden">
          <div className="flex items-center gap-2 mb-2">
            <Route size={14} className="text-primary/80" />
            <span className="font-mono uppercase tracking-widest text-[10px] text-primary/80">
              Diagram Interaktif · Klik Organ
            </span>
          </div>
          <div className="relative w-full h-[calc(100%-24px)]">
            <img
              src="/assets/ilustrasi/diagram-peredaran-darah.png"
              alt="Diagram peredaran darah manusia"
              className="absolute inset-0 w-full h-full object-contain"
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
            {/* Simulated blood particles */}
            <BloodParticles mode={mode} />

            {SCENE4_ORGANS.map((o) => (
              <button
                key={o.id}
                data-testid={`organ-${o.id}`}
                onClick={() => {
                  playClick();
                  setActiveOrgan(o);
                }}
                style={{ left: `${o.x}%`, top: `${o.y}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 group"
                aria-label={o.label}
              >
                <span className="relative grid place-items-center">
                  <span className="absolute inset-0 rounded-full bg-teal/70 animate-ping-soft" />
                  <span className="relative grid place-items-center h-8 w-8 rounded-full border-2 border-cream bg-teal shadow-card">
                    <Heart size={14} className="text-cream" />
                  </span>
                </span>
                <span className="absolute top-full mt-1 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-mono uppercase tracking-widest text-cream bg-primary/85 px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition">
                  {o.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Right: two sequencers stacked */}
        <div className="flex flex-col gap-4 overflow-y-auto pr-1">
          <PathSequencer
            testid="path-pulmonal"
            path={SCENE4_PATHS.pulmonal}
            order={pulmonalOrder}
            setOrder={setPulmonalOrder}
            submitted={pulmonalSubmitted}
            correct={pulmonalCorrect}
            onSubmit={submitPulmonal}
            onReset={resetPulmonal}
          />
          <PathSequencer
            testid="path-sistemik"
            path={SCENE4_PATHS.sistemik}
            order={sistemikOrder}
            setOrder={setSistemikOrder}
            submitted={sistemikSubmitted}
            correct={sistemikCorrect}
            onSubmit={submitSistemik}
            onReset={resetSistemik}
          />
        </div>
      </div>

      {/* Bottom action */}
      <div className="fixed inset-x-0 bottom-4 z-40 flex justify-center px-6">
        <div className="bg-paper border-2 border-primary/15 rounded-full shadow-floating px-6 py-2.5 flex items-center gap-4">
          {!(pulmonalCorrect && sistemikCorrect) ? (
            <div className="flex items-center gap-2 text-primary/80 font-body text-sm">
              <AlertCircle size={16} className="text-mustard" />
              <span>Selesaikan kedua alur peredaran (kecil + besar) untuk membuka pertanyaan penutup.</span>
            </div>
          ) : !state.quizAnswers[SCENE4_ARGUMENT.id] ? (
            <button
              data-testid="scene4-open-argument-btn"
              onClick={() => {
                playClick();
                setArgOpen(true);
              }}
              className="btn-primary"
            >
              Buka Pertanyaan Akhir <ArrowRight size={16} />
            </button>
          ) : (
            <button
              data-testid="scene4-continue-btn"
              onClick={() => {
                playClick();
                goToScene(5);
              }}
              className="btn-primary"
            >
              Lanjut Wawancara Saksi <ArrowRight size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Organ info modal */}
      <AnimatePresence>
        {activeOrgan && (
          <OrganModal organ={activeOrgan} onClose={() => setActiveOrgan(null)} />
        )}
      </AnimatePresence>

      {/* Argument modal */}
      <AnimatePresence>
        {argOpen && (
          <ArgumentModal
            answered={state.quizAnswers[SCENE4_ARGUMENT.id]}
            chosen={argChosen}
            onChoose={handleArg}
            onClose={() => {
              setArgOpen(false);
              setArgChosen(null);
            }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {toast && <ClueUnlockedToast clue={toast} onClose={() => setToast(null)} />}
      </AnimatePresence>
    </SceneShell>
  );
}

function PathSequencer({ testid, path, order, setOrder, submitted, correct, onSubmit, onReset }) {
  const isFinal = submitted && correct;
  return (
    <div
      data-testid={testid}
      className={`rounded-2xl border-2 shadow-floating p-4 md:p-5 transition ${
        isFinal ? "bg-teal/15 border-teal" : submitted ? "bg-maroon/10 border-maroon" : "bg-paper/95 border-primary/15"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="font-display font-bold text-primary text-lg leading-tight">
            {path.label}
          </div>
          <div className="text-primary/85 text-sm font-body">{path.desc}</div>
        </div>
        {isFinal && (
          <span className="grid place-items-center h-8 w-8 rounded-full bg-teal text-cream shadow-card">
            <Check size={16} />
          </span>
        )}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
        <span className="px-3 py-1.5 rounded-full bg-primary text-cream font-mono uppercase text-[11px] tracking-widest">
          {path.fixedStart}
        </span>
        <span className="text-primary/80">→</span>
        <Reorder.Group
          axis="x"
          values={order}
          onReorder={submitted ? () => {} : setOrder}
          className="flex flex-wrap gap-2"
        >
          {order.map((token, i) => (
            <Reorder.Item
              key={token}
              value={token}
              disabled={submitted}
              className={`select-none cursor-grab active:cursor-grabbing font-body font-semibold text-sm px-3 py-1.5 rounded-full border-2 shadow-sm bg-cream ${
                submitted
                  ? token === path.correctOrder[i]
                    ? "border-teal text-teal-dark bg-teal/10"
                    : "border-maroon text-maroon bg-maroon/10"
                  : "border-primary/25 text-primary hover:border-teal"
              }`}
              whileDrag={{ scale: 1.05, boxShadow: "0 8px 16px rgba(0,0,0,0.2)" }}
              data-testid={`${testid}-token-${token.replace(/\s+/g, "-")}`}
            >
              {token}
            </Reorder.Item>
          ))}
        </Reorder.Group>
        <span className="text-primary/80">→</span>
        <span className="px-3 py-1.5 rounded-full bg-primary text-cream font-mono uppercase text-[11px] tracking-widest">
          {path.fixedEnd}
        </span>
      </div>

      <div className="mt-4 flex items-center gap-3">
        {!submitted ? (
          <button
            onClick={onSubmit}
            className="btn-primary !py-2.5"
            data-testid={`${testid}-submit-btn`}
          >
            Periksa Urutan <Check size={14} />
          </button>
        ) : correct ? (
          <div className="flex items-center gap-2 text-teal-dark font-body text-sm">
            <Check size={16} /> Urutan tepat! Petunjuk masuk ke Jurnal.
          </div>
        ) : (
          <>
            <div className="flex items-center gap-2 text-maroon font-body text-sm">
              <X size={16} /> Urutan belum benar. Coba lagi!
            </div>
            <button
              onClick={onReset}
              className="btn-secondary !py-2"
              data-testid={`${testid}-reset-btn`}
            >
              Acak Ulang
            </button>
          </>
        )}
      </div>
    </div>
  );
}

function OrganModal({ organ, onClose }) {
  return (
    <motion.div
      className="fixed inset-0 z-[65] bg-black/60 grid place-items-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="paper-bg max-w-2xl w-full rounded-2xl border-l-8 border-teal shadow-floating relative overflow-hidden"
        data-testid="organ-modal"
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-primary text-cream hover:bg-maroon transition"
          data-testid="organ-modal-close"
        >
          <X size={16} />
        </button>
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr]">
          {/* Left: text */}
          <div className="p-5 md:p-6">
            <div className="tag-concept mb-2">Organ</div>
            <h3 className="font-display font-bold text-primary text-2xl leading-tight">
              {organ.label}
            </h3>
            <p className="mt-3 text-primary/85 font-body leading-relaxed text-sm">{organ.info}</p>
            <div className="mt-4 text-teal-dark font-mono text-xs flex items-center gap-1">
              <Info size={14} /> Ketuk organ lain untuk mempelajari perannya.
            </div>
          </div>
          {/* Right: interactive diagram */}
          <div className="bg-cream/50 p-3 md:p-4 border-t md:border-t-0 md:border-l border-primary/10">
            <CloseUpDiagram hotspotId={organ.id} />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function ArgumentModal({ chosen, answered, onChoose, onClose }) {
  const isDone = !!answered || !!chosen;
  const activeChoice = SCENE4_ARGUMENT.choices.find(
    (c) => c.id === (chosen?.id || answered)
  );
  return (
    <motion.div
      className="fixed inset-0 z-[65] bg-black/70 grid place-items-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      data-testid="argument-modal"
    >
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="paper-bg w-full max-w-2xl rounded-2xl shadow-floating p-8 relative border-t-8 border-maroon"
      >
        <div className="tag-ssi mb-3">Argumentasi Akhir · Scene 4</div>
        <h3 className="font-display font-bold text-primary text-2xl leading-snug">
          {SCENE4_ARGUMENT.question}
        </h3>
        <div className="mt-5 space-y-3">
          {SCENE4_ARGUMENT.choices.map((c) => {
            const selected = activeChoice?.id === c.id;
            const revealed = isDone;
            return (
              <button
                key={c.id}
                data-testid={`arg-choice-${c.id}`}
                disabled={isDone}
                onClick={() => onChoose(c)}
                className={`w-full text-left rounded-lg px-4 py-3 border-2 transition font-body ${
                  revealed
                    ? c.correct
                      ? "border-teal bg-teal/15 text-teal-dark"
                      : selected
                      ? "border-maroon bg-maroon/10 text-maroon"
                      : "border-primary/15 bg-paper text-primary/85"
                    : "border-primary/20 bg-paper text-primary hover:border-maroon hover:bg-maroon/5"
                }`}
              >
                <span className="font-mono text-xs mr-2 uppercase">{c.id})</span>
                {c.text}
              </button>
            );
          })}
        </div>
        {isDone && activeChoice && (
          <div
            className={`mt-5 rounded-lg p-4 font-body ${
              activeChoice.correct ? "bg-teal/15 text-teal-dark" : "bg-maroon/10 text-maroon"
            }`}
            data-testid="argument-feedback"
          >
            <div className="flex items-center gap-2 font-semibold mb-1">
              {activeChoice.correct ? <Check size={16} /> : <AlertCircle size={16} />}
              {activeChoice.correct ? "Argumen tepat!" : "Belum tepat"}
            </div>
            <div>{activeChoice.feedback}</div>
          </div>
        )}
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="btn-secondary"
            data-testid="argument-close-btn"
          >
            {isDone ? "Tutup" : "Nanti Saja"}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function BloodParticles({ mode }) {
  // Dense red particles for normal mode, sparse pale for Rani mode.
  const isRani = mode === "rani";
  const count = isRani ? 8 : 18;
  const color = isRani ? "#D89A8A" : "#8B1E1E";
  const opacity = isRani ? 0.55 : 0.85;
  const particles = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      // random position across pipes (approximate)
      x: 30 + Math.random() * 40,
      y: 20 + Math.random() * 65,
      size: 4 + Math.random() * 4,
      delay: Math.random() * 4,
    }));
  }, [count]);
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: color,
            opacity,
            filter: "blur(0.5px)",
          }}
          animate={{ y: [0, -20, 0, 20, 0] }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: p.delay,
          }}
        />
      ))}
      <div className="absolute bottom-2 right-3 text-[10px] font-mono uppercase tracking-widest text-primary/85 bg-cream/70 px-2 py-0.5 rounded">
        {isRani ? "Sel darah merah lebih sedikit & pucat" : "Sel darah merah normal"}
      </div>
    </div>
  );
}
