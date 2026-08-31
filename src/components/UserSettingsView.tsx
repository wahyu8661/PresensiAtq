import React, { useState, useRef } from 'react';
import { User, ClassRoom, Subject } from '../types';
import {
  User as UserIcon,
  Camera,
  Key,
  ShieldCheck,
  GraduationCap,
  BookOpen,
  Save,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  Trash2,
  RefreshCw,
  Phone,
  Mail,
  FileText,
  Lock,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

interface UserSettingsViewProps {
  currentUser: User;
  allUsers: User[];
  classes: ClassRoom[];
  subjects: Subject[];
  onSaveUserProfile: (updatedUser: User) => void;
  onNavigateToUserManagement?: () => void;
}

export const UserSettingsView: React.FC<UserSettingsViewProps> = ({
  currentUser,
  allUsers = [],
  classes,
  subjects,
  onSaveUserProfile,
  onNavigateToUserManagement,
}) => {
  // Form State - Identity
  const [name, setName] = useState(currentUser.name || '');
  const [username, setUsername] = useState(currentUser.username || '');
  const [nip, setNip] = useState(currentUser.nip || '');
  const [phone, setPhone] = useState(currentUser.phone || '');
  const [email, setEmail] = useState(currentUser.email || '');
  const [avatar, setAvatar] = useState<string | undefined>(currentUser.avatar);

  // Sync state when currentUser updates
  React.useEffect(() => {
    setName(currentUser.name || '');
    setUsername(currentUser.username || '');
    setNip(currentUser.nip || '');
    setPhone(currentUser.phone || '');
    setEmail(currentUser.email || '');
    setAvatar(currentUser.avatar);
  }, [currentUser]);

  // Form State - Password Change
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  // Feedback Messages
  const [identitySuccessMsg, setIdentitySuccessMsg] = useState<string | null>(null);
  const [identityErrorMsg, setIdentityErrorMsg] = useState<string | null>(null);
  const [passwordSuccessMsg, setPasswordSuccessMsg] = useState<string | null>(null);
  const [passwordErrorMsg, setPasswordErrorMsg] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Class & Subject lookup maps
  const classMap = new Map<string, string>();
  classes.forEach((c) => classMap.set(c.id, c.name));

  const subjectMap = new Map<string, string>();
  subjects.forEach((s) => subjectMap.set(s.id, s.name));

  // Handle Photo Upload with client-side canvas resize to keep localStorage lightweight
  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setIdentityErrorMsg('Harap pilih file gambar (JPG, PNG, atau WEBP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        // Resize image to max 256x256 for clean storage efficiency
        const canvas = document.createElement('canvas');
        const MAX_SIZE = 256;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_SIZE) {
            height = Math.round((height * MAX_SIZE) / width);
            width = MAX_SIZE;
          }
        } else {
          if (height > MAX_SIZE) {
            width = Math.round((width * MAX_SIZE) / height);
            height = MAX_SIZE;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.85);
          setAvatar(compressedDataUrl);
          setIdentitySuccessMsg('Foto profil berhasil diunggah. Klik "Simpan Perubahan Identitas" untuk memperbarui.');
          setIdentityErrorMsg(null);
        }
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  // Avatar Presets
  const avatarPresets = [
    { label: 'Biru Tua', bg: 'bg-[#1b357f] text-white' },
    { label: 'Emerald', bg: 'bg-emerald-600 text-white' },
    { label: 'Amber', bg: 'bg-amber-600 text-white' },
    { label: 'Indigo', bg: 'bg-indigo-600 text-white' },
    { label: 'Rose', bg: 'bg-rose-600 text-white' },
    { label: 'Teal', bg: 'bg-teal-700 text-white' },
  ];

  // Handle Save Identity Form
  const handleSaveIdentity = (e: React.FormEvent) => {
    e.preventDefault();
    setIdentitySuccessMsg(null);
    setIdentityErrorMsg(null);

    const trimmedName = name.trim();
    const trimmedUsername = username.trim().toLowerCase();

    if (!trimmedName) {
      setIdentityErrorMsg('Nama lengkap tidak boleh kosong.');
      return;
    }

    if (!trimmedUsername) {
      setIdentityErrorMsg('Username login tidak boleh kosong.');
      return;
    }

    // Check if username is taken by another user
    const isUsernameTaken = allUsers.some(
      (u) => u.id !== currentUser.id && u.username.toLowerCase() === trimmedUsername
    );

    if (isUsernameTaken) {
      setIdentityErrorMsg(`Username "${trimmedUsername}" sudah digunakan oleh pengguna lain.`);
      return;
    }

    const updatedUser: User = {
      ...currentUser,
      name: trimmedName,
      username: trimmedUsername,
      nip: nip.trim() || undefined,
      phone: phone.trim() || undefined,
      email: email.trim() || undefined,
      avatar: avatar,
    };

    onSaveUserProfile(updatedUser);
    setIdentitySuccessMsg('Identitas & Foto profil Anda berhasil diperbarui!');
    setTimeout(() => setIdentitySuccessMsg(null), 5000);
  };

  // Handle Password Change Form
  const handleSavePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordSuccessMsg(null);
    setPasswordErrorMsg(null);

    // If user has a current password set, check it (Admins or users default is 123)
    const expectedCurrentPassword = currentUser.password || '123';

    if (currentPassword !== expectedCurrentPassword) {
      setPasswordErrorMsg('Kata sandi saat ini yang Anda masukkan tidak sesuai.');
      return;
    }

    if (!newPassword || newPassword.length < 3) {
      setPasswordErrorMsg('Kata sandi baru minimal 3 karakter.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordErrorMsg('Konfirmasi kata sandi baru tidak cocok.');
      return;
    }

    const updatedUser: User = {
      ...currentUser,
      password: newPassword,
    };

    onSaveUserProfile(updatedUser);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setPasswordSuccessMsg('Kata sandi Anda berhasil diubah! Gunakan kata sandi baru saat login berikutnya.');
    setTimeout(() => setPasswordSuccessMsg(null), 5000);
  };

  const userRoles = currentUser.roles || [currentUser.role];

  return (
    <div id="user-settings-page" className="space-y-6 max-w-5xl mx-auto">
      {/* Top Banner & Header Card */}
      <div className="bg-gradient-to-r from-slate-900 via-[#1b357f] to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-md relative overflow-hidden border border-slate-800">
        <div className="absolute right-0 top-0 translate-x-10 -translate-y-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start gap-6">
          {/* Avatar with Camera Overlay */}
          <div className="relative group">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden ring-4 ring-white/20 shadow-xl bg-slate-800 flex items-center justify-center">
              {avatar ? (
                <img
                  src={avatar}
                  alt={currentUser.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-full h-full bg-[#1b357f] flex items-center justify-center text-2xl sm:text-3xl font-extrabold text-white">
                  {currentUser.name.slice(0, 2).toUpperCase()}
                </div>
              )}
            </div>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              title="Ganti Foto Profil"
              className="absolute bottom-0 right-0 p-2 bg-blue-600 hover:bg-blue-500 text-white rounded-full shadow-lg transition-transform transform active:scale-90 cursor-pointer ring-2 ring-slate-900"
            >
              <Camera className="w-4 h-4" />
            </button>
          </div>

          {/* User Basic Info */}
          <div className="flex-1 text-center sm:text-left space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-xs text-xs font-semibold text-blue-200 border border-white/10">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Pengaturan Akun & Profil Mandiri</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">{currentUser.name}</h1>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 text-xs text-slate-300">
              <span className="font-mono bg-white/10 px-2.5 py-0.5 rounded-md font-semibold">@{currentUser.username}</span>
              {currentUser.nip && <span>• NIP: {currentUser.nip}</span>}
              <span>• SMP & SMA Islam Attaufiq</span>
            </div>

            {/* Role Badges */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 pt-1">
              {userRoles.map((r) => (
                <span
                  key={r}
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold ${
                    r === 'admin'
                      ? 'bg-rose-500/20 text-rose-200 border border-rose-500/30'
                      : r === 'wali_kelas'
                      ? 'bg-amber-500/20 text-amber-200 border border-amber-500/30'
                      : 'bg-emerald-500/20 text-emerald-200 border border-emerald-500/30'
                  }`}
                >
                  {r === 'admin' && <ShieldCheck className="w-3.5 h-3.5" />}
                  {r === 'wali_kelas' && <GraduationCap className="w-3.5 h-3.5" />}
                  {r === 'guru_mapel' && <BookOpen className="w-3.5 h-3.5" />}
                  <span>{r === 'admin' ? 'Admin Utama' : r === 'wali_kelas' ? 'Wali Kelas' : 'Guru Mapel'}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Admin Direct Switcher */}
          {currentUser.role === 'admin' && onNavigateToUserManagement && (
            <button
              type="button"
              onClick={onNavigateToUserManagement}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold transition-all shrink-0 cursor-pointer"
            >
              <span>Kelola Semua Akun</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Hidden File Input for Image Upload */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png, image/jpeg, image/jpg, image/webp"
        className="hidden"
        onChange={handleImageFileChange}
      />

      {/* Main Grid: Section 1 (Identitas & Foto) and Section 2 (Kata Sandi & Info Tugas) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Identitas & Foto Profil (8 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Box 1: Identitas Diri */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 sm:p-6 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
                  <UserIcon className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-slate-900">Identitas & Data Profil</h2>
                  <p className="text-xs text-slate-500">Perbarui nama lengkap, kontak, dan foto profil Anda</p>
                </div>
              </div>
            </div>

            {/* Notification Messages */}
            {identitySuccessMsg && (
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-start gap-2.5 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span className="font-medium">{identitySuccessMsg}</span>
              </div>
            )}
            {identityErrorMsg && (
              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2.5 animate-in fade-in">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span className="font-medium">{identityErrorMsg}</span>
              </div>
            )}

            {/* Foto Profil Quick Manager */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
              <label className="block text-xs font-bold text-slate-800">Foto Profil Anda</label>
              <div className="flex flex-wrap items-center gap-4">
                <div className="w-16 h-16 rounded-full overflow-hidden bg-slate-200 ring-2 ring-slate-300 flex items-center justify-center shrink-0">
                  {avatar ? (
                    <img src={avatar} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-base font-bold text-slate-600">
                      {name.slice(0, 2).toUpperCase() || 'US'}
                    </span>
                  )}
                </div>
                <div className="space-y-1.5 flex-1 min-w-[200px]">
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs transition-all cursor-pointer"
                    >
                      <Camera className="w-3.5 h-3.5" />
                      <span>Unggah Foto</span>
                    </button>
                    {avatar && (
                      <button
                        type="button"
                        onClick={() => {
                          setAvatar(undefined);
                          setIdentitySuccessMsg('Foto profil telah dihapus. Klik simpan untuk menerapkan.');
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl text-xs font-bold transition-all cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5 text-rose-500" />
                        <span>Hapus Foto</span>
                      </button>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500">Mendukung format JPG, PNG, WEBP. Ukuran disesuaikan otomatis.</p>
                </div>
              </div>
            </div>

            {/* Form Fields */}
            <form onSubmit={handleSaveIdentity} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Nama Lengkap & Gelar <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <UserIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="Contoh: Ustadz H. Ahmad Fauzi, S.Pd.I"
                    className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-600 outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Username Login <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="text-slate-400 text-xs font-bold absolute left-3.5 top-2.5">@</span>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      placeholder="username_anda"
                      className="w-full pl-8 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-medium text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-600 outline-hidden"
                    />
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1">Digunakan untuk masuk ke sistem.</p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    NIP / NIK (Opsional)
                  </label>
                  <div className="relative">
                    <FileText className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      value={nip}
                      onChange={(e) => setNip(e.target.value)}
                      placeholder="198901..."
                      className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-medium text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-600 outline-hidden"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    No. WhatsApp / HP
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="081234567890"
                      className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-medium text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-600 outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Alamat Email
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="nama@attaufiq.sch.id"
                      className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-600 outline-hidden"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  id="btn-save-identity"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1b357f] hover:bg-[#152a65] text-white rounded-xl text-xs font-bold shadow-xs transition-all cursor-pointer active:scale-98"
                >
                  <Save className="w-4 h-4" />
                  <span>Simpan Perubahan Identitas</span>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right Column: Keamanan / Ganti Password & Info Penugasan (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Box 2: Keamanan & Ganti Kata Sandi */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 sm:p-6 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
                  <Lock className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-slate-900">Keamanan & Kata Sandi</h2>
                  <p className="text-xs text-slate-500">Ubah kata sandi akun Anda secara berkala</p>
                </div>
              </div>
            </div>

            {/* Password Notification Messages */}
            {passwordSuccessMsg && (
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-start gap-2.5 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span className="font-medium">{passwordSuccessMsg}</span>
              </div>
            )}
            {passwordErrorMsg && (
              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2.5 animate-in fade-in">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span className="font-medium">{passwordErrorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSavePassword} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Kata Sandi Saat Ini <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Key className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type={showCurrentPass ? 'text' : 'password'}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                    placeholder="Masukkan kata sandi lama"
                    className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:bg-white focus:ring-2 focus:ring-amber-500 outline-hidden"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPass(!showCurrentPass)}
                    className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 p-0.5"
                  >
                    {showCurrentPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <p className="text-[10px] text-slate-400 mt-1">Default kata sandi awal akun: 123</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Kata Sandi Baru <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type={showNewPass ? 'text' : 'password'}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    placeholder="Minimal 3 karakter"
                    className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:bg-white focus:ring-2 focus:ring-amber-500 outline-hidden"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPass(!showNewPass)}
                    className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 p-0.5"
                  >
                    {showNewPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Konfirmasi Kata Sandi Baru <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type={showConfirmPass ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    placeholder="Ulangi kata sandi baru"
                    className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:bg-white focus:ring-2 focus:ring-amber-500 outline-hidden"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPass(!showConfirmPass)}
                    className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 p-0.5"
                  >
                    {showConfirmPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  id="btn-save-password"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold shadow-xs transition-all cursor-pointer active:scale-98"
                >
                  <Key className="w-4 h-4" />
                  <span>Perbarui Kata Sandi</span>
                </button>
              </div>
            </form>
          </div>

          {/* Box 3: Penugasan Sekolah (Status & Hak Akses) */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-slate-900">Penugasan & Status Sekolah</h2>
                  <p className="text-xs text-slate-500">Informasi posisi & kelas yang ditugaskan</p>
                </div>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="text-[11px] font-bold text-slate-500 uppercase">Posisi / Jabatan Aktif:</div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {userRoles.map((r) => (
                    <span
                      key={r}
                      className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-white border border-slate-300 text-slate-800 shadow-2xs"
                    >
                      {r === 'admin' ? '🛡️ Admin Utama' : r === 'wali_kelas' ? '🎓 Wali Kelas' : '📖 Guru Mata Pelajaran'}
                    </span>
                  ))}
                </div>
              </div>

              {currentUser.assignedClassId && (
                <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 space-y-1 text-amber-900">
                  <div className="text-[11px] font-bold uppercase">Kelas Binaan (Wali Kelas):</div>
                  <div className="font-bold text-sm">
                    {classMap.get(currentUser.assignedClassId) || currentUser.assignedClassId}
                  </div>
                </div>
              )}

              {currentUser.assignedSubjectIds && currentUser.assignedSubjectIds.length > 0 && (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 space-y-1 text-emerald-900">
                  <div className="text-[11px] font-bold uppercase">Mata Pelajaran yang Diampu:</div>
                  <div className="flex flex-wrap gap-1 pt-0.5">
                    {currentUser.assignedSubjectIds.map((subjId) => (
                      <span key={subjId} className="px-2 py-0.5 bg-white text-emerald-800 rounded font-semibold text-xs border border-emerald-300">
                        {subjectMap.get(subjId) || subjId}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="text-[11px] text-slate-400 text-center pt-2">
                Catatan: Penugasan kelas & mata pelajaran dikontrol dan ditentukan oleh Admin Utama.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
