import React from "react";
import { motion } from "framer-motion";
import useT from "../hooks/useT";

export default function ClueUnlockedToast({ clue, onClose }) {
  const t = useT();
  return (
    <motion.div
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 300, opacity: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 26 }}
      className="fixed bottom-6 right-6 z-[70] w-[320px] bg-paper border-l-8 border-maroon shadow-floating rounded-md p-4 cursor-pointer"
      onClick={onClose}
      data-testid={`clue-toast-${clue.id}`}
    >
      <div className="text-[10px] font-mono uppercase tracking-widest text-maroon">
        {t("toast.new")}
      </div>
      <div className="font-display font-bold text-primary text-lg mt-1">{clue.title}</div>
      <div className="text-primary/85 text-sm mt-1 font-body line-clamp-2">
        {clue.description}
      </div>
      <div className="text-[10px] font-mono uppercase tracking-widest text-primary/85 mt-2">
        {t("toast.savedHint")}
      </div>
    </motion.div>
  );
}
