# -*- coding: utf-8 -*-
"""
Chapter 2: Business Model Canvas (BMC), Lean Canvas, Financial & Monetization Strategy
"""
import docx
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT
from build_report_core import apply_tnr_run, add_p, add_h1, add_h2, add_h3, add_bullet, create_table_custom

def add_chapter_2(doc):
    # ================= BAB II =================
    add_h1(doc, "BAB II: ANALISIS MODEL BISNIS (BMC DAN LEAN CANVAS)")
    
    add_h2(doc, "2.1 Business Model Canvas (BMC) 9 Blok Terpadu")
    add_p(doc,
        "Untuk memastikan platform LapakPrint memiliki daya tahan ekonomi, skalabilitas operasional, serta proposisi nilai "
        "yang kokoh di tengah persaingan pasar, dirancang sebuah Business Model Canvas (BMC) terpadu. Framework 9 blok ini "
        "membedah bagaimana LapakPrint menciptakan, memberikan, dan menangkap nilai (create, deliver, and capture value) "
        "dari ekosistem percetakan kampus digital."
    )

    headers_bmc = ["Blok BMC", "Komponen Kunci LapakPrint", "Uraian Strategis dan Mekanisme Operasional"]
    data_bmc = [
        ["1. Customer Segments (Segmen Pelanggan)", "Mahasiswa, Civitas Akademika, & Lembaga Kampus",
         "• Mahasiswa S1/S2/S3 yang memerlukan cetak tugas rutin, makalah, laporan praktikum, naskah skripsi/tesis, dan jilid hardcover.\n• Organisasi Mahasiswa (BEM, Himpunan, UKM, Panitia Acara Kampus) untuk cetak banner, poster, pamflet, dan sertifikat.\n• Dosen dan Tenaga Kependidikan untuk modul perkuliahan, soal ujian, dan administrasi fakultas."],
        ["2. Value Propositions (Proposisi Nilai)", "Efisiensi, Kepastian, Kualitas, & Kecerdasan AI",
         "• Bebas Antre Fisik: Pemesanan cetak dilakukan secara daring dari smartphone/laptop di mana saja.\n• Kalkulator Biaya Presisi: Transparansi harga real-time berdasarkan gramatur kertas, tinta warna/BW, dan tipe jilid.\n• Keamanan Data: File diunggah langsung ke cloud tanpa risiko malware/virus flashdisk.\n• AI-Powered Assistant: Asisten pintar Hermes AI dan auto-generator poster terintegrasi."],
        ["3. Channels (Saluran Distribusi)", "Aplikasi Web, Mobile Native, & Gerai Mitra Fisik",
         "• Web Production Vercel (https://lapakprint-app.vercel.app) yang responsif di semua browser ponsel pintar.\n• Aplikasi Native Android APK (LapakPrint.apk) berbasis Capacitor SDK 36.\n• Loket Pengambilan Kilat (Fast-Track Pickup Counter) di gerai percetakan mitra kampus."],
        ["4. Customer Relationships (Hubungan Pelanggan)", "Self-Service, Sistem Notifikasi, & Loyalty Reward",
         "• Alur pemesanan mandiri (automated self-service checkout) dengan status pelacakan berkas secara real-time.\n• Pusat Voucher Diskon Mahasiswa & Promo Khusus Awal Semester/Musim Skripsi.\n• Layanan aduan pelanggan dan jaminan cetak ulang gratis jika terdapat cacat produksi mesin."],
        ["5. Revenue Streams (Arus Pendapatan)", "Komisi Marketplace, Biaya Layanan, & Fitur Premium",
         "• Marketplace Commission Fee: Potongan 5% - 8% dari setiap transaksi yang berhasil diselesaikan mitra gerai.\n• Convenience Fee / Biaya Layanan Platform: Biaya administrasi tetap sebesar Rp500 - Rp1.000 per transaksi checkout.\n• Biaya Desain AI Poster Instan: Monetisasi fitur multimodal generate desain poster premium.\n• Penjualan Ruang Promosi / Featured Outlet untuk gerai percetakan mitra di halaman utama."],
        ["6. Key Resources (Sumber Daya Kunci)", "Infrastruktur Cloud, Intelegensi AI, & Jaringan Mitra",
         "• Aset Teknologi: Repositori kode React/Vite, APK Android, cluster Docker multi-service, API 9router & Gemini.\n• Storage & Basis Data: Storage Cloudinary 5 GB CDN dan Supabase PostgreSQL Database.\n• Jaringan Kemitraan: Toko percetakan dan fotokopi fisik yang terverifikasi di sekeliling area kampus."],
        ["7. Key Activities (Aktivitas Kunci)", "Pengembangan Sistem, Manajemen Kemitraan, & Quality Control",
         "• Pengembangan dan pemeliharaan platform web, native mobile app, dan pipeline AI.\n• Onboarding, kurasi mutu cetak, dan pelatihan sistem kasir/dashboard untuk gerai mitra percetakan.\n• Manajemen kampanye promosi digital kampus dan customer support penyelesaian sengketa transaksi."],
        ["8. Key Partnerships (Kemitraan Kunci)", "Mitra Toko Cetak, Penyedia Pembayaran, & Kampus",
         "• Pemilik UMKM Gerai Fotokopi dan Percetakan di lingkungan sekitar universitas.\n• Payment Gateway & Bank Provider: QRIS Nasional, GoPay, OVO, ShopeePay, dan DANA.\n• Cloud & AI Infrastructure Partners: Vercel, Supabase, Cloudinary, Ngrok, dan Runware AI."],
        ["9. Cost Structure (Struktur Biaya)", "Infrastruktur Server, API Token, & Operasional",
         "• Biaya Server & Gateway: Biaya domain kustom, kuota API cloud AI, dan bandwidth komputasi awan.\n• Biaya Pemasaran: Subsidi voucher potongan cetak perdana mahasiswa dan banner promosi kampus.\n• Biaya Pemeliharaan & Operasional: Lisensi software pendukung, kompensasi tim developer, dan quality control."]
    ]
    col_w_bmc = [Inches(1.5), Inches(1.8), Inches(3.2)]
    create_table_custom(doc, headers_bmc, data_bmc, col_w_bmc)

    add_p(doc,
        "Struktur Business Model Canvas di atas menunjukkan bahwa LapakPrint memiliki model bisnis platform dua sisi "
        "(two-sided marketplace) yang sangat efisien. Platform ini tidak membutuhkan modal besar untuk pengadaan mesin cetak fisik "
        "(asset-light business model), melainkan memberdayakan kapasitas mesin cetak milik mitra UMKM sekitar kampus "
        "yang sering kali menganggur (*idle capacity*) di luar jam sibuk pagi hari."
    )

    add_h2(doc, "2.2 Analisis Lean Canvas LapakPrint")
    add_p(doc,
        "Untuk mempertajam strategi peluncuran produk bagi startup teknologi dan memvalidasi asumsi operasional "
        "secara tangkas (*agile*), dirancang Lean Canvas yang berfokus pada masalah paling krusial, solusi tervalidasi, "
        "serta keunggulan unik yang sulit ditiru (*unfair advantage*)."
    )

    headers_lean = ["Komponen Lean Canvas", "Detail Formulasi Strategis LapakPrint"]
    data_lean = [
        ["1. Top 3 Problems (Masalah Utama)", 
         "1. Waktu terbuang sia-sia akibat antrean fisik di gerai fotokopi kampus (rata-rata 45-90 menit per transaksi).\n2. Format berkas berantakan dan margin bergeser saat file dibuka di komputer gerai percetakan yang berbeda versi.\n3. Ancaman keamanan berkas dan penularan virus trojan/malware melalui colokan flashdisk antar komputer publik."],
        ["2. Customer Segments & Early Adopters", 
         "• Early Adopters: Mahasiswa tingkat akhir yang sedang menempuh skripsi/tugas akhir dan panitia seminar kampus.\n• Target Massal: Seluruh mahasiswa aktif perguruan tinggi yang memiliki kewajiban pengumpulan tugas cetak mingguan."],
        ["3. Unique Value Proposition (UVP)", 
         "'Cetak Tugas Kuliah & Skripsi Hardcover dari HP: Bebas Antre, Format Dokumen Presisi, dan Siap Ambil di Kampus.'"],
        ["4. Solution (Solusi Utama)", 
         "1. Sistem pre-order cetak digital dengan estimasi waktu pengerjaan dan kalkulator harga transparan.\n2. Cloud viewer & compiler yang menjamin hasil cetak persis sama dengan pratinjau dokumen mahasiswa.\n3. Loket pengambilan instan (drive-thru/express pickup) tanpa perlu menunggu operator mencetak di tempat."],
        ["5. Unfair Advantage (Keunggulan Kompetitif)", 
         "• Integrasi Hybrid Multi-Agent AI (Hermes Reasoning Agent di Docker + Google Gemini Vision + Runware Image Diffusion).\n• Arsitektur hybrid storage nir-beban biaya (Cloudinary 5 GB CDN + Supabase 1 GB DB).\n• Paket binary APK native Android independen yang dapat dipasang langsung tanpa potongan biaya Google Play Store."],
        ["6. Revenue Streams", 
         "• Komisi transaksi 5%-8% per cetakan berhasil.\n• Biaya platform (platform fee) Rp500 per transaksi checkout.\n• Fitur premium AI Poster Creator dan Express Priority Printing."],
        ["7. Cost Structure", 
         "• Biaya sewa domain kustom tahunan (~Rp20.000 - Rp150.000/tahun).\n• Konsumsi token API AI (dioptimasi menggunakan akun bisnis Zoho dan round-robin failover).\n• Biaya operasional customer service dan promosi voucher kampus."],
        ["8. Key Metrics (Metrik Kunci)", 
         "• GMV (Gross Merchandise Value): Total perputaran uang transaksi cetak per bulan.\n• Order Completion Time: Rata-rata waktu dari pembayaran diverifikasi hingga dokumen siap diambil (< 30 menit untuk print kilat).\n• Customer Repeat Rate: Persentase mahasiswa yang melakukan order ulang dalam 1 semester (> 75%).\n• Active Mitra Outlets: Jumlah gerai percetakan mitra yang aktif memproses antrean."],
        ["9. Channels", 
         "• Mulut ke mulut (word of mouth) komunitas mahasiswa dan grup WhatsApp angkatan.\n• Kerja sama resmi dengan Badan Eksekutif Mahasiswa (BEM) dan Himpunan Mahasiswa Jurusan (HMJ).\n• Banner promosi QR Code di mading fakultas dan meja kantin kampus."]
    ]
    col_w_lean = [Inches(2.2), Inches(4.3)]
    create_table_custom(doc, headers_lean, data_lean, col_w_lean)

    add_h2(doc, "2.3 Strategi Monetisasi, Unit Economics, dan Proyeksi Margin")
    add_p(doc,
        "Kelayakan ekonomi platform LapakPrint dianalisis melalui pendekatan unit economics per transaksi. "
        "Dengan mengadopsi model bisnis komisi berbasis volume tinggi dan biaya tetap rendah, LapakPrint mampu "
        "mencapai titik impas (*break-even point*) secara cepat tanpa memerlukan suntikan modal ventura yang masif."
    )

    headers_econ = ["Komponen Transaksi", "Cetak Tugas Reguler (20 Halaman)", "Cetak & Jilid Skripsi Hardcover", "Cetak Poster Seminar A1 (Art Paper)"]
    data_econ = [
        ["Harga Jual ke Mahasiswa", "Rp 10.000 (Rp 500/hal)", "Rp 85.000 (150 hal + Hardcover)", "Rp 45.000 / lembar"],
        ["Biaya Produksi Mitra Toko", "Rp 8.000 (Rp 400/hal)", "Rp 70.000 (Kertas + Karton emas)", "Rp 35.000 (Bahan + Tinta)"],
        ["Pendapatan Kotor Mitra", "Rp 8.000", "Rp 70.000", "Rp 35.000"],
        ["Komisi LapakPrint (7%)", "Rp 700", "Rp 5.950", "Rp 3.150"],
        ["Biaya Layanan Platform", "Rp 500", "Rp 1.000", "Rp 1.000"],
        ["Total Revenue LapakPrint", "Rp 1.200 per order", "Rp 6.950 per order", "Rp 4.150 per order"],
        ["Estimasi Volume per Kampus", "15.000 transaksi / bulan", "800 transaksi / semester", "1.200 transaksi / semester"],
        ["Margin Laba Bersih LapakPrint", "82% (setelah biaya server)", "88% (setelah biaya server)", "85% (setelah biaya server)"]
    ]
    col_w_econ = [Inches(1.8), Inches(1.5), Inches(1.8), Inches(1.4)]
    create_table_custom(doc, headers_econ, data_econ, col_w_econ)

    add_p(doc,
        "Dari tabel unit economics di atas, pada kampus dengan populasi 10.000 mahasiswa aktif, rata-rata transaksi harian "
        "mencapai 500 transaksi cetak reguler. Dengan kontribusi pendapatan bersih rata-rata Rp1.200 per transaksi, "
        "platform LapakPrint mengenerate pendapatan kotor bulanan sekitar Rp18.000.000 hanya dari satu kluster universitas, "
        "dengan biaya infrastruktur teknologi server yang hanya berkisar antara Rp150.000 hingga Rp300.000 per bulan "
        "berkat strategi pemanfaatan free-tier hybrid cloud."
    )

    add_h2(doc, "2.4 Keberlanjutan Bisnis Percetakan Kampus di Era Digital")
    add_p(doc,
        "Sebagian pihak memprediksi bahwa era digitalisasi akan menghapus kebutuhan kertas secara total (*paperless society*). "
        "Namun, data empiris di lingkungan perguruan tinggi menunjukkan fenomena sebaliknya: kebutuhan cetak tetap stabil "
        "karena regulasi hukum akademik yang mewajibkan keaslian tanda tangan basah, legalitas pengesahan dekanat, arsip fisik "
        "perpustakaan nasional, dan kenyamanan membaca naskah tebal saat proses bimbingan dosen pembimbing."
    )
    add_p(doc,
        "LapakPrint mengintegrasikan prinsip keberlanjutan lingkungan (*Green Printing & Sustainability*) ke dalam ekosistemnya: "
        "(1) Mahasiswa dapat memilih opsi pencetakan bolak-balik otomatis (*duplex printing*) yang menghemat 50% kertas, "
        "(2) Fitur pratinjau digital presisi mencegah salah cetak (*zero waste printing*), dan "
        "(3) Bekerja sama dengan mitra gerai untuk mendaur ulang kertas sisa cetak menjadi blok catatan (*memo pad*) mahasiswa."
    )

    doc.add_page_break()
    print("Chapter 2 completed successfully.")

if __name__ == "__main__":
    doc = docx.Document()
    add_chapter_2(doc)
    doc.save("test_ch2.docx")
    print("Saved test_ch2.docx")
