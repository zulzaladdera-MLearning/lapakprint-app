import React, { useState } from 'react';
import { ArrowLeft, FileText, Calculator, Sparkles, Check, ArrowRight } from 'lucide-react';
import { MOCK_PARTNERS } from '../../data/mockData';

export default function DraftPrintingView({ onBack, onStartOrder }) {
  const [pageCount, setPageCount] = useState(40);
  const [isDuplex, setIsDuplex] = useState(true);

  // Price calculation
  const singlePrice = pageCount * 350;
  const duplexPrice = Math.round(pageCount * 350 * 0.9);
  const paperSheets = isDuplex ? Math.ceil(pageCount / 2) : pageCount;
  const moneySaved = singlePrice - duplexPrice;

  return (
    <div className="bg-[#f5f5f5] min-h-[calc(100vh-8rem)] py-5 font-['Plus_Jakarta_Sans',sans-serif]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-4">
        
        {/* Breadcrumb & Back Button */}
        <div className="flex items-center space-x-2 text-xs text-slate-500">
          <button onClick={onBack} className="hover:text-sky-600 font-bold flex items-center gap-1">
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Beranda</span>
          </button>
          <span>/</span>
          <span className="text-slate-800 font-semibold">Print Draf Tugas & Makalah</span>
        </div>

        {/* Hero Section */}
        <div className="bg-gradient-to-r from-sky-500 to-indigo-600 rounded-xs p-6 text-white shadow-xs">
          <div className="max-w-xl space-y-2">
            <span className="bg-white/20 text-white font-extrabold text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider">
              PRINT EKONOMIS MAHASISWA
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold leading-tight">
              Cetak Draf Tugas & Makalah Harian Mulai Rp 200/Lembar
            </h1>
            <p className="text-xs sm:text-sm text-sky-100">
              Hemat pengeluaran bulanan kuliah dengan opsi cetak bolak-balik (duplex) dan kertas bermutu PaperOne.
            </p>
          </div>
        </div>

        {/* Interactive Duplex Savings Calculator */}
        <div className="bg-white rounded-xs p-5 sm:p-6 shadow-2xs border border-slate-200 space-y-5">
          <div className="flex items-center space-x-2 pb-3 border-b border-slate-100">
            <Calculator className="w-5 h-5 text-sky-600" />
            <h3 className="font-extrabold text-sm sm:text-base text-slate-900">
              Kalkulator Hemat Kertas & Biaya (Duplex Simulation)
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-center">
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Jumlah Halaman Dokumen: <span className="text-sky-600 font-black">{pageCount} Halaman</span>
                </label>
                <input
                  type="range"
                  min="5"
                  max="150"
                  step="5"
                  value={pageCount}
                  onChange={(e) => setPageCount(Number(e.target.value))}
                  className="w-full accent-sky-500 cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xs border border-slate-200 text-xs">
                <div>
                  <span className="font-bold text-slate-800">Mode Cetak 2 Sisi (Bolak-Balik)</span>
                  <span className="text-[11px] text-slate-500 block">Diskon 10% tarif cetak</span>
                </div>
                <input
                  type="checkbox"
                  checked={isDuplex}
                  onChange={(e) => setIsDuplex(e.target.checked)}
                  className="w-4 h-4 accent-sky-500 rounded cursor-pointer"
                />
              </div>
            </div>

            {/* Output Card */}
            <div className="bg-sky-50 p-4 rounded-xs border border-sky-200 space-y-2 text-xs">
              <span className="text-[11px] font-bold text-sky-800 uppercase tracking-wider block">
                Hasil Kalkulasi Hemat:
              </span>
              <div className="flex justify-between text-slate-600">
                <span>Total Lembar Fisik Kertas:</span>
                <strong className="text-slate-900">{paperSheets} Lembar</strong>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Estimasi Biaya Cetak:</span>
                <strong className="text-sky-700 text-base font-black">
                  Rp {(isDuplex ? duplexPrice : singlePrice).toLocaleString('id-ID')}
                </strong>
              </div>
              {isDuplex && (
                <div className="pt-2 border-t border-sky-200 text-emerald-700 font-bold flex items-center gap-1">
                  <span>✓ Anda menghemat Rp {moneySaved.toLocaleString('id-ID')} & 50% lembar kertas!</span>
                </div>
              )}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex justify-end">
            <button
              onClick={() => onStartOrder(MOCK_PARTNERS[1])}
              className="py-3 px-6 bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs rounded-xs shadow-2xs transition flex items-center space-x-2"
            >
              <span>Mulai Upload & Cetak Draf Sekarang</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
