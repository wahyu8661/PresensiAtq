import React, { useState, useMemo } from 'react';
import { User, Student, ClassRoom, Subject, PeriodSlot, AttendanceRecord } from '../types';
import { exportAttendanceReportToExcel, formatDateIndo } from '../utils/excelHelper';
import {
  BookOpen,
  Calendar,
  Clock,
  CheckCircle2,
  Download,
  PlusCircle,
  FileSpreadsheet,
  Users,
  Search,
  Filter,
  ArrowRight
} from 'lucide-react';

interface GuruMapelViewProps {
  currentUser: User;
  students: Student[];
  classes: ClassRoom[];
  subjects: Subject[];
  periods: PeriodSlot[];
  records: AttendanceRecord[];
  onStartAttendance: (classId?: string, subjectId?: string) => void;
}

export const GuruMapelView: React.FC<GuruMapelViewProps> = ({
  currentUser,
  students,
  classes,
  subjects,
  periods,
  records,
  onStartAttendance,
}) => {
  const [selectedClassFilter, setSelectedClassFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Map of classes & subjects taught by this teacher
  const teacherSubjects = useMemo(() => {
    if (!currentUser.assignedSubjectIds) return subjects;
    return subjects.filter((s) => currentUser.assignedSubjectIds?.includes(s.id));
  }, [currentUser, subjects]);

  const teacherClasses = useMemo(() => {
    if (!currentUser.assignedClassIds) return classes;
    return classes.filter((c) => currentUser.assignedClassIds?.includes(c.id));
  }, [currentUser, classes]);

  // Attendance records submitted by this teacher
  const teacherRecords = useMemo(() => {
    return records
      .filter((r) => r.teacherId === currentUser.id)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [records, currentUser]);

  const filteredRecords = useMemo(() => {
    return teacherRecords.filter((r) => {
      const matchClass = selectedClassFilter === 'ALL' || r.classId === selectedClassFilter;
      const matchSearch =
        r.subjectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (r.topic && r.topic.toLowerCase().includes(searchQuery.toLowerCase())) ||
        r.className?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchClass && matchSearch;
    });
  }, [teacherRecords, selectedClassFilter, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-6" id="guru-mapel-dashboard">
      {/* Teacher Profile Banner */}
      <div className="bg-gradient-to-r from-[#12384a] to-[#1c5570] rounded-2xl p-6 text-white shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-300 uppercase tracking-widest">
            <BookOpen className="w-4 h-4" />
            <span>Portal Guru Spesialis / Mapel</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black mt-1">
            {currentUser.name}
          </h2>
          <p className="text-xs text-teal-100 mt-1">
            Mata Pelajaran:{' '}
            <strong className="text-white">
              {teacherSubjects.map((s) => s.name).join(', ') || 'Semua Mapel'}
            </strong>
          </p>
        </div>

        <button
          type="button"
          onClick={() => onStartAttendance()}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold shadow-md transition-all active:scale-98"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Mulai Absen Jam Ini</span>
        </button>
      </div>

      {/* Classes Taught Cards Grid */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
          <Users className="w-4 h-4 text-blue-600" />
          <span>Kelas yang Diampu (Klik untuk Langsung Absen)</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {teacherClasses.map((cls) => {
            const classStudentCount = students.filter((s) => s.classId === cls.id && s.status === 'Aktif').length;
            return (
              <div
                key={cls.id}
                onClick={() => onStartAttendance(cls.id)}
                className="bg-white rounded-xl p-4 border border-slate-200 hover:border-emerald-500 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-blue-50 text-blue-800 border border-blue-100">
                      Kelas {cls.id}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-400">
                      {classStudentCount} Siswa
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 mt-2 group-hover:text-emerald-700 transition-colors">
                    {cls.name}
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-1">Wali: {cls.waliKelasName}</p>
                </div>

                <div className="mt-4 pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-600 group-hover:text-emerald-700">
                  <span>Isi Presensi</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Attendance History Log for this Teacher */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 bg-slate-50/80 border-b border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Riwayat Pengisian Presensi Saya
            </h4>
            <p className="text-[11px] text-slate-500">
              Total {teacherRecords.length} sesi mengajar yang telah Anda input
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Class Filter */}
            <select
              value={selectedClassFilter}
              onChange={(e) => setSelectedClassFilter(e.target.value)}
              className="px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 outline-hidden"
            >
              <option value="ALL">Semua Kelas</option>
              {teacherClasses.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>

            {/* Export Excel Button */}
            <button
              type="button"
              onClick={() => {
                exportAttendanceReportToExcel(
                  filteredRecords,
                  students,
                  classes,
                  subjects,
                  `Jurnal_Presensi_${currentUser.name.replace(/[^a-zA-Z0-9]/g, '_')}`
                );
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Ekspor Excel</span>
            </button>
          </div>
        </div>

        {filteredRecords.length === 0 ? (
          <div className="p-12 text-center text-slate-400">
            <BookOpen className="w-10 h-10 mx-auto mb-2 opacity-40 text-slate-400" />
            <p className="text-sm font-semibold">Belum ada riwayat presensi yang diinput.</p>
            <p className="text-xs text-slate-400 mt-1">
              Klik tombol &quot;Mulai Absen Jam Ini&quot; untuk mengisi absensi kelas pertama Anda.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-100 text-slate-800 font-bold border-b border-slate-200">
                <tr>
                  <th className="py-3 px-3 text-center w-12">No</th>
                  <th className="py-3 px-4 min-w-[110px]">Tanggal</th>
                  <th className="py-3 px-4 min-w-[150px]">Kelas</th>
                  <th className="py-3 px-4 min-w-[100px]">Jam Ke</th>
                  <th className="py-3 px-4 min-w-[180px]">Mata Pelajaran & Topik</th>
                  <th className="py-3 px-3 text-center min-w-[60px]">H</th>
                  <th className="py-3 px-3 text-center min-w-[60px]">I</th>
                  <th className="py-3 px-3 text-center min-w-[60px]">S</th>
                  <th className="py-3 px-3 text-center min-w-[60px]">A</th>
                  <th className="py-3 px-4 min-w-[180px]">Catatan / Ketidaksesuaian</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredRecords.map((rec, idx) => {
                  const hCount = rec.items.filter((i) => i.status === 'H').length;
                  const iCount = rec.items.filter((i) => i.status === 'I').length;
                  const sCount = rec.items.filter((i) => i.status === 'S').length;
                  const aCount = rec.items.filter((i) => i.status === 'A').length;
                  const absents = rec.items
                    .filter((i) => i.status !== 'H')
                    .map((i) => `${i.studentName} (${i.status})`)
                    .join(', ');

                  return (
                    <tr key={rec.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-3 text-center font-semibold text-slate-400">{idx + 1}</td>
                      <td className="py-3 px-4 font-semibold text-slate-800">{rec.date}</td>
                      <td className="py-3 px-4 font-bold text-blue-900">{rec.className || rec.classId}</td>
                      <td className="py-3 px-4">
                        <span className="bg-slate-100 text-slate-800 px-2 py-0.5 rounded text-[11px] font-bold">
                          Jam {rec.periodStart}-{rec.periodEnd}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <p className="font-bold text-slate-900">{rec.subjectName}</p>
                        {rec.topic && <p className="text-[11px] text-slate-500 italic mt-0.5">{rec.topic}</p>}
                      </td>
                      <td className="py-3 px-3 text-center font-bold text-emerald-600">{hCount}</td>
                      <td className="py-3 px-3 text-center font-bold text-blue-600">{iCount}</td>
                      <td className="py-3 px-3 text-center font-bold text-amber-600">{sCount}</td>
                      <td className="py-3 px-3 text-center font-bold text-rose-600">{aCount}</td>
                      <td className="py-3 px-4 text-slate-500">
                        {absents ? (
                          <span className="text-rose-700 font-medium">{absents}</span>
                        ) : (
                          <span className="text-emerald-700 font-semibold">Semua Hadir</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
