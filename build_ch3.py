# -*- coding: utf-8 -*-
"""
Chapter 3: Benchmarking with Similar Applications & State-of-the-Art Literature Review
"""
import docx
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT
from build_report_core import apply_tnr_run, add_p, add_h1, add_h2, add_h3, add_bullet, create_table_custom

def add_chapter_3(doc):
    # ================= BAB III =================
    add_h1(doc, "BAB III: BENCHMARKING DAN TINJAUAN PENELITIAN TERKINI")
    
    add_h2(doc, "3.1 Analisis Komparasi Aplikasi Sejenis (Benchmarking Matrix)")
    add_p(doc,
        "Untuk memposisikan inovasi LapakPrint di dalam peta persaingan industri percetakan dan e-commerce digital, "
        "dilakukan benchmarking komparatif terhadap empat model layanan percetakan yang ada saat ini: "
        "(1) Platform Web-to-Print Enterprise Komersial (Printerous), (2) Platform Percetakan Digital Mahasiswa (KlikPrint), "
        "(3) Sentra Percetakan Komersial Skala Besar Tradisional (Kawasan Rawamangun/Kwitang), dan "
        "(4) Gerai Fotokopi Konvensional di Lingkungan Kampus. Evaluasi dilakukan berdasarkan 12 kriteria kunci."
    )

    headers_bm = ["Parameter Evaluasi", "LapakPrint (Sistem Ini)", "Printerous", "KlikPrint", "Sentra Rawamangun", "Fotokopi Konvensional"]
    data_bm = [
        ["1. Target Segmen Utama", "Mahasiswa, Dosen, BEM, Civitas Kampus", "Korporat & Bisnis B2B", "Pelajar & Mahasiswa Urban", "Umum, Skripsi, & Penerbit", "Mahasiswa Lokal Satu Lokasi"],
        ["2. Akses Lintas Platform", "Web Production + APK Android Native", "Web Browser Desktop/Mobile", "Web Browser Mobile", "Fisik / Datang Langsung", "Fisik / Datang Langsung"],
        ["3. Gaya UI & Familiaritas", "Mobile-First Shopee-Style E-Commerce", "Corporate Dashboard", "Form Web Klasik", "Tanpa Aplikasi / Manual", "Tanpa Aplikasi / Manual"],
        ["4. Asisten Cerdas AI", "Hermes Agent + Gemini Multimodal", "Tidak Ada", "Tidak Ada / FAQ Statis", "Tidak Ada", "Tidak Ada"],
        ["5. Kalkulator Gramatur", "Otomatis & Real-Time per Lembar", "Manual per Paket Box", "Kalkulator Standar", "Taksiran Kasir Manual", "Taksiran Kasir Manual"],
        ["6. Jilid Skripsi Kilat", "Kustomisasi Standar Universitas", "Tidak Menyediakan", "Terbatas Softcover", "Lengkap & Cepat", "Tersedia namun Antre"],
        ["7. Metode Pembayaran", "LapakPay Wallet & Dynamic QRIS", "Kartu Kredit & Invoice B2B", "Transfer Bank & E-Wallet", "Tunai & QRIS Statis", "Dominan Uang Tunai"],
        ["8. Arsitektur Storage", "Hybrid (Supabase DB + Cloudinary)", "Dedicated Cloud AWS S3", "Server Storage Tunggal", "Flashdisk / Komputer Toko", "Flashdisk Colok Manual"],
        ["9. AI Offline Fallback", "Tersedia (Ollama & LMStudio Lokal)", "Tidak Ada", "Tidak Ada", "Tidak Ada", "Tidak Ada"],
        ["10. Transparansi Waktu", "Estimasi Waktu Ambil Real-Time", "Estimasi Kurir Ekspedisi", "Estimasi Kurir Ekspedisi", "Menunggu di Lokasi", "Mengantre di Depan Toko"],
        ["11. Rata-Rata Waktu Tunggu", "< 15 Menit (Loket Kilat)", "2 - 5 Hari Kerja (Kurir)", "1 - 3 Hari Kerja (Kurir)", "1 - 3 Jam di Tempat", "30 - 90 Menit Antrean"],
        ["12. Model Operasional", "Marketplace Mitra Lokal Kampus", "Pabrik Cetak Terpusat", "Sentralisasi Produksi", "Toko Fisik Tunggal", "Toko Fisik Tunggal"]
    ]
    col_w_bm = [Inches(1.5), Inches(1.3), Inches(1.1), Inches(1.1), Inches(1.1), Inches(1.1)]
    create_table_custom(doc, headers_bm, data_bm, col_w_bm)

    add_p(doc,
        "Temuan dari benchmarking matriks di atas menunjukkan keunggulan komparatif LapakPrint: "
        "sementara platform besar seperti Printerous berfokus pada volume B2B korporat dengan waktu pengiriman kurir berhari-hari, "
        "LapakPrint mengisi celah pasar hiper-lokal (*hyperlocal on-demand printing*) yang membutuhkan waktu penyelesaian "
        "dalam hitungan menit dengan harga ramah kantong mahasiswa. Dibandingkan fotokopi konvensional, LapakPrint memberikan "
        "lompatan modernisasi drastis melalui antarmuka mobile e-commerce, integrasi AI, dan jaminan keamanan berkas digital."
    )

    add_h2(doc, "3.2 State-of-the-Art Literature Review (Tinjauan Pustaka Ilmiah)")
    add_p(doc,
        "Pengembangan sistem LapakPrint berlandaskan pada riset ilmiah dan publikasi terkini di bidang rekayasa "
        "perangkat lunak, kecerdasan buatan, komputasi awan, dan interaksi manusia-komputer. Berikut adalah sintesis pustaka ilmiah "
        "yang menjadi fondasi teoretis sistem:"
    )

    add_h3(doc, "3.2.1 Cloud-Native Containerization & Microservices Architecture")
    add_p(doc,
        "Penelitian oleh Merkel (2014) dan Burns et al. (2016) menegaskan bahwa kontainerisasi menggunakan Docker menyediakan "
        "lingkungan eksekusi yang terisolasi, ringan, dan reproduktif (reproducible runtime) melampaui mesin virtual tradisional. "
        "Dalam proyek LapakPrint, Docker Compose digunakan untuk mengorkestrasi 4 layanan mikro: layanan penalaran otonom "
        "(Nous Research Hermes Agent), gerbang AI terpadu (9router), antarmuka web ChatGPT-style (Open WebUI), dan secure reverse "
        "proxy tunneling (Ngrok). Penggunaan jaringan jembatan virtual internal (virtual bridge network `lapakprint-net`) "
        "memungkinkan komunikasi antarlayanan berlangsung pada latensi sub-milidetik secara terenkripsi dan aman dari eksposur eksternal."
    )

    add_h3(doc, "3.2.2 Autonomous Coding Agents & LLM Execution Harness")
    add_p(doc,
        "Evolusi Large Language Models (LLM) telah bergeser dari sekadar model obrolan teks (chatbots) menjadi agen otonom "
        "yang mampu memanipulasi kode dan sistem berkas, sebagaimana dipaparkan oleh Schick et al. (2023) dalam teori Toolformer "
        "dan Yao et al. (2023) dalam kerangka kerja ReAct (Reasoning and Acting). LapakPrint dikembangkan menggunakan "
        "harness agen cerdas Antigravity yang dipadukan dengan Cursor AI Editor. Arsitektur harness ini menyediakan "
        "sandboxed Code Mode runtime di mana model AI dapat membaca konteks proyek, melakukan refaktorisasi multi-file secara atomik, "
        "mengeksekusi perintah shell Git dan Docker, serta memvalidasi hasil build secara otonom tanpa intervensi manual repetitif."
    )

    add_h3(doc, "3.2.3 AI Gateway, Dynamic Token Routing, and Dynamic Failover")
    add_p(doc,
        "Tantangan terbesar dalam mengandalkan API model kecerdasan buatan komersial adalah batasan kuota frekuensi "
        "(Rate Limit HTTP 429) dan latensi jaringan yang fluktuatif (Zheng et al., 2023). Untuk mengatasi hal ini, "
        "arsitektur LapakPrint mengadopsi pola AI Gateway (9router dan xKiro) yang mengimplementasikan spesifikasi antarmuka standar "
        "OpenAI API. Pola ini memisahkan aplikasi klien dari penyedia hulu (upstream provider). Jika rute utama "
        "(Google Gemini Antigravity) mengalami lonjakan trafik atau kehabisan token gratis, gateway secara cerdas "
        "mengalihkan permintaan ke rute cadangan (SiliconFlow atau OpenRouter), dan jika koneksi internet terputus, permintaan "
        "dapat didelegasikan ke mesin inferensi lokal (Ollama / LMStudio) secara transparan."
    )

    add_h3(doc, "3.2.4 Multimodal Generative AI (Vision-to-Diffusion Pipeline)")
    add_p(doc,
        "Integrasi antara model Large Vision-Language Models (LVLM) dengan model difusi gambar teks-ke-gambar (Text-to-Image Diffusion) "
        "merupakan garis depan riset kecerdasan buatan generatif saat ini (Rombach et al., 2022; Achiam et al., 2023). "
        "LapakPrint mengimplementasikan pipeline multimodal 'Vision-to-Diffusion': model Google Gemini 3.8 Flash Vision "
        "bertindak sebagai 'kurator visual' yang menganalisis sketsa kasar, tata letak pamflet yang digambar tangan oleh mahasiswa, "
        "atau foto materi seminar, kemudian mengekstraksi komposisi warna, pencahayaan, dan tipografi ke dalam prompt terstruktur. "
        "Prompt hasil analisis tersebut kemudian diumpankan ke model difusi generasi terbaru (FLUX / SDXL) melalui API Runware "
        "sehingga menghasilkan materi cetak beresolusi ultra-tinggi dalam hitungan detik."
    )

    add_h3(doc, "3.2.5 Hybrid Cloud Storage Tiering Optimization")
    add_p(doc,
        "Dalam rekayasa sistem penyimpanan terdistribusi, prinsip 'Data Storage Tiering' memisahkan data transaksi terstruktur "
        "dari berkas biner berukuran besar (Binary Large Objects / BLOB) (DeCandia et al., 2007). Basis data relasional "
        "PostgreSQL pada Supabase dioptimalkan khusus untuk data transaksional ACID berfrekuensi tinggi (tabel pengguna, "
        "riwayat pesanan, saldo dompet, verifikasi QRIS) yang hanya mengonsumsi ruang penyimpanan teks kecil (< 50 MB untuk puluhan ribu transaksi). "
        "Sementara itu, berkas PDF dokumen cetak, foto pasfoto, dan berkas poster yang berukuran 5 MB hingga 100 MB per berkas "
        "didelegasikan langsung ke Cloud Storage Cloudinary yang memiliki kapasitas gratis 5 GB dan jaringan Content Delivery Network (CDN) "
        "global. Pendekatan ini menjaga sistem tetap 100% gratis pada batas free tier tanpa pernah mengorbankan performa query database."
    )

    doc.add_page_break()
    print("Chapter 3 completed successfully.")

if __name__ == "__main__":
    doc = docx.Document()
    add_chapter_3(doc)
    doc.save("test_ch3.docx")
    print("Saved test_ch3.docx")
