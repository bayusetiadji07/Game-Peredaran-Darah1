import React from "react";
import { motion } from "framer-motion";

/**
 * Educational close-up SVG diagrams for Scene 2 clue modals.
 * Each diagram shows Rani's condition vs the healthy normal reference,
 * so students can visually understand what they're diagnosing.
 */

const svgProps = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 400 220",
  className: "w-full h-full",
};

function Label({ x, y, children, color = "#1F3864" }) {
  return (
    <text
      x={x}
      y={y}
      fill={color}
      fontFamily="'Space Mono', monospace"
      fontSize="12"
      textAnchor="middle"
      fontWeight="bold"
    >
      {children}
    </text>
  );
}

function ConjungtivaSVG() {
  return (
    <svg {...svgProps}>
      {/* Normal eye */}
      <g transform="translate(20,40)">
        <Label x={80} y={0} color="#0F6674">NORMAL</Label>
        <ellipse cx="80" cy="80" rx="72" ry="45" fill="#FBE7D8" stroke="#1F3864" strokeWidth="2" />
        <circle cx="80" cy="80" r="24" fill="#4A3628" />
        <circle cx="80" cy="80" r="14" fill="#08131f" />
        <circle cx="75" cy="72" r="4" fill="#fff" />
        {/* healthy inner eyelid — pink */}
        <path d="M 20 118 Q 80 155 140 118 L 140 130 Q 80 165 20 130 Z" fill="#E36A6A" stroke="#8B1E1E" strokeWidth="1.5" />
        <Label x={80} y={172} color="#0F6674">konjungtiva merah muda</Label>
      </g>
      {/* Rani's pale eye */}
      <g transform="translate(220,40)">
        <Label x={80} y={0} color="#8B1E1E">RANI</Label>
        <ellipse cx="80" cy="80" rx="72" ry="45" fill="#FBE7D8" stroke="#1F3864" strokeWidth="2" />
        <circle cx="80" cy="80" r="24" fill="#4A3628" />
        <circle cx="80" cy="80" r="14" fill="#08131f" />
        <circle cx="75" cy="72" r="4" fill="#fff" />
        {/* pale inner eyelid */}
        <path d="M 20 118 Q 80 155 140 118 L 140 130 Q 80 165 20 130 Z" fill="#F4D2CA" stroke="#8B1E1E" strokeWidth="1.5" />
        <Label x={80} y={172} color="#8B1E1E">konjungtiva pucat</Label>
      </g>
    </svg>
  );
}

function KoilonychiaSVG() {
  return (
    <svg {...svgProps}>
      {/* Normal nail — convex */}
      <g transform="translate(20,30)">
        <Label x={80} y={0} color="#0F6674">NORMAL</Label>
        {/* finger */}
        <path d="M 30 60 L 130 60 Q 155 65 155 90 Q 155 125 130 130 L 30 130 Q 15 128 15 100 Q 15 62 30 60 Z" fill="#F3D3B7" stroke="#8B4513" strokeWidth="1.5" />
        {/* nail — convex highlight */}
        <path d="M 65 78 Q 95 62 128 78 Q 135 95 128 110 Q 95 122 65 110 Q 60 95 65 78 Z" fill="#FCF3EE" stroke="#8B4513" strokeWidth="1.5" />
        <path d="M 78 82 Q 95 75 118 82" stroke="#fff" strokeWidth="3" strokeLinecap="round" fill="none" />
        <Label x={80} y={158} color="#0F6674">cembung, mengkilap</Label>
      </g>
      {/* Koilonychia — concave (spoon) */}
      <g transform="translate(220,30)">
        <Label x={80} y={0} color="#8B1E1E">RANI</Label>
        <path d="M 30 60 L 130 60 Q 155 65 155 90 Q 155 125 130 130 L 30 130 Q 15 128 15 100 Q 15 62 30 60 Z" fill="#EFC7A8" stroke="#8B4513" strokeWidth="1.5" />
        {/* concave nail */}
        <path d="M 65 78 Q 95 100 128 78 Q 135 95 128 110 Q 95 132 65 110 Q 60 95 65 78 Z" fill="#F1E3D6" stroke="#8B4513" strokeWidth="1.5" />
        <path d="M 78 90 Q 95 100 118 90" stroke="#8B1E1E" strokeWidth="1.2" fill="none" strokeDasharray="2 2" />
        <Label x={80} y={158} color="#8B1E1E">cekung seperti sendok</Label>
      </g>
    </svg>
  );
}

