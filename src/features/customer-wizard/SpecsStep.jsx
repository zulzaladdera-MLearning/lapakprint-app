import React from 'react';
import { FileText, Sparkles, ArrowRight } from 'lucide-react';
import { PRESET_DOCUMENTS, PRICING_RULES } from '../../data/mockData';
import CloudinaryUploadBox from '../customizer/CloudinaryUploadBox';

export default function SpecsStep({
  currentDoc,
  selectedDocPreset,
  customFile,
  onSelectDocPreset,
  onCustomFileUpload,
  paperType,
  setPaperType,
  printMode,
  setPrintMode,
  doubleSided,
  setDoubleSided,
  bindingType,
  setBindingType,
  bindingColor,
  setBindingColor,
  copies,
  setCopies,
  notes,
  setNotes,
  onBack,
  onNext
}) {
  const totalPages = currentDoc.pages;

  return (
    <div className="space-y-5">
      {/* File Selection */}
      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
          1. File Dokumen (Khusus PDF)
        </label>
        
        {/* Preset quick picker */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-3">
          {PRESET_DOCUMENTS.map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => onSelectDocPreset(preset)}
              className={`p-2.5 rounded-xl border text-left transition ${
                selectedDocPreset.id === preset.id && !customFile
                  ? 'border-blue-600 bg-blue-50/60 ring-2 ring-blue-500/20'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <FileText className="w-4 h-4 text-blue-600 shrink-0" />
                <span className="text-xs font-bold text-slate-800 truncate">{preset.name}</span>
              </div>
              <div className="text-[11px] text-slate-500 mt-1 flex justify-between">
                <span>{preset.pages} hlm</span>
                <span className="text-blue-600 font-semibold">{preset.colorPagesCount} w / {preset.bwPagesCount} bw</span>
              </div>
            </button>
          ))}
        </div>

        {/* Cloudinary CDN Upload Box */}
        <div className="mb-2">
          <CloudinaryUploadBox
            onUploadComplete={(meta) => {
              const mockPageCount = Math.floor(Math.random() * 35) + 15;
              const mockColorCount = Math.floor(mockPageCount * 0.25);
              onCustomFileUpload({
                id: 'custom-' + Date.now(),
                name: meta.original_filename,
                size: (meta.bytes / (1024 * 1024)).toFixed(1) + ' MB',
                pages: mockPageCount,
                colorPagesCount: mockColorCount,
                bwPagesCount: mockPageCount - mockColorCount,
                type: 'Dokumen Kustom (Cloudinary CDN)',
                cloudinary: meta
              });
            }}
          />
        </div>

        {/* Current Active File Summary */}
        <div className="mt-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2 truncate">
            <FileText className="w-4 h-4 text-blue-600 shrink-0" />
            <span className="font-semibold text-slate-800 truncate">{currentDoc.name}</span>
          </div>
          <span className="shrink-0 bg-blue-100 text-blue-800 px-2 py-0.5 rounded font-bold">
            {currentDoc.pages} Halaman
          </span>
        </div>
      </div>

      {/* Print Specs Config */}
      <div className="border-t border-slate-200 pt-4 space-y-4">
        <h4 className="font-bold text-xs text-slate-700 uppercase tracking-wider">
          2. Spesifikasi Pencetakan
        </h4>

        {/* Jenis Kertas */}
        <div>
          <label className="text-xs font-semibold text-slate-600 block mb-1.5">
            Ukuran & Gramatur Kertas:
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {Object.keys(PRICING_RULES.paper).map((paper) => (
              <button
                key={paper}
                type="button"
                onClick={() => setPaperType(paper)}
                className={`py-2 px-3 rounded-xl border text-xs font-bold transition ${
                  paperType === paper
                    ? 'border-blue-600 bg-blue-600 text-white shadow-sm'
                    : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                {paper}
              </button>
            ))}
          </div>
        </div>

        {/* Mode Warna */}
        <div>
          <label className="text-xs font-semibold text-slate-600 block mb-1.5">
            Mode Tinta & Warna:
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => setPrintMode('smart-mix')}
              className={`p-2.5 rounded-xl border text-left transition ${
                printMode === 'smart-mix'
                  ? 'border-blue-600 bg-blue-50/50 ring-2 ring-blue-500/20'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center space-x-1.5">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span className="text-xs font-bold text-slate-800">Smart Mix (Auto)</span>
              </div>
              <p className="text-[10px] text-slate-500 mt-1">
                Hemat biaya! Otomatis {currentDoc.colorPagesCount} hlm warna + {currentDoc.bwPagesCount} hlm hitam putih
              </p>
            </button>

            <button
              type="button"
              onClick={() => setPrintMode('bw')}
              className={`p-2.5 rounded-xl border text-left transition ${
                printMode === 'bw'
                  ? 'border-blue-600 bg-blue-50/50 ring-2 ring-blue-500/20'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <span className="text-xs font-bold text-slate-800">Semua Hitam Putih</span>
              <p className="text-[10px] text-slate-500 mt-1">
                Paling hemat: Seluruh {totalPages} hlm dicetak monokrom
              </p>
            </button>

            <button
              type="button"
              onClick={() => setPrintMode('color')}
              className={`p-2.5 rounded-xl border text-left transition ${
                printMode === 'color'
                  ? 'border-blue-600 bg-blue-50/50 ring-2 ring-blue-500/20'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <span className="text-xs font-bold text-slate-800">Semua Berwarna</span>
              <p className="text-[10px] text-slate-500 mt-1">
                Seluruh {totalPages} halaman dicetak kualitas warna penuh
              </p>
            </button>
          </div>
        </div>

        {/* Sisi Cetak (Duplex vs Simplex) */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
          <div>
            <span className="text-xs font-bold text-slate-800">Cetak Bolak-Balik (2 Sisi / Duplex)</span>
            <p className="text-[11px] text-slate-500">Hemat kertas & diskon 10% tarif cetak</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={doubleSided}
              onChange={(e) => setDoubleSided(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>

        {/* Jenis Jilid */}
        <div>
          <label className="text-xs font-semibold text-slate-600 block mb-1.5">
            Jenis Penjilidan:
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {Object.keys(PRICING_RULES.binding).map((bType) => (
              <button
                key={bType}
                type="button"
                onClick={() => setBindingType(bType)}
                className={`p-3 rounded-xl border text-left transition ${
                  bindingType === bType
                    ? 'border-blue-600 bg-blue-50/50 ring-2 ring-blue-500/20'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800">{bType}</span>
                  <span className="text-xs font-extrabold text-blue-700">
                    {PRICING_RULES.binding[bType] === 0 
                      ? 'Gratis' 
                      : `+Rp ${PRICING_RULES.binding[bType].toLocaleString('id-ID')}`}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Jika Hard Cover atau Lakban, opsi warna */}
          {bindingType !== 'Tanpa Jilid (Staples)' && (
            <div className="mt-3 flex items-center space-x-2">
              <span className="text-xs text-slate-600 font-medium">Pilihan Warna Sampul/Lakban:</span>
              {['Biru Tua', 'Hijau Tua', 'Merah Marun', 'Hitam'].map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setBindingColor(color)}
                  className={`px-2.5 py-1 text-xs rounded-lg font-semibold transition ${
                    bindingColor === color
                      ? 'bg-slate-800 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Copies */}
        <div className="flex items-center justify-between pt-2">
          <span className="text-xs font-bold text-slate-700">Jumlah Rangkap (Copies):</span>
          <div className="flex items-center space-x-3 bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              type="button"
              onClick={() => setCopies(Math.max(1, copies - 1))}
              className="w-8 h-8 rounded-lg bg-white font-bold text-slate-700 shadow-xs flex items-center justify-center hover:bg-slate-50"
            >
              -
            </button>
            <span className="font-bold text-sm text-slate-900 w-6 text-center">{copies}</span>
            <button
              type="button"
              onClick={() => setCopies(copies + 1)}
              className="w-8 h-8 rounded-lg bg-white font-bold text-slate-700 shadow-xs flex items-center justify-center hover:bg-slate-50"
            >
              +
            </button>
          </div>
        </div>

        {/* Catatan untuk Mitra */}
        <div>
          <label className="text-xs font-semibold text-slate-600 block mb-1">
            Catatan Tambahan untuk Operator:
          </label>
          <input
            type="text"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Contoh: Lampiran halaman 60 tolong jangan dilipat"
            className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Back / Next Buttons */}
      <div className="flex space-x-3 pt-2">
        <button
          onClick={onBack}
          className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition text-xs"
        >
          Kembali
        </button>
        <button
          onClick={onNext}
          className="flex-2 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl flex items-center justify-center space-x-2 transition shadow-md shadow-blue-500/20 text-xs"
        >
          <span>Lanjut ke Ringkasan Biaya</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
