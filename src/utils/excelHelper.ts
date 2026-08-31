import * as XLSX from 'xlsx';
import { Student, User, ClassRoom, Subject, AttendanceRecord, AttendanceStatus } from '../types';

export const formatDateIndo = (dateStr: string): string => {
  if (!dateStr) return '-';
  const parts = dateStr.split('-');
  if (parts.length !== 3) return dateStr;
  const months = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];
  const day = parseInt(parts[2], 10);
  const monthIdx = parseInt(parts[1], 10) - 1;
  const year = parts[0];
  return `${day} ${months[monthIdx] || parts[1]} ${year}`;
};

// 1. Export Students to Excel (.xlsx)
export const exportStudentsToExcel = (students: Student[], classes: ClassRoom[], classFilterName?: string) => {
  const classMap = new Map(classes.map((c) => [c.id, c.name]));

  const rows = students.map((s, index) => ({
    'No': index + 1,
    'NISN': s.nisn,
    'NIS': s.nis || '-',
    'Nama Siswa': s.name,
    'L/P': s.gender,
    'Kelas': classMap.get(s.classId) || s.classId,
    'Nama Orang Tua / Wali': s.parentName || '-',
    'No. HP Orang Tua': s.parentPhone || '-',
    'Status': s.status,
  }));

  const worksheet = XLSX.utils.json_to_sheet(rows);

  // Set column widths
  worksheet['!cols'] = [
    { wch: 6 },  // No
    { wch: 14 }, // NISN
    { wch: 10 }, // NIS
    { wch: 30 }, // Nama
    { wch: 6 },  // L/P
    { wch: 25 }, // Kelas
    { wch: 25 }, // Ortu
    { wch: 16 }, // HP
    { wch: 10 }, // Status
  ];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Data Siswa');

  const filename = `Data_Siswa_Attaufiq_${classFilterName ? classFilterName.replace(/[^a-zA-Z0-9]/g, '_') + '_' : ''}${new Date().toISOString().slice(0, 10)}.xlsx`;
  XLSX.writeFile(workbook, filename);
};

// 2. Export Users (Teachers, Homeroom, Admin) to Excel
export const exportUsersToExcel = (users: User[], classes: ClassRoom[], subjects: Subject[]) => {
  const classMap = new Map(classes.map((c) => [c.id, c.name]));
  const subjectMap = new Map(subjects.map((s) => [s.id, s.name]));

  const rows = users.map((u, index) => {
    const roleLabel =
      u.role === 'admin'
        ? 'Admin Utama'
        : u.role === 'wali_kelas'
        ? 'Wali Kelas'
        : 'Guru Mapel';

    const assignedClassStr = u.assignedClassId
      ? classMap.get(u.assignedClassId) || u.assignedClassId
      : '-';

    const assignedSubjectStr =
      u.assignedSubjectIds && u.assignedSubjectIds.length > 0
        ? u.assignedSubjectIds.map((id) => subjectMap.get(id) || id).join(', ')
        : '-';

    return {
      'No': index + 1,
      'NIP': u.nip || '-',
      'Nama Lengkap': u.name,
      'Username': u.username,
      'Peran': roleLabel,
      'Email': u.email || '-',
      'No. Telepon / WA': u.phone || '-',
      'Wali Kelas di': assignedClassStr,
      'Mata Pelajaran yang Diampu': assignedSubjectStr,
    };
  });

  const worksheet = XLSX.utils.json_to_sheet(rows);
  worksheet['!cols'] = [
    { wch: 6 },  // No
    { wch: 20 }, // NIP
    { wch: 32 }, // Nama
    { wch: 16 }, // Username
    { wch: 16 }, // Peran
    { wch: 28 }, // Email
    { wch: 18 }, // Telepon
    { wch: 25 }, // Wali Kelas
    { wch: 35 }, // Mapel
  ];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Data Pengguna & Guru');

  const filename = `Data_Pengguna_Guru_Attaufiq_${new Date().toISOString().slice(0, 10)}.xlsx`;
  XLSX.writeFile(workbook, filename);
};

