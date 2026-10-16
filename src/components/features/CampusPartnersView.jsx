import React, { useState } from 'react';
import { ArrowLeft, MapPin, Store, Clock, Star, Phone, CheckCircle2, ArrowRight } from 'lucide-react';
import { MOCK_PARTNERS } from '../../data/mockData';

export default function CampusPartnersView({ onBack, onStartOrder }) {
  const [selectedCampus, setSelectedCampus] = useState('UI Depok');

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
          <span className="text-slate-800 font-semibold">Mitra Kampus Resmi (Geofencing)</span>
        </div>

        {/* Hero Section */}
        <div className="bg-gradient-to-r from-sky-600 to-blue-700 rounded-xs p-6 text-white shadow-xs">
          <div className="max-w-xl space-y-2">
            <div className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-white/20 text-[10px] font-bold uppercase tracking-wider">
              <MapPin className="w-3.5 h-3.5 text-red-300" />
              <span>GEOFENCING HYPERLOCAL KAMPUS</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold leading-tight">
              Mitra Percetakan & Fotokopi Resmi Sekitar Kampus
            </h1>
            <p className="text-xs sm:text-sm text-sky-100">
              Hanya menampilkan toko fotokopi terverifikasi dalam radius 1.5 km dari kampus untuk memastikan dokumen cepat diambil dan mudah dijangkau.
            </p>
          </div>
        </div>

        {/* Campus Filter Selector */}
        <div className="bg-white p-4 rounded-xs border border-slate-200 shadow-2xs flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center space-x-2 font-bold text-slate-800">
            <span>Pilih Lokasi Kampus:</span>
            {['UI Depok', 'ITB Bandung', 'UGM Jogja', 'Unpad Jatinangor'].map((campus) => (
              <button
                key={campus}
                onClick={() => setSelectedCampus(campus)}
                className={`px-3 py-1.5 rounded-xs transition ${
                  selectedCampus === campus
                    ? 'bg-sky-500 text-white font-bold shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {campus}
              </button>
            ))}
          </div>

          <span className="text-emerald-600 font-bold bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
            ● 3 Mitra Buka di Sekitar {selectedCampus}
          </span>
        </div>

        {/* Partner Stores Directory */}
        <div className="space-y-3.5">
          {MOCK_PARTNERS.map((partner) => (
            <div
              key={partner.id}
              className="bg-white rounded-xs p-5 border border-slate-200 shadow-2xs hover:border-sky-300 transition flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex items-start space-x-4">
                <span className="text-4xl p-3 bg-sky-50 rounded-lg border border-sky-100 shrink-0">
                  {partner.avatar}
                </span>
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] font-bold bg-amber-400 text-slate-900 px-1 rounded">
                      {partner.badge}
                    </span>
                    <h3 className="font-extrabold text-base text-slate-900">{partner.name}</h3>
                  </div>
                  <p className="text-xs text-slate-500 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-red-500" />
                    <span>{partner.distance}</span>
                  </p>
                  <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                    <span className="font-bold text-amber-500">⭐ {partner.rating} ({partner.soldCount} order)</span>
                    <span className="text-slate-300">•</span>
                    <span className="text-emerald-600 font-medium flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> Antrean: {partner.queueTime}
                    </span>
                  </div>
                  <div className="pt-2 flex flex-wrap gap-1.5">
                    {partner.features.map((f, i) => (
                      <span key={i} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                        ✓ {f}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="shrink-0 sm:text-right">
                <span className="text-[11px] text-slate-400 block">Tarif Mulai</span>
                <div className="text-lg font-black text-sky-600">Rp {partner.priceStart} /lbr</div>
                <button
                  onClick={() => onStartOrder(partner)}
                  className="mt-2 w-full sm:w-auto py-2.5 px-5 bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs rounded-xs shadow-2xs transition flex items-center justify-center space-x-1"
                >
                  <span>Pesan di Toko Ini</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
