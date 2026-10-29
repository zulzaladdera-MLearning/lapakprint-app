import React, { useState } from 'react';
import { MOCK_PARTNERS } from '../../data/mockData';
import { DETAILED_PRODUCTS } from '../../data/productDetails';

export default function ShopeeProductGrid({ onSelectPartnerForOrder, onSelectProduct }) {
  const [visibleCount, setVisibleCount] = useState(12);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setVisibleCount(prev => Math.min(prev + 6, DETAILED_PRODUCTS.length));
      setIsLoadingMore(false);
    }, 500);
  };

  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-6 mt-4 sm:mt-6">
      {/* Sticky-like Tab Bar */}
      <div className="bg-white border-b-2 border-sky-500 sticky top-12 md:top-28 z-30 shadow-2xs">
        <div className="py-2.5 sm:py-3 px-4 sm:px-6 text-center">
          <span className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-sky-600">
            REKOMENDASI UNTUK MAHASISWA
          </span>
        </div>
      </div>

      {/* 6-Column Products Grid (2 Col on Mobile) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-2.5 mt-2.5 sm:mt-3">
        {DETAILED_PRODUCTS.slice(0, visibleCount).map((prod) => (
          <div
            key={prod.id}
            onClick={() => {
              if (onSelectProduct) {
                onSelectProduct(prod);
              } else {
                const vendor = MOCK_PARTNERS.find(p => p.id === prod.partnerId) || MOCK_PARTNERS[0];
                onSelectPartnerForOrder(vendor);
              }
            }}
            className="bg-white rounded-xs border border-slate-200/80 hover:border-sky-500 hover:shadow-md transition cursor-pointer flex flex-col justify-between overflow-hidden group"
          >
            {/* Product Mockup Thumbnail */}
            <div className="relative bg-slate-50 aspect-square flex items-center justify-center border-b border-slate-100">
              <span className="text-4xl group-hover:scale-110 transition duration-200">
                {prod.thumbnail || '📄'}
              </span>

              {/* Star+ / Mall Badge */}
              <div className="absolute top-1.5 left-1.5 bg-sky-600 text-white font-extrabold text-[9px] px-1 py-0.2 rounded-2xs shadow-2xs">
                {prod.badge}
              </div>

              {/* Discount Badge */}
              <div className="absolute top-0 right-0 bg-yellow-400 text-slate-900 font-black text-[10px] px-1.5 py-0.5">
                -{prod.discount}
              </div>
            </div>

            {/* Product Body */}
            <div className="p-2 sm:p-2.5 flex-1 flex flex-col justify-between">
              <div>
                <h4 className="text-[11px] sm:text-xs text-slate-800 line-clamp-2 h-7 sm:h-8 leading-[14px] sm:leading-[16px] group-hover:text-sky-600 transition font-normal">
                  {prod.title}
                </h4>

                {/* Free Shipping Tag with fixed height */}
                <div className="h-4 mt-1 flex items-center">
                  {prod.isFreeShipping && (
                    <span className="text-[8px] sm:text-[9px] font-extrabold text-emerald-600 border border-emerald-400 bg-emerald-50 px-1 py-0.2 rounded-2xs">
                      Gratis Ongkir Xtra
                    </span>
                  )}
                </div>
              </div>

              {/* Price & Meta Footer */}
              <div className="mt-2 pt-1 border-t border-slate-50">
                <div className="flex items-baseline space-x-0.5">
                  <span className="text-[10px] sm:text-xs text-sky-600 font-extrabold">Rp</span>
                  <span className="text-xs sm:text-sm font-black text-sky-600">
                    {prod.price.toLocaleString('id-ID')}
                  </span>
                </div>

                <div className="flex items-center justify-between text-[9px] sm:text-[10px] text-slate-400 mt-0.5">
                  <span>⭐ {prod.rating}</span>
                  <span>{prod.sold} Terjual</span>
                </div>

                <div className="text-[9px] sm:text-[10px] text-slate-400 mt-0.5 truncate border-t border-slate-100 pt-0.5">
                  {prod.location}
                </div>
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* Load More Button ala Shopee */}
      <div className="text-center mt-8">
        {visibleCount < DETAILED_PRODUCTS.length ? (
          <button 
            onClick={handleLoadMore}
            disabled={isLoadingMore}
            className="px-12 py-2.5 bg-white border border-slate-300 hover:border-sky-500 hover:text-sky-600 text-slate-700 text-xs font-semibold rounded-xs shadow-2xs transition inline-flex items-center justify-center space-x-2 min-w-[200px]"
          >
            {isLoadingMore ? (
              <>
                <svg className="animate-spin h-4 w-4 text-sky-600" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                </svg>
                <span>Memuat rekomendasi lainnya...</span>
              </>
            ) : (
              <span>Lihat Lainnya ({DETAILED_PRODUCTS.length - visibleCount} Produk Tersedia)</span>
            )}
          </button>
        ) : (
          <div className="inline-block py-2.5 px-6 bg-slate-100 border border-slate-200 rounded-full text-slate-500 text-xs font-medium">
            🎉 Anda telah melihat seluruh {DETAILED_PRODUCTS.length} rekomendasi layanan percetakan mahasiswa hari ini.
          </div>
        )}
      </div>
    </div>
  );
}