function PulseSVG() {
  const normalPath = "M 0 40 L 20 40 L 30 20 L 40 60 L 50 40 L 100 40 L 110 20 L 120 60 L 130 40 L 200 40";
  const raniPath =
    "M 0 40 L 12 40 L 20 20 L 28 60 L 36 40 L 56 40 L 64 20 L 72 60 L 80 40 L 96 40 L 104 20 L 112 60 L 120 40 L 136 40 L 144 20 L 152 60 L 160 40 L 180 40 L 188 20 L 196 60 L 200 40";
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 240" className="w-full h-full">
      <g transform="translate(20,20)">
        <Label x={100} y={0} color="#0F6674">Normal · 72 bpm</Label>
        <rect x={0} y={10} width={200} height={80} fill="#F4EEDC" stroke="#1F3864" strokeWidth="1" />
        <motion.path
          d={normalPath}
          transform="translate(0,10)"
          stroke="#0F6674"
          strokeWidth="2"
          fill="none"
          strokeDasharray="600"
          strokeDashoffset="600"
          animate={{ strokeDashoffset: 0 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
      </g>
      <g transform="translate(20,130)">
        <Label x={100} y={0} color="#8B1E1E">Rani · 110 bpm</Label>
        <rect x={0} y={10} width={200} height={80} fill="#F4EEDC" stroke="#8B1E1E" strokeWidth="1" />
        <motion.path
          d={raniPath}
          transform="translate(0,10)"
          stroke="#8B1E1E"
          strokeWidth="2"
          fill="none"
          strokeDasharray="600"
          strokeDashoffset="600"
          animate={{ strokeDashoffset: 0 }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
        />
      </g>
      {/* Legend on the right */}
      <g transform="translate(240,50)">
        <text x="0" y="0" fill="#1F3864" fontFamily="'Outfit',sans-serif" fontSize="12" fontWeight="bold">
          Nilai normal remaja:
        </text>
        <text x="0" y="22" fill="#0F6674" fontFamily="'Space Mono',monospace" fontSize="14">
          60–100 ×/menit
        </text>
        <text x="0" y="60" fill="#1F3864" fontFamily="'Outfit',sans-serif" fontSize="12" fontWeight="bold">
          Kata dokter:
        </text>
        <text x="0" y="80" fill="#1F3864" fontFamily="'Outfit',sans-serif" fontSize="11">
          {"\"Jantung Rani bekerja lebih"}
        </text>
        <text x="0" y="94" fill="#1F3864" fontFamily="'Outfit',sans-serif" fontSize="11">
          {"keras — takikardia kompensasi.\""}
        </text>
      </g>
    </svg>
  );
}

function HeartSVG() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 240" className="w-full h-full">
      <g transform="translate(70,20)">
        <Label x={80} y={-2} color="#0F6674">Detak Normal</Label>
        <motion.path
          d="M 80 30 C 40 -10, -10 30, 40 80 C 60 100, 80 120, 80 120 C 80 120, 100 100, 120 80 C 170 30, 120 -10, 80 30 Z"
          fill="#8B1E1E"
          stroke="#5A0F0F"
          strokeWidth="2"
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 0.85, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "80px 75px" }}
        />
      </g>
      <g transform="translate(230,20)">
        <Label x={80} y={-2} color="#8B1E1E">Detak Rani</Label>
        <motion.path
          d="M 80 30 C 40 -10, -10 30, 40 80 C 60 100, 80 120, 80 120 C 80 120, 100 100, 120 80 C 170 30, 120 -10, 80 30 Z"
          fill="#8B1E1E"
          stroke="#5A0F0F"
          strokeWidth="2"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 0.55, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "80px 75px" }}
        />
        {/* small pulse rings */}
        <motion.circle
          cx={80 + 0}
          cy={75}
          r={70}
          fill="none"
          stroke="#8B1E1E"
          strokeOpacity="0.4"
          strokeWidth="2"
          animate={{ r: [50, 90], opacity: [0.4, 0] }}
          transition={{ duration: 0.9, repeat: Infinity, ease: "easeOut" }}
        />
      </g>
      <text x="200" y="200" textAnchor="middle" fill="#1F3864" fontFamily="'Outfit',sans-serif" fontSize="13" fontWeight="600">
        Jantung Rani memompa lebih cepat & keras untuk mengimbangi
      </text>
      <text x="200" y="218" textAnchor="middle" fill="#1F3864" fontFamily="'Outfit',sans-serif" fontSize="13" fontWeight="600">
        kekurangan oksigen dalam darah.
      </text>
    </svg>
  );
}

