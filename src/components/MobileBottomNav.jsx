import React from 'react';
import { Home, Zap, FileText, Wallet, User } from 'lucide-react';

export default function MobileBottomNav({ 
  activeNavTab, 
  setActiveNavTab, 
  activeFeatureView, 
  setActiveFeatureView,
  ordersCount = 0,
  onResetToHome
}) {
  const isHomeActive = activeNavTab === 'home' && !activeFeatureView;
  const isKilatActive = activeFeatureView === 'kilat';
  const isOrdersActive = activeNavTab === 'orders' && !activeFeatureView;
  const isWalletActive = activeFeatureView === 'lapakpay';
  const isProfileActive = activeFeatureView === 'profile';

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-200/90 shadow-[0_-2px_10px_rgba(0,0,0,0.05)] md:hidden pb-[env(safe-area-inset-bottom)]">
      <div className="grid grid-cols-5 h-13 max-w-md mx-auto items-center px-0.5">
        
        {/* 1. BERANDA */}
        <button
          onClick={() => {
            onResetToHome();
          }}
          className={`flex flex-col items-center justify-center py-1 transition relative ${
            isHomeActive ? 'text-sky-600 font-bold' : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          <Home className={`w-5 h-5 ${isHomeActive ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
          <span className="text-[10px] mt-0.5 tracking-tight">Beranda</span>
          {isHomeActive && (
            <span className="w-1 h-1 rounded-full bg-sky-600 mt-0.5"></span>
          )}
        </button>

        {/* 2. PRINT KILAT */}
        <button
          onClick={() => {
            setActiveNavTab('home');
            setActiveFeatureView('kilat');
          }}
          className={`flex flex-col items-center justify-center py-1 transition relative ${
            isKilatActive ? 'text-sky-600 font-bold' : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          <div className="relative">
            <Zap className={`w-5 h-5 ${isKilatActive ? 'stroke-[2.5] text-amber-500 fill-amber-400' : 'stroke-[1.8]'}`} />
            <span className="absolute -top-1 -right-2 bg-rose-500 text-white text-[8px] font-black px-1 rounded-full">
              10M
            </span>
          </div>
          <span className="text-[10px] mt-0.5 tracking-tight">Kilat</span>
          {isKilatActive && (
            <span className="w-1 h-1 rounded-full bg-sky-600 mt-0.5"></span>
          )}
        </button>

        {/* 3. PESANAN (DENGAN BADGE ORDER AKTIF) */}
        <button
          onClick={() => {
            setActiveNavTab('orders');
            setActiveFeatureView(null);
          }}
          className={`flex flex-col items-center justify-center py-1 transition relative ${
            isOrdersActive ? 'text-sky-600 font-bold' : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          <div className="relative">
            <FileText className={`w-5 h-5 ${isOrdersActive ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
            {ordersCount > 0 && (
              <span className="absolute -top-1 -right-2.5 bg-rose-500 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                {ordersCount}
              </span>
            )}
          </div>
          <span className="text-[10px] mt-0.5 tracking-tight">Pesanan</span>
          {isOrdersActive && (
            <span className="w-1 h-1 rounded-full bg-sky-600 mt-0.5"></span>
          )}
        </button>

        {/* 4. LAPAKPAY */}
        <button
          onClick={() => {
            setActiveNavTab('home');
            setActiveFeatureView('lapakpay');
          }}
          className={`flex flex-col items-center justify-center py-1 transition relative ${
            isWalletActive ? 'text-sky-600 font-bold' : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          <Wallet className={`w-5 h-5 ${isWalletActive ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
          <span className="text-[10px] mt-0.5 tracking-tight">LapakPay</span>
          {isWalletActive && (
            <span className="w-1 h-1 rounded-full bg-sky-600 mt-0.5"></span>
          )}
        </button>

        {/* 5. SAYA (PROFILE) */}
        <button
          onClick={() => {
            setActiveNavTab('home');
            setActiveFeatureView('profile');
          }}
          className={`flex flex-col items-center justify-center py-1 transition relative ${
            isProfileActive ? 'text-sky-600 font-bold' : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          <User className={`w-5 h-5 ${isProfileActive ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
          <span className="text-[10px] mt-0.5 tracking-tight">Saya</span>
          {isProfileActive && (
            <span className="w-1 h-1 rounded-full bg-sky-600 mt-0.5"></span>
          )}
        </button>

      </div>
    </nav>
  );
}
