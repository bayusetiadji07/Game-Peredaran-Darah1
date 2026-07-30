import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HUD from "./HUD";
import Journal from "./Journal";

export default function SceneShell({ bgUrl, sceneTag, ssiTag, children, className = "" }) {
  const [journalOpen, setJournalOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className={`relative w-full min-h-screen ${className}`}
    >
      {bgUrl ? (
        <div
          className="fixed inset-0 bg-cover bg-center bg-no-repeat bg-[#1F3864] -z-10"
          style={{ backgroundImage: `url(${bgUrl})` }}
        />
      ) : (
        <div className="fixed inset-0 bg-gradient-to-b from-primary to-maroon -z-10" />
      )}

      <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,transparent_45%,rgba(0,0,0,0.55))] -z-10" />

      <HUD sceneTag={sceneTag} ssiTag={ssiTag} onOpenJournal={() => setJournalOpen(true)} />
      <Journal open={journalOpen} onClose={() => setJournalOpen(false)} />

      <AnimatePresence mode="wait">
        <motion.div
          key="scene-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="relative w-full min-h-screen"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