// ==============================================================
// SCENE 4 — ORGAN CLOSE-UPS
// ==============================================================

function HeartChambersSVG() {
  // 4-chamber heart diagram with labeled atriums & ventricles, animated blood flow arrows
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 240" className="w-full h-full">
      {/* Heart outline */}
      <path
        d="M 200 45 C 155 15, 100 40, 100 100 C 100 155, 180 200, 200 215 C 220 200, 300 155, 300 100 C 300 40, 245 15, 200 45 Z"
        fill="#FBE7DE"
        stroke="#8B1E1E"
        strokeWidth="2.5"
      />
      {/* Vertical septum */}
      <line x1="200" y1="55" x2="200" y2="205" stroke="#8B1E1E" strokeWidth="2" />
      {/* Horizontal septum (atrium/ventricle) */}
      <path d="M 118 100 L 200 100 L 282 100" stroke="#8B1E1E" strokeWidth="1.5" fill="none" />
      {/* Chambers filled with color */}
      {/* Serambi Kanan (RA) — deoxy blue */}
      <path d="M 110 70 L 195 70 L 195 98 L 110 98 Z" fill="#1F3864" opacity="0.75" />
      {/* Serambi Kiri (LA) — oxy red */}
      <path d="M 205 70 L 290 70 L 290 98 L 205 98 Z" fill="#8B1E1E" opacity="0.85" />
      {/* Bilik Kanan (RV) — deoxy blue */}
      <path d="M 108 102 L 195 102 L 195 200 L 175 210 L 130 195 Z" fill="#1F3864" opacity="0.6" />
      {/* Bilik Kiri (LV) — oxy red, thicker wall */}
      <path d="M 205 102 L 292 102 L 285 195 L 230 212 L 205 200 Z" fill="#8B1E1E" opacity="0.7" />

      {/* Labels */}
      <text x="150" y="88" fontFamily="'Space Mono',monospace" fontSize="10" fill="#fff" textAnchor="middle" fontWeight="bold">
        Serambi Kanan
      </text>
      <text x="250" y="88" fontFamily="'Space Mono',monospace" fontSize="10" fill="#fff" textAnchor="middle" fontWeight="bold">
        Serambi Kiri
      </text>
      <text x="150" y="160" fontFamily="'Space Mono',monospace" fontSize="10" fill="#fff" textAnchor="middle" fontWeight="bold">
        Bilik Kanan
      </text>
      <text x="248" y="160" fontFamily="'Space Mono',monospace" fontSize="10" fill="#fff" textAnchor="middle" fontWeight="bold">
        Bilik Kiri
      </text>

      {/* Great vessels */}
      <line x1="150" y1="45" x2="150" y2="20" stroke="#1F3864" strokeWidth="8" />
      <text x="150" y="14" fontSize="9" fill="#1F3864" fontFamily="'Space Mono',monospace" textAnchor="middle" fontWeight="bold">Vena Cava</text>
      <line x1="250" y1="45" x2="250" y2="20" stroke="#8B1E1E" strokeWidth="8" />
      <text x="250" y="14" fontSize="9" fill="#8B1E1E" fontFamily="'Space Mono',monospace" textAnchor="middle" fontWeight="bold">Aorta</text>

      {/* Animated blood particles right side (deoxy in) */}
      <motion.circle
        cx="150" cy="30" r="4" fill="#1F3864"
        animate={{ cy: [20, 70, 150, 190], opacity: [1, 1, 1, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Animated blood particles left side (oxy out) */}
      <motion.circle
        cx="250" cy="180" r="4" fill="#8B1E1E"
        animate={{ cy: [180, 130, 80, 25], opacity: [0, 1, 1, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Legend bottom */}
      <text x="200" y="234" textAnchor="middle" fill="#1F3864" fontFamily="'Outfit',sans-serif" fontSize="11" fontWeight="600">
        Kanan (biru) = darah miskin O₂ · Kiri (merah) = darah kaya O₂
      </text>
    </svg>
  );
}

function LungGasExchangeSVG() {
  // Two lung lobes with alveolus close-up showing CO2 out / O2 in
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 240" className="w-full h-full">
      {/* Left lung */}
      <path
        d="M 90 40 C 55 55, 45 130, 60 190 C 75 210, 115 208, 130 190 L 130 60 C 125 42, 105 35, 90 40 Z"
        fill="#F6C7BF"
        stroke="#8B1E1E"
        strokeWidth="2"
      />
      {/* Right lung */}
      <path
        d="M 155 60 L 155 190 C 170 208, 210 210, 225 190 C 240 130, 230 55, 195 40 C 180 35, 160 42, 155 60 Z"
        fill="#F6C7BF"
        stroke="#8B1E1E"
        strokeWidth="2"
      />
      {/* Trachea */}
      <rect x="138" y="15" width="14" height="45" fill="#EBE1C6" stroke="#8B1E1E" strokeWidth="1.5" />
      <line x1="145" y1="60" x2="115" y2="80" stroke="#8B1E1E" strokeWidth="2" />
      <line x1="145" y1="60" x2="175" y2="80" stroke="#8B1E1E" strokeWidth="2" />

      {/* Zoom-in circle showing alveolus + capillary */}
      <circle cx="315" cy="120" r="65" fill="#FFF8EE" stroke="#1F3864" strokeWidth="2.5" strokeDasharray="4 3" />
      {/* alveolus */}
      <circle cx="300" cy="115" r="22" fill="#FDD6C8" stroke="#8B1E1E" strokeWidth="1.5" />
      <text x="300" y="118" textAnchor="middle" fontSize="9" fill="#8B1E1E" fontFamily="'Space Mono',monospace" fontWeight="bold">
        Alveolus
      </text>
      {/* capillary pipe */}
      <path d="M 265 145 Q 315 155, 365 145" stroke="#1F3864" strokeWidth="4" fill="none" />
      <text x="335" y="170" fontSize="9" fill="#1F3864" fontFamily="'Space Mono',monospace" fontWeight="bold">
        Kapiler
      </text>

      {/* O2 particles into blood */}
      <motion.circle
        cx="300" cy="115" r="3.5" fill="#0F6674"
        animate={{ cy: [115, 130, 145], opacity: [1, 1, 0.3] }}
        transition={{ duration: 2, repeat: Infinity, delay: 0 }}
      />
      <motion.circle
        cx="308" cy="115" r="3.5" fill="#0F6674"
        animate={{ cy: [115, 130, 148], opacity: [1, 1, 0.3] }}
        transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
      />
      <text x="335" y="112" fontSize="10" fill="#0F6674" fontFamily="'Outfit',sans-serif" fontWeight="bold">
        O₂ ↓
      </text>
      {/* CO2 particles out of blood */}
      <motion.circle
        cx="285" cy="140" r="3.5" fill="#8B1E1E"
        animate={{ cy: [140, 120, 100], opacity: [1, 1, 0.3] }}
        transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
      />
      <text x="255" y="100" fontSize="10" fill="#8B1E1E" fontFamily="'Outfit',sans-serif" fontWeight="bold">
        ↑ CO₂
      </text>

      {/* connector line from lung to zoom */}
      <line x1="200" y1="150" x2="260" y2="140" stroke="#1F3864" strokeDasharray="3 3" strokeWidth="1" opacity="0.5" />

      <text x="115" y="220" fontSize="11" fill="#1F3864" fontFamily="'Outfit',sans-serif" fontWeight="600">
        Di paru-paru: darah lepas CO₂ & serap O₂
      </text>
    </svg>
  );
}

function ArterySVG() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 240" className="w-full h-full">
      <Label x={200} y={16} color="#8B1E1E">Arteri · Aorta</Label>
      {/* Thick artery cross-section */}
      <g transform="translate(50,40)">
        {/* Outer wall — thick */}
        <ellipse cx="150" cy="80" rx="140" ry="55" fill="#F0BFBF" stroke="#8B1E1E" strokeWidth="3" />
        {/* Middle muscular layer */}
        <ellipse cx="150" cy="80" rx="125" ry="45" fill="#F6D9D9" stroke="#8B1E1E" strokeWidth="1.5" strokeDasharray="4 3" />
        {/* Lumen — blood-filled */}
        <ellipse cx="150" cy="80" rx="95" ry="30" fill="#8B1E1E" opacity="0.85" />
        {/* Flowing red blood cells */}
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.circle
            key={i}
            cy="80"
            r="5"
            fill="#FDD6C8"
            animate={{ cx: [60, 240], opacity: [0, 1, 1, 0] }}
            transition={{
              duration: 1.6,
              repeat: Infinity,
              delay: i * 0.32,
              ease: "linear",
            }}
          />
        ))}
        {/* Callout labels */}
        <line x1="30" y1="30" x2="55" y2="60" stroke="#1F3864" strokeWidth="1" />
        <text x="15" y="26" fontSize="10" fill="#1F3864" fontFamily="'Space Mono',monospace" fontWeight="bold">Tunika Adventisia</text>
        <line x1="60" y1="135" x2="80" y2="115" stroke="#1F3864" strokeWidth="1" />
        <text x="10" y="147" fontSize="10" fill="#1F3864" fontFamily="'Space Mono',monospace" fontWeight="bold">Lumen (aliran darah)</text>
      </g>
      <text x="200" y="220" textAnchor="middle" fontSize="11" fill="#1F3864" fontFamily="'Outfit',sans-serif" fontWeight="600">
        Dinding tebal & elastis · tekanan tinggi · membawa darah kaya O₂
      </text>
    </svg>
  );
}

