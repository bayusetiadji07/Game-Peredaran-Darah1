import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Eye, X, Download, Loader2, ExternalLink } from "lucide-react";
import { playClick } from "./AudioManager";

// pdfjs-dist ES module import + worker from public folder
import * as pdfjsLib from "pdfjs-dist/build/pdf.mjs";

pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

/**
 * Renders a PDF blob into canvas pages using pdfjs-dist.
 * Works in every modern browser regardless of native PDF viewer availability.
 */
export default function PdfPreviewModal({ data, onDownload, onClose }) {
  const containerRef = useRef(null);
  const [status, setStatus] = useState("loading"); // 'loading' | 'ready' | 'error'
  const [numPages, setNumPages] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    let cancelled = false;
    const container = containerRef.current;
    if (!container) return;
    // clear
    container.innerHTML = "";

    (async () => {
      try {
        const arrayBuffer = await data.blob.arrayBuffer();
        if (cancelled) return;
        const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
        const pdf = await loadingTask.promise;
        if (cancelled) return;
        setNumPages(pdf.numPages);

        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
          const page = await pdf.getPage(pageNum);
          if (cancelled) return;

          const dpr = Math.min(window.devicePixelRatio || 1, 2);
          const viewport = page.getViewport({ scale: 1.5 * dpr });
          const canvas = document.createElement("canvas");
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          canvas.style.width = `${viewport.width / dpr}px`;
          canvas.style.height = `${viewport.height / dpr}px`;
          canvas.className =
            "mx-auto mb-4 rounded-md shadow-floating bg-white max-w-full";
          canvas.setAttribute("data-testid", `pdf-page-${pageNum}`);
          container.appendChild(canvas);

          const ctx = canvas.getContext("2d");
          await page.render({ canvasContext: ctx, viewport }).promise;
        }
        if (!cancelled) setStatus("ready");
      } catch (err) {
        console.error("PDF render error:", err);
        if (!cancelled) {
          setStatus("error");
          setErrorMsg(err?.message || "Gagal memuat dokumen PDF.");
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [data]);

  return (
    <motion.div
      className="fixed inset-0 z-[70] bg-black/80 grid place-items-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      data-testid="pdf-preview-overlay"
    >
      <motion.div
        initial={{ y: 30, opacity: 0, scale: 0.96 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-cream w-full max-w-5xl h-[92vh] rounded-2xl shadow-floating border-2 border-primary/20 flex flex-col overflow-hidden"
        data-testid="pdf-preview-modal"
      >
        {/* Header */}
        <div className="flex items-center justify-between bg-primary text-cream px-5 py-3 border-b-2 border-primary-900">
          <div className="flex items-center gap-3">
            <Eye size={20} />
            <div>
              <div className="font-display font-bold text-lg leading-tight">
                Preview Laporan PDF
              </div>
              <div className="text-cream/85 text-xs font-mono uppercase tracking-widest">
                {data.filename}
                {status === "ready" && (
                  <span className="ml-2 text-teal-light">· {numPages} halaman</span>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={data.url}
              target="_blank"
              rel="noreferrer"
              className="hidden md:flex items-center gap-1.5 bg-cream/10 hover:bg-cream/20 text-cream px-3 py-2 rounded-full text-xs font-mono uppercase tracking-widest border border-cream/20"
              data-testid="pdf-preview-open-tab"
              title="Buka PDF di tab baru"
            >
              <ExternalLink size={12} /> Tab Baru
            </a>
            <button
              onClick={() => {
                playClick();
                onDownload();
              }}
              className="flex items-center gap-2 bg-teal text-cream px-4 py-2 rounded-full font-body font-semibold shadow-card hover:bg-teal-light transition"
              data-testid="pdf-preview-download-btn"
            >
              <Download size={14} /> Unduh Sekarang
            </button>
            <button
              onClick={onClose}
              className="grid h-9 w-9 place-items-center rounded-full bg-cream text-primary hover:bg-maroon hover:text-cream transition"
              data-testid="pdf-preview-close-btn"
              aria-label="Tutup preview"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Body: rendered pages */}
        <div className="flex-1 bg-[#525659] overflow-y-auto relative">
          <div ref={containerRef} className="p-6 min-h-full" data-testid="pdf-preview-pages" />
          {status === "loading" && (
            <div className="absolute inset-0 grid place-items-center pointer-events-none">
              <div className="flex items-center gap-2 bg-primary/90 text-cream rounded-full px-5 py-3 shadow-floating">
                <Loader2 className="animate-spin" size={18} />
                <span className="font-body">Merender dokumen PDF…</span>
              </div>
            </div>
          )}
          {status === "error" && (
            <div className="absolute inset-0 grid place-items-center p-6">
              <div className="bg-maroon/95 text-cream max-w-md rounded-xl p-5 border border-cream/20">
                <div className="font-display font-bold text-lg">Gagal memuat PDF</div>
                <div className="font-body text-cream/85 text-sm mt-1">{errorMsg}</div>
                <div className="mt-3 text-sm">
                  Gunakan tombol <b>Unduh Sekarang</b> di header — file PDF tetap dapat diunduh.
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
