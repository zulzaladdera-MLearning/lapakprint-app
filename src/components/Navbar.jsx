import React from 'react';
import { Printer, Smartphone, Store, SplitSquareVertical, BarChart3, RotateCcw, Sparkles } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, onOpenInsights, onResetData, orderCount }) {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Branding */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <Printer className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-900 bg-clip-text text-transparent">
                  LapakPrint
                </span>
                <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-blue-100 text-blue-700 rounded-full">
                  Interactive Prototype
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">
                Simulasi Alur Bisnis Nge-print & Jilid Skripsi
              </p>
            </div>
          </div>

          {/* View Mode Switcher */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => setActiveTab('dual')}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'dual'
                  ? 'bg-white text-blue-700 shadow-sm border border-slate-200/80'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Lihat kedua sisi berdampingan secara sinkron"
            >
              <SplitSquareVertical className="w-4 h-4 text-blue-600" />
              <span className="hidden md:inline">Dual View</span>
              <span className="md:hidden">Dual</span>
            </button>

            <button
              onClick={() => setActiveTab('customer')}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'customer'
                  ? 'bg-white text-blue-700 shadow-sm border border-slate-200/80'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Tampilan Aplikasi Mahasiswa"
            >
              <Smartphone className="w-4 h-4 text-emerald-600" />
              <span className="hidden md:inline">Mahasiswa</span>
              <span className="md:hidden">User</span>
            </button>

            <button
              onClick={() => setActiveTab('vendor')}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all relative ${
                activeTab === 'vendor'
                  ? 'bg-white text-blue-700 shadow-sm border border-slate-200/80'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Tampilan Dashboard Toko Fotokopi"
            >
              <Store className="w-4 h-4 text-amber-600" />
              <span className="hidden md:inline">Mitra Fotokopi</span>
              <span className="md:hidden">Toko</span>
              {orderCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center font-bold animate-pulse">
                  {orderCount}
                </span>
              )}
            </button>
          </div>

          {/* Action Tools */}
          <div className="flex items-center space-x-2">
            <button
              onClick={onOpenInsights}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition border border-indigo-200"
            >
              <BarChart3 className="w-4 h-4 text-indigo-600" />
              <span className="hidden sm:inline">Analisis & Masalah Bisnis</span>
              <span className="sm:hidden">Analisis</span>
            </button>

            <button
              onClick={onResetData}
              title="Reset data simulasi ke awal"
              className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
