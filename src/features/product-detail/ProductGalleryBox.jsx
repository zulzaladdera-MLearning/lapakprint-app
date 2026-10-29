import React, { useState } from 'react';
import { Copy, Heart, ShieldCheck } from 'lucide-react';

export default function ProductGalleryBox({ currentProduct }) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);
  const [favoritesCount, setFavoritesCount] = useState(148);
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyLink = () => {
    setIsCopied(true);
    navigator.clipboard?.writeText(window.location.href);
    setTimeout(() => setIsCopied(false), 2500);
  };

  const handleToggleFavorite = () => {
    if (isFavorited) {
      setIsFavorited(false);
      setFavoritesCount(prev => prev - 1);
    } else {
      setIsFavorited(true);
      setFavoritesCount(prev => prev + 1);
    }
  };

  return (
    <div className="lg:col-span-5 space-y-4">
      {/* Primary Showcase Box */}
      <div className="relative bg-slate-50 aspect-square rounded-xs border border-slate-200 flex flex-col items-center justify-center p-6 overflow-hidden group">
        <span className="text-7xl group-hover:scale-110 transition duration-300 drop-shadow-md">
          {currentProduct.images?.[activeImageIndex]?.icon || currentProduct.thumbnail}
        </span>
        
        <p className="text-xs font-bold text-slate-700 mt-4 text-center">
          {currentProduct.images?.[activeImageIndex]?.label || currentProduct.title}
        </p>
        <span className="text-[10px] text-slate-400 text-center max-w-xs mt-0.5">
          {currentProduct.images?.[activeImageIndex]?.desc || 'Standar resmi percetakan kampus'}
        </span>

        {/* Badge Star+ in top left */}
        <div className="absolute top-3 left-3 bg-sky-600 text-white font-extrabold text-[10px] px-2 py-0.5 rounded-2xs shadow-2xs">
          {currentProduct.badge} Official
        </div>

        {/* Discount Badge in top right */}
        <div className="absolute top-0 right-0 bg-yellow-400 text-slate-900 font-black text-xs px-2 py-1 shadow-2xs">
          -{currentProduct.discount}
        </div>
      </div>

      {/* 4 Interactive Thumbnails */}
      <div className="grid grid-cols-4 gap-2">
        {currentProduct.images?.map((img, idx) => (
          <button
            key={img.id}
            onClick={() => setActiveImageIndex(idx)}
            className={`aspect-square rounded-xs border-2 flex flex-col items-center justify-center p-1.5 transition ${
              activeImageIndex === idx 
                ? 'border-sky-500 bg-sky-50/50 shadow-xs' 
                : 'border-slate-200 hover:border-slate-300 bg-white'
            }`}
          >
            <span className="text-xl">{img.icon}</span>
            <span className="text-[8px] font-bold text-slate-600 text-center truncate w-full mt-1">
              {img.label}
            </span>
          </button>
        ))}
      </div>

      {/* Social Share & Favorite Buttons */}
      <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs text-slate-500">
        <div className="flex items-center space-x-2">
          <span>Bagikan:</span>
          <button 
            onClick={handleCopyLink}
            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-600 flex items-center gap-1 transition"
            title="Salin Tautan"
          >
            <Copy className="w-3.5 h-3.5" />
            <span className="text-[10px]">{isCopied ? 'Tersalin!' : 'Salin Link'}</span>
          </button>
          <button 
            onClick={() => alert("Tautan dibagikan ke WhatsApp!")}
            className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] font-bold shadow-2xs"
          >
            WA
          </button>
        </div>

        <button
          onClick={handleToggleFavorite}
          className={`flex items-center space-x-1.5 transition font-medium ${
            isFavorited ? 'text-rose-600' : 'text-slate-500 hover:text-rose-500'
          }`}
        >
          <Heart className={`w-4 h-4 ${isFavorited ? 'fill-rose-500 text-rose-500' : ''}`} />
          <span>Favoritkan ({favoritesCount})</span>
        </button>
      </div>

      {/* 3 Keunggulan Garansi LapakPrint */}
      <div className="bg-sky-50/50 p-3 rounded-xs border border-sky-100 text-xs space-y-2">
        <div className="font-extrabold text-sky-900 flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-sky-600" />
          <span>Jaminan Keamanan Pesanan Mahasiswa</span>
        </div>
        <div className="space-y-1 text-[11px] text-slate-600 pl-5">
          <p>✓ Garansi 100% Cetak Ulang Gratis jika cacat tinta/jilid</p>
          <p>✓ File PDF dimusnahkan permanen dalam 24 jam</p>
          <p>✓ Ambil di kasir toko bebas antre via 4-Digit Security PIN</p>
        </div>
      </div>
    </div>
  );
}
