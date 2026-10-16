import React, { useState } from 'react';
import { ArrowLeft, Layers, CheckCircle2, ArrowRight } from 'lucide-react';
import { MOCK_PARTNERS } from '../../data/mockData';

export default function SpiralBindingView({ onBack, onStartOrder }) {
  const [spiralType, setSpiralType] = useState('kawat');
  const [coverFinish, setCoverFinish] = useState('doff');

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
          <span className="text-slate-800 font-semibold">Jilid Spiral Kawat & Mika</span>
        </div>

        {/* Hero Section */}
        <div className="bg-gradient-to-r from-indigo-700 via-sky-600 to-blue-600 rounded-xs p-6 text-white shadow-xs">
          <div className="max-w-xl space-y-2">
            <span className="bg-white/20 text-white font-extrabold text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider">
              SPESIALIS BUKU & MODUL
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold leading-tight">
              Jilid Spiral Kawat Double Loop & Mika Doff Mewah
            </h1>
            <p className="text-xs sm:text-sm text-sky-100">
              Buku catatan kuliah, portofolio desain, laporan magang, atau modul praktikum yang bisa dibuka 360 derajat dengan nyaman.
            </p>
          </div>
        </div>

        {/* Choices Grid */}
        <div className="bg-white rounded-xs p-5 sm:p-6 shadow-2xs border border-slate-200 space-y-5">
          <div>
            <h3 className="font-extrabold text-sm sm:text-base text-slate-900 mb-2">
              Pilih Material Spiral & Jenis Mika
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              <div 
                onClick={() => setSpiralType('kawat')}
                className={`p-4 rounded-xs border-2 cursor-pointer transition ${
                  spiralType === 'kawat'
                    ? 'border-sky-500 bg-sky-50/40 ring-1 ring-sky-400'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-slate-900">🌀 Spiral Kawat (Double Loop Wire)</h4>
                  <span className="text-xs font-bold text-sky-600">+Rp 12.000</span>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Kawat baja berlapis putih/hitam, sangat kuat, dan buku bisa dibuka flat 360 derajat. Paling direkomendasikan untuk laporan resmi.
                </p>
              </div>

              <div 
                onClick={() => setSpiralType('plastik')}
                className={`p-4 rounded-xs border-2 cursor-pointer transition ${
                  spiralType === 'plastik'
                    ? 'border-sky-500 bg-sky-50/40 ring-1 ring-sky-400'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-slate-900">🌀 Spiral Plastik (Comb Binding)</h4>
                  <span className="text-xs font-bold text-sky-600">+Rp 8.000</span>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Ring plastik fleksibel. Sangat praktis karena halaman kertas masih bisa ditambah atau dikurangi jika ada revisi halaman.
                </p>
              </div>

            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
            <div className="text-xs text-slate-500">
              Sudah termasuk 2 lembar mika pelindung (depan & belakang)
            </div>
            <button
              onClick={() => onStartOrder(MOCK_PARTNERS[0])}
              className="py-3 px-6 bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs rounded-xs shadow-2xs transition flex items-center space-x-2"
            >
              <span>Pesan Jilid Spiral Sekarang</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
