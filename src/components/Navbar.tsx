import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { User, UserRole } from '../types';
import {
  ShieldCheck,
  GraduationCap,
  BookOpen,
  Calendar,
  Clock,
  LogOut,
  ChevronDown,
  UserCheck,
  FileSpreadsheet,
  Users,
  Building2,
  CheckCircle2,
  RefreshCw,
  Menu,
  X,
  Sparkles,
} from 'lucide-react';

interface NavbarProps {
  currentUser: User;
  onSwitchUser: (user: User) => void;
  availableUsers: User[];
  activeTab: string;
  onSelectTab: (tab: string) => void;
  onLogout: () => void;
  onResetData: () => void;
  children?: React.ReactNode;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentUser,
  onSwitchUser,
  availableUsers,
  activeTab,
  onSelectTab,
  onLogout,
  onResetData,
  children,
}) => {
  const [timeStr, setTimeStr] = useState<string>('');
  const [dateStr, setDateStr] = useState<string>('');
  const [showSwitchModal, setShowSwitchModal] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString('id-ID', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      );
      setDateStr(
        now.toLocaleDateString('id-ID', {
          weekday: 'long',
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const getRoleBadge = (role: UserRole) => {
    switch (role) {
      case 'admin':
        return {
          label: 'Admin Utama',
          color: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
          badgeLight: 'bg-rose-50 text-rose-700 border-rose-200',
          icon: <ShieldCheck className="w-3.5 h-3.5 mr-1" />,
        };
      case 'wali_kelas':
        return {
          label: `Wali Kelas ${currentUser.assignedClassId || ''}`,
          color: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
          badgeLight: 'bg-amber-50 text-amber-800 border-amber-200',
          icon: <GraduationCap className="w-3.5 h-3.5 mr-1" />,
        };
      case 'guru_mapel':
        return {
          label: 'Guru Spesialis / Mapel',
          color: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
          badgeLight: 'bg-blue-50 text-blue-800 border-blue-200',
          icon: <BookOpen className="w-3.5 h-3.5 mr-1" />,
        };
      default:
        return {
          label: 'Pengguna',
          color: 'bg-slate-500/20 text-slate-300 border-slate-500/30',
          badgeLight: 'bg-slate-100 text-slate-700 border-slate-200',
          icon: null,
        };
    }
  };

  const roleBadge = getRoleBadge(currentUser.role);

  // Dynamic Navigation Tabs based on Role
  const getNavTabs = () => {
    if (currentUser.role === 'admin') {
      return [
        {
          group: 'Utama',
          items: [
            { id: 'dashboard', label: 'Dashboard & Statistik', icon: <Building2 className="w-4 h-4" /> },
            { id: 'input_presensi', label: 'Input Presensi (Jam 1-9)', icon: <UserCheck className="w-4 h-4" /> },
            { id: 'rekap_presensi', label: 'Rekap & Ekspor Excel', icon: <FileSpreadsheet className="w-4 h-4" /> },
          ],
        },
        {
          group: 'Master Data',
          items: [
            { id: 'kelola_pengguna', label: 'Data Pengguna / Guru', icon: <Users className="w-4 h-4" /> },
            { id: 'kelola_siswa', label: 'Data Siswa & Kelas', icon: <GraduationCap className="w-4 h-4" /> },
          ],
        },
      ];
    } else if (currentUser.role === 'wali_kelas') {
      return [
        {
          group: 'Menu Wali Kelas',
          items: [
            {
              id: 'wali_dashboard',
              label: `Pantau Kelas (${currentUser.assignedClassId || 'Binaan'})`,
              icon: <GraduationCap className="w-4 h-4" />,
            },
            { id: 'input_presensi', label: 'Isi Presensi Kelas', icon: <UserCheck className="w-4 h-4" /> },
            { id: 'rekap_presensi', label: 'Rekap Presensi Kelas', icon: <FileSpreadsheet className="w-4 h-4" /> },
          ],
        },
      ];
    } else {
      // Guru Mapel
      return [
        {
          group: 'Menu Guru Spesialis',
          items: [
            { id: 'guru_dashboard', label: 'Presensi & Jadwal Mapel', icon: <BookOpen className="w-4 h-4" /> },
            { id: 'input_presensi', label: 'Isi Presensi Jam Mapel', icon: <UserCheck className="w-4 h-4" /> },
            { id: 'rekap_presensi', label: 'Riwayat & Rekap Mapel', icon: <FileSpreadsheet className="w-4 h-4" /> },
          ],
        },
      ];
    }
  };

  const navGroups = getNavTabs();

  // Find active tab label for breadcrumb
  let activeTabLabel = 'Presensi';
  navGroups.forEach((g) => {
    const found = g.items.find((i) => i.id === activeTab);
    if (found) activeTabLabel = found.label;
  });

  return (
    <div className="h-screen w-full flex bg-slate-50 font-sans text-slate-900 overflow-hidden selection:bg-blue-100">
      {/* Sidebar - Desktop */}
      <aside
        id="app-sleek-sidebar"
        className="hidden md:flex w-64 bg-slate-900 flex-col border-r border-slate-800 text-slate-300 shrink-0 select-none z-30"
      >
        {/* Brand Header */}
        <div className="h-16 px-5 flex items-center gap-3 border-b border-slate-800 bg-slate-950/40">
          <Logo size="sm" showText={false} />
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-white text-sm tracking-tight">ATTAUFIQ</span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-600/30 text-blue-400 border border-blue-500/30">
                PRESENSI
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-medium">Sistem Presensi Digital</p>
          </div>
        </div>

        {/* Navigation Group Items */}
        <div className="flex-1 px-3 py-4 space-y-6 overflow-y-auto">
          {navGroups.map((group, gIdx) => (
            <div key={gIdx}>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 mb-2">
                {group.group}
              </div>
              <div className="space-y-1">
                {group.items.map((item) => {
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      id={`sidebar-tab-${item.id}`}
                      type="button"
                      onClick={() => onSelectTab(item.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                        isActive
                          ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20 font-bold'
                          : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/80'
                      }`}
                    >
                      <span className={`${isActive ? 'text-white' : 'text-slate-400'}`}>{item.icon}</span>
                      <span className="truncate">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Quick Demo Switcher Section in Sidebar */}
          <div className="pt-2 border-t border-slate-800/80">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 mb-2 flex items-center justify-between">
              <span>Ganti Akun Cepat</span>
              <Sparkles className="w-3 h-3 text-amber-400" />
            </div>
            <div className="grid grid-cols-1 gap-1.5 px-1">
              <button
                type="button"
                id="sidebar-quick-admin"
                onClick={() => {
                  const admin = availableUsers.find((u) => u.role === 'admin');
                  if (admin) onSwitchUser(admin);
                }}
                className={`w-full text-left px-2.5 py-1.5 rounded-md text-[11px] font-semibold flex items-center justify-between transition-all ${
                  currentUser.role === 'admin'
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                    : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-rose-400" />
                  Admin Utama
                </span>
                {currentUser.role === 'admin' && <span className="text-[9px] text-rose-300">● Aktif</span>}
              </button>

              <button
                type="button"
                id="sidebar-quick-wali"
                onClick={() => {
                  const wali = availableUsers.find((u) => u.role === 'wali_kelas');
                  if (wali) onSwitchUser(wali);
                }}
                className={`w-full text-left px-2.5 py-1.5 rounded-md text-[11px] font-semibold flex items-center justify-between transition-all ${
                  currentUser.role === 'wali_kelas'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5 text-amber-400" />
                  Wali Kelas 7A
                </span>
                {currentUser.role === 'wali_kelas' && <span className="text-[9px] text-amber-300">● Aktif</span>}
              </button>

              <button
                type="button"
                id="sidebar-quick-guru"
                onClick={() => {
                  const guru = availableUsers.find((u) => u.role === 'guru_mapel');
                  if (guru) onSwitchUser(guru);
                }}
                className={`w-full text-left px-2.5 py-1.5 rounded-md text-[11px] font-semibold flex items-center justify-between transition-all ${
                  currentUser.role === 'guru_mapel'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
                  Guru Mapel
                </span>
                {currentUser.role === 'guru_mapel' && <span className="text-[9px] text-emerald-300">● Aktif</span>}
              </button>
            </div>
          </div>
        </div>

        {/* User Card Footer */}
        <div className="p-3 bg-slate-950 border-t border-slate-800">
          <div className="flex items-center justify-between gap-2 p-2 rounded-lg bg-slate-900 border border-slate-800">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-white font-bold text-xs shrink-0 shadow-xs">
                {currentUser.name.slice(0, 2).toUpperCase()}
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-slate-200 truncate">{currentUser.name}</div>
                <div className="text-[10px] text-slate-400 truncate">{roleBadge.label}</div>
              </div>
            </div>
            <button
              type="button"
              id="sidebar-logout-btn"
              onClick={onLogout}
              title="Keluar"
              className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <aside className="relative w-72 bg-slate-900 flex flex-col h-full text-slate-300 shadow-2xl z-10">
            <div className="h-16 px-5 flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Logo size="sm" showText={false} />
                <span className="font-bold text-white text-sm">ATTAUFIQ PRESENSI</span>
              </div>
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 px-3 py-4 space-y-6 overflow-y-auto">
              {navGroups.map((group, gIdx) => (
                <div key={gIdx}>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 mb-2">
                    {group.group}
                  </div>
                  <div className="space-y-1">
                    {group.items.map((item) => {
                      const isActive = activeTab === item.id;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => {
                            onSelectTab(item.id);
                            setIsMobileMenuOpen(false);
                          }}
                          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                            isActive
                              ? 'bg-blue-600 text-white shadow-xs font-bold'
                              : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800'
                          }`}
                        >
                          {item.icon}
                          <span>{item.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 bg-slate-950 border-t border-slate-800">
              <div className="flex items-center justify-between gap-2 p-2 rounded-lg bg-slate-900 border border-slate-800">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-white font-bold text-xs shrink-0">
                    {currentUser.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-slate-200 truncate">{currentUser.name}</div>
                    <div className="text-[10px] text-slate-400 truncate">{roleBadge.label}</div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={onLogout}
                  className="p-1.5 text-slate-400 hover:text-rose-400 rounded"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </div>
          </aside>
        </div>
      )}

      {/* Main Right Column: Top Bar + Scrollable Content */}
      <div className="flex-1 flex flex-col min-w-0 bg-slate-50 h-full overflow-hidden">
        {/* Top Header Bar for Main Content Area */}
        <header
          id="sleek-main-topbar"
          className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 lg:px-8 shrink-0 z-20 shadow-xs"
        >
          {/* Left Side: Mobile Menu Button & Breadcrumb */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              id="mobile-menu-toggle"
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 border border-slate-200"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-400 font-medium hidden sm:inline">Presensi Attaufiq</span>
              <span className="text-slate-300 hidden sm:inline">/</span>
              <span className="font-bold text-slate-800 text-sm">{activeTabLabel}</span>
            </div>
          </div>

          {/* Right Side: Live Clock, Switch User Button & Profile Pill */}
          <div className="flex items-center gap-2.5 sm:gap-4">
            {/* Live Date & Time Badge */}
            <div className="hidden lg:flex items-center gap-2 text-xs bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg text-slate-600">
              <span className="flex items-center gap-1.5 font-medium">
                <Calendar className="w-3.5 h-3.5 text-blue-600" />
                {dateStr}
              </span>
              <span className="w-1 h-1 rounded-full bg-slate-300" />
              <span className="flex items-center gap-1 font-mono font-bold text-slate-800">
                <Clock className="w-3.5 h-3.5 text-amber-500" />
                {timeStr} WIB
              </span>
            </div>

            {/* Reset Demo Button */}
            <button
              type="button"
              id="btn-reset-demo-data"
              onClick={() => {
                if (window.confirm('Kembalikan seluruh data presensi, siswa, dan guru ke data contoh awal?')) {
                  onResetData();
                }
              }}
              title="Reset ke Data Contoh Awal"
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 text-xs font-semibold transition-all"
            >
              <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
              <span className="hidden xl:inline">Reset Demo</span>
            </button>

            {/* Switch User Button */}
            <button
              type="button"
              id="btn-open-switch-user"
              onClick={() => setShowSwitchModal(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 hover:border-slate-300 hover:bg-slate-100 transition-all text-xs font-semibold text-slate-700"
            >
              <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold">
                {currentUser.name.slice(0, 2).toUpperCase()}
              </div>
              <div className="hidden sm:block text-left">
                <div className="leading-tight font-bold text-slate-800 truncate max-w-[120px]">{currentUser.name}</div>
                <div className="text-[10px] text-slate-500 leading-tight">{roleBadge.label}</div>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-0.5" />
            </button>
          </div>
        </header>

        {/* Scrollable Main Content Workplace */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden">
          <main className="p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto pb-16">
            {children}
          </main>
        </div>
      </div>

      {/* Switch User Modal */}
      {showSwitchModal && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Ganti Profil Pengguna</h3>
                  <p className="text-[11px] text-slate-500">Pilih akun untuk mencoba peran yang berbeda</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowSwitchModal(false)}
                className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
              {availableUsers.map((u) => {
                const isCurrent = u.id === currentUser.id;
                const badge = getRoleBadge(u.role);
                return (
                  <div
                    key={u.id}
                    onClick={() => {
                      onSwitchUser(u);
                      setShowSwitchModal(false);
                    }}
                    className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                      isCurrent
                        ? 'border-blue-500 bg-blue-50/70 ring-1 ring-blue-500/30'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
                        {u.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-900">{u.name}</p>
                        <p className="text-[11px] text-slate-500">Username: <span className="font-mono">{u.username}</span></p>
                        <div className="mt-1 flex items-center gap-1.5">
                          <span className={`inline-flex items-center text-[10px] font-semibold px-2 py-0.5 rounded-md border ${badge.badgeLight}`}>
                            {badge.icon}
                            {badge.label}
                          </span>
                          {u.assignedClassId && (
                            <span className="text-[10px] bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded font-medium">
                              Kelas {u.assignedClassId}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {isCurrent && (
                      <span className="flex items-center text-xs font-bold text-blue-600 gap-1 bg-white px-2 py-1 rounded-md border border-blue-200">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Aktif
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 flex justify-end">
              <button
                type="button"
                onClick={() => setShowSwitchModal(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
