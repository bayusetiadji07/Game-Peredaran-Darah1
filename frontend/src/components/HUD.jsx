import React from "react";
import { Volume2, VolumeX, Notebook, RotateCcw, Clock } from "lucide-react";
import { useGame } from "../context/GameContext";
import { playClick } from "./AudioManager";

function fmtTime(sec) {
  const s = Math.max(0, Math.floor(sec || 0));
  const m = Math.floor(s / 60);
  return `${String(m).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
}

export default function HUD({ onOpenJournal, sceneTag, ssiTag }) {
  const { state, toggleMute, reset } = useGame();
  const clueCount = state.journal.clues.length;

  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-40 flex items-start justify-between p-4 md:p-6">
      {/* Left: scene concept tags */}
      <div className="pointer-events-auto flex flex-wrap items-center gap-2 max-w-[55%]">
        {sceneTag && <span className="tag-concept" data-testid="hud-concept-tag">🧪 {sceneTag}</span>}
        {ssiTag && <span className="tag-ssi" data-testid="hud-ssi-tag">⚖ SSI: {ssiTag}</span>}
      </div>

      {/* Right: controls */}
      <div className="pointer-events-auto flex items-center gap-2">
        {state.player.name && (
          <div
            className="hidden md:flex items-center gap-1.5 bg-paper text-primary rounded-full h-11 px-3 shadow-card border border-primary/10 font-mono text-xs tracking-widest"
            data-testid="hud-timer"
            title="Waktu bermain"
          >
            <Clock size={14} className="text-maroon" />
            <span>{fmtTime(state.playTimeSeconds)}</span>
          </div>
        )}
        <button
          data-testid="hud-mute-btn"
          onClick={() => {
            playClick();
            toggleMute();
          }}
          aria-label={state.audio.muted ? "Aktifkan suara" : "Bisukan suara"}
          className="grid h-11 w-11 place-items-center rounded-full bg-paper text-primary shadow-card border border-primary/10 hover:bg-primary hover:text-cream transition"
        >
          {state.audio.muted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>
        <button
          data-testid="hud-reset-btn"
          onClick={() => {
            if (window.confirm("Mulai ulang seluruh investigasi? Progres akan hilang.")) {
              playClick();
              reset();
            }
          }}
          aria-label="Mulai ulang"
          className="hidden md:grid h-11 w-11 place-items-center rounded-full bg-paper text-primary shadow-card border border-primary/10 hover:bg-primary hover:text-cream transition"
        >
          <RotateCcw size={18} />
        </button>
        <button
          data-testid="hud-journal-btn"
          onClick={() => {
            playClick();
            onOpenJournal();
          }}
          className="relative flex items-center gap-2 bg-maroon text-cream pl-3 pr-4 py-2 rounded-full shadow-card border border-maroon-dark hover:bg-maroon-dark transition"
        >
          <Notebook size={20} />
          <span className="font-body font-semibold tracking-wide">Jurnal</span>
          <span
            className="absolute -top-1.5 -right-1.5 min-w-[22px] h-[22px] px-1 grid place-items-center rounded-full bg-mustard text-ink text-[11px] font-bold font-mono border-2 border-cream"
            data-testid="hud-journal-count"
          >
            {clueCount}
          </span>
        </button>
      </div>
    </div>
  );
}
