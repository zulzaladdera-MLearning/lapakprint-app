/**
 * Supabase Relational Database Service
 * Hybrid Storage Architecture: Hanya menyimpan teks metadata relasional (orders, users, status)
 * dan pointer URL string berkas, menghemat kuota free tier Supabase (< 1 GB).
 */

import { createClient } from '@supabase/supabase-js';

// Konfigurasi Supabase (Dapat dioverride via Vite ENV atau fallback demo)
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://lapakprint-app.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.dummy-anon-key-lapakprint';

// Inisialisasi client Supabase
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true
  }
});

// Cache memori lokal agar aplikasi tetap berfungsi 100% lancar meski belum terhubung koneksi internet
const localMemoryOrders = [];

/**
 * Menyimpan metadata pesanan cetak ke tabel 'orders' dan pointer URL ke 'print_files'
 * @param {Object} orderData - Data pesanan dari OrderCustomizerModal / Checkout
 * @param {Object} fileMetadata - Metadata dari Cloudinary (secure_url, public_id, size)
 * @returns {Promise<Object>}
 */
export async function savePrintOrderToDatabase(orderData, fileMetadata = null) {
  const newOrder = {
    id: orderData.id || `LP-${Date.now().toString().slice(-6)}`,
    user_id: orderData.userId || 'usr_mahasiswa_01',
    partner_id: orderData.partner?.id || 'ptr_berkah',
    partner_name: orderData.partner?.name || 'Mitra Toko Kampus',
    document_title: orderData.documentTitle || 'Tugas Kuliah Mahasiswa',
    pages_count: orderData.specs?.pages || 1,
    copies_count: orderData.specs?.copies || 1,
    paper_gsm: orderData.specs?.paperGsm || '70gsm',
    color_mode: orderData.specs?.colorMode || 'bw',
    binding_type: orderData.specs?.bindingType || 'staples',
    total_amount: orderData.pricing?.total || 0,
    status: 'paid', // paid -> printing -> binding -> ready -> completed
    pickup_code: orderData.pickupCode || Math.floor(1000 + Math.random() * 9000).toString(),
    // HYBRID STORAGE POINTER: Hanya simpan URL string Cloudinary
    file_cloudinary_url: fileMetadata?.secure_url || null,
    file_public_id: fileMetadata?.public_id || null,
    file_size_bytes: fileMetadata?.bytes || 0,
    created_at: new Date().toISOString()
  };

  try {
    // Upstream attempt ke Supabase jika terkonfigurasi
    const { data, error } = await supabase.from('orders').insert([newOrder]).select();
    if (!error && data) {
      console.log('[Supabase DB] Order berhasil dicatat ke PostgreSQL Supabase:', data);
      return { success: true, order: data[0] };
    }
  } catch (err) {
    console.warn('[Supabase Fallback] Koneksi database cloud menggunakan local persistence state:', err.message);
  }

  // Local fallback persistence
  localMemoryOrders.unshift(newOrder);
  try {
    const existing = JSON.parse(localStorage.getItem('lapakprint_supabase_orders') || '[]');
    existing.unshift(newOrder);
    localStorage.setItem('lapakprint_supabase_orders', JSON.stringify(existing.slice(0, 50)));
  } catch (e) {
    // Ignore storage quota
  }

  return { success: true, isLocalFallback: true, order: newOrder };
}

/**
 * Mengambil riwayat pesanan pengguna
 */
export async function fetchUserOrdersFromDatabase(userId = 'usr_mahasiswa_01') {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (!error && data && data.length > 0) {
      return data;
    }
  } catch (err) {
    // Fallback ke localStorage
  }

  try {
    const saved = JSON.parse(localStorage.getItem('lapakprint_supabase_orders') || '[]');
    return saved.length > 0 ? saved : localMemoryOrders;
  } catch (e) {
    return localMemoryOrders;
  }
}

/**
 * Update status produksi berkas (printing -> binding -> ready -> completed)
 */
export async function updateOrderStatusInDatabase(orderId, newStatus) {
  try {
    await supabase.from('orders').update({ status: newStatus }).eq('id', orderId);
  } catch (e) {
    // Ignore
  }

  // Update local storage
  try {
    const saved = JSON.parse(localStorage.getItem('lapakprint_supabase_orders') || '[]');
    const updated = saved.map(o => o.id === orderId ? { ...o, status: newStatus } : o);
    localStorage.setItem('lapakprint_supabase_orders', JSON.stringify(updated));
  } catch (e) {}

  return { success: true, orderId, status: newStatus };
}
