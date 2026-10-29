import React from 'react';

export default function AdminGeofencingTab({
  campusRadius,
  setCampusRadius,
  platformFee,
  setPlatformFee
}) {
  return (
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
  );
}
