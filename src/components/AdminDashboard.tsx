import React, { useState, useMemo } from 'react';
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
  Filter,
  Check,
  AlertCircle,
  FileSpreadsheet,
  X
} from 'lucide-react';

interface AdminDashboardProps {
  currentUser: User;
  users: User[];
  students: Student[];
  classes: ClassRoom[];
  subjects: Subject[];
  periods: PeriodSlot[];
  records: AttendanceRecord[];
  onSaveUser: (user: User) => void;
  onDeleteUser: (userId: string) => void;
  onSaveStudent: (student: Student) => void;
  onDeleteStudent: (studentId: string) => void;
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
  onSaveUser,
  onDeleteUser,
  onSaveStudent,
  onDeleteStudent,
  onOpenImportModal,
  onNavigateToForm,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'students' | 'classes_subjects'>('overview');

  // User Management State
  const [userSearch, setUserSearch] = useState<string>('');
  const [userRoleFilter, setUserRoleFilter] = useState<string>('ALL');
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isUserModalOpen, setIsUserModalOpen] = useState<boolean>(false);

  // Student Management State
  const [studentSearch, setStudentSearch] = useState<string>('');
  const [studentClassFilter, setStudentClassFilter] = useState<string>('ALL');
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [isStudentModalOpen, setIsStudentModalOpen] = useState<boolean>(false);

  const todayStr = getTodayDateString();

  // Today Attendance Statistics
  const todayRecords = useMemo(() => {
    return records.filter((r) => r.date === todayStr);
  }, [records, todayStr]);

  const classMap = useMemo(() => new Map(classes.map((c) => [c.id, c.name])), [classes]);
  const subjectMap = useMemo(() => new Map(subjects.map((s) => [s.id, s.name])), [subjects]);

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
      const matchRole = userRoleFilter === 'ALL' || u.role === userRoleFilter;
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

  // Handle Save User
  const handleSaveUserForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const rawSubjects = (formData.get('assignedSubjectIds') as string) || '';
    const rawClasses = (formData.get('assignedClassIds') as string) || '';

    const userObj: User = {
      id: editingUser ? editingUser.id : `usr-${Date.now()}`,
      name: formData.get('name') as string,
      username: formData.get('username') as string,
      password: (formData.get('password') as string) || '123',
      role: formData.get('role') as UserRole,
      nip: (formData.get('nip') as string) || undefined,
      email: (formData.get('email') as string) || undefined,
      phone: (formData.get('phone') as string) || undefined,
      assignedClassId: (formData.get('assignedClassId') as string) || undefined,
      assignedSubjectIds: rawSubjects ? rawSubjects.split(',').map((s) => s.trim()) : [],
      assignedClassIds: rawClasses ? rawClasses.split(',').map((c) => c.trim()) : ['7A', '7B', '8A', '8B', '9A'],
    };

    onSaveUser(userObj);
    setIsUserModalOpen(false);
    setEditingUser(null);
  };

  // Handle Save Student
  const handleSaveStudentForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const studentObj: Student = {
      id: editingStudent ? editingStudent.id : `std-${Date.now()}`,
      nisn: formData.get('nisn') as string,
      nis: (formData.get('nis') as string) || '',
      name: formData.get('name') as string,
      gender: formData.get('gender') as 'L' | 'P',
      classId: formData.get('classId') as string,
      parentName: (formData.get('parentName') as string) || '',
      parentPhone: (formData.get('parentPhone') as string) || '',
      status: (formData.get('status') as any) || 'Aktif',
    };

    onSaveStudent(studentObj);
    setIsStudentModalOpen(false);
    setEditingStudent(null);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-6" id="admin-dashboard-container">
      {/* Top Banner */}
      <div className="bg-[#1b357f] text-white rounded-2xl p-6 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-amber-300 uppercase tracking-widest">
            <ShieldCheck className="w-4 h-4" />
            <span>Pusat Kendali Admin Utama</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black mt-1">
            Manajemen Sistem Presensi Sekolah
          </h2>
          <p className="text-xs text-blue-100 mt-1">
            Kelola master data pengguna, siswa, kelas, jadwal, serta impor/ekspor spreadsheet Excel.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => onOpenImportModal('students')}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white/15 hover:bg-white/25 border border-white/20 text-white rounded-xl text-xs font-bold transition-all"
          >
            <Upload className="w-4 h-4" />
            <span>Impor Siswa Excel</span>
          </button>

          <button
            type="button"
            onClick={() => onOpenImportModal('users')}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white/15 hover:bg-white/25 border border-white/20 text-white rounded-xl text-xs font-bold transition-all"
          >
            <Upload className="w-4 h-4" />
            <span>Impor Pengguna Excel</span>
          </button>
        </div>
      </div>

      {/* Admin Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
        {[
          { id: 'overview', label: 'Ringkasan & Monitoring', icon: <Building2 className="w-4 h-4" /> },
          { id: 'users', label: `Data Pengguna / Guru (${users.length})`, icon: <Users className="w-4 h-4" /> },
          { id: 'students', label: `Data Siswa & Santri (${students.length})`, icon: <GraduationCap className="w-4 h-4" /> },
          { id: 'classes_subjects', label: 'Master Kelas, Mapel & Jam', icon: <BookOpen className="w-4 h-4" /> },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            id={`admin-subtab-${tab.id}`}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
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

      {/* 1. TAB OVERVIEW / MONITORING */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Key Metrics Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-[11px] font-bold text-slate-500 uppercase">Total Santri Aktif</span>
              <p className="text-2xl font-black text-slate-900 mt-1">{students.filter((s) => s.status === 'Aktif').length}</p>
              <p className="text-[11px] text-slate-400 mt-0.5">Tersebar di {classes.length} Rombel</p>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-[11px] font-bold text-slate-500 uppercase">Total Guru & Staf</span>
              <p className="text-2xl font-black text-slate-900 mt-1">{users.length}</p>
              <p className="text-[11px] text-slate-400 mt-0.5">
                {users.filter((u) => u.role === 'wali_kelas').length} Wali Kelas • {users.filter((u) => u.role === 'guru_mapel').length} Guru Mapel
              </p>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-[11px] font-bold text-slate-500 uppercase">Sesi Terisi Hari Ini</span>
              <p className="text-2xl font-black text-blue-900 mt-1">{todayStats.sessionCount} Sesi</p>
              <p className="text-[11px] text-slate-400 mt-0.5">Jam ke-1 s/d Jam ke-9</p>
            </div>

            <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200 shadow-xs text-emerald-900">
              <span className="text-[11px] font-bold uppercase">Kehadiran Hari Ini</span>
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
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#1b357f] text-white rounded-xl text-xs font-bold"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Input Presensi Manual</span>
              </button>
            </div>

            <div className="space-y-3">
              {classes.map((cls) => {
                const classTodayRecords = todayRecords.filter((r) => r.classId === cls.id);

                return (
                  <div key={cls.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
                    <div className="min-w-[180px]">
                      <span className="text-xs font-black text-slate-900">{cls.name}</span>
                      <p className="text-[11px] text-slate-500">Wali: {cls.waliKelasName}</p>
                    </div>

                    {/* Periods row */}
                    <div className="flex items-center gap-1 flex-1 overflow-x-auto w-full">
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
                            className={`px-2 py-1 rounded-lg text-center text-[10px] font-bold shrink-0 transition-all ${
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
                      <span className="text-xs font-bold text-slate-700">
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

      {/* 2. TAB USER MANAGEMENT */}
      {activeTab === 'users' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden space-y-4 p-5">
          {/* Action Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-slate-800">Daftar Akun Pengguna & Guru</h3>
              <p className="text-xs text-slate-500">
                Kelola 3 akun utama: Admin Utama, Wali Kelas, dan Guru Spesialis / Mapel.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                id="btn-add-user"
                onClick={() => {
                  setEditingUser(null);
                  setIsUserModalOpen(true);
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#1b357f] hover:bg-[#152a65] text-white rounded-xl text-xs font-bold shadow-xs transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Tambah Pengguna</span>
              </button>

              <button
                type="button"
                onClick={() => onOpenImportModal('users')}
                className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Impor Excel</span>
              </button>

              <button
                type="button"
                id="btn-export-users-excel"
                onClick={() => exportUsersToExcel(users, classes, subjects)}
                className="inline-flex items-center gap-1.5 px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all"
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
                className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 outline-hidden"
              >
                <option value="ALL">Semua Peran</option>
                <option value="admin">Admin Utama</option>
                <option value="wali_kelas">Wali Kelas</option>
                <option value="guru_mapel">Guru Spesialis / Mapel</option>
              </select>
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Cari nama, NIP, username..."
                value={userSearch}
                onChange={(e) => setUserSearch(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 outline-hidden"
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
                  <th className="py-3 px-3 min-w-[120px]">Username</th>
                  <th className="py-3 px-3 min-w-[140px]">Peran</th>
                  <th className="py-3 px-4 min-w-[200px]">Tugas Mengajar / Kelas</th>
                  <th className="py-3 px-3 min-w-[140px]">Kontak</th>
                  <th className="py-3 px-3 text-center min-w-[100px]">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredUsers.map((u, idx) => {
                  const roleBadgeClass =
                    u.role === 'admin'
                      ? 'bg-rose-100 text-rose-800 border-rose-200'
                      : u.role === 'wali_kelas'
                      ? 'bg-amber-100 text-amber-900 border-amber-200'
                      : 'bg-emerald-100 text-emerald-900 border-emerald-200';

                  const roleLabel =
                    u.role === 'admin'
                      ? 'Admin Utama'
                      : u.role === 'wali_kelas'
                      ? 'Wali Kelas'
                      : 'Guru Spesialis';

                  return (
                    <tr key={u.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-3 text-center font-semibold text-slate-400">{idx + 1}</td>
                      <td className="py-3 px-4">
                        <div>
                          <p className="font-bold text-slate-900">{u.name}</p>
                          {u.nip && <p className="text-[11px] text-slate-400 font-mono">NIP: {u.nip}</p>}
                        </div>
                      </td>
                      <td className="py-3 px-3 font-mono text-slate-600 font-semibold">{u.username}</td>
                      <td className="py-3 px-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${roleBadgeClass}`}>
                          {roleLabel}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        {u.role === 'wali_kelas' && (
                          <span className="text-amber-800 font-semibold">
                            Wali Kelas: {classMap.get(u.assignedClassId || '') || u.assignedClassId || '-'}
                          </span>
                        )}
                        {u.role === 'guru_mapel' && (
                          <div className="text-[11px]">
                            <p className="font-medium text-slate-800">
                              Mapel: {u.assignedSubjectIds?.map((id) => subjectMap.get(id) || id).join(', ') || 'Semua'}
                            </p>
                          </div>
                        )}
                        {u.role === 'admin' && <span className="text-slate-400 italic">Akses Penuh Semua Data</span>}
                      </td>
                      <td className="py-3 px-3 text-slate-600">
                        {u.phone || u.email || '-'}
                      </td>
                      <td className="py-3 px-3 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <button
                            type="button"
                            onClick={() => {
                              setEditingUser(u);
                              setIsUserModalOpen(true);
                            }}
                            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg"
                            title="Edit"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              if (u.id === currentUser.id) {
                                alert('Tidak dapat menghapus akun yang sedang aktif digunakan.');
                                return;
                              }
                              if (window.confirm(`Hapus pengguna ${u.name}?`)) {
                                onDeleteUser(u.id);
                              }
                            }}
                            className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg"
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

      {/* 3. TAB STUDENT MANAGEMENT */}
      {activeTab === 'students' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden space-y-4 p-5">
          {/* Action Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-slate-800">Daftar Santri / Siswa</h3>
              <p className="text-xs text-slate-500">
                Kelola biodata santri, NISN, rombongan belajar, dan kontak orang tua.
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
                className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#1b357f] hover:bg-[#152a65] text-white rounded-xl text-xs font-bold shadow-xs transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Tambah Santri</span>
              </button>

              <button
                type="button"
                onClick={() => onOpenImportModal('students')}
                className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Impor Excel</span>
              </button>

              <button
                type="button"
                id="btn-export-students-excel"
                onClick={() => exportStudentsToExcel(filteredStudents, classes)}
                className="inline-flex items-center gap-1.5 px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all"
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
                className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 outline-hidden"
              >
                <option value="ALL">Semua Kelas ({students.length} Santri)</option>
                {classes.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Cari santri, NISN, NIS..."
                value={studentSearch}
                onChange={(e) => setStudentSearch(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 outline-hidden"
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
                  <th className="py-3 px-3 min-w-[140px]">Kelas</th>
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
                        <p className="text-[11px] text-slate-400 font-mono">NISN: {s.nisn}</p>
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
                          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg"
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
                          className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg"
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

      {/* 4. TAB MASTER DATA (CLASSES, SUBJECTS & PERIODS) */}
      {activeTab === 'classes_subjects' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Classes */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-blue-600" />
              <span>Daftar Rombel / Kelas ({classes.length})</span>
            </h3>
            <div className="space-y-2">
              {classes.map((c) => (
                <div key={c.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <p className="text-xs font-bold text-slate-900">{c.name}</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">Wali Kelas: {c.waliKelasName}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Subjects */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-emerald-600" />
              <span>Mata Pelajaran ({subjects.length})</span>
            </h3>
            <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
              {subjects.map((s) => (
                <div key={s.id} className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-slate-900">{s.name}</p>
                    <span className="text-[10px] text-slate-400">Kode: {s.code}</span>
                  </div>
                  <span className="text-[10px] font-bold bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                    {s.category}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 9 Periods Timing */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-600" />
              <span>Alokasi Jam Belajar (1 s/d 9)</span>
            </h3>
            <div className="space-y-2">
              {periods.map((p) => (
                <div key={p.period} className="p-2 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-800">Jam ke-{p.period}</span>
                  <span className="font-mono text-[11px] text-blue-700 font-bold">
                    {p.timeStart} - {p.timeEnd}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* USER MODAL (ADD / EDIT) */}
      {isUserModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="text-base font-bold text-slate-800">
                {editingUser ? 'Edit Data Pengguna / Guru' : 'Tambah Pengguna Baru'}
              </h3>
              <button type="button" onClick={() => setIsUserModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveUserForm} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Nama Lengkap & Gelar</label>
                <input
                  type="text"
                  name="name"
                  defaultValue={editingUser?.name || ''}
                  required
                  placeholder="Contoh: Ustadz H. Ahmad Fauzi, M.Pd"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-hidden"
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
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Password</label>
                  <input
                    type="password"
                    name="password"
                    defaultValue={editingUser?.password || '123'}
                    required
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Peran Akun Utama</label>
                <select
                  name="role"
                  defaultValue={editingUser?.role || 'guru_mapel'}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 outline-hidden"
                >
                  <option value="guru_mapel">Guru Spesialis / Guru Mapel</option>
                  <option value="wali_kelas">Wali Kelas</option>
                  <option value="admin">Admin Utama (Super Admin)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">NIP (Opsional)</label>
                  <input
                    type="text"
                    name="nip"
                    defaultValue={editingUser?.nip || ''}
                    placeholder="1989..."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">No. HP / WA</label>
                  <input
                    type="text"
                    name="phone"
                    defaultValue={editingUser?.phone || ''}
                    placeholder="0812..."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Kelas Binaan (Khusus Wali Kelas)
                </label>
                <select
                  name="assignedClassId"
                  defaultValue={editingUser?.assignedClassId || ''}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-hidden"
                >
                  <option value="">-- Bukan Wali Kelas / Tidak Ditugaskan --</option>
                  {classes.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Kode Mapel yang Diampu (Pisahkan Koma)
                </label>
                <input
                  type="text"
                  name="assignedSubjectIds"
                  defaultValue={editingUser?.assignedSubjectIds?.join(', ') || ''}
                  placeholder="Contoh: matematika, ipa, tahfidz"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-hidden"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsUserModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#1b357f] hover:bg-[#152a65] text-white text-xs font-bold rounded-xl shadow-xs"
                >
                  Simpan Pengguna
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* STUDENT MODAL (ADD / EDIT) */}
      {isStudentModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="text-base font-bold text-slate-800">
                {editingStudent ? 'Edit Data Santri' : 'Tambah Santri Baru'}
              </h3>
              <button type="button" onClick={() => setIsStudentModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveStudentForm} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Nama Lengkap Santri</label>
                <input
                  type="text"
                  name="name"
                  defaultValue={editingStudent?.name || ''}
                  required
                  placeholder="Contoh: Muhammad Al-Fatih"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-hidden"
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
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">NIS Sekolah</label>
                  <input
                    type="text"
                    name="nis"
                    defaultValue={editingStudent?.nis || ''}
                    placeholder="247001"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Jenis Kelamin</label>
                  <select
                    name="gender"
                    defaultValue={editingStudent?.gender || 'L'}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-hidden"
                  >
                    <option value="L">Laki-laki (Ikhwan)</option>
                    <option value="P">Perempuan (Akhwat)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Rombel / Kelas</label>
                  <select
                    name="classId"
                    defaultValue={editingStudent?.classId || '7A'}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-hidden"
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
                    placeholder="Bpk. ..."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">No. HP Orang Tua</label>
                  <input
                    type="text"
                    name="parentPhone"
                    defaultValue={editingStudent?.parentPhone || ''}
                    placeholder="0812..."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Status Santri</label>
                <select
                  name="status"
                  defaultValue={editingStudent?.status || 'Aktif'}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-hidden"
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
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#1b357f] hover:bg-[#152a65] text-white text-xs font-bold rounded-xl shadow-xs"
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
