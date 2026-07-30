import { useEffect, useRef } from "react";
import { useGame } from "../context/GameContext";

// Audio disabled - no external CDN dependencies
// To enable audio: add MP3 files to /public/assets/audio/click.mp3 and /public/assets/audio/bg-music.mp3

export function playClick() {
  // Audio disabled - no external dependencies
}

export default function AudioManager() {
  const { state } = useGame();

  return null;
}
