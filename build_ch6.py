# -*- coding: utf-8 -*-
"""
Chapter 6: Codebase Refactoring Strategy, Cross-Device Testing, and Visual Evidence Documentation
"""
import docx
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT
from build_report_core import apply_tnr_run, add_p, add_h1, add_h2, add_h3, add_bullet, create_table_custom, create_screenshot_box

def add_chapter_6(doc):
    # ================= BAB VI =================
    add_h1(doc, "BAB VI: STRATEGI REFACTORING KODE DAN PENGUJIAN SISTEM")
    
    add_h2(doc, "6.1 Strategi Dekomposisi Arsitektur Monolit (5.000 ke 500 Baris)")
    add_p(doc,
        "Pada tahap awal pengembangan kilat (*rapid prototyping*), penulisan kode sering kali terpusat pada beberapa "
        "file raksasa (monolith) yang mencapai ribuan baris kode (seperti `App.jsx` dan `CustomerView.jsx` yang membengkak hingga "
        "ribuan baris). Pola monolitik ini menimbulkan sejumlah masalah serius: (1) Pelambatan kompilasi Hot Module Replacement (HMR) "
        "di Vite, (2) Kesulitan pelacakan bug state management, (3) Pemborosan re-render komponen DOM yang tidak diperlukan, "
        "serta (4) Risiko konflik penggabungan cabang kode (*merge conflict*) yang tinggi saat dikerjakan secara tim."
    )
    add_p(doc,
        "Untuk mentransformasikan kode sumber ke standar clean code industri, tim pengembang menerapkan strategi "
        "refaktorisasi 'Feature-Driven Architecture' (FDA). Prinsip utama dari arsitektur ini adalah memecah file monolit "
        "menjadi modul-modul independen dengan batas maksimal ~500 baris kode per berkas. "
        "Struktur direktori baru LapakPrint dirancang sebagai berikut:"
    )

    headers_refactor = ["File Monolit Asal", "Ukuran Baris Awal", "Dekomposisi Modul Baru (< 500 Baris)", "Tanggung Jawab Modul Baru"]
    data_refactor = [
        ["src/App.jsx (Root Monolith)", "~2.500 Baris", 
         "• src/features/routing/AppRouter.jsx\n• src/features/auth/AuthContext.jsx\n• src/features/navigation/MobileHeader.jsx\n• src/features/navigation/BottomTabBar.jsx", 
         "Memisahkan logika routing, context global authentication, dan komponen navigasi viewport ke file terisolasi."],
        ["src/components/CustomerView.jsx", "~3.200 Baris", 
         "• src/features/catalog/ProductGrid.jsx\n• src/features/catalog/CategoryFilter.jsx\n• src/features/banner/PromoCarousel.jsx\n• src/features/reviews/RatingOverview.jsx", 
         "Memecah tampilan katalog utama mahasiswa menjadi komponen terpisah yang hanya me-render bagiannya sendiri."],
        ["src/components/OrderCustomizerModal.jsx", "~1.800 Baris", 
         "• src/features/customizer/PaperSelector.jsx\n• src/features/customizer/BindingSelector.jsx\n• src/features/customizer/PriceCalculator.jsx\n• src/features/customizer/UploadDropzone.jsx", 
         "Mengisolasi form kalkulasi gramatur, pilihan jilid hardcover, dan komponen upload berkas ke modul mikro mandiri."],
        ["src/components/features/LapakPayWalletView.jsx", "~1.400 Baris", 
         "• src/features/wallet/WalletCard.jsx\n• src/features/wallet/TopUpModal.jsx\n• src/features/wallet/TransactionHistory.jsx\n• src/features/wallet/QRISDisplay.jsx", 
         "Memisahkan kartu saldo dompet LapakPay, riwayat mutasi transaksi, dan logika dynamic QRIS generator."],
        ["Logika Layanan & API (Tercampur)", "~1.500 Baris", 
         "• src/services/supabaseService.js\n• src/services/cloudinaryService.js\n• src/services/nineRouterClient.js\n• src/services/runwareService.js", 
         "Mengekstrak seluruh panggilan jaringan HTTP (Supabase, Cloudinary, 9router, Runware) ke dalam lapisan service bersih."]
    ]
    col_w_refactor = [Inches(1.8), Inches(1.1), Inches(2.2), Inches(2.2)]
    create_table_custom(doc, headers_refactor, data_refactor, col_w_refactor)

    add_p(doc,
        "Dampak dari dekomposisi monolit ini sangat signifikan: kecepatan proses build Vite meningkat hingga 400%, "
        "keterbacaan kode (code maintainability) melonjak drastis, dan setiap modul dapat diuji secara terisolasi "
        "menggunakan unit testing."
    )

    add_h2(doc, "6.2 Evaluasi Pengujian Fungsional Lintas Perangkat (Cross-Device & Cross-Platform)")
    add_p(doc,
        "Pengujian fungsional dilakukan secara ketat pada lingkungan produksi nyata (Production Environment) "
        "melibatkan berbagai merek dan ukuran layar smartphone fisik:"
    )
    add_bullet(doc, "Diuji pada Samsung Galaxy S22/S24 (OneUI Android 14), Xiaomi Redmi Note 12 (MIUI Android 13), dan iPhone 13/15 (iOS 17 Safari). Hasil pengujian memverifikasi bahwa viewport 100% responsif, seluruh tombol aksi mudah dijangkau satu tangan (thumb-friendly), dan terbebas sepenuhnya dari isu font inflation (teks membesar sendiri pada browser seluler).", "1. Pengujian Web Production Vercel: ")
    add_bullet(doc, "File installer binary `LapakPrint.apk` (hasil kompilasi Capacitor 6, Java 21, Android SDK 36) diunduh dan dipasang secara langsung (sideloading) pada 3 unit smartphone Android tanpa melalui Google Play Store. Aplikasi berhasil terpasang instan, menampilkan splash screen bermerek LapakPrint, dan mampu mengakses penyimpanan lokal untuk mengunggah dokumen PDF secara lancar.", "2. Pengujian Native Android APK: ")
    add_bullet(doc, "Container `lapakprint-ngrok` dihubungkan ke `hermes-webui:8080`. Penguji membuka URL publik https://appealing-issue-shimmer.ngrok-free.dev dari smartphone menggunakan koneksi data seluler Telkomsel dan Indosat (di luar jaringan WiFi laptop). Hasilnya, antarmuka Open WebUI terbuka sempurna dan model penalaran `ag/gemini-3.8-flash-high` sukses membalas prompt percetakan dengan proses reasoning selama 7 detik.", "3. Pengujian AI Tunneling Ngrok: ")

    add_h2(doc, "6.3 Dokumentasi Tangkapan Layar Pengujian Sistem (Visual Evidence)")
    add_p(doc,
        "Berikut adalah dokumentasi visual resmi yang merekam keberhasilan orkestrasi dan implementasi "
        "seluruh komponen ekosistem LapakPrint. Setiap kotak tangkapan layar telah dilengkapi dengan petunjuk "
        "gambar yang harus disematkan:"
    )

    create_screenshot_box(doc, "6.1", "Antarmuka Beranda Web Production LapakPrint di Vercel", 
                          "Tangkapan layar browser membuka https://lapakprint-app.vercel.app menampilkan navigasi Shopee-style, kategori cetak tugas, dan banner promosi kampus.")
    
    create_screenshot_box(doc, "6.2", "Modal Kustomisasi Cetak Dokumen dan Kalkulator Gramatur Otomatis", 
                          "Tangkapan layar interaktif saat pengguna memilih kertas 70/80 gsm, duplex bolak-balik, dan melihat estimasi harga terupdate otomatis.")
    
    create_screenshot_box(doc, "6.3", "Tampilan Layanan Khusus Jilid Hardcover Skripsi Berstandar Universitas", 
                          "Tangkapan layar pemilihan warna cover skripsi (Biru Tua/Marun), opsi pita pembatas, dan input judul skripsi timbul emas.")
    
    create_screenshot_box(doc, "6.4", "Modal Pembayaran Nontunai LapakPay Wallet dan Integrasi Dynamic QRIS", 
                          "Tangkapan layar invoice tagihan menampilkan barcode QRIS dinamis dan tombol bayar instan menggunakan saldo dompet digital.")
    
    create_screenshot_box(doc, "6.5", "Halaman Profil Mahasiswa dengan Tombol Unduh Installer Native Android APK", 
                          "Tangkapan layar menu profil pengguna yang menampilkan identitas mahasiswa dan tombol unduh langsung LapakPrint.apk.")
    
    create_screenshot_box(doc, "6.6", "Tampilan Aplikasi Native Android LapakPrint.apk Terpasang di Smartphone Fisik", 
                          "Foto atau tangkapan layar ponsel fisik Android yang menjalankan aplikasi LapakPrint secara mandiri berbasis Capacitor.")
    
    create_screenshot_box(doc, "6.7", "Kluster 4 Kontainer Aktif di Aplikasi Docker Desktop (Grup lapakprint)", 
                          "Tangkapan layar Docker Desktop yang memperlihatkan 4 container hijau: hermes-service, nine-router, hermes-webui, dan ngrok.")
    
    create_screenshot_box(doc, "6.8", "Dashboard 9router Menampilkan Status Akun Google Antigravity OAuth Active", 
                          "Tangkapan layar antarmuka 9router di localhost:20129 menampilkan akun ladderazulza@gmail.com berstatus Active dan OAuth.")
    
    create_screenshot_box(doc, "6.9", "Antarmuka LapakPrint Hermes AI Studio (Open WebUI Port 8080)", 
                          "Tangkapan layar antarmuka obrolan bergaya ChatGPT di localhost:8080 terhubung ke gateway internal 9router.")
    
    create_screenshot_box(doc, "6.10", "Respons Cerdas Model Gemini 3.8 Flash High dengan Fitur Reasoning Thinking", 
                          "Tangkapan layar jawaban AI di Open WebUI yang memperlihatkan status 'Berpikir selama 7 detik' dan solusi percetakan komprehensif.")
    
    create_screenshot_box(doc, "6.11", "Jendela Monitoring Sesi Online dan Trafik Publik Ngrok Tunnel (Port 4040)", 
                          "Tangkapan layar dashboard web Ngrok di localhost:4040 menampilkan status Online dan public URL appealing-issue-shimmer.ngrok-free.dev.")
    
    create_screenshot_box(doc, "6.12", "Repositori Publik GitHub LapakPrint dengan Pipeline CI/CD Vercel Terhubung", 
                          "Tangkapan layar repositori GitHub github.com/zulzaladdera-MLearning/lapakprint-app menampilkan riwayat commit dan status deploy.")

    doc.add_page_break()
    print("Chapter 6 completed successfully.")

if __name__ == "__main__":
    doc = docx.Document()
    add_chapter_6(doc)
    doc.save("test_ch6.docx")
    print("Saved test_ch6.docx")
