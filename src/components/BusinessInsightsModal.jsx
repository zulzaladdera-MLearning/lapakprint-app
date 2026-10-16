import React, { useState } from 'react';
import { X, TrendingUp, AlertTriangle, ShieldCheck, HelpCircle, Calculator, CheckCircle2, ChevronRight } from 'lucide-react';

export default function BusinessInsightsModal({ isOpen, onClose }) {
  // Unit Economics Simulation State
  const [dailyOrders, setDailyOrders] = useState(120); // 120 pesanan per hari di 1 kampus
  const [platformFee, setPlatformFee] = useState(1500); // Rp 1.500 komisi platform
  const [avgOrderValue, setAvgOrderValue] = useState(25000); // Rp 25.000 rata-rata nilai cetak+jilid

  if (!isOpen) return null;

  // Monthly estimations (25 active days per month)
  const monthlyOrders = dailyOrders * 25;
  const monthlyPlatformGross = monthlyOrders * platformFee;
  const monthlyMitraGross = monthlyOrders * (avgOrderValue - platformFee);
  const studentHoursSaved = Math.round((monthlyOrders * 25) / 60); // Asumsi hemat 25 menit antre per order

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 my-8 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-indigo-100 text-indigo-700">
                Strategic Framework
              </span>
              <h2 className="text-xl font-extrabold text-slate-900">
                Analisis Kelayakan Bisnis & Problem Solving
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Validasi model pendapatan, mitigasi risiko lapangan, dan unit economics LapakPrint
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Section 1: Interactive Unit Economics Calculator */}
        <div className="mt-6 bg-slate-50 rounded-2xl p-6 border border-slate-200">
          <div className="flex items-center space-x-2 mb-4">
            <Calculator className="w-5 h-5 text-indigo-600" />
            <h3 className="font-bold text-slate-800 text-base">
              Simulasi Pendapatan (Unit Economics) per 1 Kampus
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
            {/* Control 1: Order per hari */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-slate-500 font-medium">Order per Hari</span>
                <span className="text-sm font-bold text-indigo-600">{dailyOrders} order</span>
              </div>
              <input
                type="range"
                min="20"
                max="500"
                step="10"
                value={dailyOrders}
                onChange={(e) => setDailyOrders(Number(e.target.value))}
                className="w-full accent-indigo-600 cursor-pointer"
              />
              <span className="text-[10px] text-slate-400">Musim skripsi bisa 300-500 order/hari</span>
            </div>

            {/* Control 2: Platform Fee */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-slate-500 font-medium">Biaya Layanan Platform</span>
                <span className="text-sm font-bold text-indigo-600">Rp {platformFee.toLocaleString('id-ID')}</span>
              </div>
              <input
                type="range"
                min="500"
                max="3000"
                step="250"
                value={platformFee}
                onChange={(e) => setPlatformFee(Number(e.target.value))}
                className="w-full accent-indigo-600 cursor-pointer"
              />
              <span className="text-[10px] text-slate-400">Komisi per transaksi cetak</span>
            </div>

            {/* Control 3: Nilai Rata-rata Cetak */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-slate-500 font-medium">Rata-rata Nilai Order</span>
                <span className="text-sm font-bold text-indigo-600">Rp {avgOrderValue.toLocaleString('id-ID')}</span>
              </div>
              <input
                type="range"
                min="10000"
                max="80000"
                step="5000"
                value={avgOrderValue}
                onChange={(e) => setAvgOrderValue(Number(e.target.value))}
                className="w-full accent-indigo-600 cursor-pointer"
              />
              <span className="text-[10px] text-slate-400">Campuran tugas & jilid skripsi</span>
            </div>
          </div>

          {/* Metric Outputs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-indigo-600 to-blue-700 text-white p-4 rounded-xl shadow-md">
              <span className="text-[11px] font-semibold text-indigo-200 uppercase tracking-wider block">
                Pendapatan Aplikasi / Bulan
              </span>
              <div className="text-xl font-black mt-1">
                Rp {monthlyPlatformGross.toLocaleString('id-ID')}
              </div>
              <p className="text-[10px] text-indigo-200 mt-1">Dari {monthlyOrders.toLocaleString('id-ID')} transaksi/bln</p>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                Peredaran Uang ke Mitra Toko
              </span>
              <div className="text-xl font-black text-slate-800 mt-1">
                Rp {monthlyMitraGross.toLocaleString('id-ID')}
              </div>
              <p className="text-[10px] text-emerald-600 font-semibold mt-1">Omzet tambahan tanpa nambah ruko fisik</p>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                Waktu Antre Mahasiswa Dihemat
              </span>
              <div className="text-xl font-black text-amber-600 mt-1">
                {studentHoursSaved.toLocaleString('id-ID')} Jam
              </div>
              <p className="text-[10px] text-slate-400 mt-1">Nilai manfaat nyata bagi customer</p>
            </div>
          </div>
        </div>

        {/* Section 2: Problem Solving Kasus Nyata di Lapangan */}
        <div className="mt-8 space-y-4">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <h3 className="font-bold text-slate-800 text-base">
              Problem Solving & Mitigasi Risiko Lapangan
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Risk 1 */}
            <div className="p-4 rounded-2xl border border-slate-200 hover:border-slate-300 transition bg-white space-y-2">
              <div className="flex items-start space-x-2.5">
                <span className="p-1.5 rounded-lg bg-red-100 text-red-600 shrink-0 mt-0.5">
                  <AlertTriangle className="w-4 h-4" />
                </span>
                <div>
                  <h4 className="font-bold text-xs text-slate-900">
                    Masalah: Dokumen Mahasiswa Tertukar Saat Diambil
                  </h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Di fotokopi biasa, draf skripsi sering tertukar karena nama mirip atau asal comot di meja kasir.
                  </p>
                  <div className="mt-2 text-[11px] text-emerald-800 bg-emerald-50 p-2 rounded-lg border border-emerald-200">
                    <strong>Solusi LapakPrint:</strong> Verifikasi 4-Digit Security PIN. Dokumen baru diserahkan setelah kasir mencocokkan PIN di layar HP mahasiswa.
                  </div>
                </div>
              </div>
            </div>

            {/* Risk 2 */}
            <div className="p-4 rounded-2xl border border-slate-200 hover:border-slate-300 transition bg-white space-y-2">
              <div className="flex items-start space-x-2.5">
                <span className="p-1.5 rounded-lg bg-red-100 text-red-600 shrink-0 mt-0.5">
                  <AlertTriangle className="w-4 h-4" />
                </span>
                <div>
                  <h4 className="font-bold text-xs text-slate-900">
                    Masalah: Mahasiswa Tidak Bayar / Batal Setelah Dicetak
                  </h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Jika mahasiswa pesan via WhatsApp lalu tidak datang mengambil, toko fotokopi rugi kertas dan tinta.
                  </p>
                  <div className="mt-2 text-[11px] text-emerald-800 bg-emerald-50 p-2 rounded-lg border border-emerald-200">
                    <strong>Solusi LapakPrint:</strong> 100% Upfront QRIS Payment (Bayar Lunas di Muka). Uang ditampung sistem escrow sehingga hak toko aman 100%.
                  </div>
                </div>
              </div>
            </div>

            {/* Risk 3 */}
            <div className="p-4 rounded-2xl border border-slate-200 hover:border-slate-300 transition bg-white space-y-2">
              <div className="flex items-start space-x-2.5">
                <span className="p-1.5 rounded-lg bg-amber-100 text-amber-700 shrink-0 mt-0.5">
                  <AlertTriangle className="w-4 h-4" />
                </span>
                <div>
                  <h4 className="font-bold text-xs text-slate-900">
                    Masalah: Font Berantakan & Layout Rusak (.docx)
                  </h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    File Microsoft Word sering bergeser margin saat dibuka di komputer fotokopi dengan versi Office berbeda.
                  </p>
                  <div className="mt-2 text-[11px] text-emerald-800 bg-emerald-50 p-2 rounded-lg border border-emerald-200">
                    <strong>Solusi LapakPrint:</strong> Kunci format wajib <code>.pdf</code>. PDF menjamin 100% apa yang dilihat di HP sama persis dengan yang keluar dari mesin printer.
                  </div>
                </div>
              </div>
            </div>

            {/* Risk 4 */}
            <div className="p-4 rounded-2xl border border-slate-200 hover:border-slate-300 transition bg-white space-y-2">
              <div className="flex items-start space-x-2.5">
                <span className="p-1.5 rounded-lg bg-indigo-100 text-indigo-600 shrink-0 mt-0.5">
                  <ShieldCheck className="w-4 h-4" />
                </span>
                <div>
                  <h4 className="font-bold text-xs text-slate-900">
                    Masalah: Kekhawatiran Plagiarisme & Keamanan Skripsi
                  </h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Mahasiswa khawatir naskah skripsi yang belum disidangkan dicuri atau diperjualbelikan.
                  </p>
                  <div className="mt-2 text-[11px] text-emerald-800 bg-emerald-50 p-2 rounded-lg border border-emerald-200">
                    <strong>Solusi LapakPrint:</strong> Auto-Purge Policy (24 Jam). File otomatis dihapus permanen dari server cloud dan cache PC kasir segera setelah status "Completed".
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="py-2.5 px-6 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition"
          >
            Tutup Panel Analisis
          </button>
        </div>

      </div>
    </div>
  );
}
