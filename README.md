# 🖨️ LapakPrint - Marketplace Jasa Percetakan & Jilid Skripsi Kampus

[![Deploy with Vercel](https://vercel.com/button)](https://lapakprint-app.vercel.app)
[![Android APK](https://img.shields.io/badge/Download-Android%20APK%20(4.2MB)-brightgreen?logo=android)](https://lapakprint-app.vercel.app/downloads/LapakPrint.apk)
[![Vercel Status](https://img.shields.io/badge/Vercel-Live%20Production-blue?logo=vercel)](https://lapakprint-app.vercel.app)

**LapakPrint** adalah platform marketplace jasa percetakan, jilid skripsi, dan fotokopi berbasis kampus yang dirancang dengan antarmuka e-commerce familiar bergaya Shopee (Shopee-like UX). Platform ini terintegrasi multi-platform (**1 Aplikasi Web** dan **1 Aplikasi Mobile Native Android**) dengan dompet digital **LapakPay** dan pembayaran **QRIS Escrow**.

---

## 🌐 Tautan Live Aplikasi

- **Web Application (Vercel Live)**: [https://lapakprint-app.vercel.app](https://lapakprint-app.vercel.app)
- **Direct Download Android APK**: [https://lapakprint-app.vercel.app/downloads/LapakPrint.apk](https://lapakprint-app.vercel.app/downloads/LapakPrint.apk)
- **GitHub Repository**: [https://github.com/zulzaladdera-MLearning/lapakprint-app](https://github.com/zulzaladdera-MLearning/lapakprint-app)

---

## 🚀 Ekosistem & Orkestrasi Teknologi

Proyek ini dibangun dan diorkestrasi menggunakan arsitektur modern berstandar industri:

1. **Cursor**: AI Code Editor untuk refactoring arsitektur komponen modular (< 500 baris/file).
2. **Antigravity**: Otonomous agent harness untuk automasi build pipeline, konfigurasi toolchain Java 21, dan integrasi Vercel CLI.
3. **Hermes Agent**: Reasoning engine otonom dari Nous Research (`nousresearch/hermes-agent:latest`) pada port `8642`.
4. **Docker**: Platform kontainerisasi untuk mengisolasi multi-service: `hermes-service`, `nine-router`, `hermes-webui`, dan `lapakprint-ngrok`.
5. **Distributed AI Failover Pool**:
   - **Primary**: 9router Local Docker Gateway (`ag/gemini-3.8-flash-high`)
   - **Cloud Failover 1**: **xKiro AI Gateway** (`https://api.xkiro.com/v1`, 103+ model hub)
   - **Cloud Failover 2**: OpenRouter Aggregator (`gemini-2.0-flash-exp:free`)
   - **Cloud Failover 3**: SiliconFlow Cloud Engine (`Qwen2.5-7B-Instruct`)
   - **Local Engine**: Ollama Hermes 3:3B & LMStudio
   - **Image Diffusion**: Runware Fast FLUX 300 DPI Poster Studio
6. **Hybrid Cloud Storage**:
   - **Cloudinary CDN (5 GB Free Tier)**: Direct unsigned upload untuk file biner PDF dokumen dan poster.
   - **Supabase PostgreSQL (< 1 GB Meta)**: Persistensi relasional data pesanan, status cetak, dan URL CDN.
7. **Ngrok & Multiplatform Apps**:
   - **Secure Tunneling**: Reverse proxy (`https://appealing-issue-shimmer.ngrok-free.dev`) untuk akses mobile remote.
   - **Web App**: Dibangun dengan Vite + React 18 + Tailwind CSS, live di Vercel.
   - **Mobile App**: Dibungkus menggunakan Capacitor (`id.lapakprint.app`), dikompilasi dengan Microsoft OpenJDK 21 dan Android SDK 36 menghasilkan `LapakPrint.apk`.

---

## 📱 Fitur Utama

- 🛍️ **Katalog Percetakan Kampus**: Cetak dokumen kilat, hard cover skripsi standar universitas, jilid spiral kawat, plotter blueprint, dan poster A3+.
- 💳 **LapakPay & QRIS Escrow**: Simulasi dompet digital mahasiswa dan pembayaran kode QRIS otomatis.
- 🔄 **Multi-Peran**: Beralih peran instan antara Mahasiswa (Customer) dan Mitra Toko Percetakan (Seller Center).
- 📲 **In-App Direct APK Installer**: Tombol unduh file `.apk` langsung di Header Desktop dan Halaman Akun Mobile.

---

## 🛠️ Panduan Menjalankan Proyek Lokal

```bash
# 1. Clone repository
git clone https://github.com/zulzaladdera-MLearning/lapakprint-app.git
cd lapakprint-app

# 2. Install dependensi web
npm install

# 3. Jalankan development server
npm run dev

# 4. Build dan sinkronisasi mobile Android
npm run build
npx cap sync
cd android
./gradlew assembleDebug
```

---

## 📄 Berkas Laporan Dokumentasi

Dokumentasi lengkap proyek beserta panduan tangkapan layar 7 komponen telah tersedia dalam format Word:
📂 **`Laporan_Proyek_LapakPrint.docx`**
