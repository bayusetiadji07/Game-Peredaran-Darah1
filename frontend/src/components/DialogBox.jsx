import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { playClick } from "./AudioManager";
import useT from "../hooks/useT";

/**
 * VisualNovel dialog box with typewriter effect.
 * Props:
 *  - lines: [{speaker, portrait, text, isFinal?}]
 *  - onComplete: called when the last line is closed
 *  - initialLine: index
 */
export default function DialogBox({ lines, onComplete }) {
  const t = useT();
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const timerRef = useRef(null);

  const current = lines[index];

  useEffect(() => {
    setDisplayed("");
    setDone(false);
    if (!current) return;
    let i = 0;
    const speed = 22; // ms/char
    timerRef.current = setInterval(() => {
      i += 1;
      setDisplayed(current.text.slice(0, i));
      if (i >= current.text.length) {
        clearInterval(timerRef.current);
        setDone(true);
      }
    }, speed);
    return () => clearInterval(timerRef.current);
  }, [index, current]);

  const handleClick = () => {
    playClick();
    if (!done) {
      // skip typewriter
      clearInterval(timerRef.current);
      setDisplayed(current.text);
      setDone(true);
      return;
    }
    if (index < lines.length - 1) {
      setIndex(index + 1);
    } else {
      onComplete && onComplete();
    }
  };

  if (!current) return null;

  return (
    <div className="absolute inset-x-0 bottom-0 z-30 px-4 md:px-10 pb-6">
      {/* portrait */}
      <div className="pointer-events-none absolute left-6 md:left-10 bottom-[calc(100%-30px)] hidden sm:block">
        <AnimatePresence mode="wait">
          <motion.img
            key={current.portrait + index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            src={current.portrait}
            alt={current.speaker}
            className="h-[46vh] max-h-[520px] w-auto object-contain drop-shadow-[0_20px_20px_rgba(0,0,0,0.35)]"
          />
        </AnimatePresence>
      </div>

      <motion.button
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 240, damping: 24 }}
        onClick={handleClick}
        data-testid="dialog-box"
        className="relative w-full max-w-4xl mx-auto text-left paper-bg border-t-4 border-primary rounded-t-2xl rounded-b-md px-6 md:px-8 py-5 md:py-6 shadow-floating hover:shadow-[0_-4px_30px_rgba(139,30,30,0.35)] transition-shadow cursor-pointer group"
      >
        {/* Nametag */}
        <div className="absolute -top-4 left-6 bg-maroon text-cream px-4 py-1.5 rounded-full shadow-card font-display font-semibold tracking-wide text-sm">
          {current.speaker}
        </div>
        <p className="font-body text-primary text-base md:text-lg leading-relaxed pr-10 min-h-[3.5em]">
          {displayed}
          {!done && <span className="inline-block w-[8px] h-[1.1em] align-middle bg-primary/70 ml-0.5 animate-blink" />}
        </p>
        <div className="absolute bottom-3 right-4 flex items-center gap-1 text-primary/80 font-mono text-xs">
          <span>{done ? (current.isFinal || index === lines.length - 1 ? t("dialog.mulai") : t("dialog.lanjut")) : t("dialog.skip")}</span>
          <ChevronRight
            size={16}
            className="animate-float-y group-hover:translate-x-1 transition"
          />
        </div>
        <div className="absolute bottom-3 left-4 font-mono text-[10px] tracking-widest uppercase text-primary/85">
          {index + 1} / {lines.length}
        </div>
      </motion.button>
    </div>
  );
}
