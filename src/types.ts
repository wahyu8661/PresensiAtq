export type UserRole = 'admin' | 'wali_kelas' | 'guru_mapel';

export type AttendanceStatus = 'H' | 'I' | 'S' | 'A'; // Hadir, Izin, Sakit, Alpha

export interface User {
  id: string;
  username: string;
  password?: string;
  name: string;
  role: UserRole;
  nip?: string;
  email?: string;
  phone?: string;
  avatar?: string;
  // Specific for Wali Kelas:
  assignedClassId?: string; // e.g. "7A"
  // Specific for Guru Mapel:
  assignedSubjectIds?: string[]; // e.g. ["matematika", "ipa"]
  assignedClassIds?: string[]; // e.g. ["7A", "7B", "8A"]
}

export interface Student {
  id: string;
  nisn: string;
  nis: string;
  name: string;
  gender: 'L' | 'P'; // Laki-laki / Perempuan
  classId: string; // e.g. "7A"
  parentPhone?: string;
  parentName?: string;
  address?: string;
  status: 'Aktif' | 'Mutasi' | 'Lulus';
}

export interface ClassRoom {
  id: string; // e.g. "7A"
  name: string; // e.g. "VII-A (Abu Bakar Ash-Shiddiq)"
  grade: number; // 7, 8, 9
  waliKelasId: string; // User id
  waliKelasName: string;
  totalStudents?: number;
}

export interface Subject {
  id: string; // e.g. "matematika"
  code: string; // e.g. "MTK"
  name: string; // e.g. "Matematika"
  category: 'Agama' | 'Umum' | 'Muatan Lokal';
}

export interface PeriodSlot {
  period: number; // 1 to 9
  timeStart: string; // "07:15"
  timeEnd: string; // "07:55"
  label: string; // "Jam ke-1"
  isBreak?: boolean;
}

export interface AttendanceItem {
  studentId: string;
  studentName: string;
  nisn: string;
  gender: 'L' | 'P';
  status: AttendanceStatus;
  notes?: string;
}

export interface AttendanceRecord {
  id: string;
  date: string; // "YYYY-MM-DD"
  classId: string;
  className?: string;
  subjectId: string; // or 'wali_kelas_daily'
  subjectName: string;
  periodStart: number; // 1 - 9
  periodEnd: number; // 1 - 9
  teacherId: string;
  teacherName: string;
  teacherRole: UserRole;
  topic?: string; // Materi / Pembahasan saat jam mapel
  notes?: string; // Catatan umum kelas
  createdAt: string; // ISO string
  items: AttendanceItem[];
}

export interface AttendanceFilter {
  startDate: string;
  endDate: string;
  classId?: string;
  subjectId?: string;
  teacherId?: string;
  status?: AttendanceStatus | 'ALL';
}

export interface DailyClassSummary {
  classId: string;
  className: string;
  totalStudents: number;
  present: number;
  permit: number;
  sick: number;
  alpha: number;
  attendanceRate: number;
  periodsFilled: number[]; // e.g. [1, 2, 3, 4]
}
