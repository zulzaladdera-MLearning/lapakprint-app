import React, { useState } from 'react';
import { ArrowLeft, Ticket, Check, Copy, Clock, ShieldCheck, Sparkles } from 'lucide-react';
import { MOCK_VOUCHERS } from '../../data/mockData';

export default function VoucherCenterView({ onBack, onApplyVoucher }) {
  const [claimedList, setClaimedList] = useState({ v1: true });
  const [copiedCode, setCopiedCode] = useState(null);

  const extraVouchers = [
    ...MOCK_VOUCHERS,
    { id: 'v4', name: 'Diskon Sidang Skripsi Rp 20.000', minSpend: 60000, discount: 'Potongan Rp 20rb', expiry: 'Khusus Jilid Hard Cover' },
    { id: 'v5', name: 'Gratis Jilid Lakban Mika', minSpend: 25000, discount: 'Jilid Gratis', expiry: 'Berlaku s/d Minggu' },
    { id: 'v6', name: 'Cashback 20% Cetak Duplex', minSpend: 15000, discount: 'Hemat Kertas', expiry: 'Khusus Cetak 2 Sisi' }
  ];

  const handleClaim = (id) => {
    setClaimedList(prev => ({ ...prev, [id]: true }));
  };

  const handleCopyCode = (code) => {
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
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
          <span className="text-slate-800 font-semibold">Gratis Ongkir & Voucher Kampus</span>
        </div>

        {/* Hero Banner Voucher Center ala Shopee */}
        <div className="bg-gradient-to-r from-sky-500 via-sky-600 to-blue-600 rounded-xs p-6 text-white shadow-xs relative overflow-hidden">
          <div className="max-w-xl space-y-2 relative z-10">
            <span className="bg-amber-400 text-slate-950 font-black text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider">
              PUSAT VOUCHER KAMPUS
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold leading-tight">
              Klaim Voucher Diskon Cetak & Gratis Ongkir Kosan
            </h1>
            <p className="text-xs sm:text-sm text-sky-100">
              Gunakan kupon saat checkout untuk hemat s.d 40% biaya print draf tugas & jilid skripsi Anda.
            </p>
          </div>

          <div className="absolute -right-8 -bottom-8 w-48 h-48 rounded-full bg-white/10 blur-xl pointer-events-none"></div>
        </div>

        {/* Voucher List Tabs */}
        <div className="bg-white rounded-xs p-4 sm:p-6 shadow-2xs border border-slate-200/80 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center space-x-2">
              <Ticket className="w-5 h-5 text-sky-600" />
              <h3 className="text-base font-extrabold text-slate-900">
                Semua Voucher Tersedia
              </h3>
            </div>
            <span className="text-xs text-slate-400">{extraVouchers.length} Kupon Aktif</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {extraVouchers.map((v) => {
              const isClaimed = claimedList[v.id];
              return (
                <div 
                  key={v.id}
                  className="border border-sky-200 bg-sky-50/30 rounded-xs p-4 flex items-center justify-between gap-4 hover:shadow-xs transition relative overflow-hidden"
                >
                  {/* Left voucher saw-tooth decoration */}
                  <div className="flex items-start space-x-3.5 min-w-0">
                    <div className="w-12 h-12 bg-sky-500 text-white rounded-xs flex items-center justify-center font-bold text-lg shrink-0 shadow-2xs">
                      %
                    </div>
                    <div className="min-w-0">
                      <span className="text-[10px] font-bold text-sky-700 bg-sky-100 px-1.5 py-0.2 rounded inline-block">
                        {v.discount}
                      </span>
                      <h4 className="font-bold text-xs sm:text-sm text-slate-900 truncate mt-1">
                        {v.name}
                      </h4>
                      <p className="text-[11px] text-slate-500">
                        Min. Belanja: Rp {v.minSpend.toLocaleString('id-ID')}
                      </p>
                      <p className="text-[10px] text-amber-600 font-medium flex items-center gap-1 mt-0.5">
                        <Clock className="w-3 h-3" /> {v.expiry}
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0 text-right">
                    <button
                      onClick={() => handleClaim(v.id)}
                      disabled={isClaimed}
                      className={`px-4 py-2 rounded-xs font-bold text-xs transition ${
                        isClaimed
                          ? 'bg-slate-200 text-slate-500 cursor-default'
                          : 'bg-sky-500 hover:bg-sky-600 text-white shadow-2xs'
                      }`}
                    >
                      {isClaimed ? 'Terklaim' : 'Klaim'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
