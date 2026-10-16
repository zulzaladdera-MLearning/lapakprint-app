import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, ChevronRight, Zap, Flame, Star, 
  MapPin, Clock, ShieldCheck, Ticket, Check, ChevronRight as ArrowIcon 
} from 'lucide-react';
import { MOCK_PARTNERS } from '../data/mockData';
import { DETAILED_PRODUCTS } from '../data/productDetails';

// Shopee Circular Menu Icons (Concise 2-word labels for 100% cross-device alignment)
const SHOPEE_QUICK_MENUS = [
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

// Shopee 2-Row Categories
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

// Flash Sale Items
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

// Note: Rekomendasi products are now dynamically sourced from DETAILED_PRODUCTS (24 items) in src/data/productDetails.js

export default function StudentShopeeHome({ 
  onSelectPartnerForOrder, 
  onNavigateFeature,
  onSelectProduct 
}) {
  // Slider Banner state
  const [currentSlide, setCurrentSlide] = useState(0);

  // Flash sale countdown timer state (hours, minutes, seconds)
  const [timeLeft, setTimeLeft] = useState({ hours: 1, minutes: 24, seconds: 48 });

  // Load More state for Rekomendasi Mahasiswa
  const [visibleCount, setVisibleCount] = useState(12);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setVisibleCount(prev => Math.min(prev + 6, DETAILED_PRODUCTS.length));
      setIsLoadingMore(false);
    }, 500);
  };

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
    <div className="bg-[#f5f5f5] pb-20 md:pb-16 font-['Plus_Jakarta_Sans',sans-serif]">
      
      {/* 0. SHOPEE MOBILE LAPAKPAY & COINS FLOATING STRIP (Mobile Only) */}
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

      {/* 1. HERO SECTION: SHOPEE 2 : 1 BANNER RATIO */}
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

      {/* 2. CIRCULAR QUICK ICONS (Persis Shopee Web & App 2 Baris x 5 Kolom) */}
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
                  <span className="text-[10px] sm:text-[11px] text-slate-700 leading-[13px] line-clamp-2 group-hover:text-sky-600 transition font-medium">
                    {menu.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. KATEGORI (Shopee 2-Row Category Grid) */}
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

      {/* 4. FLASH SALE SECTION (Shopee Style with Countdown Timer) */}
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

      {/* 5. SHOPEE MALL / MITRA RESMI PERCETAKAN (GEOFENCING KAMPUS) */}
      <div className="max-w-6xl mx-auto px-3 sm:px-6 mt-3 sm:mt-5">
        <div className="bg-white rounded-lg sm:rounded-xs shadow-2xs border border-slate-200/80">
          <div className="p-3 sm:p-3.5 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center space-x-1.5 sm:space-x-2">
              <span className="text-[10px] sm:text-xs font-black bg-sky-600 text-white px-1.5 sm:px-2 py-0.5 rounded-xs tracking-wider">
                MITRA RESMI
              </span>
              <h3 className="text-xs sm:text-sm font-bold text-slate-800 truncate">
                Percetakan Terdekat (Geofencing Kampus)
              </h3>
            </div>
            <span 
              onClick={() => onNavigateFeature('partners')}
              className="text-[11px] sm:text-xs text-sky-600 font-semibold cursor-pointer hover:underline shrink-0 ml-2"
            >
              Semua ➔
            </span>
          </div>

          <div className="p-3 sm:p-4 grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
            {MOCK_PARTNERS.map((partner) => (
              <div
                key={partner.id}
                className="border border-slate-200 rounded-xs p-4 hover:border-sky-400 transition bg-white flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start space-x-3">
                    <span className="text-3xl p-2 bg-sky-50 rounded-lg border border-sky-100">
                      {partner.avatar}
                    </span>
                    <div>
                      <span className="text-[10px] font-bold bg-amber-400 text-slate-900 px-1 rounded">
                        {partner.badge}
                      </span>
                      <h4 className="font-bold text-sm text-slate-900 mt-0.5">
                        {partner.name}
                      </h4>
                      <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-red-500" /> {partner.distance}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 mt-3 pt-2 border-t border-slate-100 text-xs">
                    <span className="text-amber-500 font-bold flex items-center gap-0.5">
                      ⭐ {partner.rating}
                    </span>
                    <span className="text-slate-300">|</span>
                    <span className="text-slate-500">{partner.soldCount} order</span>
                    <span className="text-slate-300">|</span>
                    <span className="text-emerald-600 font-semibold">{partner.queueTime}</span>
                  </div>
                </div>

                <button
                  onClick={() => onSelectPartnerForOrder(partner)}
                  className="w-full mt-4 py-2 bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs rounded-xs transition shadow-2xs flex items-center justify-center space-x-1"
                >
                  <span>Mulai Order di Toko Ini</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 6. REKOMENDASI (Shopee 6-Column Product Feed) */}
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

    </div>
  );
}
