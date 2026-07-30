import { useEffect } from "react";
import { useGame } from "../context/GameContext";

// Audio disabled - no external CDN dependencies
// To enable audio: add MP3 file to /public/assets/audio/background-music.mp3

export default function AudioManager() {
  const { state } = useGame();

  // Global click handler for sound effects (no actual audio playing)
  useEffect(() => {
    const handleClick = () => {
      // Audio feedback disabled - no external dependencies
      // Uncomment below to re-enable when audio files are added
      // if (clickAudioRef.current) {
      //   clickAudioRef.current.currentTime = 0;
      //   clickAudioRef.current.play().catch(() => {});
      // }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
}
