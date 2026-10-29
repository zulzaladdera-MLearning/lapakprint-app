import React, { useState, useEffect } from 'react';
import { Zap, ChevronRight as ArrowIcon } from 'lucide-react';
import { MOCK_PARTNERS } from '../../data/mockData';
import { DETAILED_PRODUCTS } from '../../data/productDetails';

const FLASH_SALE_ITEMS = [
  {
    id: 'fs-1',
    title: 'Print Hitam Putih A4 70gr (Tugas Harian)',
    originalPrice: 350,
    salePrice: 200,
    discount: '-43%',
    soldPercent: 85,
    tag: 'Tersisa 15 rim',
    imageText: 'A4 BW'
  },
  {
    id: 'fs-2',
    title: 'Jilid Lakban + Mika Bening Kilat 10 Mnt',
    originalPrice: 4000,
    salePrice: 2500,
    discount: '-38%',
    soldPercent: 92,
    tag: 'Hampir Habis',
    imageText: 'Lakban'
  },
  {
    id: 'fs-3',
    title: 'Paket Cetak Makalah 30 Halaman + Jilid',
    originalPrice: 15000,
    salePrice: 9900,
    discount: '-34%',
    soldPercent: 70,
    tag: 'Terjual 140',
    imageText: 'Paket'
  },
  {
    id: 'fs-4',
    title: 'Print Full Color A4 80gr Grafik / Bagan',
    originalPrice: 1500,
    salePrice: 900,
    discount: '-40%',
    soldPercent: 60,
    tag: 'Terjual 88',
    imageText: 'Warna'
  },
  {
    id: 'fs-5',
    title: 'Jilid Spiral Kawat Cover Mika Doff',
    originalPrice: 15000,
    salePrice: 10500,
    discount: '-30%',
    soldPercent: 78,
    tag: 'Terjual 62',
    imageText: 'Spiral'
  },
  {
    id: 'fs-6',
    title: 'Hard Cover Skripsi Warna Biru / Hijau',
    originalPrice: 40000,
    salePrice: 29500,
    discount: '-26%',
    soldPercent: 88,
    tag: 'Tersisa 10 slot',
    imageText: 'Hardcover'
  }
];

export default function ShopeeFlashSale({ onSelectPartnerForOrder, onNavigateFeature, onSelectProduct }) {
  const [timeLeft, setTimeLeft] = useState({ hours: 1, minutes: 24, seconds: 48 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 2, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-6 mt-3 sm:mt-5">
      <div className="bg-white rounded-lg sm:rounded-xs shadow-2xs border border-slate-200/80 p-3 sm:p-4">
        {/* Flash Sale Header */}
        <div className="flex items-center justify-between pb-2.5 sm:pb-3 border-b border-slate-100">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="flex items-center space-x-1 sm:space-x-1.5 text-sky-600 font-black italic text-sm sm:text-lg tracking-wider">
              <Zap className="w-4 h-4 sm:w-5 sm:h-5 fill-sky-500 text-sky-500" />
              <span>FLASH SALE</span>
            </div>

            {/* Countdown timer */}
            <div className="flex items-center space-x-1 text-[10px] sm:text-xs font-bold">
              <span className="bg-slate-900 text-white px-1 sm:px-1.5 py-0.5 rounded font-mono">
                {String(timeLeft.hours).padStart(2, '0')}
              </span>
              <span>:</span>
              <span className="bg-slate-900 text-white px-1 sm:px-1.5 py-0.5 rounded font-mono">
                {String(timeLeft.minutes).padStart(2, '0')}
              </span>
              <span>:</span>
              <span className="bg-slate-900 text-white px-1 sm:px-1.5 py-0.5 rounded font-mono">
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
            </div>
          </div>

          <button 
            onClick={() => onNavigateFeature('all-services')}
            className="text-[11px] sm:text-xs text-sky-600 font-semibold hover:underline flex items-center"
          >
            <span>Lihat Semua</span>
            <ArrowIcon className="w-3.5 h-3.5 ml-0.5" />
          </button>
        </div>

        {/* Flash Sale Items Grid (6 Items - Swipeable on Mobile) */}
        <div className="flex overflow-x-auto no-scrollbar gap-2.5 sm:grid sm:grid-cols-3 lg:grid-cols-6 sm:overflow-visible mt-3 pb-1">
          {FLASH_SALE_ITEMS.map((item) => {
            const fsTargetId = 
              item.id === 'fs-1' ? 'p8' : 
              item.id === 'fs-2' ? 'p3' : 
              item.id === 'fs-3' ? 'p7' : 
              item.id === 'fs-4' ? 'p5' : 
              item.id === 'fs-5' ? 'p4' : 'p1';
            return (
              <div
                key={item.id}
                onClick={() => {
                  const prod = DETAILED_PRODUCTS.find(d => d.id === fsTargetId);
                  if (onSelectProduct && prod) {
                    onSelectProduct(prod);
                  } else {
                    onSelectPartnerForOrder(MOCK_PARTNERS[0]);
                  }
                }}
                className="group cursor-pointer flex flex-col justify-between min-w-[125px] w-[125px] sm:w-auto sm:min-w-0 shrink-0 sm:shrink"
              >
                <div className="relative bg-slate-100 rounded-xs aspect-square flex items-center justify-center overflow-hidden border border-slate-200/60">
                  <span className="text-slate-400 font-bold text-xs uppercase tracking-wider">
                    {item.imageText}
                  </span>
                  
                  {/* Discount tag badge in top right */}
                  <div className="absolute top-0 right-0 bg-yellow-400 text-slate-900 font-black text-[10px] px-1 py-0.5 rounded-bl-sm">
                    {item.discount}
                  </div>
                </div>

                <div className="mt-2 text-center">
                  <div className="text-sm font-bold text-sky-600">
                    Rp {item.salePrice.toLocaleString('id-ID')}
                  </div>

                  {/* Flame progress bar */}
                  <div className="w-full bg-slate-200 h-3.5 rounded-full mt-1.5 relative overflow-hidden flex items-center justify-center">
                    <div 
                      className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-amber-500 to-sky-500 rounded-full"
                      style={{ width: `${item.soldPercent}%` }}
                    ></div>
                    <span className="relative z-10 text-[9px] font-extrabold text-white uppercase tracking-wider drop-shadow-2xs">
                      {item.tag}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
