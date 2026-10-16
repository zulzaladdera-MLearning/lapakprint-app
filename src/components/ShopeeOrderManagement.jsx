import React, { useState } from 'react';
import { 
  Store, Clock, FileText, CheckCircle2, ChevronRight, 
  MessageSquare, ShieldCheck, QrCode, AlertCircle, Sparkles, RefreshCcw 
} from 'lucide-react';

export default function ShopeeOrderManagement({ orders, onSelectOrder }) {
  const [activeTab, setActiveTab] = useState('all');

  const filteredOrders = orders.filter((o) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'processing') return o.status === 'pending' || o.status === 'printing' || o.status === 'binding';
    if (activeTab === 'ready') return o.status === 'ready';
    if (activeTab === 'completed') return o.status === 'completed';
    return true;
  });

  return (
    <div className="bg-slate-50 min-h-[calc(100vh-8rem)] py-4 sm:py-6 pb-24 md:pb-6">
      <div className="max-w-5xl mx-auto px-3 sm:px-6 lg:px-8 space-y-3 sm:space-y-4">
        
        {/* Shopee-style Status Tabs */}
        <div className="bg-white rounded-2xl shadow-xs border border-slate-200 overflow-x-auto">
          <div className="flex border-b border-slate-100 min-w-max text-xs font-bold text-slate-600">
            <button
              onClick={() => setActiveTab('all')}
              className={`py-3.5 px-6 border-b-2 transition ${
                activeTab === 'all'
                  ? 'border-sky-500 text-sky-600'
                  : 'border-transparent hover:text-slate-900'
              }`}
            >
              Semua Pesanan ({orders.length})
            </button>
            <button
              onClick={() => setActiveTab('processing')}
              className={`py-3.5 px-6 border-b-2 transition ${
                activeTab === 'processing'
                  ? 'border-sky-500 text-sky-600'
                  : 'border-transparent hover:text-slate-900'
              }`}
            >
              Sedang Diproses ({orders.filter(o => o.status === 'pending' || o.status === 'printing' || o.status === 'binding').length})
            </button>
            <button
              onClick={() => setActiveTab('ready')}
              className={`py-3.5 px-6 border-b-2 transition ${
                activeTab === 'ready'
                  ? 'border-sky-500 text-sky-600'
                  : 'border-transparent hover:text-slate-900'
              }`}
            >
              Siap Diambil / Diantar ({orders.filter(o => o.status === 'ready').length})
            </button>
            <button
              onClick={() => setActiveTab('completed')}
              className={`py-3.5 px-6 border-b-2 transition ${
                activeTab === 'completed'
                  ? 'border-sky-500 text-sky-600'
                  : 'border-transparent hover:text-slate-900'
              }`}
            >
              Selesai ({orders.filter(o => o.status === 'completed').length})
            </button>
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.map((order) => {
            const isReady = order.status === 'ready';
            const isCompleted = order.status === 'completed';
            const isProcessing = order.status === 'pending' || order.status === 'printing' || order.status === 'binding';

            return (
              <div 
                key={order.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden"
              >
                {/* Store Header */}
                <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-slate-50/50">
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] font-extrabold bg-sky-100 text-sky-700 px-2 py-0.5 rounded">
                      MITRA RESMI
                    </span>
                    <Store className="w-4 h-4 text-sky-600" />
                    <span className="font-extrabold text-xs text-slate-800">
                      {order.vendorName}
                    </span>
                    <span className="text-slate-300">|</span>
                    <span className="text-xs font-mono text-slate-500">#{order.id}</span>
                  </div>

                  {/* Status Badge */}
                  <div className="flex items-center space-x-2">
                    {order.status === 'pending' && (
                      <span className="text-xs font-bold text-amber-600 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> Menunggu Operator Cetak
                      </span>
                    )}
                    {order.status === 'printing' && (
                      <span className="text-xs font-bold text-sky-600 flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-sky-500 animate-ping"></span>
                        Sedang Dicetak Mesin
                      </span>
                    )}
                    {order.status === 'binding' && (
                      <span className="text-xs font-bold text-indigo-600 flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-indigo-500 animate-ping"></span>
                        Proses Finishing Jilid
                      </span>
                    )}
                    {isReady && (
                      <span className="text-xs font-extrabold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 flex items-center gap-1 animate-pulse">
                        🎉 Dokumen Siap Diambil!
                      </span>
                    )}
                    {isCompleted && (
                      <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-slate-400" /> Pesanan Selesai
                      </span>
                    )}
                  </div>
                </div>

                {/* Item Details */}
                <div className="p-4 sm:p-5 flex flex-col md:flex-row justify-between gap-4">
                  <div className="flex items-start space-x-3.5 flex-1">
                    <div className="w-14 h-14 rounded-2xl bg-sky-100 text-sky-600 flex items-center justify-center shrink-0 border border-sky-200 shadow-xs">
                      <FileText className="w-7 h-7" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-extrabold text-sm text-slate-900 leading-snug">
                        {order.docName}
                      </h4>
                      <p className="text-xs text-slate-600">
                        {order.pages} Halaman • {order.paperType} • {order.bindingType} ({order.bindingColor})
                      </p>
                      <p className="text-[11px] text-slate-500">
                        Jumlah: <strong className="text-slate-800">{order.copies} Rangkap</strong> • Metode: <strong className="text-slate-800">{order.deliveryMethod === 'pickup' ? 'Ambil di Toko' : 'Kurir Kampus'}</strong>
                      </p>
                      {order.notes && (
                        <p className="text-[11px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded inline-block">
                          Catatan: "{order.notes}"
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Security PIN for Pickup */}
                  {isReady && (
                    <div className="bg-gradient-to-br from-emerald-50 to-sky-50 border-2 border-emerald-300 rounded-2xl p-4 flex flex-col items-center justify-center text-center shrink-0 min-w-[200px]">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                        PIN Serah Terima Kasir
                      </span>
                      <div className="text-2xl font-black font-mono tracking-widest text-emerald-900 mt-1 bg-white px-3 py-1 rounded-xl shadow-xs border border-emerald-200">
                        {order.pickupPin}
                      </div>
                      <span className="text-[10px] text-slate-500 mt-1.5">
                        Tunjukkan PIN ini saat mengambil di toko
                      </span>
                    </div>
                  )}

                  {/* Total Price */}
                  <div className="text-right shrink-0 flex flex-col justify-center">
                    <span className="text-[11px] text-slate-400">Total Pembayaran (Lunas)</span>
                    <div className="text-lg font-black text-sky-600">
                      Rp {order.pricing?.total?.toLocaleString('id-ID')}
                    </div>
                  </div>
                </div>

                {/* Timeline Progress */}
                <div className="px-4 pb-3">
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden flex">
                    <div 
                      className={`h-full bg-sky-500 transition-all duration-500 ${
                        order.status === 'pending' ? 'w-1/4' :
                        order.status === 'printing' ? 'w-2/4' :
                        order.status === 'binding' ? 'w-3/4' :
                        'w-full'
                      }`}
                    ></div>
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-medium">
                    <span>1. Diterima</span>
                    <span>2. Sedang Cetak</span>
                    <span>3. Penjilidan</span>
                    <span>4. Siap Diambil</span>
                  </div>
                </div>

                {/* Order Footer & Actions */}
                <div className="p-3.5 bg-slate-50/80 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                  <div className="text-xs text-slate-500">
                    Waktu Pesan: {order.createdAt}
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => alert(`Chat WhatsApp Mitra (${order.vendorName}):\n"Halo, saya pemesan dokumen #${order.id} atas nama Budi Santoso."`)}
                      className="py-1.5 px-3 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-white flex items-center space-x-1"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-sky-600" />
                      <span>Chat Penjual</span>
                    </button>
                    
                    {isCompleted && (
                      <button
                        onClick={() => alert("Terima kasih! Ulasan bintang 5 Anda telah disimpan.")}
                        className="py-1.5 px-3 rounded-xl bg-sky-500 hover:bg-sky-600 text-xs font-bold text-white shadow-xs"
                      >
                        Beri Nilai ⭐
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {filteredOrders.length === 0 && (
            <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 text-slate-400">
              <FileText className="w-12 h-12 mx-auto text-slate-300 mb-2" />
              <p className="text-sm font-semibold text-slate-700">Belum ada pesanan di kategori ini</p>
              <p className="text-xs text-slate-400 mt-1">Pilih mitra percetakan dan mulai order draf Anda</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
