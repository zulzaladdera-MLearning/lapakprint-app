import React from 'react';
import { Store } from 'lucide-react';

export default function ActiveOrderBanner({ activeOrder }) {
  if (!activeOrder) return null;

  return (
    <div className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white rounded-2xl p-5 shadow-lg relative overflow-hidden">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-200">Pesanan Aktif Dipantau</span>
        </div>
        <span className="text-xs font-mono bg-blue-900/60 px-2 py-0.5 rounded border border-blue-400/30">
          #{activeOrder.id}
        </span>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h4 className="font-bold text-base truncate max-w-xs">{activeOrder.docName}</h4>
          <p className="text-xs text-blue-200 flex items-center gap-1 mt-0.5">
            <Store className="w-3.5 h-3.5" /> {activeOrder.vendorName}
          </p>
        </div>

        {/* Status Pill */}
        <div className="bg-white/10 backdrop-blur-md px-3 py-2 rounded-xl border border-white/20 flex items-center space-x-3">
          <div className="text-right">
            <div className="text-[10px] text-blue-200 uppercase font-semibold">Status Saat Ini</div>
            <div className="text-sm font-extrabold capitalize text-emerald-300">
              {activeOrder.status === 'pending' && 'Menunggu Cetak'}
              {activeOrder.status === 'printing' && 'Sedang Dicetak'}
              {activeOrder.status === 'binding' && 'Sedang Dijilid'}
              {activeOrder.status === 'ready' && '🎉 Siap Diambil!'}
              {activeOrder.status === 'completed' && 'Selesai'}
            </div>
          </div>
          {activeOrder.status === 'ready' && (
            <div className="bg-emerald-400 text-emerald-950 font-mono font-bold px-2 py-1 rounded-lg text-xs animate-bounce">
              PIN: {activeOrder.pickupPin}
            </div>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-4">
        <div className="w-full bg-blue-950/60 h-2 rounded-full overflow-hidden flex">
          <div 
            className={`h-full bg-emerald-400 transition-all duration-500 ${
              activeOrder.status === 'pending' ? 'w-1/4' :
              activeOrder.status === 'printing' ? 'w-2/4' :
              activeOrder.status === 'binding' ? 'w-3/4' :
              'w-full'
            }`}
          ></div>
        </div>
        <div className="flex justify-between text-[10px] text-blue-200 mt-1">
          <span>Diterima</span>
          <span>Cetak</span>
          <span>Jilid</span>
          <span>Siap Ambil</span>
        </div>
      </div>
    </div>
  );
}
