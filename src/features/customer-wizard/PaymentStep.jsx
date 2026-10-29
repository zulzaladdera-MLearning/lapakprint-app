import React from 'react';
import { Store, Bike, Shield, ArrowRight } from 'lucide-react';

export default function PaymentStep({
  currentPartner,
  deliveryMethod,
  setDeliveryMethod,
  deliveryAddress,
  setDeliveryAddress,
  copies,
  bwPages,
  colorPages,
  totalPrintCost,
  bindingType,
  totalBindingCost,
  deliveryCost,
  platformFee,
  grandTotal,
  onBack,
  onCheckout
}) {
  return (
    <div className="space-y-5">
      {/* Opsi Pengambilan / Pengantaran */}
      <div>
        <h4 className="font-bold text-xs text-slate-700 uppercase tracking-wider mb-2">
          Metode Pengambilan
        </h4>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setDeliveryMethod('pickup')}
            className={`p-3.5 rounded-xl border text-left transition ${
              deliveryMethod === 'pickup'
                ? 'border-blue-600 bg-blue-50/50 ring-2 ring-blue-500/20'
                : 'border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="flex items-center space-x-2 mb-1">
              <Store className="w-4 h-4 text-blue-600" />
              <span className="text-xs font-bold text-slate-800">Ambil Sendiri</span>
            </div>
            <p className="text-[10px] text-slate-500">
              Datang ke {currentPartner.name} setelah notif selesai
            </p>
            <span className="inline-block mt-2 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
              Gratis Ongkir
            </span>
          </button>

          <button
            type="button"
            onClick={() => setDeliveryMethod('courier')}
            className={`p-3.5 rounded-xl border text-left transition ${
              deliveryMethod === 'courier'
                ? 'border-blue-600 bg-blue-50/50 ring-2 ring-blue-500/20'
                : 'border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="flex items-center space-x-2 mb-1">
              <Bike className="w-4 h-4 text-blue-600" />
              <span className="text-xs font-bold text-slate-800">Diantar Kurir</span>
            </div>
            <p className="text-[10px] text-slate-500">
              Kurir mahasiswa antar langsung ke kosan/kampus
            </p>
            <span className="inline-block mt-2 text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
              +Rp 5.000
            </span>
          </button>
        </div>

        {deliveryMethod === 'courier' && (
          <div className="mt-3 p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <label className="text-xs font-semibold text-slate-700 block">
              Alamat Pengantaran (Radius Kampus):
            </label>
            <input
              type="text"
              value={deliveryAddress}
              onChange={(e) => setDeliveryAddress(e.target.value)}
              className="w-full text-xs p-2 rounded-lg border border-slate-300 focus:outline-none focus:border-blue-500"
            />
          </div>
        )}
      </div>

      {/* Ringkasan Biaya Realtime (Cost Breakdown) */}
      <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 space-y-2.5">
        <h4 className="font-bold text-xs text-slate-800 uppercase tracking-wider mb-2 flex items-center justify-between">
          <span>Rincian Transparansi Biaya</span>
          <span className="text-[10px] font-normal text-slate-500">Tanpa Biaya Tersembunyi</span>
        </h4>

        <div className="flex justify-between text-xs text-slate-600">
          <span>
            Cetak {copies} rangkap × ({bwPages} hlm BW + {colorPages} hlm Warna)
          </span>
          <span className="font-medium text-slate-900">
            Rp {totalPrintCost.toLocaleString('id-ID')}
          </span>
        </div>

        <div className="flex justify-between text-xs text-slate-600">
          <span>Penjilidan ({bindingType}) × {copies}</span>
          <span className="font-medium text-slate-900">
            Rp {totalBindingCost.toLocaleString('id-ID')}
          </span>
        </div>

        <div className="flex justify-between text-xs text-slate-600">
          <span>Ongkos Kirim ({deliveryMethod === 'pickup' ? 'Ambil Sendiri' : 'Kurir Mahasiswa'})</span>
          <span className="font-medium text-slate-900">
            {deliveryCost === 0 ? 'Rp 0' : `Rp ${deliveryCost.toLocaleString('id-ID')}`}
          </span>
        </div>

        <div className="flex justify-between text-xs text-slate-600">
          <span className="flex items-center gap-1">
            Biaya Layanan Platform
            <span title="Pemeliharaan server & jaminan garansi cetak ulang" className="cursor-help text-slate-400">ⓘ</span>
          </span>
          <span className="font-medium text-slate-900">
            Rp {platformFee.toLocaleString('id-ID')}
          </span>
        </div>

        <div className="border-t border-slate-200 pt-2.5 flex justify-between items-center text-sm font-bold">
          <span className="text-slate-800">Total Pembayaran</span>
          <span className="text-base font-black text-blue-700">
            Rp {grandTotal.toLocaleString('id-ID')}
          </span>
        </div>
      </div>

      {/* Legal / Risk Guarantee Check */}
      <div className="p-3 bg-amber-50 rounded-xl border border-amber-200/80 text-xs text-amber-800 flex items-start space-x-2.5">
        <Shield className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <p className="text-[11px] leading-relaxed">
          <strong>Jaminan LapakPrint:</strong> Dokumen dicetak sesuai file PDF yang diunggah. Jika terjadi kesalahan teknis dari mitra (tinta bergaris/halaman terbalik), Anda berhak meminta cetak ulang gratis.
        </p>
      </div>

      {/* Back / Pay Action */}
      <div className="flex space-x-3 pt-2">
        <button
          onClick={onBack}
          className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition text-xs"
        >
          Ubah Spek
        </button>
        <button
          onClick={onCheckout}
          className="flex-2 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl flex items-center justify-center space-x-2 transition shadow-lg shadow-blue-500/25 text-xs"
        >
          <span>Bayar Lunas via QRIS</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
