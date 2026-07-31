import React, { useState, useEffect, useRef } from "react";
import {
  Download,
  Printer,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Loader2,
  FileText,
  Globe,
  Copy,
  Check,
  Code2,
  Phone,
  Mail,
  ExternalLink
} from "lucide-react";
import { Link } from "react-router-dom";
import * as pdfjsLib from "pdfjs-dist";

// Configure pdfjs worker to CDN matching installed pdfjs-dist version
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

interface PdfPageProps {
  key?: React.Key;
  pdfDoc: pdfjsLib.PDFDocumentProxy;
  pageNumber: number;
  scale: number;
  containerWidth: number;
}

function PdfPage({ pdfDoc, pageNumber, scale, containerWidth }: PdfPageProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [rendering, setRendering] = useState(true);
  const [pageError, setPageError] = useState(false);

  useEffect(() => {
    if (containerWidth <= 0) return;

    let renderTask: pdfjsLib.RenderTask | null = null;
    let isMounted = true;

    const renderPage = async () => {
      setRendering(true);
      setPageError(false);
      try {
        const page = await pdfDoc.getPage(pageNumber);
        if (!isMounted) return;

        // Calculate base scale so 1.0 (100%) fits containerWidth exactly
        const unscaledViewport = page.getViewport({ scale: 1.0 });
        const baseScale = containerWidth / unscaledViewport.width;
        const actualScale = baseScale * scale;

        const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
        const viewport = page.getViewport({ scale: actualScale });

        const canvas = canvasRef.current;
        if (!canvas) return;

        const context = canvas.getContext("2d");
        if (!context) return;

        const displayWidth = Math.floor(viewport.width);
        const displayHeight = Math.floor(viewport.height);

        canvas.width = Math.floor(displayWidth * pixelRatio);
        canvas.height = Math.floor(displayHeight * pixelRatio);

        canvas.style.width = `${displayWidth}px`;
        canvas.style.height = `${displayHeight}px`;

        context.scale(pixelRatio, pixelRatio);

        const renderContext = {
          canvasContext: context,
          viewport: viewport,
          canvas: canvas,
        };

        renderTask = page.render(renderContext as any);
        await renderTask.promise;

        if (isMounted) {
          setRendering(false);
        }
      } catch (err: any) {
        if (err?.name !== "RenderingCancelledException") {
          console.error(`Error rendering page ${pageNumber}:`, err);
          if (isMounted) {
            setPageError(true);
            setRendering(false);
          }
        }
      }
    };

    renderPage();

    return () => {
      isMounted = false;
      if (renderTask) {
        renderTask.cancel();
      }
    };
  }, [pdfDoc, pageNumber, scale, containerWidth]);

  return (
    <div className="relative my-3 sm:my-5 shadow-lg rounded-xl overflow-hidden bg-white border border-stone-200/80 transition-all flex flex-col items-center justify-center shrink-0">
      <canvas ref={canvasRef} className="block mx-auto" />
      {rendering && (
        <div className="p-8 flex items-center justify-center gap-2 text-stone-500 text-xs bg-stone-50 w-full">
          <Loader2 className="w-4 h-4 animate-spin text-luxury-gold" />
          <span>Memuat Halaman {pageNumber}...</span>
        </div>
      )}
      {pageError && (
        <div className="p-6 text-center text-red-600 text-xs bg-red-50 w-full">
          Gagal menampilkan halaman {pageNumber}
        </div>
      )}
    </div>
  );
}

