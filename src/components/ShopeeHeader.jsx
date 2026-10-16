import React, { useState } from 'react';
import { 
  Search, ShoppingCart, Bell, HelpCircle, Globe, 
  ChevronDown, User, LogOut, FileText, CheckCircle2, Clock 
} from 'lucide-react';

export default function ShopeeHeader({ 
  currentUser, 
  onLogout, 
  activeNavTab, 
  setActiveNavTab, 
  onOpenInsights, 
  ordersCount,
  onSwitchRole,
  activeOrders = [],
  onNavigateFeature
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showCartDropdown, setShowCartDropdown] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const handleSearchSubmit = (e) => {
    e?.preventDefault();
    if (onNavigateFeature) {
      onNavigateFeature('all-services');
    }
  };

  return (
    <header className="bg-gradient-to-b from-[#0284c7] to-[#0ea5e9] text-white sticky top-0 z-50 shadow-md">
      
      {/* 1. TOP MINI UTILITY BAR (Persis Shopee Web - Desktop Only) */}
      <div className="hidden md:block border-b border-white/15 text-[12px] text-white/90">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-8 flex items-center justify-between">
          
          {/* Left Links */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => onSwitchRole('mitra')}
              className="hover:text-white transition flex items-center space-x-1"
            >
              <span>Seller Centre</span>
            </button>
            <span className="text-white/40">|</span>
            <button
              onClick={() => onSwitchRole('superadmin')}
              className="text-amber-300 hover:text-amber-200 transition font-bold flex items-center space-x-1"
            >
              <span>👑 Super Admin</span>
            </button>
            <span className="text-white/40">|</span>
            <button
              onClick={() => onSwitchRole('mitra')}
              className="hover:text-white transition hidden sm:inline"
            >
              <span>Mulai Jual</span>
            </button>
            <span className="text-white/40 hidden sm:inline">|</span>
            <a 
              href="/downloads/LapakPrint.apk" 
              download="LapakPrint.apk"
              className="hover:text-amber-200 text-amber-300 font-bold cursor-pointer hidden md:inline transition"
              title="Unduh Installer Android APK"
            >
              📲 Download App (.APK)
            </a>
            <span className="text-white/40 hidden md:inline">|</span>
            <div className="items-center space-x-1 hidden lg:flex">
              <span>Ikuti kami di</span>
              <span className="font-bold cursor-pointer hover:text-white">FB</span>
              <span className="font-bold cursor-pointer hover:text-white">IG</span>
            </div>
          </div>

          {/* Right Links */}
          <div className="flex items-center space-x-4">
            
            {/* Notifikasi Pesanan */}
            <button 
              onClick={() => setActiveNavTab('orders')}
              className="hover:text-white transition flex items-center space-x-1 relative"
            >
              <Bell className="w-3.5 h-3.5" />
              <span>Notifikasi</span>
              {ordersCount > 0 && (
                <span className="w-1.5 h-1.5 bg-amber-300 rounded-full animate-ping"></span>
              )}
            </button>

            {/* Bantuan */}
            <button
              onClick={() => alert("Pusat Bantuan LapakPrint:\nLayanan bantuan mahasiswa & mitra aktif 24 jam.")}
              className="hover:text-white transition flex items-center space-x-1"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Bantuan</span>
            </button>

            {/* Bahasa */}
            <div className="flex items-center space-x-1 cursor-pointer hover:text-white hidden sm:flex">
              <Globe className="w-3.5 h-3.5" />
              <span>Bahasa Indonesia</span>
              <ChevronDown className="w-3 h-3" />
            </div>

            {/* Strategic Insights */}
            <button
              onClick={onOpenInsights}
              className="hover:text-amber-200 transition font-bold text-amber-300 hidden md:inline"
            >
              ⚡ Analisis Bisnis
            </button>

            <span className="text-white/40">|</span>

            {/* User Profile / Menu */}
            <div className="relative">
              <button
                onClick={() => setShowUserDropdown(!showUserDropdown)}
                className="flex items-center space-x-1.5 hover:text-white transition focus:outline-none"
              >
                <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs overflow-hidden">
                  <span>{currentUser?.avatar || '👨‍🎓'}</span>
                </div>
                <span className="font-medium max-w-[110px] truncate text-xs">
                  {currentUser?.name || 'budi_santoso'}
                </span>
                <ChevronDown className="w-3 h-3 text-white/70" />
              </button>

              {/* User Dropdown */}
              {showUserDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xs shadow-lg py-1 text-slate-800 text-xs z-50 border border-slate-200">
                  <div className="px-4 py-2 border-b border-slate-100">
                    <p className="font-bold truncate">{currentUser?.name}</p>
                    <p className="text-[10px] text-slate-400 truncate">{currentUser?.email}</p>
                  </div>
                  <button
                    onClick={() => {
                      setActiveNavTab('orders');
                      setShowUserDropdown(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-slate-50 flex items-center space-x-2"
                  >
                    <FileText className="w-3.5 h-3.5 text-sky-600" />
                    <span>Pesanan Saya ({ordersCount})</span>
                  </button>
                  <button
                    onClick={() => {
                      onSwitchRole('mitra');
                      setShowUserDropdown(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-slate-50 flex items-center space-x-2"
                  >
                    <span>🏪 Mitra Seller Centre</span>
                  </button>
                  <div className="border-t border-slate-100 my-1"></div>
                  <button
                    onClick={() => {
                      setShowUserDropdown(false);
                      onLogout();
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-red-50 text-red-600 flex items-center space-x-2"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Keluar / Logout</span>
                  </button>
                </div>
              )}
            </div>

          </div>

        </div>
      </div>

      {/* 2. DESKTOP MAIN HEADER BAR */}
      <div className="hidden md:flex max-w-6xl mx-auto px-4 sm:px-6 py-3.5 items-center justify-between gap-6">
        
        {/* Brand Logo with Shopee Shopping Bag */}
        <div 
          onClick={() => {
            setActiveNavTab('home');
            onNavigateFeature?.(null);
          }}
          className="flex items-center space-x-2.5 cursor-pointer shrink-0"
        >
          <svg 
            className="w-10 h-10 fill-white" 
            viewBox="0 0 250 250"
          >
            <path d="M195.2 69.8H165V54.2C165 24.3 140.7 0 110.8 0S56.6 24.3 56.6 54.2v15.6H26.4c-9.7 0-17.6 7.9-17.6 17.6l14.2 143.6c.9 8.9 8.4 15.6 17.3 15.6h139.9c8.9 0 16.4-6.8 17.3-15.6l14.2-143.6c0-9.7-7.8-17.6-17.5-17.6zM82.8 54.2c0-15.4 12.6-28 28-28s28 12.6 28 28v15.6H82.8V54.2zm92.6 161.4H45.8l-12.7-128h158.4l-12.6 128h-3.5z" />
            {/* LapakPrint 'P' emblem */}
            <path fill="#0284c7" d="M96 90h26c15.5 0 27 9.5 27 24s-11.5 24-27 24h-13v34H96V90zm13 35h13c7.5 0 14-4 14-11s-6.5-11-14-11h-13v22z" />
          </svg>
          <div className="flex flex-col">
            <span className="text-2xl sm:text-3xl font-bold tracking-tight text-white leading-none font-sans">
              LapakPrint
            </span>
          </div>
        </div>

        {/* Search Bar Container */}
        <div className="flex-1 max-w-3xl">
          <form onSubmit={handleSearchSubmit} className="bg-white rounded-xs p-1 flex items-center shadow-xs">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari jasa print draf, jilid hardcover skripsi, fotokopi terdekat..."
              className="w-full text-xs sm:text-sm text-slate-800 px-3 py-1.5 focus:outline-none placeholder-slate-400"
            />
            <button type="submit" className="bg-sky-500 hover:bg-sky-600 text-white px-5 py-2 rounded-xs transition flex items-center justify-center shrink-0">
              <Search className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Search Suggestions underneath */}
          <div className="flex items-center space-x-3 text-[11px] text-white/90 mt-1 pl-1 hidden sm:flex truncate">
            <span onClick={() => onNavigateFeature?.('hardcover')} className="hover:text-white cursor-pointer">Hard Cover Skripsi Emas</span>
            <span onClick={() => onNavigateFeature?.('draft')} className="hover:text-white cursor-pointer">Print A4 80gr PaperOne</span>
            <span onClick={() => onNavigateFeature?.('spiral')} className="hover:text-white cursor-pointer">Jilid Spiral Kawat</span>
            <span onClick={() => onNavigateFeature?.('kilat')} className="hover:text-white cursor-pointer">Print Kilat 10 Mnt</span>
            <span onClick={() => onNavigateFeature?.('partners')} className="hover:text-white cursor-pointer">Fotokopi Berkah Ilahi</span>
            <span onClick={() => onNavigateFeature?.('draft')} className="hover:text-white cursor-pointer">Cetak Bolak Balik</span>
          </div>
        </div>

        {/* Shopping Cart Icon with Badge */}
        <div 
          className="relative shrink-0 pr-2"
          onMouseEnter={() => setShowCartDropdown(true)}
          onMouseLeave={() => setShowCartDropdown(false)}
        >
          <button
            onClick={() => setActiveNavTab('orders')}
            className="p-2 text-white hover:text-white/80 transition relative flex items-center"
          >
            <ShoppingCart className="w-7 h-7 stroke-[1.8]" />
            {ordersCount > 0 && (
              <span className="absolute -top-1 -right-0.5 bg-white text-sky-600 text-[11px] font-black w-5 h-5 rounded-full flex items-center justify-center border border-sky-600 shadow-xs">
                {ordersCount}
              </span>
            )}
          </button>

          {/* Cart Hover Popover ala Shopee */}
          {showCartDropdown && (
            <div className="absolute right-0 top-10 w-80 bg-white rounded-xs shadow-xl p-3 border border-slate-200 text-slate-800 text-xs z-50 animate-fadeIn">
              <div className="text-slate-400 font-medium pb-2 border-b border-slate-100 flex justify-between">
                <span>Pesanan Baru Ditambahkan</span>
                <span className="text-sky-600 font-bold">{ordersCount} Pesanan</span>
              </div>
              
              <div className="divide-y divide-slate-100 max-h-56 overflow-y-auto my-1">
                {activeOrders.slice(0, 3).map((ord) => (
                  <div key={ord.id} className="py-2 flex items-start space-x-2">
                    <div className="w-8 h-8 rounded bg-sky-50 text-sky-600 flex items-center justify-center shrink-0 text-xs font-bold">
                      📄
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold truncate text-[11px]">{ord.docName}</p>
                      <p className="text-[10px] text-slate-500">{ord.vendorName}</p>
                      <p className="text-[10px] text-sky-600 font-bold">
                        Rp {ord.pricing?.total?.toLocaleString('id-ID')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => {
                  setShowCartDropdown(false);
                  setActiveNavTab('orders');
                }}
                className="w-full mt-2 py-2 bg-sky-500 hover:bg-sky-600 text-white font-bold text-center rounded-xs transition text-xs"
              >
                Tampilkan Pesanan Saya
              </button>
            </div>
          )}
        </div>

      </div>

      {/* 3. MOBILE APP HEADER BAR (Presisi Shopee Mobile) */}
      <div className="md:hidden px-3 pt-2 pb-2.5 max-w-lg mx-auto w-full">
        <div className="flex items-center space-x-2">
          {/* Logo icon */}
          <div 
            onClick={() => {
              setActiveNavTab('home');
              onNavigateFeature?.(null);
            }}
            className="flex items-center space-x-1.5 cursor-pointer shrink-0"
          >
            <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center border border-white/30 shadow-xs">
              <span className="text-base">📄</span>
            </div>
            <span className="text-xs font-black tracking-tight text-white font-sans hidden min-[400px]:inline">
              LapakPrint
            </span>
          </div>

          {/* Shopee-style Pill Search Input */}
          <form 
            onSubmit={handleSearchSubmit} 
            className="flex-1 min-w-0 bg-white rounded-full pl-3 pr-1 py-1 flex items-center shadow-xs border border-white/40"
          >
            <Search className="w-3.5 h-3.5 text-slate-400 shrink-0 mr-1.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari draf, jilid skripsi kilat..."
              className="w-full text-xs text-slate-800 focus:outline-none placeholder-slate-400 bg-transparent min-w-0 truncate"
            />
            <button 
              type="submit" 
              className="w-6 h-6 rounded-full bg-sky-500 hover:bg-sky-600 text-white flex items-center justify-center shrink-0 transition shadow-2xs"
            >
              <Search className="w-3 h-3" />
            </button>
          </form>

          {/* Action Icons Container (Equal spacing, never wrapped) */}
          <div className="flex items-center space-x-0.5 shrink-0">
            <button 
              onClick={() => setActiveNavTab('orders')}
              className="p-1.5 text-white/95 hover:text-white transition relative"
            >
              <Bell className="w-5 h-5 stroke-[1.8]" />
              {ordersCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-amber-300 rounded-full animate-pulse"></span>
              )}
            </button>

            <button 
              onClick={() => setActiveNavTab('orders')}
              className="p-1.5 text-white/95 hover:text-white transition relative"
            >
              <ShoppingCart className="w-5 h-5 stroke-[1.8]" />
              {ordersCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-rose-500 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center border border-sky-600 shadow-2xs">
                  {ordersCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

    </header>
  );
}
