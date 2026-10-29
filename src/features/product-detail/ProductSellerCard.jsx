import React from 'react';
import { MapPin, Store, MessageCircle } from 'lucide-react';

export default function ProductSellerCard({ partner, onStartOrder }) {
  return (
    <div className="bg-white rounded-xs p-5 shadow-2xs border border-slate-200/80 flex flex-col md:flex-row md:items-center justify-between gap-6">
      <div className="flex items-center space-x-4">
        <span className="text-4xl p-3 bg-sky-50 rounded-lg border border-sky-100 shrink-0">
          {partner.avatar || '🏪'}
        </span>
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <h3 className="font-extrabold text-sm sm:text-base text-slate-900">
              {partner.name}
            </h3>
            <span className="text-[10px] font-bold bg-amber-400 text-slate-900 px-1.5 py-0.2 rounded">
              {partner.badge}
            </span>
          </div>
          <p className="text-xs text-slate-500 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-red-500" />
            <span>{partner.distance}</span>
          </p>
          <div className="flex items-center space-x-2 pt-1">
            <button
              onClick={() => onStartOrder(partner)}
              className="py-1 px-3 bg-sky-500 text-white font-bold text-xs rounded-2xs hover:bg-sky-600 transition flex items-center gap-1"
            >
              <Store className="w-3.5 h-3.5" />
              <span>Kunjungi Toko</span>
            </button>
            <button
              onClick={() => alert(`Chat WhatsApp dengan kasir ${partner.name}: Hubungi operator kami untuk konsultasi layout dokumen.`)}
              className="py-1 px-3 border border-slate-300 text-slate-700 font-bold text-xs rounded-2xs hover:bg-slate-50 transition flex items-center gap-1"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Chat Operator</span>
            </button>
          </div>
        </div>
      </div>

      {/* Seller Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-slate-600 border-t md:border-t-0 md:border-l border-slate-100 pt-3 md:pt-0 md:pl-6">
        <div>
          <span className="text-[11px] text-slate-400 block">Penilaian Toko</span>
          <span className="font-bold text-sky-600 text-sm">⭐ {partner.rating}</span>
        </div>
        <div>
          <span className="text-[11px] text-slate-400 block">Total Pesanan</span>
          <span className="font-bold text-slate-900 text-sm">{partner.soldCount}</span>
        </div>
        <div>
          <span className="text-[11px] text-slate-400 block">Waktu Antrean</span>
          <span className="font-bold text-emerald-600 text-sm">{partner.queueTime}</span>
        </div>
        <div>
          <span className="text-[11px] text-slate-400 block">Status Toko</span>
          <span className="font-bold text-emerald-600 text-sm">● Buka Sekarang</span>
        </div>
      </div>
    </div>
  );
}