export default function PanduanPage() {
  const [pdfDoc, setPdfDoc] = useState<pdfjsLib.PDFDocumentProxy | null>(null);
  const [numPages, setNumPages] = useState<number>(0);
  const [scale, setScale] = useState<number>(1.0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const [containerWidth, setContainerWidth] = useState<number>(0);

  // Drag-to-scroll functionality for desktop mouse interactions
  const pdfScrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftPos, setScrollLeftPos] = useState(0);

  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  // Toast / Overlay state for zoom level feedback
  const [showZoomToast, setShowZoomToast] = useState(false);
  const zoomToastTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const triggerZoomToast = () => {
    setShowZoomToast(true);
    if (zoomToastTimeoutRef.current) {
      clearTimeout(zoomToastTimeoutRef.current);
    }
    zoomToastTimeoutRef.current = setTimeout(() => {
      setShowZoomToast(false);
    }, 1500);
  };

  const domainRecords = [
    {
      domain: "kampungtajurkahuripan.com.",
      ttl: "14400",
      kelas: "IN",
      tipe: "A",
      destinasi: "216.198.79.1",
    },
    {
      domain: "www.kampungtajurkahuripan.com.",
      ttl: "14400",
      kelas: "IN",
      tipe: "CNAME",
      destinasi: "793fa7fefe033fda.vercel-dns-017.com",
    },
    {
      domain: "kampungtajurkahuripan.com.",
      ttl: "14400",
      kelas: "IN",
      tipe: "TXT",
      destinasi: "google-site-verification=myKATE-KXUwQXcepOkytpfNcm8my0tgD6CDxg5NzoX0",
    },
  ];

  const handleCopyDestinasi = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const pdfUrl = "/pdf/panduan.pdf";

  // Measure main container inner content width accurately
  useEffect(() => {
    if (!containerRef.current) return;

    const updateWidth = () => {
      if (containerRef.current) {
        const style = window.getComputedStyle(containerRef.current);
        const paddingLeft = parseFloat(style.paddingLeft) || 0;
        const paddingRight = parseFloat(style.paddingRight) || 0;
        const availableWidth = containerRef.current.clientWidth - paddingLeft - paddingRight;
        setContainerWidth(availableWidth);
      }
    };

    updateWidth();

    const resizeObserver = new ResizeObserver(() => {
      updateWidth();
    });

    resizeObserver.observe(containerRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    const loadPdf = async () => {
      try {
        const loadingTask = pdfjsLib.getDocument({
          url: pdfUrl,
          cMapUrl: `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjsLib.version}/cmaps/`,
          cMapPacked: true,
        });

        const pdf = await loadingTask.promise;
        if (isMounted) {
          setPdfDoc(pdf);
          setNumPages(pdf.numPages);
          setLoading(false);
        }
      } catch (err: any) {
        console.error("PDF load error:", err);
        if (isMounted) {
          setError(
            "File PDF belum diisi atau tidak dapat diproses secara langsung."
          );
          setLoading(false);
        }
      }
    };

    loadPdf();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleZoomIn = () => {
    setScale((prev) => Math.min(Number((prev + 0.2).toFixed(1)), 3.0));
    triggerZoomToast();
  };

  const handleZoomOut = () => {
    setScale((prev) => Math.max(Number((prev - 0.2).toFixed(1)), 0.5));
    triggerZoomToast();
  };

  const handleResetZoom = () => {
    setScale(1.0);
    triggerZoomToast();
  };

  // Mouse Drag Handlers for Desktop
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!pdfScrollContainerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - pdfScrollContainerRef.current.offsetLeft);
    setScrollLeftPos(pdfScrollContainerRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !pdfScrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - pdfScrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    pdfScrollContainerRef.current.scrollLeft = scrollLeftPos - walk;
  };

  return (
    <div className="min-h-screen bg-stone-100 flex flex-col font-inter text-luxury-charcoal selection:bg-luxury-gold selection:text-luxury-green-dark relative">
      {/* Clean White Top Header */}
      <header className="bg-white border-b border-stone-200 sticky top-0 z-50 py-3 shadow-xs">
        <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Left: Logo */}
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="flex items-center gap-2 transition-opacity hover:opacity-80"
              title="Kembali ke Beranda"
            >
              <img
                src="/gambar/logo-color.png"
                alt="Logo Kampung Wisata Tajur Kahuripan"
                className="h-8 sm:h-9 w-auto object-contain"
              />
            </Link>
          </div>

          {/* Right: ONLY Cetak / Unduh Icon Button in #81AF43 */}
          <div>
            <a
              href={pdfUrl}
              download="Panduan-Kampung-Wisata-Tajur-Kahuripan.pdf"
              className="p-2 sm:p-2.5 bg-[#81AF43] hover:bg-[#729c3a] text-white font-bold rounded-xl transition-all shadow-sm active:scale-95 flex items-center justify-center"
              title="Cetak / Unduh PDF"
            >
              <Printer className="w-5 h-5 text-white" />
            </a>
          </div>
        </div>
      </header>

      {/* Main Reader Viewport */}
      <main
        ref={containerRef}
        className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 py-4 flex flex-col items-center"
      >
        {loading && (
          <div className="flex-1 min-h-[60vh] flex flex-col items-center justify-center text-center p-8">
            <Loader2 className="w-10 h-10 animate-spin text-luxury-gold mb-4" />
            <p className="text-sm font-medium text-stone-600">
              Membuka Dokumen PDF...
            </p>
          </div>
        )}

        {!loading && error && (
          <div className="flex-1 min-h-[60vh] flex flex-col items-center justify-center text-center p-6 sm:p-12 bg-white rounded-2xl shadow-sm border border-stone-200 my-8 max-w-lg">
            <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center mb-4">
              <FileText className="w-7 h-7" />
            </div>
            <h2 className="text-lg font-bold text-luxury-green-dark mb-2">
              Dokumen PDF Tersedia untuk Diunduh
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mb-6 leading-relaxed">
              Silakan unduh atau buka berkas PDF secara langsung melalui tombol
              di bawah ini.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <a
                href={pdfUrl}
                download="Panduan-Kampung-Wisata-Tajur-Kahuripan.pdf"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#81AF43] hover:bg-[#729c3a] text-white font-bold rounded-xl text-xs sm:text-sm shadow-md transition-all"
              >
                <Download className="w-4 h-4" />
                <span>Unduh File PDF</span>
              </a>
              <a
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-stone-100 text-stone-700 font-bold rounded-xl text-xs sm:text-sm shadow-sm hover:bg-stone-200 transition-all border border-stone-200"
              >
                <span>Buka di Tab Baru</span>
              </a>
            </div>
          </div>
        )}

        {!loading && !error && pdfDoc && containerWidth > 0 && (
          <div
            ref={pdfScrollContainerRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            className={`w-full overflow-x-auto pb-4 select-none touch-pan-x ${
              isDragging
                ? "cursor-grabbing"
                : scale > 1.0
                ? "cursor-grab"
                : "cursor-default"
            }`}
          >
            <div className="min-w-full w-max mx-auto flex flex-col items-center">
              {Array.from({ length: numPages }).map((_, index) => (
                <PdfPage
                  key={`pdf_page_${index + 1}`}
                  pdfDoc={pdfDoc}
                  pageNumber={index + 1}
                  scale={scale}
                  containerWidth={containerWidth}
                />
              ))}
            </div>
          </div>
        )}

        {/* Section Konfigurasi Domain */}
        <section className="w-full mt-8 mb-12 bg-white rounded-2xl shadow-sm border border-stone-200 p-4 sm:p-6">
          <div className="flex items-center gap-3 mb-4 pb-3 border-b border-stone-100">
            <div className="p-2 bg-[#81AF43]/10 text-[#81AF43] rounded-xl">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-stone-800">
                Konfigurasi Domain
              </h2>
              <p className="text-xs text-stone-500">
                Pengaturan Rekaman DNS untuk website Kampung Wisata Tajur Kahuripan
              </p>
            </div>
          </div>

          <div className="overflow-x-auto rounded-xl border border-stone-200">
            <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-max">
              <thead>
                <tr className="bg-stone-50 border-b border-stone-200 text-stone-600 font-semibold uppercase text-[11px] tracking-wider whitespace-nowrap">
                  <th className="py-3 px-4">Domain</th>
                  <th className="py-3 px-4">TTL</th>
                  <th className="py-3 px-4">Kelas</th>
                  <th className="py-3 px-4">Tipe</th>
                  <th className="py-3 px-4">Destinasi</th>
                  <th className="py-3 px-3 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 font-mono text-xs">
                {domainRecords.map((item, index) => (
                  <tr
                    key={index}
                    className="hover:bg-stone-50/80 transition-colors whitespace-nowrap"
                  >
                    <td className="py-3 px-4 font-medium text-stone-800">
                      {item.domain}
                    </td>
                    <td className="py-3 px-4 text-stone-600">{item.ttl}</td>
                    <td className="py-3 px-4 text-stone-600">{item.kelas}</td>
                    <td className="py-3 px-4">
                      <span className="inline-block px-2 py-0.5 rounded text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200 font-sans">
                        {item.tipe}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-stone-700 font-mono">
                      {item.destinasi}
                    </td>
                    <td className="py-3 px-3 text-right font-sans">
                      <button
                        onClick={() => handleCopyDestinasi(item.destinasi, index)}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-stone-600 bg-stone-100 hover:bg-[#81AF43] hover:text-white rounded-lg transition-all cursor-pointer active:scale-95"
                        title="Salin Destinasi"
                      >
                        {copiedIndex === index ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span className="text-emerald-700 text-[11px]">Tersalin</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span className="text-[11px]">Salin</span>
                          </>
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section Informasi Pengembang */}
        <section className="w-full mb-12 bg-white rounded-2xl shadow-sm border border-stone-200 p-4 sm:p-6">
          <div className="flex items-center gap-3 mb-4 pb-3 border-b border-stone-100">
            <div className="p-2 bg-[#81AF43]/10 text-[#81AF43] rounded-xl">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-stone-800">
                Informasi Pengembang
              </h2>
              <p className="text-xs text-stone-500">
                Pengembang & Penyedia Layanan Sistem
              </p>
            </div>
          </div>

          <div className="bg-stone-50/80 border border-stone-200/80 rounded-xl p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="text-sm sm:text-base font-bold text-stone-900 mb-1">
                AlinLabs Indonesia
              </h3>
              <a
                href="https://www.alinlabs.biz.id"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-[#81AF43] hover:underline"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>www.alinlabs.biz.id</span>
                <ExternalLink className="w-3 h-3 ml-0.5 opacity-70" />
              </a>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 text-xs text-stone-700 font-mono">
              <a
                href="https://wa.me/6281807000054"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-[#81AF43] transition-colors"
              >
                <Phone className="w-4 h-4 text-stone-400" />
                <span>0818-070000-54</span>
              </a>

              <a
                href="mailto:office.alincorporation@gmail.com"
                className="inline-flex items-center gap-2 hover:text-[#81AF43] transition-colors font-sans"
              >
                <Mail className="w-4 h-4 text-stone-400" />
                <span>office.alincorporation@gmail.com</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Floating Center Overlay Toast for Zoom Percentage */}
      {showZoomToast && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none transition-all duration-200 animate-in fade-in zoom-in-95">
          <div className="bg-stone-900/90 text-white backdrop-blur-md px-5 py-3 rounded-2xl shadow-2xl font-mono text-base font-bold flex items-center gap-2.5 border border-stone-700/60">
            <span className="text-stone-300">Skala Zoom:</span>
            <span className="text-[#81AF43] font-extrabold text-lg">
              {Math.round(scale * 100)}%
            </span>
          </div>
        </div>
      )}

      {/* Floating Bottom Right Controls */}
      {!loading && !error && pdfDoc && (
        <>
          {/* Mobile Zoom Controls: Vertical layout (top-bottom), NO refresh icon, NO static percentage text */}
          <div className="sm:hidden fixed bottom-6 right-5 z-40 flex flex-col items-center gap-1.5 bg-white/95 backdrop-blur-md border border-stone-200/90 shadow-xl p-1.5 rounded-2xl text-stone-700">
            <button
              onClick={handleZoomIn}
              className="p-2.5 hover:bg-stone-100 active:bg-stone-200 rounded-xl transition-colors cursor-pointer text-stone-800 active:scale-90"
              title="Perbesar"
            >
              <ZoomIn className="w-5 h-5 text-[#81AF43]" />
            </button>
            <div className="w-5 h-[1px] bg-stone-200/80 my-0.5" />
            <button
              onClick={handleZoomOut}
              className="p-2.5 hover:bg-stone-100 active:bg-stone-200 rounded-xl transition-colors cursor-pointer text-stone-800 active:scale-90"
              title="Perkecil"
            >
              <ZoomOut className="w-5 h-5 text-[#81AF43]" />
            </button>
          </div>

          {/* Desktop Zoom Controls: Horizontal layout with percentage & reset */}
          <div className="hidden sm:flex fixed bottom-6 right-6 z-40 items-center gap-2 bg-white/95 backdrop-blur-md border border-stone-200/90 shadow-xl px-3.5 py-2 rounded-full text-stone-700">
            <button
              onClick={handleZoomOut}
              className="p-1.5 hover:bg-stone-100 rounded-full transition-colors cursor-pointer text-stone-700 hover:text-[#81AF43]"
              title="Perkecil"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="font-mono text-xs font-bold w-12 text-center select-none text-stone-800">
              {Math.round(scale * 100)}%
            </span>
            <button
              onClick={handleZoomIn}
              className="p-1.5 hover:bg-stone-100 rounded-full transition-colors cursor-pointer text-stone-700 hover:text-[#81AF43]"
              title="Perbesar"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={handleResetZoom}
              className="p-1.5 hover:bg-stone-100 rounded-full transition-colors cursor-pointer text-stone-400 hover:text-stone-700 ml-0.5"
              title="Reset Zoom"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </>
      )}
    </div>
  );
}
