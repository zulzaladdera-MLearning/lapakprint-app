import React from 'react';

export default function AdminDisputesTab({ disputes, onResolveDispute }) {
  return (
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
                  onClick={() => onResolveDispute(d.id, 'refunded')}
                  className="py-2 px-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs transition"
                >
                  Setujui Refund Rp {d.amount.toLocaleString('id-ID')} ke Mahasiswa
                </button>
                <button
                  onClick={() => onResolveDispute(d.id, 'reprinted')}
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
  );
}
