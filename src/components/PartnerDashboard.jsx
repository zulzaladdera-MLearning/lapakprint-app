import React, { useState } from 'react';
import { 
  Printer, CheckCircle2, Clock, Check, AlertCircle, FileText, 
  ExternalLink, ArrowRight, ShieldCheck, DollarSign, Wallet, Sparkles, Filter, CheckCheck
} from 'lucide-react';

export default function PartnerDashboard({ orders, onUpdateOrderStatus, onVerifyPickup }) {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [pinInput, setPinInput] = useState('');
  const [verifyingOrderId, setVerifyingOrderId] = useState(null);
  const [pinError, setPinError] = useState('');

  // Calculate quick stats
  const totalVendorRevenue = orders
    .filter(o => o.status === 'completed' || o.status === 'ready' || o.status === 'printing')
    .reduce((acc, curr) => acc + (curr.pricing?.vendorShare || 0), 0);

  const pendingCount = orders.filter(o => o.status === 'pending').length;
  const inProgressCount = orders.filter(o => o.status === 'printing' || o.status === 'binding').length;
  const readyCount = orders.filter(o => o.status === 'ready').length;
  const completedCount = orders.filter(o => o.status === 'completed').length;

  const handleVerifySubmit = (order) => {
    if (pinInput.trim() === order.pickupPin) {
      onVerifyPickup(order.id);
      setVerifyingOrderId(null);
      setPinInput('');
      setPinError('');
    } else {
      setPinError('PIN salah! Minta mahasiswa menunjukkan PIN 4-digit di layar aplikasinya.');
    }
  };

  return (
    <div className="bg-slate-900 text-slate-100 min-h-[calc(100vh-4rem)] p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Merchant Header Bar */}
        <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5 shadow-xl backdrop-blur-md">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center space-x-3.5">
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center text-2xl">
                🏪
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h2 className="text-lg font-bold text-white">Fotokopi & Percetakan Berkah Ilahi</h2>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span className="text-xs text-emerald-400 font-semibold">Online & Menerima Order</span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  ID Mitra: <span className="font-mono text-slate-300">VEND-001</span> • 2 Operator Aktif (Kasir & Finishing Jilid)
                </p>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="flex items-center space-x-3 bg-slate-900/70 p-3 rounded-xl border border-slate-700">
              <div className="px-3 border-r border-slate-700 text-right">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold">Omzet Bersih Toko</span>
                <span className="text-base font-extrabold text-emerald-400">
                  Rp {totalVendorRevenue.toLocaleString('id-ID')}
                </span>
              </div>
              <div className="px-3 text-right">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold">Antrean Aktif</span>
                <span className="text-base font-extrabold text-amber-400">
                  {pendingCount + inProgressCount} Dokumen
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Board Columns (Production Kitchen Display System) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          {/* COLUMN 1: ANTRIAN MASUK (PENDING) */}
          <div className="bg-slate-800/50 border border-slate-700/70 rounded-2xl p-4 flex flex-col">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-700">
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full bg-amber-400"></span>
                <h3 className="font-bold text-sm text-slate-200">1. Antrean Baru Masuk</h3>
              </div>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-400/10 text-amber-400 border border-amber-400/20">
                {pendingCount}
              </span>
            </div>

            <div className="space-y-3 flex-1 overflow-y-auto max-h-[600px] pr-1">
              {orders.filter(o => o.status === 'pending').map((order) => (
                <div 
                  key={order.id}
                  className="bg-slate-800 border-2 border-amber-500/40 rounded-xl p-4 shadow-lg hover:border-amber-400 transition space-y-3"
                >
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-mono font-bold text-amber-300 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-700/50">
                      #{order.id}
                    </span>
                    <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded font-bold border border-emerald-800/50">
                      ✓ LUNAS via QRIS
                    </span>
                  </div>

                  <div>
                    <h4 className="font-bold text-sm text-white truncate">{order.docName}</h4>
                    <p className="text-xs text-slate-300 mt-0.5">Pemesan: <strong className="text-white">{order.customerName}</strong></p>
                  </div>

                  {/* Highlight Specs */}
                  <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-700/80 text-xs space-y-1">
                    <div className="flex justify-between text-slate-300">
                      <span>Kertas:</span>
                      <strong className="text-white">{order.paperType}</strong>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>Rincian Cetak:</span>
                      <strong className="text-amber-300">
                        {order.bwPages} BW + {order.colorPages} Warna
                      </strong>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>Jilid:</span>
                      <strong className="text-white">{order.bindingType} ({order.bindingColor})</strong>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>Jumlah:</span>
                      <strong className="text-white">{order.copies} Rangkap</strong>
                    </div>
                  </div>

                  {order.notes && (
                    <p className="text-[11px] text-amber-200/90 italic bg-amber-950/30 p-2 rounded border border-amber-800/30">
                      Catatan: "{order.notes}"
                    </p>
                  )}

                  <div className="pt-2 flex items-center gap-2">
                    <button
                      onClick={() => onUpdateOrderStatus(order.id, 'printing')}
                      className="w-full py-2 px-3 rounded-lg bg-blue-600 hover:bg-blue-500 font-bold text-xs text-white flex items-center justify-center space-x-1.5 transition shadow-md shadow-blue-600/30"
                    >
                      <Printer className="w-4 h-4" />
                      <span>Terima & Cetak</span>
                    </button>
                  </div>
                </div>
              ))}

              {pendingCount === 0 && (
                <div className="text-center py-12 text-slate-500 text-xs">
                  Tidak ada order baru menunggu
                </div>
              )}
            </div>
          </div>

          {/* COLUMN 2: PROSES CETAK & JILID */}
          <div className="bg-slate-800/50 border border-slate-700/70 rounded-2xl p-4 flex flex-col">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-700">
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full bg-blue-400 animate-pulse"></span>
                <h3 className="font-bold text-sm text-slate-200">2. Sedang Dikerjakan</h3>
              </div>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-blue-400/10 text-blue-400 border border-blue-400/20">
                {inProgressCount}
              </span>
            </div>

            <div className="space-y-3 flex-1 overflow-y-auto max-h-[600px] pr-1">
              {orders.filter(o => o.status === 'printing' || o.status === 'binding').map((order) => (
                <div 
                  key={order.id}
                  className="bg-slate-800 border border-blue-500/50 rounded-xl p-4 shadow-lg space-y-3"
                >
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-mono font-bold text-blue-300 bg-blue-950/60 px-2 py-0.5 rounded border border-blue-700/50">
                      #{order.id}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-600 text-white flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
                      {order.status === 'printing' ? 'Mesin Cetak Berjalan' : 'Proses Penjilidan'}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-bold text-sm text-white truncate">{order.docName}</h4>
                    <p className="text-xs text-slate-400">{order.customerName} ({order.customerPhone})</p>
                  </div>

                  <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-700/80 text-xs space-y-1">
                    <div className="flex justify-between text-slate-300">
                      <span>Spek:</span>
                      <strong className="text-white">{order.pages} hlm • {order.paperType}</strong>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>Jilid:</span>
                      <strong className="text-blue-300">{order.bindingType} ({order.bindingColor})</strong>
                    </div>
                  </div>

                  <div className="pt-2 space-y-2">
                    {order.status === 'printing' && (
                      <button
                        onClick={() => onUpdateOrderStatus(order.id, 'binding')}
                        className="w-full py-2 px-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 font-bold text-xs text-white flex items-center justify-center space-x-1.5 transition"
                      >
                        <span>Cetak Beres ➔ Masuk Penjilidan</span>
                      </button>
                    )}
                    <button
                      onClick={() => onUpdateOrderStatus(order.id, 'ready')}
                      className="w-full py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 font-bold text-xs text-white flex items-center justify-center space-x-1.5 transition shadow-md shadow-emerald-600/20"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Selesai (Kirim Notif ke Mahasiswa)</span>
                    </button>
                  </div>
                </div>
              ))}

              {inProgressCount === 0 && (
                <div className="text-center py-12 text-slate-500 text-xs">
                  Tidak ada order sedang diproduksi
                </div>
              )}
            </div>
          </div>

          {/* COLUMN 3: SIAP DIAMBIL & SELESAI */}
          <div className="bg-slate-800/50 border border-slate-700/70 rounded-2xl p-4 flex flex-col">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-700">
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full bg-emerald-400"></span>
                <h3 className="font-bold text-sm text-slate-200">3. Siap Diambil / Diantar</h3>
              </div>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-400/10 text-emerald-400 border border-emerald-400/20">
                {readyCount}
              </span>
            </div>

            <div className="space-y-3 flex-1 overflow-y-auto max-h-[600px] pr-1">
              {orders.filter(o => o.status === 'ready').map((order) => (
                <div 
                  key={order.id}
                  className="bg-slate-800 border-2 border-emerald-500/50 rounded-xl p-4 shadow-lg space-y-3"
                >
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-mono font-bold text-emerald-300 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-700/50">
                      #{order.id}
                    </span>
                    <span className="text-[10px] text-emerald-300 bg-emerald-900/60 px-2 py-0.5 rounded font-bold border border-emerald-500/30">
                      Tinggal Serah Terima
                    </span>
                  </div>

                  <div>
                    <h4 className="font-bold text-sm text-white truncate">{order.docName}</h4>
                    <p className="text-xs text-slate-300">
                      Pemesan: <strong className="text-white">{order.customerName}</strong>
                    </p>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Metode: <span className="font-semibold text-slate-200">{order.deliveryMethod === 'pickup' ? 'Ambil di Toko' : 'Kurir Kampus'}</span>
                    </p>
                  </div>

                  {/* Verification Section */}
                  {verifyingOrderId === order.id ? (
                    <div className="bg-slate-900 p-3 rounded-xl border border-emerald-500/60 space-y-2">
                      <label className="text-[11px] font-bold text-emerald-300 block">
                        Masukkan PIN 4-Digit dari Layar Mahasiswa:
                      </label>
                      <div className="flex space-x-2">
                        <input
                          type="text"
                          maxLength={4}
                          value={pinInput}
                          onChange={(e) => setPinInput(e.target.value)}
                          placeholder="e.g. 4192"
                          className="w-24 text-center font-mono font-bold tracking-widest text-base p-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                        />
                        <button
                          onClick={() => handleVerifySubmit(order)}
                          className="flex-1 py-2 px-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg transition"
                        >
                          Verifikasi
                        </button>
                        <button
                          onClick={() => {
                            setVerifyingOrderId(null);
                            setPinError('');
                          }}
                          className="px-2 py-1 text-slate-400 hover:text-slate-200 text-xs"
                        >
                          Batal
                        </button>
                      </div>
                      {pinError && (
                        <p className="text-[10px] text-red-400">{pinError}</p>
                      )}
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        setVerifyingOrderId(order.id);
                        setPinInput('');
                        setPinError('');
                      }}
                      className="w-full py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 font-bold text-xs text-white flex items-center justify-center space-x-2 transition shadow-md shadow-emerald-600/30"
                    >
                      <ShieldCheck className="w-4 h-4" />
                      <span>Verifikasi Pengambilan (PIN)</span>
                    </button>
                  )}
                </div>
              ))}

              {readyCount === 0 && (
                <div className="text-center py-12 text-slate-500 text-xs">
                  Tidak ada order menunggu serah terima
                </div>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
