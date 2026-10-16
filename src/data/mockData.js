export const MOCK_USERS = {
  mahasiswa: {
    id: 'user-mhs-1',
    name: 'Budi Santoso',
    email: 'budi.santoso@mahasiswa.ac.id',
    role: 'mahasiswa',
    faculty: 'Fakultas Ilmu Komputer (Fasilkom)',
    university: 'Universitas Indonesia',
    phone: '0813-9876-5432',
    avatar: '👨‍🎓',
    lapakpayBalance: 125000,
    coinBalance: 2400
  },
  mitra: {
    id: 'vendor-1',
    name: 'Fotokopi & Percetakan Berkah Ilahi',
    owner: 'Haji Rohman',
    email: 'berkah.print@gmail.com',
    role: 'mitra',
    storeType: 'Percetakan & Jilid Skripsi',
    phone: '0812-3456-7890',
    avatar: '🏪',
    rating: 4.9,
    location: 'Jl. Lingkar Kampus No. 12 (120m dari Gerbang Utama)',
    sellerBalance: 1425000,
    isOpen: true
  },
  superadmin: {
    id: 'admin-owner-1',
    name: 'Admin Utama Platform (Owner)',
    email: 'owner@lapakprint.id',
    role: 'superadmin',
    department: 'Platform Operation & Escrow Treasury',
    phone: '0811-9988-7766',
    avatar: '👑',
    escrowHolding: 4850000,
    totalPlatformEarnings: 1245000
  }
};

export const MOCK_BANNERS = [
  {
    id: 'b1',
    title: 'Musim Sidang Skripsi Telah Tiba!',
    subtitle: 'Diskon Jilid Hard Cover 25% + Embos Emas Standar Rektorat',
    code: 'SKRIPSISUKSES',
    bgGradient: 'from-sky-500 to-blue-600',
    tag: 'Promo Eksklusif Kampus'
  },
  {
    id: 'b2',
    title: 'Gratis Ongkir Antar ke Kamar Kosan',
    subtitle: 'Khusus radius 1.5 km dari kampus via kurir mahasiswa',
    code: 'ONGKIRKOSAN',
    bgGradient: 'from-blue-600 to-indigo-600',
    tag: 'Bebas Antre'
  },
  {
    id: 'b3',
    title: 'Print Kilat 10 Menit Jadi!',
    subtitle: 'Upload PDF dari kamar, sampai toko tinggal tunjuk PIN',
    code: 'PRINTKILAT',
    bgGradient: 'from-cyan-500 to-blue-500',
    tag: 'Garansi Cepat'
  }
];

export const MOCK_CATEGORIES = [
  { id: 'cat-1', name: 'Draf Tugas & Makalah', icon: '📄', count: '120 Toko' },
  { id: 'cat-2', name: 'Hard Cover Skripsi', icon: '📘', count: '45 Toko' },
  { id: 'cat-3', name: 'Jilid Spiral Kawat', icon: '🌀', count: '68 Toko' },
  { id: 'cat-4', name: 'Print Kilat 10 Mnt', icon: '⚡', count: '32 Toko' },
  { id: 'cat-5', name: 'Cetak Bolak-Balik', icon: '🔄', count: 'Hemat 20%' },
  { id: 'cat-6', name: 'Poster & Banner TA', icon: '🎨', count: '18 Toko' },
];

export const MOCK_VOUCHERS = [
  { id: 'v1', name: 'Gratis Ongkir Kampus', minSpend: 15000, discount: 'Gratis Ongkir', expiry: 'Berlaku s/d Besok' },
  { id: 'v2', name: 'Diskon Jilid Skripsi Rp 10.000', minSpend: 40000, discount: 'Potongan Rp 10rb', expiry: 'Sisa 12 kupon' },
  { id: 'v3', name: 'Cashback 15% Cetak Harian', minSpend: 10000, discount: 'Max Rp 5.000', expiry: 'Khusus Mahasiswa' },
];

