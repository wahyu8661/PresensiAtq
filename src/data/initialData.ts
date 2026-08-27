import { User, Student, ClassRoom, Subject, PeriodSlot, AttendanceRecord } from '../types';

export const INITIAL_PERIODS: PeriodSlot[] = [
  { period: 1, timeStart: '07:15', timeEnd: '07:55', label: 'Jam ke-1 (Tadarus & Pagi)' },
  { period: 2, timeStart: '07:55', timeEnd: '08:35', label: 'Jam ke-2' },
  { period: 3, timeStart: '08:35', timeEnd: '09:15', label: 'Jam ke-3' },
  { period: 4, timeStart: '09:45', timeEnd: '10:25', label: 'Jam ke-4 (Ba\'da Dhuha)' },
  { period: 5, timeStart: '10:25', timeEnd: '11:05', label: 'Jam ke-5' },
  { period: 6, timeStart: '11:05', timeEnd: '11:45', label: 'Jam ke-6' },
  { period: 7, timeStart: '12:45', timeEnd: '13:25', label: 'Jam ke-7 (Ba\'da Dzuhur)' },
  { period: 8, timeStart: '13:25', timeEnd: '14:05', label: 'Jam ke-8' },
  { period: 9, timeStart: '14:05', timeEnd: '14:45', label: 'Jam ke-9 (Penutup)' },
];

export const INITIAL_SUBJECTS: Subject[] = [
  { id: 'tahfidz', code: 'THF', name: 'Tahfidz & Tahsin Al-Qur\'an', category: 'Agama' },
  { id: 'pai', code: 'PAI', name: 'Pendidikan Agama Islam (PAI & Fiqih)', category: 'Agama' },
  { id: 'bahasa_arab', code: 'ARB', name: 'Bahasa Arab', category: 'Agama' },
  { id: 'matematika', code: 'MTK', name: 'Matematika', category: 'Umum' },
  { id: 'ipa', code: 'IPA', name: 'Ilmu Pengetahuan Alam (IPA)', category: 'Umum' },
  { id: 'ips', code: 'IPS', name: 'Ilmu Pengetahuan Sosial (IPS)', category: 'Umum' },
  { id: 'bahasa_indonesia', code: 'BIN', name: 'Bahasa Indonesia', category: 'Umum' },
  { id: 'bahasa_inggris', code: 'BIG', name: 'Bahasa Inggris', category: 'Umum' },
  { id: 'informatika', code: 'INF', name: 'Informatika & Komputer', category: 'Umum' },
  { id: 'pjok', code: 'PJK', name: 'Pendidikan Jasmani & Kesehatan (PJOK)', category: 'Umum' },
  { id: 'seni_budaya', code: 'SNB', name: 'Seni Budaya & Kaligrafi Islam', category: 'Muatan Lokal' },
];

export const INITIAL_CLASSES: ClassRoom[] = [
  { id: '7A', name: 'VII-A (Abu Bakar Ash-Shiddiq)', grade: 7, waliKelasId: 'usr-wali-7a', waliKelasName: 'Ustadzah Siti Rahmawati, S.Pd', totalStudents: 15 },
  { id: '7B', name: 'VII-B (Umar bin Khattab)', grade: 7, waliKelasId: 'usr-wali-7b', waliKelasName: 'Ustadz Ahmad Nurkholis, S.Ag', totalStudents: 15 },
  { id: '8A', name: 'VIII-A (Utsman bin Affan)', grade: 8, waliKelasId: 'usr-wali-8a', waliKelasName: 'Ustadzah Nurul Hidayah, M.Pd', totalStudents: 15 },
  { id: '8B', name: 'VIII-B (Ali bin Abi Thalib)', grade: 8, waliKelasId: 'usr-wali-8b', waliKelasName: 'Ustadz Danang Prasetyo, S.Si', totalStudents: 15 },
  { id: '9A', name: 'IX-A (Thariq bin Ziyad)', grade: 9, waliKelasId: 'usr-wali-9a', waliKelasName: 'Ustadzah Fatimah Zahra, S.Pd', totalStudents: 15 },
  { id: '9B', name: 'IX-B (Salahuddin Al-Ayyubi)', grade: 9, waliKelasId: 'usr-wali-9b', waliKelasName: 'Ustadz M. Wildan Pratama, M.Pd.I', totalStudents: 15 },
];

