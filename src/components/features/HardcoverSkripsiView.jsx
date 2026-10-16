import React, { useState } from 'react';
import { ArrowLeft, BookOpen, Award, CheckCircle2, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';
import { MOCK_PARTNERS } from '../../data/mockData';

export default function HardcoverSkripsiView({ onBack, onStartOrder }) {
  const [selectedColor, setSelectedColor] = useState('Biru Tua');
  const [foilColor, setFoilColor] = useState('Emas (Gold Hotprint)');

  const facultyColors = [
    { name: 'Biru Tua', faculties: 'Ilmu Komputer (Fasilkom), Teknik', colorClass: 'bg-blue-900 text-white' },
    { name: 'Hijau Tua', faculties: 'Kedokteran, Kedokteran Gigi, Farmasi', colorClass: 'bg-emerald-900 text-white' },
    { name: 'Merah Marun', faculties: 'Hukum, Ekonomi & Bisnis (FEB)', colorClass: 'bg-rose-950 text-white' },
    { name: 'Kuning Kunyit', faculties: 'Ilmu Sosial & Ilmu Politik (FISIP)', colorClass: 'bg-amber-500 text-slate-950' },
    { name: 'Hitam Elegan', faculties: 'Pascasarjana (Magister S2 / Doktoral S3)', colorClass: 'bg-slate-950 text-white' }
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
          <span className="text-slate-800 font-semibold">Jilid Hard Cover Skripsi</span>
        </div>

        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 rounded-xs p-6 sm:p-8 text-white shadow-xs">
          <div className="max-w-2xl space-y-2.5">
            <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-[11px] font-bold border border-amber-400/30">
              <Award className="w-3.5 h-3.5" />
              <span>STANDAR RESMI PERPUSTAKAAN & REKTORAT KAMPUS</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold leading-tight">
              Jilid Hard Cover Skripsi & Tesis Embos Emas Berkualitas
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              Dikerjakan dengan jahit benang kuat, karton tebal no. 30/40 anti-melengkung, hotprint huruf emas tajam, serta pita pembatas pembaca.
            </p>
          </div>
        </div>

        {/* Interactive Faculty Color Guide */}
        <div className="bg-white rounded-xs p-5 sm:p-6 shadow-2xs border border-slate-200 space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="font-extrabold text-sm sm:text-base text-slate-900">
                1. Pilih Panduan Warna Sampul Sesuai Fakultas Anda
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Warna kain dan lamination cover disesuaikan dengan aturan resmi kampus
              </p>
            </div>
            <span className="text-xs font-bold text-sky-600 bg-sky-50 px-2 py-0.5 rounded">
              Pilihan Aktif: {selectedColor}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {facultyColors.map((item) => (
              <button
                key={item.name}
                type="button"
                onClick={() => setSelectedColor(item.name)}
                className={`p-3.5 rounded-xs border-2 text-left transition ${
                  selectedColor === item.name
                    ? 'border-sky-500 bg-sky-50/50 shadow-xs ring-1 ring-sky-400'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className={`w-full h-8 rounded-xs ${item.colorClass} flex items-center justify-center font-bold text-xs mb-2 shadow-inner`}>
                  {item.name}
                </div>
                <h4 className="font-bold text-xs text-slate-900">{item.name}</h4>
                <p className="text-[10px] text-slate-500 mt-0.5 line-clamp-2">{item.faculties}</p>
              </button>
            ))}
          </div>

          {/* Foil & Finishing Options */}
          <div className="pt-4 border-t border-slate-100 space-y-3">
            <h4 className="font-bold text-xs text-slate-700 uppercase tracking-wider">
              2. Tinta Huruf Sampul (Hotprint Foil)
            </h4>
            <div className="flex flex-wrap gap-2.5 text-xs font-bold">
              {['Emas (Gold Hotprint)', 'Perak (Silver Foil)', 'Hitam Doff'].map((foil) => (
                <button
                  key={foil}
                  type="button"
                  onClick={() => setFoilColor(foil)}
                  className={`py-2 px-3.5 rounded-xs border transition ${
                    foilColor === foil
                      ? 'border-sky-500 bg-sky-500 text-white shadow-2xs'
                      : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {foil}
                </button>
              ))}
            </div>
          </div>

          {/* Quality Checklist */}
          <div className="bg-slate-50 p-4 rounded-xs border border-slate-200 space-y-2 text-xs">
            <span className="font-bold text-slate-800 block">Garansi Kualitas Jilid Hard Cover LapakPrint:</span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-slate-600">
              <span className="flex items-center gap-1.5">✓ Jahit Benang Kuat (Anti-Halaman Lepas)</span>
              <span className="flex items-center gap-1.5">✓ Tulisan Embos Rapi & Simetris</span>
              <span className="flex items-center gap-1.5">✓ Termasuk Pita Pembatas Buku Kuning</span>
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-2 flex justify-end">
            <button
              onClick={() => onStartOrder(MOCK_PARTNERS[0])}
              className="py-3 px-6 bg-sky-500 hover:bg-sky-600 text-white font-extrabold text-xs rounded-xs shadow-2xs transition flex items-center space-x-2"
            >
              <span>Lanjut Pesan Jilid Hard Cover (Mulai Rp 35.000)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
