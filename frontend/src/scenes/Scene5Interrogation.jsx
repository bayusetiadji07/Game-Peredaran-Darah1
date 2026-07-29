import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, X, MapPin, MessageCircleQuestion, Home, Utensils, AlertCircle } from "lucide-react";
import SceneShell from "../components/SceneShell";
import ClueUnlockedToast from "../components/ClueUnlockedToast";
import { SCENE5_LOCATIONS, SCENE5_WITNESSES, SCENE5_REFLECTION } from "../data/gameContent";
import { useGame } from "../context/GameContext";
import { playClick } from "../components/AudioManager";

export default function Scene5Interrogation() {
  const { state, addClue, addScore, answerQuiz, goToScene } = useGame();

  const [location, setLocation] = useState("rumah"); // 'rumah' | 'kantin'
  const [activeWitnessId, setActiveWitnessId] = useState(null);
  const [askedQuestions, setAskedQuestions] = useState({}); // {witnessId: Set(qid)}
  const [currentQA, setCurrentQA] = useState(null); // {witnessId, question}
  const [reflectionOpen, setReflectionOpen] = useState(false);
  const [reflChosen, setReflChosen] = useState(null);
  const [toast, setToast] = useState(null);

  const clueIdsAdded = useMemo(
    () => new Set(state.journal.clues.map((c) => c.id)),
    [state.journal.clues]
  );

  const witnessesAtLocation = SCENE5_WITNESSES.filter((w) => w.location === location);
  const activeWitness = SCENE5_WITNESSES.find((w) => w.id === activeWitnessId) || null;

  // A witness is "cleared" (all 3 questions asked)
  const isWitnessCleared = (wid) => {
    const w = SCENE5_WITNESSES.find((x) => x.id === wid);
    const asked = askedQuestions[wid] || new Set();
    return w.questions.every((q) => asked.has(q.id));
  };

  const allCleared = SCENE5_WITNESSES.every((w) => isWitnessCleared(w.id));
  const reflectionDone = !!state.quizAnswers[SCENE5_REFLECTION.id];

  const openWitness = (wid) => {
    playClick();
    setActiveWitnessId(wid);
  };

  const askQuestion = (question) => {
    playClick();
    setCurrentQA({ witnessId: activeWitness.id, question });
    // Mark asked
    setAskedQuestions((prev) => {
      const set = new Set(prev[activeWitness.id] || []);
      set.add(question.id);
      return { ...prev, [activeWitness.id]: set };
    });
    // Unlock clue
    const clue = question.clue;
    if (!clueIdsAdded.has(clue.id)) {
      addClue(clue);
      addScore("reasoningFlow", 5);
      setToast(clue);
      window.setTimeout(() => setToast(null), 3400);
    }
  };

  const closeDialog = () => {
    setCurrentQA(null);
  };

  const handleReflection = (choice) => {
    playClick();
    setReflChosen(choice);
    answerQuiz(SCENE5_REFLECTION.id, choice.id);
    if (choice.correct) addScore("reflectionQuiz", 15);
  };

  const bgUrl = SCENE5_LOCATIONS[location].bg;

  return (
    <SceneShell
      bgUrl={bgUrl}
      sceneTag="Asupan Fe · Menstruasi · Kehilangan darah"
      ssiTag="Norma sosial, gender & akses gizi"
    >
      {/* Scene label */}
      <div className="absolute left-6 top-24 md:top-28 z-20">
        <div className="bg-primary text-cream px-4 py-2 rounded-r-full shadow-card font-mono uppercase tracking-widest text-xs">
          Scene 5 · Interogasi Saksi
        </div>
        <h1 className="mt-3 font-display font-bold text-cream text-3xl md:text-4xl leading-tight drop-shadow-[0_4px_10px_rgba(0,0,0,0.7)]">
          Wawancara Narasumber
        </h1>
      </div>

      {/* Location switcher */}
      <div className="absolute right-6 top-24 md:top-28 z-20 flex items-center gap-2 bg-paper/95 border border-primary/15 shadow-card rounded-full p-1">
        <LocationBtn
          active={location === "rumah"}
          onClick={() => {
            playClick();
            setLocation("rumah");
            setActiveWitnessId(null);
          }}
          icon={<Home size={14} />}
          label={SCENE5_LOCATIONS.rumah.label}
          testid="loc-rumah-btn"
        />
        <LocationBtn
          active={location === "kantin"}
          onClick={() => {
            playClick();
            setLocation("kantin");
            setActiveWitnessId(null);
          }}
          icon={<Utensils size={14} />}
          label={SCENE5_LOCATIONS.kantin.label}
          testid="loc-kantin-btn"
        />
      </div>

      {/* Center stage: witnesses at location */}
      <div className="absolute inset-0 pt-24 md:pt-32 pb-28 px-6 flex items-end justify-center gap-4 md:gap-10 z-10">
        {witnessesAtLocation.map((w) => {
          const cleared = isWitnessCleared(w.id);
          return (
            <button
              key={w.id}
              data-testid={`witness-${w.id}`}
              onClick={() => openWitness(w.id)}
              className="group relative flex flex-col items-end focus:outline-none"
            >
              <div className="relative">
                <img
                  src={w.portrait}
                  alt={w.name}
                  className="h-[52vh] max-h-[560px] w-auto object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.6)] transition-transform group-hover:scale-[1.02]"
                />
                {cleared && (
                  <span className="absolute top-2 -right-2 bg-teal text-cream text-[10px] font-mono uppercase tracking-widest px-2 py-1 rounded-full shadow-card flex items-center gap-1">
                    <Check size={12} /> Lengkap
                  </span>
                )}
              </div>
              <div className="mt-2 bg-paper/95 border border-primary/20 rounded-full px-4 py-1.5 shadow-card">
                <span className="font-display font-semibold text-primary text-sm">{w.name}</span>
                <span className="text-primary/60 text-xs ml-2 font-body">· {w.role.split(",")[0]}</span>
              </div>
            </button>
          );
        })}
        {witnessesAtLocation.length === 0 && (
          <div className="text-cream/80 font-body text-center">Tidak ada saksi di lokasi ini.</div>
        )}
      </div>

      {/* Progress bar bottom bar */}
      <div className="absolute inset-x-0 bottom-4 z-20 flex justify-center px-6">
        <div className="bg-paper border-2 border-primary/15 rounded-full shadow-floating px-6 py-2.5 flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 text-primary font-body text-sm">
            <MapPin size={14} className="text-maroon" />
            <span className="font-mono text-xs uppercase tracking-widest text-primary/60">Saksi</span>
            {SCENE5_WITNESSES.map((w) => {
              const cleared = isWitnessCleared(w.id);
              return (
                <span
                  key={w.id}
                  className={`px-2 py-0.5 rounded-full text-[11px] font-mono ${
                    cleared ? "bg-teal text-cream" : "bg-primary/10 text-primary"
                  }`}
                >
                  {w.name} {cleared ? "✓" : ""}
                </span>
              );
            })}
          </div>
          {!allCleared ? (
            <div className="text-primary/70 font-body text-sm flex items-center gap-1">
              <AlertCircle size={14} /> Wawancarai semua saksi (di kedua lokasi) untuk membuka refleksi.
            </div>
          ) : !reflectionDone ? (
            <button
              data-testid="scene5-open-reflection-btn"
              onClick={() => {
                playClick();
                setReflectionOpen(true);
              }}
              className="btn-primary !py-2"
            >
              Buka Pertanyaan Refleksi <ArrowRight size={16} />
            </button>
          ) : (
            <button
              data-testid="scene5-continue-btn"
              onClick={() => {
                playClick();
                goToScene(6);
              }}
              className="btn-primary !py-2"
            >
              Lanjut ke Ruang Kesimpulan <ArrowRight size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Witness dialog panel */}
      <AnimatePresence>
        {activeWitness && (
          <WitnessDialog
            key={activeWitness.id}
            witness={activeWitness}
            asked={askedQuestions[activeWitness.id] || new Set()}
            onAsk={askQuestion}
            currentQA={currentQA}
            onCloseAnswer={closeDialog}
            onClose={() => {
              playClick();
              setActiveWitnessId(null);
              setCurrentQA(null);
            }}
          />
        )}
      </AnimatePresence>

      {/* Reflection modal */}
      <AnimatePresence>
        {reflectionOpen && (
          <ReflectionModal
            answered={state.quizAnswers[SCENE5_REFLECTION.id]}
            chosen={reflChosen}
            onChoose={handleReflection}
            onClose={() => {
              setReflectionOpen(false);
              setReflChosen(null);
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

function LocationBtn({ active, onClick, icon, label, testid }) {
  return (
    <button
      onClick={onClick}
      data-testid={testid}
      className={`flex items-center gap-2 px-3 py-1.5 rounded-full font-body font-semibold text-sm transition ${
        active ? "bg-primary text-cream shadow-card" : "text-primary/70 hover:bg-primary/10"
      }`}
    >
      {icon} {label}
    </button>
  );
}

function WitnessDialog({ witness, asked, onAsk, currentQA, onCloseAnswer, onClose }) {
  const remaining = witness.questions.filter((q) => !asked.has(q.id));
  return (
    <motion.div
      className="fixed inset-0 z-[65] bg-black/60 grid place-items-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      data-testid="witness-dialog"
    >
      <motion.div
        initial={{ y: 30, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        onClick={(e) => e.stopPropagation()}
        className="paper-bg w-full max-w-3xl rounded-2xl shadow-floating p-0 relative border-t-8 border-primary overflow-hidden"
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-primary text-cream hover:bg-maroon transition"
          data-testid="witness-close-btn"
          aria-label="Tutup wawancara"
        >
          <X size={16} />
        </button>
        <div className="flex flex-col md:flex-row">
          {/* Portrait side */}
          <div className="md:w-[32%] bg-primary/90 p-5 flex flex-col items-center text-cream">
            <img
              src={witness.portrait}
              alt={witness.name}
              className="h-40 md:h-52 w-auto object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]"
            />
            <div className="mt-3 font-display font-bold text-xl">{witness.name}</div>
            <div className="mt-1 text-cream/70 text-xs font-body text-center">{witness.role}</div>
            <div className="mt-3 text-cream/60 font-mono text-[10px] uppercase tracking-widest">
              {asked.size}/{witness.questions.length} pertanyaan
            </div>
          </div>
          {/* Dialog side */}
          <div className="md:w-[68%] p-5 md:p-6 min-h-[380px] flex flex-col">
            {!currentQA ? (
              <>
                <div className="tag-concept mb-2">Pengantar</div>
                <p className="font-body text-primary text-lg leading-relaxed">{`"${witness.intro}"`}</p>

                <div className="mt-5 border-t border-primary/15 pt-4 flex-1">
                  <div className="font-mono uppercase tracking-widest text-[10px] text-primary/60 mb-2 flex items-center gap-1">
                    <MessageCircleQuestion size={12} /> Pilih Pertanyaan
                  </div>
                  <div className="space-y-2">
                    {witness.questions.map((q) => {
                      const done = asked.has(q.id);
                      return (
                        <button
                          key={q.id}
                          data-testid={`ask-${q.id}`}
                          onClick={() => onAsk(q)}
                          className={`w-full text-left rounded-lg px-4 py-3 border-2 transition font-body ${
                            done
                              ? "bg-teal/10 border-teal/70 text-teal-dark"
                              : "bg-cream border-primary/20 text-primary hover:border-maroon hover:bg-maroon/5"
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            {done ? <Check size={14} /> : <MessageCircleQuestion size={14} />}
                            {q.text}
                            {done && (
                              <span className="ml-auto font-mono text-[10px] uppercase tracking-widest text-teal-dark">
                                Sudah ditanya
                              </span>
                            )}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </>
            ) : (
              <AnswerPanel
                witness={witness}
                qa={currentQA}
                remaining={remaining.length}
                onNext={onCloseAnswer}
              />
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function AnswerPanel({ witness, qa, remaining, onNext }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex-1 flex flex-col"
    >
      <div className="tag-ssi mb-2">Kamu Bertanya</div>
      <p className="font-body font-semibold text-primary text-base">{`"${qa.question.text}"`}</p>
      <div className="tag-concept mt-4 mb-2 self-start">{witness.name} Menjawab</div>
      <p className="font-body text-primary text-lg leading-relaxed">
        {`"${qa.question.answer}"`}
      </p>
      <div className="mt-auto flex items-center justify-between pt-4 border-t border-primary/15">
        <div className="text-teal-dark font-mono text-xs flex items-center gap-1">
          <Check size={14} /> Petunjuk baru: <b>{qa.question.clue.title}</b>
        </div>
        <button onClick={onNext} className="btn-primary !py-2" data-testid="answer-continue-btn">
          {remaining > 0 ? `Lanjut Bertanya (${remaining} lagi)` : "Selesai"}
          <ArrowRight size={14} />
        </button>
      </div>
    </motion.div>
  );
}

function ReflectionModal({ chosen, answered, onChoose, onClose }) {
  const isDone = !!answered || !!chosen;
  const activeChoice = SCENE5_REFLECTION.choices.find(
    (c) => c.id === (chosen?.id || answered)
  );
  return (
    <motion.div
      className="fixed inset-0 z-[65] bg-black/70 grid place-items-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      data-testid="reflection-modal"
    >
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="paper-bg w-full max-w-2xl rounded-2xl shadow-floating p-8 relative border-t-8 border-mustard"
      >
        <div className="tag-ssi mb-3">Refleksi SSI · Scene 5</div>
        <h3 className="font-display font-bold text-primary text-2xl leading-snug">
          {SCENE5_REFLECTION.question}
        </h3>
        <div className="mt-5 space-y-3">
          {SCENE5_REFLECTION.choices.map((c) => {
            const selected = activeChoice?.id === c.id;
            const revealed = isDone;
            return (
              <button
                key={c.id}
                data-testid={`refl-choice-${c.id}`}
                disabled={isDone}
                onClick={() => onChoose(c)}
                className={`w-full text-left rounded-lg px-4 py-3 border-2 transition font-body ${
                  revealed
                    ? c.correct
                      ? "border-teal bg-teal/15 text-teal-dark"
                      : selected
                      ? "border-maroon bg-maroon/10 text-maroon"
                      : "border-primary/15 bg-paper text-primary/70"
                    : "border-primary/20 bg-paper text-primary hover:border-mustard hover:bg-mustard/5"
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
            data-testid="reflection-feedback"
          >
            <div className="flex items-center gap-2 font-semibold mb-1">
              {activeChoice.correct ? <Check size={16} /> : <AlertCircle size={16} />}
              {activeChoice.correct ? "Refleksi tepat!" : "Perlu dipikir ulang"}
            </div>
            <div>{activeChoice.feedback}</div>
          </div>
        )}
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="btn-secondary"
            data-testid="reflection-close-btn"
          >
            {isDone ? "Tutup" : "Nanti Saja"}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