export const INITIAL_USERS: User[] = [
  {
    id: 'usr-admin-1',
    username: 'admin',
    password: '123',
    name: 'Ustadz H. Ahmad Fauzi, S.Pd.I',
    role: 'admin',
    nip: '198205142008011005',
    email: 'admin.attaufiq@sekolah.id',
    phone: '081234567890',
  },
  {
    id: 'usr-wali-7a',
    username: 'walikelas7a',
    password: '123',
    name: 'Ustadzah Siti Rahmawati, S.Pd',
    role: 'wali_kelas',
    nip: '198903122014022003',
    email: 'siti.rahma@attaufiq.sch.id',
    phone: '081398765432',
    assignedClassId: '7A',
    assignedSubjectIds: ['bahasa_indonesia'],
  },
  {
    id: 'usr-guru-mtk',
    username: 'gurumapel',
    password: '123',
    name: 'Ustadz Muhammad Ridwan, M.Pd',
    role: 'guru_mapel',
    nip: '199107222019031008',
    email: 'ridwan.math@attaufiq.sch.id',
    phone: '082155667788',
    assignedSubjectIds: ['matematika', 'ipa'],
    assignedClassIds: ['7A', '7B', '8A', '8B', '9A'],
  },
  {
    id: 'usr-guru-tahfidz',
    username: 'gurutahfidz',
    password: '123',
    name: 'Ustadz Abdullah Hafizh, Lc',
    role: 'guru_mapel',
    nip: '199312012020011002',
    email: 'hafizh.lc@attaufiq.sch.id',
    phone: '085712349988',
    assignedSubjectIds: ['tahfidz', 'bahasa_arab', 'pai'],
    assignedClassIds: ['7A', '7B', '8A', '8B', '9A', '9B'],
  },
  {
    id: 'usr-wali-7b',
    username: 'walikelas7b',
    password: '123',
    name: 'Ustadz Ahmad Nurkholis, S.Ag',
    role: 'wali_kelas',
    nip: '198704152011011004',
    email: 'nurkholis@attaufiq.sch.id',
    phone: '081299887766',
    assignedClassId: '7B',
    assignedSubjectIds: ['pai'],
  },
];

