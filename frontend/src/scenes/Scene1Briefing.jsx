import React from "react";
import SceneShell from "../components/SceneShell";
import DialogBox from "../components/DialogBox";
import { SCENE1_DIALOG } from "../data/gameContent";
import { useGame } from "../context/GameContext";

export default function Scene1Briefing() {
  const { goToScene } = useGame();

  return (
    <SceneShell
      bgUrl="/assets/background/bg-uks.png"
      sceneTag="Fungsi Sistem Peredaran Darah"
      ssiTag="Gejala sering dianggap ‘biasa’"
    >
      {/* Scene label */}
      <div className="absolute left-6 top-24 md:top-28 z-20">
        <div className="bg-primary text-cream px-4 py-2 rounded-r-full shadow-card font-mono uppercase tracking-widest text-xs">
          Scene 1 · Ruang UKS
        </div>
        <h1 className="mt-3 font-display font-bold text-cream text-3xl md:text-5xl drop-shadow-[0_4px_10px_rgba(0,0,0,0.6)] max-w-lg leading-tight">
          Briefing Kasus
        </h1>
        <p className="mt-2 max-w-md text-cream/85 font-body drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]">
          Bu Nita, guru UKS, menjelaskan kondisi Rani. Dengarkan baik-baik — dari sini semua investigasi bermula.
        </p>
      </div>

      <DialogBox lines={SCENE1_DIALOG} onComplete={() => goToScene(2)} />
    </SceneShell>
  );
}
