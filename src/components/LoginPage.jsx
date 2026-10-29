import React, { useState } from 'react';
import { MOCK_USERS } from '../data/mockData';
import LoginFormCard from '../features/auth/LoginFormCard';
import SignUpFormCard from '../features/auth/SignUpFormCard';

export default function LoginPage({ onLoginSuccess }) {
  // 'login' | 'signup'
  const [viewMode, setViewMode] = useState('login');
  
  // Login form state
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);

  // Sign up form state
  const [phoneNumber, setPhoneNumber] = useState('');

  // Selected Demo Role for simulation
  const [selectedRole, setSelectedRole] = useState('mahasiswa'); // 'mahasiswa' | 'mitra' | 'superadmin'

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
      {/* 1. TOP HEADER */}
      <header className="bg-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className="flex items-center space-x-2 text-sky-500 cursor-pointer">
              <svg 
                className="w-10 h-10 fill-current text-sky-500" 
                viewBox="0 0 250 250"
              >
                <path d="M195.2 69.8H165V54.2C165 24.3 140.7 0 110.8 0S56.6 24.3 56.6 54.2v15.6H26.4c-9.7 0-17.6 7.9-17.6 17.6l14.2 143.6c.9 8.9 8.4 15.6 17.3 15.6h139.9c8.9 0 16.4-6.8 17.3-15.6l14.2-143.6c0-9.7-7.8-17.6-17.5-17.6zM82.8 54.2c0-15.4 12.6-28 28-28s28 12.6 28 28v15.6H82.8V54.2zm92.6 161.4H45.8l-12.7-128h158.4l-12.6 128h-3.5z" />
                <path fill="#0284c7" d="M96 90h26c15.5 0 27 9.5 27 24s-11.5 24-27 24h-13v34H96V90zm13 35h13c7.5 0 14-4 14-11s-6.5-11-14-11h-13v22z" />
              </svg>
              <span className="text-3xl font-bold tracking-tight text-sky-600 font-sans">
                LapakPrint
              </span>
            </div>

            <span className="text-xl sm:text-2xl text-slate-800 font-medium pl-2 sm:pl-3">
              {viewMode === 'login' ? 'Log In' : 'Daftar'}
            </span>
          </div>

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

      {/* 2. MAIN HERO BANNER AREA */}
      <main className="bg-sky-500 flex-1 flex items-center py-10 lg:py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Sisi Kiri: Slogan */}
            <div className="lg:col-span-7 flex flex-col items-center justify-center text-center text-white py-4">
              <div className="w-36 h-36 sm:w-44 sm:h-44 flex items-center justify-center">
                <svg 
                  className="w-full h-full fill-white drop-shadow-sm" 
                  viewBox="0 0 250 250"
                >
                  <path d="M195.2 69.8H165V54.2C165 24.3 140.7 0 110.8 0S56.6 24.3 56.6 54.2v15.6H26.4c-9.7 0-17.6 7.9-17.6 17.6l14.2 143.6c.9 8.9 8.4 15.6 17.3 15.6h139.9c8.9 0 16.4-6.8 17.3-15.6l14.2-143.6c0-9.7-7.8-17.6-17.5-17.6zM82.8 54.2c0-15.4 12.6-28 28-28s28 12.6 28 28v15.6H82.8V54.2zm92.6 161.4H45.8l-12.7-128h158.4l-12.6 128h-3.5z" />
                  <path fill="#0ea5e9" d="M96 90h26c15.5 0 27 9.5 27 24s-11.5 24-27 24h-13v34H96V90zm13 35h13c7.5 0 14-4 14-11s-6.5-11-14-11h-13v22z" />
                </svg>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-2">
                LapakPrint
              </h2>
              <p className="text-xl sm:text-2xl font-bold tracking-wide mt-2 text-white/95">
                Lebih Hemat Lebih Cepat
              </p>
            </div>

            {/* Sisi Kanan: Kartu Putih Mengambang */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="bg-white rounded-xs sm:rounded-sm shadow-xl p-7 sm:p-8 w-full max-w-[400px]">
                {viewMode === 'login' ? (
                  <LoginFormCard
                    loginIdentifier={loginIdentifier}
                    setLoginIdentifier={setLoginIdentifier}
                    password={password}
                    setPassword={setPassword}
                    keepLoggedIn={keepLoggedIn}
                    setKeepLoggedIn={setKeepLoggedIn}
                    onLoginSubmit={handleLoginSubmit}
                    onSocialLogin={handleSocialLogin}
                    onSwitchToSignUp={() => setViewMode('signup')}
                  />
                ) : (
                  <SignUpFormCard
                    phoneNumber={phoneNumber}
                    setPhoneNumber={setPhoneNumber}
                    keepLoggedIn={keepLoggedIn}
                    setKeepLoggedIn={setKeepLoggedIn}
                    onSignUpSubmit={handleSignUpSubmit}
                    onSocialLogin={handleSocialLogin}
                    onSwitchToLogin={() => setViewMode('login')}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* 3. SIMULATION DEMO CONTROLLER */}
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

      {/* 4. FOOTER */}
      <footer className="bg-white border-t border-slate-100 py-6 text-center text-[11px] text-slate-400">
        <div className="max-w-6xl mx-auto px-4 space-y-1">
          <p>© 2026 LapakPrint. Hak Cipta Dilindungi Undang-Undang.</p>
          <p>Negara: Indonesia | Singapura | Malaysia | Thailand | Vietnam | Filipina</p>
        </div>
      </footer>
    </div>
  );
}
