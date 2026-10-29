# -*- coding: utf-8 -*-
"""
Chapter 5: Product Requirements Document (PRD) - User Personas, FRs, NFRs, Data Schemas, API Contracts
"""
import docx
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT
from build_report_core import apply_tnr_run, add_p, add_h1, add_h2, add_h3, add_bullet, create_table_custom

def add_chapter_5(doc):
    # ================= BAB V =================
    add_h1(doc, "BAB V: PRODUCT REQUIREMENTS DOCUMENT (PRD)")
    
    add_h2(doc, "5.1 User Personas (Profil Pengguna Sasaran)")
    add_p(doc,
        "Untuk memastikan setiap fitur yang dikembangkan benar-benar memecahkan masalah riil pengguna di lapangan, "
        "disusun empat profil Persona Pengguna (User Personas) yang merepresentasikan pemangku kepentingan utama "
        "ekosistem LapakPrint:"
    )

    headers_persona = ["Atribut Persona", "Persona 1: Mahasiswa Skripsi", "Persona 2: Panitia Acara BEM", "Persona 3: Mitra Toko Cetak"]
    data_persona = [
        ["Nama & Usia", "Budi Santoso (22 Tahun)", "Siti Rahmawati (20 Tahun)", "Pak Joko Sutrisno (48 Tahun)"],
        ["Peran / Status", "Mahasiswa Tingkat Akhir (S1 Teknik)", "Ketua Divisi Logistik Seminar Nasional BEM", "Pemilik Toko Fotokopi 'Berkah Abadi' Kampus"],
        ["Tujuan Utama", "Mencetak 4 rangkap naskah skripsi hardcover timbul emas dengan margin presisi untuk sidang meja hijau.", "Mencetak 2 spanduk A0, 20 poster A1, dan 300 sertifikat peserta dalam waktu 24 jam.", "Mendapatkan pesanan cetak yang teratur tanpa kerumunan antrean manual di depan etalase tokonya."],
        ["Titik Masalah (Pain Points)", "Sering ditolak dekanat karena warna cover salah; antre berjam-jam saat hari batas akhir revisi skripsi.", "Tidak punya desainer grafis profesional; bingung menghitung total biaya poster berukuran besar.", "Kewalahan melayani file mahasiswa dari flashdisk yang sering membawa virus dan formatnya berantakan."],
        ["Fitur Solutif LapakPrint", "Kustomisasi jilid hardcover standar kampus, upload PDF mandiri, dan notifikasi loket kilat.", "AI Poster Creator (Gemini-to-Runware) dan kalkulator diskon voucher borongan organisasi.", "Dashboard pesanan digital dengan berkas siap cetak di Cloudinary dan pembayaran QRIS terverifikasi."]
    ]
    col_w_persona = [Inches(1.5), Inches(1.8), Inches(1.8), Inches(1.9)]
    create_table_custom(doc, headers_persona, data_persona, col_w_persona)

    add_h2(doc, "5.2 Spesifikasi Kebutuhan Fungsional (Functional Requirements)")
    add_p(doc,
        "Kebutuhan fungsional sistem didefinisikan ke dalam 15 modul inti (FR-01 s.d. FR-15). "
        "Setiap kebutuhan diberi tingkat prioritas menggunakan metode MoSCoW (P0 = Must Have, P1 = Should Have, P2 = Nice to Have):"
    )

    headers_fr = ["Kode FR", "Nama Fitur", "User Story & Spesifikasi Fungsional", "Kriteria Keberterimaan (Acceptance Criteria)", "Prioritas"]
    data_fr = [
        ["FR-01", "Autentikasi & Akun", "Sebagai mahasiswa, saya ingin login menggunakan akun Google atau email agar riwayat pesanan saya tersimpan.", "Pengguna dapat login, logout, melihat profil, dan menyimpan alamat kampus favorit.", "P0 (Must Have)"],
        ["FR-02", "Katalog Percetakan", "Sebagai pengguna, saya ingin menjelajahi kategori cetak dokumen, jilid skripsi, brosur, dan poster.", "Menampilkan daftar layanan lengkap dengan ikon, estimasi harga dasar, dan deskripsi bahan.", "P0 (Must Have)"],
        ["FR-03", "Kustomisasi Dokumen", "Sebagai mahasiswa, saya ingin memilih gramatur kertas (70/80/100gsm), orientasi, dan opsi warna/BW.", "Pilihan konfigurasi dapat diubah secara interaktif dan langsung memperbarui kalkulasi biaya.", "P0 (Must Have)"],
        ["FR-04", "Kalkulator Presisi", "Sebagai pengguna, saya ingin melihat rincian biaya transparan sebelum melakukan checkout pemesanan.", "Kalkulator menghitung: (Jumlah Halaman x Tarif Kertas) + Biaya Jilid - Potongan Voucher.", "P0 (Must Have)"],
        ["FR-05", "Jilid Hardcover Skripsi", "Sebagai mahasiswa tingkat akhir, saya ingin memesan jilid hardcover skripsi dengan pilihan warna cover dan pita pembatas.", "Tersedia pilihan warna cover universitas (Biru Tua, Hijau, Merah Marun) dan opsi tulisan emas.", "P0 (Must Have)"],
        ["FR-06", "Direct Cloud Upload", "Sebagai pengguna, saya ingin mengunggah berkas PDF tugas langsung ke cloud storage secara cepat.", "Berkas terunggah ke Cloudinary CDN; sistem memvalidasi format PDF/DOCX dan ukuran < 100 MB.", "P0 (Must Have)"],
        ["FR-07", "Pratinjau Berkas", "Sebagai mahasiswa, saya ingin melihat thumbnail pratinjau halaman pertama dokumen yang diunggah.", "Aplikasi merender pratinjau lembar pertama secara otomatis untuk mencegah salah kirim berkas.", "P1 (Should Have)"],
        ["FR-08", "Pembayaran QRIS Dinamis", "Sebagai pengguna, saya ingin membayar pesanan secara instan menggunakan QRIS atau saldo dompet LapakPay.", "Menampilkan gambar QR Code dinamis dengan nilai tagihan presisi; saldo dompet terpotong otomatis.", "P0 (Must Have)"],
        ["FR-09", "Hermes AI Assistant", "Sebagai mahasiswa, saya ingin berkonsultasi mengenai standar gramatur kertas dan format skripsi.", "Chatbot AI merespons pertanyaan percetakan secara interaktif dan solutif.", "P0 (Must Have)"],
        ["FR-10", "AI Poster Generator", "Sebagai panitia acara, saya ingin mengenerate desain poster dari sketsa kasar secara otomatis.", "Pipeline Gemini-to-Runware memproses deskripsi/sketsa dan menghasilkan gambar poster HD.", "P1 (Should Have)"],
        ["FR-11", "Dashboard Mitra", "Sebagai pemilik toko mitra, saya ingin melihat antrean pesanan cetak yang masuk secara real-time.", "Mitra dapat mengunduh berkas cetak pelanggan dan mengubah status pesanan (Diproses / Selesai).", "P0 (Must Have)"],
        ["FR-12", "Notifikasi Ambil", "Sebagai mahasiswa, saya ingin mendapatkan kode unik pengambilan saat dokumen telah selesai dicetak.", "Sistem mengenerate 6 digit PIN / Barcode pengambilan setelah mitra menandai pesanan selesai.", "P0 (Must Have)"],
        ["FR-13", "Download Native APK", "Sebagai pengguna Android, saya ingin mengunduh berkas installer APK langsung dari website.", "Tersedia tombol 'Unduh Aplikasi Mobile (.APK)' di navbar dan profil yang langsung mendownload APK.", "P0 (Must Have)"],
        ["FR-14", "Panel Super Admin", "Sebagai pengelola platform, saya ingin memantau total transaksi, komisi platform, dan daftar mitra.", "Menampilkan metrik bisnis (GMV, volume transaksi harian, dan grafik pendapatan platform).", "P1 (Should Have)"],
        ["FR-15", "AI Fallback Router", "Sebagai sistem, platform harus otomatis beralih rute jika provider AI utama mengalami limit kuota.", "Jika Gemini 429, otomatis switch ke OpenRouter / SiliconFlow atau model lokal Ollama.", "P0 (Must Have)"]
    ]
    col_w_fr = [Inches(0.7), Inches(1.3), Inches(2.7), Inches(1.8), Inches(0.8)]
    create_table_custom(doc, headers_fr, data_fr, col_w_fr)

    add_h2(doc, "5.3 Spesifikasi Kebutuhan Non-Fungsional (Non-Functional Requirements)")
    add_p(doc,
        "Kebutuhan non-fungsional memastikan platform LapakPrint memiliki ketahanan arsitektur, keamanan data berkas, "
        "kinerja cepat, serta pengalaman pengguna yang mulus pada berbagai kondisi perangkat:"
    )
    add_bullet(doc, "Waktu muat awal halaman (Initial Page Load) < 2 detik pada jaringan 4G seluler; latensi respons kalkulator biaya < 100 ms; waktu respons inferensi AI streaming pertama < 1.5 detik.", "1. Performa (Performance): ")
    add_bullet(doc, "Seluruh lalu lintas data dienkripsi dengan HTTPS TLS 1.3; berkas yang diunggah ke Cloudinary diproteksi dengan secure hash; database Supabase dilengkapi Row Level Security (RLS) sehingga pengguna hanya dapat mengakses berkas pesanannya sendiri.", "2. Keamanan & Privasi (Security & Privacy): ")
    add_bullet(doc, "Aplikasi web production di Vercel menjamin tingkat ketersediaan 99.9% uptime; sistem inferensi AI memiliki toleransi kesalahan (fault-tolerant) melalui mekanisme fallback offline Ollama/LMStudio.", "3. Ketersediaan (Availability & Reliability): ")
    add_bullet(doc, "Tata letak mobile konsisten (pixel-perfect) pada smartphone layar sempit (360px) hingga layar lebar (430px) tanpa adanya cacat visual teks bertumpuk (font inflation) pada Android maupun iOS.", "4. Kompatibilitas Perangkat (Usability & Compatibility): ")

    add_h2(doc, "5.4 Skema Basis Data Relasional & Relasi Media CDN")
    add_p(doc,
        "Basis data LapakPrint diimplementasikan menggunakan arsitektur relasional PostgreSQL pada Supabase. "
        "Struktur tabel dirancang secara normal (Third Normal Form / 3NF) dengan relasi tautan media ke Cloudinary:"
    )

    headers_db = ["Nama Tabel", "Atribut / Kolom Utama", "Tipe Data & Batasan", "Deskripsi Entitas & Relasi"]
    data_db = [
        ["users", "id, email, full_name, phone_number, role, wallet_balance, created_at", "UUID (PK), VARCHAR, ENUM('student','partner','admin'), DECIMAL(12,2)", "Menyimpan data identitas pengguna, hak akses, dan saldo dompet digital LapakPay."],
        ["products", "id, title, category, base_price, unit_type, description, is_active", "UUID (PK), VARCHAR, ENUM('doc','thesis','banner','merch'), DECIMAL, BOOLEAN", "Katalog master layanan percetakan, tipe bahan kertas, dan tarif dasar produksi."],
        ["orders", "id, user_id, partner_id, total_amount, platform_fee, status, pickup_pin, created_at", "UUID (PK), UUID (FK to users), DECIMAL, ENUM('pending','paid','printing','ready','done'), VARCHAR(6)", "Transaksi pemesanan utama, status alur pengerjaan berkas, dan PIN pengambilan di loket."],
        ["order_items", "id, order_id, product_id, page_count, copy_count, paper_gsm, binding_type, subtotal", "UUID (PK), UUID (FK), INT, INT, VARCHAR(20), VARCHAR(50), DECIMAL(12,2)", "Rincian spesifikasi tiap dokumen dalam satu transaksi pesanan (spesifikasi cetak spesifik)."],
        ["print_files", "id, order_item_id, cloudinary_url, public_id, file_name, file_size, mime_type", "UUID (PK), UUID (FK), TEXT (HTTPS URL), VARCHAR(100), VARCHAR(255), BIGINT", "Pointer metadata berkas digital yang tersimpan di Cloudinary CDN (tanpa membebani storage DB)."],
        ["payments", "id, order_id, method, transaction_hash, amount, is_verified, paid_at", "UUID (PK), UUID (FK), ENUM('lapakpay','qris'), VARCHAR(128), DECIMAL, BOOLEAN, TIMESTAMP", "Catatan verifikasi transaksi pembayaran nontunai dan hash audit perbankan."],
        ["vouchers", "id, promo_code, discount_percent, max_cut, min_order, valid_until, quota", "UUID (PK), VARCHAR(30) UNIQUE, DECIMAL(5,2), DECIMAL, DECIMAL, TIMESTAMP, INT", "Kupon promo diskon mahasiswa, batas kuota pemakaian, dan validitas masa promo."]
    ]
    col_w_db = [Inches(1.2), Inches(2.2), Inches(1.8), Inches(2.1)]
    create_table_custom(doc, headers_db, data_db, col_w_db)

    add_h2(doc, "5.5 Spesifikasi API Contracts dan Payload Webhook")
    add_p(doc,
        "Komunikasi antara frontend, backend gateway, dan layanan pihak ketiga (Cloudinary, Supabase, 9router, Runware) "
        "diatur melalui kontrak antarmuka API RESTful berformat JSON standar:"
    )
    add_bullet(doc, "POST /api/v1/orders/checkout — Menerima konfigurasi cetak, array tautan Cloudinary, dan tipe pembayaran; mengembalikan order_id, total tagihan, dan QRIS payload.", "1. Endpoint Checkout Pemesanan: ")
    add_bullet(doc, "POST /v1/chat/completions (9router Gateway) — Mengirimkan prompt percakapan dengan header Authorization Bearer sk-0480ac...; mengembalikan streaming teks penalaran model Gemini 3.8 Flash High.", "2. Endpoint Konsultasi AI Gateway: ")
    add_bullet(doc, "POST /api/v1/ai/generate-poster — Menerima prompt hasil analisis Gemini Vision; meneruskan ke Runware API untuk me-render poster FLUX; mengembalikan secure_url poster gambar beresolusi 300 DPI.", "3. Endpoint Multimodal Poster Synthesis: ")

    add_h2(doc, "5.6 Spesifikasi Pengujian Behaviour-Driven Development (BDD / Gherkin)")
    add_p(doc,
        "Untuk menjamin ketepatan implementasi fitur di lapangan dan memudahkan verifikasi pengujian otomatis, "
        "kebutuhan fungsional utama dijabarkan ke dalam skenario Behaviour-Driven Development (BDD) menggunakan sintaks Gherkin standar:"
    )

    headers_bdd = ["Skenario BDD (Gherkin)", "Modul Sistem", "Prekondisi & Langkah Eksekusi (Given-When)", "Hasil yang Diharapkan (Then)"]
    data_bdd = [
        ["Skenario 1: Kalkulasi Biaya Cetak Skripsi Hardcover", "Customer Wizard",
         "Given: Mahasiswa mengunggah file naskah skripsi 120 halaman.\nWhen: Mahasiswa memilih kertas HVS 80 gsm, jilid Hardcover Biru Tua, tinta emas, dan 2 rangkap.",
         "Then: Sistem menampilkan kalkulasi instan Rp170.000 (2 x Rp85.000) dan mengaktifkan tombol 'Lanjut ke Pembayaran' tanpa refresh halaman."],
        ["Skenario 2: Pembayaran Instan via Dompet Digital LapakPay", "LapakPay Wallet",
         "Given: Saldo dompet LapakPay mahasiswa sebesar Rp250.000 dan tagihan pesanan Rp170.000.\nWhen: Mahasiswa memilih metode 'LapakPay' dan mengklik 'Bayar Sekarang'.",
         "Then: Saldo berkurang menjadi Rp80.000 secara atomik, status pesanan beralih ke 'Paid', dan kode PIN 6 digit diterbitkan."],
        ["Skenario 3: Pembayaran Menggunakan Dynamic QRIS Escrow", "QRIS Escrow Engine",
         "Given: Mahasiswa tidak memiliki saldo dompet LapakPay yang cukup.\nWhen: Mahasiswa memilih metode 'QRIS Dynamic'.",
         "Then: Sistem menghasilkan barcode QRIS dinamis bernilai tepat sesuai tagihan, memulai countdown 15 menit, dan memverifikasi mutasi."],
        ["Skenario 4: Konsultasi Cetak dengan Failover Otomatis", "AI Studio / aiRouter",
         "Given: Kuota primary provider 9router mencapai rate limit (HTTP 429).\nWhen: Mahasiswa mengirimkan pertanyaan konsultasi spesifikasi jilid.",
         "Then: Router secara transparan mengalihkan permintaan ke xKiro Gateway dalam sub-detik tanpa memunculkan pesan kendala di layar."],
        ["Skenario 5: Pembaruan Status Produksi oleh Mitra Toko", "Seller Dashboard",
         "Given: Operator mitra toko menerima pesanan cetak skripsi berstatus 'Paid'.\nWhen: Operator mengklik 'Mulai Cetak' lalu 'Selesai Dicetak'.",
         "Then: Status pesanan di HP mahasiswa langsung terupdate menjadi 'Ready for Pickup' disertai petunjuk loket pengambilan."]
    ]
    col_w_bdd = [Inches(1.8), Inches(1.3), Inches(2.1), Inches(1.8)]
    create_table_custom(doc, headers_bdd, data_bdd, col_w_bdd)

    doc.add_page_break()
    print("Chapter 5 completed successfully.")

if __name__ == "__main__":
    doc = docx.Document()
    add_chapter_5(doc)
    doc.save("test_ch5.docx")
    print("Saved test_ch5.docx")