export const MOCK_PARTNERS = [
  {
    id: 'vendor-1',
    name: 'Fotokopi & Percetakan Berkah Ilahi',
    badge: 'Star Seller Kampus',
    type: 'Percetakan Lengkap & Jilid',
    distance: '120 meter (Depan Gerbang Utama)',
    rating: 4.9,
    soldCount: '12.4k',
    queueTime: '10-15 menit',
    queueCount: 2,
    isOpen: true,
    avatar: '🏪',
    priceStart: 250,
    features: ['Mesin Laser Konica Minolta', 'Bisa Embos Emas', 'Kertas PaperOne 80gr', 'Garansi Cetak Ulang']
  },
  {
    id: 'vendor-2',
    name: 'Cetak Cepat Kosan Mas Dimas',
    badge: 'Mitra Mahasiswa',
    type: 'Printer Kosan 24 Jam',
    distance: '350 meter (Komp. Kosan Melati No. 4)',
    rating: 4.8,
    soldCount: '3.1k',
    queueTime: 'Langsung Diproses',
    queueCount: 0,
    isOpen: true,
    avatar: '👨‍🎓',
    priceStart: 200,
    features: ['Buka s.d Jam 02.00 Malam', 'Bisa Antar ke Kamar', 'Harga Mahasiswa']
  },
  {
    id: 'vendor-3',
    name: 'Ganesa Digital Copy & Hardcover Center',
    badge: 'Official Store',
    type: 'Percetakan Besar',
    distance: '850 meter (Jl. Boulevard Kampus)',
    rating: 4.7,
    soldCount: '28.9k',
    queueTime: '30 menit (Ramai)',
    queueCount: 5,
    isOpen: true,
    avatar: '🏢',
    priceStart: 300,
    features: ['Spesialis Hardcover Skripsi', 'Pilihan Warna Cover Lengkap', 'Mesin Fuji Xerox']
  }
];

export const PRESET_DOCUMENTS = [
  {
    id: 'doc-1',
    name: 'Draf_Skripsi_Bab_1_sd_5_Revisi_Final_V3.pdf',
    size: '4.8 MB',
    pages: 65,
    colorPagesCount: 15,
    bwPagesCount: 50,
    type: 'Skripsi / Tesis'
  },
  {
    id: 'doc-2',
    name: 'Laporan_Praktikum_Fisika_Komputasi.pdf',
    size: '1.9 MB',
    pages: 24,
    colorPagesCount: 6,
    bwPagesCount: 18,
    type: 'Laporan Tugas'
  },
  {
    id: 'doc-3',
    name: 'Jurnal_Paper_IEEE_Template.pdf',
    size: '850 KB',
    pages: 10,
    colorPagesCount: 2,
    bwPagesCount: 8,
    type: 'Jurnal Ilmiah'
  }
];

export const PRICING_RULES = {
  paper: {
    'A4 70gr': { bw: 250, color: 1000 },
    'A4 80gr': { bw: 350, color: 1200 },
    'F4 70gr': { bw: 300, color: 1100 },
    'F4 80gr': { bw: 400, color: 1300 },
  },
  binding: {
    'Tanpa Jilid (Staples)': 0,
    'Lakban + Mika Bening': 3000,
    'Spiral Kawat': 12000,
    'Hard Cover Skripsi (Embos Emas)': 35000,
  },
  delivery: {
    'pickup': 0,
    'courier': 5000
  },
  platformFee: 1500
};

