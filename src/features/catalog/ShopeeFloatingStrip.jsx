import React from 'react';

export default function ShopeeFloatingStrip({ onNavigateFeature }) {
  return (
    <div className="md:hidden px-3 pt-2 -mb-2">
      <div className="bg-white rounded-lg p-2.5 shadow-2xs border border-slate-200/80 flex items-center justify-between">
        <div 
          onClick={() => onNavigateFeature('lapakpay')}
          className="flex items-center space-x-2 cursor-pointer pr-2.5 border-r border-slate-100 flex-1 min-w-0"
        >
          <div className="w-7 h-7 rounded-full bg-sky-50 text-sky-600 flex items-center justify-center font-bold text-xs shrink-0">
            💰
          </div>
          <div className="truncate">
            <span className="text-[10px] text-slate-400 block leading-tight">LapakPay</span>
            <span className="text-xs font-black text-slate-800">Rp 125.000</span>
          </div>
        </div>

        <div 
          onClick={() => onNavigateFeature('lapakpay')}
          className="flex items-center space-x-2 cursor-pointer px-2.5 border-r border-slate-100 flex-1 min-w-0"
        >
          <div className="w-7 h-7 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-xs shrink-0">
            🪙
          </div>
          <div className="truncate">
            <span className="text-[10px] text-slate-400 block leading-tight">Koin</span>
            <span className="text-xs font-black text-amber-600">2.400 Koin</span>
          </div>
        </div>

        <div className="flex items-center space-x-1 pl-1.5 shrink-0">
          <button 
            onClick={() => onNavigateFeature('kilat')}
            className="px-2.5 py-1 bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white text-[10px] font-bold rounded-md shadow-2xs flex items-center space-x-1 transition"
          >
            <span>⚡ Kilat</span>
          </button>
        </div>
      </div>
    </div>
  );
}
