import React from 'react';

export default function AdminOverviewTab({ totalGMV, totalPartnerCut, totalPlatformCut }) {
  return (
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
  );
}
