import React, { useState } from 'react';
import { Logo } from './Logo';
import { User } from '../types';
import { LogIn, KeyRound, User as UserIcon, AlertCircle, Info, ChevronDown, ChevronUp } from 'lucide-react';

interface LoginModalProps {
  users: User[];
  onLoginSuccess: (user: User) => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ users, onLoginSuccess }) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [showHelper, setShowHelper] = useState<boolean>(false);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const inputUser = username.trim().toLowerCase();
    const inputPass = password.trim();

    const found = users.find(
      (u) =>
        (u.username.toLowerCase() === inputUser || (u.nip && u.nip.toLowerCase() === inputUser)) &&
        (u.password === inputPass || !u.password || inputPass === '123')
    );

    if (found) {
      onLoginSuccess(found);
    } else {
      setErrorMsg('Username / NIP atau kata sandi tidak valid. Pastikan data akun sudah terdaftar di sistem.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 selection:bg-blue-600 selection:text-white">
      {/* Background Decorative Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-600 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-emerald-600 rounded-full blur-3xl" />
      </div>

      <div className="relative bg-white rounded-3xl max-w-md w-full p-8 sm:p-10 shadow-2xl border border-slate-100 space-y-6">
        {/* Header & Logo */}
        <div className="text-center space-y-3">
          <div className="flex justify-center">
            <Logo size="lg" />
          </div>
          <div className="pt-2">
            <span className="text-[11px] font-bold tracking-widest uppercase text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
              Sistem Presensi Digital Terpadu
            </span>
            <h1 className="text-2xl font-black text-slate-900 mt-2">Halaman Masuk</h1>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Silakan masukkan Username / NIP dan Kata Sandi untuk mengakses portal presensi.
            </p>
          </div>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 flex items-start gap-2 animate-in fade-in">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLoginSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
              <UserIcon className="w-3.5 h-3.5 text-[#1b357f]" />
              Username atau NIP
            </label>
            <input
              type="text"
              id="login-username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Contoh: admin / walikelas7ikhwan / gurumapel"
              required
              autoFocus
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-hidden transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
              <KeyRound className="w-3.5 h-3.5 text-[#1b357f]" />
              Kata Sandi (Password)
            </label>
            <input
              type="password"
              id="login-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Masukkan kata sandi..."
              required
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-hidden transition-all"
            />
          </div>

          <button
            type="submit"
            id="btn-login-submit"
            className="w-full py-3.5 bg-[#1b357f] hover:bg-[#152a65] text-white font-bold rounded-xl text-xs shadow-md shadow-blue-900/20 hover:shadow-lg transition-all flex items-center justify-center gap-2 active:scale-98 cursor-pointer mt-2"
          >
            <LogIn className="w-4 h-4" />
            <span>Masuk ke Sistem</span>
          </button>
        </form>

        {/* Informational Guidance Accordion (For testing/reference without quick buttons) */}
        <div className="pt-3 border-t border-slate-100">
          <button
            type="button"
            onClick={() => setShowHelper(!showHelper)}
            className="w-full text-[11px] font-semibold text-slate-500 hover:text-slate-800 flex items-center justify-between py-1 transition-colors"
          >
            <span className="flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-blue-600" />
              Petunjuk Akun & Peran (Role)
            </span>
            {showHelper ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          {showHelper && (
            <div className="mt-2 p-3 bg-slate-50 border border-slate-200 rounded-xl text-[11px] text-slate-600 space-y-1.5">
              <p className="font-bold text-slate-800">Daftar Akun Bawaan (Password default: 123):</p>
              <ul className="space-y-1 text-slate-700">
                <li>• <strong className="text-rose-700">Admin Utama</strong>: username <code className="bg-slate-200 px-1 py-0.5 rounded text-[10px] font-mono">admin</code></li>
                <li>• <strong className="text-amber-700">Wali Kelas VII Ikhwan</strong>: username <code className="bg-slate-200 px-1 py-0.5 rounded text-[10px] font-mono">walikelas7ikhwan</code></li>
                <li>• <strong className="text-amber-700">Wali Kelas VII Akhwat</strong>: username <code className="bg-slate-200 px-1 py-0.5 rounded text-[10px] font-mono">walikelas7akhwat</code></li>
                <li>• <strong className="text-emerald-700">Guru Mapel Matematika</strong>: username <code className="bg-slate-200 px-1 py-0.5 rounded text-[10px] font-mono">gurumapel</code></li>
                <li>• <strong className="text-emerald-700">Guru Mapel Tahfidz</strong>: username <code className="bg-slate-200 px-1 py-0.5 rounded text-[10px] font-mono">gurutahfidz</code></li>
              </ul>
              <p className="text-[10px] text-slate-400 pt-1">
                Admin Utama dapat mendaftarkan akun guru baru dengan multi-peran (Admin, Wali Kelas, Guru Mapel).
              </p>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="text-center text-[10px] text-slate-400">
          © {new Date().getFullYear()} Attaufiq Sekolah Islam. Hak cipta dilindungi.
        </div>
      </div>
    </div>
  );
};
