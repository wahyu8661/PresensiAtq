import React, { useMemo } from 'react';
import { Student, ClassRoom, AttendanceRecord, Subject } from '../types';
import { formatDateIndo } from '../utils/excelHelper';
import {
  GraduationCap,
  Calendar,
  Clock,
  CheckCircle2,
  HeartPulse,
  MailQuestion,
  UserX,
  Phone,
  User,
  X,
  FileText
} from 'lucide-react';

interface StudentDetailModalProps {
  student: Student | null;
  classes: ClassRoom[];
  subjects: Subject[];
  records: AttendanceRecord[];
  onClose: () => void;
}

export const StudentDetailModal: React.FC<StudentDetailModalProps> = ({
  student,
  classes,
  subjects,
  records,
  onClose,
}) => {
  if (!student) return null;

  const currentClass = classes.find((c) => c.id === student.classId);

  // Extract all attendance records containing this student
  const studentLogs = useMemo(() => {
    const logs: Array<{
      date: string;
      subjectName: string;
      periodStart: number;
      periodEnd: number;
      teacherName: string;
      status: 'H' | 'I' | 'S' | 'A';
      notes?: string;
      topic?: string;
    }> = [];

    records.forEach((r) => {
      const item = r.items.find((i) => i.studentId === student.id);
      if (item) {
        logs.push({
          date: r.date,
          subjectName: r.subjectName,
          periodStart: r.periodStart,
          periodEnd: r.periodEnd,
          teacherName: r.teacherName,
          status: item.status,
          notes: item.notes,
          topic: r.topic,
        });
      }
    });

    return logs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [records, student]);

  // Aggregate stats
  const total = studentLogs.length;
  const hadir = studentLogs.filter((l) => l.status === 'H').length;
  const izin = studentLogs.filter((l) => l.status === 'I').length;
  const sakit = studentLogs.filter((l) => l.status === 'S').length;
  const alpha = studentLogs.filter((l) => l.status === 'A').length;
  const percentage = total > 0 ? Math.round((hadir / total) * 100) : 100;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-100 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center text-lg font-black ${
                student.gender === 'L'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-pink-100 text-pink-800'
              }`}
            >
              {student.name.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900">{student.name}</h3>
              <p className="text-xs text-slate-500 font-mono">
                NISN: {student.nisn} • Kelas: {currentClass?.name || student.classId}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[10px] font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                  {student.gender === 'L' ? 'Laki-laki (Ikhwan)' : 'Perempuan (Akhwat)'}
                </span>
                <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                  Status: {student.status}
                </span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Attendance Summary Cards */}
        <div className="grid grid-cols-5 gap-2 my-4">
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
            <span className="text-[10px] font-bold text-slate-500 uppercase">Total Sesi</span>
            <p className="text-base font-black text-slate-800 mt-0.5">{total}</p>
          </div>
          <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-center">
            <span className="text-[10px] font-bold text-emerald-700 uppercase">Hadir</span>
            <p className="text-base font-black text-emerald-800 mt-0.5">{hadir}</p>
          </div>
          <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-200 text-center">
            <span className="text-[10px] font-bold text-blue-700 uppercase">Izin</span>
            <p className="text-base font-black text-blue-800 mt-0.5">{izin}</p>
          </div>
          <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-center">
            <span className="text-[10px] font-bold text-amber-700 uppercase">Sakit</span>
            <p className="text-base font-black text-amber-800 mt-0.5">{sakit}</p>
          </div>
          <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-center">
            <span className="text-[10px] font-bold text-rose-700 uppercase">Alpha</span>
            <p className="text-base font-black text-rose-800 mt-0.5">{alpha}</p>
          </div>
        </div>

        {/* Parent & Contact Info */}
        {(student.parentName || student.parentPhone) && (
          <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 mb-4 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-slate-700">
              <User className="w-4 h-4 text-slate-400" />
              <span>Wali / Orang Tua: <strong>{student.parentName || '-'}</strong></span>
            </div>
            {student.parentPhone && (
              <div className="flex items-center gap-1.5 text-blue-700 font-bold">
                <Phone className="w-3.5 h-3.5" />
                <a href={`tel:${student.parentPhone}`} className="hover:underline">
                  {student.parentPhone}
                </a>
              </div>
            )}
          </div>
        )}

        {/* Attendance Timeline Records */}
        <div className="flex-1 overflow-y-auto space-y-2 pr-1">
          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
            Riwayat Log Kehadiran per Mata Pelajaran & Jam
          </h4>

          {studentLogs.length === 0 ? (
            <p className="text-xs text-slate-400 italic py-6 text-center">
              Belum ada data rekaman presensi untuk siswa ini.
            </p>
          ) : (
            studentLogs.map((log, i) => {
              const badgeClass =
                log.status === 'H'
                  ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                  : log.status === 'I'
                  ? 'bg-blue-100 text-blue-800 border-blue-300'
                  : log.status === 'S'
                  ? 'bg-amber-100 text-amber-800 border-amber-300'
                  : 'bg-rose-100 text-rose-800 border-rose-300';

              const statusText =
                log.status === 'H'
                  ? 'Hadir'
                  : log.status === 'I'
                  ? 'Izin'
                  : log.status === 'S'
                  ? 'Sakit'
                  : 'Alpha';

              return (
                <div
                  key={i}
                  className="p-3 bg-white border border-slate-200 rounded-xl hover:border-slate-300 flex items-start justify-between gap-3 text-xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-800">{log.subjectName}</span>
                      <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.2 rounded font-mono">
                        Jam {log.periodStart}-{log.periodEnd}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400">
                      Tanggal: {log.date} • Guru: {log.teacherName}
                    </p>
                    {log.topic && (
                      <p className="text-[11px] text-slate-600 italic">Materi: {log.topic}</p>
                    )}
                    {log.notes && (
                      <p className="text-[11px] text-amber-800 font-medium bg-amber-50 px-2 py-0.5 rounded border border-amber-200 inline-block">
                        Catatan: {log.notes}
                      </p>
                    )}
                  </div>

                  <span className={`px-2.5 py-1 rounded-lg text-xs font-bold border ${badgeClass} shrink-0`}>
                    {statusText}
                  </span>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-100 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
