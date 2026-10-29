import React from 'react';
import ShopeeFloatingStrip from '../features/catalog/ShopeeFloatingStrip';
import ShopeeHeroBanners from '../features/catalog/ShopeeHeroBanners';
import ShopeeQuickMenus from '../features/catalog/ShopeeQuickMenus';
import ShopeeCategories from '../features/catalog/ShopeeCategories';
import ShopeeFlashSale from '../features/catalog/ShopeeFlashSale';
import ShopeeCampusPartners from '../features/catalog/ShopeeCampusPartners';
import ShopeeProductGrid from '../features/catalog/ShopeeProductGrid';

export default function StudentShopeeHome({ 
  onSelectPartnerForOrder, 
  onNavigateFeature,
  onSelectProduct 
}) {
  return (
    <div className="bg-[#f5f5f5] pb-20 md:pb-16 font-['Plus_Jakarta_Sans',sans-serif]">
      {/* 0. Shopee Mobile LapakPay & Coins Floating Strip */}
      <ShopeeFloatingStrip onNavigateFeature={onNavigateFeature} />

      {/* 1. Hero Section: Shopee 2 : 1 Banner Ratio & Carousel */}
      <ShopeeHeroBanners onNavigateFeature={onNavigateFeature} />

      {/* 2. Circular Quick Menus (AI Studio, Voucher, Kilat, Hardcover, etc.) */}
      <ShopeeQuickMenus onNavigateFeature={onNavigateFeature} />

      {/* 3. 2-Row Categories Grid */}
      <ShopeeCategories onNavigateFeature={onNavigateFeature} />

      {/* 4. Flash Sale Section with Countdown Timer */}
      <ShopeeFlashSale 
        onSelectPartnerForOrder={onSelectPartnerForOrder}
        onNavigateFeature={onNavigateFeature}
        onSelectProduct={onSelectProduct}
      />

      {/* 5. Geofencing Campus Official Partners */}
      <ShopeeCampusPartners 
        onSelectPartnerForOrder={onSelectPartnerForOrder}
        onNavigateFeature={onNavigateFeature}
      />

      {/* 6. Student Recommendation Product Feed with Load More */}
      <ShopeeProductGrid 
        onSelectPartnerForOrder={onSelectPartnerForOrder}
        onSelectProduct={onSelectProduct}
      />
    </div>
  );
}
