import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, FileText, Printer } from "lucide-react";
import { useGame } from "../context/GameContext";
import { CATEGORY_COLOR } from "../data/gameContent";
import { playClick } from "./AudioManager";
import useT from "../hooks/useT";

const colorClasses = {
  maroon: {
    ring: "border-l-maroon",
    chip: "bg-maroon text-cream",
  },
  teal: {
    ring: "border-l-teal",
    chip: "bg-teal text-cream",
  },
  mustard: {
    ring: "border-l-mustard",
    chip: "bg-mustard text-ink",
  },
};

const rotations = ["-rotate-1", "rotate-1", "rotate-0", "-rotate-2", "rotate-2"];

export default function Journal({ open, onClose }) {
  const { state } = useGame();
  const t = useT();
  const CATEGORY_LABEL = {
    gejala: t("category.gejala"),
    medis: t("category.medis"),
    gayaHidup: t("category.gayaHidup"),
  };
  const grouped = state.journal.clues.reduce((acc, c) => {
    (acc[c.category] = acc[c.category] || []).push(c);
    return acc;
  }, {});

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="jurnal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm grid place-items-center p-4"
          onClick={onClose}
          data-testid="journal-overlay"
        >
          <motion.div
            initial={{ scale: 0.9, y: 30, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", stiffness: 220, damping: 24 }}
            className="cork-bg relative w-full max-w-5xl h-[85vh] rounded-2xl border-[6px] border-maroon-dark shadow-floating overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            data-testid="journal-modal"
          >
            {/* Header strip */}
            <div className="absolute top-0 inset-x-0 flex items-center justify-between bg-primary/95 text-cream px-6 py-3 border-b-2 border-primary-900">
              <div className="flex items-center gap-3">
                <FileText size={22} />
                <div>
                  <h2 className="font-display font-bold text-xl leading-tight tracking-tight">
                    {t("journal.title")}
                  </h2>
                  <p className="text-cream/70 text-xs font-mono uppercase tracking-widest">
                    {state.journal.clues.length} {t("journal.count")}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  data-testid="journal-print-btn"
                  onClick={() => {
                    playClick();
                    window.print();
                  }}
                  className="hidden md:flex items-center gap-2 bg-cream/10 hover:bg-cream/20 border border-cream/20 rounded-full px-3 py-1.5 text-xs font-mono uppercase tracking-widest"
                >
                  <Printer size={14} /> {t("journal.cetak")}
                </button>
                <button
                  data-testid="journal-close-btn"
                  onClick={() => {
                    playClick();
                    onClose();
                  }}
                  className="grid h-9 w-9 place-items-center rounded-full bg-cream text-primary hover:bg-maroon hover:text-cream transition"
                  aria-label="Tutup jurnal"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Cork board body */}
            <div className="absolute inset-0 pt-[70px] pb-4 px-6 overflow-y-auto">
              {state.journal.clues.length === 0 ? (
                <EmptyJournal t={t} />
              ) : (
                <div className="space-y-8 pb-6">
                  {Object.keys(CATEGORY_LABEL).map((cat) => {
                    const list = grouped[cat] || [];
                    if (list.length === 0) return null;
                    const color = CATEGORY_COLOR[cat];
                    return (
                      <section key={cat} data-testid={`journal-section-${cat}`}>
                        <header className="flex items-center gap-3 mb-3">
                          <span
                            className={`px-3 py-1 rounded-full font-body font-semibold text-xs uppercase tracking-widest ${colorClasses[color].chip}`}
                          >
                            {CATEGORY_LABEL[cat]}
                          </span>
                          <div className="flex-1 h-[3px] dashed-string opacity-70" />
                          <span className="font-mono text-xs text-cream/80">
                            {list.length} {t("journal.cards")}
                          </span>
                        </header>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                          {list.map((clue, i) => (
                            <ClueCard key={clue.id} clue={clue} rotate={rotations[i % rotations.length]} />
                          ))}
                        </div>
                      </section>
                    );
                  })}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function EmptyJournal({ t }) {
  return (
    <div className="h-full min-h-[300px] grid place-items-center">
      <div className="text-center max-w-md bg-paper/95 rounded-lg p-8 shadow-paper border border-primary/10 relative">
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-4 bg-maroon/70 rotate-[3deg] rounded-sm" />
        <h3 className="font-display text-2xl text-primary mb-2">{t("journal.empty.title")}</h3>
        <p className="text-primary/70 font-body">
          {t("journal.empty.body")}
        </p>
      </div>
    </div>
  );
}

function ClueCard({ clue, rotate }) {
  const color = CATEGORY_COLOR[clue.category];
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className={`relative bg-paper/98 border-l-8 ${colorClasses[color].ring} shadow-pinned rounded-sm p-4 transform ${rotate} hover:rotate-0 hover:scale-[1.02] transition-transform`}
      data-testid={`clue-card-${clue.id}`}
    >
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-14 h-4 bg-maroon/60 rounded-sm rotate-[2deg] shadow-sm" />
      <h4 className="font-display font-bold text-primary text-lg leading-tight">{clue.title}</h4>
      <p className="text-primary/85 text-sm mt-1 font-body">{clue.description}</p>
      <div className="mt-2 text-[10px] font-mono uppercase tracking-widest text-primary/60">
        Scene {clue.unlockedInScene}
      </div>
    </motion.div>
  );
}
