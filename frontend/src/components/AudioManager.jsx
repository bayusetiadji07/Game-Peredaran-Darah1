import { useEffect, useRef } from "react";
import { useGame } from "../context/GameContext";

// Audio files are served locally (not from an external CDN) so playback
// never depends on a third party's hotlink protection. Add the actual
// files here — see README note in /public/assets/audio/.
const CLICK_SRC = "/assets/audio/click.mp3";
const MUSIC_SRC = "/assets/audio/bg-music.mp3";

// playClick() is called from many components that live outside
// AudioManager's own subtree, so it can't read React state directly.
// AudioManager keeps this module-level mirror of the audio state in sync
// via the effect below, so playClick() still respects mute/volume.
let audioSettings = { muted: false, volume: 0.4 };
let clickAudio = null;

function getClickAudio() {
  if (!clickAudio) {
    clickAudio = new Audio(CLICK_SRC);
  }
  return clickAudio;
}

export function playClick() {
  if (audioSettings.muted) return;
  try {
    const audio = getClickAudio();
    audio.currentTime = 0;
    audio.volume = audioSettings.volume;
    // play() rejects if the file is missing or autoplay is blocked —
    // swallow that instead of breaking the click handler that called us.
    audio.play().catch(() => {});
  } catch {
    // Ignore — never let a click sound crash the UI.
  }
}

export default function AudioManager() {
  const { state } = useGame();
  const musicRef = useRef(null);

  // Keep the module-level mirror in sync so playClick() (called outside
  // React) always reflects the latest mute/volume from GameContext.
  useEffect(() => {
    audioSettings = { muted: state.audio.muted, volume: state.audio.volume };
  }, [state.audio.muted, state.audio.volume]);

  // Create the background-music element once and let the effect below
  // manage play/pause/volume as state.audio changes.
  useEffect(() => {
    const music = new Audio(MUSIC_SRC);
    music.loop = true;
    musicRef.current = music;
    return () => {
      music.pause();
      musicRef.current = null;
    };
  }, []);

  useEffect(() => {
    const music = musicRef.current;
    if (!music) return;
    music.volume = state.audio.volume;
    if (state.audio.muted) {
      music.pause();
    } else {
      // Browsers block autoplay before the first user gesture — this
      // will simply resolve on the first click/tap after mount.
      music.play().catch(() => {});
    }
  }, [state.audio.muted, state.audio.volume]);

  return null;
}
