import React, { useState, useMemo } from 'react';
import {
  Student,
  User,
  ClassRoom,
  Subject,
  AttendanceRecord,
  PeriodSlot,
  AttendanceStatus,
} from '../types';
import { getTodayDateString, getPastDateString } from '../data/initialData';
import { exportAttendanceReportToExcel, formatDateIndo } from '../utils/excelHelper';
import {
  FileSpreadsheet,
  Download,
  Calendar,
  Filter,
  Search,
  Users,
  BookOpen,
  GraduationCap,
  Eye,
  CheckCircle2,
  HeartPulse,
  MailQuestion,
  UserX,
  FileText,
  Clock
} from 'lucide-react';

interface AttendanceReportsViewProps {
  students: Student[];
  users: User[];
  classes: ClassRoom[];
  subjects: Subject[];
  periods: PeriodSlot[];
  records: AttendanceRecord[];
  onViewStudentDetail: (student: Student) => void;
  defaultClassId?: string;
}

export const AttendanceReportsView: React.FC<AttendanceReportsViewProps> = ({
  students,
  users,
  classes,
  subjects,
  periods,
  records,
  onViewStudentDetail,
  defaultClassId,
}) => {
  // Filter States
  const [viewMode, setViewMode] = useState<'student_summary' | 'session_journal'>('student_summary');
  const [datePreset, setDatePreset] = useState<'today' | 'last7' | 'this_month' | 'all' | 'custom'>('this_month');
  const [startDate, setStartDate] = useState<string>(getPastDateString(30));
  const [endDate, setEndDate] = useState<string>(getTodayDateString());
  const [selectedClass, setSelectedClass] = useState<string>(defaultClassId || 'ALL');
  const [selectedSubject, setSelectedSubject] = useState<string>('ALL');
  const [selectedTeacher, setSelectedTeacher] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Handle Preset Change
  const handlePresetChange = (preset: 'today' | 'last7' | 'this_month' | 'all' | 'custom') => {
    setDatePreset(preset);
    const today = getTodayDateString();
    if (preset === 'today') {
      setStartDate(today);
      setEndDate(today);
    } else if (preset === 'last7') {
      setStartDate(getPastDateString(7));
      setEndDate(today);
    } else if (preset === 'this_month') {
      const d = new Date();
      const firstDay = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-01`;
      setStartDate(firstDay);
      setEndDate(today);
    } else if (preset === 'all') {
      setStartDate('2020-01-01');
      setEndDate('2030-12-31');
    }
  };

  // Filtered Attendance Records
  const filteredRecords = useMemo(() => {
    return records.filter((rec) => {
      // Date filter
      const inDateRange = rec.date >= startDate && rec.date <= endDate;
      if (!inDateRange) return false;

      // Class filter
      if (selectedClass !== 'ALL' && rec.classId !== selectedClass) return false;

      // Subject filter
      if (selectedSubject !== 'ALL' && rec.subjectId !== selectedSubject) return false;

      // Teacher filter
      if (selectedTeacher !== 'ALL' && rec.teacherId !== selectedTeacher) return false;

      return true;
    });
  }, [records, startDate, endDate, selectedClass, selectedSubject, selectedTeacher]);

  // Target Students list for Summary
  const targetStudents = useMemo(() => {
    let list = students.filter((s) => s.status === 'Aktif');
    if (selectedClass !== 'ALL') {
      list = list.filter((s) => s.classId === selectedClass);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter((s) => s.name.toLowerCase().includes(q) || s.nisn.includes(q));
    }
    return list;
  }, [students, selectedClass, searchQuery]);

  // Aggregate stats per student based on filtered records
  const studentStatsMap = useMemo(() => {
    const map = new Map<string, { present: number; permit: number; sick: number; alpha: number; total: number; notes: string[] }>();

    targetStudents.forEach((s) => {
      map.set(s.id, { present: 0, permit: 0, sick: 0, alpha: 0, total: 0, notes: [] });
    });

    filteredRecords.forEach((rec) => {
      rec.items.forEach((item) => {
        let stat = map.get(item.studentId);
        if (!stat && (selectedClass === 'ALL' || item.studentId)) {
          stat = { present: 0, permit: 0, sick: 0, alpha: 0, total: 0, notes: [] };
          map.set(item.studentId, stat);
        }
        if (stat) {
          stat.total += 1;
          if (item.status === 'H') stat.present += 1;
          else if (item.status === 'I') stat.permit += 1;
          else if (item.status === 'S') stat.sick += 1;
          else if (item.status === 'A') stat.alpha += 1;

          if (item.notes) {
            stat.notes.push(`${rec.date} (${rec.subjectName}): ${item.notes}`);
          }
        }
      });
    });

    return map;
  }, [filteredRecords, targetStudents, selectedClass]);

  // Summary Totals
  const overallTotals = useMemo(() => {
    let totalPresent = 0;
    let totalPermit = 0;
    let totalSick = 0;
    let totalAlpha = 0;
    let totalSessions = 0;

    studentStatsMap.forEach((stat) => {
      totalPresent += stat.present;
      totalPermit += stat.permit;
      totalSick += stat.sick;
      totalAlpha += stat.alpha;
      totalSessions += stat.total;
    });

    const percent = totalSessions > 0 ? Math.round((totalPresent / totalSessions) * 100) : 100;
    return { totalPresent, totalPermit, totalSick, totalAlpha, totalSessions, percent };
  }, [studentStatsMap]);

  const handleExportExcel = () => {
    const className = selectedClass !== 'ALL' ? classes.find((c) => c.id === selectedClass)?.name || selectedClass : 'Semua_Kelas';
    const title = `Rekap_Presensi_Attaufiq_${className}_${startDate}_sd_${endDate}`;
    exportAttendanceReportToExcel(filteredRecords, targetStudents, classes, subjects, title, {
      startDate,
      endDate,
      classId: selectedClass !== 'ALL' ? selectedClass : undefined,
      subjectId: selectedSubject !== 'ALL' ? selectedSubject : undefined,
    });
  };

  const classMap = new Map(classes.map((c) => [c.id, c.name]));

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-6" id="attendance-reports-page">
      {/* Header */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#1b357f] uppercase tracking-wider">
            <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
            <span>Laporan & Jurnal Presensi</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
            Rekapitulasi Kehadiran & Ekspor Spreadsheet
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Unduh format Excel (.xlsx) resmi dengan data rekap per santri dan rincian jurnal jam pelajaran.
          </p>
        </div>

        <button
          type="button"
          id="btn-export-excel-main"
          onClick={handleExportExcel}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md transition-all active:scale-98"
        >
          <Download className="w-4 h-4" />
          <span>Ekspor Rekap ke Excel (.xlsx)</span>
        </button>
      </div>

      {/* Filter Panel */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
            <Filter className="w-4 h-4 text-blue-600" />
            <span>Filter Data Laporan</span>
          </h3>

          {/* Quick Date Presets */}
          <div className="flex items-center gap-1">
            {[
              { id: 'today', label: 'Hari Ini' },
              { id: 'last7', label: '7 Hari Terakhir' },
              { id: 'this_month', label: 'Bulan Ini' },
              { id: 'all', label: 'Semua Periode' },
            ].map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => handlePresetChange(p.id as any)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                  datePreset === p.id
                    ? 'bg-[#1b357f] text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Start Date */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Dari Tanggal</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => {
                setStartDate(e.target.value);
                setDatePreset('custom');
              }}
              className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 outline-hidden"
            />
          </div>

          {/* End Date */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Sampai Tanggal</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => {
                setEndDate(e.target.value);
                setDatePreset('custom');
              }}
              className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 outline-hidden"
            />
          </div>

          {/* Class Filter */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Kelas</label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 outline-hidden"
            >
              <option value="ALL">Semua Kelas</option>
              {classes.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Subject Filter */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Mata Pelajaran</label>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 outline-hidden"
            >
              <option value="ALL">Semua Mata Pelajaran</option>
              {subjects.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Aggregate Overview Metrics Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-bold text-slate-500 uppercase">Total Sesi Terlaksana</span>
          <p className="text-xl font-black text-slate-800 mt-1">{filteredRecords.length} Sesi</p>
        </div>

        <div className="bg-emerald-50 p-3.5 rounded-2xl border border-emerald-200 shadow-xs text-emerald-900">
          <span className="text-[11px] font-bold uppercase flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            Hadir (H)
          </span>
          <p className="text-xl font-black mt-1">{overallTotals.totalPresent}</p>
        </div>

        <div className="bg-blue-50 p-3.5 rounded-2xl border border-blue-200 shadow-xs text-blue-900">
          <span className="text-[11px] font-bold uppercase flex items-center gap-1">
            <MailQuestion className="w-3.5 h-3.5 text-blue-600" />
            Izin (I)
          </span>
          <p className="text-xl font-black mt-1">{overallTotals.totalPermit}</p>
        </div>

        <div className="bg-amber-50 p-3.5 rounded-2xl border border-amber-200 shadow-xs text-amber-900">
          <span className="text-[11px] font-bold uppercase flex items-center gap-1">
            <HeartPulse className="w-3.5 h-3.5 text-amber-600" />
            Sakit (S)
          </span>
          <p className="text-xl font-black mt-1">{overallTotals.totalSick}</p>
        </div>

        <div className="bg-rose-50 p-3.5 rounded-2xl border border-rose-200 shadow-xs text-rose-900">
          <span className="text-[11px] font-bold uppercase flex items-center gap-1">
            <UserX className="w-3.5 h-3.5 text-rose-600" />
            Alpha (A)
          </span>
          <p className="text-xl font-black mt-1">{overallTotals.totalAlpha}</p>
        </div>

        <div className="bg-[#1b357f] p-3.5 rounded-2xl text-white shadow-xs">
          <span className="text-[11px] font-bold text-amber-300 uppercase">Rerata Kehadiran</span>
          <p className="text-xl font-black mt-1">{overallTotals.percent}%</p>
        </div>
      </div>

      {/* Main Table Tabs (Rekap per Siswa vs Jurnal Sesi) */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        {/* Table View Switcher Bar */}
        <div className="p-4 bg-slate-50/90 border-b border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-1 bg-slate-200/80 p-1 rounded-xl">
            <button
              type="button"
              onClick={() => setViewMode('student_summary')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                viewMode === 'student_summary'
                  ? 'bg-white text-[#1b357f] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Rekapitulasi Santri ({targetStudents.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setViewMode('session_journal')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                viewMode === 'session_journal'
                  ? 'bg-white text-[#1b357f] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Jurnal Jam Pelajaran ({filteredRecords.length})</span>
            </button>
          </div>

          {viewMode === 'student_summary' && (
            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Cari santri atau NISN..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 outline-hidden"
              />
            </div>
          )}
        </div>

        {/* View 1: Rekap per Siswa */}
        {viewMode === 'student_summary' ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-100 text-slate-800 font-bold border-b border-slate-200">
                <tr>
                  <th className="py-3 px-3 text-center w-12">No</th>
                  <th className="py-3 px-4 min-w-[200px]">Nama Santri & NISN</th>
                  <th className="py-3 px-2 text-center w-12">L/P</th>
                  <th className="py-3 px-3 min-w-[130px]">Kelas</th>
                  <th className="py-3 px-3 text-center min-w-[60px]">Sesi</th>
                  <th className="py-3 px-3 text-center min-w-[60px] text-emerald-800 bg-emerald-50/50">H</th>
                  <th className="py-3 px-3 text-center min-w-[60px] text-blue-800 bg-blue-50/50">I</th>
                  <th className="py-3 px-3 text-center min-w-[60px] text-amber-800 bg-amber-50/50">S</th>
                  <th className="py-3 px-3 text-center min-w-[60px] text-rose-800 bg-rose-50/50">A</th>
                  <th className="py-3 px-3 text-center min-w-[80px]">% Hadir</th>
                  <th className="py-3 px-4 text-center min-w-[100px]">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {targetStudents.length === 0 ? (
                  <tr>
                    <td colSpan={11} className="py-12 text-center text-slate-400 font-semibold">
                      Tidak ada santri yang sesuai kriteria filter.
                    </td>
                  </tr>
                ) : (
                  targetStudents.map((s, idx) => {
                    const stat = studentStatsMap.get(s.id) || { present: 0, permit: 0, sick: 0, alpha: 0, total: 0, notes: [] };
                    const rate = stat.total > 0 ? Math.round((stat.present / stat.total) * 100) : 100;

                    return (
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
                        <td className="py-3 px-3 font-semibold text-slate-700">
                          {classMap.get(s.classId) || s.classId}
                        </td>
                        <td className="py-3 px-3 text-center font-bold text-slate-700">{stat.total}</td>
                        <td className="py-3 px-3 text-center font-black text-emerald-700 bg-emerald-50/30">{stat.present}</td>
                        <td className="py-3 px-3 text-center font-bold text-blue-700 bg-blue-50/30">{stat.permit}</td>
                        <td className="py-3 px-3 text-center font-bold text-amber-700 bg-amber-50/30">{stat.sick}</td>
                        <td className="py-3 px-3 text-center font-bold text-rose-700 bg-rose-50/30">{stat.alpha}</td>
                        <td className="py-3 px-3 text-center font-extrabold text-slate-900">
                          <span className={`px-2 py-0.5 rounded-full ${rate >= 90 ? 'bg-emerald-100 text-emerald-800' : rate >= 75 ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800'}`}>
                            {rate}%
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <button
                            type="button"
                            onClick={() => onViewStudentDetail(s)}
                            className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-100 hover:bg-blue-50 text-blue-700 rounded-lg text-xs font-semibold transition-all"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>Detail</span>
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        ) : (
          /* View 2: Jurnal Sesi Mengajar */
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-100 text-slate-800 font-bold border-b border-slate-200">
                <tr>
                  <th className="py-3 px-3 text-center w-12">No</th>
                  <th className="py-3 px-3 min-w-[100px]">Tanggal</th>
                  <th className="py-3 px-3 min-w-[140px]">Kelas</th>
                  <th className="py-3 px-3 min-w-[100px]">Jam Ke</th>
                  <th className="py-3 px-4 min-w-[180px]">Mata Pelajaran & Guru</th>
                  <th className="py-3 px-4 min-w-[180px]">Materi / Topik</th>
                  <th className="py-3 px-3 text-center min-w-[50px]">H</th>
                  <th className="py-3 px-3 text-center min-w-[50px]">I</th>
                  <th className="py-3 px-3 text-center min-w-[50px]">S</th>
                  <th className="py-3 px-3 text-center min-w-[50px]">A</th>
                  <th className="py-3 px-4 min-w-[200px]">Ketidakhadiran & Keterangan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredRecords.length === 0 ? (
                  <tr>
                    <td colSpan={11} className="py-12 text-center text-slate-400 font-semibold">
                      Belum ada jurnal presensi pada rentang tanggal ini.
                    </td>
                  </tr>
                ) : (
                  filteredRecords.map((rec, idx) => {
                    const hCount = rec.items.filter((i) => i.status === 'H').length;
                    const iCount = rec.items.filter((i) => i.status === 'I').length;
                    const sCount = rec.items.filter((i) => i.status === 'S').length;
                    const aCount = rec.items.filter((i) => i.status === 'A').length;
                    const absentItems = rec.items
                      .filter((i) => i.status !== 'H')
                      .map((i) => `${i.studentName} (${i.status}${i.notes ? ': ' + i.notes : ''})`)
                      .join('; ');

                    return (
                      <tr key={rec.id} className="hover:bg-slate-50 transition-colors">
                        <td className="py-3 px-3 text-center font-semibold text-slate-400">{idx + 1}</td>
                        <td className="py-3 px-3 font-semibold text-slate-800">{rec.date}</td>
                        <td className="py-3 px-3 font-bold text-blue-900">{rec.className || rec.classId}</td>
                        <td className="py-3 px-3">
                          <span className="bg-slate-100 text-slate-800 px-2 py-0.5 rounded text-[11px] font-bold">
                            Jam {rec.periodStart}-{rec.periodEnd}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <p className="font-bold text-slate-900">{rec.subjectName}</p>
                          <p className="text-[11px] text-slate-500">{rec.teacherName}</p>
                        </td>
                        <td className="py-3 px-4">
                          <p className="text-slate-700 italic">{rec.topic || '-'}</p>
                        </td>
                        <td className="py-3 px-3 text-center font-black text-emerald-600">{hCount}</td>
                        <td className="py-3 px-3 text-center font-bold text-blue-600">{iCount}</td>
                        <td className="py-3 px-3 text-center font-bold text-amber-600">{sCount}</td>
                        <td className="py-3 px-3 text-center font-bold text-rose-600">{aCount}</td>
                        <td className="py-3 px-4">
                          {absentItems ? (
                            <span className="text-rose-700 font-medium">{absentItems}</span>
                          ) : (
                            <span className="text-emerald-700 font-semibold">Semua Hadir (Nihil)</span>
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
