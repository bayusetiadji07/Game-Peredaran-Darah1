import { useEffect, useRef } from "react";
import { useGame } from "../context/GameContext";

// Mysterious low-fi background music (CC0). Fallback: silent if fails.
const MUSIC_URL = "https://cdn.pixabay.com/download/audio/2022/03/15/audio_e77d47ac60.mp3?filename=mysterious-suspense-crime-scene-116959.mp3";

export default function AudioManager() {
  const { state } = useGame();
  const audioRef = useRef(null);

  useEffect(() => {
    if (!audioRef.current) {
      const el = new Audio(MUSIC_URL);
      el.loop = true;
      el.volume = state.audio.volume;
      el.preload = "auto";
      audioRef.current = el;
    }
    const el = audioRef.current;
    el.muted = state.audio.muted;

    if (state.currentScene > 0) {
      // attempt to play (may be blocked until user gesture)
      const p = el.play();
      if (p && p.catch) p.catch(() => {});
    }
    return () => {};
  }, [state.currentScene, state.audio.muted]);

  return null;
}

// Click SFX helper
let _clickAudio = null;
export function playClick() {
  try {
    if (!_clickAudio) {
      _clickAudio = new Audio(
        "https://cdn.pixabay.com/download/audio/2022/03/10/audio_2ba8a0e5c2.mp3?filename=click-124467.mp3"
      );
      _clickAudio.volume = 0.35;
    }
    _clickAudio.currentTime = 0;
    const p = _clickAudio.play();
    if (p && p.catch) p.catch(() => {});
  } catch (e) {}
}
