/**
 * AssetPreloader - preloads all game images to avoid flicker at first scene transition.
 * Audio is disabled to avoid CDN/404 issues.
 */

const IMAGES = [
  "/assets/background/bg-uks.png",
  "/assets/background/bg-laboratorium.png",
  "/assets/background/bg-rumah-rani.png",
  "/assets/background/bg-kantin.png",
  "/assets/ilustrasi/jantung-splash.png",
  "/assets/ilustrasi/diagram-peredaran-darah.png",
  "/assets/ilustrasi/diagram-sel-darah.png",
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
  "/assets/ikon/jurnal-investigasi.png",
];

const cache = { images: new Map() };

export function preloadAssets({ onProgress } = {}) {
  const total = IMAGES.length;
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
        resolve();
      };
      img.src = src;
    });
  });

  return Promise.all(imagePromises).then(() => ({ loaded, total }));
}

export const PRELOAD_TOTAL = IMAGES.length;
