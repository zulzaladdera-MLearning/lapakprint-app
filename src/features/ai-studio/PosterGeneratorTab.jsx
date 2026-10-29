import React, { useState } from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  Printer, 
  ChevronRight, 
  UploadCloud,
  RefreshCw,
  Zap
} from 'lucide-react';
import { analyzeVisualSketchWithVision } from '../../services/aiRouter';
import { generatePosterWithRunware } from '../../services/runware';

export default function PosterGeneratorTab({ onStartOrderWithPoster }) {
  const [posterConcept, setPosterConcept] = useState('Seminar Nasional Riset AI dan Cloud Architecture 2026');
  const [sketchPreview, setSketchPreview] = useState(null);
  const [isAnalyzingVision, setIsAnalyzingVision] = useState(false);
  const [visionAnalysisResult, setVisionAnalysisResult] = useState(null);
  const [refinedRunwarePrompt, setRefinedRunwarePrompt] = useState('');
  
  const [isRenderingPoster, setIsRenderingPoster] = useState(false);
  const [renderedPoster, setRenderedPoster] = useState(null);
  const [selectedPaperSize, setSelectedPaperSize] = useState('A1');

  const handleSketchUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setSketchPreview(event.target.result);
      setVisionAnalysisResult(null);
      setRenderedPoster(null);
    };
    reader.readAsDataURL(file);
  };

  const handleAnalyzeWithGeminiVision = async () => {
    if (!posterConcept.trim()) return;
    setIsAnalyzingVision(true);
    setVisionAnalysisResult(null);

    const dummySketchBase64 = sketchPreview || 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';

    try {
      const res = await analyzeVisualSketchWithVision(dummySketchBase64, posterConcept);
      setVisionAnalysisResult(res.rawResponse);

      if (res.rawResponse.includes('[RUNWARE PROMPT]')) {
        const parts = res.rawResponse.split('[RUNWARE PROMPT]');
        setRefinedRunwarePrompt(parts[1].trim());
      } else {
        setRefinedRunwarePrompt(`Academic seminar poster for "${posterConcept}", high-contrast typography, deep blue and orange palette, 8k resolution, 300 DPI print ready`);
      }
    } catch (err) {
      setVisionAnalysisResult('Gagal menganalisis sketsa: ' + err.message);
    } finally {
      setIsAnalyzingVision(false);
    }
  };

  const handleRenderWithRunware = async () => {
    const promptToUse = refinedRunwarePrompt || posterConcept;
    setIsRenderingPoster(true);

    try {
      const res = await generatePosterWithRunware({
        prompt: promptToUse,
        aspectRatio: selectedPaperSize
      });
      setRenderedPoster(res);
    } catch (err) {
      alert('Gagal me-render poster via Runware: ' + err.message);
    } finally {
      setIsRenderingPoster(false);
    }
  };

  const handleForwardToOrder = () => {
    if (!renderedPoster || !onStartOrderWithPoster) return;
    onStartOrderWithPoster({
      id: 'prod_poster_ai',
      title: `Poster Ilmiah AI (${selectedPaperSize}) - ${posterConcept.slice(0, 30)}`,
      category: 'poster',
      basePrice: selectedPaperSize === 'A1' ? 45000 : selectedPaperSize === 'A2' ? 30000 : 20000,
      paperGsm: 'Art Paper 260 gsm',
      posterImageUrl: renderedPoster.imageUrl
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Kolom Kiri: Input Sketsa & Analisis Gemini Vision */}
      <div className="lg:col-span-6 space-y-5">
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center text-xs font-bold">1</span>
              Input Konsep & Sketsa Desain
            </h3>
            <span className="text-[10px] font-semibold text-sky-700 bg-sky-50 px-2 py-0.5 rounded-md">
              Gemini 3.8 Flash Vision
            </span>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Nama Acara / Topik Poster Ilmiah
            </label>
            <input
              type="text"
              value={posterConcept}
              onChange={(e) => setPosterConcept(e.target.value)}
              placeholder="Contoh: Seminar Nasional AI dan Cloud Architecture 2026..."
              className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>

          {/* Upload Sketsa Coretan Tangan / Pamflet Rujukan */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Unggah Sketsa Kasar Coretan Tangan (Opsional)
            </label>
            {sketchPreview ? (
              <div className="relative border border-slate-200 rounded-xl p-2 bg-slate-50">
                <img
                  src={sketchPreview}
                  alt="Sketsa Rujukan"
                  className="max-h-36 w-full object-contain rounded-lg"
                />
                <button
                  onClick={() => setSketchPreview(null)}
                  className="absolute top-3 right-3 text-[10px] bg-rose-600 text-white px-2 py-0.5 rounded-md hover:bg-rose-700 font-bold"
                >
                  Hapus
                </button>
              </div>
            ) : (
              <label className="border-2 border-dashed border-slate-200 hover:border-sky-400 bg-slate-50 hover:bg-sky-50/40 rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer transition-all">
                <UploadCloud className="w-6 h-6 text-slate-400 mb-1" />
                <span className="text-xs text-slate-600 font-semibold">Klik untuk Unggah Foto Sketsa / Pamflet</span>
                <span className="text-[10px] text-slate-400">Gemini Vision akan mengekstrak tata letak & palet warnanya</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleSketchUpload}
                />
              </label>
            )}
          </div>

          <button
            onClick={handleAnalyzeWithGeminiVision}
            disabled={isAnalyzingVision || !posterConcept.trim()}
            className="w-full py-2.5 bg-gradient-to-r from-sky-600 to-blue-600 text-white rounded-xl text-xs font-bold shadow-md hover:shadow-lg disabled:opacity-50 flex items-center justify-center gap-2 transition-all"
          >
            {isAnalyzingVision ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Gemini Vision Sedang Membaca Sketsa...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Langkah 1: Analisis Sketsa via Gemini Vision</span>
              </>
            )}
          </button>
        </div>

        {/* Hasil Analisis Gemini Vision */}
        {visionAnalysisResult && (
          <div className="bg-sky-50/70 border border-sky-200 rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-sky-900">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-sky-600" />
                Hasil Abstraksi Gemini 3.8 Flash Vision
              </span>
              <span className="text-[10px] bg-sky-200 text-sky-800 px-2 py-0.5 rounded-full font-mono">
                Multimodal Passed
              </span>
            </div>
            <div className="text-xs text-slate-700 whitespace-pre-line leading-relaxed font-sans bg-white p-3 rounded-xl border border-sky-100 max-h-48 overflow-y-auto">
              {visionAnalysisResult}
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-600 block mb-1">
                Prompt Difusi Terstruktur (Di-generate Otomatis untuk Runware FLUX):
              </label>
              <textarea
                rows={3}
                value={refinedRunwarePrompt}
                onChange={(e) => setRefinedRunwarePrompt(e.target.value)}
                className="w-full p-2.5 text-[11px] font-mono bg-white border border-sky-200 rounded-xl focus:outline-none"
              />
            </div>
          </div>
        )}
      </div>

      {/* Kolom Kanan: Render via Runware FLUX & Direct Print */}
      <div className="lg:col-span-6 space-y-5">
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold">2</span>
              Render Poster Ultra-HD (Runware FLUX)
            </h3>
            <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
              300 DPI Print-Ready
            </span>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5">
              Pilih Format Kertas Poster Kampus
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'A1', label: 'Poster A1', size: '59.4 x 84.1 cm', price: 'Rp 45.000' },
                { id: 'A2', label: 'Poster A2', size: '42.0 x 59.4 cm', price: 'Rp 30.000' },
                { id: 'A3', label: 'Poster A3+', size: '32.0 x 48.0 cm', price: 'Rp 20.000' }
              ].map((sz) => (
                <button
                  key={sz.id}
                  onClick={() => setSelectedPaperSize(sz.id)}
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    selectedPaperSize === sz.id
                      ? 'border-emerald-500 bg-emerald-50/60 ring-2 ring-emerald-500/20'
                      : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                  }`}
                >
                  <p className="text-xs font-bold text-slate-800">{sz.label}</p>
                  <p className="text-[10px] text-slate-500">{sz.size}</p>
                  <p className="text-[10px] font-bold text-emerald-700 mt-1">{sz.price}</p>
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleRenderWithRunware}
            disabled={isRenderingPoster || (!refinedRunwarePrompt && !posterConcept)}
            className="w-full py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl text-xs font-bold shadow-md hover:shadow-lg disabled:opacity-50 flex items-center justify-center gap-2 transition-all"
          >
            {isRenderingPoster ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Runware Sedang Me-render Poster 300 DPI...</span>
              </>
            ) : (
              <>
                <Zap className="w-4 h-4" />
                <span>Langkah 2: Render Poster via Runware FLUX (Sub-Detik)</span>
              </>
            )}
          </button>
        </div>

        {/* Pratinjau Poster yang Berhasil Di-render */}
        {renderedPoster && (
          <div className="bg-white border border-emerald-300 rounded-2xl p-5 shadow-lg space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Poster Siap Cetak (Runware FLUX Output)
                </h4>
                <p className="text-[10px] text-slate-400">
                  Waktu Render: {renderedPoster.latencyMs} ms • Rasio: {renderedPoster.aspectRatio} • 300 DPI Standard
                </p>
              </div>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                Siap Cetak
              </span>
            </div>

            <div className="border border-slate-200 rounded-xl overflow-hidden shadow-inner bg-slate-950 flex items-center justify-center">
              <img
                src={renderedPoster.imageUrl}
                alt="Poster Hasil Runware"
                className="max-h-80 w-auto object-contain"
              />
            </div>

            <button
              onClick={handleForwardToOrder}
              className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold rounded-xl text-xs shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2 transition-all"
            >
              <Printer className="w-4 h-4" />
              <span>Langsung Cetak Poster Ini di LapakPrint</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
