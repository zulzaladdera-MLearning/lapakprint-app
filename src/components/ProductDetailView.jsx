import React, { useState } from 'react';
import { 
  ArrowLeft, Star, ShieldCheck, Clock, MapPin, 
  Share2, Heart, Check, Plus, Minus, ShoppingCart, 
  Zap, MessageCircle, Store, Award, FileText, ChevronRight, Copy
} from 'lucide-react';
import { MOCK_PARTNERS } from '../data/mockData';
import { DETAILED_PRODUCTS } from '../data/productDetails';

export default function ProductDetailView({ 
  product, 
  onBack, 
  onStartOrder, 
  onSelectProduct,
  onAddToCart 
}) {
  const currentProduct = product || DETAILED_PRODUCTS[0];
  const partner = MOCK_PARTNERS.find(p => p.id === currentProduct.partnerId) || MOCK_PARTNERS[0];

  // State for active preview image index
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // State for selected variations
  const [selectedVariations, setSelectedVariations] = useState(() => {
    const initial = {};
    if (currentProduct.variations) {
      currentProduct.variations.forEach(v => {
        initial[v.key] = v.options[0]?.label || '';
      });
    }
    return initial;
  });

  // State for quantity
  const [quantity, setQuantity] = useState(1);

  // State for interactive actions
  const [isFavorited, setIsFavorited] = useState(false);
  const [favoritesCount, setFavoritesCount] = useState(148);
  const [isCopied, setIsCopied] = useState(false);
  const [claimedVoucher, setClaimedVoucher] = useState(false);
  const [activeReviewTab, setActiveReviewTab] = useState('all');

  // Calculate dynamic price based on selected variation adjustments
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

  // Handle variation toggle
  const handleSelectVariation = (key, label) => {
    setSelectedVariations(prev => ({ ...prev, [key]: label }));
  };

  // Handle share copy link
  const handleCopyLink = () => {
    setIsCopied(true);
    navigator.clipboard?.writeText(window.location.href);
    setTimeout(() => setIsCopied(false), 2500);
  };

  // Handle toggle favorite
  const handleToggleFavorite = () => {
    if (isFavorited) {
      setIsFavorited(false);
      setFavoritesCount(prev => prev - 1);
    } else {
      setIsFavorited(true);
      setFavoritesCount(prev => prev + 1);
    }
  };

  // Filter reviews
  const reviews = currentProduct.reviews || [];
  const filteredReviews = activeReviewTab === '5star' 
    ? reviews.filter(r => r.rating === 5)
    : reviews;

  // Related products
  const relatedProducts = DETAILED_PRODUCTS.filter(p => p.id !== currentProduct.id).slice(0, 4);

  return (
    <div className="bg-[#f5f5f5] min-h-[calc(100vh-8rem)] py-3 sm:py-4 pb-24 md:pb-6 font-['Plus_Jakarta_Sans',sans-serif]">
      <div className="max-w-6xl mx-auto px-3 sm:px-6 space-y-3 sm:space-y-4">
        
        {/* 1. SHOPEE BREADCRUMB */}
        <div className="flex items-center space-x-2 text-xs text-slate-500 overflow-x-auto whitespace-nowrap py-1">
          <button 
            onClick={onBack} 
            className="hover:text-sky-600 font-bold flex items-center gap-1 transition shrink-0"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Beranda</span>
          </button>
          <span>/</span>
          <span className="hover:text-sky-600 cursor-pointer">{currentProduct.category}</span>
          <span>/</span>
          <span className="text-slate-800 font-semibold truncate max-w-xs">{currentProduct.title}</span>
        </div>

        {/* 2. MAIN PRODUCT CONTAINER (PERSIS SHOPEE PDP) */}
        <div className="bg-white rounded-lg sm:rounded-xs shadow-2xs border border-slate-200/80 p-3.5 sm:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* SISI KIRI (5 COLS): GALERI FOTO & PILAR JAMINAN */}
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

            {/* SISI KANAN (7 COLS): INFORMASI DETAIL, VARIASI & CHECKOUT */}
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
                  <div className="flex text-amber-400">
                    {'★★★★★'}
                  </div>
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

              {/* Shopee Light Blue Price Box */}
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

          </div>
        </div>

        {/* 3. SHOPEE SELLER CARD (PROFIL TOKO MITRA) */}
        <div className="bg-white rounded-xs p-5 shadow-2xs border border-slate-200/80 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <span className="text-4xl p-3 bg-sky-50 rounded-lg border border-sky-100 shrink-0">
              {partner.avatar || '🏪'}
            </span>
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <h3 className="font-extrabold text-sm sm:text-base text-slate-900">
                  {partner.name}
                </h3>
                <span className="text-[10px] font-bold bg-amber-400 text-slate-900 px-1.5 py-0.2 rounded">
                  {partner.badge}
                </span>
              </div>
              <p className="text-xs text-slate-500 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-red-500" />
                <span>{partner.distance}</span>
              </p>
              <div className="flex items-center space-x-2 pt-1">
                <button
                  onClick={() => onStartOrder(partner)}
                  className="py-1 px-3 bg-sky-500 text-white font-bold text-xs rounded-2xs hover:bg-sky-600 transition flex items-center gap-1"
                >
                  <Store className="w-3.5 h-3.5" />
                  <span>Kunjungi Toko</span>
                </button>
                <button
                  onClick={() => alert(`Chat WhatsApp dengan kasir ${partner.name}: Hubungi operator kami untuk konsultasi layout dokumen.`)}
                  className="py-1 px-3 border border-slate-300 text-slate-700 font-bold text-xs rounded-2xs hover:bg-slate-50 transition flex items-center gap-1"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Chat Operator</span>
                </button>
              </div>
            </div>
          </div>

          {/* Seller Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-slate-600 border-t md:border-t-0 md:border-l border-slate-100 pt-3 md:pt-0 md:pl-6">
            <div>
              <span className="text-[11px] text-slate-400 block">Penilaian Toko</span>
              <span className="font-bold text-sky-600 text-sm">⭐ {partner.rating}</span>
            </div>
            <div>
              <span className="text-[11px] text-slate-400 block">Total Pesanan</span>
              <span className="font-bold text-slate-900 text-sm">{partner.soldCount}</span>
            </div>
            <div>
              <span className="text-[11px] text-slate-400 block">Waktu Antrean</span>
              <span className="font-bold text-emerald-600 text-sm">{partner.queueTime}</span>
            </div>
            <div>
              <span className="text-[11px] text-slate-400 block">Status Toko</span>
              <span className="font-bold text-emerald-600 text-sm">● Buka Sekarang</span>
            </div>
          </div>
        </div>

        {/* 4. SPESIFIKASI & DESKRIPSI PRODUK */}
        <div className="bg-white rounded-xs p-5 sm:p-6 shadow-2xs border border-slate-200/80 space-y-6">
          {/* Spesifikasi Teknis */}
          <div>
            <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider bg-slate-50 p-2.5 rounded-xs border border-slate-200/60 mb-4">
              SPESIFIKASI PRODUK PERCETAKAN
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2.5 gap-x-6 text-xs divide-y md:divide-y-0 divide-slate-100">
              {Object.entries(currentProduct.specs || {}).map(([key, value]) => (
                <div key={key} className="flex py-1.5">
                  <span className="text-slate-400 w-44 shrink-0 font-medium">{key}</span>
                  <span className="text-slate-800 font-semibold">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Deskripsi Lengkap */}
          <div className="pt-4 border-t border-slate-100">
            <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider bg-slate-50 p-2.5 rounded-xs border border-slate-200/60 mb-4">
              DESKRIPSI LENGKAP LAYANAN
            </h3>
            <div className="text-xs text-slate-600 leading-relaxed whitespace-pre-line space-y-2">
              {currentProduct.description}
            </div>
          </div>
        </div>

        {/* 5. ULASAN & TESTIMONI MAHASISWA (REVIEWS FEED) */}
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

        {/* 6. PRODUK TERKAIT / REKOMENDASI SERUPA */}
        <div className="bg-white rounded-xs p-5 shadow-2xs border border-slate-200/80 space-y-3">
          <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider">
            LAYANAN LAIN DARI PERCETAKAN INI
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {relatedProducts.map((rel) => (
              <div
                key={rel.id}
                onClick={() => {
                  if (onSelectProduct) onSelectProduct(rel);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="p-3 border border-slate-200 rounded-xs hover:border-sky-500 hover:shadow-xs transition cursor-pointer flex flex-col justify-between group"
              >
                <div className="text-center py-2">
                  <span className="text-3xl group-hover:scale-110 transition duration-200 inline-block">
                    {rel.thumbnail}
                  </span>
                  <h4 className="font-bold text-xs text-slate-800 line-clamp-2 mt-2 group-hover:text-sky-600">
                    {rel.title}
                  </h4>
                </div>
                <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="font-black text-sky-600">
                    Rp {rel.price.toLocaleString('id-ID')}
                  </span>
                  <span className="text-[10px] text-slate-400">
                    {rel.sold} Terjual
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