// 3. Export Comprehensive Attendance Summary (Rekap Hasil Presensi)
export const exportAttendanceReportToExcel = (
  records: AttendanceRecord[],
  students: Student[],
  classes: ClassRoom[],
  subjects: Subject[],
  title: string = 'Rekapitulasi Presensi Siswa',
  filterInfo?: { startDate?: string; endDate?: string; classId?: string; subjectId?: string }
) => {
  const classMap = new Map(classes.map((c) => [c.id, c.name]));
  const subjectMap = new Map(subjects.map((s) => [s.id, s.name]));

  // Filter students if class selected
  const targetStudents = filterInfo?.classId
    ? students.filter((s) => s.classId === filterInfo.classId)
    : students;

  // Aggregate stats per student from the records
  const studentStats = new Map<
    string,
    { present: number; sick: number; permit: number; alpha: number; bolos: number; late: number; total: number; notes: string[] }
  >();

  targetStudents.forEach((s) => {
    studentStats.set(s.id, { present: 0, sick: 0, permit: 0, alpha: 0, bolos: 0, late: 0, total: 0, notes: [] });
  });

  records.forEach((rec) => {
    rec.items.forEach((item) => {
      let stat = studentStats.get(item.studentId);
      if (!stat) {
        stat = { present: 0, sick: 0, permit: 0, alpha: 0, bolos: 0, late: 0, total: 0, notes: [] };
        studentStats.set(item.studentId, stat);
      }
      stat.total += 1;
      if (item.status === 'H') stat.present += 1;
      else if (item.status === 'S') stat.sick += 1;
      else if (item.status === 'I') stat.permit += 1;
      else if (item.status === 'A') stat.alpha += 1;
      else if (item.status === 'B') stat.bolos += 1;
      else if (item.status === 'T') stat.late += 1;

      if (item.notes && item.notes.trim()) {
        stat.notes.push(`[${rec.date} Jam ${rec.periodStart}-${rec.periodEnd} ${rec.subjectName}]: ${item.notes}`);
      }
    });
  });

  // Sheet 1: Rekap Per Siswa
  const studentRows = targetStudents.map((s, index) => {
    const stat = studentStats.get(s.id) || { present: 0, sick: 0, permit: 0, alpha: 0, bolos: 0, late: 0, total: 0, notes: [] };
    const rate = stat.total > 0 ? Math.round((stat.present / stat.total) * 100) : 100;

    return {
      'No': index + 1,
      'NISN': s.nisn,
      'NIS': s.nis || '-',
      'Nama Siswa': s.name,
      'L/P': s.gender,
      'Kelas': classMap.get(s.classId) || s.classId,
      'Total Sesi Mapel': stat.total,
      'Hadir (H)': stat.present,
      'Izin (I)': stat.permit,
      'Sakit (S)': stat.sick,
      'Alpha (A)': stat.alpha,
      'Bolos (B)': stat.bolos,
      'Terlambat (T)': stat.late,
      'Persentase Kehadiran': `${rate}%`,
      'Catatan Khusus': stat.notes.slice(-3).join(' | ') || '-',
    };
  });

  // Sheet 2: Jurnal Riwayat Presensi per Sesi / Jam Pelajaran
  const journalRows = records.map((r, idx) => {
    const hCount = r.items.filter((i) => i.status === 'H').length;
    const iCount = r.items.filter((i) => i.status === 'I').length;
    const sCount = r.items.filter((i) => i.status === 'S').length;
    const aCount = r.items.filter((i) => i.status === 'A').length;
    const bCount = r.items.filter((i) => i.status === 'B').length;
    const tCount = r.items.filter((i) => i.status === 'T').length;
    const absentees = r.items
      .filter((i) => i.status !== 'H')
      .map((i) => {
        const label =
          i.status === 'I'
            ? 'Izin'
            : i.status === 'S'
            ? 'Sakit'
            : i.status === 'A'
            ? 'Alpha'
            : i.status === 'B'
            ? 'Bolos'
            : 'Terlambat';
        return `${i.studentName} (${label}${i.notes ? ': ' + i.notes : ''})`;
      })
      .join('; ');

    return {
      'No': idx + 1,
      'Tanggal': r.date,
      'Kelas': r.className || classMap.get(r.classId) || r.classId,
      'Jam Ke': r.periodStart === r.periodEnd ? `Jam ke-${r.periodStart}` : `Jam ke-${r.periodStart} s/d ${r.periodEnd}`,
      'Mata Pelajaran': r.subjectName || subjectMap.get(r.subjectId) || r.subjectId,
      'Guru Pengampu': r.teacherName,
      'Topik / Materi': r.topic || '-',
      'Total Siswa': r.items.length,
      'Hadir': hCount,
      'Izin': iCount,
      'Sakit': sCount,
      'Alpha': aCount,
      'Bolos': bCount,
      'Terlambat': tCount,
      'Daftar Siswa Tidak Hadir / Catatan': absentees || 'Nihil (Hadir Semua)',
      'Catatan Guru': r.notes || '-',
    };
  });

  const workbook = XLSX.utils.book_new();

  const wsSummary = XLSX.utils.json_to_sheet(studentRows);
  wsSummary['!cols'] = [
    { wch: 6 },
    { wch: 14 },
    { wch: 10 },
    { wch: 30 },
    { wch: 6 },
    { wch: 24 },
    { wch: 16 },
    { wch: 10 },
    { wch: 10 },
    { wch: 10 },
    { wch: 10 },
    { wch: 10 },
    { wch: 12 },
    { wch: 20 },
    { wch: 45 },
  ];
  XLSX.utils.book_append_sheet(workbook, wsSummary, 'Rekap Kehadiran Siswa');

  const wsJournal = XLSX.utils.json_to_sheet(journalRows);
  wsJournal['!cols'] = [
    { wch: 6 },
    { wch: 12 },
    { wch: 24 },
    { wch: 16 },
    { wch: 28 },
    { wch: 28 },
    { wch: 32 },
    { wch: 12 },
    { wch: 8 },
    { wch: 8 },
    { wch: 8 },
    { wch: 8 },
    { wch: 8 },
    { wch: 10 },
    { wch: 45 },
    { wch: 30 },
  ];
  XLSX.utils.book_append_sheet(workbook, wsJournal, 'Jurnal Presensi Jam Pelajaran');

  const cleanTitle = title.replace(/[^a-zA-Z0-9]/g, '_');
  const filename = `${cleanTitle}_${new Date().toISOString().slice(0, 10)}.xlsx`;
  XLSX.writeFile(workbook, filename);
};

