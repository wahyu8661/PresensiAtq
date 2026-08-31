import React, { useState, useEffect, useMemo } from 'react';
import confetti from 'canvas-confetti';
import {
  User,
  Student,
  ClassRoom,
  Subject,
  PeriodSlot,
  AttendanceRecord,
  AttendanceItem,
  AttendanceStatus,
} from '../types';
import { getTodayDateString } from '../data/initialData';
import { exportAttendanceReportToExcel } from '../utils/excelHelper';
import {
  CheckCircle2,
  AlertCircle,
  Clock,
  BookOpen,
  GraduationCap,
  Calendar,
  Save,
  Users,
  Search,
  Sparkles,
  Download,
  Check,
  FileText,
  UserX,
  HeartPulse,
  MailQuestion,
  Info,
  UserCheck,
} from 'lucide-react';

interface AttendanceFormProps {
  currentUser: User;
  students: Student[];
  classes: ClassRoom[];
  subjects: Subject[];
  periods: PeriodSlot[];
  records: AttendanceRecord[];
  onSaveRecord: (record: AttendanceRecord) => void;
  onNavigateToRekap?: () => void;
}

export const AttendanceForm: React.FC<AttendanceFormProps> = ({
  currentUser,
  students,
  classes,
  subjects,
  periods,
  records,
  onSaveRecord,
  onNavigateToRekap,
}) => {
  // Form Header State
  const [selectedDate, setSelectedDate] = useState<string>(getTodayDateString());
  const [selectedClassId, setSelectedClassId] = useState<string>('');
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>('');
  const [periodStart, setPeriodStart] = useState<number>(1);
  const [periodEnd, setPeriodEnd] = useState<number>(2);
  const [topic, setTopic] = useState<string>('');
  const [sessionNotes, setSessionNotes] = useState<string>('');

  // Student Attendance Items State
  const [attendanceItems, setAttendanceItems] = useState<AttendanceItem[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [genderFilter, setGenderFilter] = useState<'ALL' | 'L' | 'P'>('ALL');
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string | null>(null);
  const [savedRecordForExport, setSavedRecordForExport] = useState<AttendanceRecord | null>(null);

  // Filter accessible classes based on role
  const availableClasses = useMemo(() => {
    if (currentUser.role === 'admin') {
      return classes;
    } else if (currentUser.role === 'wali_kelas') {
      // Prioritize homeroom class first, plus any other classes
      if (currentUser.assignedClassId) {
        return classes.filter((c) => c.id === currentUser.assignedClassId);
      }
      return classes;
    } else {
      // Guru mapel
      if (currentUser.assignedClassIds && currentUser.assignedClassIds.length > 0) {
        return classes.filter((c) => currentUser.assignedClassIds?.includes(c.id));
      }
      return classes;
    }
  }, [currentUser, classes]);

  // Filter accessible subjects based on role
  const availableSubjects = useMemo(() => {
    if (currentUser.role === 'admin') {
      return subjects;
    } else if (currentUser.role === 'guru_mapel') {
      if (currentUser.assignedSubjectIds && currentUser.assignedSubjectIds.length > 0) {
        return subjects.filter((s) => currentUser.assignedSubjectIds?.includes(s.id));
      }
      return subjects;
    } else {
      // Wali kelas: if assigned subjects exist use them, or all subjects
      if (currentUser.assignedSubjectIds && currentUser.assignedSubjectIds.length > 0) {
        return subjects.filter((s) => currentUser.assignedSubjectIds?.includes(s.id));
      }
      return subjects;
    }
  }, [currentUser, subjects]);

  // Auto-initialize class & subject selections on component mount or role switch
  useEffect(() => {
    if (availableClasses.length > 0) {
      if (!selectedClassId || !availableClasses.some((c) => c.id === selectedClassId)) {
        setSelectedClassId(availableClasses[0].id);
      }
    }
  }, [availableClasses, selectedClassId]);

  useEffect(() => {
    if (availableSubjects.length > 0) {
      if (!selectedSubjectId || !availableSubjects.some((s) => s.id === selectedSubjectId)) {
        setSelectedSubjectId(availableSubjects[0].id);
      }
    }
  }, [availableSubjects, selectedSubjectId]);

  // When class or date or periods change, check if there is an existing record
  useEffect(() => {
    if (!selectedClassId) return;

    const classStudents = students.filter(
      (s) => s.classId === selectedClassId && s.status === 'Aktif'
    );

    // Look for existing saved record for this date + class + period
    const existing = records.find(
      (r) =>
        r.date === selectedDate &&
        r.classId === selectedClassId &&
        r.periodStart === periodStart &&
        r.periodEnd === periodEnd &&
        r.subjectId === selectedSubjectId
    );

    if (existing) {
      // Populate from existing
      setTopic(existing.topic || '');
      setSessionNotes(existing.notes || '');

      const itemsMap = new Map(existing.items.map((i) => [i.studentId, i]));
      const initializedItems: AttendanceItem[] = classStudents.map((s) => {
        const found = itemsMap.get(s.id);
        if (found) return found;
        return {
          studentId: s.id,
          studentName: s.name,
          nisn: s.nisn,
          gender: s.gender,
          status: 'H',
          notes: '',
        };
      });
      setAttendanceItems(initializedItems);
    } else {
      // Initialize default all Present ('H')
      const initial: AttendanceItem[] = classStudents.map((s) => ({
        studentId: s.id,
        studentName: s.name,
        nisn: s.nisn,
        gender: s.gender,
        status: 'H',
        notes: '',
      }));
      setAttendanceItems(initial);
      setTopic('');
      setSessionNotes('');
    }
  }, [selectedClassId, selectedDate, periodStart, periodEnd, selectedSubjectId, students, records]);

  // Quick action: Set status for all students
  const handleSetAllStatus = (status: AttendanceStatus) => {
    setAttendanceItems((prev) =>
      prev.map((item) => ({
        ...item,
        status,
      }))
    );
  };

  // Update single student status
  const handleUpdateStudentStatus = (studentId: string, status: AttendanceStatus) => {
    setAttendanceItems((prev) =>
      prev.map((item) => (item.studentId === studentId ? { ...item, status } : item))
    );
  };

  // Update single student note
  const handleUpdateStudentNote = (studentId: string, note: string) => {
    setAttendanceItems((prev) =>
      prev.map((item) => (item.studentId === studentId ? { ...item, notes: note } : item))
    );
  };

  // Calculate live statistics
  const stats = useMemo(() => {
    const total = attendanceItems.length;
    const hadir = attendanceItems.filter((i) => i.status === 'H').length;
    const izin = attendanceItems.filter((i) => i.status === 'I').length;
    const sakit = attendanceItems.filter((i) => i.status === 'S').length;
    const alpha = attendanceItems.filter((i) => i.status === 'A').length;
    const percent = total > 0 ? Math.round((hadir / total) * 100) : 100;

    return { total, hadir, izin, sakit, alpha, percent };
  }, [attendanceItems]);

  // Filtered student list for rendering
  const filteredItems = useMemo(() => {
    return attendanceItems.filter((item) => {
      const matchSearch =
        item.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.nisn.includes(searchQuery);
      const matchGender = genderFilter === 'ALL' || item.gender === genderFilter;
      return matchSearch && matchGender;
    });
  }, [attendanceItems, searchQuery, genderFilter]);

  // Handle Submit Form
  const handleSaveAttendance = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedClassId || !selectedSubjectId) {
      alert('Mohon pilih Kelas dan Mata Pelajaran terlebih dahulu!');
      return;
    }

    if (attendanceItems.length === 0) {
      alert('Tidak ada data siswa pada kelas ini.');
      return;
    }

    const currentClass = classes.find((c) => c.id === selectedClassId);
    const currentSubject = subjects.find((s) => s.id === selectedSubjectId);

    const recordId = `att-${selectedDate}-${selectedClassId}-jam${periodStart}-${periodEnd}-${selectedSubjectId}`;

    const newRecord: AttendanceRecord = {
      id: recordId,
      date: selectedDate,
      classId: selectedClassId,
      className: currentClass?.name || `Kelas ${selectedClassId}`,
      subjectId: selectedSubjectId,
      subjectName: currentSubject?.name || selectedSubjectId,
      periodStart: Number(periodStart),
      periodEnd: Number(periodEnd),
      teacherId: currentUser.id,
      teacherName: currentUser.name,
      teacherRole: currentUser.role,
      topic: topic.trim(),
      notes: sessionNotes.trim(),
      createdAt: new Date().toISOString(),
      items: attendanceItems,
    };

    onSaveRecord(newRecord);
    setSavedRecordForExport(newRecord);

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.7 },
      });
    } catch {
      // ignore
    }

    setSaveSuccessMsg(
      `Presensi kelas ${currentClass?.name || selectedClassId} (${currentSubject?.name || ''}, Jam ${periodStart}-${periodEnd}) berhasil disimpan!`
    );

    setTimeout(() => {
      setSaveSuccessMsg(null);
    }, 5000);
  };

  const selectedClassObj = classes.find((c) => c.id === selectedClassId);
  const selectedSubjectObj = subjects.find((s) => s.id === selectedSubjectId);

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-6" id="attendance-form-container">
      {/* Page Header */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#1b357f] uppercase tracking-wider">
            <UserCheck className="w-4 h-4 text-emerald-600" />
            <span>Formulir Presensi Siswa</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
            Pengisian Absensi Jam Mengajar
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Guru atau Wali Kelas mengabsen ananda berdasarkan mata pelajaran dan alokasi jam ke-1 s/d ke-9.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {savedRecordForExport && (
            <button
              type="button"
              id="export-this-session-excel"
              onClick={() => {
                exportAttendanceReportToExcel(
                  [savedRecordForExport],
                  students,
                  classes,
                  subjects,
                  `Presensi_${savedRecordForExport.className}_Jam_${savedRecordForExport.periodStart}_${savedRecordForExport.periodEnd}`,
                  { classId: savedRecordForExport.classId }
                );
              }}
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-xs transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Unduh Excel Sesi Ini</span>
            </button>
          )}

          {onNavigateToRekap && (
            <button
              type="button"
              onClick={onNavigateToRekap}
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all"
            >
              <FileText className="w-4 h-4" />
              <span>Lihat Rekap Lengkap</span>
            </button>
          )}
        </div>
      </div>

      {/* Success Notification Alert */}
      {saveSuccessMsg && (
        <div className="bg-emerald-50 border-2 border-emerald-500 text-emerald-900 p-4 rounded-xl flex items-center justify-between shadow-sm animate-in fade-in duration-200">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold">
              <Check className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-sm">Alhamdulillah, Presensi Berhasil Disimpan!</p>
              <p className="text-xs text-emerald-700">{saveSuccessMsg}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setSaveSuccessMsg(null)}
            className="text-emerald-700 hover:text-emerald-900 text-sm font-bold px-2 py-1"
          >
            ✕
          </button>
        </div>
      )}

      {/* Primary Attendance Setup Box */}
      <form onSubmit={handleSaveAttendance} className="space-y-6">
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-blue-600" />
              <span>Parameter Sesi Mengajar</span>
            </h3>
            <span className="text-[11px] text-slate-400">Pilih kelas, mapel, & jam ke-1 s/d 9</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* 1. Tanggal */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#1b357f]" />
                Tanggal Presensi
              </label>
              <input
                type="date"
                id="input-attendance-date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-hidden"
                required
              />
            </div>

            {/* 2. Pilih Kelas */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-[#1b357f]" />
                Kelas
              </label>
              <select
                id="select-attendance-class"
                value={selectedClassId}
                onChange={(e) => setSelectedClassId(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-hidden"
                required
              >
                {availableClasses.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* 3. Mata Pelajaran */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-[#1b357f]" />
                Mata Pelajaran
              </label>
              <select
                id="select-attendance-subject"
                value={selectedSubjectId}
                onChange={(e) => setSelectedSubjectId(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-hidden"
                required
              >
                {availableSubjects.map((s) => (
                  <option key={s.id} value={s.id}>
                    [{s.code}] {s.name}
                  </option>
                ))}
              </select>
            </div>

            {/* 4. Jam Pelajaran (Jam ke-1 s/d Jam ke-9) */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#1b357f]" />
                Alokasi Jam Mengajar
              </label>
              <div className="flex items-center gap-2">
                <select
                  id="select-period-start"
                  value={periodStart}
                  onChange={(e) => {
                    const startVal = Number(e.target.value);
                    setPeriodStart(startVal);
                    if (periodEnd < startVal) setPeriodEnd(startVal);
                  }}
                  className="w-1/2 px-2.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-hidden"
                >
                  {periods.map((p) => (
                    <option key={p.period} value={p.period}>
                      Jam ke-{p.period} ({p.timeStart})
                    </option>
                  ))}
                </select>
                <span className="text-xs font-bold text-slate-400">s/d</span>
                <select
                  id="select-period-end"
                  value={periodEnd}
                  onChange={(e) => setPeriodEnd(Number(e.target.value))}
                  className="w-1/2 px-2.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-hidden"
                >
                  {periods
                    .filter((p) => p.period >= periodStart)
                    .map((p) => (
                      <option key={p.period} value={p.period}>
                        Jam ke-{p.period} ({p.timeEnd})
                      </option>
                    ))}
                </select>
              </div>
            </div>
          </div>

          {/* Quick preset buttons for periods */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <span className="text-[11px] font-bold text-slate-500 mr-1">Pilihan Cepat Jam:</span>
            {[
              { label: 'Jam 1-2 (07:15-08:35)', s: 1, e: 2 },
              { label: 'Jam 3-4 (08:35-10:25)', s: 3, e: 4 },
              { label: 'Jam 5-6 (10:25-11:45)', s: 5, e: 6 },
              { label: 'Jam 7-8 (12:45-14:05)', s: 7, e: 8 },
              { label: 'Jam 9 (14:05-14:45)', s: 9, e: 9 },
            ].map((preset) => (
              <button
                key={preset.label}
                type="button"
                onClick={() => {
                  setPeriodStart(preset.s);
                  setPeriodEnd(preset.e);
                }}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all ${
                  periodStart === preset.s && periodEnd === preset.e
                    ? 'bg-[#1b357f] text-white font-bold shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>

          {/* Materi / Pembahasan & Catatan Sesi */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Topik / Materi Pembahasan (Jurnal Guru)
              </label>
              <input
                type="text"
                id="input-topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Contoh: Bab 3 - Persamaan Linear & Latihan Soal Halaman 45"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-hidden"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Catatan Kelas / Kejadian Khusus (Opsional)
              </label>
              <input
                type="text"
                id="input-session-notes"
                value={sessionNotes}
                onChange={(e) => setSessionNotes(e.target.value)}
                placeholder="Contoh: Seluruh siswa antusias, tugas dikumpulkan tepat waktu"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-hidden"
              />
            </div>
          </div>
        </div>

        {/* Live Attendance Counter & Quick Actions */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
          {/* Quick Status Badges */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200">
              <Users className="w-4 h-4 text-slate-600" />
              <span className="text-xs font-bold text-slate-700">Total:</span>
              <span className="text-xs font-black text-slate-900">{stats.total} Siswa</span>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span className="text-xs font-bold">Hadir:</span>
              <span className="text-xs font-black">{stats.hadir}</span>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-800">
              <MailQuestion className="w-4 h-4 text-blue-600" />
              <span className="text-xs font-bold">Izin:</span>
              <span className="text-xs font-black">{stats.izin}</span>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-800">
              <HeartPulse className="w-4 h-4 text-amber-600" />
              <span className="text-xs font-bold">Sakit:</span>
              <span className="text-xs font-black">{stats.sakit}</span>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800">
              <UserX className="w-4 h-4 text-rose-600" />
              <span className="text-xs font-bold">Alpha:</span>
              <span className="text-xs font-black">{stats.alpha}</span>
            </div>

            <div className="px-3 py-1.5 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-900 font-bold text-xs">
              Kehadiran: {stats.percent}%
            </div>
          </div>

          {/* Quick Bulk Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              id="btn-mark-all-present"
              onClick={() => handleSetAllStatus('H')}
              className="inline-flex items-center gap-1 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-xs transition-all"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Hadirkan Semua</span>
            </button>
          </div>
        </div>

        {/* Student Attendance List Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          {/* Table Header Filter & Search */}
          <div className="p-4 bg-slate-50/80 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Daftar Siswa {selectedClassObj?.name}
              </h4>
              <span className="text-xs bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded-full">
                {filteredItems.length} Siswa
              </span>
            </div>

            <div className="flex items-center gap-2">
              {/* Search */}
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Cari nama atau NISN..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 pr-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500 w-44 sm:w-56"
                />
              </div>

              {/* Gender Filter */}
              <select
                value={genderFilter}
                onChange={(e) => setGenderFilter(e.target.value as any)}
                className="px-2.5 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-hidden"
              >
                <option value="ALL">Semua (L/P)</option>
                <option value="L">Laki-laki (Ikhwan)</option>
                <option value="P">Perempuan (Akhwat)</option>
              </select>
            </div>
          </div>

          {/* Student Table */}
          {filteredItems.length === 0 ? (
            <div className="p-12 text-center text-slate-400">
              <Users className="w-12 h-12 mx-auto mb-2 opacity-40 text-slate-400" />
              <p className="text-sm font-semibold">Tidak ada siswa ditemukan.</p>
              <p className="text-xs text-slate-400 mt-1">
                Pastikan data siswa sudah diinput pada kelas {selectedClassObj?.name}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700" id="attendance-students-table">
                <thead className="bg-slate-100 text-slate-800 font-bold border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-3 text-center w-12">No</th>
                    <th className="py-3 px-4 min-w-[200px]">Nama Siswa & NISN</th>
                    <th className="py-3 px-2 text-center w-12">L/P</th>
                    <th className="py-3 px-4 min-w-[260px] text-center">Status Kehadiran</th>
                    <th className="py-3 px-4 min-w-[220px]">Keterangan / Alasan (Jika Ada)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredItems.map((item, idx) => {
                    return (
                      <tr
                        key={item.studentId}
                        className={`hover:bg-slate-50/80 transition-colors ${
                          item.status === 'A'
                            ? 'bg-rose-50/40'
                            : item.status === 'S'
                            ? 'bg-amber-50/40'
                            : item.status === 'I'
                            ? 'bg-blue-50/40'
                            : ''
                        }`}
                      >
                        {/* No */}
                        <td className="py-3 px-3 text-center font-semibold text-slate-400">
                          {idx + 1}
                        </td>

                        {/* Name & NISN */}
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                                item.gender === 'L'
                                  ? 'bg-blue-100 text-blue-700'
                                  : 'bg-pink-100 text-pink-700'
                              }`}
                            >
                              {item.studentName.slice(0, 1).toUpperCase()}
                            </div>
                            <div>
                              <p className="font-bold text-slate-900 leading-tight">
                                {item.studentName}
                              </p>
                              <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                                NISN: {item.nisn}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Gender */}
                        <td className="py-3 px-2 text-center font-bold">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-extrabold ${
                              item.gender === 'L'
                                ? 'bg-blue-50 text-blue-600'
                                : 'bg-pink-50 text-pink-600'
                            }`}
                          >
                            {item.gender}
                          </span>
                        </td>

                        {/* Status Radio Pills (H, I, S, A) */}
                        <td className="py-3 px-4">
                          <div className="flex items-center justify-center gap-1.5">
                            {/* Hadir (H) */}
                            <button
                              type="button"
                              id={`status-h-${item.studentId}`}
                              onClick={() => handleUpdateStudentStatus(item.studentId, 'H')}
                              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                                item.status === 'H'
                                  ? 'bg-emerald-600 text-white shadow-xs scale-102 ring-2 ring-emerald-400/40'
                                  : 'bg-slate-100 hover:bg-emerald-50 text-slate-600 hover:text-emerald-700 border border-slate-200'
                              }`}
                            >
                              <span>H</span>
                              <span className="hidden sm:inline text-[10px] font-normal">Hadir</span>
                            </button>

                            {/* Izin (I) */}
                            <button
                              type="button"
                              id={`status-i-${item.studentId}`}
                              onClick={() => handleUpdateStudentStatus(item.studentId, 'I')}
                              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                                item.status === 'I'
                                  ? 'bg-blue-600 text-white shadow-xs scale-102 ring-2 ring-blue-400/40'
                                  : 'bg-slate-100 hover:bg-blue-50 text-slate-600 hover:text-blue-700 border border-slate-200'
                              }`}
                            >
                              <span>I</span>
                              <span className="hidden sm:inline text-[10px] font-normal">Izin</span>
                            </button>

                            {/* Sakit (S) */}
                            <button
                              type="button"
                              id={`status-s-${item.studentId}`}
                              onClick={() => handleUpdateStudentStatus(item.studentId, 'S')}
                              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                                item.status === 'S'
                                  ? 'bg-amber-500 text-white shadow-xs scale-102 ring-2 ring-amber-400/40'
                                  : 'bg-slate-100 hover:bg-amber-50 text-slate-600 hover:text-amber-700 border border-slate-200'
                              }`}
                            >
                              <span>S</span>
                              <span className="hidden sm:inline text-[10px] font-normal">Sakit</span>
                            </button>

                            {/* Alpha (A) */}
                            <button
                              type="button"
                              id={`status-a-${item.studentId}`}
                              onClick={() => handleUpdateStudentStatus(item.studentId, 'A')}
                              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                                item.status === 'A'
                                  ? 'bg-rose-600 text-white shadow-xs scale-102 ring-2 ring-rose-400/40'
                                  : 'bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-700 border border-slate-200'
                              }`}
                            >
                              <span>A</span>
                              <span className="hidden sm:inline text-[10px] font-normal">Alpha</span>
                            </button>
                          </div>
                        </td>

                        {/* Note Input */}
                        <td className="py-3 px-4">
                          <input
                            type="text"
                            placeholder={
                              item.status === 'H'
                                ? 'Catatan (opsional)...'
                                : item.status === 'S'
                                ? 'Keterangan sakit / surat dokter...'
                                : item.status === 'I'
                                ? 'Alasan izin / keperluan...'
                                : 'Penyebab alpha / tanpa keterangan...'
                            }
                            value={item.notes || ''}
                            onChange={(e) => handleUpdateStudentNote(item.studentId, e.target.value)}
                            className={`w-full px-2.5 py-1.5 rounded-lg text-xs border outline-hidden transition-all ${
                              item.status !== 'H'
                                ? 'border-amber-300 bg-amber-50/50 focus:bg-white focus:ring-2 focus:ring-amber-400'
                                : 'border-slate-200 bg-white focus:ring-2 focus:ring-blue-400'
                            }`}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* Footer with Submit Button */}
          <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Info className="w-4 h-4 text-blue-600 shrink-0" />
              <span>
                Presensi akan tercatat atas nama <strong>{currentUser.name}</strong> ({selectedSubjectObj?.name}, Jam {periodStart}-{periodEnd}).
              </span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="submit"
                id="btn-save-attendance-submit"
                className="w-full sm:w-auto px-6 py-2.5 bg-[#1b357f] hover:bg-[#152a65] text-white font-bold rounded-xl text-xs shadow-md transition-all flex items-center justify-center gap-2 active:scale-98"
              >
                <Save className="w-4 h-4" />
                <span>Simpan Hasil Presensi</span>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
