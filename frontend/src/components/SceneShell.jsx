import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HUD from "./HUD";
import Journal from "./Journal";

/**
 * Common scene shell providing HUD + Journal + background image.
 * Props:
 *  - bgUrl: string
 *  - sceneTag, ssiTag
 *  - children
 */
export default function SceneShell({ bgUrl, sceneTag, ssiTag, children, className = "" }) {
  const [journalOpen, setJournalOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className={`relative w-full h-full overflow-hidden ${className}`}
    >
      {/* Background */}
      {bgUrl && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${bgUrl})` }}
        />
      )}
      {/* Vignette + grain */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_45%,rgba(0,0,0,0.55))]" />
      <div className="absolute inset-0 bg-grain opacity-40 mix-blend-multiply pointer-events-none" />

      <HUD sceneTag={sceneTag} ssiTag={ssiTag} onOpenJournal={() => setJournalOpen(true)} />
      <Journal open={journalOpen} onClose={() => setJournalOpen(false)} />

      {/* Scene content */}
      <AnimatePresence mode="wait">
        <motion.div
          key="scene-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="relative w-full h-full"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