// 4. Download Excel Import Templates
export const downloadTemplate = (type: 'students' | 'users' | 'attendance') => {
  const workbook = XLSX.utils.book_new();

  if (type === 'students') {
    const sampleData = [
      {
        'NISN': '007000001',
        'NIS': '247I001',
        'Nama Lengkap': 'Ahmad Zaki Mubarak',
        'Jenis Kelamin (L/P)': 'L',
        'Kode Kelas': '7-ikhwan',
        'Nama Orang Tua / Wali': 'Bpk. Ridwan Mubarak',
        'No HP Ortu': '081234567890',
        'Status': 'Aktif',
      },
      {
        'NISN': '007000002',
        'NIS': '247A001',
        'Nama Lengkap': 'Fatimah Az-Zahra',
        'Jenis Kelamin (L/P)': 'P',
        'Kode Kelas': '7-akhwat',
        'Nama Orang Tua / Wali': 'Bpk. Sulaiman',
        'No HP Ortu': '081398765432',
        'Status': 'Aktif',
      },
    ];
    const ws = XLSX.utils.json_to_sheet(sampleData);
    ws['!cols'] = [{ wch: 15 }, { wch: 10 }, { wch: 30 }, { wch: 20 }, { wch: 12 }, { wch: 25 }, { wch: 15 }, { wch: 10 }];
    XLSX.utils.book_append_sheet(workbook, ws, 'Template Siswa');
    XLSX.writeFile(workbook, 'Template_Import_Siswa_Attaufiq.xlsx');
  } else if (type === 'users') {
    const sampleData = [
      {
        'NIP': '199201012022031001',
        'Nama Lengkap': 'Ustadz Fajar Shiddiq, S.Pd',
        'Username': 'fajar_guru',
        'Password': '123',
        'Peran (admin / wali_kelas / guru_mapel)': 'guru_mapel',
        'Email': 'fajar@attaufiq.sch.id',
        'No HP': '082199887766',
        'Kode Kelas Binaan (Untuk Wali Kelas)': '',
        'Kode Mapel Diampu (Pisahkan koma)': 'matematika, ipa',
        'Kode Kelas Diampu (Pisahkan koma)': '7-ikhwan, 7-akhwat, 8-akhwat-a',
      },
      {
        'NIP': '198805052015022002',
        'Nama Lengkap': 'Ustadzah Halimah Tusadiah, M.Pd',
        'Username': 'halimah_wali',
        'Password': '123',
        'Peran (admin / wali_kelas / guru_mapel)': 'wali_kelas',
        'Email': 'halimah@attaufiq.sch.id',
        'No HP': '081233445566',
        'Kode Kelas Binaan (Untuk Wali Kelas)': '8-akhwat-a',
        'Kode Mapel Diampu (Pisahkan koma)': 'bahasa_inggris',
        'Kode Kelas Diampu (Pisahkan koma)': '8-akhwat-a, 8-akhwat-b',
      },
    ];
    const ws = XLSX.utils.json_to_sheet(sampleData);
    ws['!cols'] = [{ wch: 20 }, { wch: 30 }, { wch: 16 }, { wch: 12 }, { wch: 35 }, { wch: 25 }, { wch: 16 }, { wch: 25 }, { wch: 30 }, { wch: 25 }];
    XLSX.utils.book_append_sheet(workbook, ws, 'Template Pengguna');
    XLSX.writeFile(workbook, 'Template_Import_Pengguna_Attaufiq.xlsx');
  }
};

// 5. Parse uploaded file into JSON rows
export const parseUploadedExcelFile = async (file: File): Promise<{ sheetName: string; rows: any[] }> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const rows = XLSX.utils.sheet_to_json(worksheet, { defval: '' });
        resolve({ sheetName: firstSheetName, rows });
      } catch (err) {
        reject(new Error('Gagal membaca file spreadsheet. Pastikan format file adalah .xlsx atau .csv yang valid.'));
      }
    };

    reader.onerror = () => {
      reject(new Error('Terjadi kesalahan saat membuka file.'));
    };

    reader.readAsArrayBuffer(file);
  });
};
