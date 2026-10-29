import React from 'react';

const SHOPEE_QUICK_MENUS = [
  { id: 'm_ai', view: 'ai-studio', name: 'AI Studio', icon: '✨', bg: 'bg-gradient-to-br from-indigo-500 to-sky-500 text-white shadow-sm ring-2 ring-sky-300' },
  { id: 'm1', view: 'voucher', name: 'Gratis Ongkir', icon: '🚚', bg: 'bg-emerald-100 text-emerald-600' },
  { id: 'm2', view: 'kilat', name: 'Print Kilat', icon: '⚡', bg: 'bg-amber-100 text-amber-600' },
  { id: 'm3', view: 'hardcover', name: 'Hard Cover', icon: '📘', bg: 'bg-blue-100 text-blue-600' },
  { id: 'm4', view: 'draft', name: 'Print Draf', icon: '📄', bg: 'bg-sky-100 text-sky-600' },
  { id: 'm5', view: 'spiral', name: 'Spiral Kawat', icon: '🌀', bg: 'bg-indigo-100 text-indigo-600' },
  { id: 'm6', view: 'partners', name: 'Mitra Kampus', icon: '🏪', bg: 'bg-purple-100 text-purple-600' },
  { id: 'm7', view: 'lapakpay', name: 'LapakPay', icon: '💰', bg: 'bg-yellow-100 text-yellow-600' },
  { id: 'm8', view: 'guarantee', name: 'Garansi Ulang', icon: '🛡️', bg: 'bg-rose-100 text-rose-600' },
  { id: 'm9', view: 'poster', name: 'Plotter A3', icon: '🎨', bg: 'bg-pink-100 text-pink-600' },
  { id: 'm10', view: 'all-services', name: 'Semua Jasa', icon: '📑', bg: 'bg-slate-100 text-slate-600' },
];

export default function ShopeeQuickMenus({ onNavigateFeature }) {
  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-6 mt-3 sm:mt-4">
      <div className="bg-white rounded-lg sm:rounded-xs p-3 sm:p-4 shadow-2xs border border-slate-200/60">
        <div className="grid grid-cols-5 sm:grid-cols-10 gap-y-3 gap-x-1 sm:gap-1 text-center">
          {SHOPEE_QUICK_MENUS.map((menu) => (
            <div
              key={menu.id}
              onClick={() => onNavigateFeature(menu.view)}
              className="flex flex-col items-center cursor-pointer group p-0.5 sm:p-1"
            >
              <div className={`w-11 h-11 sm:w-11 sm:h-11 rounded-full ${menu.bg} flex items-center justify-center text-lg sm:text-xl group-hover:-translate-y-1 transition duration-200 shadow-2xs`}>
                {menu.icon}
              </div>
              <div className="h-6 sm:h-7 flex items-center justify-center text-center mt-1 sm:mt-1.5 w-full">
                <span className="text-[10px] sm:text-[11px] text-slate-700 leading-[13px] line-clamp-2 group-hover:text-sky-600 font-medium">
                  {menu.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
