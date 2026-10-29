import React from 'react';

export default function AdminMerchantsTab({ partners, onToggleStoreStatus }) {
  return (
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
                onClick={() => onToggleStoreStatus(partner.id)}
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
  );
}
