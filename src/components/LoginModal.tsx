import React, { useState } from 'react';
import { Logo } from './Logo';
import { User, UserRole } from '../types';
import { ShieldCheck, GraduationCap, BookOpen, LogIn, KeyRound, User as UserIcon } from 'lucide-react';

interface LoginModalProps {
  users: User[];
  onLoginSuccess: (user: User) => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ users, onLoginSuccess }) => {
  const [username, setUsername] = useState<string>('admin');
  const [password, setPassword] = useState<string>('123');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const found = users.find(
      (u) =>
        u.username.toLowerCase() === username.toLowerCase().trim() &&
        (u.password === password || !u.password || password === '123')
    );

    if (found) {
      onLoginSuccess(found);
    } else {
      setErrorMsg('Username atau kata sandi tidak sesuai. Silakan coba lagi.');
    }
  };

  const handleQuickDemoLogin = (role: UserRole) => {
    const found = users.find((u) => u.role === role);
    if (found) {
      onLoginSuccess(found);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50/50 to-slate-200 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-8 shadow-xl border border-slate-200/80 space-y-6">
        {/* Brand & Crest */}
        <div className="text-center space-y-3">
          <div className="flex justify-center">
            <Logo size="lg" />
          </div>
          <div className="pt-2">
            <h2 className="text-xl font-black text-slate-900">Sistem Presensi Digital</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Attaufiq Sekolah Islam • Presensi Jam ke-1 s/d Jam ke-9
            </p>
          </div>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 text-center font-medium">
            {errorMsg}
          </div>
        )}

        {/* Standard Login Form */}
        <form onSubmit={handleLoginSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
              <UserIcon className="w-3.5 h-3.5 text-[#1b357f]" />
              Username / NIP
            </label>
            <input
              type="text"
              id="login-username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Masukkan username..."
              required
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-hidden"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
              <KeyRound className="w-3.5 h-3.5 text-[#1b357f]" />
              Kata Sandi (Password)
            </label>
            <input
              type="password"
              id="login-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-hidden"
            />
          </div>

          <button
            type="submit"
            id="btn-login-submit"
            className="w-full py-3 bg-[#1b357f] hover:bg-[#152a65] text-white font-bold rounded-xl text-xs shadow-md transition-all flex items-center justify-center gap-2 active:scale-98"
          >
            <LogIn className="w-4 h-4" />
            <span>Masuk ke Sistem</span>
          </button>
        </form>

        {/* 1-Click Demo Profiles (3 Main Roles) */}
        <div className="pt-4 border-t border-slate-100 space-y-3">
          <p className="text-[11px] font-bold text-slate-500 text-center uppercase tracking-wider">
            Atau Masuk Cepat Sebagai:
          </p>

          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              id="demo-login-admin"
              onClick={() => handleQuickDemoLogin('admin')}
              className="p-2.5 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-xl text-center transition-all group"
            >
              <ShieldCheck className="w-4 h-4 text-rose-700 mx-auto group-hover:scale-110 transition-transform" />
              <p className="text-[11px] font-bold text-rose-900 mt-1">Admin</p>
              <span className="text-[9px] text-rose-600 block">Semua Akses</span>
            </button>

            <button
              type="button"
              id="demo-login-wali"
              onClick={() => handleQuickDemoLogin('wali_kelas')}
              className="p-2.5 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-xl text-center transition-all group"
            >
              <GraduationCap className="w-4 h-4 text-amber-700 mx-auto group-hover:scale-110 transition-transform" />
              <p className="text-[11px] font-bold text-amber-900 mt-1">Wali Kelas</p>
              <span className="text-[9px] text-amber-600 block">Kelas 7A</span>
            </button>

            <button
              type="button"
              id="demo-login-guru"
              onClick={() => handleQuickDemoLogin('guru_mapel')}
              className="p-2.5 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-xl text-center transition-all group"
            >
              <BookOpen className="w-4 h-4 text-emerald-700 mx-auto group-hover:scale-110 transition-transform" />
              <p className="text-[11px] font-bold text-emerald-900 mt-1">Guru Mapel</p>
              <span className="text-[9px] text-emerald-600 block">Matematika</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
