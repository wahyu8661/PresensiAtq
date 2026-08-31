import React, { useState, useMemo } from 'react';
import { User, Student, ClassRoom, Subject, PeriodSlot, AttendanceRecord, AttendanceStatus } from '../types';
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
  Info
} from 'lucide-react';

interface WaliKelasViewProps {
  currentUser: User;
  students: Student[];
  classes: ClassRoom[];
  subjects: Subject[];
  periods: PeriodSlot[];
  records: AttendanceRecord[];
  onNavigateToForm: (classId?: string) => void;
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
  onViewStudentDetail,
}) => {
  const [selectedDate, setSelectedDate] = useState<string>(getTodayDateString());
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Target Class for this Homeroom Teacher
  const targetClassId = currentUser.assignedClassId || classes[0]?.id || '7-ikhwan';
  const targetClass = classes.find((c) => c.id === targetClassId);

  // Students in this homeroom class
  const classStudents = useMemo(() => {
    return students.filter((s) => s.classId === targetClassId && s.status === 'Aktif');
  }, [students, targetClassId]);

  // Today's records for this class
  const todayClassRecords = useMemo(() => {
    return records.filter((r) => r.classId === targetClassId && r.date === selectedDate);
  }, [records, targetClassId, selectedDate]);

  // Overall attendance statistics for the class
  const studentCumulativeStats = useMemo(() => {
    const classRecords = records.filter((r) => r.classId === targetClassId);

    const map = new Map<string, { present: number; permit: number; sick: number; alpha: number; total: number }>();

    classStudents.forEach((s) => {
      map.set(s.id, { present: 0, permit: 0, sick: 0, alpha: 0, total: 0 });
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
        }
      });
    });

    return map;
  }, [records, targetClassId, classStudents]);

  // Today's status map per student (consolidated across periods today)
  const todayStatusPerStudent = useMemo(() => {
    const map = new Map<string, { status: AttendanceStatus; notes: string; subject: string }>();

    todayClassRecords.forEach((rec) => {
      rec.items.forEach((item) => {
        // If not Hadir, prioritize recording the reason/absence
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
  }, [todayClassRecords]);

  // High absenteeism alert students (> 1 Alpha or > 2 Sakit/Izin)
  const attentionStudents = useMemo(() => {
    return classStudents.filter((s) => {
      const stat = studentCumulativeStats.get(s.id);
      if (!stat) return false;
      return stat.alpha >= 1 || stat.sick >= 2 || stat.permit >= 3;
    });
  }, [classStudents, studentCumulativeStats]);

  const filteredStudents = useMemo(() => {
    return classStudents.filter(
      (s) =>
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.nisn.includes(searchQuery)
    );
  }, [classStudents, searchQuery]);

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
            Pantauan Presensi Kelas {targetClass?.name || targetClassId}
          </h2>
          <p className="text-xs text-blue-100 mt-1">
            Wali Kelas: <strong className="text-white">{currentUser.name}</strong> • Total {classStudents.length} Santri Binaan
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => onNavigateToForm(targetClassId)}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-amber-400 hover:bg-amber-500 text-slate-900 rounded-xl text-xs font-bold shadow-xs transition-all"
          >
            <UserCheck className="w-4 h-4" />
            <span>Isi Presensi Kelas</span>
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
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-white/15 hover:bg-white/25 text-white border border-white/20 rounded-xl text-xs font-bold backdrop-blur-xs transition-all"
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
              <span>Status Pengisian Presensi Jam ke-1 s/d Jam ke-9</span>
            </h3>
            <p className="text-xs text-slate-500">
              Pantau jam mengajar yang sudah diisi oleh guru mata pelajaran.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-600">Tanggal:</span>
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
            const filledRecord = todayClassRecords.find(
              (r) => r.periodStart <= p.period && r.periodEnd >= p.period
            );

            const isFilled = Boolean(filledRecord);

            return (
              <div
                key={p.period}
                className={`p-2.5 rounded-xl border transition-all ${
                  isFilled
                    ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950'
                    : 'bg-slate-50 border-slate-200 text-slate-500'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-black">Jam {p.period}</span>
                  {isFilled ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <span className="text-[10px] text-slate-400 font-mono">Belum</span>
                  )}
                </div>
                <p className="text-[10px] text-slate-400 mt-0.5">{p.timeStart}</p>
                <div className="mt-1.5 pt-1.5 border-t border-slate-200/50">
                  {isFilled ? (
                    <p className="text-[11px] font-bold truncate text-emerald-800">
                      {filledRecord?.subjectName}
                    </p>
                  ) : (
                    <p className="text-[10px] text-slate-400 italic">Belum diabsen</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
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
                Perhatian Wali Kelas: Santri dengan Catatan Absensi
              </h4>
              <p className="text-xs text-amber-800 mt-0.5">
                Terdapat {attentionStudents.length} santri yang memiliki catatan Alpha atau Sakit/Izin berulang:
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
                        ({stat?.alpha} Alpha, {stat?.sick} Sakit, {stat?.permit} Izin)
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
              Rekapitulasi Kehadiran Santri Kelas {targetClass?.name}
            </h4>
            <p className="text-[11px] text-slate-500">
              Status per tanggal {selectedDate} dan akumulasi semester
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
                <th className="py-3 px-4 min-w-[200px]">Nama Santri & NISN</th>
                <th className="py-3 px-2 text-center w-12">L/P</th>
                <th className="py-3 px-4 text-center min-w-[130px]">Status Hari Ini</th>
                <th className="py-3 px-3 text-center min-w-[60px]">H</th>
                <th className="py-3 px-3 text-center min-w-[60px]">I</th>
                <th className="py-3 px-3 text-center min-w-[60px]">S</th>
                <th className="py-3 px-3 text-center min-w-[60px]">A</th>
                <th className="py-3 px-3 text-center min-w-[100px]">% Hadir</th>
                <th className="py-3 px-4 text-center min-w-[100px]">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredStudents.map((student, idx) => {
                const stat = studentCumulativeStats.get(student.id) || { present: 0, permit: 0, sick: 0, alpha: 0, total: 0 };
                const rate = stat.total > 0 ? Math.round((stat.present / stat.total) * 100) : 100;
                const todayStatus = todayStatusPerStudent.get(student.id);

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
                              : 'bg-rose-100 text-rose-800'
                          }`}
                        >
                          {todayStatus.status === 'H' && 'Hadir'}
                          {todayStatus.status === 'I' && 'Izin'}
                          {todayStatus.status === 'S' && 'Sakit'}
                          {todayStatus.status === 'A' && 'Alpha'}
                        </span>
                      ) : (
                        <span className="text-slate-400 text-[11px] italic">Belum ada jam</span>
                      )}
                    </td>
                    <td className="py-3 px-3 text-center font-bold text-emerald-700">{stat.present}</td>
                    <td className="py-3 px-3 text-center font-bold text-blue-700">{stat.permit}</td>
                    <td className="py-3 px-3 text-center font-bold text-amber-700">{stat.sick}</td>
                    <td className="py-3 px-3 text-center font-bold text-rose-700">{stat.alpha}</td>
                    <td className="py-3 px-3 text-center font-extrabold text-slate-800">{rate}%</td>
                    <td className="py-3 px-4 text-center">
                      <button
                        type="button"
                        onClick={() => onViewStudentDetail(student)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-100 hover:bg-blue-50 text-blue-700 rounded-lg text-xs font-semibold transition-all"
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
    </div>
  );
};