function VeinSVG() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 240" className="w-full h-full">
      <Label x={200} y={16} color="#1F3864">Vena Cava & Katup</Label>
      {/* Vein — thinner wall, larger lumen */}
      <g transform="translate(30,40)">
        <rect x="0" y="60" width="340" height="60" rx="6" ry="6" fill="#B6CEE8" stroke="#1F3864" strokeWidth="2" />
        <rect x="0" y="70" width="340" height="40" rx="4" ry="4" fill="#1F3864" opacity="0.85" />

        {/* Semi-lunar valves — pair of leaflets pointing right (flow direction) */}
        {/* Valve 1 open */}
        <motion.g
          animate={{ scaleY: [1, 0.15, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "80px 90px" }}
        >
          <path d="M 70 70 Q 90 90 70 110 Z" fill="#FBE7DE" stroke="#8B1E1E" strokeWidth="1.5" />
          <path d="M 90 70 Q 70 90 90 110 Z" fill="#FBE7DE" stroke="#8B1E1E" strokeWidth="1.5" />
        </motion.g>
        {/* Valve 2 */}
        <motion.g
          animate={{ scaleY: [1, 0.15, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
          style={{ transformOrigin: "200px 90px" }}
        >
          <path d="M 190 70 Q 210 90 190 110 Z" fill="#FBE7DE" stroke="#8B1E1E" strokeWidth="1.5" />
          <path d="M 210 70 Q 190 90 210 110 Z" fill="#FBE7DE" stroke="#8B1E1E" strokeWidth="1.5" />
        </motion.g>
        {/* Valve 3 */}
        <motion.g
          animate={{ scaleY: [1, 0.15, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
          style={{ transformOrigin: "300px 90px" }}
        >
          <path d="M 290 70 Q 310 90 290 110 Z" fill="#FBE7DE" stroke="#8B1E1E" strokeWidth="1.5" />
          <path d="M 310 70 Q 290 90 310 110 Z" fill="#FBE7DE" stroke="#8B1E1E" strokeWidth="1.5" />
        </motion.g>

        {/* Flowing deoxygenated blood cells (slower & bidirectional-restricted by valves) */}
        {[0, 1, 2].map((i) => (
          <motion.circle
            key={i}
            cy="90"
            r="5"
            fill="#A7BEE0"
            animate={{ cx: [-10, 350], opacity: [0, 1, 1, 0] }}
            transition={{ duration: 3.2, repeat: Infinity, delay: i * 1.1, ease: "linear" }}
          />
        ))}

        {/* Arrow indicating flow direction */}
        <line x1="0" y1="145" x2="340" y2="145" stroke="#1F3864" strokeWidth="1.5" markerEnd="url(#arrow)" />
        <defs>
          <marker id="arrow" markerWidth="10" markerHeight="8" refX="9" refY="4" orient="auto">
            <path d="M 0 0 L 10 4 L 0 8 Z" fill="#1F3864" />
          </marker>
        </defs>
        <text x="170" y="160" textAnchor="middle" fontSize="10" fill="#1F3864" fontFamily="'Space Mono',monospace">
          arah aliran menuju jantung
        </text>
      </g>
      <text x="200" y="220" textAnchor="middle" fontSize="11" fill="#1F3864" fontFamily="'Outfit',sans-serif" fontWeight="600">
        Dinding tipis · tekanan rendah · katup mencegah darah berbalik
      </text>
    </svg>
  );
}

const DIAGRAMS = {
  // Scene 2 — symptoms
  "hs-mata": { title: "Perbandingan Konjungtiva", Component: ConjungtivaSVG },
  "hs-kuku": { title: "Perbandingan Bentuk Kuku", Component: KoilonychiaSVG },
  "hs-nadi": { title: "Perbandingan Denyut Nadi", Component: PulseSVG },
  "hs-dada": { title: "Perbandingan Detak Jantung", Component: HeartSVG },
  // Scene 4 — organs
  "jantung": { title: "Anatomi Jantung 4 Ruang", Component: HeartChambersSVG },
  "paru": { title: "Pertukaran Gas di Paru-paru", Component: LungGasExchangeSVG },
  "arteri": { title: "Struktur Arteri (Aorta)", Component: ArterySVG },
  "vena": { title: "Struktur Vena & Katup", Component: VeinSVG },
};

export default function CloseUpDiagram({ hotspotId }) {
  const entry = DIAGRAMS[hotspotId];
  if (!entry) return null;
  const { title, Component } = entry;
  return (
    <div className="rounded-lg bg-paper border-2 border-primary/15 p-3 shadow-paper" data-testid={`closeup-${hotspotId}`}>
      <div className="flex items-center justify-between mb-2">
        <span className="font-mono uppercase text-[10px] tracking-widest text-primary/85">
          🔍 {title}
        </span>
        <span className="font-mono text-[10px] tracking-widest text-teal-dark">Interaktif</span>
      </div>
      <div className="aspect-[400/220] w-full">
        <Component />
      </div>
    </div>
  );
}
