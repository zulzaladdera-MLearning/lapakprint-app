import React from 'react';
import { HelpCircle } from 'lucide-react';
import SocialAuthButtons from './SocialAuthButtons';

export default function SignUpFormCard({
  phoneNumber,
  setPhoneNumber,
  keepLoggedIn,
  setKeepLoggedIn,
  onSignUpSubmit,
  onSocialLogin,
  onSwitchToLogin
}) {
  return (
    <div>
      <div className="mb-6">
        <h3 className="text-xl font-medium text-slate-800">
          Daftar
        </h3>
      </div>

      <form onSubmit={onSignUpSubmit} className="space-y-4">
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

        <button
          type="submit"
          className="w-full py-3 bg-sky-500 hover:bg-sky-600 text-white font-medium uppercase text-sm rounded-xs tracking-wider transition shadow-2xs"
        >
          BERIKUTNYA
        </button>

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

        <SocialAuthButtons onSocialLogin={onSocialLogin} />

        <div className="pt-4 text-center text-xs text-slate-500">
          Punya akun?{' '}
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="text-sky-500 font-medium hover:underline focus:outline-none"
          >
            Log In
          </button>
        </div>
      </form>
    </div>
  );
}
