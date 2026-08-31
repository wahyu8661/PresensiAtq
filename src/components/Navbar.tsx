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
  UserCheck,
  FileSpreadsheet,
  Users,
  Building2,
  Menu,
  X,
  Layers,
} from 'lucide-react';

interface NavbarProps {
  currentUser: User;
  onChangeActiveRole?: (role: UserRole) => void;
  activeTab: string;
  onSelectTab: (tab: string) => void;
  onLogout: () => void;
  children?: React.ReactNode;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentUser,
  onChangeActiveRole,
  activeTab,
  onSelectTab,
  onLogout,
  children,
}) => {
  const [timeStr, setTimeStr] = useState<string>('');
  const [dateStr, setDateStr] = useState<string>('');
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
          label: `Wali Kelas ${currentUser.assignedClassId ? `(${currentUser.assignedClassId})` : ''}`,
          color: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
          badgeLight: 'bg-amber-50 text-amber-800 border-amber-200',
          icon: <GraduationCap className="w-3.5 h-3.5 mr-1" />,
        };
      case 'guru_mapel':
        return {
          label: 'Guru Mapel',
          color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
          badgeLight: 'bg-emerald-50 text-emerald-800 border-emerald-200',
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
  const userRoles = currentUser.roles || [currentUser.role];
  const hasMultipleRoles = userRoles.length > 1;

  // Dynamic Navigation Tabs aligned with the Flowchart
  const getNavTabs = () => {
    if (currentUser.role === 'admin') {
      return [
        {
          group: 'Menu Admin Utama',
          items: [
            { id: 'dashboard', label: 'Dashboard & Statistik', icon: <Building2 className="w-4 h-4" /> },
            { id: 'input_presensi', label: 'Input Presensi (Jam 1-9)', icon: <UserCheck className="w-4 h-4" /> },
            { id: 'rekap_presensi', label: 'Rekap & Ekspor Excel', icon: <FileSpreadsheet className="w-4 h-4" /> },
          ],
        },
        {
          group: 'Master Data & Database',
          items: [
            { id: 'kelola_pengguna', label: 'Input User & Pengguna', icon: <Users className="w-4 h-4" /> },
            { id: 'kelola_siswa', label: 'Database Siswa (Santri)', icon: <GraduationCap className="w-4 h-4" /> },
            { id: 'kelola_kelas', label: 'Kelola Kelas & Rombel', icon: <Layers className="w-4 h-4" /> },
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
              label: 'Pantau Kelas & Riwayat',
              icon: <GraduationCap className="w-4 h-4" />,
            },
            { id: 'input_presensi', label: 'Mengisi Presensi Kelas', icon: <UserCheck className="w-4 h-4" /> },
            { id: 'rekap_presensi', label: 'Download Data Presensi', icon: <FileSpreadsheet className="w-4 h-4" /> },
          ],
        },
      ];
    } else {
      // Guru Mapel
      return [
        {
          group: 'Menu Guru Mapel',
          items: [
            { id: 'guru_dashboard', label: 'Jadwal & Presensi Mapel', icon: <BookOpen className="w-4 h-4" /> },
            { id: 'input_presensi', label: 'Presensi Jam Mapel', icon: <UserCheck className="w-4 h-4" /> },
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

        {/* Multi-Role Switcher Pill (Only if user has more than 1 assigned position) */}
        {hasMultipleRoles && (
          <div className="p-3 bg-slate-950/80 border-b border-slate-800/80">
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1">
              <Layers className="w-3 h-3 text-blue-400" />
              <span>Pilih Peran Aktif:</span>
            </label>
            <div className="grid grid-cols-2 gap-1.5">
              {userRoles.map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => onChangeActiveRole && onChangeActiveRole(r)}
                  className={`px-2 py-1.5 rounded-lg text-[11px] font-bold text-center transition-all ${
                    currentUser.role === r
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                  }`}
                >
                  {r === 'admin' ? 'Admin' : r === 'wali_kelas' ? 'Wali Kelas' : 'Guru Mapel'}
                </button>
              ))}
            </div>
          </div>
        )}

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
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                        isActive
                          ? 'bg-[#1b357f] text-white shadow-sm font-bold ring-1 ring-white/10'
                          : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/80'
                      }`}
                    >
                      <span className={`${isActive ? 'text-blue-300' : 'text-slate-400'}`}>{item.icon}</span>
                      <span className="truncate">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* User Profile & Logout Footer */}
        <div className="p-3 bg-slate-950 border-t border-slate-800">
          <div className="flex items-center justify-between gap-2 p-2 rounded-xl bg-slate-900 border border-slate-800">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full bg-[#1b357f] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
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
              title="Keluar / Logout"
              className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
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

            {hasMultipleRoles && (
              <div className="p-3 bg-slate-950/80 border-b border-slate-800/80">
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  Pilih Peran Aktif:
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  {userRoles.map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => {
                        onChangeActiveRole && onChangeActiveRole(r);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`px-2 py-1.5 rounded-lg text-[11px] font-bold text-center ${
                        currentUser.role === r
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      {r === 'admin' ? 'Admin' : r === 'wali_kelas' ? 'Wali Kelas' : 'Guru Mapel'}
                    </button>
                  ))}
                </div>
              </div>
            )}

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
                          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                            isActive
                              ? 'bg-[#1b357f] text-white shadow-xs font-bold'
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
              <div className="flex items-center justify-between gap-2 p-2 rounded-xl bg-slate-900 border border-slate-800">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-full bg-[#1b357f] text-white flex items-center justify-center font-bold text-xs shrink-0">
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
                  className="p-1.5 text-slate-400 hover:text-rose-400 rounded-lg"
                  title="Keluar"
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
              className="md:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 border border-slate-200"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-400 font-medium hidden sm:inline">Presensi Attaufiq</span>
              <span className="text-slate-300 hidden sm:inline">/</span>
              <span className="font-bold text-slate-800 text-sm">{activeTabLabel}</span>
            </div>
          </div>

          {/* Right Side: Live Clock, Profile Pill & Logout Button */}
          <div className="flex items-center gap-2.5 sm:gap-4">
            {/* Live Date & Time Badge */}
            <div className="hidden lg:flex items-center gap-2 text-xs bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl text-slate-600">
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

            {/* Profile Info Badge */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700">
              <div className="w-6 h-6 rounded-full bg-[#1b357f] text-white flex items-center justify-center text-[10px] font-bold">
                {currentUser.name.slice(0, 2).toUpperCase()}
              </div>
              <div className="hidden sm:block text-left">
                <div className="leading-tight font-bold text-slate-800 truncate max-w-[140px]">{currentUser.name}</div>
                <div className="text-[10px] text-slate-500 leading-tight">{roleBadge.label}</div>
              </div>
            </div>

            {/* Logout Button */}
            <button
              type="button"
              id="topbar-logout-btn"
              onClick={onLogout}
              title="Keluar dari akun"
              className="flex items-center gap-1.5 px-3 py-2 bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 rounded-xl text-xs font-bold transition-all cursor-pointer active:scale-95"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Keluar</span>
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
    </div>
  );
};
