module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1F3864",
          50: "#EDF1F8",
          900: "#131F3A",
        },
        maroon: {
          DEFAULT: "#8B1E1E",
          light: "#B23A3A",
          dark: "#5A0F0F",
        },
        teal: {
          DEFAULT: "#0F6674",
          light: "#1E8898",
          dark: "#0A4852",
        },
        mustard: {
          DEFAULT: "#B57B0E",
          light: "#D89A2E",
        },
        cream: "#FDFBF7",
        paper: "#F4EEDC",
        parchment: "#EBE1C6",
        ink: "#2A2418",
      },
      fontFamily: {
        display: ["Fraunces", "serif"],
        body: ["Outfit", "sans-serif"],
        mono: ["'Space Mono'", "monospace"],
      },
      boxShadow: {
        card: "0 4px 14px 0 rgba(0,0,0,0.15)",
        floating: "0 8px 30px rgba(0,0,0,0.12)",
        paper: "0 2px 4px rgba(0,0,0,0.08), 0 8px 16px rgba(0,0,0,0.06)",
        pinned: "0 6px 12px rgba(0,0,0,0.18), inset 0 0 0 1px rgba(0,0,0,0.04)",
      },
      keyframes: {
        pulse_heart: {
          "0%,100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.08)" },
        },
        floatY: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        ping_soft: {
          "0%": { transform: "scale(1)", opacity: 0.7 },
          "80%,100%": { transform: "scale(2.4)", opacity: 0 },
        },
        blink: {
          "0%,100%": { opacity: 1 },
          "50%": { opacity: 0.2 },
        },
      },
      animation: {
        "pulse-heart": "pulse_heart 1.1s ease-in-out infinite",
        "float-y": "floatY 3s ease-in-out infinite",
        "ping-soft": "ping_soft 1.8s cubic-bezier(0,0,0.2,1) infinite",
        "blink": "blink 1.2s ease-in-out infinite",
      },
      backgroundImage: {
        "grain": "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