export const INITIAL_STUDENTS: Student[] = [
  // Kelas 7A (15 Siswa)
  { id: 'std-7a-01', nisn: '0091234001', nis: '247001', name: 'Abdullah Azzam Al-Fatih', gender: 'L', classId: '7A', parentName: 'Bpk. Hendra Gunawan', parentPhone: '081211223344', status: 'Aktif' },
  { id: 'std-7a-02', nisn: '0091234002', nis: '247002', name: 'Aisyah Humaira Putri', gender: 'P', classId: '7A', parentName: 'Bpk. Agus Santoso', parentPhone: '081222334455', status: 'Aktif' },
  { id: 'std-7a-03', nisn: '0091234003', nis: '247003', name: 'Alif Pratama Ramadhan', gender: 'L', classId: '7A', parentName: 'Bpk. Tri Wahyudi', parentPhone: '081233445566', status: 'Aktif' },
  { id: 'std-7a-04', nisn: '0091234004', nis: '247004', name: 'Bilqis Salsabila Zahra', gender: 'P', classId: '7A', parentName: 'Bpk. Mulyadi', parentPhone: '081244556677', status: 'Aktif' },
  { id: 'std-7a-05', nisn: '0091234005', nis: '247005', name: 'Daffa Ibnu Khaldun', gender: 'L', classId: '7A', parentName: 'Bpk. Rudi Hartono', parentPhone: '081255667788', status: 'Aktif' },
  { id: 'std-7a-06', nisn: '0091234006', nis: '247006', name: 'Fathimah Nur Azizah', gender: 'P', classId: '7A', parentName: 'Bpk. Suherman', parentPhone: '081266778899', status: 'Aktif' },
  { id: 'std-7a-07', nisn: '0091234007', nis: '247007', name: 'Habibi Rahman Syakir', gender: 'L', classId: '7A', parentName: 'Bpk. Iwan Setiawan', parentPhone: '081277889900', status: 'Aktif' },
  { id: 'std-7a-08', nisn: '0091234008', nis: '247008', name: 'Khadijah Maryam Najwa', gender: 'P', classId: '7A', parentName: 'Bpk. Bambang Sutrisno', parentPhone: '081288990011', status: 'Aktif' },
  { id: 'std-7a-09', nisn: '0091234009', nis: '247009', name: 'Muhammad Rayhan Faris', gender: 'L', classId: '7A', parentName: 'Bpk. Joko Susilo', parentPhone: '081299001122', status: 'Aktif' },
  { id: 'std-7a-10', nisn: '0091234010', nis: '247010', name: 'Nabila Syakira Anwar', gender: 'P', classId: '7A', parentName: 'Bpk. Anwar Ibrahim', parentPhone: '081311223344', status: 'Aktif' },
  { id: 'std-7a-11', nisn: '0091234011', nis: '247011', name: 'Rifqi Hamizan Danendra', gender: 'L', classId: '7A', parentName: 'Bpk. Eko Prasetyo', parentPhone: '081322334455', status: 'Aktif' },
  { id: 'std-7a-12', nisn: '0091234012', nis: '247012', name: 'Salma Safina Salsabila', gender: 'P', classId: '7A', parentName: 'Bpk. Didik Haryanto', parentPhone: '081333445566', status: 'Aktif' },
  { id: 'std-7a-13', nisn: '0091234013', nis: '247013', name: 'Tariq Ziyad Al-Farabi', gender: 'L', classId: '7A', parentName: 'Bpk. Farhan Malik', parentPhone: '081344556677', status: 'Aktif' },
  { id: 'std-7a-14', nisn: '0091234014', nis: '247014', name: 'Yasmin Zahira Husna', gender: 'P', classId: '7A', parentName: 'Bpk. Arif Wibowo', parentPhone: '081355667788', status: 'Aktif' },
  { id: 'std-7a-15', nisn: '0091234015', nis: '247015', name: 'Zaidan Kamil Firdaus', gender: 'L', classId: '7A', parentName: 'Bpk. Firdaus Mansur', parentPhone: '081366778899', status: 'Aktif' },

  // Kelas 7B (10 Siswa)
  { id: 'std-7b-01', nisn: '0091234016', nis: '247016', name: 'Adli Fikri Muttaqin', gender: 'L', classId: '7B', parentName: 'Bpk. Taufik Hidayat', parentPhone: '081377889900', status: 'Aktif' },
  { id: 'std-7b-02', nisn: '0091234017', nis: '247017', name: 'Anindya Kirana Putri', gender: 'P', classId: '7B', parentName: 'Bpk. Bagus Cahyono', parentPhone: '081388990011', status: 'Aktif' },
  { id: 'std-7b-03', nisn: '0091234018', nis: '247018', name: 'Fadhil Arkananta Putra', gender: 'L', classId: '7B', parentName: 'Bpk. Yudi Kurniawan', parentPhone: '081399001122', status: 'Aktif' },
  { id: 'std-7b-04', nisn: '0091234019', nis: '247019', name: 'Ghaida Naura Sani', gender: 'P', classId: '7B', parentName: 'Bpk. Sandi Nugraha', parentPhone: '081411223344', status: 'Aktif' },
  { id: 'std-7b-05', nisn: '0091234020', nis: '247020', name: 'Ilham Bintang Wicaksono', gender: 'L', classId: '7B', parentName: 'Bpk. Gatot Subroto', parentPhone: '081422334455', status: 'Aktif' },
  { id: 'std-7b-06', nisn: '0091234021', nis: '247021', name: 'Kayla Az-Zahra', gender: 'P', classId: '7B', parentName: 'Bpk. Dedi Darmawan', parentPhone: '081433445566', status: 'Aktif' },
  { id: 'std-7b-07', nisn: '0091234022', nis: '247022', name: 'Malik Akbar Maulana', gender: 'L', classId: '7B', parentName: 'Bpk. Akbar Maulana', parentPhone: '081444556677', status: 'Aktif' },
  { id: 'std-7b-08', nisn: '0091234023', nis: '247023', name: 'Naura Hasna Sholiha', gender: 'P', classId: '7B', parentName: 'Bpk. Sholihin', parentPhone: '081455667788', status: 'Aktif' },
  { id: 'std-7b-09', nisn: '0091234024', nis: '247024', name: 'Rafa Daniyal Ghazi', gender: 'L', classId: '7B', parentName: 'Bpk. Dani Hamdan', parentPhone: '081466778899', status: 'Aktif' },
  { id: 'std-7b-10', nisn: '0091234025', nis: '247025', name: 'Zahra Talita Latifah', gender: 'P', classId: '7B', parentName: 'Bpk. Latif Syamsuddin', parentPhone: '081477889900', status: 'Aktif' },

  // Kelas 8A (8 Siswa)
  { id: 'std-8a-01', nisn: '0081234001', nis: '238001', name: 'Ahmad Faiz Rabbani', gender: 'L', classId: '8A', parentName: 'Bpk. Ridho Ilahi', parentPhone: '081511223344', status: 'Aktif' },
  { id: 'std-8a-02', nisn: '0081234002', nis: '238002', name: 'Azizah Nur Kholidah', gender: 'P', classId: '8A', parentName: 'Bpk. Kholid Mawardi', parentPhone: '081522334455', status: 'Aktif' },
  { id: 'std-8a-03', nisn: '0081234003', nis: '238003', name: 'Bagas Surya Ramadhan', gender: 'L', classId: '8A', parentName: 'Bpk. Surya Kencana', parentPhone: '081533445566', status: 'Aktif' },
  { id: 'std-8a-04', nisn: '0081234004', nis: '238004', name: 'Cut Meutia Syakira', gender: 'P', classId: '8A', parentName: 'Bpk. Teuku Iskandar', parentPhone: '081544556677', status: 'Aktif' },
  { id: 'std-8a-05', nisn: '0081234005', nis: '238005', name: 'Farhan Maulana Hakim', gender: 'L', classId: '8A', parentName: 'Bpk. Lukman Hakim', parentPhone: '081555667788', status: 'Aktif' },
  { id: 'std-8a-06', nisn: '0081234006', nis: '238006', name: 'Hanifah Qonita Putri', gender: 'P', classId: '8A', parentName: 'Bpk. Qosim Sanusi', parentPhone: '081566778899', status: 'Aktif' },
  { id: 'std-8a-07', nisn: '0081234007', nis: '238007', name: 'Khalid Ibnu Walid', gender: 'L', classId: '8A', parentName: 'Bpk. Walid Thohir', parentPhone: '081577889900', status: 'Aktif' },
  { id: 'std-8a-08', nisn: '0081234008', nis: '238008', name: 'Zulfa Amalia Husna', gender: 'P', classId: '8A', parentName: 'Bpk. Husni Thamrin', parentPhone: '081588990011', status: 'Aktif' },

  // Kelas 9A (6 Siswa)
  { id: 'std-9a-01', nisn: '0071234001', nis: '229001', name: 'Arya Bimasakti Pratama', gender: 'L', classId: '9A', parentName: 'Bpk. Bima Satria', parentPhone: '081611223344', status: 'Aktif' },
  { id: 'std-9a-02', nisn: '0071234002', nis: '229002', name: 'Dhiya Ulhaq Safitri', gender: 'P', classId: '9A', parentName: 'Bpk. Safirudin', parentPhone: '081622334455', status: 'Aktif' },
  { id: 'std-9a-03', nisn: '0071234003', nis: '229003', name: 'Fathi Syauqi Rahman', gender: 'L', classId: '9A', parentName: 'Bpk. Syauqi Kamil', parentPhone: '081633445566', status: 'Aktif' },
  { id: 'std-9a-04', nisn: '0071234004', nis: '229004', name: 'Nadhira Alya Mukhbita', gender: 'P', classId: '9A', parentName: 'Bpk. Mukhbit Ali', parentPhone: '081644556677', status: 'Aktif' },
  { id: 'std-9a-05', nisn: '0071234005', nis: '229005', name: 'Rasyid Ridha Ash-Shiddiq', gender: 'L', classId: '9A', parentName: 'Bpk. Ridwan Ashar', parentPhone: '081655667788', status: 'Aktif' },
  { id: 'std-9a-06', nisn: '0071234006', nis: '229006', name: 'Syifa Nur Salsabila', gender: 'P', classId: '9A', parentName: 'Bpk. Syafi\'i Maarif', parentPhone: '081666778899', status: 'Aktif' },
];

