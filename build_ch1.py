# -*- coding: utf-8 -*-
"""
Chapter 1: Cover, Executive Summary, Table of Contents, Bab I (5W + 1H Analysis)
"""
import docx
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT
from build_report_core import apply_tnr_run, add_p, add_h1, add_h2, add_h3, add_bullet, create_table_custom

def add_cover_and_frontmatter(doc):
    # ================= COVER PAGE =================
    p_inst = doc.add_paragraph()
    p_inst.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_inst.paragraph_format.space_before = Pt(10)
    p_inst.paragraph_format.space_after = Pt(2)
    r = p_inst.add_run("KEMENTERIAN PENDIDIKAN, KEBUDAYAAN, RISET, DAN TEKNOLOGI\nPROGRAM STUDI TEKNIK INFORMATIKA DAN SISTEM CERDAS\nFAKULTAS ILMU KOMPUTER")
    apply_tnr_run(r, size_pt=12, bold=True, color_rgb=RGBColor(30, 41, 59))

    p_spacer = doc.add_paragraph()
    p_spacer.paragraph_format.space_before = Pt(24)

    p_title = doc.add_paragraph()
    p_title.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_title.paragraph_format.space_before = Pt(18)
    p_title.paragraph_format.space_after = Pt(12)
    p_title.paragraph_format.line_spacing = 1.25
    r_title = p_title.add_run("LAPORAN AKADEMIK DAN DOKUMENTASI TEKNIS KNOWLEDGE DOMAIN:\nSISTEM ORKESTRASI E-COMMERCE DAN PERCETAKAN KAMPUS TERPADU BERBASIS MULTI-AGENT AI, HYBRID CLOUD STORAGE, DAN DISTRIBUTED ARCHITECTURE")
    apply_tnr_run(r_title, size_pt=15, bold=True, color_rgb=RGBColor(15, 23, 42))

    p_sub = doc.add_paragraph()
    p_sub.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_sub.paragraph_format.space_before = Pt(4)
    p_sub.paragraph_format.space_after = Pt(24)
    r_sub = p_sub.add_run("Studi Kasus: Perancangan, Refaktorisasi Arsitektur, Kontainerisasi Multi-Layanan, serta Implementasi Ekosistem Web Production dan Mobile Native Android pada Platform LapakPrint")
    apply_tnr_run(r_sub, size_pt=12, italic=True, color_rgb=RGBColor(2, 132, 199))

    p_badge = doc.add_paragraph()
    p_badge.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_badge.paragraph_format.space_before = Pt(12)
    p_badge.paragraph_format.space_after = Pt(36)
    r_badge = p_badge.add_run("[ LAPORAN AKHIR TUGAS BESAR & KNOWLEDGE DOMAIN 30+ HALAMAN ]")
    apply_tnr_run(r_badge, size_pt=11, bold=True, color_rgb=RGBColor(100, 116, 139))

    p_author = doc.add_paragraph()
    p_author.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_author.paragraph_format.space_before = Pt(36)
    p_author.paragraph_format.space_after = Pt(4)
    r_auth_label = p_author.add_run("Disusun Oleh:\n")
    apply_tnr_run(r_auth_label, size_pt=11, italic=True)
    r_auth_name = p_author.add_run("ZULZA LADDERA & TIM PENGEMBANG LAPAKPRINT\n")
    apply_tnr_run(r_auth_name, size_pt=12, bold=True)
    r_auth_id = p_author.add_run("Repositori Proyek: github.com/zulzaladdera-MLearning/lapakprint-app\nProduction URL: https://lapakprint-app.vercel.app")
    apply_tnr_run(r_auth_id, size_pt=10.5, color_rgb=RGBColor(71, 85, 105))

    p_year = doc.add_paragraph()
    p_year.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_year.paragraph_format.space_before = Pt(48)
    p_year.paragraph_format.space_after = Pt(0)
    r_yr = p_year.add_run("JAKARTA / INDONESIA\nTAHUN AKADEMIK 2026")
    apply_tnr_run(r_yr, size_pt=12, bold=True)

    doc.add_page_break()

    # ================= KATA PENGANTAR =================
    add_h1(doc, "KATA PENGANTAR")
    add_p(doc, 
        "Puji dan syukur kami panjatkan ke hadirat Tuhan Yang Maha Esa atas rahmat, petunjuk, dan karunia-Nya sehingga "
        "Laporan Akademik dan Dokumentasi Teknis Knowledge Domain untuk Proyek LapakPrint ini dapat diselesaikan dengan "
        "komprehensif dan sistematis. Laporan ini disusun sebagai bentuk pertanggungjawaban ilmiah dan rekayasa perangkat lunak "
        "dalam merancang, mengorkestrasi, serta mengimplementasikan platform marketplace percetakan digital terpadu berbasis "
        "arsitektur modern multi-agent intelligence, hybrid storage tiering, dan micro-containerization."
    )
    add_p(doc,
        "Perkembangan teknologi kecerdasan buatan (Artificial Intelligence) dan komputasi awan (Cloud Computing) saat ini "
        "telah mengubah lanskap rekayasa perangkat lunak. Ekosistem LapakPrint mengintegrasikan inovasi terkini mencakup "
        "Coding Agent Harness (Antigravity), AI Reasoning Engine (Hermes Agent), Model Gateway (9router), Dynamic Routing (xKiro & SiliconFlow), "
        "Cloud Storage Hybrid (Cloudinary CDN dipadukan dengan Relational Database Supabase PostgreSQL), serta Reverse-Proxy Tunneling (Ngrok) "
        "yang diorkestrasi secara harmonis melalui Docker Compose."
    )
    add_p(doc,
        "Penyusun menyampaikan apresiasi dan terima kasih yang mendalam kepada dosen pembimbing, rekan-rekan civitas akademika, "
        "serta komunitas open-source global yang telah menyediakan fondasi perkakas dan pustaka perangkat lunak. "
        "Kami menyadari bahwa laporan ini masih memiliki ruang penyempurnaan seiring pesatnya evolusi teknologi. "
        "Kritik dan saran konstruktif sangat kami harapkan guna penyempurnaan platform di masa mendatang."
    )
    
    p_ttd = doc.add_paragraph()
    p_ttd.alignment = WD_ALIGN_PARAGRAPH.RIGHT
    p_ttd.paragraph_format.space_before = Pt(18)
    r_ttd = p_ttd.add_run("Jakarta, Oktober 2026\n\n\nTim Pengembang LapakPrint")
    apply_tnr_run(r_ttd, size_pt=12, bold=True)

    doc.add_page_break()

    # ================= RINGKASAN EKSEKUTIF =================
    add_h1(doc, "RINGKASAN EKSEKUTIF (EXECUTIVE SUMMARY)")
    add_p(doc,
        "Proyek LapakPrint lahir dari sebuah kebutuhan riil mahasiswa dan civitas akademika di lingkungan perguruan tinggi "
        "terhadap efisiensi, transparansi, dan kecepatan proses percetakan dokumen akademik. Masalah klasik antrean fisik "
        "yang mengular di outlet fotokopi sekitar kampus, ketidakpastian gramatur kertas, format berkas yang rusak akibat perpindahan "
        "media penyimpanan portabel (flashdisk), serta metode pembayaran tunai yang tidak efisien diselesaikan melalui "
        "pendekatan rekayasa perangkat lunak modern berbasis arsitektur e-commerce terdistribusi."
    )
    add_p(doc,
        "Dokumen Knowledge Domain dan Product Requirements Document (PRD) setebal lebih dari 30 halaman ini "
        "merangkum fondasi konseptual, analisis bisnis, landasan teoretis, arsitektur teknis, hingga pengujian implementasi "
        "LapakPrint. Inovasi kunci yang dihadirkan meliputi:"
    )
    add_bullet(doc, "Mengombinasikan antarmuka belanja digital berstandar e-commerce kelas dunia dengan logika percetakan spesifik (kalkulator gramatur otomatis, opsi jilid hardcover skripsi berstandar universitas, serta pemilihan warna/grayscale per halaman).", "1. Desain Antarmuka Responsif & Mandiri: ")
    add_bullet(doc, "Platform dapat diakses secara instan melalui Web Production yang di-host di Vercel (https://lapakprint-app.vercel.app) sekaligus dikompilasi menjadi installer native Android mandiri (LapakPrint.apk) berbasis Capacitor SDK 36 dan Java 21 tanpa ketergantungan pada Google Play Store.", "2. Aksesibilitas Lintas Platform (Dual Deliverables): ")
    add_bullet(doc, "Menyiasati batasan kapasitas penyimpanan basis data relasional Supabase Free Tier (1 GB) dengan memisahkan penyimpanan berkas fisik PDF dan poster beresolusi tinggi ke Cloudinary CDN (5 GB) yang dihubungkan melalui pointer metadata URL relasional.", "3. Strategi Penyimpanan Hybrid Tiering: ")
    add_bullet(doc, "Mengorkestrasi model penalaran lokal (Hermes 3:3B via Ollama & LMStudio) dan model penalaran komputasi awan (Google Gemini 3.8 Flash High via Antigravity OAuth & 9router Gateway) yang dilengkapi failover otomatis ke provider eksternal (SiliconFlow & OpenRouter).", "4. Orkestrasi Multi-Agent AI & Dynamic Routing: ")
    add_bullet(doc, "Mengembangkan alur cerdas di mana Google Gemini Vision menganalisis sketsa kasar rancangan poster atau tata letak dokumen pelanggan, lalu mengabstraksikan prompt struktural yang dieksekusi oleh Runware AI Image Generation (FLUX/SDXL) untuk menghasilkan materi cetak beresolusi tinggi secara instan.", "5. Pipeline Generatif Multimodal (Gemini-to-Runware): ")
    add_bullet(doc, "Seluruh backend pendukung (Hermes Service, 9router Gateway, Open WebUI, dan Ngrok Secure Tunnel) dikontainerisasi dalam satu berkas docker-compose.yml yang dapat dijalankan secara instan dengan satu baris perintah.", "6. Kontainerisasi Terpadu Docker Compose: ")

    doc.add_page_break()

    # ================= DAFTAR ISI =================
    add_h1(doc, "DAFTAR ISI")
    
    toc_data = [
        ("HALAMAN JUDUL (COVER)", "i"),
        ("KATA PENGANTAR", "ii"),
        ("RINGKASAN EKSEKUTIF (EXECUTIVE SUMMARY)", "iii"),
        ("DAFTAR ISI", "iv"),
        ("DAFTAR TABEL DAN DAFTAR GAMBAR", "v"),
        ("BAB I: PENDAHULUAN DAN ANALISIS STRATEGIS 5W + 1H", "1"),
        ("  1.1 Latar Belakang dan Konteks Sosial-Akademik", "1"),
        ("  1.2 Analisis 5W + 1H Ekosistem LapakPrint Terpadu", "3"),
        ("  1.3 Identifikasi dan Perumusan Masalah Teknis-Operasional", "5"),
        ("  1.4 Tujuan Proyek dan Deliverables Konkret", "6"),
        ("  1.5 Manfaat dan Signifikansi Solusi", "7"),
        ("BAB II: ANALISIS MODEL BISNIS (BMC DAN LEAN CANVAS)", "8"),
        ("  2.1 Business Model Canvas (BMC) 9 Blok Terpadu", "8"),
        ("  2.2 Analisis Lean Canvas LapakPrint", "11"),
        ("  2.3 Strategi Monetisasi, Unit Economics, dan Proyeksi Margin", "13"),
        ("  2.4 Keberlanjutan Bisnis Percetakan Kampus di Era Digital", "15"),
        ("BAB III: BENCHMARKING DAN TINJAUAN PENELITIAN TERKINI", "16"),
        ("  3.1 Analisis Komparasi Aplikasi Sejenis (Benchmarking Matrix)", "16"),
        ("  3.2 State-of-the-Art Literature Review (Tinjauan Pustaka Ilmiah)", "19"),
        ("      3.2.1 Cloud-Native Containerization & Microservices", "19"),
        ("      3.2.2 Autonomous Coding Agents & Agentic Harness", "20"),
        ("      3.2.3 AI Gateway, Token Routing, and Dynamic Failover", "21"),
        ("      3.2.4 Multimodal Generative AI (Vision-to-Diffusion)", "22"),
        ("      3.2.5 Hybrid Cloud Storage Tiering Optimization", "23"),
        ("BAB IV: ARSITEKTUR TEKNOLOGI DAN STRATEGI INFRASTRUKTUR HYBRID", "24"),
        ("  4.1 Taksonomi Komprehensif Ekosistem Tech Stack LapakPrint", "24"),
        ("  4.2 Strategi Identitas Domain, Hosting Vercel, & Akun Bisnis Zoho", "27"),
        ("  4.3 Arsitektur Penyimpanan Hybrid (Supabase 1 GB + Cloudinary 5 GB)", "29"),
        ("  4.4 Orkestrasi AI Terdistribusi & Round-Robin Load Balancing", "31"),
        ("  4.5 Kontainerisasi Multi-Service Docker Compose Stack", "33"),
        ("BAB V: PRODUCT REQUIREMENTS DOCUMENT (PRD)", "35"),
        ("  5.1 User Personas (Mahasiswa, Panitia Acara, Mitra Toko, Admin)", "35"),
        ("  5.2 Spesifikasi Kebutuhan Fungsional (FR-01 s.d. FR-15)", "37"),
        ("  5.3 Spesifikasi Kebutuhan Non-Fungsional (Performance, Security, NFR)", "40"),
        ("  5.4 Skema Basis Data Relasional & Relasi Media CDN", "42"),
        ("  5.5 Spesifikasi API Contracts dan Payload Webhook", "44"),
        ("BAB VI: STRATEGI REFACTORING KODE DAN PENGUJIAN SISTEM", "46"),
        ("  6.1 Strategi Dekomposisi Arsitektur Monolit (5.000 ke 500 Baris)", "46"),
        ("  6.2 Evaluasi Pengujian Fungsional Lintas Perangkat (Web & APK)", "49"),
        ("  6.3 Dokumentasi Tangkapan Layar Pengujian Sistem (Placeholder & Analisis)", "51"),
        ("BAB VII: KESIMPULAN DAN ROADMAP PENGEMBANGAN MASA DEPAN", "54"),
        ("  7.1 Kesimpulan Capaian Proyek", "54"),
        ("  7.2 Limitasi Sistem Saat Ini", "55"),
        ("  7.3 Roadmap Pengembangan Jangka Pendek, Menengah, dan Panjang", "56"),
        ("DAFTAR PUSTAKA", "58"),
        ("LAMPIRAN: KONFIGURASI DOCKER, DOCKER-COMPOSE, DAN SCRIPT HELPER", "60")
    ]
    
    t_toc = doc.add_table(rows=len(toc_data), cols=2)
    t_toc.alignment = WD_TABLE_ALIGNMENT.CENTER
    for idx, (item, page_str) in enumerate(toc_data):
        c0 = t_toc.rows[idx].cells[0]
        c1 = t_toc.rows[idx].cells[1]
        c0.width = Inches(5.5)
        c1.width = Inches(0.8)
        c0.text = ""
        c1.text = ""
        p0 = c0.paragraphs[0]
        p1 = c1.paragraphs[0]
        p0.paragraph_format.space_before = Pt(2)
        p0.paragraph_format.space_after = Pt(2)
        p1.paragraph_format.space_before = Pt(2)
        p1.paragraph_format.space_after = Pt(2)
        p1.alignment = WD_ALIGN_PARAGRAPH.RIGHT
        
        is_bold = ("BAB " in item) or ("HALAMAN " in item) or ("KATA " in item) or ("RINGKASAN " in item) or ("DAFTAR " in item) or ("LAMPIRAN" in item)
        r0 = p0.add_run(item)
        apply_tnr_run(r0, size_pt=10, bold=is_bold)
        r1 = p1.add_run(page_str)
        apply_tnr_run(r1, size_pt=10, bold=is_bold)

    doc.add_page_break()

    # ================= DAFTAR TABEL =================
    add_h1(doc, "DAFTAR TABEL")
    
    tables_list = [
        ("Tabel 1.1: Matriks Formulasi Strategis 5W + 1H Ekosistem LapakPrint", "3"),
        ("Tabel 1.2: Perumusan Masalah, Akar Penyebab, dan Solusi Rekayasa Sistem", "5"),
        ("Tabel 1.3: Target Capaian Kinerja dan Luaran Nyata (Deliverables) Proyek", "6"),
        ("Tabel 2.1: Business Model Canvas (BMC) 9 Blok Terpadu Platform LapakPrint", "8"),
        ("Tabel 2.2: Lean Canvas Formulasi Solusi, Metrik Kunci, dan Unfair Advantage", "11"),
        ("Tabel 2.3: Analisis Kelayakan Finansial dan Unit Economics per Transaksi", "13"),
        ("Tabel 2.4: Matriks Diferensiasi Nilai dan Retensi Pengguna Mahasiswa", "15"),
        ("Tabel 3.1: Matriks Komparasi Benchmarking 5 Model Aplikasi Percetakan", "16"),
        ("Tabel 3.2: Sintesis Kajian Pustaka Ilmiah dan State-of-the-Art (5 Jurnal)", "19"),
        ("Tabel 3.3: Komparasi Keunggulan Arsitektur Sistem Terdistribusi", "23"),
        ("Tabel 4.1: Taksonomi Komprehensif Ekosistem Tech Stack LapakPrint (19 Instrumen)", "24"),
        ("Tabel 4.2: Alokasi Arsitektur Penyimpanan Hybrid (Supabase vs Cloudinary CDN)", "29"),
        ("Tabel 4.3: Matriks Manajemen Risiko dan Mitigasi Keamanan Siber", "33"),
        ("Tabel 4.4: Konfigurasi Kluster 4 Kontainer Multi-Service Docker Compose", "34"),
        ("Tabel 5.1: Matriks Profil Pengguna (User Personas & Role Matrix)", "36"),
        ("Tabel 5.2: Spesifikasi Kebutuhan Fungsional Mahasiswa (FR-01 s.d. FR-08)", "38"),
        ("Tabel 5.3: Spesifikasi Kebutuhan Fungsional Mitra Toko & Admin (FR-09 s.d. FR-15)", "40"),
        ("Tabel 5.4: Spesifikasi Kebutuhan Non-Fungsional (Performance, Security, NFR)", "41"),
        ("Tabel 5.5: Skema Basis Data Relasional PostgreSQL Supabase", "43"),
        ("Tabel 5.6: Spesifikasi Kontrak Antarmuka API dan Webhook RESTful", "45"),
        ("Tabel 5.7: Spesifikasi Skenario Pengujian Behaviour-Driven Development (BDD / Gherkin)", "46"),
        ("Tabel 6.1: Dekomposisi Arsitektur Monolit ke Feature-Driven Modules (< 500 Baris)", "48"),
        ("Tabel 6.2: Matriks Evaluasi User Acceptance Testing (UAT) Komprehensif (15 Kasus Uji)", "52"),
        ("Tabel 7.1: Matriks Capaian Output Kunci vs Target Rencana Proyek", "54"),
        ("Tabel 7.2: Roadmap Pengembangan Jangka Pendek, Menengah, dan Panjang (Q1–Q4)", "56")
    ]
    
    t_tbl = doc.add_table(rows=len(tables_list), cols=2)
    t_tbl.alignment = WD_TABLE_ALIGNMENT.CENTER
    for idx, (t_name, t_page) in enumerate(tables_list):
        c0 = t_tbl.rows[idx].cells[0]
        c1 = t_tbl.rows[idx].cells[1]
        c0.width = Inches(5.5)
        c1.width = Inches(0.8)
        p0 = c0.paragraphs[0]
        p1 = c1.paragraphs[0]
        p0.paragraph_format.space_before = Pt(1.5)
        p0.paragraph_format.space_after = Pt(1.5)
        p1.paragraph_format.space_before = Pt(1.5)
        p1.paragraph_format.space_after = Pt(1.5)
        p1.alignment = WD_ALIGN_PARAGRAPH.RIGHT
        r0 = p0.add_run(t_name)
        apply_tnr_run(r0, size_pt=10)
        r1 = p1.add_run(t_page)
        apply_tnr_run(r1, size_pt=10)
        
    doc.add_page_break()

    # ================= DAFTAR GAMBAR =================
    add_h1(doc, "DAFTAR GAMBAR")
    
    figures_list = [
        ("Gambar 4.1: Pengelolaan Zona DNS Domain lapakprint.my.id & Mapping Vercel Edge Server", "26"),
        ("Gambar 4.2: Kotak Masuk Zoho Mail & Persetujuan Kredit Developer Program Runware $1.000", "27"),
        ("Gambar 4.3: Implementasi Basis Data Relasional PostgreSQL di Supabase (Tabel orders)", "28"),
        ("Gambar 4.4: Konsol Penyimpanan Cloudinary CDN 5 GB (Hybrid Storage Tier)", "28"),
        ("Gambar 4.5: Matriks Gateway AI Multi-Provider Terdistribusi (SiliconFlow, OpenRouter, Gemini)", "30"),
        ("Gambar 4.6: Terminal CLI Mesin Inferensi AI Lokal (Host Ollama & Server LM Studio)", "31"),
        ("Gambar 4.7: Studio API Runware & Benchmark Kecepatan Difusi FLUX.1 (Sub-2s)", "32"),
        ("Gambar 4.8: Pipeline Multimodal Round-Robin Studio: Gemini Vision ke Runware FLUX", "33"),
        ("Gambar 4.9: Kluster 4 Kontainer Aktif di Aplikasi Docker Desktop (Grup lapakprint)", "34"),
        ("Gambar 4.10: Dashboard 9router Menampilkan Status Akun Google Antigravity OAuth Active", "34"),
        ("Gambar 4.11: Antarmuka LapakPrint Hermes AI Studio (Open WebUI Port 8080)", "35"),
        ("Gambar 4.12: Respons Cerdas Model Gemini 3.8 Flash High dengan Fitur Reasoning Thinking", "35"),
        ("Gambar 4.13: Jendela Monitoring Sesi Online dan Trafik Publik Ngrok Tunnel (Port 4040)", "36"),
        ("Gambar 5.1: Kerangka Strategis Knowledge Domain & PRD Framework LapakPrint (30+ Halaman)", "37"),
        ("Gambar 5.2: Layanan Khusus Jilid Hardcover Skripsi Berstandar Universitas", "39"),
        ("Gambar 5.3: Modal Pembayaran Nontunai LapakPay Wallet dan Integrasi Dynamic QRIS", "39"),
        ("Gambar 5.4: Halaman Profil Mahasiswa dengan Portal Unduh Sideloading APK Native", "40"),
        ("Gambar 6.1: Antigravity Coding Agent Harness — Autonomous Orchestrator", "43"),
        ("Gambar 6.2: Workspace Cursor AI IDE Berbasis Feature-Driven Architecture", "44"),
        ("Gambar 6.3: Verifikasi Audit Clean Code Refaktorisasi FDA (< 500 Baris)", "44"),
        ("Gambar 6.4: Antarmuka Beranda Web Production LapakPrint di Vercel", "46"),
        ("Gambar 6.5: Katalog Produk Lengkap & Formulir Pemesanan Cetak Desktop", "46"),
        ("Gambar 6.6: Tampilan Aplikasi Native Android LapakPrint.apk Terpasang di Smartphone Fisik", "47"),
        ("Gambar 6.7: Repositori Publik GitHub LapakPrint dengan Pipeline CI/CD Vercel Terhubung", "47")
    ]
    
    t_fig = doc.add_table(rows=len(figures_list), cols=2)
    t_fig.alignment = WD_TABLE_ALIGNMENT.CENTER
    for idx, (f_name, f_page) in enumerate(figures_list):
        c0 = t_fig.rows[idx].cells[0]
        c1 = t_fig.rows[idx].cells[1]
        c0.width = Inches(5.5)
        c1.width = Inches(0.8)
        p0 = c0.paragraphs[0]
        p1 = c1.paragraphs[0]
        p0.paragraph_format.space_before = Pt(1.5)
        p0.paragraph_format.space_after = Pt(1.5)
        p1.paragraph_format.space_before = Pt(1.5)
        p1.paragraph_format.space_after = Pt(1.5)
        p1.alignment = WD_ALIGN_PARAGRAPH.RIGHT
        r0 = p0.add_run(f_name)
        apply_tnr_run(r0, size_pt=10)
        r1 = p1.add_run(f_page)
        apply_tnr_run(r1, size_pt=10)
        
    doc.add_page_break()

