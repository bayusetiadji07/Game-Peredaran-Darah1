import React from "react";
import { AnimatePresence } from "framer-motion";
import { GameProvider, useGame } from "./context/GameContext";
import Scene0SplashMenu from "./scenes/Scene0SplashMenu";
import Scene1Briefing from "./scenes/Scene1Briefing";
import Scene2Symptoms from "./scenes/Scene2Symptoms";
import Scene3Lab from "./scenes/Scene3Lab";
import Scene4Organs from "./scenes/Scene4Organs";
import Scene5Interrogation from "./scenes/Scene5Interrogation";
import SceneComingSoon from "./scenes/SceneComingSoon";
import AudioManager from "./components/AudioManager";
import "./App.css";

function SceneRouter() {
  const { state } = useGame();
  const scene = state.currentScene;

  const renderScene = () => {
    switch (scene) {
      case 0:
        return <Scene0SplashMenu key="s0" />;
      case 1:
        return <Scene1Briefing key="s1" />;
      case 2:
        return <Scene2Symptoms key="s2" />;
      case 3:
        return <Scene3Lab key="s3" />;
      case 4:
        return <Scene4Organs key="s4" />;
      case 5:
        return <Scene5Interrogation key="s5" />;
      default:
        return <SceneComingSoon key={`sc${scene}`} number={scene} />;
    }
  };

  return (
    <div className="fixed inset-0 grid place-items-center bg-[#0a0806] p-2 md:p-4">
      <div
        className="relative w-full h-full max-w-[1600px] max-h-[900px] rounded-2xl overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.6)] border border-primary/20 bg-cream"
        data-testid="game-viewport"
      >
        <AnimatePresence mode="wait">{renderScene()}</AnimatePresence>
        <AudioManager />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <GameProvider>
      <SceneRouter />
    </GameProvider>
  );
}
