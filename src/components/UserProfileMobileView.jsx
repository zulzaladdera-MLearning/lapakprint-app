import React from 'react';
import { 
  User, Wallet, Coins, Ticket, FileText, Store, 
  ShieldCheck, HelpCircle, Settings, LogOut, ChevronRight, 
  Award, Clock, CheckCircle2, Phone, Zap
} from 'lucide-react';

export default function UserProfileMobileView({ 
  currentUser, 
  onLogout, 
  onSwitchRole, 
  onNavigateFeature,
  ordersCount = 0
}) {
  return (
    <div className="bg-[#f5f5f5] min-h-[calc(100vh-8rem)] pb-24 font-['Plus_Jakarta_Sans',sans-serif]">
      <div className="max-w-md mx-auto">
      
      {/* 1. TOP PROFILE HEADER (SHOPEE SAYA BANNER) */}
      <div className="bg-gradient-to-b from-[#0284c7] to-[#0ea5e9] text-white p-5 pt-6 rounded-b-2xl shadow-sm">
        <div className="flex items-center space-x-3.5">
          <div className="w-14 h-14 rounded-full bg-white/20 border-2 border-white/40 flex items-center justify-center text-2xl shadow-inner shrink-0">
            {currentUser?.avatar || '👨‍🎓'}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center space-x-2">
              <h2 className="font-extrabold text-base truncate">{currentUser?.name || 'Budi Santoso'}</h2>
              <span className="text-[10px] bg-amber-400 text-slate-900 font-extrabold px-1.5 py-0.2 rounded-full">
                MAHASISWA
              </span>
            </div>
            <p className="text-xs text-sky-100 truncate">{currentUser?.email || 'budi.santoso@mahasiswa.ac.id'}</p>
            <p className="text-[11px] text-sky-200 mt-0.5 truncate">{currentUser?.faculty || 'Fakultas Ilmu Komputer (Fasilkom)'}</p>
          </div>
        </div>

        {/* LapakPay Quick Balances inside Profile */}
        <div className="mt-4 bg-white/10 backdrop-blur-xs rounded-xl p-3 border border-white/20 grid grid-cols-2 divide-x divide-white/20 text-center">
          <div 
            onClick={() => onNavigateFeature?.('lapakpay')}
            className="cursor-pointer hover:bg-white/5 transition py-1"
          >
            <span className="text-[10px] text-sky-100 block">Saldo LapakPay</span>
            <span className="font-black text-sm text-white">
              Rp {(currentUser?.lapakpayBalance || 125000).toLocaleString('id-ID')}
            </span>
          </div>
          <div 
            onClick={() => onNavigateFeature?.('lapakpay')}
            className="cursor-pointer hover:bg-white/5 transition py-1"
          >
            <span className="text-[10px] text-amber-200 block">Koin Mahasiswa</span>
            <span className="font-black text-sm text-amber-300">
              {(currentUser?.coinBalance || 2400).toLocaleString('id-ID')} Koin
            </span>
          </div>
        </div>
      </div>

      <div className="px-4 -mt-2 space-y-3">
        
        {/* 2. ORDER STATUS SHORTCUTS (PESANAN SAYA) */}
        <div className="bg-white rounded-xl p-4 shadow-2xs border border-slate-200/80">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <span className="font-bold text-xs text-slate-800">Pesanan Dokumen Saya</span>
            <span className="text-[11px] text-sky-600 font-semibold cursor-pointer">
              Riwayat Lengkap ➔
            </span>
          </div>
          <div className="grid grid-cols-4 gap-2 pt-3 text-center">
            <div className="flex flex-col items-center">
              <span className="text-xl">💳</span>
              <span className="text-[10px] text-slate-600 mt-1">Belum Bayar</span>
            </div>
            <div className="flex flex-col items-center relative">
              <span className="text-xl">🖨️</span>
              <span className="text-[10px] text-slate-600 mt-1">Diproses</span>
              {ordersCount > 0 && (
                <span className="absolute -top-1 right-3 bg-rose-500 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                  {ordersCount}
                </span>
              )}
            </div>
            <div className="flex flex-col items-center">
              <span className="text-xl">🔑</span>
              <span className="text-[10px] text-slate-600 mt-1">Siap Ambil</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-xl">⭐</span>
              <span className="text-[10px] text-slate-600 mt-1">Beri Nilai</span>
            </div>
          </div>
        </div>

        {/* 3. SWITCH ROLES / MITRA SELLER & SUPER ADMIN */}
        <div className="bg-white rounded-xl p-4 shadow-2xs border border-slate-200/80 space-y-2">
          <span className="font-bold text-xs text-slate-800 block mb-1">Beralih Akses Akun Sistem</span>
          
          <button
            onClick={() => onSwitchRole('mitra')}
            className="w-full p-2.5 rounded-lg bg-sky-50 hover:bg-sky-100 border border-sky-200 text-left flex items-center justify-between transition"
          >
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-full bg-sky-500 text-white flex items-center justify-center text-sm">
                🏪
              </div>
              <div>
                <p className="font-extrabold text-xs text-slate-900">Mitra Seller Centre</p>
                <p className="text-[10px] text-slate-500">Kelola dapur percetakan & verifikasi PIN</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>

          <button
            onClick={() => onSwitchRole('superadmin')}
            className="w-full p-2.5 rounded-lg bg-amber-50 hover:bg-amber-100 border border-amber-200 text-left flex items-center justify-between transition"
          >
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center text-sm">
                👑
              </div>
              <div>
                <p className="font-extrabold text-xs text-slate-900">Super Admin Platform</p>
                <p className="text-[10px] text-slate-500">Escrow treasury, sengketa & geofencing</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>
        </div>

        {/* 4. UTILITIES & MENU ITEMS */}
        <div className="bg-white rounded-xl shadow-2xs border border-slate-200/80 divide-y divide-slate-100 text-xs">
          <div 
            onClick={() => onNavigateFeature?.('voucher')}
            className="p-3.5 flex items-center justify-between cursor-pointer hover:bg-slate-50 transition"
          >
            <div className="flex items-center space-x-3 text-slate-700">
              <Ticket className="w-4 h-4 text-emerald-600" />
              <span className="font-medium">Voucher Saya & Diskon Kampus</span>
            </div>
            <div className="flex items-center space-x-1 text-slate-400">
              <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.5 rounded">3 Kupon</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>

          <div 
            onClick={() => onNavigateFeature?.('guarantee')}
            className="p-3.5 flex items-center justify-between cursor-pointer hover:bg-slate-50 transition"
          >
            <div className="flex items-center space-x-3 text-slate-700">
              <ShieldCheck className="w-4 h-4 text-sky-600" />
              <span className="font-medium">Garansi Cetak Ulang & Keamanan File</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </div>

          <div 
            onClick={() => onNavigateFeature?.('partners')}
            className="p-3.5 flex items-center justify-between cursor-pointer hover:bg-slate-50 transition"
          >
            <div className="flex items-center space-x-3 text-slate-700">
              <Store className="w-4 h-4 text-purple-600" />
              <span className="font-medium">Mitra Percetakan Terdaftar di Kampus</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </div>

          <a 
            href="/downloads/LapakPrint.apk" 
            download="LapakPrint.apk"
            className="p-3.5 flex items-center justify-between cursor-pointer hover:bg-emerald-50 transition bg-emerald-50/50"
          >
            <div className="flex items-center space-x-3 text-emerald-800">
              <span className="text-base">📲</span>
              <span className="font-bold">Download File Installer (.APK)</span>
            </div>
            <span className="text-[10px] bg-emerald-600 text-white font-bold px-2 py-0.5 rounded-full shadow-2xs">
              Unduh APK
            </span>
          </a>

          <div 
            onClick={() => alert("Pusat Bantuan Mahasiswa LapakPrint:\nLayanan bantuan darurat cetak tugas aktif 24 jam via CS WhatsApp.")}
            className="p-3.5 flex items-center justify-between cursor-pointer hover:bg-slate-50 transition"
          >
            <div className="flex items-center space-x-3 text-slate-700">
              <HelpCircle className="w-4 h-4 text-amber-500" />
              <span className="font-medium">Pusat Bantuan & Kebijakan Privasi 24 Jam</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </div>
        </div>

        {/* 5. LOGOUT BUTTON */}
        <div className="pt-2">
          <button
            onClick={onLogout}
            className="w-full py-3 bg-white hover:bg-red-50 text-rose-600 font-bold text-xs rounded-xl border border-rose-200 shadow-2xs flex items-center justify-center space-x-2 transition"
          >
            <LogOut className="w-4 h-4" />
            <span>Keluar dari Akun</span>
          </button>
        </div>

      </div>

      </div>
    </div>
  );
}
