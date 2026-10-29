import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function ShopeeHeroBanners({ onNavigateFeature }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const banners = [
    {
      title: 'Musim Sidang Skripsi Telah Tiba!',
      subtitle: 'Diskon Jilid Hard Cover 25% + Embos Emas Standar Rektorat',
      tag: 'PROMO EKSKLUSIF KAMPUS',
      code: 'SKRIPSISUKSES',
      targetView: 'hardcover',
      bgClass: 'from-sky-500 to-blue-600'
    },
    {
      title: 'Gratis Ongkir Antar ke Kamar Kosan',
      subtitle: 'Kirim dokumen draf langsung ke depan kamar via kurir mahasiswa',
      tag: 'BEBAS ANTRE DI FOTOKOPI',
      code: 'ONGKIRKOSAN',
      targetView: 'voucher',
      bgClass: 'from-blue-600 to-indigo-600'
    },
    {
      title: 'Print Kilat 10 Menit Jadi!',
      subtitle: 'Upload PDF dari kamar, sampai toko tinggal tunjuk PIN serah terima',
      tag: 'GARANSI KECEPATAN',
      code: 'PRINTKILAT',
      targetView: 'kilat',
      bgClass: 'from-cyan-500 to-blue-600'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-6 pt-3 sm:pt-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-2">
        {/* Sisi Kiri (2/3 Width): Main Carousel Slider */}
        <div className="lg:col-span-8 relative group rounded-lg sm:rounded-xs overflow-hidden h-[180px] sm:h-[240px] md:h-[260px] shadow-xs">
          <div 
            onClick={() => onNavigateFeature(banners[currentSlide].targetView)}
            className={`w-full h-full p-4 sm:p-8 bg-gradient-to-r ${banners[currentSlide].bgClass} text-white flex flex-col justify-between transition-all duration-300 relative cursor-pointer`}
          >
            <div>
              <span className="inline-block px-2 py-0.5 text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider bg-white/20 backdrop-blur-xs rounded-full border border-white/30">
                {banners[currentSlide].tag}
              </span>
              <h2 className="text-base sm:text-2xl md:text-3xl font-extrabold mt-1.5 sm:mt-2 leading-tight drop-shadow-xs line-clamp-2">
                {banners[currentSlide].title}
              </h2>
              <p className="text-[11px] sm:text-sm text-sky-100 mt-0.5 sm:mt-1 max-w-md line-clamp-2">
                {banners[currentSlide].subtitle}
              </p>
            </div>

            <div className="flex items-center justify-between pt-1 sm:pt-2">
              <div className="flex items-center space-x-1.5 sm:space-x-2">
                <span className="text-[10px] sm:text-[11px] text-white/80">Kupon:</span>
                <span className="px-1.5 sm:px-2 py-0.5 bg-white text-sky-700 font-mono font-bold text-[10px] sm:text-xs rounded-xs shadow-xs">
                  {banners[currentSlide].code}
                </span>
              </div>

              {/* Carousel Dots */}
              <div className="flex space-x-1.5" onClick={(e) => e.stopPropagation()}>
                {banners.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentSlide(i)}
                    className={`h-1.5 sm:h-2 rounded-full transition-all ${
                      currentSlide === i ? 'w-5 sm:w-6 bg-white' : 'w-1.5 sm:w-2 bg-white/40'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Slider Arrows */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setCurrentSlide(prev => (prev === 0 ? banners.length - 1 : prev - 1));
              }}
              className="hidden sm:flex absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/20 hover:bg-black/40 text-white items-center justify-center transition opacity-0 group-hover:opacity-100"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setCurrentSlide(prev => (prev === banners.length - 1 ? 0 : prev + 1));
              }}
              className="hidden sm:flex absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/20 hover:bg-black/40 text-white items-center justify-center transition opacity-0 group-hover:opacity-100"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Sisi Kanan (1/3 Width): 2 Stacked Mini Banners */}
        <div className="lg:col-span-4 grid grid-cols-2 lg:grid-cols-1 gap-2 h-auto sm:h-[240px] md:h-[260px]">
          {/* Top Mini Banner */}
          <div 
            onClick={() => onNavigateFeature('guarantee')}
            className="bg-white rounded-lg sm:rounded-xs p-2.5 sm:p-4 border border-slate-200/80 shadow-2xs flex flex-col justify-between hover:shadow-xs transition cursor-pointer group h-[78px] sm:h-auto"
          >
            <div>
              <span className="text-[8px] sm:text-[9px] font-extrabold text-sky-700 bg-sky-50 px-1.5 py-0.2 rounded border border-sky-200">
                GARANSI
              </span>
              <h4 className="font-extrabold text-xs sm:text-sm text-slate-800 mt-0.5 group-hover:text-sky-600 transition truncate">
                Auto-Purge 24 Jam
              </h4>
            </div>
            <span className="text-[10px] sm:text-[11px] font-bold text-sky-600 flex items-center gap-1">
              Aman 100% ➔
            </span>
          </div>

          {/* Bottom Mini Banner */}
          <div 
            onClick={() => onNavigateFeature('kilat')}
            className="bg-white rounded-lg sm:rounded-xs p-2.5 sm:p-4 border border-slate-200/80 shadow-2xs flex flex-col justify-between hover:shadow-xs transition cursor-pointer group h-[78px] sm:h-auto"
          >
            <div>
              <span className="text-[8px] sm:text-[9px] font-extrabold text-indigo-700 bg-indigo-50 px-1.5 py-0.2 rounded border border-indigo-200">
                UNGGULAN
              </span>
              <h4 className="font-extrabold text-xs sm:text-sm text-slate-800 mt-0.5 group-hover:text-indigo-600 transition truncate">
                Ambil Pakai PIN
              </h4>
            </div>
            <span className="text-[10px] sm:text-[11px] font-bold text-indigo-600 flex items-center gap-1">
              Cepat Selesai ➔
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