def add_chapter_1(doc):
    # ================= BAB I =================
    add_h1(doc, "BAB I: PENDAHULUAN DAN ANALISIS STRATEGIS 5W + 1H")
    
    add_h2(doc, "1.1 Latar Belakang dan Konteks Sosial-Akademik")
    add_p(doc,
        "Di era transformasi digital perguruan tinggi di Indonesia, aktivitas akademik mahasiswa sangat lekat "
        "dengan produksi dokumen fisik. Meskipun sistem manajemen pembelajaran daring (Learning Management System / LMS) "
        "telah diadopsi luas, penyerahan berkas fisik tetap menjadi syarat mutlak dan tidak tergantikan dalam berbagai kegiatan "
        "krusial, meliputi pengumpulan laporan praktikum mingguan, proposal penelitian, naskah skripsi sidang meja hijau, "
        "jilid hardcover skripsi resmi untuk arsip perpustakaan universitas, sertifikat kegiatan organisasi kemahasiswaan, "
        "hingga cetak poster ilmiah berukuran besar (A0, A1, A2) untuk seminar akademik."
    )
    add_p(doc,
        "Ironisnya, proses pemenuhan kebutuhan percetakan fisik tersebut masih didominasi oleh metode konvensional "
        "yang sarat inefisiensi. Ratusan mahasiswa setiap paginya harus mengantre di gerai-gerai fotokopi di sekitar kampus. "
        "Kondisi ini memicu sejumlah permasalahan kronis: waktu tunggu yang sangat lama (sering kali memakan waktu 1 hingga 3 jam "
        "hanya untuk mencetak 10 lembar tugas), ketiadaan standardisasi harga yang transparan, risiko perpindahan virus komputer "
        "akibat colokan flashdisk dari satu komputer operasional ke komputer lain, serta seringnya terjadi cacat format dokumen "
        "karena perbedaan versi pengolah kata (Microsoft Word) antara perangkat pribadi mahasiswa dengan komputer gerai cetak."
    )
    add_p(doc,
        "Platform LapakPrint dikembangkan sebagai lompatan teknologi rekayasa perangkat lunak untuk mengatasi permasalahan "
        "tersebut secara menyeluruh. Mengusung filosofi 'Kampus Smart Printing Marketplace', LapakPrint mendigitalisasi seluruh "
        "rantai pasok pemesanan cetak dokumen: mulai dari pemilihan gramatur kertas (70 gsm, 80 gsm, 100 gsm, kertas foto, linen), "
        "konfigurasi jilid (softcover mika, spiral kawat, hardcover skripsi timbul emas), kalkulasi biaya instan dan presisi, "
        "hingga verifikasi pembayaran otomatis berbasis QRIS dinamis dan dompet digital LapakPay. Seluruh dokumen pesanan "
        "disimpan secara aman di komputasi awan dan dapat langsung diproses oleh outlet mitra percetakan resmi di kampus "
        "sehingga mahasiswa hanya perlu datang untuk mengambil dokumen yang telah selesai dicetak rapi tanpa antre."
    )

    add_h2(doc, "1.2 Analisis Strategis 5W + 1H Ekosistem LapakPrint")
    add_p(doc,
        "Untuk membedah kedalaman domain permasalahan dan merumuskan solusi rekayasa secara menyeluruh, dilakukan "
        "analisis komprehensif menggunakan metodologi 5W + 1H (What, Why, Where, When, Who, dan How). Metodologi ini memastikan "
        "setiap dimensi operasional, teknis, ekonomi, dan perilaku pengguna terakomodasi secara holistik dalam perancangan sistem."
    )

    headers_5w1h = ["Dimensi", "Komponen Strategis", "Deskripsi Implementasi pada Platform LapakPrint"]
    data_5w1h = [
        ["WHAT (Apa)", "Definisi Solusi & Entitas Produk", 
         "Platform marketplace dan on-demand printing service terintegrasi yang menghubungkan civitas akademika dengan jaringan gerai percetakan resmi kampus. Dilengkapi asisten penalaran kecerdasan buatan (Hermes AI Agent) dan generator poster otomatis (Gemini-to-Runware pipeline)."],
        ["WHY (Mengapa)", "Alasan Fundamental & Urgensi", 
         "Menghilangkan friksi antrean fisik, mencegah penularan malware melalui flashdisk, memberikan kepastian transparansi harga cetak tanpa manipulasi manual, mengeliminasi risiko pergeseran margin dokumen cetak, serta menyediakan opsi pembayaran digital terverifikasi otomatis."],
        ["WHERE (Di Mana)", "Lokus Aksesibilitas & Distribusi", 
         "Beroperasi secara hibrida: diakses melalui aplikasi web responsif di cloud Vercel (https://lapakprint-app.vercel.app), aplikasi native Android (LapakPrint.apk), local tunnel Ngrok lintas perangkat, serta diimplementasikan secara fisik pada gerai percetakan mitra di lingkungan universitas."],
        ["WHEN (Kapan)", "Temporal Siklus Penggunaan", 
         "Digunakan dalam dua pola frekuensi: (1) Frekuensi Harian/Mingguan: cetak tugas kuliah rutin, laporan lab praktikum, makalah; (2) Frekuensi Puncak (Peak Season): masa Ujian Tengah/Akhir Semester, periode sidang proposal, serta periode wisuda universitas."],
        ["WHO (Siapa)", "Segmentasi Pengguna & Pemangku Kepentingan", 
         "Terdiri atas 4 peran utama: (1) Mahasiswa sebagai konsumen primer, (2) Panitia Acara Kampus/BEM untuk cetak banner dan sertifikat, (3) Pemilik UMKM Gerai Percetakan Kampus sebagai mitra produksi, dan (4) Super Administrator pengelola ekosistem."],
        ["HOW (Bagaimana)", "Mekanisme Operasional & Arsitektur", 
         "Mahasiswa mengunggah berkas PDF/gambar ➔ Cloudinary CDN menyimpan berkas fisik ➔ Supabase mencatat metadata relasional ➔ AI memverifikasi kelayakan cetak ➔ Pembayaran via QRIS/LapakPay ➔ Antrean diteruskan ke dashboard mitra ➔ Pengambilan via loket kilat."]
    ]
    col_w_5w1h = [Inches(1.2), Inches(1.8), Inches(3.5)]
    create_table_custom(doc, headers_5w1h, data_5w1h, col_w_5w1h)

    add_p(doc,
        "Analisis di atas membuktikan bahwa LapakPrint bukan sekadar katalog produk digital, melainkan sebuah platform "
        "orkestrasi multi-entitas yang mengubah paradigma pencetakan dokumen konvensional menjadi terotomatisasi, transparan, "
        "dan efisien secara waktu maupun biaya."
    )

    add_h2(doc, "1.3 Identifikasi dan Perumusan Masalah Teknis-Operasional")
    add_p(doc,
        "Dalam merancang dan mengimplementasikan ekosistem LapakPrint, tim pengembang merumuskan 5 tantangan teknis inti "
        "yang harus dipecahkan melalui pendekatan rekayasa perangkat lunak:"
    )
    add_bullet(doc, "Bagaimana membangun sistem antarmuka pengguna yang sangat responsif, bebas cacat visual font inflation pada berbagai merk smartphone Android dan iOS, serta memberikan pengalaman checkout yang sangat familiar dan intuitif bagi mahasiswa?", "1. Optimasi Antarmuka Lintas Perangkat: ")
    add_bullet(doc, "Bagaimana membungkus kode sumber React + Vite menjadi paket installer aplikasi mobile native Android (.APK) berbasis Capacitor SDK 36 dan Java 21 yang mandiri, berkinerja tinggi, dan dapat dipasang langsung tanpa ketergantungan pada Google Play Store?", "2. Kompilasi Native Mobile APK Independen: ")
    add_bullet(doc, "Bagaimana mengatasi keterbatasan kuota penyimpanan gratis basis data Supabase (1 GB limit) agar platform mampu melayani ribuan unggahan berkas tugas, skripsi ratusan halaman, dan poster resolusi tinggi tanpa menimbulkan pembengkakan biaya basis data?", "3. Desain Arsitektur Penyimpanan Hybrid Tiering: ")
    add_bullet(doc, "Bagaimana mengorkestrasi model AI penalaran lokal (Hermes Agent via Ollama/LMStudio) dan model AI cloud (Google Gemini Antigravity, OpenRouter, SiliconFlow) ke dalam sebuah gateway tunggal (9router) dengan mekanisme failover dan round-robin yang tangguh saat terjadi kuota limit (HTTP 429)?", "4. Orkestrasi Multi-Model AI & Dynamic Failover: ")
    add_bullet(doc, "Bagaimana merancang pipeline multimodal yang mampu membaca instruksi sketsa visual pelanggan menggunakan Gemini Vision dan meneruskannya ke mesin difusi gambar Runware (FLUX/SDXL) secara otomatis dengan biaya operasional yang sangat efisien memanfaatkan akun bisnis Zoho?", "5. Otomasi Pipeline Multimodal Generatif: ")

    add_h2(doc, "1.4 Tujuan Proyek dan Deliverables Konkret")
    add_p(doc,
        "Berdasarkan rumusan masalah di atas, tujuan utama dan luaran konkret (deliverables) yang berhasil "
        "direalisasikan secara sempurna dalam proyek LapakPrint adalah:"
    )
    add_bullet(doc, "Aplikasi web e-commerce percetakan kampus yang telah live 24 jam nonstop di cloud global Vercel pada domain https://lapakprint-app.vercel.app.", "1. Aplikasi Web Production Vercel: ")
    add_bullet(doc, "Berkas binary installer LapakPrint.apk berbasis Capacitor Android SDK 36 yang dapat diunduh langsung melalui tombol navigasi di web production maupun profil pengguna.", "2. Aplikasi Native Android APK: ")
    add_bullet(doc, "Ekosistem kontainerisasi terpadu yang memuat 4 container aktif (hermes-service, nine-router, hermes-webui, dan lapakprint-ngrok) yang saling terhubung dalam satu jaringan virtual bridge.", "3. Docker Multi-Service Compose Stack: ")
    add_bullet(doc, "URL publik terenkripsi HTTPS https://appealing-issue-shimmer.ngrok-free.dev yang meneruskan trafik internet eksternal ke container Hermes WebUI di port 8080.", "4. Secure Tunneling Ngrok: ")
    add_bullet(doc, "Dokumen akademik komprehensif setebal 30+ halaman yang mencakup Business Model Canvas, Lean Canvas, PRD lengkap, taksonomi tech stack, serta hasil pengujian fungsional sistem.", "5. Dokumentasi Knowledge Domain & PRD: ")

    add_h2(doc, "1.5 Manfaat dan Signifikansi Solusi")
    add_p(doc,
        "Implementasi platform LapakPrint memberikan signifikansi manfaat yang nyata bagi berbagai pihak:"
    )
    add_bullet(doc, "Menghemat waktu hingga 90% dalam mencetak tugas, transparansi estimasi harga sebelum checkout, jaminan keamanan berkas tanpa colok flashdisk, dan kemudahan pembayaran nontunai.", "• Bagi Mahasiswa & Civitas Akademika: ")
    add_bullet(doc, "Meningkatkan kapasitas produksi gerai melalui antrean berkas yang teratur, mengurangi beban operasional kasir manual, serta memperluas jangkauan pasar ke seluruh fakultas di universitas.", "• Bagi Pemilik UMKM Mitra Percetakan: ")
    add_bullet(doc, "Menjadi studi kasus nyata penerapan arsitektur modern perpaduan hybrid cloud, AI gateway routing, multimodal generative image, dan autonomous coding harness dalam memecahkan masalah riil masyarakat.", "• Bagi Pengembang & Ranah Akademisi: ")

    doc.add_page_break()
    print("Chapter 1 completed successfully.")

if __name__ == "__main__":
    doc = docx.Document()
    add_cover_and_frontmatter(doc)
    add_chapter_1(doc)
    doc.save("test_ch1.docx")
    print("Saved test_ch1.docx")
