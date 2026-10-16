import React, { useState } from 'react';
import { ArrowLeft, Image, Sparkles, Check, ArrowRight } from 'lucide-react';
import { MOCK_PARTNERS } from '../../data/mockData';

export default function PosterPlotterView({ onBack, onStartOrder }) {
  const [selectedSize, setSelectedSize] = useState('A3');
  const [paperMaterial, setPaperMaterial] = useState('Art Paper 260gr');
  const [useTube, setUseTube] = useState(true);

  const sizes = [
    { name: 'A3 (29.7 x 42 cm)', basePrice: 8000, desc: 'Paling sering untuk poster seminar hasil' },
    { name: 'A2 (42 x 59.4 cm)', basePrice: 25000, desc: 'Ukuran pameran karya studio desain' },
    { name: 'A1 (59.4 x 84.1 cm)', basePrice: 45000, desc: 'Gambar kerja arsitektur & denah teknik' },
    { name: 'A0 (84.1 x 118.9 cm)', basePrice: 85000, desc: 'Poster infografis raksasa konferensi' }
  ];

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
          <span className="text-slate-800 font-semibold">Studio Poster & Plotter Gambar Teknik</span>
        </div>

        {/* Hero Section */}
        <div className="bg-gradient-to-r from-pink-600 to-purple-700 rounded-xs p-6 text-white shadow-xs">
          <div className="max-w-xl space-y-2">
            <span className="bg-white/20 text-white font-extrabold text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider">
              TEKNIK, ARSITEKTUR & DKV
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold leading-tight">
              Cetak Poster Ilmiah & Plotter Gambar Teknik A3 s.d A0
            </h1>
            <p className="text-xs sm:text-sm text-pink-100">
              Mesin cetak plotter resolusi tinggi hingga 2400 DPI. Warna tajam, garis denah presisi, dan opsi tabung selongsong anti-lecek.
            </p>
          </div>
        </div>

        {/* Configuration */}
        <div className="bg-white rounded-xs p-5 sm:p-6 shadow-2xs border border-slate-200 space-y-5">
          <div>
            <h3 className="font-extrabold text-sm sm:text-base text-slate-900 mb-2">
              1. Pilih Dimensi Ukuran Kertas
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {sizes.map((s) => (
                <button
                  key={s.name}
                  onClick={() => setSelectedSize(s.name)}
                  className={`p-3.5 rounded-xs border-2 text-left transition ${
                    selectedSize === s.name
                      ? 'border-sky-500 bg-sky-50/40 ring-1 ring-sky-400'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <h4 className="font-bold text-xs sm:text-sm text-slate-900">{s.name}</h4>
                  <div className="text-sm font-black text-sky-600 mt-1">
                    Mulai Rp {s.basePrice.toLocaleString('id-ID')}
                  </div>
                  <p className="text-[10px] text-slate-500 mt-1">{s.desc}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 space-y-3">
            <h3 className="font-extrabold text-sm sm:text-base text-slate-900">
              2. Bahan Kertas & Aksesori
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-bold">
              {['Art Paper 260gr (Tebal Glossy)', 'Matte Paper (Tidak Silau Lampu)', 'Kertas Kalkir Transparan (Denah Arsitek)'].map((mat) => (
                <button
                  key={mat}
                  type="button"
                  onClick={() => setPaperMaterial(mat)}
                  className={`p-3 rounded-xs border transition text-left ${
                    paperMaterial === mat
                      ? 'border-sky-500 bg-sky-50 text-sky-800'
                      : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {mat}
                </button>
              ))}
            </div>

            <div className="p-3 bg-slate-50 rounded-xs border border-slate-200 flex items-center justify-between text-xs mt-2">
              <div>
                <span className="font-bold text-slate-800">Tambahkan Tabung Selongsong Karton (+Rp 8.000)</span>
                <p className="text-[11px] text-slate-500">Melindungi kertas A3-A0 dari kusut atau basah saat dibawa ke kampus</p>
              </div>
              <input
                type="checkbox"
                checked={useTube}
                onChange={(e) => setUseTube(e.target.checked)}
                className="w-4 h-4 accent-sky-500 rounded cursor-pointer"
              />
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex justify-end">
            <button
              onClick={() => onStartOrder(MOCK_PARTNERS[2])}
              className="py-3 px-6 bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs rounded-xs shadow-2xs transition flex items-center space-x-2"
            >
              <span>Lanjut Cetak Poster Sekarang</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
