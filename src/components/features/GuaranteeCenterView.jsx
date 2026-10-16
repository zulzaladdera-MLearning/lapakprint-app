import React, { useState } from 'react';
import { ArrowLeft, ShieldCheck, AlertTriangle, CheckCircle2, FileText, Send } from 'lucide-react';

export default function GuaranteeCenterView({ onBack }) {
  const [orderId, setOrderId] = useState('LP-8901');
  const [complaintType, setComplaintType] = useState('cacat_tinta');
  const [description, setDescription] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      alert("Pengajuan Garansi Terkirim ke Super Admin! Status resolusi dan instruksi cetak ulang akan muncul di menu notifikasi dalam 15 menit.");
      setIsSubmitted(false);
      setDescription('');
    }, 1000);
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
          <span className="text-slate-800 font-semibold">Garansi Cetak Ulang & Keamanan</span>
        </div>

        {/* Hero Section */}
        <div className="bg-gradient-to-r from-emerald-600 to-sky-600 rounded-xs p-6 text-white shadow-xs">
          <div className="max-w-xl space-y-2">
            <div className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-white/20 text-[10px] font-bold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5 text-white" />
              <span>JAMINAN KEAMANAN & KEPUASAN MAHASISWA</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold leading-tight">
              4 Pilar Garansi Resmi LapakPrint
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100">
              Jangan khawatir hasil cetak cacat atau skripsi bocor. Sistem kami menjamin kepuasan 100% atau uang kembali.
            </p>
          </div>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-5 rounded-xs border border-slate-200 shadow-2xs space-y-2">
            <div className="flex items-center space-x-2 text-emerald-600 font-bold text-sm">
              <CheckCircle2 className="w-5 h-5 shrink-0" />
              <h4>1. Garansi Cetak Ulang 100% Gratis</h4>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed pl-7">
              Jika terjadi kesalahan teknis dari mesin toko (tinta bergaris, halaman terbalik, atau jilid miring), toko wajib mencetak ulang dokumen Anda tanpa dipungut biaya sepeser pun.
            </p>
          </div>

          <div className="bg-white p-5 rounded-xs border border-slate-200 shadow-2xs space-y-2">
            <div className="flex items-center space-x-2 text-sky-600 font-bold text-sm">
              <CheckCircle2 className="w-5 h-5 shrink-0" />
              <h4>2. Garansi Anti Margin Rusak (PDF Only)</h4>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed pl-7">
              Sistem LapakPrint mengunci format hanya menerima PDF. Apa yang Anda lihat di layar laptop/HP dijamin sama persis dengan yang keluar dari mesin printer.
            </p>
          </div>

          <div className="bg-white p-5 rounded-xs border border-slate-200 shadow-2xs space-y-2">
            <div className="flex items-center space-x-2 text-amber-600 font-bold text-sm">
              <CheckCircle2 className="w-5 h-5 shrink-0" />
              <h4>3. Garansi Dokumen Tidak Tertukar (PIN Security)</h4>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed pl-7">
              Dokumen skripsi Anda tidak akan bisa diambil orang lain karena kasir wajib mencocokkan 4-Digit Security PIN yang tertera di aplikasi HP Anda.
            </p>
          </div>

          <div className="bg-white p-5 rounded-xs border border-slate-200 shadow-2xs space-y-2">
            <div className="flex items-center space-x-2 text-purple-600 font-bold text-sm">
              <CheckCircle2 className="w-5 h-5 shrink-0" />
              <h4>4. Garansi Kerahasiaan (Auto-Purge 24 Jam)</h4>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed pl-7">
              File draf skripsi Anda otomatis dimusnahkan secara permanen dari server penyimpanan kami dalam 24 jam setelah status pesanan selesai.
            </p>
          </div>
        </div>

        {/* Claim Form Section */}
        <div className="bg-white rounded-xs p-5 sm:p-6 shadow-2xs border border-slate-200 space-y-4">
          <h3 className="font-extrabold text-sm sm:text-base text-slate-900">
            Formulir Klaim Garansi Cetak Ulang / Refund
          </h3>
          <p className="text-xs text-slate-500">
            Klaim Anda akan ditinjau langsung oleh Super Admin platform
          </p>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Pilih Nomor Pesanan:</label>
                <input
                  type="text"
                  required
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  placeholder="Contoh: LP-8901"
                  className="w-full p-2.5 rounded-xs border border-slate-300 focus:outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Jenis Kendala / Cacat Cetak:</label>
                <select
                  value={complaintType}
                  onChange={(e) => setComplaintType(e.target.value)}
                  className="w-full p-2.5 rounded-xs border border-slate-300 focus:outline-none focus:border-sky-500"
                >
                  <option value="cacat_tinta">Tinta Printer Bergaris / Pudar</option>
                  <option value="jilid_miring">Penjilidan Miring / Terpotong</option>
                  <option value="halaman_hilang">Ada Halaman Terlewat / Hilang</option>
                  <option value="lainnya">Lainnya</option>
                </select>
              </div>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Deskripsi Tambahan Kendala:</label>
              <textarea
                required
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Jelaskan nomor halaman yang cacat..."
                className="w-full p-2.5 rounded-xs border border-slate-300 focus:outline-none focus:border-sky-500"
              />
            </div>

            <button
              type="submit"
              className="py-3 px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xs shadow-2xs transition flex items-center space-x-1.5"
            >
              <Send className="w-4 h-4" />
              <span>Ajukan Klaim Garansi Sekarang</span>
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