export const getTodayDateString = (): string => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const getPastDateString = (daysAgo: number): string => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// Generate realistic initial attendance sample data
export const generateInitialAttendanceRecords = (): AttendanceRecord[] => {
  const today = getTodayDateString();
  const yesterday = getPastDateString(1);
  const twoDaysAgo = getPastDateString(2);

  const students7A = INITIAL_STUDENTS.filter((s) => s.classId === '7A');

  const record1: AttendanceRecord = {
    id: `att-${today}-7A-jam1-2-tahfidz`,
    date: today,
    classId: '7A',
    className: 'VII-A (Abu Bakar Ash-Shiddiq)',
    subjectId: 'tahfidz',
    subjectName: 'Tahfidz & Tahsin Al-Qur\'an',
    periodStart: 1,
    periodEnd: 2,
    teacherId: 'usr-guru-tahfidz',
    teacherName: 'Ustadz Abdullah Hafizh, Lc',
    teacherRole: 'guru_mapel',
    topic: 'Setoran Surah Al-Mulk ayat 1-15 & Kaidah Ghunnah',
    notes: 'Alhamdulillah mayoritas ananda lancar murajaah.',
    createdAt: new Date().toISOString(),
    items: students7A.map((s, idx) => {
      if (idx === 3) {
        return { studentId: s.id, studentName: s.name, nisn: s.nisn, gender: s.gender, status: 'S', notes: 'Demam panas, ada surat dokter dari ortu' };
      }
      if (idx === 7) {
        return { studentId: s.id, studentName: s.name, nisn: s.nisn, gender: s.gender, status: 'I', notes: 'Izin menghadiri pernikahan kakak di luar kota' };
      }
      return { studentId: s.id, studentName: s.name, nisn: s.nisn, gender: s.gender, status: 'H' };
    }),
  };

  const record2: AttendanceRecord = {
    id: `att-${today}-7A-jam3-4-matematika`,
    date: today,
    classId: '7A',
    className: 'VII-A (Abu Bakar Ash-Shiddiq)',
    subjectId: 'matematika',
    subjectName: 'Matematika',
    periodStart: 3,
    periodEnd: 4,
    teacherId: 'usr-guru-mtk',
    teacherName: 'Ustadz Muhammad Ridwan, M.Pd',
    teacherRole: 'guru_mapel',
    topic: 'Operasi Hitung Aljabar & Pemfaktoran Suku Dua',
    notes: 'Kuis interaktif latihan pemfaktoran',
    createdAt: new Date().toISOString(),
    items: students7A.map((s, idx) => {
      if (idx === 3) return { studentId: s.id, studentName: s.name, nisn: s.nisn, gender: s.gender, status: 'S', notes: 'Sakit (surat dokter)' };
      if (idx === 7) return { studentId: s.id, studentName: s.name, nisn: s.nisn, gender: s.gender, status: 'I', notes: 'Izin keluarga' };
      if (idx === 10) return { studentId: s.id, studentName: s.name, nisn: s.nisn, gender: s.gender, status: 'A', notes: 'Belum masuk ke kelas tanpa kabar' };
      return { studentId: s.id, studentName: s.name, nisn: s.nisn, gender: s.gender, status: 'H' };
    }),
  };

  const record3: AttendanceRecord = {
    id: `att-${yesterday}-7A-jam1-2-wali`,
    date: yesterday,
    classId: '7A',
    className: 'VII-A (Abu Bakar Ash-Shiddiq)',
    subjectId: 'bahasa_indonesia',
    subjectName: 'Bahasa Indonesia',
    periodStart: 1,
    periodEnd: 2,
    teacherId: 'usr-wali-7a',
    teacherName: 'Ustadzah Siti Rahmawati, S.Pd',
    teacherRole: 'wali_kelas',
    topic: 'Menulis Teks Deskripsi Objek Lingkungan Islami',
    notes: 'Presensi harian wali kelas + materi mapel',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    items: students7A.map((s, idx) => {
      if (idx === 1) return { studentId: s.id, studentName: s.name, nisn: s.nisn, gender: s.gender, status: 'I', notes: 'Dispensasi Lomba Tahfidz Tingkat Kota' };
      return { studentId: s.id, studentName: s.name, nisn: s.nisn, gender: s.gender, status: 'H' };
    }),
  };

  const record4: AttendanceRecord = {
    id: `att-${twoDaysAgo}-7A-jam5-6-ipa`,
    date: twoDaysAgo,
    classId: '7A',
    className: 'VII-A (Abu Bakar Ash-Shiddiq)',
    subjectId: 'ipa',
    subjectName: 'Ilmu Pengetahuan Alam (IPA)',
    periodStart: 5,
    periodEnd: 6,
    teacherId: 'usr-guru-mtk',
    teacherName: 'Ustadz Muhammad Ridwan, M.Pd',
    teacherRole: 'guru_mapel',
    topic: 'Praktikum Pengamatan Sel Daun Rhoeo discolor',
    notes: 'Di laboratorium IPA lantai 2',
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    items: students7A.map((s) => ({ studentId: s.id, studentName: s.name, nisn: s.nisn, gender: s.gender, status: 'H' })),
  };

  return [record1, record2, record3, record4];
};
