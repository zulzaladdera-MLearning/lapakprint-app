import React from 'react';
import { ArrowLeft, Zap, Clock, ShieldCheck, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';
import { MOCK_PARTNERS } from '../../data/mockData';

export default function PrintKilatView({ onBack, onStartOrder }) {
  const readyPartners = MOCK_PARTNERS.filter(p => p.queueCount <= 2);

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
          <span className="text-slate-800 font-semibold">Print Kilat 10 Menit</span>
        </div>

        {/* Hero Section */}
        <div className="bg-gradient-to-r from-amber-500 to-sky-600 rounded-xs p-6 text-white shadow-xs">
          <div className="max-w-xl space-y-2">
            <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-xs text-white text-[11px] font-black uppercase tracking-wider">
              <Zap className="w-3.5 h-3.5 fill-yellow-300 text-yellow-300" />
              <span>JALUR DARURAT SIDANG & TUGAS</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold leading-tight">
              Print Kilat 10 Menit Jadi — Siap Ambil Tanpa Antre
            </h1>
            <p className="text-xs sm:text-sm text-sky-100">
              Butuh dokumen dicetak mendadak sebelum masuk ruang sidang dosen? Pesanan Anda otomatis diposisikan di urutan paling atas mesin cetak.
            </p>
          </div>
        </div>

        {/* 3 Pillars of Express Service */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="bg-white p-4 rounded-xs border border-slate-200 shadow-2xs flex items-start space-x-3">
            <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
              <Zap className="w-5 h-5 fill-amber-500 text-amber-500" />
            </div>
            <div>
              <h4 className="font-extrabold text-xs text-slate-900">Prioritas Antrean #1</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Pesanan ditandai merah di tablet kasir fotokopi untuk langsung diproses saat file masuk.
              </p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xs border border-slate-200 shadow-2xs flex items-start space-x-3">
            <div className="w-10 h-10 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5 text-sky-600" />
            </div>
            <div>
              <h4 className="font-extrabold text-xs text-slate-900">Garansi Waktu 10 Menit</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Jika dokumen belum selesai dalam 10 menit, biaya layanan express kami kembalikan 100%.
              </p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xs border border-slate-200 shadow-2xs flex items-start space-x-3">
            <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <h4 className="font-extrabold text-xs text-slate-900">Ambil Pakai 4-Digit PIN</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Datang ke toko, tunjukkan PIN di layar HP ke kasir, dokumen langsung diserahkan tanpa antre.
              </p>
            </div>
          </div>
        </div>

        {/* Mitra yang Sedang Buka & Siap Cetak Kilat */}
        <div className="bg-white rounded-xs p-5 shadow-2xs border border-slate-200 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="font-extrabold text-sm sm:text-base text-slate-900">
                Toko dengan Mesin Cetak Siap (Antrean Rendah)
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Rekomendasi toko terdekat dengan mesin yang tidak sedang overload
              </p>
            </div>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              ● Siap Cetak Langsung
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {readyPartners.map((partner) => (
              <div 
                key={partner.id}
                className="p-4 rounded-xs border border-slate-200 hover:border-amber-400 transition flex items-center justify-between gap-4 bg-slate-50/50"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-3xl p-2 bg-white rounded-lg border border-slate-200">
                    {partner.avatar}
                  </span>
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-slate-900">{partner.name}</h4>
                    <p className="text-[11px] text-slate-500">{partner.distance}</p>
                    <div className="flex items-center space-x-2 text-[10px] mt-1">
                      <span className="text-amber-600 font-bold">⭐ {partner.rating}</span>
                      <span className="text-slate-300">|</span>
                      <span className="text-emerald-600 font-bold">Waktu: ~{partner.queueTime}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => onStartOrder(partner)}
                  className="py-2 px-3.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-xs shadow-2xs transition flex items-center space-x-1 shrink-0"
                >
                  <Zap className="w-3.5 h-3.5 fill-slate-950" />
                  <span>Pesan Kilat</span>
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
