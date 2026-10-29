import React, { useState } from 'react';
import { 
  DollarSign, Store, AlertTriangle, 
  ArrowUpRight, MapPin, LogOut, Sparkles 
} from 'lucide-react';
import { INITIAL_PAYOUT_REQUESTS, INITIAL_DISPUTES, MOCK_PARTNERS } from '../data/mockData';
import AdminOverviewTab from '../features/superadmin/AdminOverviewTab';
import AdminPayoutsTab from '../features/superadmin/AdminPayoutsTab';
import AdminMerchantsTab from '../features/superadmin/AdminMerchantsTab';
import AdminDisputesTab from '../features/superadmin/AdminDisputesTab';
import AdminGeofencingTab from '../features/superadmin/AdminGeofencingTab';

export default function SuperAdminDashboard({ 
  currentUser, 
  orders, 
  onLogout, 
  onSwitchToStudent, 
  onSwitchToMitra,
  onOpenInsights 
}) {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'payouts' | 'merchants' | 'disputes' | 'geofencing'
  const [payouts, setPayouts] = useState(INITIAL_PAYOUT_REQUESTS);
  const [disputes, setDisputes] = useState(INITIAL_DISPUTES);
  const [partners, setPartners] = useState(MOCK_PARTNERS);

  // Platform Commission Setting State
  const [platformFee, setPlatformFee] = useState(1500);
  const [campusRadius, setCampusRadius] = useState(1.5); // 1.5 km radius

  // Calculate Real-time platform financials
  const totalGMV = orders.reduce((acc, curr) => acc + (curr.pricing?.total || 0), 0);
  const totalPlatformCut = orders.reduce((acc, curr) => acc + (curr.pricing?.platformFee || 0), 0);
  const totalPartnerCut = orders.reduce((acc, curr) => acc + (curr.pricing?.vendorShare || 0), 0);

  const handleApprovePayout = (id) => {
    setPayouts(prev => prev.map(p => p.id === id ? { ...p, status: 'approved' } : p));
    alert(`Persetujuan Payout Berhasil: Transfer dana otomatis dikirim ke rekening mitra.`);
  };

  const handleResolveDispute = (id, resolution) => {
    setDisputes(prev => prev.map(d => d.id === id ? { ...d, status: resolution } : d));
    if (resolution === 'refunded') {
      alert(`Keputusan Sengketa: Dana Rp 48.000 telah di-refund ke saldo LapakPay mahasiswa dari rekening escrow.`);
    } else {
      alert(`Keputusan Sengketa: Mitra toko telah diinstruksikan mencetak ulang dokumen tanpa biaya tambahan.`);
    }
  };

  const handleToggleStoreStatus = (id) => {
    setPartners(prev => prev.map(p => p.id === id ? { ...p, isOpen: !p.isOpen } : p));
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-['Plus_Jakarta_Sans',sans-serif] text-slate-800">
      {/* 1. TOP HEADER SUPER ADMIN */}
      <header className="bg-slate-900 text-white sticky top-0 z-40 border-b border-slate-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 font-black text-xl shadow-md">
              👑
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-base tracking-tight text-white">
                  LapakPrint
                </span>
                <span className="px-2 py-0.5 text-[10px] font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30 rounded">
                  SUPER ADMIN BACKOFFICE
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Pusat Kendali Platform, Escrow & Kemitraan Kampus
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-3">
            <button
              onClick={onSwitchToStudent}
              className="py-1.5 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-sky-400 text-xs font-bold border border-slate-700 transition flex items-center space-x-1"
            >
              <span>👨‍🎓 Sisi Mahasiswa</span>
            </button>

            <button
              onClick={onSwitchToMitra}
              className="py-1.5 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-400 text-xs font-bold border border-slate-700 transition flex items-center space-x-1"
            >
              <span>🏪 Sisi Mitra Toko</span>
            </button>

            <button
              onClick={onOpenInsights}
              className="py-1.5 px-3 rounded-lg bg-indigo-900/60 hover:bg-indigo-900 text-indigo-200 text-xs font-bold border border-indigo-700 transition hidden md:flex items-center space-x-1"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-300" />
              <span>Unit Economics</span>
            </button>

            <span className="text-slate-700">|</span>

            <button
              onClick={onLogout}
              title="Logout Super Admin"
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* 2. MAIN LAYOUT: SIDEBAR + CONTENT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Navigation Sidebar */}
          <div className="lg:col-span-3 space-y-4">
            <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-1 text-xs font-bold">
              <span className="text-[10px] uppercase text-slate-400 font-bold tracking-wider px-3 py-1 block">
                Menu Pengendali Pusat
              </span>

              <button
                onClick={() => setActiveTab('overview')}
                className={`w-full py-2.5 px-3 rounded-xl flex items-center space-x-2.5 transition text-left ${
                  activeTab === 'overview'
                    ? 'bg-sky-50 text-sky-700 font-extrabold border border-sky-200'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <DollarSign className="w-4 h-4 text-sky-600" />
                <span>Ringkasan Keuangan & GMV</span>
              </button>

              <button
                onClick={() => setActiveTab('payouts')}
                className={`w-full py-2.5 px-3 rounded-xl flex items-center space-x-2.5 transition text-left ${
                  activeTab === 'payouts'
                    ? 'bg-sky-50 text-sky-700 font-extrabold border border-sky-200'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <ArrowUpRight className="w-4 h-4 text-emerald-600" />
                <span>Persetujuan Tarik Saldo (Payouts)</span>
                {payouts.filter(p => p.status === 'pending').length > 0 && (
                  <span className="ml-auto bg-amber-500 text-white text-[10px] px-1.5 py-0.2 rounded-full font-mono">
                    {payouts.filter(p => p.status === 'pending').length}
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveTab('merchants')}
                className={`w-full py-2.5 px-3 rounded-xl flex items-center space-x-2.5 transition text-left ${
                  activeTab === 'merchants'
                    ? 'bg-sky-50 text-sky-700 font-extrabold border border-sky-200'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Store className="w-4 h-4 text-amber-600" />
                <span>Kelola & Verifikasi Mitra Toko</span>
              </button>

              <button
                onClick={() => setActiveTab('disputes')}
                className={`w-full py-2.5 px-3 rounded-xl flex items-center space-x-2.5 transition text-left ${
                  activeTab === 'disputes'
                    ? 'bg-sky-50 text-sky-700 font-extrabold border border-sky-200'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                <span>Pusat Sengketa & Refund</span>
                {disputes.filter(d => d.status === 'open').length > 0 && (
                  <span className="ml-auto bg-rose-500 text-white text-[10px] px-1.5 py-0.2 rounded-full font-mono">
                    {disputes.filter(d => d.status === 'open').length}
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveTab('geofencing')}
                className={`w-full py-2.5 px-3 rounded-xl flex items-center space-x-2.5 transition text-left ${
                  activeTab === 'geofencing'
                    ? 'bg-sky-50 text-sky-700 font-extrabold border border-sky-200'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <MapPin className="w-4 h-4 text-indigo-600" />
                <span>Geofencing & Komisi Kampus</span>
              </button>
            </div>

            {/* System Security & Storage Monitor Box */}
            <div className="bg-slate-900 rounded-2xl p-4 text-white border border-slate-800 shadow-sm space-y-2 text-xs">
              <div className="flex items-center space-x-2 text-emerald-400 font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Auto-Purge Server: Aktif</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                File PDF lama yang sudah berstatus <em>Completed</em> otomatis dimusnahkan dalam 24 jam demi privasi skripsi & hemat storage.
              </p>
              <div className="pt-2 border-t border-slate-800 flex justify-between text-[11px] text-slate-300">
                <span>Storage Cloud Terpakai:</span>
                <span className="font-mono font-bold text-sky-400">1.2 GB / 50 GB</span>
              </div>
            </div>
          </div>

          {/* Right Main Content Area */}
          <div className="lg:col-span-9 space-y-6">
            {/* Top Stat Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
                <span className="text-[11px] font-semibold text-slate-500 block">Total Dana Escrow</span>
                <div className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                  Rp 4.850.000
                </div>
                <span className="text-[10px] text-emerald-600 font-semibold">Tertampung Aman di Bank</span>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
                <span className="text-[11px] font-semibold text-slate-500 block">Pendapatan Bersih Platform</span>
                <div className="text-xl sm:text-2xl font-black text-sky-600 mt-1">
                  Rp 1.245.000
                </div>
                <span className="text-[10px] text-slate-400">Dari komisi Rp 1.500/order</span>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
                <span className="text-[11px] font-semibold text-slate-500 block">Total Transaksi Selesai</span>
                <div className="text-xl sm:text-2xl font-black text-indigo-600 mt-1">
                  382 Order
                </div>
                <span className="text-[10px] text-slate-400">Musim Sidang Skripsi</span>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
                <span className="text-[11px] font-semibold text-slate-500 block">Mitra Percetakan Aktif</span>
                <div className="text-xl sm:text-2xl font-black text-amber-500 mt-1">
                  {partners.length} Mitra
                </div>
                <span className="text-[10px] text-slate-400">Radius Kampus UI Depok</span>
              </div>
            </div>

            {/* TAB CONTENTS */}
            {activeTab === 'overview' && (
              <AdminOverviewTab
                totalGMV={totalGMV}
                totalPartnerCut={totalPartnerCut}
                totalPlatformCut={totalPlatformCut}
              />
            )}

            {activeTab === 'payouts' && (
              <AdminPayoutsTab
                payouts={payouts}
                onApprovePayout={handleApprovePayout}
              />
            )}

            {activeTab === 'merchants' && (
              <AdminMerchantsTab
                partners={partners}
                onToggleStoreStatus={handleToggleStoreStatus}
              />
            )}

            {activeTab === 'disputes' && (
              <AdminDisputesTab
                disputes={disputes}
                onResolveDispute={handleResolveDispute}
              />
            )}

            {activeTab === 'geofencing' && (
              <AdminGeofencingTab
                campusRadius={campusRadius}
                setCampusRadius={setCampusRadius}
                platformFee={platformFee}
                setPlatformFee={setPlatformFee}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
