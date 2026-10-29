# -*- coding: utf-8 -*-
"""
Chapter 4: Technology Architecture, Hybrid Infrastructure, and Distributed AI Orchestration
"""
import docx
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT
from build_report_core import apply_tnr_run, add_p, add_h1, add_h2, add_h3, add_bullet, create_table_custom

def add_chapter_4(doc):
    # ================= BAB IV =================
    add_h1(doc, "BAB IV: ARSITEKTUR TEKNOLOGI DAN STRATEGI INFRASTRUKTUR HYBRID")
    
    add_h2(doc, "4.1 Taksonomi Komprehensif Ekosistem Tech Stack LapakPrint")
    add_p(doc,
        "Ekosistem LapakPrint dibangun menggunakan kombinasi 18 instrumen teknologi modern yang dikelompokkan ke dalam "
        "enam lapisan arsitektur: Antarmuka Pengguna & Mobile, Backend & Database, Komputasi Cloud & CDN, "
        "Kecerdasan Buatan & Penalaran, Orkestrasi Kontainerisasi, serta Identitas & Komunikasi Bisnis. "
        "Matriks berikut memaparkan rincian teknis, versi, dan peran spesifik masing-masing komponen:"
    )

    headers_tech = ["No", "Komponen Teknologi", "Lapisan Arsitektur", "Versi / Lisensi", "Fungsi & Peran Spesifik dalam LapakPrint"]
    data_tech = [
        ["1", "Antigravity", "Agent Harness CLI", "v2.0 (Confined)", "Agent runtime harness yang mengeksekusi tool calling shell, Git, Docker, dan code refactoring."],
        ["2", "Cursor", "AI Coding IDE", "v0.42+ (VS Code Fork)", "Editor pemrograman berbasis AI untuk pengkodean kontekstual multi-file dan perancangan komponen UI."],
        ["3", "Docker Hermes", "Reasoning Service", "hermes-agent:latest", "Container penalaran berbasis Nous Research untuk menyelesaikan instruksi kompleks dan asistensi percetakan."],
        ["4", "Docker 9router", "AI Gateway Hub", "decolua/9router:latest", "Reverse proxy gateway AI yang meneruskan API OpenAI-compatible ke Google Gemini Antigravity."],
        ["5", "xKiro AI Gateway", "Multi-Model AI Hub", "v1 API Gateway", "Penyedia rute AI multi-provider cloud lapis pertama (103 model / 14 provider, DeepSeek-V3 & GPT-4o)."],
        ["6", "Docker Ngrok", "Secure Tunneling", "ngrok/ngrok:latest", "Container pengekspos port lokal 8080 ke URL publik HTTPS (appealing-issue-shimmer.ngrok-free.dev)."],
        ["7", "GitHub", "VCS & CI/CD", "Public Cloud", "Penyimpanan repositori kode sumber dan pipeline otomatisasi Vercel deployment."],
        ["8", "Vercel", "Edge Web Hosting", "Global Edge Network", "Hosting web production 24 jam nonstop (https://lapakprint-app.vercel.app) dengan auto-SSL."],
        ["9", "Supabase", "Relational Database", "PostgreSQL 15 (BaaS)", "Penyimpanan data terstruktur transaksi, akun pengguna, relasi pesanan, dan verifikasi QRIS."],
        ["10", "Gemini API", "Cloud Multimodal AI", "Gemini 3.8 Flash High", "Otak AI cloud untuk analisis teks, konsultasi percetakan, dan kurasi visual sketsa poster."],
        ["11", "Ollama + Models", "Local AI Engine", "v0.5+ / hermes3:3b", "Mesin inferensi AI lokal di host Windows untuk fallback saat kuota cloud habis atau offline."],
        ["12", "LMStudio", "Local LLM Server", "v0.3+ (OpenAI Server)", "Server model lokal alternatif yang mengekspos endpoint OpenAI-compatible di localhost:1234."],
        ["13", "SiliconFlow", "High-Speed AI Cloud", "OpenAI Dialect API", "Penyedia rute AI cadangan berkecepatan tinggi untuk model open-weights (DeepSeek / Qwen)."],
        ["14", "OpenRouter", "AI Model Aggregator", "Unified API v1", "Gerbang agregasi multi-model AI global untuk load balancing dan redundansi token."],
        ["15", "Runware", "Image Diffusion API", "Fast FLUX / SDXL", "Mesin pembentuk gambar poster dan banner resolusi ultra-tinggi dalam hitungan sub-detik."],
        ["16", "Cloudinary", "Object Storage & CDN", "Media Cloud API v2", "Penyimpanan berkas fisik PDF dokumen, jilid skripsi, foto pasfoto, dan poster hingga 5 GB."],
        ["17", "Zoho Mail", "Professional Email", "Forever Free Plan", "Layanan email bisnis custom domain untuk verifikasi akun developer dan klaim kredit API Runware."],
        ["18", "Domain Registrar", "DNS Management", "Top-Level Domain", "Pengatur rekaman DNS (A, CNAME, MX, SPF, DKIM) untuk identitas brand resmi LapakPrint."],
        ["19", "Capacitor Android", "Mobile Framework", "Capacitor 6 / Java 21", "Framework pembungkus web Vite menjadi binary native Android APK mandiri (SDK 36)."]
    ]
    col_w_tech = [Inches(0.4), Inches(1.3), Inches(1.2), Inches(1.1), Inches(2.7)]
    create_table_custom(doc, headers_tech, data_tech, col_w_tech)

    add_h2(doc, "4.2 Strategi Identitas Domain, Hosting Vercel, & Akun Bisnis Zoho")
    add_p(doc,
        "Untuk mentransformasikan purwarupa aplikasi menjadi produk berstandar komersial dengan kredibilitas tinggi, "
        "diterapkan strategi pengelolaan identitas domain dan email bisnis terpadu. Langkah-langkah strategis ini meliputi:"
    )
    add_bullet(doc, "Memilih dan mendaftarkan nama domain yang mudah diingat civitas akademika (misal: lapakprint.my.id atau lapakprint.com) melalui registrar yang mendukung pengelolaan DNS penuh tanpa biaya tersembunyi.", "1. Pendaftaran Domain Kustom Terkelola: ")
    add_bullet(doc, "Mengarahkan A Record domain utama (@) ke IP Vercel Edge Server (76.76.21.21) dan CNAME www ke cname.vercel-dns.com, sehingga aplikasi web otomatis terproteksi sertifikat SSL/TLS kelas A+ dari Let's Encrypt.", "2. Integrasi DNS ke Vercel Cloud: ")
    add_bullet(doc, "Mendaftarkan paket Zoho Mail Forever Free Plan yang menyediakan 5 kotak surat bisnis gratis selamanya. Melakukan verifikasi domain via TXT Record, menambahkan 3 MX Record Zoho, serta menyematkan SPF (v=spf1 include:zoho.com ~all) dan DKIM TXT Record agar email resmi tidak pernah masuk ke folder spam.", "3. Konfigurasi Email Bisnis Kustom Zoho: ")
    add_bullet(doc, "Banyak platform cloud AI mutakhir (termasuk Runware) menolak pendaftaran menggunakan alamat email gratisan publik (@gmail.com atau @yahoo.com) untuk mencegah penyalahgunaan bot, namun memberikan sambutan berupa kredit awal $2 hingga program developer/startup bernilai $1.000 API balance jika mendaftar menggunakan email berdomain bisnis resmi (@lapakprint.my.id). Kredit ini kemudian dimanfaatkan sepenuhnya untuk mentenagai fitur auto-generate poster dan upscaler gambar dokumen tanpa mengeluarkan modal tunai.", "4. Akselerasi Developer Credit Runware ($2 s.d. $1.000): ")

    add_h2(doc, "4.3 Arsitektur Penyimpanan Hybrid (Supabase 1 GB + Cloudinary 5 GB)")
    add_p(doc,
        "Salah satu kendala paling kritis dalam merancang platform percetakan on-demand adalah ukuran berkas dokumen cetak. "
        "Satu naskah skripsi mahasiswa lengkap dengan lampiran data dan gambar dapat berukuran antara 20 MB hingga 70 MB. "
        "Jika 500 mahasiswa mengunggah skripsi ke basis data Supabase Free Tier yang memiliki batas kuota penyimpanan 1 GB, "
        "maka kapasitas server akan terkuras habis hanya dalam beberapa hari."
    )
    add_p(doc,
        "Untuk memecahkan dilema tersebut, LapakPrint mengimplementasikan arsitektur 'Hybrid Storage Tiering':"
    )
    add_bullet(doc, "Aplikasi frontend (Web React atau APK Android) mengunggah berkas PDF dokumen langsung ke server Cloudinary menggunakan Unsigned Upload Preset yang telah diproteksi pembatasan format berkas (PDF, DOCX, PNG, JPG). File tidak pernah menyentuh server backend secara langsung, menghemat beban memori server.", "a. Direct Client-to-Cloudinary Upload: ")
    add_bullet(doc, "Setelah berkas tersimpan aman di jaringan CDN global Cloudinary, API Cloudinary mengembalikan respons JSON berisi secure_url (tautan HTTPS berkas), public_id, format dokumen, dan ukuran berkas (bytes).", "b. Metadata URL Resolution: ")
    add_bullet(doc, "Aplikasi kemudian hanya mengirimkan string tautan secure_url tersebut beserta metadata transaksi (ID pengguna, judul tugas, jumlah lembar, gramatur kertas, tipe jilid, total harga) ke basis data Supabase PostgreSQL pada tabel `print_files` dan `orders`.", "c. Relational Persistence di Supabase: ")

    headers_stor = ["Kategori Berkas", "Tempat Penyimpanan", "Kapasitas Tersedia", "Format Data", "Dampak Efisiensi Kuota"]
    data_stor = [
        ["Berkas Fisik PDF Skripsi & Dokumen", "Cloudinary Storage CDN", "5.000 MB (5 GB Free)", "Binary Encrypted File", "Menghemat 100% kuota storage Supabase."],
        ["Poster Seminar & Desain Banner A1/A0", "Cloudinary Storage CDN", "5.000 MB (5 GB Free)", "High-Res Image (PNG/JPG)", "Bebas bandwidth bottleneck pada database."],
        ["Data Akun, Pesanan, & Status Antrean", "Supabase PostgreSQL", "1.000 MB (1 GB Free)", "Relational Structured Rows", "Cukup untuk menyimpan > 1.000.000 baris transaksi."],
        ["Bukti Bayar & Hash Verifikasi QRIS", "Supabase PostgreSQL", "1.000 MB (1 GB Free)", "Transaction Hash & JSON", "Pencatatan real-time audit keuangan aman."]
    ]
    col_w_stor = [Inches(1.8), Inches(1.5), Inches(1.3), Inches(1.1), Inches(1.4)]
    create_table_custom(doc, headers_stor, data_stor, col_w_stor)

    add_h2(doc, "4.4 Orkestrasi AI Terdistribusi & Round-Robin Load Balancing")
    add_p(doc,
        "Untuk menjamin ketersediaan sistem kecerdasan buatan (*High Availability AI*) tanpa pernah mengalami downtime "
        "akibat kuota habis (HTTP 429 Resource Exhausted) atau kendala jaringan internet, LapakPrint menerapkan "
        "arsitektur orkestrasi AI terdistribusi dengan algoritma Round-Robin dan Failover Bertingkat (6-Layer Failover Pool)."
    )
    add_p(doc,
        "Alur kerja penanganan inferensi AI diatur secara dinamis dalam modul `src/services/aiRouter.js`. "
        "Setiap permintaan konsultasi cetak, kalkulasi gramatur, atau perintah pembuatan poster diteruskan ke "
        "gateway terpadu dengan hierarki failover otomatis sebagai berikut:"
    )
    add_bullet(doc, "Model Google Gemini 3.8 Flash High melalui otentikasi Antigravity OAuth (endpoint http://127.0.0.1:20129). Menyediakan penalaran cerdas, analisis dokumen berkecepatan tinggi, dan jendela konteks hingga 1 juta token.", "• Prioritas 1 (Primary Cloud AI - 9router): ")
    add_bullet(doc, "Gateway multi-model OpenAI-compatible terpadu (https://api.xkiro.com/v1) yang mengagregasikan 103 model dari 14 provider. Menggunakan model unggulan DeepSeek-V3 atau GPT-4o-mini dengan auto-failover jika rute utama mengalami jeda kuota 429.", "• Prioritas 2 (Cloud Failover 1 - xKiro AI Gateway): ")
    add_bullet(doc, "Gerbang agregator multi-provider global (https://openrouter.ai/api/v1) dengan model gratis berkecepatan tinggi google/gemini-2.0-flash-exp:free untuk redundansi kuota cadangan.", "• Prioritas 3 (Cloud Failover 2 - OpenRouter): ")
    add_bullet(doc, "Layanan cloud API berkecepatan tinggi untuk model open-weights berdaya komputasi besar (Qwen/Qwen2.5-7B-Instruct) melalui https://api.siliconflow.cn/v1.", "• Prioritas 4 (Cloud Failover 3 - SiliconFlow): ")
    add_bullet(doc, "Jika koneksi internet kampus mengalami pemadaman total (offline), sistem secara mulus beralih ke mesin inferensi lokal: Ollama host pada port 11434 (model hermes3:3b dari Nous Research) atau LMStudio pada port 1234. Pengguna tetap dapat berkonsultasi secara 100% lokal tanpa pulsa/kuota.", "• Prioritas 5 (Local Offline Engine - Ollama & LMStudio): ")
    add_bullet(doc, "Jika seluruh rute jaringan dan socket lokal tidak merespons, modul internal mengaktifkan algoritma penalaran bawaan terpasang (LapakPrint Hermes Smart Engine) yang menghasilkan kalkulasi estimasi cetak secara deterministik dalam 120 ms.", "• Prioritas 6 (Smart Built-in Assistant Fallback): ")

    add_h3(doc, "4.4.1 Pipeline Multimodal Generatif: 'Baca di Gemini Vision ➔ Buat di Runware'")
    add_p(doc,
        "Salah satu inovasi paling canggih dalam LapakPrint adalah integrasi dua model kecerdasan buatan berbeda "
        "menjadi satu rantai produksi visual otomatis (Chained Multimodal Pipeline):"
    )
    add_p(doc,
        "1. Tahap Pembacaan (Vision Analysis): Mahasiswa mengunggah foto sketsa tata letak poster yang digambar "
        "di atas secarik kertas atau foto pamflet rujukan. Foto tersebut dikirim ke Google Gemini 3.8 Flash Vision. "
        "Gemini menganalisis elemen hierarki visual: judul utama, sub-judul, tema warna (misal: 'futuristik biru dan emas'), "
        "ilustrasi utama, serta tata letak blok teks informasi."
    )
    add_p(doc,
        "2. Tahap Transformasi Sintaks: Gemini Vision menerjemahkan hasil analisisnya menjadi sebuah prompt difusi gambar "
        "berbahasa Inggris berstandar tinggi yang menyertakan parameter pencahayaan, rasio aspek (A1/A2/A3), dan resolusi 300 DPI."
    )
    add_p(doc,
        "3. Tahap Pembentukan Visual (Runware Image Synthesis): Prompt terstruktur tersebut di-hit secara otomatis "
        "ke API Runware menggunakan model FLUX.1 Schnell atau Stable Diffusion XL. Dalam waktu kurang dari 2 detik, "
        "Runware me-render desain poster beresolusi tinggi siap cetak, menyimpannya ke Cloudinary, dan langsung menampilkan "
        "pratinjau di layar smartphone mahasiswa bersama kalkulasi biaya cetak poster tersebut."
    )

    add_h2(doc, "4.5 Kontainerisasi Multi-Service Docker Compose Stack")
    add_p(doc,
        "Untuk mempermudah replikasi sistem pada komputer server penguji, dewan juri, maupun lingkungan produksi, "
        "seluruh layanan pendukung backend LapakPrint dikemas ke dalam arsitektur multi-container Docker Compose. "
        "File konfigurasi `docker-compose.yml` mendefinisikan empat kontainer yang berjalan secara harmonis:"
    )
    add_bullet(doc, "Berjalan pada image nousresearch/hermes-agent:latest (port 8642). Menjalankan agentic reasoning loop untuk mengeksekusi instruksi analitis percetakan kampus.", "1. Container hermes-service: ")
    add_bullet(doc, "Berjalan pada image decolua/9router:latest (port internal 20128, port eksternal host 20129). Mengelola kredensial OAuth Antigravity dan menerjemahkan panggilan API OpenAI ke penyedia LLM.", "2. Container nine-router: ")
    add_bullet(doc, "Berjalan pada image ghcr.io/open-webui/open-webui:main (port 8080). Menyediakan antarmuka web modern bergaya ChatGPT yang terhubung langsung ke nine-router melalui jaringan internal bridge `lapakprint-net`.", "3. Container hermes-webui: ")
    add_bullet(doc, "Berjalan pada image ngrok/ngrok:latest (port monitoring 4040). Menghubungkan port 8080 hermes-webui ke internet publik menggunakan domain statis HTTPS https://appealing-issue-shimmer.ngrok-free.dev.", "4. Container lapakprint-ngrok: ")

    add_h2(doc, "4.6 Arsitektur Keamanan Siber, Sanitasi Berkas, & Enkripsi Data Transaksi")
    add_p(doc,
        "Sebagai platform yang menangani dokumen akademik sensitif (seperti naskah draf skripsi sebelum sidang, "
        "laporan riset orisinal, dan berkas identitas mahasiswa), LapakPrint menerapkan protokol keamanan siber berlapis (defense-in-depth):"
    )
    add_bullet(doc, "Setiap berkas PDF atau gambar yang diunggah klien melewati validasi MIME-type di browser dan disanitasi menggunakan pembatasan tipe ekstensi di Cloudinary Unsigned Upload Preset. Berkas yang mengandung executable script (.exe, .bat, .sh, .js) secara otomatis ditolak sistem sebelum menyentuh penyimpanan cloud.", "1. Pre-Upload Binary Sanitization: ")
    add_bullet(doc, "Seluruh jalur transmisi data—dari aplikasi seluler ke Vercel Edge Server, dari browser ke Cloudinary CDN, dan dari gateway ke penyedia AI—terenkripsi penuh menggunakan protokol Transport Layer Security (TLS 1.3) dengan sertifikat SSL 256-bit kelas industri.", "2. End-to-End Encryption in Transit: ")
    add_bullet(doc, "Basis data Supabase mengimplementasikan PostgreSQL Row Level Security (RLS). Pengguna mahasiswa hanya diizinkan membaca dan memperbarui data pesanan miliknya sendiri, sementara operator mitra gerai hanya dapat mengakses pesanan yang ditugaskan ke tokonya.", "3. Row-Level Security (RLS) di PostgreSQL: ")
    add_bullet(doc, "Pengambilan berkas fisik di loket mitra gerai dilindungi oleh sistem 'Dynamic 6-Digit Pickup PIN'. Mitra toko tidak dapat mengubah status pesanan menjadi selesai (done) sebelum memverifikasi PIN yang ditunjukkan mahasiswa melalui layar aplikasinya.", "4. Verifikasi Pengambilan Berbasis PIN Kriptografis: ")

    headers_sec = ["Kategori Ancaman Siber", "Tingkat Risiko", "Vektor Serangan Potensial", "Mekanisme Mitigasi LapakPrint"]
    data_sec = [
        ["Injeksi Malware via File Cetak", "Tinggi (High)", "Mahasiswa mengunggah file macro/trojan berkedok naskah .pdf.", "Sandboxed Cloudinary storage menonaktifkan eksekusi skrip sisi server secara permanen."],
        ["Penyadapan Dokumen Skripsi", "Kritis (Critical)", "Man-in-the-middle attack saat mengunggah naskah skripsi di WiFi kampus.", "Enkripsi transmisi TLS 1.3 wajib dan akses berkas dilindungi private signed URL token."],
        ["Manipulasi Saldo Dompet LapakPay", "Kritis (Critical)", "Pengubahan nilai parameter saldo melalui inspeksi browser.", "Verifikasi saldo dan mutasi diproses secara atomik di sisi server Supabase DB RPC."],
        ["DDoS & Rate Limiting AI Gateway", "Sedang (Medium)", "Eksploitasi flooding prompt ke gateway 9router & xKiro.", "Penerapan sliding-window rate limit (maksimal 30 request/menit per alamat IP)."],
        ["Pencurian Akun & Session Hijacking", "Tinggi (High)", "Pencurian token otentikasi JWT via XSS browser.", "Penyimpanan token JWT dalam secure HTTP-only cookies dengan flag SameSite Strict."]
    ]
    col_w_sec = [Inches(1.8), Inches(1.1), Inches(2.3), Inches(1.8)]
    create_table_custom(doc, headers_sec, data_sec, col_w_sec)

    doc.add_page_break()
    print("Chapter 4 completed successfully.")

if __name__ == "__main__":
    doc = docx.Document()
    add_chapter_4(doc)
    doc.save("test_ch4.docx")
    print("Saved test_ch4.docx")
