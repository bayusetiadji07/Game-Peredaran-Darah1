import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, HelpCircle, Info, LogOut, ArrowRight, Heart, Check, Loader2 } from "lucide-react";
import { useGame } from "../context/GameContext";
import { AVATARS } from "../data/gameContent";
import { playClick } from "../components/AudioManager";
import { preloadAssets, PRELOAD_TOTAL } from "../utils/assetPreloader";
import useT from "../hooks/useT";

export default function Scene0SplashMenu() {
  const { state, setPlayer, goToScene } = useGame();
  const t = useT();
  const [mode, setMode] = useState("menu"); // menu | avatar | help | about
  const [name, setName] = useState(state.player.name || "");
  const [avatarId, setAvatarId] = useState(state.player.avatarId);
  const [preloadDone, setPreloadDone] = useState(false);
  const [preloadCount, setPreloadCount] = useState(0);

  useEffect(() => {
    let cancelled = false;
    preloadAssets({
      onProgress: (loaded) => {
        if (!cancelled) setPreloadCount(loaded);
      },
    }).then(() => {
      if (!cancelled) setPreloadDone(true);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const preloadPct = Math.min(100, Math.round((preloadCount / PRELOAD_TOTAL) * 100));

  return (
    <div className="relative w-full min-h-screen parchment-bg">
      {/* Decorative background microscope + cells motif */}
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none">
        <div className="absolute top-10 left-10 text-[220px] font-display text-primary">🔬</div>
        <div className="absolute bottom-10 right-10 text-[180px] font-display text-maroon">🩸</div>
      </div>
      <div className="absolute inset-0 bg-grain opacity-30 mix-blend-multiply pointer-events-none" />

      <div className="relative z-10 w-full min-h-screen grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* LEFT — brand */}
        <div className="flex flex-col justify-center gap-6 px-8 md:px-14 lg:px-20 py-10">
          <div className="flex items-center gap-3">
            <div className="tag-ssi">{t("menu.tagline")}</div>
            <div className="tag-concept">{t("menu.subtitleConcept")}</div>
          </div>
          <h1 className="font-display font-black text-primary tracking-tight leading-[0.95] text-[clamp(2.4rem,5.4vw,4.6rem)]">
            {t("menu.title.line1")} <br />
            <span className="text-maroon italic">{t("menu.title.line2")}</span> <br />
            {t("menu.title.line3")}
          </h1>
          <p className="max-w-md font-body text-primary/80 text-lg leading-relaxed">
            {t("menu.hero.body")}
          </p>

          <AnimatePresence mode="wait">
            {mode === "menu" && (
              <motion.div
                key="menu"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                className="flex flex-col gap-3 mt-2 max-w-sm"
              >
                <button
                  data-testid="menu-mulai-btn"
                  onClick={() => {
                    playClick();
                    setMode("avatar");
                  }}
                  className="btn-primary justify-between !py-4 !text-lg group"
                >
                  <span className="flex items-center gap-3">
                    <Play size={20} /> {t("menu.mulai")}
                  </span>
                  <ArrowRight className="group-hover:translate-x-1 transition" size={18} />
                </button>
                <button
                  data-testid="menu-carabermain-btn"
                  onClick={() => {
                    playClick();
                    setMode("help");
                  }}
                  className="btn-secondary justify-between"
                >
                  <span className="flex items-center gap-3">
                    <HelpCircle size={18} /> {t("menu.caraBermain")}
                  </span>
                </button>
                <button
                  data-testid="menu-tentang-btn"
                  onClick={() => {
                    playClick();
                    setMode("about");
                  }}
                  className="btn-secondary justify-between"
                >
                  <span className="flex items-center gap-3">
                    <Info size={18} /> {t("menu.tentang")}
                  </span>
                </button>
                <button
                  data-testid="menu-keluar-btn"
                  onClick={() => {
                    if (window.confirm(t("menu.keluar") + "?")) window.close();
                  }}
                  className="btn-ghost self-start !text-primary/80"
                >
                  <LogOut size={16} /> {t("menu.keluar")}
                </button>
              </motion.div>
            )}

            {mode === "avatar" && (
              <motion.div
                key="avatar"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                className="mt-2 max-w-lg"
              >
                <h3 className="heading-detective text-2xl mb-2">{t("avatar.title")}</h3>
                <p className="text-primary/85 mb-4 font-body">
                  {t("avatar.subtitle")}
                </p>
                <label className="block font-mono uppercase tracking-widest text-xs text-primary/85 mb-1">
                  {t("avatar.namaLabel")}
                </label>
                <input
                  data-testid="avatar-name-input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t("avatar.namaPlaceholder")}
                  maxLength={30}
                  className="w-full bg-paper border-2 border-primary/30 focus:border-maroon outline-none rounded-lg px-4 py-3 font-body text-primary text-lg placeholder:text-primary/80"
                />
                <div className="mt-5">
                  <div className="font-mono uppercase tracking-widest text-xs text-primary/85 mb-2">
                    {t("avatar.pilihAvatar")}
                  </div>
                  <div className="grid grid-cols-4 gap-3">
                    {AVATARS.map((a) => (
                      <button
                        key={a.id}
                        data-testid={`avatar-choice-${a.id}`}
                        onClick={() => {
                          playClick();
                          setAvatarId(a.id);
                        }}
                        className={`relative aspect-square rounded-xl overflow-hidden bg-paper border-2 transition-all ${
                          avatarId === a.id
                            ? "border-maroon shadow-card scale-[1.03]"
                            : "border-primary/20 hover:border-primary/60"
                        }`}
                      >
                        <img src={a.src} alt={a.name} className="w-full h-full object-cover" />
                        {avatarId === a.id && (
                          <span className="absolute top-1 right-1 bg-maroon text-cream rounded-full p-1">
                            <Check size={12} />
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => setMode("menu")}
                    className="btn-secondary"
                    data-testid="avatar-back-btn"
                  >
                    {t("avatar.kembali")}
                  </button>
                  <button
                    disabled={!name.trim()}
                    data-testid="avatar-mulai-btn"
                    onClick={() => {
                      playClick();
                      setPlayer(name.trim(), avatarId);
                      goToScene(1);
                    }}
                    className={`btn-primary !py-3 ${!name.trim() ? "opacity-40 cursor-not-allowed" : ""}`}
                  >
                    {t("menu.mulai")} <ArrowRight size={18} />
                  </button>
                </div>
              </motion.div>
            )}

            {mode === "help" && <InfoPanel title="Cara Bermain" onClose={() => setMode("menu")}>
              <ul className="list-disc pl-5 space-y-2 text-primary/85 font-body">
                <li>Ikuti alur cerita dari <b>Scene 0</b> sampai <b>Scene 7</b>.</li>
                <li>Klik <b>hotspot</b> berdenyut untuk memeriksa gejala pasien.</li>
                <li>Setiap bukti otomatis masuk ke <b>Jurnal Investigasi</b> (kanan atas).</li>
                <li>Selesaikan <b>mini-game</b> (kuis, drag-drop, papan bukti) untuk memperoleh skor.</li>
                <li>Progresmu tersimpan otomatis di browser ini.</li>
              </ul>
            </InfoPanel>}

            {mode === "about" && <InfoPanel title="Tentang Game" onClose={() => setMode("menu")}>
              <p className="text-primary/85 font-body">
                <b>Detektif Peredaran Darah</b> adalah game edukasi berbasis SSI (Socio-Scientific Issues)
                untuk siswa SMP kelas VIII. Melalui kasus fiktif Rani, kamu belajar cara kerja sistem peredaran
                darah, hemoglobin, dan bagaimana faktor sosial (pola makan, gender, akses gizi) memengaruhi
                kesehatan remaja putri.
              </p>
              <p className="text-primary/85 font-body mt-3 text-sm">
                Disusun oleh Vita Mila Sari, S.Pd.
              </p>
            </InfoPanel>}
          </AnimatePresence>
        </div>

        {/* RIGHT — beating heart illustration */}
        <div className="relative hidden md:flex items-center justify-center">
          <div className="absolute inset-8 rounded-3xl bg-primary/5 border border-primary/10" />
          <motion.div
            className="relative"
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
          >
            <img
              src="/assets/ilustrasi/jantung-splash.png"
              alt="Jantung berdenyut"
              className="w-[min(70%,520px)] mx-auto drop-shadow-[0_20px_40px_rgba(139,30,30,0.35)]"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
            {/* fallback heart if image missing */}
            <Heart
              className="absolute inset-0 mx-auto text-maroon w-[280px] h-[280px] opacity-70 -z-10"
              fill="currentColor"
              strokeWidth={0}
            />
          </motion.div>
          <div className="absolute bottom-6 right-6 font-mono text-xs uppercase tracking-widest text-primary/80 flex items-center gap-2" data-testid="preload-status">
            {!preloadDone ? (
              <>
                <Loader2 size={12} className="animate-spin" />
                <span>{t("preload.loading")} · {preloadPct}%</span>
              </>
            ) : (
              <>
                <Check size={12} className="text-teal-dark" />
                <span>{t("preload.done")} · v1.0</span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoPanel({ title, children, onClose, closeLabel }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      className="mt-2 max-w-lg bg-paper border-2 border-primary/20 rounded-2xl p-6 shadow-paper"
    >
      <h3 className="heading-detective text-2xl mb-3">{title}</h3>
      <div className="space-y-3">{children}</div>
      <div className="mt-5">
        <button onClick={onClose} className="btn-primary" data-testid={`info-close-${title}`}>
          {closeLabel || "Mengerti"}
        </button>
      </div>
    </motion.div>
  );
}
