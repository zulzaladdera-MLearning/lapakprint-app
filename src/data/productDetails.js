export const DETAILED_PRODUCTS = [
  {
    id: 'p1',
    title: 'Paket Naskah Skripsi Lengkap Hard Cover Embos Emas Standar Rektorat',
    category: 'Jilid Hard Cover Skripsi',
    price: 45000,
    originalPrice: 55000,
    discount: '18%',
    sold: '1.2k',
    rating: 4.9,
    reviewsCount: 482,
    partnerId: 'vendor-1',
    partnerName: 'Fotokopi & Percetakan Berkah Ilahi',
    location: 'Gerbang UI Depok (120m dari Kampus)',
    badge: 'Star+',
    isFreeShipping: true,
    thumbnail: '📘',
    stock: 24,
    images: [
      { id: 1, label: 'Tampak Depan Sampul', icon: '📘', desc: 'Cover depan karton no. 30/40 tebal rapi' },
      { id: 2, label: 'Punggung & Embos Emas', icon: '✨', desc: 'Hotprint huruf emas tajam & simetris' },
      { id: 3, label: 'Jahit Benang & Kertas', icon: '📑', desc: 'Jahit benang kuat anti-halaman lepas' },
      { id: 4, label: 'Pita Pembatas & Packing', icon: '🎗️', desc: 'Termasuk pita pembatas kuning & plastik seal' }
    ],
    variations: [
      {
        name: 'Warna Sampul Fakultas',
        key: 'coverColor',
        options: [
          { label: 'Biru Tua (Teknik/Fasilkom)', priceAdd: 0 },
          { label: 'Hijau Tua (Kedokteran/Farmasi)', priceAdd: 0 },
          { label: 'Merah Marun (FEB/Hukum)', priceAdd: 0 },
          { label: 'Kuning Kunyit (FISIP)', priceAdd: 0 },
          { label: 'Hitam Doff (Pascasarjana)', priceAdd: 3000 }
        ]
      },
      {
        name: 'Tinta Huruf Hotprint',
        key: 'foilColor',
        options: [
          { label: 'Emas Mengkilap (Gold Foil)', priceAdd: 0 },
          { label: 'Perak Elegan (Silver Foil)', priceAdd: 0 },
          { label: 'Hitam Embos Timbul', priceAdd: 0 }
        ]
      }
    ],
    specs: {
      'Kategori': 'Jilid Hard Cover / Skripsi',
      'Format File Wajib': 'PDF (Mengunci margin 4-4-3-3)',
      'Standar Kampus': 'Resmi Perpustakaan & Rektorat',
      'Bahan Karton': 'Karton Kuning Tebal No. 30/40',
      'Aksesori': 'Pita Pembatas Kuning + Sudut Siku Rapi',
      'Metode Jilid': 'Jahit Benang + Lem Panas (Binding Press)',
      'Waktu Pengerjaan': 'Estimasi 2 - 4 Jam Jadi'
    },
    description: `Paket cetak & jilid naskah skripsi / tesis resmi sesuai pedoman penulisan universitas.
    
Keunggulan Layanan:
1. Menggunakan karton tebal standar perpustakaan pusat, kokoh dan tidak mudah melengkung.
2. Huruf judul, nama, dan logo kampus dicetak dengan plat kuningan mesin hotprint emas berkilau tajam.
3. Dijahit benang per kuras sehingga lembaran tidak akan pernah copot saat dibuka di depan dosen penguji.
4. Dilengkapi garansi cetak ulang gratis jika terdapat cacat posisi tulisan embos miring atau salah ketik dari pihak percetakan.
5. Serah terima di kasir menggunakan 4-digit PIN rahasia untuk mencegah berkas tertukar dengan mahasiswa lain.`,
    reviews: [
      {
        id: 'rev-1',
        userName: 'r***a (Fasilkom UI)',
        avatar: '👨‍🎓',
        rating: 5,
        date: 'Kemarin 14:22',
        variant: 'Biru Tua (Teknik/Fasilkom), Emas Mengkilap',
        content: 'Hasil jilidnya rapi banget! Embos emasnya tajam dan berkilau, jahitannya rapat. Ambil di kasir tinggal sebut PIN 4 digit langsung dikasih tanpa perlu antre panjang. Sukses sidang skripsiku!'
      },
      {
        id: 'rev-2',
        userName: 'd***i (FEB UI)',
        avatar: '👩‍🎓',
        rating: 5,
        date: '3 hari lalu',
        variant: 'Merah Marun (FEB/Hukum), Emas Mengkilap',
        content: 'Warna merah marunnya pas banget sama pedoman skripsi FEB. Berkasnya dibungkus plastik seal bening jadi aman pas dibawa naik motor pas hujan gerimis. Recommended pol!'
      },
      {
        id: 'rev-3',
        userName: 'm***l (Teknik Mesin)',
        avatar: '👨‍🎓',
        rating: 5,
        date: 'Minggu lalu',
        variant: 'Biru Tua (Teknik/Fasilkom), Emas Mengkilap',
        content: 'Sangat terbantu, upload PDF jam 9 malam, paginya jam 8 udah siap diambil. Mantap LapakPrint!'
      }
    ]
  },
  {
    id: 'p2',
    title: 'Cetak Dokumen Draf Skripsi A4 80gr PaperOne High Speed Laser',
    category: 'Draf Tugas & Makalah',
    price: 350,
    originalPrice: 450,
    discount: '22%',
    sold: '8.4k',
    rating: 4.9,
    reviewsCount: 712,
    partnerId: 'vendor-1',
    partnerName: 'Fotokopi & Percetakan Berkah Ilahi',
    location: '120m dari Kampus Gerbang UI',
    badge: 'Star+',
    isFreeShipping: true,
    thumbnail: '📄',
    stock: 999,
    images: [
      { id: 1, label: 'Kertas PaperOne Asli', icon: '📄', desc: 'Kertas putih bersih 80gr anti tembus' },
      { id: 2, label: 'Ketajaman Huruf Laser', icon: '🔍', desc: '1200 DPI tajam tanpa noda toner' },
      { id: 3, label: 'Cetak 2 Sisi Bolak-Balik', icon: '🔄', desc: 'Opsi duplex hemat kertas & praktis' },
      { id: 4, label: 'Packaging Map Plastik', icon: '📁', desc: 'Diberi map pelindung rapi' }
    ],
    variations: [
      {
        name: 'Jenis Warna Tinta',
        key: 'colorMode',
        options: [
          { label: 'Hitam Putih (B/W)', priceAdd: 0 },
          { label: 'Warna Laser Tajam (Grafik/Foto)', priceAdd: 650 }
        ]
      },
      {
        name: 'Sisi Cetak',
        key: 'sides',
        options: [
          { label: '1 Sisi (Simplex)', priceAdd: 0 },
          { label: 'Bolak-Balik (Duplex Hemat)', priceAdd: -35 }
        ]
      }
    ],
    specs: {
      'Kategori': 'Cetak Kertas Harian',
      'Format Berkas': 'PDF Only (Anti font hilang)',
      'Merek Kertas': 'PaperOne Original 80 GSM',
      'Mesin Printer': 'Konica Minolta High Speed Laser',
      'Resolusi Cetak': '1200 x 1200 DPI',
      'Kecepatan Cetak': '65 Halaman per Menit',
      'Kerapian': 'Auto Sorter & Collate rapi berurutan'
    },
    description: `Layanan cetak draf skripsi bimbingan dan laporan ilmiah dengan kertas PaperOne 80gr kualitas utama.
    
Keunggulan Produk:
- Kertas lebih tebal, tidak mudah tembus pandang jika diberi stabilo atau coretan revisi dosen pembimbing.
- Mesin laser production grade memastikan huruf tidak luntur dan garis tabel terlihat tajam presisi.
- File PDF yang diunggah akan otomatis dihapus permanen dalam 24 jam demi privasi karya Anda.`,
    reviews: [
      {
        id: 'rev-1',
        userName: 'a***n (Fakultas Farmasi)',
        avatar: '👩‍🎓',
        rating: 5,
        date: '2 hari lalu',
        variant: 'Hitam Putih (B/W), 1 Sisi (Simplex)',
        content: 'Kertasnya tebal dan putih bersih PaperOne asli. Dosen bimbingan puas bacanya karena gak tembus spidol koreksi.'
      },
      {
        id: 'rev-2',
        userName: 'k***o (Teknik Industri)',
        avatar: '👨‍🎓',
        rating: 5,
        date: '5 hari lalu',
        variant: 'Bolak-Balik (Duplex Hemat)',
        content: 'Opsi duplexnya presisi banget, margin kanan kirinya lurus gak miring. Hemat separuh tebal berkas.'
      }
    ]
  },
  {
    id: 'p3',
    title: 'Jilid Lakban Mika Bening Kilat 5 Menit Selesai Anti Lepas',
    category: 'Jilid Cepat Praktikum',
    price: 3000,
    originalPrice: 4000,
    discount: '25%',
    sold: '3.1k',
    rating: 4.8,
    reviewsCount: 320,
    partnerId: 'vendor-2',
    partnerName: 'Printer Kosan Mas Dimas',
    location: 'Komp. Kosan Melati No. 4',
    badge: 'Mitra',
    isFreeShipping: false,
    thumbnail: '📎',
    stock: 50,
    images: [
      { id: 1, label: 'Mika Bening Glossy', icon: '📎', desc: 'Mika pelindung bening 0.10mm' },
      { id: 2, label: 'Lakban Hitam Rekat', icon: '🛡️', desc: 'Cloth tape daya rekat ekstra kuat' },
      { id: 3, label: 'Kertas Buffalo Belakang', icon: '📄', desc: 'Cover belakang buffalo tebal' },
      { id: 4, label: 'Pojokan Staples Rata', icon: '✂️', desc: 'Staples kuat dipres rapi' }
    ],
    variations: [
      {
        name: 'Warna Lakban',
        key: 'tapeColor',
        options: [
          { label: 'Hitam Standar Laporan', priceAdd: 0 },
          { label: 'Biru Tua Formal', priceAdd: 0 },
          { label: 'Merah Terang', priceAdd: 0 }
        ]
      },
      {
        name: 'Jenis Mika Cover Depan',
        key: 'mikaType',
        options: [
          { label: 'Mika Bening Glossy', priceAdd: 0 },
          { label: 'Mika Doff Frosty', priceAdd: 500 }
        ]
      }
    ],
    specs: {
      'Kategori': 'Jilid Makalah / Praktikum',
      'Format File': 'PDF',
      'Material': 'Cloth Tape Super Strong + Mika Rigid',
      'Cover Belakang': 'Kertas Buffalo Bertekstur',
      'Kapasitas': 'Hingga 120 Lembar Kertas',
      'Waktu Jadi': '5 - 10 Menit di Kasir'
    },
    description: `Solusi jilid cepat untuk laporan praktikum mingguan, makalah presentasi, dan tugas kuliah darurat.
    
Fitur Andalan:
- Staples ganda dipres rata sehingga tidak melukai tangan.
- Lakban tebal berlapis kain (cloth tape) dengan lem perekat kuat anti-copot.
- Cover depan dilapisi mika pelindung agar berkas tidak basah terkena percikan air minum saat diskusi kelompok.`,
    reviews: [
      {
        id: 'rev-1',
        userName: 'p***a (Biologi)',
        avatar: '👩‍🎓',
        rating: 5,
        date: 'Kemarin',
        variant: 'Hitam Standar Laporan, Mika Bening Glossy',
        content: 'Jilid kilat beneran 5 menit langsung jadi pas lagi buru-buru mau kumpul ke lab. Mas Dimas fast response banget.'
      }
    ]
  },
  {
    id: 'p4',
    title: 'Jilid Spiral Kawat Double Loop Dokumen Tugas Akhir / Laporan',
    category: 'Spiral & Modul',
    price: 12000,
    originalPrice: 15000,
    discount: '20%',
    sold: '920',
    rating: 4.8,
    reviewsCount: 145,
    partnerId: 'vendor-3',
    partnerName: 'Ganesa Digital Copy & Hardcover Center',
    location: 'Jl. Boulevard Kampus No. 8',
    badge: 'Mall',
    isFreeShipping: true,
    thumbnail: '🌀',
    stock: 35,
    images: [
      { id: 1, label: 'Spiral Kawat Ganda', icon: '🌀', desc: 'Double loop wire binding kuat' },
      { id: 2, label: 'Buka Flat 360 Derajat', icon: '📖', desc: 'Bisa dilipat ke belakang tanpa rusak' },
      { id: 3, label: 'Mika Doff Depan Belakang', icon: '📑', desc: 'Dilapisi 2 lembar mika pelindung' },
      { id: 4, label: 'Pilihan Kawat Hitam/Putih', icon: '⚙️', desc: 'Material baja berlapis elegan' }
    ],
    variations: [
      {
        name: 'Warna Kawat Spiral',
        key: 'wireColor',
        options: [
          { label: 'Kawat Putih Bersih', priceAdd: 0 },
          { label: 'Kawat Hitam Elegan', priceAdd: 0 }
        ]
      },
      {
        name: 'Pelindung Cover',
        key: 'coverProtection',
        options: [
          { label: 'Mika Bening + Belakang Buffalo', priceAdd: 0 },
          { label: 'Mika Doff Tebal Frosty (Depan & Belakang)', priceAdd: 2000 }
        ]
      }
    ],
    specs: {
      'Kategori': 'Jilid Modul / Portofolio',
      'Tipe Spiral': 'Twin Loop Steel Wire (Pitch 3:1)',
      'Kelebihan': 'Dapat diputar 360 derajat flat di atas meja',
      'Cover Depan/Belakang': '2 Lembar Mika Rigid Anti Kusut',
      'Kapasitas': '10 - 200 Halaman'
    },
    description: `Jilid spiral kawat profesional untuk modul perkuliahan, buku panduan praktikum, portofolio desain, dan proposal bisnis.
    
Keunggulan:
- Kawat baja berlapis ganda (twin loop), tidak mudah penyok bila tertindih di dalam tas ransel.
- Halaman dapat dibuka datar 360 derajat memudahkan mencatat saat belajar di perpustakaan.`,
    reviews: [
      {
        id: 'rev-1',
        userName: 'v***o (DKV / Seni)',
        avatar: '👨‍🎨',
        rating: 5,
        date: '4 hari lalu',
        variant: 'Kawat Hitam Elegan, Mika Doff Tebal',
        content: 'Bagus banget buat portofolio karya desain. Bukunya bisa dibuka rata 360 derajat tanpa takut kertasnya ketarik.'
      }
    ]
  },
  {
    id: 'p5',
    title: 'Print Jurnal Paper IEEE / Konferensi Nasional Full Color Tajam',
    category: 'Jurnal Ilmiah',
    price: 1000,
    originalPrice: 1300,
    discount: '23%',
    sold: '2.5k',
    rating: 4.9,
    reviewsCount: 310,
    partnerId: 'vendor-1',
    partnerName: 'Fotokopi & Percetakan Berkah Ilahi',
    location: 'Gerbang UI Depok',
    badge: 'Star+',
    isFreeShipping: true,
    thumbnail: '📜',
    stock: 500,
    images: [
      { id: 1, label: 'Layout 2 Kolom IEEE', icon: '📜', desc: 'Presisi margin template konferensi' },
      { id: 2, label: 'Grafik Warna CMYK Tajam', icon: '📊', desc: 'Warna grafik riset tidak pudar' },
      { id: 3, label: 'Kertas 80gr Halus', icon: '📄', desc: 'Kertas putih khusus publikasi ilmiah' },
      { id: 4, label: 'Staples Pojok Kiri Atas', icon: '📎', desc: 'Staples rapi anti merusak teks' }
    ],
    variations: [
      {
        name: 'Jenis Kertas',
        key: 'paperType',
        options: [
          { label: 'A4 80gr PaperOne Standar Jurnal', priceAdd: 0 },
          { label: 'A4 100gr Premium Silk Paper', priceAdd: 500 }
        ]
      },
      {
        name: 'Finishing Dokumen',
        key: 'finishing',
        options: [
          { label: 'Corner Staple (Pojok Kiri Atas)', priceAdd: 0 },
          { label: 'Tanpa Staples (Loose Sheets)', priceAdd: 0 },
          { label: 'Booklet Tengah (Saddle Stitch)', priceAdd: 3000 }
        ]
      }
    ],
    specs: {
      'Kategori': 'Publikasi Jurnal / Paper',
      'Format File': 'PDF (IEEE 2-Column Template)',
      'Akurasi Warna': 'High Color Gamut CMYK',
      'Kertas': 'PaperOne 80 GSM / 100 GSM',
      'Resolusi': '2400 x 1200 DPI'
    },
    description: `Cetak dokumen publikasi riset, konferensi internasional IEEE, Springer, dan jurnal terindeks Sinta/Scopus.
    
Menghasilkan ketajaman garis mikro pada grafik riset, kurva data statistik, dan skema rangkaian laboratorium.`,
    reviews: [
      {
        id: 'rev-1',
        userName: 'h***i (Teknik Elektro)',
        avatar: '👨‍🎓',
        rating: 5,
        date: 'Kemarin',
        variant: 'A4 80gr PaperOne, Corner Staple',
        content: 'Grafik warna hasil riset MATLAB tercetak jelas banget warnanya, gak bloor sama sekali.'
      }
    ]
  },
  {
    id: 'p6',
    title: 'Jasa Antar Berkas Print & Jilid ke Kamar Kosan Mahasiswa',
    category: 'Kurir Kampus',
    price: 5000,
    originalPrice: 7000,
    discount: '28%',
    sold: '4.8k',
    rating: 4.9,
    reviewsCount: 890,
    partnerId: 'vendor-2',
    partnerName: 'Printer Kosan Mas Dimas',
    location: 'Radius Kampus 1.5km',
    badge: 'Mitra',
    isFreeShipping: true,
    thumbnail: '🛵',
    stock: 50,
    images: [
      { id: 1, label: 'Kurir Mahasiswa Cepat', icon: '🛵', desc: 'Antar langsung ke depan pintu kamar kos' },
      { id: 2, label: 'Plastik Zip Seal Anti Basah', icon: '🌧️', desc: 'Dokumen dijamin kering bebas hujan' },
      { id: 3, label: 'Radius 1.5 KM Kampus', icon: '📍', desc: 'Mencakup seluruh asrama & kosan' },
      { id: 4, label: 'Konfirmasi via WhatsApp', icon: '📱', desc: 'Notifikasi foto paket sampai kos' }
    ],
    variations: [
      {
        name: 'Radius Area Kosan',
        key: 'areaRadius',
        options: [
          { label: 'Area Dekat Kampus (< 500m)', priceAdd: 0 },
          { label: 'Area Kosan Melati & Sekitarnya (500m - 1.5km)', priceAdd: 0 }
        ]
      },
      {
        name: 'Waktu Pengantaran',
        key: 'deliveryTime',
        options: [
          { label: 'Langsung Antar Saat Cetak Selesai', priceAdd: 0 },
          { label: 'Malam Hari (19.00 - 21.00 WIB)', priceAdd: 0 }
        ]
      }
    ],
    specs: {
      'Kategori': 'Layanan Logistik Mahasiswa',
      'Kemasan': 'Plastik Tebal Zip Seal Waterproof',
      'Kecepatan Antar': '15 - 30 Menit setelah cetak jadi',
      'Kurir': 'Rekan Mahasiswa Internal Kampus'
    },
    description: `Gak sempat ke luar kamar kosan karena begadang belajar atau cuaca hujan? Kurir mahasiswa kami siap mengantarkan dokumen Anda langsung sampai depan pintu kamar kosan.`,
    reviews: [
      {
        id: 'rev-1',
        userName: 's***i (Kosan Kutek UI)',
        avatar: '👩‍🎓',
        rating: 5,
        date: 'Kemarin malam',
        variant: 'Area Dekat Kampus, Langsung Antar',
        content: 'Penyelamat banget pas lagi meriang gak bisa keluar kosan. Dokumen diantar dibungkus plastik rapat anti-hujan.'
      }
    ]
  },
  {
    id: 'p7',
    title: 'Paket Bundling Draf Seminar Proposal (3 Rangkap + Jilid Lakban)',
    category: 'Bundling Ujian',
    price: 32000,
    originalPrice: 40000,
    discount: '20%',
    sold: '640',
    rating: 4.8,
    reviewsCount: 95,
    partnerId: 'vendor-1',
    partnerName: 'Fotokopi & Percetakan Berkah Ilahi',
    location: 'Gerbang UI Depok',
    badge: 'Star+',
    isFreeShipping: true,
    thumbnail: '📎',
    stock: 20,
    images: [
      { id: 1, label: '3 Rangkap Lengkap', icon: '📎', desc: 'Untuk 1 dosen pembimbing & 2 dosen penguji' },
      { id: 2, label: 'Jilid Lakban Mika Bening', icon: '📑', desc: 'Rapi dan siap diserahkan' },
      { id: 3, label: 'Stiker Label Penguji', icon: '🏷️', desc: 'Diberi stiker nama dosen penguji' },
      { id: 4, label: 'Tas Jinjing Dokumen', icon: '🛍️', desc: 'Termasuk paper bag kemasan' }
    ],
    variations: [
      {
        name: 'Jumlah Rangkap Berkas',
        key: 'bundles',
        options: [
          { label: '3 Rangkap (Dosen Pembimbing + 2 Penguji)', priceAdd: 0 },
          { label: '4 Rangkap (+ Arsip Pribadi Mahasiswa)', priceAdd: 10000 }
        ]
      },
      {
        name: 'Pilihan Gramatur Kertas',
        key: 'paperGram',
        options: [
          { label: 'PaperOne 80gr (Standar ACC Sempro)', priceAdd: 0 },
          { label: 'HVS 70gr Ekonomis', priceAdd: -4000 }
        ]
      }
    ],
    specs: {
      'Kategori': 'Paket Ujian Seminar Proposal',
      'Kelengkapan': '3 Set Dokumen Lengkap + Jilid Lakban Mika',
      'Free Bonus': 'Stiker Label Nama Dosen Penguji di Tiap Jilid',
      'Waktu Siap': '1 - 2 Jam'
    },
    description: `Paket bundling praktis persiapan Seminar Proposal (Sempro). Satu kali klik otomatis dicetak 3 atau 4 rangkap dan dijilid rapi lengkap dengan label pembatas.`,
    reviews: [
      {
        id: 'rev-1',
        userName: 't***o (Ilmu Administrasi)',
        avatar: '👨‍🎓',
        rating: 5,
        date: '3 hari lalu',
        variant: '3 Rangkap, PaperOne 80gr',
        content: 'Paketnya praktis banget buat sempro! Gak usah ribet hitung rangkap satu per satu di kasir fotokopi.'
      }
    ]
  },
  {
    id: 'p8',
    title: 'Cetak Bolak-Balik Duplex PaperOne 70gr Hemat Kertas Tugas Kuliah',
    category: 'Hemat Kertas',
    price: 250,
    originalPrice: 300,
    discount: '16%',
    sold: '11.2k',
    rating: 4.9,
    reviewsCount: 1420,
    partnerId: 'vendor-3',
    partnerName: 'Ganesa Digital Copy & Hardcover Center',
    location: 'Jl. Boulevard Kampus',
    badge: 'Mall',
    isFreeShipping: false,
    thumbnail: '🔄',
    stock: 999,
    images: [
      { id: 1, label: 'Cetak Bolak-Balik', icon: '🔄', desc: 'Sensor auto duplex presisi tinggi' },
      { id: 2, label: 'Hemat Ketebalan 50%', icon: '📉', desc: 'Dokumen jadi tipis dan ringan' },
      { id: 3, label: 'Tinta Laser Pekat', icon: '🖨️', desc: 'Teks terbaca jelas di kedua sisi' },
      { id: 4, label: 'Kertas Ramah Lingkungan', icon: '🌱', desc: 'Mengurangi sampah kertas kampus' }
    ],
    variations: [
      {
        name: 'Kombinasi Cetak',
        key: 'duplexMode',
        options: [
          { label: 'Hitam Putih Murni (Teks Saja)', priceAdd: 0 },
          { label: 'Campuran Gambar Berwarna', priceAdd: 400 }
        ]
      }
    ],
    specs: {
      'Kategori': 'Cetak Kertas Duplex',
      'Format Berkas': 'PDF Only',
      'Efisiensi': 'Menghemat 50% lembaran fisik kertas',
      'Mesin': 'Fuji Xerox DocuCentre Laser'
    },
    description: `Hemat biaya bulanan kuliah hingga 30% dengan memanfaatkan teknologi cetak bolak-balik otomatis (auto-duplexing). Cocok untuk modul praktikum, slide presentasi dosen, dan draf tugas mingguan.`,
    reviews: [
      {
        id: 'rev-1',
        userName: 'y***a (FKM UI)',
        avatar: '👩‍🎓',
        rating: 5,
        date: 'Kemarin',
        variant: 'Hitam Putih Murni',
        content: 'Sangat hemat buat ngeprint materi slide kuliah 80 halaman jadi cuma 20 lembar bolak-balik.'
      }
    ]
  },
  {
    id: 'p9',
    title: 'Hard Cover Embos Emas Custom Logo Universitas / Fakultas',
    category: 'Hardcover Custom',
    price: 35000,
    originalPrice: 45000,
    discount: '22%',
    sold: '3.7k',
    rating: 4.9,
    reviewsCount: 520,
    partnerId: 'vendor-3',
    partnerName: 'Ganesa Digital Copy & Hardcover Center',
    location: 'Jl. Boulevard Kampus',
    badge: 'Mall',
    isFreeShipping: true,
    thumbnail: '📘',
    stock: 45,
    images: [
      { id: 1, label: 'Plat Logo Universitas', icon: '📘', desc: 'Embos logo timbul presisi tinggi' },
      { id: 2, label: 'Hotprint Emas Murni', icon: '✨', desc: 'Kilau emas tidak mudah mengelupas' },
      { id: 3, label: 'Karton No. 40 Super Keras', icon: '🛡️', desc: 'Sangat kokoh dan tahan lama' },
      { id: 4, label: 'Sudut Siku Presisi', icon: '📐', desc: 'Pemotongan mesin hidrolik presisi' }
    ],
    variations: [
      {
        name: 'Pilihan Logo Kampus',
        key: 'univLogo',
        options: [
          { label: 'Logo Makara UI', priceAdd: 0 },
          { label: 'Logo Ganesha ITB', priceAdd: 0 },
          { label: 'Logo Kartika UGM', priceAdd: 0 },
          { label: 'Logo Universitas Lain (Custom Plat)', priceAdd: 5000 }
        ]
      },
      {
        name: 'Warna Cover Kain Linen',
        key: 'coverLinen',
        options: [
          { label: 'Biru Dongker Tua', priceAdd: 0 },
          { label: 'Hijau Daun Tua', priceAdd: 0 },
          { label: 'Merah Marun Mewah', priceAdd: 0 },
          { label: 'Kuning Gading', priceAdd: 0 }
        ]
      }
    ],
    specs: {
      'Kategori': 'Jilid Hardcover Skripsi',
      'Plat Embos': 'Kuningan Timbul 3D High Definition',
      'Lem Penjilidan': 'Lem Rajawali Tahan Rayap & Jamur',
      'Ketahanan': 'Tahan disimpan hingga lebih dari 15 tahun di rak'
    },
    description: `Jilid naskah hard cover skripsi kualitas arsip perpustakaan pusat. Dikerjakan dengan plat logo kuningan khusus dan mesin hotprint bertekanan tinggi.`,
    reviews: [
      {
        id: 'rev-1',
        userName: 'n***a (Sastra UI)',
        avatar: '👩‍🎓',
        rating: 5,
        date: '5 hari lalu',
        variant: 'Logo Makara UI, Biru Dongker Tua',
        content: 'Logo Makara UI-nya timbul jelas banget dan berkilau emas mewah. Dosen pembimbing langsung tanda tangan lembar pengesahan!'
      }
    ]
  },
  {
    id: 'p10',
    title: 'Print Kertas F4 / Folio 80gr Dokumen Resmi / Administrasi Kampus',
    category: 'Ukuran F4 Folio',
    price: 350,
    originalPrice: 400,
    discount: '12%',
    sold: '1.9k',
    rating: 4.7,
    reviewsCount: 160,
    partnerId: 'vendor-1',
    partnerName: 'Fotokopi & Percetakan Berkah Ilahi',
    location: 'Gerbang UI Depok',
    badge: 'Star+',
    isFreeShipping: false,
    thumbnail: '📄',
    stock: 500,
    images: [
      { id: 1, label: 'Ukuran F4 Folio Asli', icon: '📄', desc: 'Dimensi 21.5 x 33 cm standar dekanat' },
      { id: 2, label: 'Kertas Sinar Dunia 80gr', icon: '📦', desc: 'Tebal dan tidak tembus tinta cap stempel' },
      { id: 3, label: 'Cetak Dokumen Surat', icon: '📝', desc: 'Cocok untuk surat permohonan beasiswa' },
      { id: 4, label: 'Bebas Lipatan', icon: '🛡️', desc: 'Diserahkan dalam kondisi lurus rapi' }
    ],
    variations: [
      {
        name: 'Format Cetak',
        key: 'printFormat',
        options: [
          { label: 'Hitam Putih Administrasi', priceAdd: 0 },
          { label: 'Full Color (Cap Stempel & Tanda Tangan)', priceAdd: 650 }
        ]
      }
    ],
    specs: {
      'Kategori': 'Kertas Dokumen Kantor',
      'Dimensi': '21.5 cm x 33 cm (F4 / Folio)',
      'Gramatur': '80 GSM Extra Bright',
      'Penggunaan': 'Surat Keterangan Lulus, Beasiswa, Akta Magang'
    },
    description: `Ukuran kertas F4/Folio standar yang disyaratkan oleh loket tata usaha fakultas, surat rektorat, dan administrasi beasiswa luar negeri.`,
    reviews: [
      {
        id: 'rev-1',
        userName: 'm***a (Hukum UI)',
        avatar: '👨‍🎓',
        rating: 5,
        date: 'Kemarin',
        variant: 'Full Color (Cap Stempel)',
        content: 'Warna cap stempel universitasnya merah dan biru keluar persis aslinya. Pengajuan magang langsung di-ACC loket TU.'
      }
    ]
  },
  {
    id: 'p11',
    title: 'Cetak Poster / Plotter A3 Tugas Studio Arsitektur & Desain Grafis',
    category: 'Plotter & Desain',
    price: 8000,
    originalPrice: 12000,
    discount: '33%',
    sold: '512',
    rating: 4.9,
    reviewsCount: 110,
    partnerId: 'vendor-3',
    partnerName: 'Ganesa Digital Copy & Hardcover Center',
    location: 'Jl. Boulevard Kampus',
    badge: 'Mall',
    isFreeShipping: true,
    thumbnail: '🎨',
    stock: 80,
    images: [
      { id: 1, label: 'Warna Vivid 2400 DPI', icon: '🎨', desc: 'Gradasi halus untuk karya studio DKV' },
      { id: 2, label: 'Art Paper Tebal 260gr', icon: '🖼️', desc: 'Tebal kaku seperti karton foto' },
      { id: 3, label: 'Kertas Kalkir Arsitek', icon: '📐', desc: 'Transparan khusus denah gambar kerja' },
      { id: 4, label: 'Tabung Selongsong Selubung', icon: '📦', desc: 'Opsi pelindung anti-lecek' }
    ],
    variations: [
      {
        name: 'Ukuran Dimensi Kertas',
        key: 'paperSize',
        options: [
          { label: 'A3 (29.7 x 42 cm)', priceAdd: 0 },
          { label: 'A2 (42 x 59.4 cm)', priceAdd: 17000 },
          { label: 'A1 (59.4 x 84.1 cm)', priceAdd: 37000 }
        ]
      },
      {
        name: 'Jenis Bahan Material',
        key: 'materialType',
        options: [
          { label: 'Art Paper 260gr (Glossy Mengkilap)', priceAdd: 0 },
          { label: 'Matte Paper (Doff Elegan)', priceAdd: 2000 },
          { label: 'Kertas Kalkir Transparan (Denah Arsitek)', priceAdd: 4000 }
        ]
      }
    ],
    specs: {
      'Kategori': 'Poster & Gambar Kerja',
      'Resolusi Mesin': '2400 x 1200 DPI High Fidelity Plotter',
      'Tinta': 'Epson UltraChrome Pro 9 Warna (Tahan Pudar)',
      'Aplikasi': 'Poster Seminar Hasil, Pameran Studio, Denah Bangunan'
    },
    description: `Cetak poster ilmiah seminar hasil dan gambar kerja arsitektur beresolusi ultra-tinggi. Garis denah tertipis (0.02 mm) tercetak tajam tanpa putus.`,
    reviews: [
      {
        id: 'rev-1',
        userName: 'f***y (Arsitektur UI)',
        avatar: '👨‍🎨',
        rating: 5,
        date: '4 hari lalu',
        variant: 'A1 (59.4 x 84.1 cm), Kertas Kalkir Transparan',
        content: 'Garis denah arsitektur 1:100 tercetak sangat presisi. Plotter Ganesa emang andalan anak arsitek!'
      }
    ]
  },
  {
    id: 'p12',
    title: 'Print Kilat Draf Darurat Sidang Buka Sampai Jam 02.00 Subuh',
    category: 'Emergency Print Subuh',
    price: 400,
    originalPrice: 500,
    discount: '20%',
    sold: '2.1k',
    rating: 4.9,
    reviewsCount: 380,
    partnerId: 'vendor-2',
    partnerName: 'Printer Kosan Mas Dimas',
    location: 'Komp. Kosan Melati No. 4',
    badge: 'Mitra',
    isFreeShipping: true,
    thumbnail: '⚡',
    stock: 500,
    images: [
      { id: 1, label: 'Siaga Subuh Jam 02.00', icon: '⚡', desc: 'Buka saat fotokopi lain sudah tutup' },
      { id: 2, label: 'Siap 5 Menit Jadi', icon: '⏱️', desc: 'Jalur prioritas mesin langsung jalan' },
      { id: 3, label: 'Pengambilan Cepat via PIN', icon: '🔑', desc: 'Tinggal ketuk jendela kasir kosan' },
      { id: 4, label: 'Garansi Bebas Antre', icon: '🛡️', desc: 'Dokumen sudah dibungkus rapi' }
    ],
    variations: [
      {
        name: 'Jam Pengambilan',
        key: 'pickupTimeSlot',
        options: [
          { label: 'Malam / Subuh (22.00 - 02.00 WIB)', priceAdd: 0 },
          { label: 'Pagi Buta Sebelum Sidang (06.00 - 07.30 WIB)', priceAdd: 0 }
        ]
      }
    ],
    specs: {
      'Kategori': 'Layanan Cetak Darurat',
      'Jam Operasional': 'Buka setiap hari s/d Jam 02.00 Subuh',
      'Waktu Siap': '5 - 10 Menit Langsung Jadi',
      'Prioritas': 'Antrean #1 Mesin Laser'
    },
    description: `Layanan darurat bagi mahasiswa yang baru menyelesaikan revisi draf skripsi di malam hari menjelang sidang esok pagi. Bebas panik, berkas siap diambil sebelum matahari terbit!`,
    reviews: [
      {
        id: 'rev-1',
        userName: 'g***a (Ilmu Komputer)',
        avatar: '👨‍🎓',
        rating: 5,
        date: 'Kemarin Subuh (01:15)',
        variant: 'Malam / Subuh',
        content: 'Jam 1 subuh baru kelar bab 5, kirim file lewat LapakPrint, jam 01.20 udah bisa diambil di kos Mas Dimas. Penyelamat hidup beneran!'
      }
    ]
  },
  {
    id: 'p13',
    title: 'Cetak Piagam / Sertifikat Seminar Kertas Linen Jepang 230gr Tebal',
    category: 'Sertifikat & Piagam',
    price: 4000,
    originalPrice: 6000,
    discount: '33%',
    sold: '4.2k',
    rating: 4.9,
    reviewsCount: 388,
    partnerId: 'vendor-1',
    partnerName: 'Fotokopi & Percetakan Berkah Ilahi',
    location: 'Gerbang UI Depok',
    badge: 'Star+',
    isFreeShipping: true,
    thumbnail: '🏆',
    stock: 200,
    images: [
      { id: 1, label: 'Kertas Linen Bertekstur', icon: '🏆', desc: 'Serat garis linen Jepang elegan & mewah' },
      { id: 2, label: 'Warna Tajam CMYK Laser', icon: '🖨️', desc: 'Tinta laser tidak luntur terkena air' },
      { id: 3, label: 'Map Ijazah Beludru', icon: '📁', desc: 'Opsi map sertifikat emboss emas' },
      { id: 4, label: 'Potong Presisi Siku', icon: '📐', desc: 'Ukuran A4 presisi mesin pemotong hidrolik' }
    ],
    variations: [
      {
        name: 'Jenis Kertas',
        key: 'certPaperType',
        options: [
          { label: 'Linen Jepang 230gr (Serat Garis)', priceAdd: 0 },
          { label: 'Art Carton 260gr (Glossy Mengkilap)', priceAdd: 0 },
          { label: 'Concorde Putih Tulang 220gr', priceAdd: 500 }
        ]
      },
      {
        name: 'Pelengkap Tambahan',
        key: 'certAccessory',
        options: [
          { label: 'Tanpa Map (Lembaran Saja)', priceAdd: 0 },
          { label: 'Plus Plastik Pelindung Seal', priceAdd: 500 },
          { label: 'Plus Map Beludru Embos Emas', priceAdd: 15000 }
        ]
      }
    ],
    specs: {
      'Kategori': 'Sertifikat & Penghargaan',
      'Ukuran': 'A4 (21 x 29.7 cm)',
      'Bahan Kertas': 'Linen Jepang Premium 230 GSM',
      'Teknologi Cetak': 'Fuji Xerox Production Press',
      'Kelebihan': 'Tekstur anyaman garis timbul mewah'
    },
    description: `Cetak piagam penghargaan, sertifikat seminar nasional, workshop BEM, dan kelulusan pelatihan kepanitiaan. Menggunakan kertas Linen Jepang bertekstur elegan yang memberikan kesan resmi dan berkelas.`,
    reviews: [
      {
        id: 'rev-1',
        userName: 'd***a (Ketua Pelaksana BEM)',
        avatar: '👩‍🎓',
        rating: 5,
        date: 'Kemarin',
        variant: 'Linen Jepang 230gr, Plus Plastik Pelindung Seal',
        content: 'Hasil cetak sertifikat webinar nasional kami sangat memuaskan, tekstur linennya terasa mewah dan tebal.'
      }
    ]
  },
  {
    id: 'p14',
    title: 'Jilid Soft Cover Lem Panas (Perfect Binding) Modul Kuliah & Buku Ajar',
    category: 'Buku & Modul Kuliah',
    price: 18000,
    originalPrice: 24000,
    discount: '25%',
    sold: '1.8k',
    rating: 4.8,
    reviewsCount: 220,
    partnerId: 'vendor-3',
    partnerName: 'Ganesa Digital Copy & Hardcover Center',
    location: 'Jl. Boulevard Kampus',
    badge: 'Mall',
    isFreeShipping: true,
    thumbnail: '📚',
    stock: 40,
    images: [
      { id: 1, label: 'Punggung Kotak Sempurna', icon: '📚', desc: 'Lem panas rekat kuat standar gramedia' },
      { id: 2, label: 'Cover Full Color Glossy/Doff', icon: '🎨', desc: 'Cover tebal 260gr dilaminasi' },
      { id: 3, label: 'Kertas Bookpaper Ringan', icon: '📖', desc: 'Nyaman dibaca tidak bikin mata lelah' },
      { id: 4, label: 'Finishing Trimming Rapi', icon: '✂️', desc: 'Sisi buku dipotong presisi 3 sisi' }
    ],
    variations: [
      {
        name: 'Jenis Laminasi Cover',
        key: 'coverLamination',
        options: [
          { label: 'Laminasi Doff (Matte Mewah)', priceAdd: 0 },
          { label: 'Laminasi Glossy (Mengkilap Cerah)', priceAdd: 0 }
        ]
      },
      {
        name: 'Bahan Kertas Isi',
        key: 'innerPaper',
        options: [
          { label: 'Bookpaper 72gr (Ringan Khas Novel)', priceAdd: 0 },
          { label: 'HVS Putih 70gr', priceAdd: 0 },
          { label: 'HVS 80gr PaperOne', priceAdd: 4000 }
        ]
      }
    ],
    specs: {
      'Kategori': 'Penjilidan Buku Penerbit',
      'Metode': 'Lem Panas Otomatis (Perfect Hot Glue Binding)',
      'Ketebalan Buku': 'Maksimal s.d 400 Halaman',
      'Cover': 'Art Carton 260gr + Lamination Film'
    },
    description: `Penjilidan buku ajar dosen, diktat praktikum, dan novel tugas sastra dengan metode lem panas presisi. Punggung buku berbentuk kotak rapi seperti buku terbitan toko buku Gramedia.`,
    reviews: [
      {
        id: 'rev-1',
        userName: 'b***o (Dosen Muda FIB)',
        avatar: '👨‍🎓',
        rating: 5,
        date: '3 hari lalu',
        variant: 'Laminasi Doff, Bookpaper 72gr',
        content: 'Hasil modul kuliah semester ini sangat rapi, lem panasnya kuat dibuka lebar tidak ada lembaran yang tanggal.'
      }
    ]
  },
  {
    id: 'p15',
    title: 'Print Stiker Vinyl Waterproof Die Cut BEM & Acara Kepanitiaan Kampus',
    category: 'Stiker & Merchandise',
    price: 12000,
    originalPrice: 16000,
    discount: '25%',
    sold: '5.6k',
    rating: 4.9,
    reviewsCount: 460,
    partnerId: 'vendor-1',
    partnerName: 'Fotokopi & Percetakan Berkah Ilahi',
    location: 'Gerbang UI Depok',
    badge: 'Star+',
    isFreeShipping: true,
    thumbnail: '🏷️',
    stock: 120,
    images: [
      { id: 1, label: 'Stiker Vinyl Tahan Air', icon: '🏷️', desc: 'Bahan plastik vinyl anti sobek dan anti air' },
      { id: 2, label: 'Pisau Cutting Presisi', icon: '✂️', desc: 'Potong pola sesuai bentuk logo (Die-Cut)' },
      { id: 3, label: 'Laminasi Glossy Tahan Gores', icon: '✨', desc: 'Awet ditempel di laptop atau helm' },
      { id: 4, label: 'Lembaran A3+ Isi Banyak', icon: '📦', desc: 'Bisa muat puluhan stiker per lembar' }
    ],
    variations: [
      {
        name: 'Model Pemotongan',
        key: 'cuttingModel',
        options: [
          { label: 'Kiss Cut (Tinggal Cabut di Lembaran A3+)', priceAdd: 0 },
          { label: 'Die Cut (Potong Lepas Satuan per Stiker)', priceAdd: 3000 }
        ]
      },
      {
        name: 'Pilihan Bahan',
        key: 'stickerMaterial',
        options: [
          { label: 'Vinyl Putih Glossy Tahan Air', priceAdd: 0 },
          { label: 'Vinyl Doff Matte Elegan', priceAdd: 0 },
          { label: 'Vinyl Transparan Bening', priceAdd: 2000 }
        ]
      }
    ],
    specs: {
      'Kategori': 'Stiker Merchandise Kampus',
      'Area Cetak': 'A3+ (31 x 47 cm)',
      'Ketahanan': 'Waterproof, Tahan Sinar UV, Anti Robek',
      'Lem': 'Super Strong Adhesive (Tidak meninggalkan bekas residu)'
    },
    description: `Cetak stiker kepanitiaan ospek, acara kampus, dan merchandise organisasi mahasiswa. Tahan air, tidak luntur bila terkena hujan atau dicuci, sangat cocok ditempel di laptop, tumbler minum, dan motor.`,
    reviews: [
      {
        id: 'rev-1',
        userName: 'k***n (Panitia Ospek)',
        avatar: '👨‍🎓',
        rating: 5,
        date: 'Kemarin',
        variant: 'Die Cut, Vinyl Putih Glossy',
        content: 'Stikernya bagus banget! Dicoba tempel di tumbler botol minum terus dicuci berkali-kali warnanya tetap pekat gak mengelupas.'
      }
    ]
  },
  {
    id: 'p16',
    title: 'Cetak Brosur & Pamflet Acara Kampus Full Color A5 Lipat Dua / Tiga',
    category: 'Brosur & Publikasi',
    price: 1500,
    originalPrice: 2000,
    discount: '25%',
    sold: '7.8k',
    rating: 4.8,
    reviewsCount: 290,
    partnerId: 'vendor-3',
    partnerName: 'Ganesa Digital Copy & Hardcover Center',
    location: 'Jl. Boulevard Kampus',
    badge: 'Mall',
    isFreeShipping: false,
    thumbnail: '📰',
    stock: 500,
    images: [
      { id: 1, label: 'Art Paper Halus Mengkilap', icon: '📰', desc: 'Kertas brosur 150gr warna berkilau' },
      { id: 2, label: 'Lipatan Rel Mesin Presisi', icon: '📐', desc: 'Garis lipatan lurus tidak pecah' },
      { id: 3, label: 'Cetak 2 Sisi Bolak-Balik', icon: '🔄', desc: 'Akurasi register kedua sisi sempurna' },
      { id: 4, label: 'Packing Per 100 Lembar', icon: '📦', desc: 'Diberi tali dan kemasan rapi' }
    ],
    variations: [
      {
        name: 'Model Brosur',
        key: 'brochureFold',
        options: [
          { label: 'Lembaran A5 Tanpa Lipat (Flyer)', priceAdd: 0 },
          { label: 'Lipat 2 (Bifold)', priceAdd: 200 },
          { label: 'Lipat 3 Z-Fold / Trifold', priceAdd: 400 }
        ]
      },
      {
        name: 'Ketebalan Kertas',
        key: 'brochureGram',
        options: [
          { label: 'Art Paper 120gr Ekonomis', priceAdd: 0 },
          { label: 'Art Paper 150gr Standar Pameran', priceAdd: 300 }
        ]
      }
    ],
    specs: {
      'Kategori': 'Publikasi Promosi Kampus',
      'Ukuran': 'A5 (14.8 x 21 cm)',
      'Finishing': 'Creasing Mesin (Anti Pecah Warna Saat Dilipat)'
    },
    description: `Cetak brosur pamflet publikasi pameran seni, kompetisi olahraga mahasiswa, open recruitment organisasi, dan seminar kewirausahaan.`,
    reviews: [
      {
        id: 'rev-1',
        userName: 'm***r (Himpunan Mahasiswa)',
        avatar: '👩‍🎓',
        rating: 5,
        date: '4 hari lalu',
        variant: 'Lipat 2 (Bifold), Art Paper 150gr',
        content: 'Warna pamfletnya cerah dan tajam. Cocok banget buat dibagikan saat CFD kampus.'
      }
    ]
  },
  {
    id: 'p17',
    title: 'Laminating Press Panas Dokumen Ijazah & Transkrip Nilai Anti-Air 100 Mikron',
    category: 'Laminating & Dokumen Penting',
    price: 4000,
    originalPrice: 5000,
    discount: '20%',
    sold: '3.9k',
    rating: 4.9,
    reviewsCount: 410,
    partnerId: 'vendor-1',
    partnerName: 'Fotokopi & Percetakan Berkah Ilahi',
    location: 'Gerbang UI Depok',
    badge: 'Star+',
    isFreeShipping: false,
    thumbnail: '🛡️',
    stock: 300,
    images: [
      { id: 1, label: 'Press Panas Bebas Gelembung', icon: '🛡️', desc: 'Mesin 4 roller laminasi rapat sempurna' },
      { id: 2, label: 'Plastik Tebal 100 Mikron', icon: '📄', desc: 'Melindungi dari basah, debu, dan lipatan' },
      { id: 3, label: 'Tepi Siku Bulat Aman', icon: '✂️', desc: 'Pojokan dipotong oval tidak tajam' },
      { id: 4, label: 'Bening Kristal Transparan', icon: '✨', desc: 'Teks dan tanda tangan terbaca sangat jernih' }
    ],
    variations: [
      {
        name: 'Ukuran Dokumen',
        key: 'lamSize',
        options: [
          { label: 'Ukuran A4 Standar Ijazah', priceAdd: 0 },
          { label: 'Ukuran F4 / Folio', priceAdd: 500 }
        ]
      },
      {
        name: 'Ketebalan Plastik',
        key: 'lamThickness',
        options: [
          { label: '100 Mikron (Standar Lentur Rapi)', priceAdd: 0 },
          { label: '125 Mikron (Ekstra Tebal & Kaku)', priceAdd: 1000 }
        ]
      }
    ],
    specs: {
      'Kategori': 'Perlindungan Berkas Permanen',
      'Ketebalan Mika': '100 - 125 Micron Thermal Film',
      'Suhu Mesin': '115°C - 130°C Rekat Solid',
      'Garansi': 'Bebas Kerut & Bebas Gelembung Udara'
    },
    description: `Lindungi sertifikat kelulusan, fotokopi ijazah terlegalisir, kartu keluarga, dan transkrip nilai akademik dari risiko terkena air, rayap, atau sobek.`,
    reviews: [
      {
        id: 'rev-1',
        userName: 'i***a (Wisudawati 2026)',
        avatar: '👩‍🎓',
        rating: 5,
        date: 'Minggu lalu',
        variant: 'Ukuran A4 Standar Ijazah, 125 Mikron',
        content: 'Press laminatingnya rapat banget, gak ada gelembung angin sama sekali. Dokumen ijazah jadi aman tersimpan.'
      }
    ]
  },
  {
    id: 'p18',
    title: 'Paket Cetak Naskah Tesis Magister S2 Cover Kulit Hitam Emas Mewah',
    category: 'Tesis Pascasarjana',
    price: 65000,
    originalPrice: 85000,
    discount: '24%',
    sold: '420',
    rating: 5.0,
    reviewsCount: 88,
    partnerId: 'vendor-3',
    partnerName: 'Ganesa Digital Copy & Hardcover Center',
    location: 'Jl. Boulevard Kampus',
    badge: 'Mall',
    isFreeShipping: true,
    thumbnail: '👑',
    stock: 15,
    images: [
      { id: 1, label: 'Cover Kulit Sintetis Oscar', icon: '👑', desc: 'Tekstur kulit mewah hitam doff' },
      { id: 2, label: 'Hotprint Plat Emas Murni', icon: '✨', desc: 'Huruf dan logo dekanat mengkilap tebal' },
      { id: 3, label: 'Jahit Benang Per Kuras', icon: '🧵', desc: 'Kuat hingga 300+ halaman naskah' },
      { id: 4, label: 'Pita Pembatas Ganda', icon: '🎗️', desc: '2 helai pita pembatas buku' }
    ],
    variations: [
      {
        name: 'Warna Kulit Sampul',
        key: 'leatherColor',
        options: [
          { label: 'Hitam Doff Klasik Pascasarjana', priceAdd: 0 },
          { label: 'Biru Navy Tua Eksekutif', priceAdd: 0 },
          { label: 'Cokelat Tua Antik', priceAdd: 3000 }
        ]
      },
      {
        name: 'Aksesori Siku Sampul',
        key: 'cornerOption',
        options: [
          { label: 'Sudut Standar Rapi', priceAdd: 0 },
          { label: 'Plus Corner Protector Kuningan Emas', priceAdd: 5000 }
        ]
      }
    ],
    specs: {
      'Kategori': 'Tesis S2 / Disertasi S3',
      'Material Cover': 'Synthetic Leather Oscar Grade A',
      'Karton Dalam': 'Karton Belanda No. 40 Super Kaku',
      'Standar': 'Perpustakaan Pascasarjana Universitas'
    },
    description: `Paket jilid hardcover eksklusif untuk naskah Tesis Magister (S2) dan Disertasi Doktoral (S3). Dilapisi bahan kulit sintetis impor dengan sentuhan embos foil emas berkilau.`,
    reviews: [
      {
        id: 'rev-1',
        userName: 'p***a (Mahasiswa Magister Manajemen)',
        avatar: '👨‍🎓',
        rating: 5,
        date: 'Kemarin',
        variant: 'Hitam Doff Klasik, Plus Corner Protector',
        content: 'Kualitasnya luar biasa! Dosen penguji bahkan memuji kerapian naskah tesis saya saat sidang akhir.'
      }
    ]
  },
  {
    id: 'p19',
    title: 'Cetak Booklet Proposal Sponsorship Ormawa Staples Tengah A4 Lipat',
    category: 'Proposal & Booklet',
    price: 6000,
    originalPrice: 8000,
    discount: '25%',
    sold: '1.4k',
    rating: 4.8,
    reviewsCount: 165,
    partnerId: 'vendor-1',
    partnerName: 'Fotokopi & Percetakan Berkah Ilahi',
    location: 'Gerbang UI Depok',
    badge: 'Star+',
    isFreeShipping: true,
    thumbnail: '📑',
    stock: 60,
    images: [
      { id: 1, label: 'Jilid Staples Tengah Saddle Stitch', icon: '📑', desc: 'Staples baja di lipatan tengah buku' },
      { id: 2, label: 'Cover Art Carton Tebal', icon: '🎨', desc: 'Cover 210gr warna glossy elegan' },
      { id: 3, label: 'Halaman Terbuka Rata', icon: '📖', desc: 'Nyaman dibaca calon sponsor perusahaan' },
      { id: 4, label: 'Packing Kardus Tebal', icon: '📦', desc: 'Dokumen tidak melengkung saat dibawa' }
    ],
    variations: [
      {
        name: 'Jumlah Halaman Isi',
        key: 'pageRange',
        options: [
          { label: '8 - 12 Halaman (Proposal Singkat)', priceAdd: 0 },
          { label: '16 - 24 Halaman (Proposal Lengkap)', priceAdd: 3000 }
        ]
      },
      {
        name: 'Kertas Isi',
        key: 'bookletPaper',
        options: [
          { label: 'HVS 80gr PaperOne Warna Tajam', priceAdd: 0 },
          { label: 'Art Paper 120gr Full Mengkilap', priceAdd: 2500 }
        ]
      }
    ],
    specs: {
      'Kategori': 'Booklet Sponsorship Organisasi',
      'Metode Jilid': 'Saddle Stitching (Staples Tengah Ganda)',
      'Ukuran Buku': 'A4 Tertutup (A3 Terbuka)'
    },
    description: `Cetak proposal pengajuan dana sponsor ke perusahaan dan instansi pemerintah. Bentuk booklet buku majalah yang rapi dan profesional meningkatkan persentase proposal di-ACC oleh pihak sponsor.`,
    reviews: [
      {
        id: 'rev-1',
        userName: 'f***n (Divisi Danus BEM)',
        avatar: '👨‍🎓',
        rating: 5,
        date: '5 hari lalu',
        variant: '16 - 24 Halaman, HVS 80gr PaperOne',
        content: 'Proposalnya kelihatan profesional banget waktu diajukan ke kantor mitra sponsor, langsung goal!'
      }
    ]
  },
  {
    id: 'p20',
    title: 'Print Transparansi Mika OHP Laser Presentasi & Skema Fisika',
    category: 'Transparansi & Mika',
    price: 3500,
    originalPrice: 4500,
    discount: '22%',
    sold: '850',
    rating: 4.7,
    reviewsCount: 84,
    partnerId: 'vendor-2',
    partnerName: 'Printer Kosan Mas Dimas',
    location: 'Komp. Kosan Melati',
    badge: 'Mitra',
    isFreeShipping: false,
    thumbnail: '📽️',
    stock: 150,
    images: [
      { id: 1, label: 'Plastik Film Bening Khusus Laser', icon: '📽️', desc: 'Tahan panas mesin printer laser' },
      { id: 2, label: 'Kontras Hitam Pekat', icon: '🔍', desc: 'Garis skema rangkaian listrik sangat tajam' },
      { id: 3, label: 'Transparansi Kristal', icon: '✨', desc: 'Proyeksi lampu OHP tembus 100%' },
      { id: 4, label: 'Dipisah Kertas Pelindung', icon: '📄', desc: 'Bebas goresan antar lembaran mika' }
    ],
    variations: [
      {
        name: 'Mode Tinta',
        key: 'transparencyColor',
        options: [
          { label: 'Hitam Putih Pekat (Diagram & Rumus)', priceAdd: 0 },
          { label: 'Warna Transparan Tajam', priceAdd: 1500 }
        ]
      }
    ],
    specs: {
      'Kategori': 'Film Plastik Proyeksi',
      'Ketebalan': '100 Micron Heat Resistant',
      'Resolusi': '1200 DPI High Density Toner'
    },
    description: `Cetak lembaran mika transparansi khusus proyektor OHP, skema PCB rangkaian elektro, dan overlay gambar anatomi kedokteran.`,
    reviews: [
      {
        id: 'rev-1',
        userName: 'r***y (Teknik Fisika)',
        avatar: '👨‍🎓',
        rating: 5,
        date: 'Kemarin',
        variant: 'Hitam Putih Pekat',
        content: 'Toner melekat kuat di plastiknya, tidak rontok atau mengelupas saat dipakai di lampu proyektor.'
      }
    ]
  },
  {
    id: 'p21',
    title: 'Cetak ID Card Peserta & Name Tag Panitia Seminar Kertas Tebal + Tali',
    category: 'ID Card & Kepanitiaan',
    price: 5500,
    originalPrice: 7000,
    discount: '21%',
    sold: '6.1k',
    rating: 4.9,
    reviewsCount: 520,
    partnerId: 'vendor-1',
    partnerName: 'Fotokopi & Percetakan Berkah Ilahi',
    location: 'Gerbang UI Depok',
    badge: 'Star+',
    isFreeShipping: true,
    thumbnail: '🪪',
    stock: 400,
    images: [
      { id: 1, label: 'Paket Lengkap Name Tag', icon: '🪪', desc: 'Termasuk kertas tebal, mika holder & tali' },
      { id: 2, label: 'Warna Tali Lanyard Beragam', icon: '🎗️', desc: 'Biru, Merah, Hitam, Hijau' },
      { id: 3, label: 'Kertas Art Carton 260gr', icon: '📄', desc: 'Tebal kaku tidak gampang melipat' },
      { id: 4, label: 'Klip Penjepit Besi Anti Karat', icon: '📎', desc: 'Kait besi kuat tidak mudah lepas' }
    ],
    variations: [
      {
        name: 'Warna Tali Lanyard',
        key: 'lanyardColor',
        options: [
          { label: 'Tali Biru Kampus', priceAdd: 0 },
          { label: 'Tali Hitam Elegan', priceAdd: 0 },
          { label: 'Tali Merah Marun', priceAdd: 0 },
          { label: 'Tali Hijau Tosca', priceAdd: 0 }
        ]
      }
    ],
    specs: {
      'Kategori': 'Perlengkapan Acara Mahasiswa',
      'Ukuran Holder': 'Ukuran B2 (8 x 12.5 cm)',
      'Kelengkapan': 'Cetak 2 Sisi + Plastik Mika Holder + Tali Lanyard'
    },
    description: `Paket name tag ID card untuk panitia dan peserta seminar, workshop, ospek, dan perlombaan kampus. Sudah siap pakai lengkap dengan tali lanyard dan holder mika bening tebal.`,
    reviews: [
      {
        id: 'rev-1',
        userName: 'l***a (Divisi Acara Seminar)',
        avatar: '👩‍🎓',
        rating: 5,
        date: '2 hari lalu',
        variant: 'Tali Biru Kampus',
        content: 'Penyelamat acara panitia! Pesan 80 pcs sore hari, malamnya sudah siap diambil lengkap dengan talinya.'
      }
    ]
  },
  {
    id: 'p22',
    title: 'Print Foto Wisuda & Cetak Kanvas Mini A4 Termasuk Bingkai Minimalis',
    category: 'Foto Wisuda & Kenangan',
    price: 28000,
    originalPrice: 38000,
    discount: '26%',
    sold: '940',
    rating: 4.9,
    reviewsCount: 180,
    partnerId: 'vendor-3',
    partnerName: 'Ganesa Digital Copy & Hardcover Center',
    location: 'Jl. Boulevard Kampus',
    badge: 'Mall',
    isFreeShipping: true,
    thumbnail: '🖼️',
    stock: 30,
    images: [
      { id: 1, label: 'Termasuk Frame Kayu Minimalis', icon: '🖼️', desc: 'Bingkai kayu kokoh tanpa kaca aman dikirim' },
      { id: 2, label: 'Kertas Foto Silky Luster', icon: '✨', desc: 'Tekstur kulit jeruk tidak silau lampu' },
      { id: 3, label: 'Warna Foto Kulit Alami', icon: '📸', desc: 'Kalibrasi warna studio foto profesional' },
      { id: 4, label: 'Gantungan Dinding & Meja', icon: '📐', desc: 'Bisa digantung atau ditaruh di meja belajar' }
    ],
    variations: [
      {
        name: 'Warna Bingkai Minimalis',
        key: 'frameColor',
        options: [
          { label: 'Bingkai Hitam Minimalis', priceAdd: 0 },
          { label: 'Bingkai Putih Bersih', priceAdd: 0 },
          { label: 'Bingkai Kayu Natural Cokelat', priceAdd: 2000 }
        ]
      }
    ],
    specs: {
      'Kategori': 'Pajangan Dinding & Meja',
      'Ukuran Cetak': 'A4 (21 x 29.7 cm)',
      'Kertas': 'Silky Luster Photo Paper 260 GSM',
      'Frame': 'Fiber Polywood Ringan & Tahan Rayap'
    },
    description: `Abadikan momen kelulusan sidang skripsi dan foto wisuda bersama orang tua dan sahabat. Dicetak dengan kertas foto luster tahan pudar hingga puluhan tahun lengkap dengan frame minimalis siap pajang.`,
    reviews: [
      {
        id: 'rev-1',
        userName: 'v***a (Alumni FKM)',
        avatar: '👩‍🎓',
        rating: 5,
        date: 'Kemarin',
        variant: 'Bingkai Hitam Minimalis',
        content: 'Framenya rapi banget dan kertas fotonya tekstur kulit jeruk mewah. Hadiah wisuda yang pas buat orang tua di kampung.'
      }
    ]
  },
  {
    id: 'p23',
    title: 'Jilid Baut Metal Chicago Screw Portofolio Desain Grafis & Arsitektur',
    category: 'Jilid Baut Portofolio',
    price: 16000,
    originalPrice: 20000,
    discount: '20%',
    sold: '610',
    rating: 4.9,
    reviewsCount: 95,
    partnerId: 'vendor-3',
    partnerName: 'Ganesa Digital Copy & Hardcover Center',
    location: 'Jl. Boulevard Kampus',
    badge: 'Mall',
    isFreeShipping: true,
    thumbnail: '🔩',
    stock: 25,
    images: [
      { id: 1, label: 'Baut Metal Stainless Steel', icon: '🔩', desc: 'Bisa dibongkar pasang jika ada revisi gambar' },
      { id: 2, label: 'Buka Buku Flat Memanjang', icon: '📐', desc: 'Cocok untuk gambar kerja arsitektur lanskap' },
      { id: 3, label: 'Cover Hard Mika Tebal', icon: '🛡️', desc: 'Pelindung depan belakang super kokoh' },
      { id: 4, label: 'Kapasitas Baut Beragam', icon: '⚙️', desc: 'Tersedia baut pendek s/d panjang' }
    ],
    variations: [
      {
        name: 'Warna Baut Metal',
        key: 'screwColor',
        options: [
          { label: 'Chrome Silver Anti Karat', priceAdd: 0 },
          { label: 'Gold Brass Elegan', priceAdd: 2000 },
          { label: 'Matte Black Minimalis', priceAdd: 2000 }
        ]
      }
    ],
    specs: {
      'Kategori': 'Penjilidan Khusus Desain',
      'Tipe Baut': 'Chicago Screw Metal Binding',
      'Keunggulan': 'Buku dapat dibongkar dan diselipkan halaman baru kapan saja'
    },
    description: `Metode jilid baut metal profesional favorit mahasiswa arsitektur dan desain grafis. Memberikan kesan industrial modern dan sangat fleksibel karena baut dapat dibuka kapan pun bila dosen meminta revisi satu halaman gambar.`,
    reviews: [
      {
        id: 'rev-1',
        userName: 'a***m (Arsitektur)',
        avatar: '👨‍🎓',
        rating: 5,
        date: '3 hari lalu',
        variant: 'Chrome Silver Anti Karat',
        content: 'Solusi terbaik buat jilid tugas besar arsitektur. Waktu disuruh revisi denah tinggal obeng bautnya ganti 1 lembar tanpa harus bayar jilid ulang dari awal.'
      }
    ]
  },
  {
    id: 'p24',
    title: 'Cetak Blocknote / Seminar Kit Kampus Custom Grid Dot 50 Lembar Jilid Lem',
    category: 'Blocknote & Seminar Kit',
    price: 7500,
    originalPrice: 10000,
    discount: '25%',
    sold: '3.2k',
    rating: 4.8,
    reviewsCount: 230,
    partnerId: 'vendor-1',
    partnerName: 'Fotokopi & Percetakan Berkah Ilahi',
    location: 'Gerbang UI Depok',
    badge: 'Star+',
    isFreeShipping: true,
    thumbnail: '📒',
    stock: 150,
    images: [
      { id: 1, label: 'Cover Full Color Custom Logo', icon: '📒', desc: 'Cover tebal dengan logo acara kepanitiaan' },
      { id: 2, label: 'Isi Dot Grid / Titik-Titik Halus', icon: '✏️', desc: 'Format catatan rapi ala bullet journal' },
      { id: 3, label: 'Jilid Lem Atas Mudah Disobek', icon: '📄', desc: 'Kertas bisa dilepas bersih tanpa sobekan acak' },
      { id: 4, label: 'Ukuran Pas Masuk Goodie Bag', icon: '🛍️', desc: 'Ukuran A5 pas untuk seminar kit' }
    ],
    variations: [
      {
        name: 'Format Kertas Isi',
        key: 'noteFormat',
        options: [
          { label: 'Dot Grid (Titik-Titik Bullet Journal)', priceAdd: 0 },
          { label: 'Garis Lurus Standar Catatan', priceAdd: 0 },
          { label: 'Polos Bersih (Sketching)', priceAdd: 0 }
        ]
      }
    ],
    specs: {
      'Kategori': 'Buku Catatan Seminar',
      'Ukuran': 'A5 (14.8 x 21 cm)',
      'Jumlah Lembar': '50 Lembar (100 Halaman) HVS 70gr',
      'Cover Depan/Belakang': 'Art Carton 230gr + Kertas Board Belakang'
    },
    description: `Cetak buku catatan blocknote untuk seminar kit kampus, diktat catatan kuliah, dan merchandise pelatihan organisasi. Kertas isi menggunakan format dot grid modern yang sangat disukai mahasiswa untuk mencatat materi dosen.`,
    reviews: [
      {
        id: 'rev-1',
        userName: 'c***a (Panitia National Seminar)',
        avatar: '👩‍🎓',
        rating: 5,
        date: 'Kemarin',
        variant: 'Dot Grid (Titik-Titik)',
        content: 'Peserta seminar pada muji seminar kit-nya, blocknote dot grid-nya rapi dan gampang disobek lem atasnya.'
      }
    ]
  }
];
