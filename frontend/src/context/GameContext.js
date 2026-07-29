import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "detektif_peredaran_darah_state_v1";

const defaultState = {
  player: { name: "", avatarId: "avatar-detektif-1" },
  currentScene: 0,
  journal: { clues: [] }, // {id,title,category,description,unlockedInScene}
  quizAnswers: {},
  labData: { hbLevel: null, eritrosit: null, mcv: null },
  score: { symptomQuiz: 0, labSort: 0, reasoningFlow: 0, reflectionQuiz: 0, total: 0 },
  playTimeSeconds: 0,
  audio: { muted: false, volume: 0.4 },
  startedAt: null,
};

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...defaultState };
    return { ...defaultState, ...JSON.parse(raw) };
  } catch (e) {
    return { ...defaultState };
  }
}

const GameContext = createContext(null);

export function GameProvider({ children }) {
  const [state, setState] = useState(loadState);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      // ignore
    }
  }, [state]);

  // Accurate play-time tracker: increment 1s every second while:
  //  - player has a name (game has started)
  //  - current scene is not the final epilog (scene 7) OR epilog quiz not fully answered — keep it simple: stop when reset.
  //  - document is visible (pauses when tab hidden)
  useEffect(() => {
    let intervalId = null;
    const shouldTick = () =>
      !!state.player.name && document.visibilityState === "visible";

    const start = () => {
      if (intervalId) return;
      intervalId = window.setInterval(() => {
        setState((s) => {
          if (!s.player.name) return s;
          return { ...s, playTimeSeconds: (s.playTimeSeconds || 0) + 1 };
        });
      }, 1000);
    };
    const stop = () => {
      if (intervalId) {
        window.clearInterval(intervalId);
        intervalId = null;
      }
    };

    if (shouldTick()) start();
    else stop();

    const onVis = () => {
      if (shouldTick()) start();
      else stop();
    };
    document.addEventListener("visibilitychange", onVis);
    return () => {
      document.removeEventListener("visibilitychange", onVis);
      stop();
    };
  }, [state.player.name]);

  const actions = useMemo(
    () => ({
      setPlayer: (name, avatarId) =>
        setState((s) => ({
          ...s,
          player: { name, avatarId },
          startedAt: s.startedAt || Date.now(),
        })),
      goToScene: (n) => setState((s) => ({ ...s, currentScene: n })),
      addClue: (clue) =>
        setState((s) => {
          if (s.journal.clues.some((c) => c.id === clue.id)) return s;
          return {
            ...s,
            journal: { clues: [...s.journal.clues, clue] },
          };
        }),
      answerQuiz: (id, value) =>
        setState((s) => ({ ...s, quizAnswers: { ...s.quizAnswers, [id]: value } })),
      setLabData: (partial) =>
        setState((s) => ({ ...s, labData: { ...s.labData, ...partial } })),
      addScore: (key, delta) =>
        setState((s) => {
          const nextScore = { ...s.score, [key]: (s.score[key] || 0) + delta };
          nextScore.total =
            nextScore.symptomQuiz + nextScore.labSort + nextScore.reasoningFlow + nextScore.reflectionQuiz;
          return { ...s, score: nextScore };
        }),
      toggleMute: () => setState((s) => ({ ...s, audio: { ...s.audio, muted: !s.audio.muted } })),
      reset: () => {
        localStorage.removeItem(STORAGE_KEY);
        setState({ ...defaultState });
      },
    }),
    []
  );

  return (
    <GameContext.Provider value={{ state, ...actions }}>{children}</GameContext.Provider>
  );
}

export const useGame = () => {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGame must be used inside GameProvider");
  return ctx;
};
