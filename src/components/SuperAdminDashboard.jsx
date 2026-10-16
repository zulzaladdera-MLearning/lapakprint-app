import React, { useState } from 'react';
import { 
  ShieldCheck, DollarSign, Store, Users, AlertTriangle, 
  CheckCircle2, XCircle, ArrowUpRight, Clock, MapPin, 
  Settings, LogOut, Sparkles, RefreshCcw, FileText, Check 
} from 'lucide-react';
import { INITIAL_PAYOUT_REQUESTS, INITIAL_DISPUTES, MOCK_PARTNERS } from '../data/mockData';

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
          
          {/* Logo & Identity */}
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

          {/* Quick Switchers & Logout */}
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
            
            {/* Top Stat Cards (Backoffice KPIs) */}
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

            {/* TAB 1: OVERVIEW & GMV */}
            {activeTab === 'overview' && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div>
                    <h3 className="font-extrabold text-base text-slate-900">
                      Arus Perputaran Dana (Escrow & Settlement)
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Transparansi dana mahasiswa, komisi platform, dan alokasi ke mitra fotokopi
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-xs font-semibold text-slate-500 block">GMV (Total Nilai Cetak Mahasiswa)</span>
                    <div className="text-xl font-black text-slate-800 mt-1">
                      Rp {totalGMV.toLocaleString('id-ID')}
                    </div>
                    <p className="text-[10px] text-slate-400 mt-1">Total uang yang dibayarkan mahasiswa via QRIS</p>
                  </div>

                  <div className="p-4 rounded-xl bg-sky-50 border border-sky-200">
                    <span className="text-xs font-semibold text-sky-700 block">Hak Mitra Fotokopi</span>
                    <div className="text-xl font-black text-sky-800 mt-1">
                      Rp {totalPartnerCut.toLocaleString('id-ID')}
                    </div>
                    <p className="text-[10px] text-sky-600 mt-1">Biaya cetak & jilid yang siap ditarik mitra</p>
                  </div>

                  <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
                    <span className="text-xs font-semibold text-emerald-700 block">Margin Bersih Platform (Anda)</span>
                    <div className="text-xl font-black text-emerald-800 mt-1">
                      Rp {totalPlatformCut.toLocaleString('id-ID')}
                    </div>
                    <p className="text-[10px] text-emerald-600 mt-1">Biaya layanan sistem tanpa modal ruko</p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-800 space-y-1">
                  <span className="font-bold flex items-center gap-1.5">
                    💡 Peran Super Admin dalam Skema Escrow:
                  </span>
                  <p className="text-[11px] leading-relaxed">
                    Dana pembayaran mahasiswa tidak langsung masuk ke rekening fotokopi saat order dibuat. Dana disimpan di rekening penampungan LapakPrint. Setelah dokumen selesai dicetak dan mahasiswa memverifikasi 4-digit PIN serah terima, saldo baru diteruskan ke akun mitra toko dan dapat ditarik (*payout*).
                  </p>
                </div>
              </div>
            )}

            {/* TAB 2: PAYOUT APPROVAL */}
            {activeTab === 'payouts' && (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
                <div className="p-4 sm:p-5 border-b border-slate-200 flex justify-between items-center">
                  <div>
                    <h3 className="font-extrabold text-sm sm:text-base text-slate-900">
                      Permintaan Penarikan Dana Mitra (Payout Approval)
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Verifikasi nomor rekening sebelum mentransfer saldo hasil cetak ke mitra
                    </p>
                  </div>
                </div>

                <div className="divide-y divide-slate-100">
                  {payouts.map((p) => (
                    <div key={p.id} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50 transition">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-mono font-bold text-xs bg-slate-100 px-2 py-0.5 rounded text-slate-700">
                            #{p.id}
                          </span>
                          <h4 className="font-bold text-sm text-slate-900">{p.vendorName}</h4>
                          <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded ${
                            p.status === 'pending'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-emerald-100 text-emerald-800'
                          }`}>
                            {p.status === 'pending' ? 'Menunggu Approval' : '✓ Telah Ditransfer'}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600">
                          Rekening Tujuan: <strong className="text-slate-800">{p.bank} - {p.accountNumber}</strong> a.n. <strong className="text-slate-800">{p.accountName}</strong>
                        </p>
                        <p className="text-[11px] text-slate-400">Diajukan: {p.requestedAt}</p>
                      </div>

                      <div className="flex items-center space-x-3">
                        <div className="text-right">
                          <span className="text-[10px] text-slate-400 block">Nominal Pencairan</span>
                          <span className="text-base font-black text-slate-900">
                            Rp {p.amount.toLocaleString('id-ID')}
                          </span>
                        </div>

                        {p.status === 'pending' ? (
                          <button
                            onClick={() => handleApprovePayout(p.id)}
                            className="py-2 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition"
                          >
                            Setujui & Transfer
                          </button>
                        ) : (
                          <span className="py-1 px-3 bg-slate-100 text-slate-500 rounded-lg text-xs font-semibold">
                            Selesai
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: KELOLA MITRA TOKO */}
            {activeTab === 'merchants' && (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
                <div className="p-4 sm:p-5 border-b border-slate-200 flex justify-between items-center">
                  <div>
                    <h3 className="font-extrabold text-sm sm:text-base text-slate-900">
                      Daftar Mitra Percetakan Terverifikasi
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Kelola hak akses, status toko, dan pengawasan kualitas cetak
                    </p>
                  </div>
                </div>

                <div className="divide-y divide-slate-100">
                  {partners.map((partner) => (
                    <div key={partner.id} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-start space-x-3">
                        <span className="text-3xl p-2 bg-slate-50 rounded-xl border border-slate-200">
                          {partner.avatar}
                        </span>
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="text-[10px] font-bold bg-amber-400 text-slate-950 px-1.5 py-0.2 rounded">
                              {partner.badge}
                            </span>
                            <h4 className="font-bold text-sm text-slate-900">{partner.name}</h4>
                          </div>
                          <p className="text-xs text-slate-500 mt-0.5">{partner.type} • {partner.distance}</p>
                          <div className="flex items-center space-x-3 text-xs mt-1 text-slate-600">
                            <span>⭐ {partner.rating}</span>
                            <span>• {partner.soldCount} Order Selesai</span>
                            <span>• {partner.isOpen ? '🟢 Status Buka' : '🔴 Toko Ditutup Sementara'}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleToggleStoreStatus(partner.id)}
                          className={`py-2 px-3 rounded-xl text-xs font-bold transition border ${
                            partner.isOpen
                              ? 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100'
                              : 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                          }`}
                        >
                          {partner.isOpen ? 'Suspend / Tutup Toko' : 'Aktifkan Toko'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 4: DISPUTE & REFUND */}
            {activeTab === 'disputes' && (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
                <div className="p-4 sm:p-5 border-b border-slate-200">
                  <h3 className="font-extrabold text-sm sm:text-base text-slate-900">
                    Pusat Resolusi Sengketa & Garansi Mahasiswa
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Pengambilan keputusan atas komplain salah cetak / jilid miring dari mahasiswa
                  </p>
                </div>

                <div className="divide-y divide-slate-100">
                  {disputes.map((d) => (
                    <div key={d.id} className="p-4 sm:p-5 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="font-mono font-bold text-xs bg-rose-100 text-rose-800 px-2 py-0.5 rounded">
                            #{d.id}
                          </span>
                          <span className="text-xs font-bold text-slate-700">Order Ref: {d.orderId}</span>
                        </div>
                        <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded ${
                          d.status === 'open' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                        }`}>
                          {d.status === 'open' ? 'Menunggu Keputusan Admin' : 'Kasus Ditutup'}
                        </span>
                      </div>

                      <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs space-y-1">
                        <p><strong>Penggugat:</strong> {d.customerName}</p>
                        <p><strong>Tergugat (Toko):</strong> {d.vendorName}</p>
                        <p className="text-rose-700"><strong>Masalah:</strong> "{d.issue}"</p>
                        <p className="text-slate-600"><strong>Tuntutan:</strong> {d.requestedAction} (Nilai: Rp {d.amount.toLocaleString('id-ID')})</p>
                      </div>

                      {d.status === 'open' && (
                        <div className="flex space-x-2 pt-1">
                          <button
                            onClick={() => handleResolveDispute(d.id, 'refunded')}
                            className="py-2 px-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs transition"
                          >
                            Setujui Refund Rp {d.amount.toLocaleString('id-ID')} ke Mahasiswa
                          </button>
                          <button
                            onClick={() => handleResolveDispute(d.id, 'reprinted')}
                            className="py-2 px-3 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs transition"
                          >
                            Instruksikan Toko Cetak Ulang Gratis
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 5: GEOFENCING & COMMISSION SETTINGS */}
            {activeTab === 'geofencing' && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-5">
                <div>
                  <h3 className="font-extrabold text-base text-slate-900">
                    Pengaturan Geofencing Kampus & Model Bagi Hasil
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Konfigurasi parameter operasional platform LapakPrint
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                    <label className="text-xs font-bold text-slate-700 block">
                      Radius Geofencing Kampus Terdekat
                    </label>
                    <div className="flex items-center space-x-3">
                      <input
                        type="range"
                        min="0.5"
                        max="5.0"
                        step="0.5"
                        value={campusRadius}
                        onChange={(e) => setCampusRadius(Number(e.target.value))}
                        className="w-full accent-sky-600 cursor-pointer"
                      />
                      <span className="text-sm font-black text-sky-700 w-16 text-right">
                        {campusRadius} km
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-400">
                      Hanya mitra percetakan dalam radius ini yang muncul di aplikasi mahasiswa.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                    <label className="text-xs font-bold text-slate-700 block">
                      Biaya Layanan Platform (Platform Fee per Order)
                    </label>
                    <div className="flex items-center space-x-3">
                      <input
                        type="number"
                        step="250"
                        value={platformFee}
                        onChange={(e) => setPlatformFee(Number(e.target.value))}
                        className="w-32 p-2 border border-slate-300 rounded-lg text-xs font-bold text-slate-900 focus:outline-none focus:border-sky-500"
                      />
                      <span className="text-xs text-slate-500">per transaksi cetak</span>
                    </div>
                    <p className="text-[10px] text-slate-400">
                      Pendapatan bersih Anda dari setiap dokumen yang diproses.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => alert(`Pengaturan Disimpan:\n- Radius Geofencing: ${campusRadius} km\n- Platform Fee: Rp ${platformFee}`)}
                  className="py-2.5 px-6 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition"
                >
                  Simpan Perubahan Konfigurasi
                </button>
              </div>
            )}

          </div>

        </div>
      </div>

    </div>
  );
}
