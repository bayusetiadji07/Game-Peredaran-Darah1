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

const DIAGRAMS = {
  "hs-mata": { title: "Perbandingan Konjungtiva", Component: ConjungtivaSVG },
  "hs-kuku": { title: "Perbandingan Bentuk Kuku", Component: KoilonychiaSVG },
  "hs-nadi": { title: "Perbandingan Denyut Nadi", Component: PulseSVG },
  "hs-dada": { title: "Perbandingan Detak Jantung", Component: HeartSVG },
};

export default function CloseUpDiagram({ hotspotId }) {
  const entry = DIAGRAMS[hotspotId];
  if (!entry) return null;
  const { title, Component } = entry;
  return (
    <div className="rounded-lg bg-paper border-2 border-primary/15 p-3 shadow-paper" data-testid={`closeup-${hotspotId}`}>
      <div className="flex items-center justify-between mb-2">
        <span className="font-mono uppercase text-[10px] tracking-widest text-primary/70">
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
