import React, { useState } from 'react';
import { QrCode, CheckCircle2, ShieldCheck, X, AlertCircle } from 'lucide-react';

export default function QRISModal({ isOpen, onClose, orderDetails, onPaymentSuccess }) {
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen || !orderDetails) return null;

  const handleSimulatePay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onPaymentSuccess(orderDetails);
    }, 1200);
  };

  const total = orderDetails.pricing?.total || 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-5">
          <div className="inline-flex p-3 rounded-2xl bg-blue-50 text-blue-600 mb-2">
            <QrCode className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-800">Pembayaran Cepat QRIS</h3>
          <p className="text-xs text-slate-500">Scan dengan BCA, GoPay, OVO, LapakPay, atau Bank apa saja</p>
        </div>

        {/* Amount Box */}
        <div className="bg-slate-50 rounded-xl p-4 mb-4 border border-slate-200/80 text-center">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Tagihan</span>
          <div className="text-2xl font-black text-blue-700 mt-1">
            Rp {total.toLocaleString('id-ID')}
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">
            Order ID: <span className="font-mono font-semibold text-slate-600">{orderDetails.id}</span>
          </div>
        </div>

        {/* QR Simulation Box */}
        <div className="relative border-2 border-dashed border-slate-300 rounded-2xl p-5 flex flex-col items-center justify-center bg-white mb-5">
          <div className="w-48 h-48 bg-slate-900 rounded-xl flex items-center justify-center p-3 shadow-inner relative overflow-hidden group">
            {/* Mock QR Pattern */}
            <div className="w-full h-full bg-white p-2 rounded-lg flex flex-col justify-between">
              <div className="flex justify-between">
                <div className="w-10 h-10 border-4 border-slate-900 rounded-sm p-1">
                  <div className="w-full h-full bg-slate-900 rounded-xs"></div>
                </div>
                <div className="w-10 h-10 border-4 border-slate-900 rounded-sm p-1">
                  <div className="w-full h-full bg-slate-900 rounded-xs"></div>
                </div>
              </div>
              <div className="flex items-center justify-center font-mono text-[9px] text-slate-400">
                LAPAKPRINT-QRIS-MOCK
              </div>
              <div className="flex justify-between">
                <div className="w-10 h-10 border-4 border-slate-900 rounded-sm p-1">
                  <div className="w-full h-full bg-slate-900 rounded-xs"></div>
                </div>
                <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white text-[10px] font-bold">
                  LP
                </div>
              </div>
            </div>

            {/* Subtle scan line animation */}
            <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent top-0 animate-bounce opacity-70"></div>
          </div>

          <div className="flex items-center space-x-1.5 mt-3 text-xs text-slate-500 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Escrow Terproteksi - Dana diteruskan saat cetak selesai</span>
          </div>
        </div>

        {/* Action Button for Simulation */}
        <div className="space-y-2">
          <button
            onClick={handleSimulatePay}
            disabled={isProcessing}
            className="w-full py-3 px-4 rounded-xl font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 active:scale-[0.99] transition shadow-lg shadow-blue-500/25 flex items-center justify-center space-x-2 disabled:opacity-50"
          >
            {isProcessing ? (
              <span className="flex items-center space-x-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                <span>Memverifikasi Pembayaran...</span>
              </span>
            ) : (
              <>
                <CheckCircle2 className="w-5 h-5 text-emerald-300" />
                <span>Simulasikan Pembayaran Berhasil</span>
              </>
            )}
          </button>
          <p className="text-[11px] text-center text-slate-400">
            *Pada sistem nyata, status pembayaran terverifikasi otomatis dalam 2-3 detik via webhook Payment Gateway.
          </p>
        </div>
      </div>
    </div>
  );
}
