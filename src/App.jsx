import React, { useState } from 'react';
import LoginPage from './components/LoginPage';
import ShopeeHeader from './components/ShopeeHeader';
import StudentShopeeHome from './components/StudentShopeeHome';
import ShopeeOrderManagement from './components/ShopeeOrderManagement';
import SellerCenterDashboard from './components/SellerCenterDashboard';
import SuperAdminDashboard from './components/SuperAdminDashboard';
import OrderCustomizerModal from './components/OrderCustomizerModal';
import QRISModal from './components/QRISModal';
import BusinessInsightsModal from './components/BusinessInsightsModal';
import VoucherCenterView from './components/features/VoucherCenterView';
import PrintKilatView from './components/features/PrintKilatView';
import HardcoverSkripsiView from './components/features/HardcoverSkripsiView';
import DraftPrintingView from './components/features/DraftPrintingView';
import SpiralBindingView from './components/features/SpiralBindingView';
import CampusPartnersView from './components/features/CampusPartnersView';
import LapakPayWalletView from './components/features/LapakPayWalletView';
import GuaranteeCenterView from './components/features/GuaranteeCenterView';
import PosterPlotterView from './components/features/PosterPlotterView';
import AllServicesView from './components/features/AllServicesView';
import ProductDetailView from './components/ProductDetailView';
import UserProfileMobileView from './components/UserProfileMobileView';
import MobileBottomNav from './components/MobileBottomNav';
import MultimodalPosterStudio from './features/ai-studio/MultimodalPosterStudio';
import { savePrintOrderToDatabase } from './services/supabase';
import { INITIAL_ORDERS, MOCK_USERS } from './data/mockData';
import { Bell } from 'lucide-react';

