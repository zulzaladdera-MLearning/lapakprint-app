import React, { useState } from 'react';
import { Eye, EyeOff, HelpCircle, QrCode } from 'lucide-react';
import SocialAuthButtons from './SocialAuthButtons';

export default function LoginFormCard({
  loginIdentifier,
  setLoginIdentifier,
  password,
  setPassword,
  keepLoggedIn,
  setKeepLoggedIn,
  onLoginSubmit,
  onSocialLogin,
  onSwitchToSignUp
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);

  return (
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
        <form onSubmit={onLoginSubmit} className="space-y-4">
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

          <button
            type="submit"
            className="w-full py-3 bg-sky-500 hover:bg-sky-600 text-white font-medium uppercase text-sm rounded-xs tracking-wider transition shadow-2xs"
          >
            LOG IN
          </button>

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

          <SocialAuthButtons onSocialLogin={onSocialLogin} />

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

          <div className="pt-2 text-center text-xs text-slate-500">
            Baru di LapakPrint?{' '}
            <button
              type="button"
              onClick={onSwitchToSignUp}
              className="text-sky-500 font-medium hover:underline focus:outline-none"
            >
              Daftar
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
