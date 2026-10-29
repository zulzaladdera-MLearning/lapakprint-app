import React, { useState } from 'react';
import { Check } from 'lucide-react';

export default function ProductReviewsFeed({ currentProduct }) {
  const [activeReviewTab, setActiveReviewTab] = useState('all');
  const reviews = currentProduct.reviews || [];
  const filteredReviews = activeReviewTab === '5star' 
    ? reviews.filter(r => r.rating === 5)
    : reviews;

  return (
    <div className="bg-white rounded-xs p-5 sm:p-6 shadow-2xs border border-slate-200/80 space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
        <div>
          <h3 className="text-sm sm:text-base font-extrabold text-slate-900">
            PENILAIAN PRODUK DARI MAHASISWA
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Ulasan asli dari rekan mahasiswa yang telah menyelesaikan pesanan di toko ini
          </p>
        </div>

        <div className="flex items-center space-x-2 bg-amber-50 p-3 rounded-xs border border-amber-200">
          <span className="text-2xl font-black text-amber-600">{currentProduct.rating}</span>
          <div>
            <div className="flex text-amber-400 text-xs">★★★★★</div>
            <span className="text-[10px] text-amber-700 font-semibold">{currentProduct.reviewsCount} Mahasiswa Puas</span>
          </div>
        </div>
      </div>

      {/* Review Filter Tabs */}
      <div className="flex flex-wrap gap-2 text-xs font-bold">
        <button
          onClick={() => setActiveReviewTab('all')}
          className={`px-3 py-1.5 rounded-xs transition ${
            activeReviewTab === 'all'
              ? 'bg-sky-500 text-white shadow-2xs'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          Semua ({reviews.length})
        </button>
        <button
          onClick={() => setActiveReviewTab('5star')}
          className={`px-3 py-1.5 rounded-xs transition ${
            activeReviewTab === '5star'
              ? 'bg-sky-500 text-white shadow-2xs'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          Bintang 5 ({reviews.length})
        </button>
      </div>

      {/* Reviews List */}
      <div className="divide-y divide-slate-100 space-y-4 pt-2">
        {filteredReviews.map((rev) => (
          <div key={rev.id} className="pt-4 flex items-start space-x-3.5 text-xs">
            <span className="w-9 h-9 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center font-bold text-sm shrink-0 border border-sky-200">
              {rev.avatar}
            </span>
            <div className="space-y-1 flex-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900">{rev.userName}</span>
                <span className="text-[10px] text-slate-400">{rev.date}</span>
              </div>
              <div className="flex text-amber-400 text-xs">★★★★★</div>
              <div className="text-[10px] text-slate-400">
                Variasi: <span className="text-slate-600">{rev.variant}</span>
              </div>
              <p className="text-slate-700 leading-relaxed pt-1">
                {rev.content}
              </p>
              <div className="pt-1 flex items-center gap-1 text-[10px] text-emerald-600 font-semibold">
                <Check className="w-3 h-3" />
                <span>Pesanan Terverifikasi Selesai via 4-Digit PIN</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
