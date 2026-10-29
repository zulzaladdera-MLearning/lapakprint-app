import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { MOCK_PARTNERS } from '../data/mockData';
import { DETAILED_PRODUCTS } from '../data/productDetails';
import ProductGalleryBox from '../features/product-detail/ProductGalleryBox';
import ProductPricingCheckout from '../features/product-detail/ProductPricingCheckout';
import ProductSellerCard from '../features/product-detail/ProductSellerCard';
import ProductReviewsFeed from '../features/product-detail/ProductReviewsFeed';

export default function ProductDetailView({ 
  product, 
  onBack, 
  onStartOrder, 
  onSelectProduct,
  onAddToCart 
}) {
  const currentProduct = product || DETAILED_PRODUCTS[0];
  const partner = MOCK_PARTNERS.find(p => p.id === currentProduct.partnerId) || MOCK_PARTNERS[0];
  const relatedProducts = DETAILED_PRODUCTS.filter(p => p.id !== currentProduct.id).slice(0, 4);

  return (
    <div className="bg-[#f5f5f5] min-h-[calc(100vh-8rem)] py-3 sm:py-4 pb-24 md:pb-6 font-['Plus_Jakarta_Sans',sans-serif]">
      <div className="max-w-6xl mx-auto px-3 sm:px-6 space-y-3 sm:space-y-4">
        {/* 1. Shopee Breadcrumb */}
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

        {/* 2. Main Product Container: Gallery & Pricing Checkout */}
        <div className="bg-white rounded-lg sm:rounded-xs shadow-2xs border border-slate-200/80 p-3.5 sm:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <ProductGalleryBox currentProduct={currentProduct} />
            <ProductPricingCheckout 
              currentProduct={currentProduct}
              partner={partner}
              onStartOrder={onStartOrder}
              onAddToCart={onAddToCart}
            />
          </div>
        </div>

        {/* 3. Shopee Seller Card */}
        <ProductSellerCard partner={partner} onStartOrder={onStartOrder} />

        {/* 4. Spesifikasi & Deskripsi Produk */}
        <div className="bg-white rounded-xs p-5 sm:p-6 shadow-2xs border border-slate-200/80 space-y-6">
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

          <div className="pt-4 border-t border-slate-100">
            <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider bg-slate-50 p-2.5 rounded-xs border border-slate-200/60 mb-4">
              DESKRIPSI LENGKAP LAYANAN
            </h3>
            <div className="text-xs text-slate-600 leading-relaxed whitespace-pre-line space-y-2">
              {currentProduct.description}
            </div>
          </div>
        </div>

        {/* 5. Ulasan & Testimoni Mahasiswa */}
        <ProductReviewsFeed currentProduct={currentProduct} />

        {/* 6. Produk Terkait */}
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
