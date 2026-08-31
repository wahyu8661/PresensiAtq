import React, { useState, useMemo } from 'react';
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
import { exportAttendanceReportToExcel, formatDateIndo } from '../utils/excelHelper';
import {
  GraduationCap,
  Calendar,
  Clock,
  CheckCircle2,
  AlertTriangle,
  FileSpreadsheet,
  Download,
  Users,
  Search,
  BookOpen,
  UserCheck,
  Eye,
  Info,
  Edit,
  Trash2,
  X,
  Save,
  Check,
  FileText,
  UserX,
  HeartPulse,
  MailQuestion
} from 'lucide-react';

interface WaliKelasViewProps {
  currentUser: User;
  students: Student[];
  classes: ClassRoom[];
  subjects: Subject[];
  periods: PeriodSlot[];
  records: AttendanceRecord[];
  onNavigateToForm: (classId?: string) => void;
  onSaveRecord?: (record: AttendanceRecord) => void;
  onDeleteRecord?: (recordId: string) => void;
  onViewStudentDetail: (student: Student) => void;
}

export const WaliKelasView: React.FC<WaliKelasViewProps> = ({
  currentUser,
  students,
  classes,
  subjects,
  periods,
  records,
  onNavigateToForm,
  onSaveRecord,
  onDeleteRecord,
  onViewStudentDetail,
}) => {
  const [selectedDate, setSelectedDate] = useState<string>(getTodayDateString());
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Editing Session Modal State
  const [editingRecord, setEditingRecord] = useState<AttendanceRecord | null>(null);
  const [editTopic, setEditTopic] = useState<string>('');
  const [editNotes, setEditNotes] = useState<string>('');
  const [editItems, setEditItems] = useState<AttendanceItem[]>([]);
  const [editSaveSuccess, setEditSaveSuccess] = useState<boolean>(false);

  // Target Class for this Homeroom Teacher
  const targetClassId = currentUser.assignedClassId || classes[0]?.id || '7-ikhwan';
  const targetClass = classes.find((c) => c.id === targetClassId);

  // Students in this homeroom class
  const classStudents = useMemo(() => {
    return students.filter((s) => s.classId === targetClassId && s.status === 'Aktif');
  }, [students, targetClassId]);

  // Records for this class on selected date (Both Guru Mapel and Wali Kelas)
  const selectedDateClassRecords = useMemo(() => {
    return records
      .filter((r) => r.classId === targetClassId && r.date === selectedDate)
      .sort((a, b) => a.periodStart - b.periodStart);
  }, [records, targetClassId, selectedDate]);

  // Overall attendance statistics for the class
  const studentCumulativeStats = useMemo(() => {
    const classRecords = records.filter((r) => r.classId === targetClassId);

    const map = new Map<
      string,
      { present: number; permit: number; sick: number; alpha: number; bolos: number; late: number; total: number }
    >();

    classStudents.forEach((s) => {
      map.set(s.id, { present: 0, permit: 0, sick: 0, alpha: 0, bolos: 0, late: 0, total: 0 });
    });

    classRecords.forEach((r) => {
      r.items.forEach((item) => {
        const curr = map.get(item.studentId);
        if (curr) {
          curr.total += 1;
          if (item.status === 'H') curr.present += 1;
          else if (item.status === 'I') curr.permit += 1;
          else if (item.status === 'S') curr.sick += 1;
          else if (item.status === 'A') curr.alpha += 1;
          else if (item.status === 'B') curr.bolos += 1;
          else if (item.status === 'T') curr.late += 1;
        }
      });
    });

    return map;
  }, [records, targetClassId, classStudents]);

  // Selected date's status map per student (consolidated across periods on that date)
  const selectedDateStatusPerStudent = useMemo(() => {
    const map = new Map<string, { status: AttendanceStatus; notes: string; subject: string }>();

    selectedDateClassRecords.forEach((rec) => {
      rec.items.forEach((item) => {
        // If not Hadir, prioritize recording the absence/issue
        if (item.status !== 'H' || !map.has(item.studentId)) {
          map.set(item.studentId, {
            status: item.status,
            notes: item.notes || '',
            subject: rec.subjectName,
          });
        }
      });
    });

    return map;
  }, [selectedDateClassRecords]);

  // High absenteeism alert students (Any Bolos or Alpha, or >= 2 Sakit/Izin)
  const attentionStudents = useMemo(() => {
    return classStudents.filter((s) => {
      const stat = studentCumulativeStats.get(s.id);
      if (!stat) return false;
      return stat.alpha >= 1 || stat.bolos >= 1 || stat.sick >= 2 || stat.permit >= 3;
    });
  }, [classStudents, studentCumulativeStats]);

  const filteredStudents = useMemo(() => {
    return classStudents.filter(
      (s) =>
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.nisn.includes(searchQuery)
    );
  }, [classStudents, searchQuery]);

  // Open Edit Session Modal
  const handleOpenEditSessionModal = (record: AttendanceRecord) => {
    setEditingRecord(record);
    setEditTopic(record.topic || '');
    setEditNotes(record.notes || '');

    // Synchronize items with all active students in this class
    const studentMap = new Map(record.items.map((it) => [it.studentId, it]));
    const fullItems: AttendanceItem[] = classStudents.map((s) => {
      const existing = studentMap.get(s.id);
      if (existing) {
        return { ...existing };
      }
      return {
        studentId: s.id,
        studentName: s.name,
        nisn: s.nisn,
        gender: s.gender,
        status: 'H',
      };
    });

    setEditItems(fullItems);
    setEditSaveSuccess(false);
  };

  // Quick set all status in modal
  const handleSetAllEditStatus = (status: AttendanceStatus) => {
    setEditItems((prev) => prev.map((item) => ({ ...item, status })));
  };

  // Update single student status in modal
  const handleUpdateEditItemStatus = (studentId: string, status: AttendanceStatus) => {
    setEditItems((prev) =>
      prev.map((item) => (item.studentId === studentId ? { ...item, status } : item))
    );
  };

  // Update single student note in modal
  const handleUpdateEditItemNote = (studentId: string, note: string) => {
    setEditItems((prev) =>
      prev.map((item) => (item.studentId === studentId ? { ...item, notes: note } : item))
    );
  };

  // Save changes to attendance session
  const handleSaveEditedSession = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingRecord || !onSaveRecord) return;

    const updatedRecord: AttendanceRecord = {
      ...editingRecord,
      topic: editTopic.trim(),
      notes: editNotes.trim(),
      items: editItems,
    };

    onSaveRecord(updatedRecord);
    setEditSaveSuccess(true);
    setTimeout(() => {
      setEditSaveSuccess(false);
      setEditingRecord(null);
    }, 900);
  };

  // Delete session
  const handleDeleteSession = (recordId: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus catatan presensi sesi ini?')) {
      if (onDeleteRecord) {
        onDeleteRecord(recordId);
      }
      if (editingRecord?.id === recordId) {
        setEditingRecord(null);
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-6" id="wali-kelas-dashboard">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#192f75] to-[#254ea8] rounded-2xl p-6 text-white shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-amber-300 uppercase tracking-widest">
            <GraduationCap className="w-4 h-4" />
            <span>Portal Wali Kelas</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black mt-1">
            Pantauan & Koreksi Presensi Kelas {targetClass?.name || targetClassId}
          </h2>
          <p className="text-xs text-blue-100 mt-1">
            Wali Kelas: <strong className="text-white">{currentUser.name}</strong> • Total {classStudents.length} Siswa Binaan
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => onNavigateToForm(targetClassId)}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-amber-400 hover:bg-amber-500 text-slate-900 rounded-xl text-xs font-bold shadow-xs transition-all cursor-pointer"
          >
            <UserCheck className="w-4 h-4" />
            <span>Isi Presensi Baru</span>
          </button>

          <button
            type="button"
            id="export-homeroom-excel"
            onClick={() => {
              exportAttendanceReportToExcel(
                records.filter((r) => r.classId === targetClassId),
                students,
                classes,
                subjects,
                `Rekap_Presensi_Kelas_${targetClassId}`,
                { classId: targetClassId }
              );
            }}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-white/15 hover:bg-white/25 text-white border border-white/20 rounded-xl text-xs font-bold backdrop-blur-xs transition-all cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Ekspor Rekap Excel</span>
          </button>
        </div>
      </div>

      {/* Date Filter & Period Status Matrix */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-600" />
              <span>Status Pengisian Presensi Jam ke-1 s/d Jam ke-9 ({formatDateIndo(selectedDate)})</span>
            </h3>
            <p className="text-xs text-slate-500">
              Klik pada jam pelajaran yang sudah terisi untuk melihat rincian atau mengedit kehadiran yang diinput Guru Mapel / Wali Kelas.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-600">Pilih Tanggal:</span>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 outline-hidden"
            />
          </div>
        </div>

        {/* 9 Periods Matrix Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-2">
          {periods.map((p) => {
            const filledRecord = selectedDateClassRecords.find(
              (r) => r.periodStart <= p.period && r.periodEnd >= p.period
            );

            const isFilled = Boolean(filledRecord);

            return (
              <div
                key={p.period}
                onClick={() => filledRecord && handleOpenEditSessionModal(filledRecord)}
                className={`p-2.5 rounded-xl border transition-all ${
                  isFilled
                    ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950 hover:border-emerald-500 hover:shadow-sm cursor-pointer'
                    : 'bg-slate-50 border-slate-200 text-slate-500'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-black">Jam {p.period}</span>
                  {isFilled ? (
                    <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-700">
                      <Edit className="w-3 h-3 text-emerald-600" />
                      <span>Edit</span>
                    </span>
                  ) : (
                    <span className="text-[10px] text-slate-400 font-mono">Kosong</span>
                  )}
                </div>
                <p className="text-[10px] text-slate-400 mt-0.5">{p.timeStart}</p>
                <div className="mt-1.5 pt-1.5 border-t border-slate-200/50">
                  {isFilled ? (
                    <div>
                      <p className="text-[11px] font-bold truncate text-emerald-900">
                        {filledRecord?.subjectName}
                      </p>
                      <p className="text-[9px] text-slate-500 truncate mt-0.5">
                        {filledRecord?.teacherName}
                      </p>
                    </div>
                  ) : (
                    <p className="text-[10px] text-slate-400 italic">Belum diabsen</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Sesi Jurnal & Pengisian Presensi Hari Ini (Dengan tombol Koreksi / Edit) */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-600" />
              <span>Daftar Sesi Presensi & Jurnal Mengajar ({formatDateIndo(selectedDate)})</span>
            </h3>
            <p className="text-xs text-slate-500">
              Wali Kelas memiliki wewenang mengedit data kehadiran yang diisi oleh guru mapel maupun wali kelas sendiri.
            </p>
          </div>
        </div>

        {selectedDateClassRecords.length === 0 ? (
          <div className="p-8 text-center bg-slate-50 rounded-xl border border-dashed border-slate-200">
            <Clock className="w-8 h-8 mx-auto text-slate-300 mb-2" />
            <p className="text-xs font-semibold text-slate-600">Belum ada sesi presensi pada tanggal {formatDateIndo(selectedDate)}.</p>
            <p className="text-[11px] text-slate-400 mt-0.5">Guru mapel atau wali kelas dapat melakukan presensi melalui tombol "Isi Presensi Baru".</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {selectedDateClassRecords.map((rec) => {
              const hCount = rec.items.filter((i) => i.status === 'H').length;
              const iCount = rec.items.filter((i) => i.status === 'I').length;
              const sCount = rec.items.filter((i) => i.status === 'S').length;
              const aCount = rec.items.filter((i) => i.status === 'A').length;
              const bCount = rec.items.filter((i) => i.status === 'B').length;
              const tCount = rec.items.filter((i) => i.status === 'T').length;

              const isByWali = rec.teacherRole === 'wali_kelas';

              return (
                <div
                  key={rec.id}
                  className="p-4 rounded-xl border border-slate-200 bg-white hover:border-blue-300 transition-all flex flex-col justify-between gap-3 shadow-2xs"
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded text-[10px] font-black bg-blue-100 text-blue-800">
                            {rec.periodStart === rec.periodEnd ? `Jam ke-${rec.periodStart}` : `Jam ${rec.periodStart}-${rec.periodEnd}`}
                          </span>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${isByWali ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-700'}`}>
                            {isByWali ? 'Diisi Wali Kelas' : 'Diisi Guru Mapel'}
                          </span>
                        </div>
                        <h4 className="text-sm font-black text-slate-900 mt-1">{rec.subjectName}</h4>
                        <p className="text-xs text-slate-500">Pengampu: <strong>{rec.teacherName}</strong></p>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleOpenEditSessionModal(rec)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#1b357f] hover:bg-[#152a65] text-white rounded-lg text-xs font-bold transition-all shadow-2xs cursor-pointer"
                      >
                        <Edit className="w-3.5 h-3.5" />
                        <span>Koreksi / Edit</span>
                      </button>
                    </div>

                    {rec.topic && (
                      <p className="text-xs text-slate-600 bg-slate-50 p-2 rounded-lg border border-slate-100">
                        <strong className="text-slate-700">Materi:</strong> {rec.topic}
                      </p>
                    )}

                    {/* Counters */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-1 text-[11px] font-bold">
                      <span className="px-2 py-0.5 bg-emerald-50 text-emerald-800 rounded border border-emerald-200">H: {hCount}</span>
                      <span className="px-2 py-0.5 bg-blue-50 text-blue-800 rounded border border-blue-200">I: {iCount}</span>
                      <span className="px-2 py-0.5 bg-amber-50 text-amber-800 rounded border border-amber-200">S: {sCount}</span>
                      <span className="px-2 py-0.5 bg-rose-50 text-rose-800 rounded border border-rose-200">A: {aCount}</span>
                      <span className="px-2 py-0.5 bg-purple-50 text-purple-800 rounded border border-purple-200">B: {bCount}</span>
                      <span className="px-2 py-0.5 bg-orange-50 text-orange-800 rounded border border-orange-200">T: {tCount}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Warning Alert for Students Needing Attention */}
      {attentionStudents.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 shadow-xs">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center shrink-0">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wide">
                Perhatian Wali Kelas: Siswa dengan Catatan Absensi (Alpha/Bolos/Sakit/Izin)
              </h4>
              <p className="text-xs text-amber-800 mt-0.5">
                Terdapat {attentionStudents.length} siswa yang memiliki catatan absensi berulang:
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                {attentionStudents.map((s) => {
                  const stat = studentCumulativeStats.get(s.id);
                  return (
                    <div
                      key={s.id}
                      onClick={() => onViewStudentDetail(s)}
                      className="px-2.5 py-1 bg-white border border-amber-300 rounded-lg text-xs cursor-pointer hover:bg-amber-100 flex items-center gap-1.5"
                    >
                      <span className="font-bold text-slate-800">{s.name}</span>
                      <span className="text-[10px] font-bold text-rose-600">
                        ({stat?.alpha} Alpha, {stat?.bolos} Bolos, {stat?.late} Telat, {stat?.sick} Sakit, {stat?.permit} Izin)
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Homeroom Class Student Attendance List */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 bg-slate-50/80 border-b border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Rekapitulasi Kehadiran Siswa Kelas {targetClass?.name}
            </h4>
            <p className="text-[11px] text-slate-500">
              Status per tanggal {formatDateIndo(selectedDate)} dan akumulasi semester
            </p>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Cari nama atau NISN..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 outline-hidden"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-100 text-slate-800 font-bold border-b border-slate-200">
              <tr>
                <th className="py-3 px-3 text-center w-12">No</th>
                <th className="py-3 px-4 min-w-[200px]">Nama Siswa & NISN</th>
                <th className="py-3 px-2 text-center w-12">L/P</th>
                <th className="py-3 px-4 text-center min-w-[130px]">Status ({selectedDate})</th>
                <th className="py-3 px-3 text-center min-w-[50px]">H</th>
                <th className="py-3 px-3 text-center min-w-[50px]">I</th>
                <th className="py-3 px-3 text-center min-w-[50px]">S</th>
                <th className="py-3 px-3 text-center min-w-[50px]">A</th>
                <th className="py-3 px-3 text-center min-w-[50px]">B</th>
                <th className="py-3 px-3 text-center min-w-[50px]">T</th>
                <th className="py-3 px-3 text-center min-w-[90px]">% Hadir</th>
                <th className="py-3 px-4 text-center min-w-[90px]">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredStudents.map((student, idx) => {
                const stat = studentCumulativeStats.get(student.id) || { present: 0, permit: 0, sick: 0, alpha: 0, bolos: 0, late: 0, total: 0 };
                const rate = stat.total > 0 ? Math.round((stat.present / stat.total) * 100) : 100;
                const todayStatus = selectedDateStatusPerStudent.get(student.id);

                return (
                  <tr key={student.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-3 text-center font-semibold text-slate-400">{idx + 1}</td>
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-bold text-slate-900">{student.name}</p>
                        <p className="text-[11px] text-slate-400 font-mono">NISN: {student.nisn}</p>
                      </div>
                    </td>
                    <td className="py-3 px-2 text-center font-bold">
                      <span className={`px-1.5 py-0.5 rounded text-[10px] ${student.gender === 'L' ? 'text-blue-600 bg-blue-50' : 'text-pink-600 bg-pink-50'}`}>
                        {student.gender}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      {todayStatus ? (
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            todayStatus.status === 'H'
                              ? 'bg-emerald-100 text-emerald-800'
                              : todayStatus.status === 'I'
                              ? 'bg-blue-100 text-blue-800'
                              : todayStatus.status === 'S'
                              ? 'bg-amber-100 text-amber-800'
                              : todayStatus.status === 'B'
                              ? 'bg-purple-100 text-purple-800'
                              : todayStatus.status === 'T'
                              ? 'bg-orange-100 text-orange-800'
                              : 'bg-rose-100 text-rose-800'
                          }`}
                        >
                          {todayStatus.status === 'H' && 'Hadir'}
                          {todayStatus.status === 'I' && 'Izin'}
                          {todayStatus.status === 'S' && 'Sakit'}
                          {todayStatus.status === 'A' && 'Alpha'}
                          {todayStatus.status === 'B' && 'Bolos'}
                          {todayStatus.status === 'T' && 'Terlambat'}
                        </span>
                      ) : (
                        <span className="text-slate-400 text-[11px] italic">Belum ada jam</span>
                      )}
                    </td>
                    <td className="py-3 px-3 text-center font-bold text-emerald-700">{stat.present}</td>
                    <td className="py-3 px-3 text-center font-bold text-blue-700">{stat.permit}</td>
                    <td className="py-3 px-3 text-center font-bold text-amber-700">{stat.sick}</td>
                    <td className="py-3 px-3 text-center font-bold text-rose-700">{stat.alpha}</td>
                    <td className="py-3 px-3 text-center font-bold text-purple-700">{stat.bolos}</td>
                    <td className="py-3 px-3 text-center font-bold text-orange-700">{stat.late}</td>
                    <td className="py-3 px-3 text-center font-extrabold text-slate-800">{rate}%</td>
                    <td className="py-3 px-4 text-center">
                      <button
                        type="button"
                        onClick={() => onViewStudentDetail(student)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-100 hover:bg-blue-50 text-blue-700 rounded-lg text-xs font-semibold transition-all cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Rincian</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODAL EDIT / KOREKSI PRESENSI OLEH WALI KELAS */}
      {/* ========================================================================= */}
      {editingRecord && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 z-50 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-4xl w-full p-5 sm:p-6 shadow-2xl border border-slate-100 max-h-[92vh] flex flex-col">
            {/* Header Modal */}
            <div className="flex items-start justify-between pb-4 border-b border-slate-200">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 bg-amber-100 text-amber-900 rounded-full text-[10px] font-black uppercase">
                    Koreksi Presensi Wali Kelas
                  </span>
                  <span className="text-xs text-slate-500">
                    Tanggal: <strong>{formatDateIndo(editingRecord.date)}</strong>
                  </span>
                </div>
                <h3 className="text-lg font-black text-slate-900">
                  {editingRecord.subjectName} ({editingRecord.periodStart === editingRecord.periodEnd ? `Jam ke-${editingRecord.periodStart}` : `Jam ${editingRecord.periodStart}-${editingRecord.periodEnd}`})
                </h3>
                <p className="text-xs text-slate-500">
                  Penginput Awal: <strong className="text-slate-800">{editingRecord.teacherName}</strong> ({editingRecord.teacherRole === 'wali_kelas' ? 'Wali Kelas' : 'Guru Mapel'})
                </p>
              </div>

              <button
                type="button"
                onClick={() => setEditingRecord(null)}
                className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSaveEditedSession} className="flex-1 flex flex-col overflow-hidden pt-4 space-y-4">
              {/* Topic & Notes Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                    Topik / Materi Pembelajaran
                  </label>
                  <input
                    type="text"
                    value={editTopic}
                    onChange={(e) => setEditTopic(e.target.value)}
                    placeholder="Judul materi atau bab yang diajarkan..."
                    className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs outline-hidden focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                    Catatan Guru / Jurnal Sesi
                  </label>
                  <input
                    type="text"
                    value={editNotes}
                    onChange={(e) => setEditNotes(e.target.value)}
                    placeholder="Catatan kelas, kendala, atau arahan khusus..."
                    className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs outline-hidden focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Quick Action Button */}
              <div className="flex items-center justify-between gap-2 px-1">
                <span className="text-xs font-bold text-slate-700">
                  Daftar Presensi ({editItems.length} Siswa):
                </span>
                <button
                  type="button"
                  onClick={() => handleSetAllEditStatus('H')}
                  className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold flex items-center gap-1 shadow-2xs"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Setel Semua Hadir (H)</span>
                </button>
              </div>

              {/* Editable Students Table */}
              <div className="flex-1 overflow-y-auto border border-slate-200 rounded-xl">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 text-slate-800 font-bold sticky top-0 border-b border-slate-200 z-10">
                    <tr>
                      <th className="py-2 px-2.5 text-center w-10">No</th>
                      <th className="py-2 px-3 min-w-[180px]">Nama Siswa</th>
                      <th className="py-2 px-3 text-center min-w-[280px]">Status Kehadiran</th>
                      <th className="py-2 px-3 min-w-[180px]">Keterangan</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {editItems.map((item, idx) => (
                      <tr
                        key={item.studentId}
                        className={`hover:bg-slate-50 ${
                          item.status === 'A'
                            ? 'bg-rose-50/40'
                            : item.status === 'B'
                            ? 'bg-purple-50/40'
                            : item.status === 'T'
                            ? 'bg-orange-50/40'
                            : item.status === 'S'
                            ? 'bg-amber-50/40'
                            : item.status === 'I'
                            ? 'bg-blue-50/40'
                            : ''
                        }`}
                      >
                        <td className="py-2 px-2.5 text-center text-slate-400 font-mono">{idx + 1}</td>
                        <td className="py-2 px-3">
                          <p className="font-bold text-slate-900">{item.studentName}</p>
                          <p className="text-[10px] text-slate-400 font-mono">NISN: {item.nisn}</p>
                        </td>
                        <td className="py-2 px-3 text-center">
                          <div className="flex items-center justify-center gap-1">
                            <button
                              type="button"
                              onClick={() => handleUpdateEditItemStatus(item.studentId, 'H')}
                              title="Hadir"
                              className={`px-2 py-1 rounded text-xs font-bold transition-all ${
                                item.status === 'H'
                                  ? 'bg-emerald-600 text-white shadow-xs'
                                  : 'bg-slate-100 hover:bg-emerald-50 text-slate-600'
                              }`}
                            >
                              H
                            </button>
                            <button
                              type="button"
                              onClick={() => handleUpdateEditItemStatus(item.studentId, 'I')}
                              title="Izin"
                              className={`px-2 py-1 rounded text-xs font-bold transition-all ${
                                item.status === 'I'
                                  ? 'bg-blue-600 text-white shadow-xs'
                                  : 'bg-slate-100 hover:bg-blue-50 text-slate-600'
                              }`}
                            >
                              I
                            </button>
                            <button
                              type="button"
                              onClick={() => handleUpdateEditItemStatus(item.studentId, 'S')}
                              title="Sakit"
                              className={`px-2 py-1 rounded text-xs font-bold transition-all ${
                                item.status === 'S'
                                  ? 'bg-amber-500 text-white shadow-xs'
                                  : 'bg-slate-100 hover:bg-amber-50 text-slate-600'
                              }`}
                            >
                              S
                            </button>
                            <button
                              type="button"
                              onClick={() => handleUpdateEditItemStatus(item.studentId, 'A')}
                              title="Alpha"
                              className={`px-2 py-1 rounded text-xs font-bold transition-all ${
                                item.status === 'A'
                                  ? 'bg-rose-600 text-white shadow-xs'
                                  : 'bg-slate-100 hover:bg-rose-50 text-slate-600'
                              }`}
                            >
                              A
                            </button>
                            <button
                              type="button"
                              onClick={() => handleUpdateEditItemStatus(item.studentId, 'B')}
                              title="Bolos"
                              className={`px-2 py-1 rounded text-xs font-bold transition-all ${
                                item.status === 'B'
                                  ? 'bg-purple-600 text-white shadow-xs'
                                  : 'bg-slate-100 hover:bg-purple-50 text-slate-600'
                              }`}
                            >
                              B
                            </button>
                            <button
                              type="button"
                              onClick={() => handleUpdateEditItemStatus(item.studentId, 'T')}
                              title="Terlambat"
                              className={`px-2 py-1 rounded text-xs font-bold transition-all ${
                                item.status === 'T'
                                  ? 'bg-orange-500 text-white shadow-xs'
                                  : 'bg-slate-100 hover:bg-orange-50 text-slate-600'
                              }`}
                            >
                              T
                            </button>
                          </div>
                        </td>
                        <td className="py-2 px-3">
                          <input
                            type="text"
                            placeholder="Catatan..."
                            value={item.notes || ''}
                            onChange={(e) => handleUpdateEditItemNote(item.studentId, e.target.value)}
                            className="w-full px-2 py-1 bg-white border border-slate-200 rounded text-xs outline-hidden"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Modal Footer */}
              <div className="pt-3 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => handleDeleteSession(editingRecord.id)}
                  className="text-rose-600 hover:text-rose-800 text-xs font-bold flex items-center gap-1.5 px-3 py-2 rounded-lg hover:bg-rose-50 cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Hapus Catatan Sesi Ini</span>
                </button>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => setEditingRecord(null)}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl"
                  >
                    Batal
                  </button>

                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#1b357f] hover:bg-[#152a65] text-white text-xs font-bold rounded-xl shadow-md flex items-center gap-1.5 cursor-pointer active:scale-98"
                  >
                    {editSaveSuccess ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span>Tersimpan!</span>
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        <span>Simpan Perubahan Presensi</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
