import React, { useState } from 'react';
import { ArrowLeft, Wallet, Coins, PlusCircle, ArrowUpRight, ArrowDownLeft, ShieldCheck } from 'lucide-react';

export default function LapakPayWalletView({ onBack }) {
  const [balance, setBalance] = useState(125000);
  const [coins, setCoins] = useState(2400);

  const handleTopUp = (amount) => {
    setBalance(prev => prev + amount);
    alert(`Top-up LapakPay Sebesar Rp ${amount.toLocaleString('id-ID')} Berhasil via Virtual Account!`);
  };

  return (
    <div className="bg-[#f5f5f5] min-h-[calc(100vh-8rem)] py-5 font-['Plus_Jakarta_Sans',sans-serif]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-4">
        
        {/* Breadcrumb & Back Button */}
        <div className="flex items-center space-x-2 text-xs text-slate-500">
          <button onClick={onBack} className="hover:text-sky-600 font-bold flex items-center gap-1">
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Beranda</span>
          </button>
          <span>/</span>
          <span className="text-slate-800 font-semibold">Dompet LapakPay & Koin</span>
        </div>

        {/* LapakPay Virtual Card ala ShopeePay */}
        <div className="bg-gradient-to-r from-sky-500 via-sky-600 to-blue-600 rounded-xs p-6 sm:p-8 text-white shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2">
                <Wallet className="w-6 h-6 text-white" />
                <span className="text-xl font-black tracking-tight">LapakPay</span>
                <span className="bg-amber-400 text-slate-950 font-bold text-[10px] px-2 py-0.2 rounded-full">
                  VERIFIED
                </span>
              </div>
              <p className="text-xs text-sky-100 mt-1">Solusi Bayar Cetak Tanpa Biaya Admin QRIS Setiap Transaksi</p>
              
              <div className="mt-4">
                <span className="text-[11px] text-sky-100 block">Saldo Aktif Anda</span>
                <div className="text-3xl font-black tracking-tight mt-0.5">
                  Rp {balance.toLocaleString('id-ID')}
                </div>
              </div>
            </div>

            {/* Coins badge */}
            <div className="bg-white/10 backdrop-blur-xs p-4 rounded-xs border border-white/20 text-right">
              <div className="flex items-center space-x-1.5 justify-end text-amber-300 font-bold text-xs">
                <Coins className="w-4 h-4" />
                <span>Koin Lapak Mahasiswa</span>
              </div>
              <div className="text-2xl font-black mt-1">{coins.toLocaleString('id-ID')} Koin</div>
              <span className="text-[10px] text-sky-200">Setara Rp {coins.toLocaleString('id-ID')}</span>
            </div>
          </div>
        </div>

        {/* Quick Top-up Section */}
        <div className="bg-white rounded-xs p-5 shadow-2xs border border-slate-200 space-y-4">
          <h3 className="font-extrabold text-sm sm:text-base text-slate-900">
            Isi Saldo Cepat (Top Up Instan)
          </h3>
          <p className="text-xs text-slate-500">
            Pilih nominal top up via BCA, Mandiri, BRI, atau QRIS instan
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[20000, 50000, 100000, 200000].map((amt) => (
              <button
                key={amt}
                onClick={() => handleTopUp(amt)}
                className="p-3.5 rounded-xs border border-slate-200 hover:border-sky-500 hover:bg-sky-50/50 transition font-extrabold text-sm text-sky-700 text-center shadow-2xs"
              >
                +Rp {amt.toLocaleString('id-ID')}
              </button>
            ))}
          </div>

          <div className="bg-emerald-50 p-3.5 rounded-xs border border-emerald-200 text-xs text-emerald-800 flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Keuntungan: Gratis Biaya Layanan Platform Rp 1.500 jika membayar menggunakan saldo LapakPay.</span>
          </div>
        </div>

        {/* Mutasi Transaksi */}
        <div className="bg-white rounded-xs p-5 shadow-2xs border border-slate-200 space-y-3">
          <h3 className="font-extrabold text-sm text-slate-900">Riwayat Mutasi Saldo Terakhir</h3>
          <div className="divide-y divide-slate-100 text-xs">
            <div className="py-2.5 flex justify-between items-center">
              <div>
                <p className="font-bold text-slate-800">Pembayaran Cetak Skripsi (#LP-8901)</p>
                <span className="text-[10px] text-slate-400">Hari ini, 10:15 WIB</span>
              </div>
              <span className="font-bold text-rose-600">-Rp 47.100</span>
            </div>
            <div className="py-2.5 flex justify-between items-center">
              <div>
                <p className="font-bold text-slate-800">Cashback Promo Sidang Skripsi</p>
                <span className="text-[10px] text-slate-400">Kemarin, 14:20 WIB</span>
              </div>
              <span className="font-bold text-emerald-600">+Rp 5.000 (Koin)</span>
            </div>
            <div className="py-2.5 flex justify-between items-center">
              <div>
                <p className="font-bold text-slate-800">Top Up Saldo via BCA Virtual Account</p>
                <span className="text-[10px] text-slate-400">12 Okt 2026, 09:00 WIB</span>
              </div>
              <span className="font-bold text-emerald-600">+Rp 100.000</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
