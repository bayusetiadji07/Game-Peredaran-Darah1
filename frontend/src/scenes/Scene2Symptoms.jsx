import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Search, Check, AlertCircle } from "lucide-react";
import SceneShell from "../components/SceneShell";
import ClueUnlockedToast from "../components/ClueUnlockedToast";
import CloseUpDiagram from "../components/CloseUpDiagram";
import { SCENE2_HOTSPOTS, SCENE2_QUIZZES } from "../data/gameContent";
import { useGame } from "../context/GameContext";
import { playClick } from "../components/AudioManager";
import useT from "../hooks/useT";

export default function Scene2Symptoms() {
  const { state, addClue, addScore, answerQuiz, goToScene } = useGame();
  const t = useT();
  const [activeSpot, setActiveSpot] = useState(null);
  const [toastClue, setToastClue] = useState(null);
  const [quizOpen, setQuizOpen] = useState(false);
  const [quizChosen, setQuizChosen] = useState({}); // { [quizId]: choice }

  const foundSpotIds = useMemo(
    () => new Set(state.journal.clues.filter((c) => c.unlockedInScene === 2).map((c) => c.id)),
    [state.journal.clues]
  );
  const foundCount = SCENE2_HOTSPOTS.filter((h) => foundSpotIds.has(h.clue.id)).length;
  const allFound = foundCount === SCENE2_HOTSPOTS.length;

  const handleHotspot = (spot) => {
    playClick();
    setActiveSpot(spot);
    if (!foundSpotIds.has(spot.clue.id)) {
      addClue(spot.clue);
      setToastClue(spot.clue);
      window.setTimeout(() => setToastClue(null), 4200);
    }
  };

  const handleQuizAnswer = (quizId, choice) => {
    playClick();
    setQuizChosen((prev) => ({ ...prev, [quizId]: choice }));
    answerQuiz(quizId, choice.id);
    if (choice.correct) addScore("symptomQuiz", 10);
  };

  const answeredCount = SCENE2_QUIZZES.filter((q) => state.quizAnswers[q.id]).length;
  const allAnswered = answeredCount === SCENE2_QUIZZES.length;

  return (
    <SceneShell
      bgUrl="/assets/background/bg-uks.png"
      sceneTag="Kerja jantung & denyut nadi (kompensasi)"
      ssiTag="Normalisasi gejala oleh lingkungan"
    >
      {/* Scene banner */}
      <div className="absolute left-6 top-24 md:top-28 z-20">
        <div className="bg-primary text-cream px-4 py-2 rounded-r-full shadow-card font-mono uppercase tracking-widest text-xs">
          Scene 2 · {t("scene.2.name")}
        </div>
        <h1 className="mt-3 font-display font-bold text-cream text-3xl md:text-4xl drop-shadow-[0_4px_10px_rgba(0,0,0,0.6)] leading-tight">
          {t("scene.2.title")}
        </h1>
        <p className="mt-2 max-w-md text-cream/85 font-body drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]">
          {t("scene.2.subtitle")}
        </p>
      </div>

      {/* Progress badge */}
      <div className="absolute right-6 top-24 md:top-28 z-20 bg-paper/95 backdrop-blur rounded-xl px-4 py-3 shadow-card border border-primary/10">
        <div className="font-mono uppercase text-[10px] tracking-widest text-primary/80">
          {t("scene.2.buktiLabel")}
        </div>
        <div className="font-display font-bold text-3xl text-maroon leading-none">
          {foundCount}
          <span className="text-primary/80 text-xl">/{SCENE2_HOTSPOTS.length}</span>
        </div>
      </div>

      {/* Rani illustration + hotspots */}
      <div className="absolute inset-0 grid place-items-center pt-20">
        <div className="relative h-[85%] max-h-[92vh]">
          <img
            src="/assets/karakter/rani-pucat.png"
            alt="Rani terlihat pucat"
            className="h-full w-auto object-contain drop-shadow-[0_30px_40px_rgba(0,0,0,0.6)] select-none pointer-events-none"
          />
          {SCENE2_HOTSPOTS.map((spot) => {
            const found = foundSpotIds.has(spot.clue.id);
            return (
              <button
                key={spot.id}
                data-testid={`hotspot-${spot.id}`}
                onClick={() => handleHotspot(spot)}
                style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 group focus:outline-none"
                aria-label={spot.label}
              >
                <span className="relative grid place-items-center">
                  {!found && (
                    <span className="absolute inset-0 rounded-full bg-mustard/60 animate-ping-soft" />
                  )}
                  <span
                    className={`relative grid place-items-center h-9 w-9 rounded-full border-2 border-cream shadow-card transition-transform group-hover:scale-110 ${
                      found ? "bg-teal-dark" : "bg-maroon"
                    }`}
                  >
                    {found ? <Check size={16} className="text-cream" /> : <Search size={16} className="text-cream" />}
                  </span>
                </span>
                <span className="absolute top-full mt-1 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-mono uppercase tracking-widest text-cream bg-primary/80 px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition">
                  {spot.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom action bar */}
      <div className="absolute inset-x-0 bottom-6 z-20 flex justify-center px-6">
        <div className="bg-paper border-2 border-primary/15 rounded-full shadow-floating px-6 py-3 flex items-center gap-4">
          {!allFound ? (
            <div className="flex items-center gap-2 text-primary/80 font-body text-sm">
              <AlertCircle size={16} className="text-mustard" />
              <span>
                Temukan {SCENE2_HOTSPOTS.length - foundCount} gejala lagi untuk membuka kuis.
              </span>
            </div>
          ) : !allAnswered ? (
            <button
              data-testid="scene2-open-quiz-btn"
              onClick={() => {
                playClick();
                setQuizOpen(true);
              }}
              className="btn-primary"
            >
              Buka Kuis Mini ({answeredCount}/{SCENE2_QUIZZES.length}) <ArrowRight size={16} />
            </button>
          ) : (
            <button
              data-testid="scene2-continue-btn"
              onClick={() => {
                playClick();
                goToScene(3);
              }}
              className="btn-primary"
            >
              Lanjut ke Laboratorium <ArrowRight size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Clue detail popup */}
      <AnimatePresence>
        {activeSpot && (
          <ClueDetailModal
            spot={activeSpot}
            onClose={() => setActiveSpot(null)}
          />
        )}
      </AnimatePresence>

      {/* Toast */}
      <AnimatePresence>
        {toastClue && <ClueUnlockedToast clue={toastClue} onClose={() => setToastClue(null)} />}
      </AnimatePresence>

      {/* Quiz Modal */}
      <AnimatePresence>
        {quizOpen && (
          <QuizModal
            quizzes={SCENE2_QUIZZES}
            answers={state.quizAnswers}
            chosen={quizChosen}
            onChoose={handleQuizAnswer}
            onClose={() => {
              setQuizOpen(false);
            }}
          />
        )}
      </AnimatePresence>
    </SceneShell>
  );
}

function ClueDetailModal({ spot, onClose }) {
  return (
    <motion.div
      className="fixed inset-0 z-[65] bg-black/60 grid place-items-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      data-testid="clue-detail-modal"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="paper-bg max-w-2xl w-full rounded-2xl border-l-8 border-maroon shadow-floating relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-primary text-cream hover:bg-maroon transition"
          data-testid="clue-detail-close"
        >
          <X size={16} />
        </button>
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-0">
          {/* Left: text */}
          <div className="p-5 md:p-6">
            <div className="text-[10px] font-mono uppercase tracking-widest text-maroon">
              Gejala Klinis Ditemukan
            </div>
            <h3 className="font-display font-bold text-primary text-2xl mt-1 leading-tight">
              {spot.clue.title}
            </h3>
            <p className="mt-3 text-primary/85 font-body leading-relaxed text-sm">
              {spot.clue.description}
            </p>
            <div className="mt-4 flex items-center gap-2 text-teal-dark font-mono text-xs">
              <Check size={14} /> Tersimpan ke Jurnal Investigasi
            </div>
          </div>
          {/* Right: close-up diagram */}
          <div className="bg-cream/50 p-3 md:p-4 border-t md:border-t-0 md:border-l border-primary/10">
            <CloseUpDiagram hotspotId={spot.id} />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function QuizModal({ quizzes, answers, chosen, onChoose, onClose }) {
  const [current, setCurrent] = React.useState(() => {
    // start at first unanswered
    const idx = quizzes.findIndex((q) => !answers[q.id]);
    return idx === -1 ? 0 : idx;
  });
  const quiz = quizzes[current];
  const answeredId = answers[quiz.id];
  const chosenObj = chosen[quiz.id];
  const isDone = !!answeredId || !!chosenObj;
  const activeChoice = quiz.choices.find(
    (c) => c.id === (chosenObj?.id || answeredId)
  );

  const allAnswered = quizzes.every((q) => answers[q.id]);
  const isLast = current === quizzes.length - 1;

  return (
    <motion.div
      className="fixed inset-0 z-[65] bg-black/70 grid place-items-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      data-testid="quiz-modal"
    >
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="paper-bg w-full max-w-2xl rounded-2xl shadow-floating p-6 md:p-8 relative border-t-8 border-teal"
      >
        <div className="flex items-center justify-between mb-3">
          <div className="tag-concept">
            Kuis Mini · Soal {current + 1} / {quizzes.length}
          </div>
          {/* dot progress */}
          <div className="flex items-center gap-1.5">
            {quizzes.map((q, i) => {
              const done = !!answers[q.id];
              return (
                <button
                  key={q.id}
                  onClick={() => setCurrent(i)}
                  className={`h-2.5 rounded-full transition-all ${
                    i === current
                      ? "w-6 bg-teal"
                      : done
                      ? "w-2.5 bg-teal-dark"
                      : "w-2.5 bg-primary/25"
                  }`}
                  data-testid={`quiz-dot-${i}`}
                  aria-label={`Ke soal ${i + 1}`}
                />
              );
            })}
          </div>
        </div>
        <h3 className="font-display font-bold text-primary text-xl md:text-2xl leading-snug">
          {quiz.question}
        </h3>
        <div className="mt-4 md:mt-5 space-y-2.5">
          {quiz.choices.map((c) => {
            const selected = activeChoice?.id === c.id;
            const revealed = isDone;
            return (
              <button
                key={c.id}
                data-testid={`quiz-choice-${quiz.id}-${c.id}`}
                disabled={isDone}
                onClick={() => onChoose(quiz.id, c)}
                className={`w-full text-left rounded-lg px-4 py-3 border-2 transition font-body ${
                  revealed
                    ? c.correct
                      ? "border-teal bg-teal/15 text-teal-dark"
                      : selected
                      ? "border-maroon bg-maroon/10 text-maroon"
                      : "border-primary/20 bg-paper text-primary/85"
                    : "border-primary/25 bg-paper text-primary hover:border-teal hover:bg-teal/10"
                }`}
              >
                <span className="font-mono text-xs mr-2 uppercase font-bold">{c.id})</span>
                {c.text}
              </button>
            );
          })}
        </div>
        {isDone && activeChoice && (
          <div
            className={`mt-4 rounded-lg p-4 font-body ${
              activeChoice.correct ? "bg-teal/15 text-teal-dark" : "bg-maroon/10 text-maroon"
            }`}
            data-testid="quiz-feedback"
          >
            <div className="flex items-center gap-2 font-semibold mb-1">
              {activeChoice.correct ? <Check size={16} /> : <AlertCircle size={16} />}
              {activeChoice.correct ? "Jawaban tepat!" : "Belum tepat"}
            </div>
            <div>{activeChoice.feedback}</div>
          </div>
        )}
        <div className="mt-5 flex flex-wrap justify-between items-center gap-3">
          <button
            onClick={onClose}
            className="btn-secondary !py-2"
            data-testid="quiz-close-btn"
          >
            {allAnswered ? "Tutup" : "Nanti Saja"}
          </button>
          {isDone && !isLast && (
            <button
              onClick={() => setCurrent(current + 1)}
              className="btn-primary !py-2"
              data-testid="quiz-next-btn"
            >
              Soal Berikutnya <ArrowRight size={14} />
            </button>
          )}
          {isDone && isLast && allAnswered && (
            <button
              onClick={onClose}
              className="btn-primary !py-2"
              data-testid="quiz-selesai-btn"
            >
              Selesai <Check size={14} />
            </button>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