export const INITIAL_ORDERS = [
  {
    id: 'LP-8901',
    customerName: 'Budi Santoso',
    customerPhone: '0813-9876-5432',
    docName: 'Bab_4_5_Hasil_Penelitian_Revisi.pdf',
    vendorId: 'vendor-1',
    vendorName: 'Fotokopi & Percetakan Berkah Ilahi',
    pages: 42,
    bwPages: 36,
    colorPages: 6,
    paperType: 'A4 80gr',
    printMode: 'smart-mix',
    doubleSided: false,
    bindingType: 'Lakban + Mika Bening',
    bindingColor: 'Biru Tua',
    copies: 2,
    deliveryMethod: 'pickup',
    pickupPin: '4192',
    status: 'printing', // 'unpaid' | 'pending' | 'printing' | 'binding' | 'ready' | 'completed'
    notes: 'Mohon dirapikan margin kirinya 4cm.',
    pricing: {
      printCost: 39600,
      bindingCost: 6000,
      deliveryCost: 0,
      platformFee: 1500,
      total: 47100,
      vendorShare: 45600,
      platformShare: 1500
    },
    createdAt: '10:15 WIB',
    estimatedReady: '10:35 WIB'
  },
  {
    id: 'LP-8902',
    customerName: 'Budi Santoso',
    customerPhone: '0813-9876-5432',
    docName: 'Naskah_Lengkap_Skripsi_Final_ACC.pdf',
    vendorId: 'vendor-1',
    vendorName: 'Fotokopi & Percetakan Berkah Ilahi',
    pages: 94,
    bwPages: 80,
    colorPages: 14,
    paperType: 'A4 80gr',
    printMode: 'smart-mix',
    doubleSided: false,
    bindingType: 'Hard Cover Skripsi (Embos Emas)',
    bindingColor: 'Hijau Tua',
    copies: 1,
    deliveryMethod: 'courier',
    deliveryAddress: 'Kosan Puri Ganesha No. 12, Kamar 4 (Depan Koperasi)',
    pickupPin: '8204',
    status: 'ready',
    notes: 'Tulisan sampul warna emas terang standar Fakultas.',
    pricing: {
      printCost: 44800,
      bindingCost: 35000,
      deliveryCost: 5000,
      platformFee: 1500,
      total: 86300,
      vendorShare: 79800,
      platformShare: 1500,
      courierShare: 5000
    },
    createdAt: '09:30 WIB',
    estimatedReady: '11:00 WIB'
  },
  {
    id: 'LP-8890',
    customerName: 'Budi Santoso',
    customerPhone: '0813-9876-5432',
    docName: 'Jurnal_Paper_Konferensi_Nasional.pdf',
    vendorId: 'vendor-2',
    vendorName: 'Cetak Cepat Kosan Mas Dimas',
    pages: 12,
    bwPages: 10,
    colorPages: 2,
    paperType: 'A4 70gr',
    printMode: 'smart-mix',
    doubleSided: true,
    bindingType: 'Tanpa Jilid (Staples)',
    bindingColor: '-',
    copies: 3,
    deliveryMethod: 'pickup',
    pickupPin: '1190',
    status: 'completed',
    notes: 'Staples pojok kiri atas ya mas.',
    pricing: {
      printCost: 12150,
      bindingCost: 0,
      deliveryCost: 0,
      platformFee: 1500,
      total: 13650,
      vendorShare: 12150,
      platformShare: 1500
    },
    createdAt: 'Kemarin, 14:20 WIB',
    estimatedReady: 'Selesai'
  }
];

export const INITIAL_PAYOUT_REQUESTS = [
  {
    id: 'WD-301',
    vendorId: 'vendor-1',
    vendorName: 'Fotokopi & Percetakan Berkah Ilahi',
    bank: 'BCA (Bank Central Asia)',
    accountNumber: '8820-192-441',
    accountName: 'Haji Rohman',
    amount: 1400000,
    requestedAt: 'Hari ini, 08:30 WIB',
    status: 'pending' // 'pending' | 'approved' | 'rejected'
  },
  {
    id: 'WD-302',
    vendorId: 'vendor-2',
    vendorName: 'Cetak Cepat Kosan Mas Dimas',
    bank: 'Bank Mandiri',
    accountNumber: '137-00-9821-443',
    accountName: 'Dimas Prasetyo',
    amount: 320000,
    requestedAt: 'Kemarin, 17:15 WIB',
    status: 'approved'
  }
];

export const INITIAL_DISPUTES = [
  {
    id: 'DISP-101',
    orderId: 'LP-8742',
    customerName: 'Dinda Kirana (FKM)',
    vendorName: 'Ganesa Digital Copy Center',
    issue: 'Halaman 42 dan 43 terpotong margin atas karena salah potong jilid',
    amount: 48000,
    proofImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400',
    requestedAction: 'Minta Cetak Ulang Gratis / Refund',
    status: 'open' // 'open' | 'refunded' | 'reprinted'
  }
];

