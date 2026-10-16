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

## 🚀 Ekosistem & Orkestrasi Teknologi (7 Komponen)

Proyek ini dibangun dan diorkestrasi menggunakan 7 pilar instrumen:

1. **Cursor**: AI Code Editor untuk refactoring katalog, pembersihan atribut Shopee ke LapakPrint, dan penyusunan komponen UI React.
2. **Antigravity**: Otonomous agent harness untuk automasi build pipeline, konfigurasi toolchain Java 21, dan integrasi Vercel CLI.
3. **Hermes Agent**: Reasoning engine otonom dari Nous Research (`nousresearch/hermes-agent:latest`) pada port `8642`.
4. **Docker**: Platform kontainerisasi untuk mengisolasi service `hermes-service` menggunakan Docker Desktop Engine v29.7.2.
5. **9router**: AI Gateway lokal (`http://127.0.0.1:20128`) untuk efisiensi perutean prompt LLM.
6. **Ngrok**: Secure reverse proxy tunneling (`https://appealing-issue-shimmer.ngrok-free.dev`) untuk pengujian tampilan responsif di ponsel pintar fisik.
7. **Multiplatform Apps**:
   - **Web App**: Dibangun dengan Vite + React 18 + Tailwind CSS, di-deploy di Vercel.
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
