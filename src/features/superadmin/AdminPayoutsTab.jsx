import React from 'react';

export default function AdminPayoutsTab({ payouts, onApprovePayout }) {
  return (
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
                  onClick={() => onApprovePayout(p.id)}
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
  );
}
