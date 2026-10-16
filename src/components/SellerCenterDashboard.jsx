import React, { useState } from 'react';
import { 
  Store, Printer, CheckCircle2, Clock, ShieldCheck, 
  Wallet, DollarSign, ArrowRight, Sparkles, LogOut, 
  UserCheck, AlertCircle, RefreshCw, FileText, Check 
} from 'lucide-react';

export default function SellerCenterDashboard({ 
  currentMitra, 
  orders, 
  onUpdateOrderStatus, 
  onVerifyPickup, 
  onLogout,
  onSwitchToStudent,
  onSwitchToSuperAdmin,
  onOpenInsights 
}) {
  const [activeTab, setActiveTab] = useState('orders'); // 'orders' | 'finance' | 'settings'
  const [statusFilter, setStatusFilter] = useState('all');
  const [pinInput, setPinInput] = useState('');
  const [verifyingOrderId, setVerifyingOrderId] = useState(null);
  const [pinError, setPinError] = useState('');
  const [isStoreOpen, setIsStoreOpen] = useState(true);

  // Filter orders for this vendor
  const vendorOrders = orders.filter(o => o.vendorId === currentMitra.id || o.vendorId === 'vendor-1');

  const pendingCount = vendorOrders.filter(o => o.status === 'pending').length;
  const inProgressCount = vendorOrders.filter(o => o.status === 'printing' || o.status === 'binding').length;
  const readyCount = vendorOrders.filter(o => o.status === 'ready').length;
  const completedCount = vendorOrders.filter(o => o.status === 'completed').length;

  const totalVendorRevenue = vendorOrders
    .filter(o => o.status === 'completed' || o.status === 'ready' || o.status === 'printing')
    .reduce((acc, curr) => acc + (curr.pricing?.vendorShare || 0), 0);

  const handleVerifySubmit = (order) => {
    if (pinInput.trim() === order.pickupPin) {
      onVerifyPickup(order.id);
      setVerifyingOrderId(null);
      setPinInput('');
      setPinError('');
    } else {
      setPinError('PIN salah! Mahasiswa harus menunjukkan PIN 4-digit dari aplikasi.');
    }
  };

  const filteredOrders = vendorOrders.filter(o => {
    if (statusFilter === 'all') return true;
    if (statusFilter === 'pending') return o.status === 'pending';
    if (statusFilter === 'progress') return o.status === 'printing' || o.status === 'binding';
    if (statusFilter === 'ready') return o.status === 'ready';
    if (statusFilter === 'completed') return o.status === 'completed';
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      
      {/* Seller Center Header Bar (Light Blue & White) */}
      <header className="bg-white border-b border-sky-100 sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Logo & Store Identity */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-sky-500 text-white flex items-center justify-center shadow-md shadow-sky-500/20">
              <Printer className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-lg font-black text-sky-600">LapakPrint</span>
                <span className="px-2 py-0.5 text-[10px] font-bold bg-amber-100 text-amber-800 rounded-md">
                  Seller Centre
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">{currentMitra.name}</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center space-x-4">
            
            {/* Store Status Toggle */}
            <div className="hidden sm:flex items-center space-x-2 bg-slate-100 py-1 px-3 rounded-full border border-slate-200">
              <span className={`w-2 h-2 rounded-full ${isStoreOpen ? 'bg-emerald-500' : 'bg-red-500'}`}></span>
              <span className="text-xs font-bold text-slate-700">
                {isStoreOpen ? 'Toko Buka' : 'Toko Tutup'}
              </span>
              <button 
                onClick={() => setIsStoreOpen(!isStoreOpen)} 
                className="text-[10px] text-sky-600 font-semibold underline ml-1"
              >
                Ubah
              </button>
            </div>

            <button
              onClick={onOpenInsights}
              className="hidden md:flex items-center space-x-1 py-1.5 px-3 rounded-xl bg-sky-50 text-sky-700 hover:bg-sky-100 text-xs font-bold border border-sky-200 transition"
            >
              <Sparkles className="w-3.5 h-3.5 text-sky-600" />
              <span>Analisis Bisnis</span>
            </button>

            {/* Switch to Super Admin */}
            <button
              onClick={onSwitchToSuperAdmin}
              className="py-1.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-300 text-xs font-bold shadow-xs transition flex items-center space-x-1"
            >
              <span>👑 Super Admin</span>
            </button>

            {/* Switch to Student View Button */}
            <button
              onClick={onSwitchToStudent}
              className="py-1.5 px-3 rounded-xl bg-sky-500 hover:bg-sky-600 text-white text-xs font-bold shadow-xs transition flex items-center space-x-1"
            >
              <span>Lihat Sisi Mahasiswa</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={onLogout}
              title="Keluar / Logout"
              className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

        </div>
      </header>

      {/* Main Content Layout with Sidebar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Sidebar */}
          <div className="lg:col-span-3 space-y-4">
            <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-1 text-xs font-bold">
              <span className="text-[10px] uppercase text-slate-400 font-bold tracking-wider px-3 py-1 block">
                Menu Toko
              </span>
              <button
                onClick={() => setActiveTab('orders')}
                className={`w-full py-2.5 px-3 rounded-xl flex items-center space-x-2.5 transition text-left ${
                  activeTab === 'orders'
                    ? 'bg-sky-50 text-sky-700 font-extrabold'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Printer className="w-4 h-4 text-sky-600" />
                <span>Antrean Cetak & Jilid</span>
                {pendingCount > 0 && (
                  <span className="ml-auto bg-red-500 text-white text-[10px] px-1.5 py-0.2 rounded-full font-mono">
                    {pendingCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveTab('finance')}
                className={`w-full py-2.5 px-3 rounded-xl flex items-center space-x-2.5 transition text-left ${
                  activeTab === 'finance'
                    ? 'bg-sky-50 text-sky-700 font-extrabold'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Wallet className="w-4 h-4 text-emerald-600" />
                <span>Keuangan & Saldo</span>
              </button>

              <button
                onClick={() => alert("Pengaturan Toko:\n- Kertas PaperOne 80gr: Aktif\n- Mesin Cetak Laser: Siap\n- Estimasi Pengerjaan: 15 Menit")}
                className="w-full py-2.5 px-3 rounded-xl flex items-center space-x-2.5 text-slate-600 hover:bg-slate-50 transition text-left"
              >
                <Store className="w-4 h-4 text-slate-400" />
                <span>Pengaturan Kertas & Tarif</span>
              </button>
            </div>

            {/* Quick Balance Widget */}
            <div className="bg-gradient-to-br from-sky-500 to-blue-600 rounded-2xl p-4 text-white shadow-md">
              <span className="text-[10px] uppercase tracking-wider text-sky-100 font-bold block">
                Saldo Toko Siap Ditarik
              </span>
              <div className="text-xl font-black mt-1">
                Rp {currentMitra.sellerBalance?.toLocaleString('id-ID')}
              </div>
              <p className="text-[10px] text-sky-100 mt-1">Ditransfer otomatis setiap hari kerja</p>
              <button 
                onClick={() => alert("Simulasi Penarikan Dana:\nDana Rp 1.425.000 berhasil ditarik ke Rekening BCA Haji Rohman.")}
                className="w-full mt-3 py-2 bg-white text-sky-700 font-bold rounded-xl text-xs hover:bg-sky-50 transition shadow-xs"
              >
                Tarik Saldo ke Bank
              </button>
            </div>
          </div>

          {/* Right Main Panel */}
          <div className="lg:col-span-9 space-y-6">
            
            {/* Top Metric Cards (Shopee Seller Center Style) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
                <span className="text-[11px] font-semibold text-slate-500 block">Perlu Diproses</span>
                <div className="text-2xl font-black text-amber-500 mt-1">{pendingCount}</div>
                <span className="text-[10px] text-slate-400">Order baru masuk</span>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
                <span className="text-[11px] font-semibold text-slate-500 block">Sedang Dicetak/Jilid</span>
                <div className="text-2xl font-black text-sky-600 mt-1">{inProgressCount}</div>
                <span className="text-[10px] text-slate-400">Di mesin cetak</span>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
                <span className="text-[11px] font-semibold text-slate-500 block">Siap Serah Terima</span>
                <div className="text-2xl font-black text-emerald-600 mt-1">{readyCount}</div>
                <span className="text-[10px] text-slate-400">Menunggu PIN mahasiswa</span>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
                <span className="text-[11px] font-semibold text-slate-500 block">Omzet Bersih Toko</span>
                <div className="text-xl font-black text-slate-900 mt-1">
                  Rp {totalVendorRevenue.toLocaleString('id-ID')}
                </div>
                <span className="text-[10px] text-emerald-600 font-semibold">100% Hak Toko Lunas</span>
              </div>
            </div>

            {/* Production Orders Section */}
            {activeTab === 'orders' && (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
                
                {/* Status Tabs Header */}
                <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <h3 className="font-extrabold text-sm text-slate-900">
                    Antrean Cetak Dokumen Mahasiswa
                  </h3>

                  <div className="flex space-x-1.5 text-xs font-bold overflow-x-auto">
                    <button
                      onClick={() => setStatusFilter('all')}
                      className={`px-3 py-1.5 rounded-xl transition ${
                        statusFilter === 'all'
                          ? 'bg-sky-500 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      Semua ({vendorOrders.length})
                    </button>
                    <button
                      onClick={() => setStatusFilter('pending')}
                      className={`px-3 py-1.5 rounded-xl transition ${
                        statusFilter === 'pending'
                          ? 'bg-sky-500 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      Baru ({pendingCount})
                    </button>
                    <button
                      onClick={() => setStatusFilter('progress')}
                      className={`px-3 py-1.5 rounded-xl transition ${
                        statusFilter === 'progress'
                          ? 'bg-sky-500 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      Proses ({inProgressCount})
                    </button>
                    <button
                      onClick={() => setStatusFilter('ready')}
                      className={`px-3 py-1.5 rounded-xl transition ${
                        statusFilter === 'ready'
                          ? 'bg-sky-500 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      Siap Ambil ({readyCount})
                    </button>
                  </div>
                </div>

                {/* Orders Cards List */}
                <div className="p-4 sm:p-5 space-y-4">
                  {filteredOrders.map((order) => (
                    <div
                      key={order.id}
                      className="p-4 sm:p-5 rounded-2xl border border-slate-200 hover:border-sky-300 transition bg-white shadow-xs space-y-3"
                    >
                      {/* Top Row */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                        <div className="flex items-center space-x-2">
                          <span className="font-mono font-bold text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                            #{order.id}
                          </span>
                          <span className="font-extrabold text-xs text-slate-900">
                            {order.customerName}
                          </span>
                          <span className="text-xs text-slate-400">({order.customerPhone})</span>
                        </div>

                        <div className="flex items-center space-x-2">
                          <span className="text-[11px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded font-bold border border-emerald-200">
                            ✓ LUNAS via QRIS
                          </span>
                          <span className="text-xs font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded">
                            Bagian Toko: Rp {order.pricing?.vendorShare?.toLocaleString('id-ID')}
                          </span>
                        </div>
                      </div>

                      {/* Document & Production Specs */}
                      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                        <div className="sm:col-span-8 space-y-1">
                          <h4 className="font-extrabold text-sm text-slate-900">
                            {order.docName}
                          </h4>
                          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-600">
                            <span>Kertas: <strong className="text-slate-800">{order.paperType}</strong></span>
                            <span>Total: <strong className="text-slate-800">{order.pages} Hlm ({order.bwPages} BW + {order.colorPages} Warna)</strong></span>
                            <span>Jilid: <strong className="text-sky-700">{order.bindingType} ({order.bindingColor})</strong></span>
                            <span>Jumlah: <strong className="text-slate-800">{order.copies} Rangkap</strong></span>
                          </div>
                          {order.notes && (
                            <p className="text-[11px] text-amber-800 bg-amber-50 p-2 rounded-lg border border-amber-200">
                              Catatan Khusus: "{order.notes}"
                            </p>
                          )}
                        </div>

                        {/* Production Actions */}
                        <div className="sm:col-span-4 flex flex-col justify-end space-y-2">
                          
                          {/* Order State: PENDING */}
                          {order.status === 'pending' && (
                            <button
                              onClick={() => onUpdateOrderStatus(order.id, 'printing')}
                              className="w-full py-2.5 px-4 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs shadow-md shadow-sky-500/20 transition flex items-center justify-center space-x-2"
                            >
                              <Printer className="w-4 h-4" />
                              <span>Terima & Cetak File</span>
                            </button>
                          )}

                          {/* Order State: PRINTING */}
                          {order.status === 'printing' && (
                            <button
                              onClick={() => onUpdateOrderStatus(order.id, 'binding')}
                              className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition"
                            >
                              <span>Cetak Selesai ➔ Masuk Jilid</span>
                            </button>
                          )}

                          {/* Order State: BINDING */}
                          {order.status === 'binding' && (
                            <button
                              onClick={() => onUpdateOrderStatus(order.id, 'ready')}
                              className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition"
                            >
                              <span>Selesai Jilid (Kirim Notif Ambil)</span>
                            </button>
                          )}

                          {/* Order State: READY -> Needs PIN Verification */}
                          {order.status === 'ready' && (
                            verifyingOrderId === order.id ? (
                              <div className="bg-sky-50 p-3 rounded-xl border border-sky-300 space-y-2">
                                <label className="text-[11px] font-bold text-sky-800 block">
                                  Input 4-Digit PIN dari HP Mahasiswa:
                                </label>
                                <div className="flex space-x-1.5">
                                  <input
                                    type="text"
                                    maxLength={4}
                                    value={pinInput}
                                    onChange={(e) => setPinInput(e.target.value)}
                                    placeholder="4192"
                                    className="w-20 text-center font-mono font-bold tracking-widest text-sm p-1.5 bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-sky-500"
                                  />
                                  <button
                                    onClick={() => handleVerifySubmit(order)}
                                    className="flex-1 py-1.5 px-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg transition"
                                  >
                                    Cek PIN
                                  </button>
                                  <button
                                    onClick={() => {
                                      setVerifyingOrderId(null);
                                      setPinError('');
                                    }}
                                    className="px-2 py-1 text-slate-500 text-xs hover:text-slate-800"
                                  >
                                    Batal
                                  </button>
                                </div>
                                {pinError && (
                                  <p className="text-[10px] text-red-500">{pinError}</p>
                                )}
                              </div>
                            ) : (
                              <button
                                onClick={() => {
                                  setVerifyingOrderId(order.id);
                                  setPinInput('');
                                  setPinError('');
                                }}
                                className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/20 transition flex items-center justify-center space-x-2"
                              >
                                <ShieldCheck className="w-4 h-4" />
                                <span>Serah Terima Dokumen (PIN)</span>
                              </button>
                            )
                          )}

                          {/* Order State: COMPLETED */}
                          {order.status === 'completed' && (
                            <span className="text-center text-xs text-slate-500 font-semibold bg-slate-100 py-2 rounded-xl">
                              ✓ Selesai & Telah Diambil
                            </span>
                          )}

                        </div>
                      </div>
                    </div>
                  ))}

                  {filteredOrders.length === 0 && (
                    <div className="text-center py-12 text-slate-400 text-xs">
                      Tidak ada pesanan pada filter ini
                    </div>
                  )}
                </div>

              </div>
            )}

            {/* Finance Tab */}
            {activeTab === 'finance' && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
                <h3 className="font-extrabold text-base text-slate-900">
                  Laporan Keuangan & Saldo Mitra
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-sky-50 border border-sky-200">
                    <span className="text-xs text-slate-500 block">Total Omzet Bulan Ini</span>
                    <div className="text-2xl font-black text-sky-700 mt-1">Rp 12.840.000</div>
                    <span className="text-[10px] text-slate-400">Dari 348 transaksi cetak & jilid</span>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
                    <span className="text-xs text-slate-500 block">Biaya Komisi Platform Dibayarkan</span>
                    <div className="text-2xl font-black text-emerald-700 mt-1">Rp 522.000</div>
                    <span className="text-[10px] text-slate-400">Rp 1.500 / order tanpa biaya sewa</span>
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>
      </div>

    </div>
  );
}
