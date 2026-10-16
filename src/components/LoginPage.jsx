import React, { useState } from 'react';
import { Eye, EyeOff, HelpCircle, QrCode } from 'lucide-react';
import { MOCK_USERS } from '../data/mockData';

export default function LoginPage({ onLoginSuccess }) {
  // 'login' | 'signup'
  const [viewMode, setViewMode] = useState('login');
  
  // Login form state
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);

  // Sign up form state
  const [phoneNumber, setPhoneNumber] = useState('');

  // Selected Demo Role for simulation
  const [selectedRole, setSelectedRole] = useState('mahasiswa'); // 'mahasiswa' | 'mitra'

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (selectedRole === 'mahasiswa') {
      onLoginSuccess({
        ...MOCK_USERS.mahasiswa,
        email: loginIdentifier || MOCK_USERS.mahasiswa.email
      });
    } else if (selectedRole === 'mitra') {
      onLoginSuccess({
        ...MOCK_USERS.mitra,
        email: loginIdentifier || MOCK_USERS.mitra.email
      });
    } else {
      onLoginSuccess({
        ...MOCK_USERS.superadmin,
        email: loginIdentifier || MOCK_USERS.superadmin.email
      });
    }
  };

  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    if (!phoneNumber) {
      alert("Silakan masukkan nomor telepon.");
      return;
    }
    alert(`Kode verifikasi OTP telah dikirimkan ke nomor ${phoneNumber}. Anda akan otomatis masuk.`);
    if (selectedRole === 'mahasiswa') {
      onLoginSuccess({
        ...MOCK_USERS.mahasiswa,
        phone: phoneNumber
      });
    } else if (selectedRole === 'mitra') {
      onLoginSuccess({
        ...MOCK_USERS.mitra,
        phone: phoneNumber
      });
    } else {
      onLoginSuccess({
        ...MOCK_USERS.superadmin,
        phone: phoneNumber
      });
    }
  };

  const handleSocialLogin = (platform) => {
    alert(`Simulasi login cepat dengan akun ${platform} berhasil!`);
    if (selectedRole === 'mahasiswa') {
      onLoginSuccess(MOCK_USERS.mahasiswa);
    } else if (selectedRole === 'mitra') {
      onLoginSuccess(MOCK_USERS.mitra);
    } else {
      onLoginSuccess(MOCK_USERS.superadmin);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      
      {/* 1. TOP HEADER (Sama persis Gambar 1 & 2) */}
      <header className="bg-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo & Page Title */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* Shopee-style shopping bag logo */}
            <div className="flex items-center space-x-2 text-sky-500 cursor-pointer">
              <svg 
                className="w-10 h-10 fill-current text-sky-500" 
                viewBox="0 0 250 250"
              >
                {/* Bag Body */}
                <path d="M195.2 69.8H165V54.2C165 24.3 140.7 0 110.8 0S56.6 24.3 56.6 54.2v15.6H26.4c-9.7 0-17.6 7.9-17.6 17.6l14.2 143.6c.9 8.9 8.4 15.6 17.3 15.6h139.9c8.9 0 16.4-6.8 17.3-15.6l14.2-143.6c0-9.7-7.8-17.6-17.5-17.6zM82.8 54.2c0-15.4 12.6-28 28-28s28 12.6 28 28v15.6H82.8V54.2zm92.6 161.4H45.8l-12.7-128h158.4l-12.6 128h-3.5z" />
                {/* LapakPrint 'P' emblem */}
                <path fill="#0284c7" d="M96 90h26c15.5 0 27 9.5 27 24s-11.5 24-27 24h-13v34H96V90zm13 35h13c7.5 0 14-4 14-11s-6.5-11-14-11h-13v22z" />
              </svg>
              <span className="text-3xl font-bold tracking-tight text-sky-600 font-sans">
                LapakPrint
              </span>
            </div>

            {/* Page Title: "Log In" (Gambar 1) atau "Daftar" (Gambar 2) */}
            <span className="text-xl sm:text-2xl text-slate-800 font-medium pl-2 sm:pl-3">
              {viewMode === 'login' ? 'Log In' : 'Daftar'}
            </span>
          </div>

          {/* Right Help Link */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => alert("Pusat Bantuan: Hubungi CS LapakPrint melalui WhatsApp di 0812-3456-7890")}
              className="text-xs sm:text-sm text-sky-500 hover:text-sky-600 hover:underline font-normal"
            >
              Butuh bantuan?
            </button>
          </div>

        </div>
      </header>

      {/* 2. MAIN HERO BANNER AREA (Sama persis Gambar 1 & 2 dengan Warna Biru Muda Opsi B) */}
      <main className="bg-sky-500 flex-1 flex items-center py-10 lg:py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Sisi Kiri: Logo Besar & Slogan "Lebih Hemat Lebih Cepat" */}
            <div className="lg:col-span-7 flex flex-col items-center justify-center text-center text-white py-4">
              {/* White Shopping Bag Logo */}
              <div className="w-36 h-36 sm:w-44 sm:h-44 flex items-center justify-center">
                <svg 
                  className="w-full h-full fill-white drop-shadow-sm" 
                  viewBox="0 0 250 250"
                >
                  <path d="M195.2 69.8H165V54.2C165 24.3 140.7 0 110.8 0S56.6 24.3 56.6 54.2v15.6H26.4c-9.7 0-17.6 7.9-17.6 17.6l14.2 143.6c.9 8.9 8.4 15.6 17.3 15.6h139.9c8.9 0 16.4-6.8 17.3-15.6l14.2-143.6c0-9.7-7.8-17.6-17.5-17.6zM82.8 54.2c0-15.4 12.6-28 28-28s28 12.6 28 28v15.6H82.8V54.2zm92.6 161.4H45.8l-12.7-128h158.4l-12.6 128h-3.5z" />
                  {/* LapakPrint 'P' emblem */}
                  <path fill="#0ea5e9" d="M96 90h26c15.5 0 27 9.5 27 24s-11.5 24-27 24h-13v34H96V90zm13 35h13c7.5 0 14-4 14-11s-6.5-11-14-11h-13v22z" />
                </svg>
              </div>

              {/* Brand Text */}
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-2">
                LapakPrint
              </h2>

              {/* Tagline Slogan */}
              <p className="text-xl sm:text-2xl font-bold tracking-wide mt-2 text-white/95">
                Lebih Hemat Lebih Cepat
              </p>
            </div>

            {/* Sisi Kanan: Kartu Putih Mengambang (Floating Card) */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="bg-white rounded-xs sm:rounded-sm shadow-xl p-7 sm:p-8 w-full max-w-[400px]">
                
                {/* =========================================
                    TAMPILAN 1: FORM LOG IN (PERSIS GAMBAR 1)
                   ========================================= */}
                {viewMode === 'login' && (
                  <div>
                    {/* Header Kartu: Log In + Bubble "Log in dengan QR" */}
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-medium text-slate-800">
                        Log In
                      </h3>

                      {/* Tooltip Kuning + QR Code Button */}
                      <div className="flex items-center space-x-1.5">
                        <div className="relative bg-[#fef6d8] border border-[#f59e0b] text-[#b45309] text-[11px] font-bold px-2 py-1 rounded-xs shadow-2xs flex items-center">
                          <span>Log in dengan QR</span>
                          {/* Triangle pointer */}
                          <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#fef6d8] border-t border-r border-[#f59e0b] rotate-45"></div>
                        </div>

                        <button
                          type="button"
                          onClick={() => setShowQrModal(!showQrModal)}
                          title="Log in dengan scan QR Code"
                          className="p-1 text-sky-500 hover:text-sky-600 transition"
                        >
                          <QrCode className="w-7 h-7" />
                        </button>
                      </div>
                    </div>

                    {/* QR Code Quick View (jika di-toggle) */}
                    {showQrModal ? (
                      <div className="py-6 flex flex-col items-center justify-center text-center space-y-3">
                        <div className="w-48 h-48 border-2 border-dashed border-sky-400 p-3 rounded-lg bg-slate-50 flex items-center justify-center">
                          <QrCode className="w-36 h-36 text-slate-800" />
                        </div>
                        <p className="text-xs text-slate-500">
                          Scan dengan aplikasi LapakPrint di HP Anda untuk login instan.
                        </p>
                        <button
                          onClick={() => setShowQrModal(false)}
                          className="text-xs font-bold text-sky-500 hover:underline"
                        >
                          Kembali ke Log In dengan Password
                        </button>
                      </div>
                    ) : (
                      <form onSubmit={handleLoginSubmit} className="space-y-4">
                        {/* Input 1: No. Handphone/Username/Email */}
                        <div>
                          <input
                            type="text"
                            required
                            value={loginIdentifier}
                            onChange={(e) => setLoginIdentifier(e.target.value)}
                            placeholder="No. Handphone/Username/Email"
                            className="w-full text-xs sm:text-sm px-3.5 py-3 border border-slate-300 rounded-xs focus:outline-none focus:border-sky-500 text-slate-800 placeholder-slate-400"
                          />
                        </div>

                        {/* Input 2: Password dengan Icon Mata & Lupa Password? */}
                        <div className="relative flex items-center">
                          <input
                            type={showPassword ? 'text' : 'password'}
                            required
                            value={password || 'password123'}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            className="w-full text-xs sm:text-sm pl-3.5 pr-28 py-3 border border-slate-300 rounded-xs focus:outline-none focus:border-sky-500 text-slate-800 placeholder-slate-400"
                          />
                          <div className="absolute right-3 flex items-center space-x-2 text-xs">
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="text-slate-400 hover:text-slate-600 focus:outline-none"
                            >
                              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                            <span className="text-slate-300">|</span>
                            <a
                              href="#forgot"
                              onClick={(e) => { e.preventDefault(); alert("Fitur reset sandi: Tautan telah dikirim ke email Anda."); }}
                              className="text-sky-500 hover:underline font-normal text-[11px] whitespace-nowrap"
                            >
                              Lupa Password?
                            </a>
                          </div>
                        </div>

                        {/* Tombol LOG IN */}
                        <button
                          type="submit"
                          className="w-full py-3 bg-sky-500 hover:bg-sky-600 text-white font-medium uppercase text-sm rounded-xs tracking-wider transition shadow-2xs"
                        >
                          LOG IN
                        </button>

                        {/* Checkbox Tetap Login */}
                        <div className="flex items-center space-x-1.5 text-xs text-slate-500 pt-0.5">
                          <input
                            type="checkbox"
                            id="keep-login-1"
                            checked={keepLoggedIn}
                            onChange={(e) => setKeepLoggedIn(e.target.checked)}
                            className="w-3.5 h-3.5 accent-sky-500 rounded-xs border-slate-300"
                          />
                          <label htmlFor="keep-login-1" className="cursor-pointer select-none">
                            Tetap Login
                          </label>
                          <HelpCircle className="w-3.5 h-3.5 text-slate-400 cursor-pointer" title="Tetap masuk di perangkat ini" />
                        </div>

                        {/* Divider ATAU */}
                        <div className="flex items-center my-4">
                          <div className="flex-1 border-t border-slate-200"></div>
                          <span className="px-3 text-[11px] text-slate-400 uppercase font-medium">
                            ATAU
                          </span>
                          <div className="flex-1 border-t border-slate-200"></div>
                        </div>

                        {/* Tombol Sosial Facebook & Google */}
                        <div className="grid grid-cols-2 gap-2.5">
                          <button
                            type="button"
                            onClick={() => handleSocialLogin('Facebook')}
                            className="py-2 px-3 border border-slate-300 hover:bg-slate-50 rounded-xs text-xs font-normal text-slate-700 flex items-center justify-center space-x-2 transition"
                          >
                            <svg className="w-4 h-4 fill-[#1877F2]" viewBox="0 0 24 24">
                              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                            </svg>
                            <span>Facebook</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => handleSocialLogin('Google')}
                            className="py-2 px-3 border border-slate-300 hover:bg-slate-50 rounded-xs text-xs font-normal text-slate-700 flex items-center justify-center space-x-2 transition"
                          >
                            <svg className="w-4 h-4" viewBox="0 0 24 24">
                              <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
                              <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z"/>
                              <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
                              <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
                            </svg>
                            <span>Google</span>
                          </button>
                        </div>

                        {/* Legal terms disclaimer */}
                        <p className="text-[10px] text-center text-slate-500 pt-3 leading-relaxed">
                          Dengan login, kamu menyetujui{' '}
                          <a href="#terms" onClick={(e) => e.preventDefault()} className="text-sky-500 hover:underline">
                            Syarat, Ketentuan dan Kebijakan dari LapakPrint
                          </a>{' '}
                          &{' '}
                          <a href="#privacy" onClick={(e) => e.preventDefault()} className="text-sky-500 hover:underline">
                            Kebijakan Privasi LapakPrint
                          </a>.
                        </p>

                        {/* Bottom Link: Baru di Shopee? Daftar */}
                        <div className="pt-2 text-center text-xs text-slate-500">
                          Baru di LapakPrint?{' '}
                          <button
                            type="button"
                            onClick={() => {
                              setViewMode('signup');
                              setShowQrModal(false);
                            }}
                            className="text-sky-500 font-medium hover:underline focus:outline-none"
                          >
                            Daftar
                          </button>
                        </div>
                      </form>
                    )}
                  </div>
                )}


                {/* =========================================
                    TAMPILAN 2: FORM DAFTAR (PERSIS GAMBAR 2)
                   ========================================= */}
                {viewMode === 'signup' && (
                  <div>
                    {/* Header Kartu: Daftar */}
                    <div className="mb-6">
                      <h3 className="text-xl font-medium text-slate-800">
                        Daftar
                      </h3>
                    </div>

                    <form onSubmit={handleSignUpSubmit} className="space-y-4">
                      {/* Input 1: Nomor Telepon */}
                      <div>
                        <input
                          type="tel"
                          required
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          placeholder="Nomor Telepon"
                          className="w-full text-xs sm:text-sm px-3.5 py-3 border border-slate-300 rounded-xs focus:outline-none focus:border-sky-500 text-slate-800 placeholder-slate-400"
                        />
                      </div>

                      {/* Tombol BERIKUTNYA */}
                      <button
                        type="submit"
                        className="w-full py-3 bg-sky-500 hover:bg-sky-600 text-white font-medium uppercase text-sm rounded-xs tracking-wider transition shadow-2xs"
                      >
                        BERIKUTNYA
                      </button>

                      {/* Checkbox Tetap Login */}
                      <div className="flex items-center space-x-1.5 text-xs text-slate-500 pt-0.5">
                        <input
                          type="checkbox"
                          id="keep-login-2"
                          checked={keepLoggedIn}
                          onChange={(e) => setKeepLoggedIn(e.target.checked)}
                          className="w-3.5 h-3.5 accent-sky-500 rounded-xs border-slate-300"
                        />
                        <label htmlFor="keep-login-2" className="cursor-pointer select-none">
                          Tetap Login
                        </label>
                        <HelpCircle className="w-3.5 h-3.5 text-slate-400 cursor-pointer" title="Tetap masuk di perangkat ini" />
                      </div>

                      {/* Divider ATAU */}
                      <div className="flex items-center my-4">
                        <div className="flex-1 border-t border-slate-200"></div>
                        <span className="px-3 text-[11px] text-slate-400 uppercase font-medium">
                          ATAU
                        </span>
                        <div className="flex-1 border-t border-slate-200"></div>
                      </div>

                      {/* Tombol Sosial Facebook & Google */}
                      <div className="grid grid-cols-2 gap-2.5">
                        <button
                          type="button"
                          onClick={() => handleSocialLogin('Facebook')}
                          className="py-2 px-3 border border-slate-300 hover:bg-slate-50 rounded-xs text-xs font-normal text-slate-700 flex items-center justify-center space-x-2 transition"
                        >
                          <svg className="w-4 h-4 fill-[#1877F2]" viewBox="0 0 24 24">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                          </svg>
                          <span>Facebook</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleSocialLogin('Google')}
                          className="py-2 px-3 border border-slate-300 hover:bg-slate-50 rounded-xs text-xs font-normal text-slate-700 flex items-center justify-center space-x-2 transition"
                        >
                          <svg className="w-4 h-4" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
                            <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z"/>
                            <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
                            <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
                          </svg>
                          <span>Google</span>
                        </button>
                      </div>

                      {/* Bottom Link: Punya akun? Log In */}
                      <div className="pt-4 text-center text-xs text-slate-500">
                        Punya akun?{' '}
                        <button
                          type="button"
                          onClick={() => setViewMode('login')}
                          className="text-sky-500 font-medium hover:underline focus:outline-none"
                        >
                          Log In
                        </button>
                      </div>
                    </form>
                  </div>
                )}

              </div>
            </div>

          </div>
        </div>
      </main>

      {/* 3. SUBTLE SIMULATION DEMO CONTROLLER (Memudahkan testing peran Mahasiswa vs Mitra) */}
      <div className="bg-slate-100 border-t border-slate-200 py-3 px-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
          <div className="flex items-center space-x-2 text-slate-600">
            <span className="font-bold text-sky-700 bg-sky-100 px-2 py-0.5 rounded">
              ⚡ Mode Simulasi LapakPrint:
            </span>
            <span>Target login saat tekan tombol:</span>
            <div className="inline-flex rounded-lg border border-slate-300 bg-white p-0.5">
              <button
                type="button"
                onClick={() => setSelectedRole('mahasiswa')}
                className={`px-2.5 py-1 rounded text-[11px] font-bold transition ${
                  selectedRole === 'mahasiswa'
                    ? 'bg-sky-500 text-white'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                👨‍🎓 Mahasiswa (Budi)
              </button>
              <button
                type="button"
                onClick={() => setSelectedRole('mitra')}
                className={`px-2.5 py-1 rounded text-[11px] font-bold transition ${
                  selectedRole === 'mitra'
                    ? 'bg-sky-500 text-white'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                🏪 Mitra Toko (Berkah Ilahi)
              </button>
              <button
                type="button"
                onClick={() => setSelectedRole('superadmin')}
                className={`px-2.5 py-1 rounded text-[11px] font-bold transition ${
                  selectedRole === 'superadmin'
                    ? 'bg-amber-500 text-slate-950 font-black'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                👑 Super Admin (Owner)
              </button>
            </div>
          </div>

          <div className="text-slate-400 text-[11px]">
            *Platform Layanan Cetak & Jilid Skripsi Berbasis Geofencing Kampus
          </div>
        </div>
      </div>

      {/* 4. FOOTER IDENTIK SHOPEE */}
      <footer className="bg-white border-t border-slate-100 py-6 text-center text-[11px] text-slate-400">
        <div className="max-w-6xl mx-auto px-4 space-y-1">
          <p>© 2026 LapakPrint. Hak Cipta Dilindungi Undang-Undang.</p>
          <p>Negara: Indonesia | Singapura | Malaysia | Thailand | Vietnam | Filipina</p>
        </div>
      </footer>

    </div>
  );
}
