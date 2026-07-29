/**
 * AssetPreloader — preloads all game images and background audio to avoid
 * flicker at the first scene transition. Reports (loaded, total) progress via callback.
 */

// All static assets referenced by the game (excluding UI icons which are inline SVG)
const IMAGES = [
  // Backgrounds
  "/assets/background/bg-uks.png",
  "/assets/background/bg-laboratorium.png",
  "/assets/background/bg-rumah-rani.png",
  "/assets/background/bg-kantin.png",
  // Illustrations
  "/assets/ilustrasi/jantung-splash.png",
  "/assets/ilustrasi/diagram-peredaran-darah.png",
  "/assets/ilustrasi/diagram-sel-darah.png",
  // Characters
  "/assets/karakter/avatar-detektif-1.png",
  "/assets/karakter/avatar-detektif-2.png",
  "/assets/karakter/avatar-detektif-3.png",
  "/assets/karakter/avatar-detektif-4.png",
  "/assets/karakter/bu-nita-berdiri.png",
  "/assets/karakter/bu-nita-menjelaskan.png",
  "/assets/karakter/dr-salma.png",
  "/assets/karakter/ibu-rani.png",
  "/assets/karakter/rani-pucat.png",
  "/assets/karakter/rani-sehat.png",
  "/assets/karakter/teman-rani.png",
  // Icons
  "/assets/ikon/jurnal-investigasi.png",
];

const AUDIO_URLS = [
  "https://cdn.pixabay.com/download/audio/2022/03/15/audio_e77d47ac60.mp3?filename=mysterious-suspense-crime-scene-116959.mp3",
  "https://cdn.pixabay.com/download/audio/2022/03/10/audio_2ba8a0e5c2.mp3?filename=click-124467.mp3",
];

const cache = { images: new Map(), audios: new Map() };

export function preloadAssets({ onProgress } = {}) {
  const total = IMAGES.length + AUDIO_URLS.length;
  let loaded = 0;
  const bump = () => {
    loaded += 1;
    onProgress && onProgress(loaded, total);
  };

  const imagePromises = IMAGES.map((src) => {
    if (cache.images.has(src)) {
      bump();
      return Promise.resolve();
    }
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        cache.images.set(src, img);
        bump();
        resolve();
      };
      img.onerror = () => {
        bump();
        resolve(); // don't fail — allow game to run even if one asset misses
      };
      img.src = src;
    });
  });

  const audioPromises = AUDIO_URLS.map((src) => {
    if (cache.audios.has(src)) {
      bump();
      return Promise.resolve();
    }
    return new Promise((resolve) => {
      const a = new Audio();
      const done = () => {
        cache.audios.set(src, a);
        bump();
        resolve();
      };
      a.addEventListener("canplaythrough", done, { once: true });
      a.addEventListener("error", done, { once: true });
      // 10s timeout so slow CDN doesn't block gameplay
      setTimeout(done, 10000);
      a.preload = "auto";
      a.src = src;
    });
  });

  return Promise.all([...imagePromises, ...audioPromises]).then(() => ({ loaded, total }));
}

export const PRELOAD_TOTAL = IMAGES.length + AUDIO_URLS.length;