export default function App() {
  // Authentication State: null means show LoginPage, or MOCK_USERS.mahasiswa / MOCK_USERS.mitra
  const [currentUser, setCurrentUser] = useState(null);
  const [activeNavTab, setActiveNavTab] = useState('home'); // 'home' | 'orders'
  const [activeFeatureView, setActiveFeatureView] = useState(null); // null | 'voucher' | 'kilat' | 'hardcover' | etc
  const [selectedProductDetail, setSelectedProductDetail] = useState(null); // null | product object for Shopee PDP
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  
  // Modals state
  const [selectedPartnerForOrder, setSelectedPartnerForOrder] = useState(null);
  const [pendingCheckoutOrder, setPendingCheckoutOrder] = useState(null);
  const [isQRISOpen, setIsQRISOpen] = useState(false);
  const [isInsightsOpen, setIsInsightsOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  // Login handler
  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    setActiveNavTab('home');
    setActiveFeatureView(null);
    setSelectedProductDetail(null);
    const roleLabel = 
      user.role === 'mahasiswa' ? 'Akun Mahasiswa' :
      user.role === 'mitra' ? 'Mitra Toko' : 'Super Admin (Platform Owner)';
    showToast(`Selamat datang, ${user.name}! Masuk sebagai ${roleLabel}.`);
  };

  // Logout handler
  const handleLogout = () => {
    setCurrentUser(null);
    setActiveFeatureView(null);
    setSelectedProductDetail(null);
    showToast('Anda telah keluar dari akun.');
  };

  // Switch Role quickly
  const handleSwitchRole = (newRole) => {
    setActiveFeatureView(null);
    setSelectedProductDetail(null);
    if (newRole === 'mitra') {
      setCurrentUser(MOCK_USERS.mitra);
      showToast('Beralih ke Akun Mitra Toko (Mitra Seller Centre).');
    } else if (newRole === 'superadmin') {
      setCurrentUser(MOCK_USERS.superadmin);
      showToast('Beralih ke Akun Super Admin (Platform Owner).');
    } else {
      setCurrentUser(MOCK_USERS.mahasiswa);
      setActiveNavTab('home');
      showToast('Beralih ke Akun Mahasiswa (LapakPrint App).');
    }
  };

  // Student selects partner to customize print
  const handleSelectPartnerForOrder = (partner) => {
    setSelectedPartnerForOrder(partner);
  };

  // Student clicks checkout in customizer modal
  const handleProceedToCheckout = (orderData) => {
    setSelectedPartnerForOrder(null);
    setPendingCheckoutOrder(orderData);
    setIsQRISOpen(true);
  };

  // Student completes QRIS payment
  const handlePaymentSuccess = async (confirmedOrder) => {
    setIsQRISOpen(false);
    setOrders((prev) => [confirmedOrder, ...prev]);
    setActiveNavTab('orders');
    showToast(`🎉 Pembayaran Lunas Rp ${confirmedOrder.pricing.total.toLocaleString('id-ID')} via QRIS! Order #${confirmedOrder.id} masuk antrean percetakan.`);
    
    // Simpan metadata ke Supabase Relational Database
    try {
      await savePrintOrderToDatabase(confirmedOrder, confirmedOrder.cloudinary);
    } catch (e) {
      console.warn('Supabase background sync notice:', e);
    }
  };

  // Mitra updates order production status
  const handleUpdateOrderStatus = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );

    const statusLabels = {
      printing: 'Sedang Dicetak oleh Operator Toko',
      binding: 'Sedang Dalam Proses Finishing Penjilidan',
      ready: 'Selesai & Siap Diambil di Kasir Toko',
      completed: 'Serah Terima Selesai'
    };

    showToast(`🔔 Update Status #${orderId}: ${statusLabels[newStatus] || newStatus}`);
  };

  // Mitra verifies student's 4-digit pickup PIN
  const handleVerifyPickup = (orderId) => {
    handleUpdateOrderStatus(orderId, 'completed');
    showToast(`✅ Verifikasi PIN Berhasil! Dokumen #${orderId} telah diserahkan & saldo diteruskan ke kasir toko.`);
  };

  // Active orders count for badge
  const activeOrdersCount = orders.filter(
    (o) => o.status === 'pending' || o.status === 'printing' || o.status === 'binding' || o.status === 'ready'
  ).length;

  // IF NOT LOGGED IN: SHOW LOGIN PAGE
  if (!currentUser) {
    return <LoginPage onLoginSuccess={handleLoginSuccess} />;
  }

  // IF LOGGED IN AS SUPER ADMIN (PLATFORM OWNER)
  if (currentUser.role === 'superadmin') {
    return (
      <>
        <SuperAdminDashboard
          currentUser={currentUser}
          orders={orders}
          onLogout={handleLogout}
          onSwitchToStudent={() => handleSwitchRole('mahasiswa')}
          onSwitchToMitra={() => handleSwitchRole('mitra')}
          onOpenInsights={() => setIsInsightsOpen(true)}
        />

        {/* Global Toast */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 animate-bounce">
            <div className="bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-2xl border border-sky-400/40 flex items-center space-x-3 text-xs max-w-md">
              <Bell className="w-4 h-4 text-sky-400 shrink-0" />
              <p className="font-medium">{toastMessage}</p>
            </div>
          </div>
        )}

        <BusinessInsightsModal
          isOpen={isInsightsOpen}
          onClose={() => setIsInsightsOpen(false)}
        />
      </>
    );
  }

  // IF LOGGED IN AS MITRA (SELLER)
  if (currentUser.role === 'mitra') {
    return (
      <>
        <SellerCenterDashboard
          currentMitra={currentUser}
          orders={orders}
          onUpdateOrderStatus={handleUpdateOrderStatus}
          onVerifyPickup={handleVerifyPickup}
          onLogout={handleLogout}
          onSwitchToStudent={() => handleSwitchRole('mahasiswa')}
          onSwitchToSuperAdmin={() => handleSwitchRole('superadmin')}
          onOpenInsights={() => setIsInsightsOpen(true)}
        />

        {/* Global Toast */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 animate-bounce">
            <div className="bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-2xl border border-sky-400/40 flex items-center space-x-3 text-xs max-w-md">
              <Bell className="w-4 h-4 text-sky-400 shrink-0" />
              <p className="font-medium">{toastMessage}</p>
            </div>
          </div>
        )}

        <BusinessInsightsModal
          isOpen={isInsightsOpen}
          onClose={() => setIsInsightsOpen(false)}
        />
      </>
    );
  }

  // IF LOGGED IN AS MAHASISWA (CUSTOMER SHOPEE STYLE)
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Shopee-style Header in Light Blue & White */}
      <ShopeeHeader
        currentUser={currentUser}
        onLogout={handleLogout}
        activeNavTab={activeNavTab}
        setActiveNavTab={(tab) => {
          setActiveNavTab(tab);
          if (tab === 'home') {
            setActiveFeatureView(null);
            setSelectedProductDetail(null);
          }
        }}
        onOpenInsights={() => setIsInsightsOpen(true)}
        ordersCount={activeOrdersCount}
        onSwitchRole={handleSwitchRole}
        activeOrders={orders}
        onNavigateFeature={(feature) => {
          setActiveFeatureView(feature);
          setSelectedProductDetail(null);
        }}
      />

      {/* Main Content Body */}
      <main className="flex-1">
        {activeNavTab === 'home' && (
          <>
            {selectedProductDetail ? (
              <ProductDetailView
                product={selectedProductDetail}
                onBack={() => setSelectedProductDetail(null)}
                onStartOrder={handleSelectPartnerForOrder}
                onSelectProduct={setSelectedProductDetail}
                onAddToCart={(prod, qty) => showToast(`🛒 Berhasil menambahkan ${qty} rangkap "${prod.title}" ke keranjang!`)}
              />
            ) : activeFeatureView === 'ai-studio' ? (
              <MultimodalPosterStudio
                onBack={() => setActiveFeatureView(null)}
                onStartOrderWithPoster={handleSelectPartnerForOrder}
              />
            ) : activeFeatureView === 'voucher' ? (
              <VoucherCenterView
                onBack={() => setActiveFeatureView(null)}
                onApplyVoucher={(v) => showToast(`Voucher berhasil diklaim & siap dipakai!`)}
              />
            ) : activeFeatureView === 'kilat' ? (
              <PrintKilatView
                onBack={() => setActiveFeatureView(null)}
                onStartOrder={handleSelectPartnerForOrder}
              />
            ) : activeFeatureView === 'hardcover' ? (
              <HardcoverSkripsiView
                onBack={() => setActiveFeatureView(null)}
                onStartOrder={handleSelectPartnerForOrder}
              />
            ) : activeFeatureView === 'draft' ? (
              <DraftPrintingView
                onBack={() => setActiveFeatureView(null)}
                onStartOrder={handleSelectPartnerForOrder}
              />
            ) : activeFeatureView === 'spiral' ? (
              <SpiralBindingView
                onBack={() => setActiveFeatureView(null)}
                onStartOrder={handleSelectPartnerForOrder}
              />
            ) : activeFeatureView === 'partners' ? (
              <CampusPartnersView
                onBack={() => setActiveFeatureView(null)}
                onStartOrder={handleSelectPartnerForOrder}
              />
            ) : activeFeatureView === 'lapakpay' ? (
              <LapakPayWalletView
                onBack={() => setActiveFeatureView(null)}
              />
            ) : activeFeatureView === 'guarantee' ? (
              <GuaranteeCenterView
                onBack={() => setActiveFeatureView(null)}
              />
            ) : activeFeatureView === 'poster' ? (
              <PosterPlotterView
                onBack={() => setActiveFeatureView(null)}
                onStartOrder={handleSelectPartnerForOrder}
              />
            ) : activeFeatureView === 'all-services' ? (
              <AllServicesView
                onBack={() => setActiveFeatureView(null)}
                onStartOrder={handleSelectPartnerForOrder}
              />
            ) : activeFeatureView === 'profile' ? (
              <UserProfileMobileView
                currentUser={currentUser}
                onLogout={handleLogout}
                onSwitchRole={handleSwitchRole}
                onNavigateFeature={(feature) => {
                  setActiveFeatureView(feature);
                  setSelectedProductDetail(null);
                }}
                ordersCount={activeOrdersCount}
              />
            ) : (
              <StudentShopeeHome
                onSelectPartnerForOrder={handleSelectPartnerForOrder}
                onNavigateFeature={setActiveFeatureView}
                onSelectProduct={setSelectedProductDetail}
              />
            )}
          </>
        )}

        {activeNavTab === 'orders' && (
          <ShopeeOrderManagement
            orders={orders}
            onSelectOrder={() => {}}
          />
        )}
      </main>

      {/* Modals */}
      <OrderCustomizerModal
        isOpen={!!selectedPartnerForOrder}
        onClose={() => setSelectedPartnerForOrder(null)}
        partner={selectedPartnerForOrder}
        currentUser={currentUser}
        onProceedToCheckout={handleProceedToCheckout}
      />

      <QRISModal
        isOpen={isQRISOpen}
        onClose={() => setIsQRISOpen(false)}
        orderDetails={pendingCheckoutOrder}
        onPaymentSuccess={handlePaymentSuccess}
      />

      <BusinessInsightsModal
        isOpen={isInsightsOpen}
        onClose={() => setIsInsightsOpen(false)}
      />

      {/* Notification Toast */}
      {toastMessage && (
        <div className="fixed bottom-16 md:bottom-6 right-4 md:right-6 z-50 animate-bounce">
          <div className="bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-2xl border border-sky-400/40 flex items-center space-x-3 text-xs max-w-md">
            <Bell className="w-4 h-4 text-sky-400 shrink-0" />
            <p className="font-medium">{toastMessage}</p>
          </div>
        </div>
      )}

      {/* Shopee-style Footer (Desktop Only) */}
      <footer className="hidden md:block bg-white border-t border-slate-200 mt-12 py-8 text-center text-xs text-slate-500 space-y-2">
        <div className="flex justify-center space-x-6 font-semibold text-slate-600">
          <span className="hover:text-sky-600 cursor-pointer">Tentang LapakPrint</span>
          <span className="hover:text-sky-600 cursor-pointer">Syarat & Ketentuan</span>
          <span className="hover:text-sky-600 cursor-pointer">Kebijakan Privasi Dokumen (Auto-Purge 24h)</span>
          <span className="hover:text-sky-600 cursor-pointer">Pusat Bantuan Mahasiswa</span>
        </div>
        <p className="text-slate-400">
          © 2026 LapakPrint Indonesia. Platform Print & Jilid Skripsi Berbasis Geofencing Kampus.
        </p>
      </footer>

      {/* Shopee-style Mobile Bottom Navigation Bar (Fixed on mobile) */}
      <MobileBottomNav
        activeNavTab={activeNavTab}
        setActiveNavTab={setActiveNavTab}
        activeFeatureView={activeFeatureView}
        setActiveFeatureView={setActiveFeatureView}
        ordersCount={activeOrdersCount}
        onResetToHome={() => {
          setActiveNavTab('home');
          setActiveFeatureView(null);
          setSelectedProductDetail(null);
        }}
      />
    </div>
  );
}
