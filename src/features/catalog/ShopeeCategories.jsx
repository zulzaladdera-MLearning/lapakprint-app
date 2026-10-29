import React from 'react';

const SHOPEE_CATEGORIES = [
  { id: 'c1', view: 'draft', name: 'Draf Skripsi', icon: '📑' },
  { id: 'c2', view: 'hardcover', name: 'Hard Cover', icon: '📘' },
  { id: 'c3', view: 'spiral', name: 'Jilid Spiral', icon: '🌀' },
  { id: 'c4', view: 'kilat', name: 'Print Kilat', icon: '⚡' },
  { id: 'c5', view: 'draft', name: 'Cetak Duplex', icon: '🔄' },
  { id: 'c6', view: 'draft', name: 'Jurnal Paper', icon: '📜' },
  { id: 'c7', view: 'draft', name: 'PaperOne 80g', icon: '📦' },
  { id: 'c8', view: 'poster', name: 'Poster A3+', icon: '🎨' },
  { id: 'c9', view: 'all-services', name: 'Color Glossy', icon: '🖨️' },
  { id: 'c10', view: 'draft', name: 'Fotokopi A4', icon: '📚' },
  { id: 'c11', view: 'all-services', name: 'Jilid Mika', icon: '📎' },
  { id: 'c12', view: 'partners', name: 'Kurir Kosan', icon: '🛵' },
];

export default function ShopeeCategories({ onNavigateFeature }) {
  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-6 mt-3 sm:mt-5">
      <div className="bg-white rounded-lg sm:rounded-xs shadow-2xs border border-slate-200/80 overflow-hidden">
        <div className="p-3 sm:p-3.5 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-xs sm:text-sm font-bold text-slate-700 uppercase tracking-wider">
            KATEGORI LAYANAN
          </h3>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-6 divide-x divide-y divide-slate-100">
          {SHOPEE_CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              onClick={() => onNavigateFeature(cat.view)}
              className="p-2 sm:p-3.5 flex flex-col items-center justify-center text-center cursor-pointer hover:shadow-xs transition group bg-white hover:z-10"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center text-xl sm:text-2xl group-hover:scale-110 transition">
                {cat.icon}
              </div>
              <div className="h-6 sm:h-7 flex items-center justify-center text-center mt-1 w-full">
                <span className="text-[10px] sm:text-xs text-slate-700 font-medium leading-[12px] sm:leading-[14px] line-clamp-2 group-hover:text-sky-600">
                  {cat.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
