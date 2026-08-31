import React, { useState, useMemo, useEffect } from 'react';
import {
  User,
  Student,
  ClassRoom,
  Subject,
  PeriodSlot,
  AttendanceRecord,
  UserRole,
} from '../types';
import { getTodayDateString } from '../data/initialData';
import { exportStudentsToExcel, exportUsersToExcel } from '../utils/excelHelper';
import {
  Building2,
  Users,
  GraduationCap,
  BookOpen,
  Clock,
  Download,
  Upload,
  Plus,
  Trash2,
  Edit2,
  Search,
  CheckCircle2,
  ShieldCheck,
  Layers,
  X,
  UserPlus,
  Check,
  UserCheck,
} from 'lucide-react';

interface AdminDashboardProps {
  currentUser: User;
  users: User[];
  students: Student[];
  classes: ClassRoom[];
  subjects: Subject[];
  periods: PeriodSlot[];
  records: AttendanceRecord[];
  activeTabKey?: string;
  onSaveUser: (user: User) => void;
  onDeleteUser: (userId: string) => void;
  onSaveStudent: (student: Student) => void;
  onDeleteStudent: (studentId: string) => void;
  onSaveClass: (classRoom: ClassRoom) => void;
  onDeleteClass: (classId: string) => void;
  onOpenImportModal: (type: 'students' | 'users') => void;
  onNavigateToForm: (classId?: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  currentUser,
  users,
  students,
  classes,
  subjects,
  periods,
  records,
  activeTabKey,
  onSaveUser,
  onDeleteUser,
  onSaveStudent,
  onDeleteStudent,
  onSaveClass,
  onDeleteClass,
  onOpenImportModal,
  onNavigateToForm,
}) => {
  // Determine sub-tab from parent or default
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'students' | 'classes'>('overview');

  useEffect(() => {
    if (activeTabKey === 'kelola_pengguna') {
      setActiveTab('users');
    } else if (activeTabKey === 'kelola_siswa') {
      setActiveTab('students');
    } else if (activeTabKey === 'kelola_kelas') {
      setActiveTab('classes');
    } else if (activeTabKey === 'dashboard') {
      setActiveTab('overview');
    }
  }, [activeTabKey]);

  // User Management State
  const [userSearch, setUserSearch] = useState<string>('');
  const [userRoleFilter, setUserRoleFilter] = useState<string>('ALL');
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isUserModalOpen, setIsUserModalOpen] = useState<boolean>(false);

  // Multi-position state inside Add/Edit User Form
  const [selectedRoles, setSelectedRoles] = useState<UserRole[]>(['guru_mapel']);
  const [assignedClassForWali, setAssignedClassForWali] = useState<string>('');
  const [selectedSubjectIdsForGuru, setSelectedSubjectIdsForGuru] = useState<string[]>([]);
  const [selectedClassIdsForGuru, setSelectedClassIdsForGuru] = useState<string[]>([]);

  // Student Management State
  const [studentSearch, setStudentSearch] = useState<string>('');
  const [studentClassFilter, setStudentClassFilter] = useState<string>('ALL');
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [isStudentModalOpen, setIsStudentModalOpen] = useState<boolean>(false);

  // Class Management State (CRUD Kelas)
  const [editingClass, setEditingClass] = useState<ClassRoom | null>(null);
  const [isClassModalOpen, setIsClassModalOpen] = useState<boolean>(false);

  const todayStr = getTodayDateString();

  // Today Attendance Statistics
  const todayRecords = useMemo(() => {
    return records.filter((r) => r.date === todayStr);
  }, [records, todayStr]);

  const classMap = useMemo(() => new Map(classes.map((c) => [c.id, c.name])), [classes]);

  // Overall Attendance Summary Today
  const todayStats = useMemo(() => {
    let hadir = 0;
    let izin = 0;
    let sakit = 0;
    let alpha = 0;
    let totalItems = 0;

    todayRecords.forEach((rec) => {
      rec.items.forEach((item) => {
        totalItems += 1;
        if (item.status === 'H') hadir += 1;
        else if (item.status === 'I') izin += 1;
        else if (item.status === 'S') sakit += 1;
        else if (item.status === 'A') alpha += 1;
      });
    });

    const percent = totalItems > 0 ? Math.round((hadir / totalItems) * 100) : 100;
    return { hadir, izin, sakit, alpha, totalItems, percent, sessionCount: todayRecords.length };
  }, [todayRecords]);

  // Filtered Users
  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const uRoles = u.roles || [u.role];
      const matchRole = userRoleFilter === 'ALL' || uRoles.includes(userRoleFilter as UserRole);
      const q = userSearch.toLowerCase();
      const matchSearch =
        u.name.toLowerCase().includes(q) ||
        u.username.toLowerCase().includes(q) ||
        (u.nip && u.nip.includes(q));
      return matchRole && matchSearch;
    });
  }, [users, userRoleFilter, userSearch]);

  // Filtered Students
  const filteredStudents = useMemo(() => {
    return students.filter((s) => {
      const matchClass = studentClassFilter === 'ALL' || s.classId === studentClassFilter;
      const q = studentSearch.toLowerCase();
      const matchSearch =
        s.name.toLowerCase().includes(q) ||
        s.nisn.includes(q) ||
        (s.nis && s.nis.includes(q));
      return matchClass && matchSearch;
    });
  }, [students, studentClassFilter, studentSearch]);

  // Open User Modal handler with clean state population
  const handleOpenUserModal = (userToEdit?: User) => {
    if (userToEdit) {
      setEditingUser(userToEdit);
      const r = userToEdit.roles && userToEdit.roles.length > 0 ? userToEdit.roles : [userToEdit.role];
      setSelectedRoles(r);
      setAssignedClassForWali(userToEdit.assignedClassId || '');
      setSelectedSubjectIdsForGuru(userToEdit.assignedSubjectIds || []);
      setSelectedClassIdsForGuru(userToEdit.assignedClassIds || classes.map((c) => c.id));
    } else {
      setEditingUser(null);
      setSelectedRoles(['guru_mapel']);
      setAssignedClassForWali(classes[0]?.id || '');
      setSelectedSubjectIdsForGuru(['matematika']);
      setSelectedClassIdsForGuru(classes.map((c) => c.id));
    }
    setIsUserModalOpen(true);
  };

  // Toggle role in multi-role selector
  const toggleRoleSelection = (role: UserRole) => {
    if (selectedRoles.includes(role)) {
      if (selectedRoles.length === 1) {
        alert('Pengguna harus memiliki minimal 1 posisi / peran.');
        return;
      }
      setSelectedRoles(selectedRoles.filter((r) => r !== role));
    } else {
      setSelectedRoles([...selectedRoles, role]);
    }
  };

  // Toggle subject for guru mapel
  const toggleSubjectForGuru = (subjId: string) => {
    if (selectedSubjectIdsForGuru.includes(subjId)) {
      setSelectedSubjectIdsForGuru(selectedSubjectIdsForGuru.filter((s) => s !== subjId));
    } else {
      setSelectedSubjectIdsForGuru([...selectedSubjectIdsForGuru, subjId]);
    }
  };

  // Toggle class for guru mapel
  const toggleClassForGuru = (clsId: string) => {
    if (selectedClassIdsForGuru.includes(clsId)) {
      setSelectedClassIdsForGuru(selectedClassIdsForGuru.filter((c) => c !== clsId));
    } else {
      setSelectedClassIdsForGuru([...selectedClassIdsForGuru, clsId]);
    }
  };

  // Handle Save User Form (Flowchart: Input user baru -> Nama, username, password -> Posisi [Bisa pilih lebih dari satu: Admin, Wali kelas, Guru mapel])
  const handleSaveUserForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    if (selectedRoles.length === 0) {
      alert('Pilih minimal satu posisi / peran untuk pengguna ini.');
      return;
    }

    // Determine primary role (highest priority: admin -> wali_kelas -> guru_mapel)
    let primaryRole: UserRole = 'guru_mapel';
    if (selectedRoles.includes('admin')) primaryRole = 'admin';
    else if (selectedRoles.includes('wali_kelas')) primaryRole = 'wali_kelas';

    const userObj: User = {
      id: editingUser ? editingUser.id : `usr-${Date.now()}`,
      name: (formData.get('name') as string).trim(),
      username: (formData.get('username') as string).trim().toLowerCase(),
      password: (formData.get('password') as string) || '123',
      role: primaryRole,
      roles: selectedRoles,
      nip: (formData.get('nip') as string)?.trim() || undefined,
      email: (formData.get('email') as string)?.trim() || undefined,
      phone: (formData.get('phone') as string)?.trim() || undefined,
      assignedClassId: selectedRoles.includes('wali_kelas') ? assignedClassForWali || undefined : undefined,
      assignedSubjectIds: selectedRoles.includes('guru_mapel') ? selectedSubjectIdsForGuru : [],
      assignedClassIds: selectedRoles.includes('guru_mapel') ? selectedClassIdsForGuru : [],
    };

    onSaveUser(userObj);
    setIsUserModalOpen(false);
    setEditingUser(null);
  };

  // Handle Save Student (CRUD Nama Ananda)
  const handleSaveStudentForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const studentObj: Student = {
      id: editingStudent ? editingStudent.id : `std-${Date.now()}`,
      nisn: (formData.get('nisn') as string).trim(),
      nis: ((formData.get('nis') as string) || '').trim(),
      name: (formData.get('name') as string).trim(),
      gender: formData.get('gender') as 'L' | 'P',
      classId: formData.get('classId') as string,
      parentName: ((formData.get('parentName') as string) || '').trim(),
      parentPhone: ((formData.get('parentPhone') as string) || '').trim(),
      status: (formData.get('status') as any) || 'Aktif',
    };

    onSaveStudent(studentObj);
    setIsStudentModalOpen(false);
    setEditingStudent(null);
  };

  // Handle Save Class (CRUD Kelas)
  const handleSaveClassForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const name = (formData.get('name') as string).trim();
    const grade = Number(formData.get('grade') || 7);
    const waliKelasId = (formData.get('waliKelasId') as string) || '';
    const assignedWali = users.find((u) => u.id === waliKelasId);

    const classId = editingClass
      ? editingClass.id
      : name
          .toLowerCase()
          .replace(/[^a-z0-9]/g, '-')
          .replace(/-+/g, '-')
          .replace(/^-|-$/g, '') || `cls-${Date.now()}`;

    const classObj: ClassRoom = {
      id: classId,
      name,
      grade,
      waliKelasId: waliKelasId || 'usr-wali-unassigned',
      waliKelasName: assignedWali ? assignedWali.name : 'Belum Ditugaskan',
      totalStudents: students.filter((s) => s.classId === classId).length,
    };

    onSaveClass(classObj);
    setIsClassModalOpen(false);
    setEditingClass(null);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-6" id="admin-dashboard-container">
      {/* Top Banner */}
      <div className="bg-[#1b357f] text-white rounded-3xl p-6 sm:p-8 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-300 uppercase tracking-widest">
            <ShieldCheck className="w-4 h-4" />
            <span>Pusat Kendali Admin Utama</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black">
            Manajemen Sistem Presensi Attaufiq
          </h1>
          <p className="text-xs text-blue-100 max-w-2xl leading-relaxed">
            Kelola data pengguna/guru (multi-posisi), database siswa & santri, master kelas/rombel, serta pantauan presensi harian jam 1 s/d jam 9.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={() => handleOpenUserModal()}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-xl text-xs font-bold transition-all shadow-sm active:scale-95 cursor-pointer"
          >
            <UserPlus className="w-4 h-4" />
            <span>Input User Baru</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setEditingStudent(null);
              setIsStudentModalOpen(true);
            }}
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 bg-white/15 hover:bg-white/25 border border-white/20 text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Santri</span>
          </button>
        </div>
      </div>

      {/* Admin Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
        {[
          { id: 'overview', label: 'Ringkasan & Monitoring', icon: <Building2 className="w-4 h-4" /> },
          { id: 'users', label: `Data Pengguna / Guru (${users.length})`, icon: <Users className="w-4 h-4" /> },
          { id: 'students', label: `Database Siswa (${students.length})`, icon: <GraduationCap className="w-4 h-4" /> },
          { id: 'classes', label: `Kelola Kelas & Rombel (${classes.length})`, icon: <Layers className="w-4 h-4" /> },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            id={`admin-subtab-${tab.id}`}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === tab.id
                ? 'bg-[#1b357f] text-white shadow-xs'
                : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* ========================================================================= */}
      {/* 1. TAB OVERVIEW / MONITORING */}
      {/* ========================================================================= */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Key Metrics Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-[11px] font-bold text-slate-500 uppercase">Total Santri Aktif</span>
              <p className="text-2xl font-black text-slate-900 mt-1">{students.filter((s) => s.status === 'Aktif').length}</p>
              <p className="text-[11px] text-slate-400 mt-0.5">Terdaftar di {classes.length} Rombel</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-[11px] font-bold text-slate-500 uppercase">Total Guru & Staf</span>
              <p className="text-2xl font-black text-slate-900 mt-1">{users.length}</p>
              <p className="text-[11px] text-slate-400 mt-0.5">
                {users.filter((u) => (u.roles || [u.role]).includes('wali_kelas')).length} Wali Kelas • {users.filter((u) => (u.roles || [u.role]).includes('guru_mapel')).length} Guru Mapel
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-[11px] font-bold text-slate-500 uppercase">Sesi Terisi Hari Ini</span>
              <p className="text-2xl font-black text-blue-900 mt-1">{todayStats.sessionCount} Sesi</p>
              <p className="text-[11px] text-slate-400 mt-0.5">Presensi Jam ke-1 s/d Jam ke-9</p>
            </div>

            <div className="bg-emerald-50 p-5 rounded-2xl border border-emerald-200 shadow-xs text-emerald-900">
              <span className="text-[11px] font-bold uppercase">Tingkat Kehadiran Hari Ini</span>
              <p className="text-2xl font-black mt-1">{todayStats.percent}%</p>
              <p className="text-[11px] text-emerald-700 mt-0.5">
                {todayStats.hadir} Hadir • {todayStats.sakit} Sakit • {todayStats.izin} Izin • {todayStats.alpha} Alpha
              </p>
            </div>
          </div>

          {/* Today Filling Status Per Class (Jam 1 to Jam 9 Tracker) */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <span>Matriks Pengisian Presensi Hari Ini ({todayStr})</span>
                </h3>
                <p className="text-xs text-slate-500">
                  Pantauan langsung pengisian presensi guru di setiap kelas dari Jam 1 s/d Jam 9.
                </p>
              </div>

              <button
                type="button"
                onClick={() => onNavigateToForm()}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#1b357f] hover:bg-[#152a65] text-white rounded-xl text-xs font-bold cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Input Presensi Sekarang</span>
              </button>
            </div>

            <div className="space-y-3">
              {classes.map((cls) => {
                const classTodayRecords = todayRecords.filter((r) => r.classId === cls.id);

                return (
                  <div key={cls.id} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
                    <div className="min-w-[200px]">
                      <span className="text-xs font-black text-slate-900">{cls.name}</span>
                      <p className="text-[11px] text-slate-500">Wali: {cls.waliKelasName}</p>
                    </div>

                    {/* Periods row */}
                    <div className="flex items-center gap-1.5 flex-1 overflow-x-auto w-full py-1">
                      {periods.map((p) => {
                        const filled = classTodayRecords.find(
                          (r) => r.periodStart <= p.period && r.periodEnd >= p.period
                        );
                        return (
                          <div
                            key={p.period}
                            title={
                              filled
                                ? `Jam ${p.period}: ${filled.subjectName} (${filled.teacherName})`
                                : `Jam ${p.period}: Belum Diabsen`
                            }
                            className={`px-2.5 py-1 rounded-lg text-center text-[10px] font-bold shrink-0 transition-all ${
                              filled
                                ? 'bg-emerald-600 text-white shadow-xs'
                                : 'bg-slate-200 text-slate-500'
                            }`}
                          >
                            J{p.period}
                          </div>
                        );
                      })}
                    </div>

                    <div className="shrink-0 flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-700 bg-white px-2.5 py-1 rounded-lg border border-slate-200">
                        {classTodayRecords.length} Sesi Terisi
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. TAB USER MANAGEMENT (INPUT USER BARU & KELOLA PENGGUNA) */}
      {/* ========================================================================= */}
      {activeTab === 'users' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden space-y-4 p-5">
          {/* Action Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-slate-800">Daftar Akun Pengguna & Guru</h3>
              <p className="text-xs text-slate-500">
                Alur flowchart: Input Nama, username, password → Input Posisi (Bisa pilih lebih dari satu: Admin, Wali kelas, Guru mapel).
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                id="btn-add-user"
                onClick={() => handleOpenUserModal()}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#1b357f] hover:bg-[#152a65] text-white rounded-xl text-xs font-bold shadow-xs transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Input User Baru</span>
              </button>

              <button
                type="button"
                onClick={() => onOpenImportModal('users')}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all cursor-pointer"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Impor Excel</span>
              </button>

              <button
                type="button"
                id="btn-export-users-excel"
                onClick={() => exportUsersToExcel(users, classes, subjects)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Ekspor Excel</span>
              </button>
            </div>
          </div>

          {/* Filter & Search Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <select
                value={userRoleFilter}
                onChange={(e) => setUserRoleFilter(e.target.value)}
                className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 outline-hidden"
              >
                <option value="ALL">Semua Posisi / Peran</option>
                <option value="admin">Admin Utama</option>
                <option value="wali_kelas">Wali Kelas</option>
                <option value="guru_mapel">Guru Mapel</option>
              </select>
            </div>

            <div className="relative w-full sm:w-72">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Cari nama, NIP, username..."
                value={userSearch}
                onChange={(e) => setUserSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 outline-hidden"
              />
            </div>
          </div>

          {/* Users Table */}
          <div className="border border-slate-200 rounded-xl overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-100 text-slate-800 font-bold border-b border-slate-200">
                <tr>
                  <th className="py-3 px-3 text-center w-12">No</th>
                  <th className="py-3 px-4 min-w-[200px]">Nama Lengkap & NIP</th>
                  <th className="py-3 px-3 min-w-[130px]">Username & Password</th>
                  <th className="py-3 px-3 min-w-[150px]">Posisi / Peran</th>
                  <th className="py-3 px-4 min-w-[220px]">Tugas Binaan & Mapel</th>
                  <th className="py-3 px-3 min-w-[130px]">Kontak</th>
                  <th className="py-3 px-3 text-center min-w-[90px]">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredUsers.map((u, idx) => {
                  const roles = u.roles || [u.role];
                  return (
                    <tr key={u.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-3 text-center font-semibold text-slate-400">{idx + 1}</td>
                      <td className="py-3 px-4">
                        <div>
                          <p className="font-bold text-slate-900">{u.name}</p>
                          <p className="text-[11px] text-slate-400 font-mono">NIP: {u.nip || '-'}</p>
                        </div>
                      </td>
                      <td className="py-3 px-3">
                        <span className="font-mono bg-slate-100 px-2 py-0.5 rounded text-[11px] text-slate-800 font-bold">
                          {u.username}
                        </span>
                        <p className="text-[10px] text-slate-400 mt-0.5">Pass: {u.password || '123'}</p>
                      </td>
                      <td className="py-3 px-3">
                        <div className="flex flex-wrap gap-1">
                          {roles.map((r) => (
                            <span
                              key={r}
                              className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                                r === 'admin'
                                  ? 'bg-rose-50 text-rose-800 border-rose-200'
                                  : r === 'wali_kelas'
                                  ? 'bg-amber-50 text-amber-800 border-amber-200'
                                  : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                              }`}
                            >
                              {r === 'admin' ? 'Admin' : r === 'wali_kelas' ? 'Wali Kelas' : 'Guru Mapel'}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="space-y-1">
                          {u.assignedClassId && (
                            <div className="text-[11px]">
                              <span className="font-semibold text-amber-900">Wali:</span>{' '}
                              <span className="text-slate-700">{classMap.get(u.assignedClassId) || u.assignedClassId}</span>
                            </div>
                          )}
                          {u.assignedSubjectIds && u.assignedSubjectIds.length > 0 && (
                            <div className="text-[11px]">
                              <span className="font-semibold text-emerald-900">Mapel:</span>{' '}
                              <span className="text-slate-600">{u.assignedSubjectIds.join(', ')}</span>
                            </div>
                          )}
                          {!u.assignedClassId && (!u.assignedSubjectIds || u.assignedSubjectIds.length === 0) && (
                            <span className="text-slate-400 text-[11px]">-</span>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-3 text-slate-600 font-mono text-[11px]">
                        {u.phone || u.email || '-'}
                      </td>
                      <td className="py-3 px-3 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <button
                            type="button"
                            onClick={() => handleOpenUserModal(u)}
                            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg cursor-pointer"
                            title="Edit"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              if (u.id === currentUser.id) {
                                alert('Tidak dapat menghapus akun yang sedang Anda gunakan.');
                                return;
                              }
                              if (window.confirm(`Hapus pengguna ${u.name}?`)) {
                                onDeleteUser(u.id);
                              }
                            }}
                            className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg cursor-pointer"
                            title="Hapus"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. TAB STUDENT MANAGEMENT (CRUD NAMA ANANDA / SISWA) */}
      {/* ========================================================================= */}
      {activeTab === 'students' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden space-y-4 p-5">
          {/* Action Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-slate-800">Database Siswa (Santri)</h3>
              <p className="text-xs text-slate-500">
                Alur flowchart: Kelola database siswa → CRUD Nama Ananda & Rombel.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                id="btn-add-student"
                onClick={() => {
                  setEditingStudent(null);
                  setIsStudentModalOpen(true);
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#1b357f] hover:bg-[#152a65] text-white rounded-xl text-xs font-bold shadow-xs transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Tambah Santri Baru</span>
              </button>

              <button
                type="button"
                onClick={() => onOpenImportModal('students')}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all cursor-pointer"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Impor Excel</span>
              </button>

              <button
                type="button"
                id="btn-export-students-excel"
                onClick={() => exportStudentsToExcel(filteredStudents, classes)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Ekspor Excel</span>
              </button>
            </div>
          </div>

          {/* Filter & Search Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <select
                value={studentClassFilter}
                onChange={(e) => setStudentClassFilter(e.target.value)}
                className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 outline-hidden"
              >
                <option value="ALL">Semua Kelas ({students.length} Santri)</option>
                {classes.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="relative w-full sm:w-72">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Cari santri, NISN, NIS..."
                value={studentSearch}
                onChange={(e) => setStudentSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 outline-hidden"
              />
            </div>
          </div>

          {/* Students Table */}
          <div className="border border-slate-200 rounded-xl overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-100 text-slate-800 font-bold border-b border-slate-200">
                <tr>
                  <th className="py-3 px-3 text-center w-12">No</th>
                  <th className="py-3 px-4 min-w-[200px]">Nama Santri & NISN</th>
                  <th className="py-3 px-2 text-center w-12">L/P</th>
                  <th className="py-3 px-3 min-w-[160px]">Kelas</th>
                  <th className="py-3 px-4 min-w-[180px]">Orang Tua / Wali</th>
                  <th className="py-3 px-3 min-w-[120px]">No. Telepon</th>
                  <th className="py-3 px-2 text-center min-w-[80px]">Status</th>
                  <th className="py-3 px-3 text-center min-w-[90px]">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredStudents.map((s, idx) => (
                  <tr key={s.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-3 text-center font-semibold text-slate-400">{idx + 1}</td>
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-bold text-slate-900">{s.name}</p>
                        <p className="text-[11px] text-slate-400 font-mono">
                          NISN: {s.nisn} {s.nis && `• NIS: ${s.nis}`}
                        </p>
                      </div>
                    </td>
                    <td className="py-3 px-2 text-center font-bold">
                      <span className={`px-1.5 py-0.5 rounded text-[10px] ${s.gender === 'L' ? 'text-blue-600 bg-blue-50' : 'text-pink-600 bg-pink-50'}`}>
                        {s.gender}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-semibold text-slate-800">
                      {classMap.get(s.classId) || s.classId}
                    </td>
                    <td className="py-3 px-4 text-slate-600">{s.parentName || '-'}</td>
                    <td className="py-3 px-3 font-mono text-slate-600">{s.parentPhone || '-'}</td>
                    <td className="py-3 px-2 text-center">
                      <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full text-[10px] font-bold">
                        {s.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingStudent(s);
                            setIsStudentModalOpen(true);
                          }}
                          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg cursor-pointer"
                          title="Edit"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (window.confirm(`Hapus data santri ${s.name}?`)) {
                              onDeleteStudent(s.id);
                            }
                          }}
                          className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg cursor-pointer"
                          title="Hapus"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. TAB CLASS MANAGEMENT (CRUD KELAS & ROMBEL) */}
      {/* ========================================================================= */}
      {activeTab === 'classes' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden space-y-4 p-5">
          {/* Action Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-slate-800">Manajemen Kelas & Rombongan Belajar</h3>
              <p className="text-xs text-slate-500">
                Alur flowchart: Kelola kelas → CRUD kelas (Tambah, Lihat, Ubah, Hapus Kelas & penetapan Wali Kelas).
              </p>
            </div>

            <button
              type="button"
              id="btn-add-class"
              onClick={() => {
                setEditingClass(null);
                setIsClassModalOpen(true);
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#1b357f] hover:bg-[#152a65] text-white rounded-xl text-xs font-bold shadow-xs transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Kelas Baru</span>
            </button>
          </div>

          {/* Classes Table */}
          <div className="border border-slate-200 rounded-xl overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-100 text-slate-800 font-bold border-b border-slate-200">
                <tr>
                  <th className="py-3 px-3 text-center w-12">No</th>
                  <th className="py-3 px-4 min-w-[200px]">Nama Kelas / Rombel</th>
                  <th className="py-3 px-3 text-center w-24">Tingkat</th>
                  <th className="py-3 px-4 min-w-[220px]">Wali Kelas Ditugaskan</th>
                  <th className="py-3 px-3 text-center min-w-[120px]">Jumlah Santri</th>
                  <th className="py-3 px-3 text-center min-w-[90px]">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {classes.map((cls, idx) => {
                  const studentCount = students.filter((s) => s.classId === cls.id).length;
                  return (
                    <tr key={cls.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-3 text-center font-semibold text-slate-400">{idx + 1}</td>
                      <td className="py-3 px-4">
                        <p className="font-bold text-slate-900 text-sm">{cls.name}</p>
                        <p className="text-[11px] text-slate-400 font-mono">Kode ID: {cls.id}</p>
                      </td>
                      <td className="py-3 px-3 text-center">
                        <span className="bg-blue-50 text-blue-800 border border-blue-200 px-2.5 py-0.5 rounded-full font-bold text-xs">
                          Kelas {cls.grade}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <GraduationCap className="w-4 h-4 text-amber-600" />
                          <div>
                            <p className="font-bold text-slate-800">{cls.waliKelasName || 'Belum Ditugaskan'}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-3 text-center">
                        <span className="bg-slate-100 text-slate-800 px-2.5 py-1 rounded-lg font-bold">
                          {studentCount} Santri
                        </span>
                      </td>
                      <td className="py-3 px-3 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <button
                            type="button"
                            onClick={() => {
                              setEditingClass(cls);
                              setIsClassModalOpen(true);
                            }}
                            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg cursor-pointer"
                            title="Edit Kelas"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              if (studentCount > 0) {
                                if (
                                  !window.confirm(
                                    `Kelas ${cls.name} memiliki ${studentCount} santri aktif. Yakin ingin menghapus kelas ini?`
                                  )
                                ) {
                                  return;
                                }
                              } else {
                                if (!window.confirm(`Hapus kelas ${cls.name}?`)) {
                                  return;
                                }
                              }
                              onDeleteClass(cls.id);
                            }}
                            className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg cursor-pointer"
                            title="Hapus Kelas"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: INPUT USER BARU / EDIT PENGGUNA (FLOWCHART MULTI-POSISI) */}
      {/* ========================================================================= */}
      {isUserModalOpen && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  {editingUser ? 'Ubah Data Pengguna / Guru' : 'Input User Baru'}
                </h3>
                <p className="text-[11px] text-slate-500">
                  Masukkan Nama, Username, Password, dan pilih Posisi yang sesuai
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsUserModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveUserForm} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Nama Lengkap & Gelar</label>
                <input
                  type="text"
                  name="name"
                  defaultValue={editingUser?.name || ''}
                  required
                  placeholder="Contoh: Ustadz H. Ahmad Fauzi, M.Pd"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-600 outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Username Login</label>
                  <input
                    type="text"
                    name="username"
                    defaultValue={editingUser?.username || ''}
                    required
                    placeholder="Contoh: ahmad_fauzi"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-600 outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Kata Sandi (Password)</label>
                  <input
                    type="password"
                    name="password"
                    defaultValue={editingUser?.password || '123'}
                    required
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-600 outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">NIP (Opsional)</label>
                  <input
                    type="text"
                    name="nip"
                    defaultValue={editingUser?.nip || ''}
                    placeholder="1989..."
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">No. HP / WA</label>
                  <input
                    type="text"
                    name="phone"
                    defaultValue={editingUser?.phone || ''}
                    placeholder="0812..."
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-hidden"
                  />
                </div>
              </div>

              {/* POSISI / PERAN (FLOWCHART: BISA PILIH LEBIH DARI SATU) */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                    Input Posisi (Bisa Pilih Lebih dari Satu):
                  </label>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {/* Admin Option */}
                  <div
                    onClick={() => toggleRoleSelection('admin')}
                    className={`p-3 rounded-xl border cursor-pointer transition-all flex flex-col items-center text-center gap-1 ${
                      selectedRoles.includes('admin')
                        ? 'bg-rose-50 border-rose-300 ring-2 ring-rose-400'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <ShieldCheck className={`w-4 h-4 ${selectedRoles.includes('admin') ? 'text-rose-600' : 'text-slate-400'}`} />
                    <span className="text-xs font-bold text-slate-800">Admin</span>
                    <span className="text-[9px] text-slate-500">Akses Penuh</span>
                  </div>

                  {/* Wali Kelas Option */}
                  <div
                    onClick={() => toggleRoleSelection('wali_kelas')}
                    className={`p-3 rounded-xl border cursor-pointer transition-all flex flex-col items-center text-center gap-1 ${
                      selectedRoles.includes('wali_kelas')
                        ? 'bg-amber-50 border-amber-300 ring-2 ring-amber-400'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <GraduationCap className={`w-4 h-4 ${selectedRoles.includes('wali_kelas') ? 'text-amber-600' : 'text-slate-400'}`} />
                    <span className="text-xs font-bold text-slate-800">Wali Kelas</span>
                    <span className="text-[9px] text-slate-500">Kelas Binaan</span>
                  </div>

                  {/* Guru Mapel Option */}
                  <div
                    onClick={() => toggleRoleSelection('guru_mapel')}
                    className={`p-3 rounded-xl border cursor-pointer transition-all flex flex-col items-center text-center gap-1 ${
                      selectedRoles.includes('guru_mapel')
                        ? 'bg-emerald-50 border-emerald-300 ring-2 ring-emerald-400'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <BookOpen className={`w-4 h-4 ${selectedRoles.includes('guru_mapel') ? 'text-emerald-600' : 'text-slate-400'}`} />
                    <span className="text-xs font-bold text-slate-800">Guru Mapel</span>
                    <span className="text-[9px] text-slate-500">Presensi Jam</span>
                  </div>
                </div>

                {/* FLOWCHART: Wali Kelas -> Input Kelas yang diampu */}
                {selectedRoles.includes('wali_kelas') && (
                  <div className="pt-2 border-t border-slate-200 space-y-1.5 animate-in fade-in">
                    <label className="block text-xs font-bold text-amber-900">
                      Input Kelas yang Diampu (Wali Kelas):
                    </label>
                    <select
                      value={assignedClassForWali}
                      onChange={(e) => setAssignedClassForWali(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-amber-300 rounded-xl text-xs font-semibold text-slate-800 outline-hidden"
                    >
                      <option value="">-- Pilih Kelas Binaan --</option>
                      {classes.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* FLOWCHART: Guru Mapel -> Input Mapel */}
                {selectedRoles.includes('guru_mapel') && (
                  <div className="pt-2 border-t border-slate-200 space-y-2 animate-in fade-in">
                    <div>
                      <label className="block text-xs font-bold text-emerald-900 mb-1">
                        Input Mapel yang Diampu:
                      </label>
                      <div className="grid grid-cols-2 gap-1.5 max-h-32 overflow-y-auto p-1.5 bg-white rounded-xl border border-emerald-200">
                        {subjects.map((s) => {
                          const isChecked = selectedSubjectIdsForGuru.includes(s.id);
                          return (
                            <label
                              key={s.id}
                              className={`flex items-center gap-1.5 p-1.5 rounded-lg text-[11px] cursor-pointer ${
                                isChecked ? 'bg-emerald-50 text-emerald-900 font-bold' : 'text-slate-700'
                              }`}
                            >
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => toggleSubjectForGuru(s.id)}
                                className="rounded text-emerald-600"
                              />
                              <span className="truncate">{s.name}</span>
                            </label>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-emerald-900 mb-1">
                        Input Kelas yang Diajar:
                      </label>
                      <div className="grid grid-cols-2 gap-1.5 max-h-32 overflow-y-auto p-1.5 bg-white rounded-xl border border-emerald-200">
                        {classes.map((c) => {
                          const isChecked = selectedClassIdsForGuru.includes(c.id);
                          return (
                            <label
                              key={c.id}
                              className={`flex items-center gap-1.5 p-1.5 rounded-lg text-[11px] cursor-pointer ${
                                isChecked ? 'bg-emerald-50 text-emerald-900 font-bold' : 'text-slate-700'
                              }`}
                            >
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => toggleClassForGuru(c.id)}
                                className="rounded text-emerald-600"
                              />
                              <span className="truncate">{c.name}</span>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsUserModalOpen(false)}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#1b357f] hover:bg-[#152a65] text-white text-xs font-bold rounded-xl shadow-xs cursor-pointer"
                >
                  Simpan Pengguna
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: TAMBAH / EDIT KELAS (CRUD KELAS) */}
      {/* ========================================================================= */}
      {isClassModalOpen && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  {editingClass ? 'Edit Data Kelas / Rombel' : 'Tambah Kelas Baru'}
                </h3>
                <p className="text-[11px] text-slate-500">Kelola nama rombel, tingkat kelas, dan wali kelas</p>
              </div>
              <button
                type="button"
                onClick={() => setIsClassModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveClassForm} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Nama Kelas / Rombel</label>
                <input
                  type="text"
                  name="name"
                  defaultValue={editingClass?.name || ''}
                  required
                  placeholder="Contoh: VII Ikhwan / IX Khadijah"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-600 outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Tingkat Kelas</label>
                <select
                  name="grade"
                  defaultValue={editingClass?.grade || 7}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 outline-hidden"
                >
                  <option value={7}>Kelas 7</option>
                  <option value={8}>Kelas 8</option>
                  <option value={9}>Kelas 9</option>
                  <option value={10}>Kelas 10</option>
                  <option value={11}>Kelas 11</option>
                  <option value={12}>Kelas 12</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Pilih Wali Kelas</label>
                <select
                  name="waliKelasId"
                  defaultValue={editingClass?.waliKelasId || ''}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 outline-hidden"
                >
                  <option value="">-- Belum Ditugaskan --</option>
                  {users.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.name} ({u.username})
                    </option>
                  ))}
                </select>
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsClassModalOpen(false)}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#1b357f] hover:bg-[#152a65] text-white text-xs font-bold rounded-xl shadow-xs cursor-pointer"
                >
                  Simpan Kelas
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: TAMBAH / EDIT SANTRI (CRUD NAMA ANANDA) */}
      {/* ========================================================================= */}
      {isStudentModalOpen && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  {editingStudent ? 'Edit Data Santri (Nama Ananda)' : 'Tambah Santri Baru'}
                </h3>
                <p className="text-[11px] text-slate-500">Lengkapi data identitas ananda dan informasi orang tua</p>
              </div>
              <button
                type="button"
                onClick={() => setIsStudentModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveStudentForm} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Nama Lengkap Ananda (Santri)</label>
                <input
                  type="text"
                  name="name"
                  defaultValue={editingStudent?.name || ''}
                  required
                  placeholder="Contoh: Muhammad Al-Fatih"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-600 outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">NISN (10 Digit)</label>
                  <input
                    type="text"
                    name="nisn"
                    defaultValue={editingStudent?.nisn || ''}
                    required
                    placeholder="0091234567"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">NIS Sekolah</label>
                  <input
                    type="text"
                    name="nis"
                    defaultValue={editingStudent?.nis || ''}
                    placeholder="247001"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Jenis Kelamin</label>
                  <select
                    name="gender"
                    defaultValue={editingStudent?.gender || 'L'}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-hidden"
                  >
                    <option value="L">Laki-laki (Ikhwan)</option>
                    <option value="P">Perempuan (Akhwat)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Rombel / Kelas</label>
                  <select
                    name="classId"
                    defaultValue={editingStudent?.classId || classes[0]?.id || '7-ikhwan'}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-hidden"
                  >
                    {classes.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Nama Orang Tua / Wali</label>
                  <input
                    type="text"
                    name="parentName"
                    defaultValue={editingStudent?.parentName || ''}
                    placeholder="Bpk. / Ibu ..."
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">No. HP Orang Tua</label>
                  <input
                    type="text"
                    name="parentPhone"
                    defaultValue={editingStudent?.parentPhone || ''}
                    placeholder="0812..."
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Status Santri</label>
                <select
                  name="status"
                  defaultValue={editingStudent?.status || 'Aktif'}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-hidden"
                >
                  <option value="Aktif">Aktif</option>
                  <option value="Mutasi">Mutasi</option>
                  <option value="Lulus">Lulus</option>
                </select>
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsStudentModalOpen(false)}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#1b357f] hover:bg-[#152a65] text-white text-xs font-bold rounded-xl shadow-xs cursor-pointer"
                >
                  Simpan Santri
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
