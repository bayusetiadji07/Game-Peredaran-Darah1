import React from "react";
import { Construction, ArrowLeft } from "lucide-react";
import SceneShell from "../components/SceneShell";
import { useGame } from "../context/GameContext";
import { playClick } from "../components/AudioManager";

export default function SceneComingSoon({ number }) {
  const { goToScene } = useGame();
  return (
    <SceneShell bgUrl="/assets/background/bg-uks.png" sceneTag="Belum Tersedia" ssiTag="Iterasi Berikutnya">
      <div className="absolute inset-0 grid place-items-center p-6">
        <div className="paper-bg max-w-lg text-center rounded-2xl border-2 border-primary/15 shadow-floating p-8">
          <div className="mx-auto grid place-items-center h-16 w-16 rounded-full bg-mustard/20 text-mustard mb-4">
            <Construction size={30} />
          </div>
          <div className="tag-concept mb-3 mx-auto">Scene {number} · Segera Hadir</div>
          <h2 className="font-display font-bold text-primary text-3xl">Investigasi Selanjutnya Sedang Disiapkan</h2>
          <p className="mt-3 text-primary/70 font-body">
            Scene 4–7 (Ruang Organ, Interogasi Saksi, Ruang Kesimpulan, Epilog) akan dibangun di iterasi berikutnya.
            Terima kasih atas kesabaranmu, Detektif!
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <button
              onClick={() => {
                playClick();
                goToScene(0);
              }}
              className="btn-secondary"
              data-testid="coming-soon-menu-btn"
            >
              <ArrowLeft size={16} /> Ke Menu Utama
            </button>
          </div>
        </div>
      </div>
    </SceneShell>
  );
}
