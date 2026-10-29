import React, { useState } from 'react';
import { Check, Plus, Minus, ShoppingCart, Zap } from 'lucide-react';

export default function ProductPricingCheckout({
  currentProduct,
  partner,
  onStartOrder,
  onAddToCart
}) {
  const [selectedVariations, setSelectedVariations] = useState(() => {
    const initial = {};
    if (currentProduct.variations) {
      currentProduct.variations.forEach(v => {
        initial[v.key] = v.options[0]?.label || '';
      });
    }
    return initial;
  });

  const [quantity, setQuantity] = useState(1);
  const [claimedVoucher, setClaimedVoucher] = useState(false);

  // Dynamic price
  let pricePerItem = currentProduct.price;
  if (currentProduct.variations) {
    currentProduct.variations.forEach(v => {
      const selectedOption = v.options.find(opt => opt.label === selectedVariations[v.key]);
      if (selectedOption && selectedOption.priceAdd) {
        pricePerItem += selectedOption.priceAdd;
      }
    });
  }
  const totalPrice = pricePerItem * quantity;

  const handleSelectVariation = (key, label) => {
    setSelectedVariations(prev => ({ ...prev, [key]: label }));
  };

  return (
    <div className="lg:col-span-7 space-y-4">
      {/* Product Title */}
      <div>
        <div className="flex items-center gap-2 mb-1.5">
          <span className="bg-sky-600 text-white font-extrabold text-[10px] px-2 py-0.5 rounded-2xs">
            {currentProduct.badge} Official
          </span>
          <span className="text-xs text-sky-600 font-semibold">{currentProduct.category}</span>
        </div>
        <h1 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
          {currentProduct.title}
        </h1>
      </div>

      {/* Rating, Penilaian & Terjual Row */}
      <div className="flex flex-wrap items-center gap-3 text-xs pb-3 border-b border-slate-100">
        <div className="flex items-center space-x-1 text-amber-500 font-bold border-b border-amber-500 pb-0.5">
          <span>{currentProduct.rating}</span>
          <div className="flex text-amber-400">★★★★★</div>
        </div>
        <span className="text-slate-300">|</span>
        <span className="text-slate-600 font-medium">{currentProduct.reviewsCount} Penilaian</span>
        <span className="text-slate-300">|</span>
        <span className="text-slate-600 font-medium">{currentProduct.sold} Terjual</span>
        <span className="text-slate-300">|</span>
        <span className="text-sky-600 font-semibold cursor-pointer hover:underline">
          Laporkan Dokumen
        </span>
      </div>

      {/* Price Box */}
      <div className="bg-sky-50/70 p-4 rounded-xs border border-sky-100 flex flex-wrap items-center gap-3">
        <span className="text-xs text-slate-400 line-through">
          Rp {currentProduct.originalPrice.toLocaleString('id-ID')}
        </span>
        <div className="text-2xl sm:text-3xl font-black text-sky-600 tracking-tight">
          Rp {pricePerItem.toLocaleString('id-ID')}
        </div>
        <span className="bg-yellow-400 text-slate-950 font-black text-xs px-1.5 py-0.5 rounded-2xs">
          {currentProduct.discount} OFF
        </span>
        <span className="bg-sky-100 text-sky-700 font-bold text-[10px] px-2 py-0.5 rounded-full border border-sky-200">
          HARGA MAHASISWA TERMURAH
        </span>
      </div>

      {/* Voucher Toko Klaim */}
      <div className="flex items-center space-x-3 text-xs">
        <span className="text-slate-500 w-24 shrink-0 font-medium">Voucher Toko</span>
        <div className="flex flex-wrap items-center gap-2">
          <div className="border border-sky-300 bg-sky-50 px-2.5 py-1 rounded-2xs text-[11px] font-bold text-sky-700 flex items-center gap-1.5">
            <span>Diskon Rp 5.000 (Min. Rp 30rb)</span>
          </div>
          <button
            onClick={() => setClaimedVoucher(!claimedVoucher)}
            className={`px-3 py-1 text-xs font-bold rounded-2xs transition ${
              claimedVoucher 
                ? 'bg-slate-200 text-slate-500 cursor-default' 
                : 'bg-sky-500 hover:bg-sky-600 text-white shadow-2xs'
            }`}
          >
            {claimedVoucher ? 'Terklaim' : 'Klaim'}
          </button>
        </div>
      </div>

      {/* Metode Serah Terima / Pengiriman */}
      <div className="flex items-start space-x-3 text-xs pt-2">
        <span className="text-slate-500 w-24 shrink-0 font-medium mt-1">Pengambilan</span>
        <div className="space-y-1.5 text-slate-700">
          <div className="flex items-center gap-2">
            <span className="font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 text-[10px]">
              GRATIS
            </span>
            <span className="font-semibold">Ambil Sendiri di Kasir Toko</span>
            <span className="text-slate-400">(Tunjukkan 4-Digit Security PIN)</span>
          </div>
          <div className="flex items-center gap-2 text-slate-500 text-[11px]">
            <span className="font-medium">Opsi Kurir Kampus: +Rp 5.000</span>
            <span>(Antar ke depan pintu kosan radius 1.5 km)</span>
          </div>
        </div>
      </div>

      {/* Dynamic Interactive Variations */}
      {currentProduct.variations?.map((variation) => (
        <div key={variation.key} className="flex flex-col sm:flex-row sm:items-center space-y-1.5 sm:space-y-0 sm:space-x-3 text-xs pt-2">
          <span className="text-slate-500 w-24 shrink-0 font-medium">
            {variation.name}
          </span>
          <div className="flex flex-wrap gap-2">
            {variation.options.map((option) => {
              const isSelected = selectedVariations[variation.key] === option.label;
              return (
                <button
                  key={option.label}
                  type="button"
                  onClick={() => handleSelectVariation(variation.key, option.label)}
                  className={`px-3 py-1.5 rounded-xs border text-xs font-medium transition flex items-center space-x-1.5 ${
                    isSelected
                      ? 'border-sky-500 bg-sky-50 text-sky-700 ring-1 ring-sky-400 font-bold'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                  }`}
                >
                  {isSelected && <Check className="w-3.5 h-3.5 text-sky-600" />}
                  <span>{option.label}</span>
                  {option.priceAdd > 0 && (
                    <span className="text-[10px] text-sky-600 font-bold">(+Rp {option.priceAdd.toLocaleString('id-ID')})</span>
                  )}
                  {option.priceAdd < 0 && (
                    <span className="text-[10px] text-emerald-600 font-bold">(-Rp {Math.abs(option.priceAdd).toLocaleString('id-ID')})</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      {/* Quantity Counter */}
      <div className="flex items-center space-x-3 text-xs pt-3">
        <span className="text-slate-500 w-24 shrink-0 font-medium">Kuantitas</span>
        <div className="flex items-center space-x-3">
          <div className="flex items-center border border-slate-300 rounded-xs bg-white">
            <button
              onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
              className="p-1.5 text-slate-600 hover:bg-slate-100 transition focus:outline-none"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="w-10 text-center font-bold text-slate-800 text-xs">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(prev => Math.min(currentProduct.stock, prev + 1))}
              className="p-1.5 text-slate-600 hover:bg-slate-100 transition focus:outline-none"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
          <span className="text-slate-400 text-[11px]">
            Tersisa {currentProduct.stock} slot antrean mesin
          </span>
        </div>
      </div>

      {/* Subtotal Preview */}
      <div className="pt-2 flex items-baseline justify-between border-t border-slate-100 text-xs">
        <span className="text-slate-500 font-medium">Subtotal Pesanan:</span>
        <div className="text-xl font-black text-sky-600">
          Rp {totalPrice.toLocaleString('id-ID')}
        </div>
      </div>

      {/* Action Buttons: Keranjang & Pesan Sekarang */}
      <div className="pt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => {
            if (onAddToCart) onAddToCart(currentProduct, quantity);
            alert(`Dokumen "${currentProduct.title}" (${quantity} rangkap) berhasil dimasukkan ke keranjang belanja.`);
          }}
          className="py-3 px-4 rounded-xs border-2 border-sky-500 text-sky-600 hover:bg-sky-50 font-bold text-xs flex items-center justify-center space-x-2 transition shadow-2xs"
        >
          <ShoppingCart className="w-4 h-4" />
          <span>Masukkan Keranjang</span>
        </button>

        <button
          type="button"
          onClick={() => onStartOrder(partner)}
          className="py-3 px-6 rounded-xs bg-sky-500 hover:bg-sky-600 text-white font-extrabold text-xs flex items-center justify-center space-x-2 transition shadow-xs"
        >
          <Zap className="w-4 h-4 fill-white" />
          <span>Beli Sekarang & Upload PDF</span>
        </button>
      </div>
    </div>
  );
}
