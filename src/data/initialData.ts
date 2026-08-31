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
  {
    "id": "9-khadijah",
    "name": "IX Khadijah binti Khuwailid",
    "grade": 9,
    "waliKelasId": "usr-wali-9khadijah",
    "waliKelasName": "Ustadzah Fatimah Zahra, S.Pd",
    "totalStudents": 24
  },
  {
    "id": "8-akhwat-a",
    "name": "VIII Akhwat A",
    "grade": 8,
    "waliKelasId": "usr-wali-8a",
    "waliKelasName": "Ustadzah Nurul Hidayah, M.Pd",
    "totalStudents": 21
  },
  {
    "id": "8-akhwat-b",
    "name": "VIII Akhwat B",
    "grade": 8,
    "waliKelasId": "usr-wali-8b",
    "waliKelasName": "Ustadzah Dewi Sartika, S.Pd",
    "totalStudents": 22
  },
  {
    "id": "7-ikhwan",
    "name": "VII Ikhwan",
    "grade": 7,
    "waliKelasId": "usr-wali-7ikhwan",
    "waliKelasName": "Ustadz Ahmad Nurkholis, S.Ag",
    "totalStudents": 31
  },
  {
    "id": "7-akhwat",
    "name": "VII Akhwat",
    "grade": 7,
    "waliKelasId": "usr-wali-7akhwat",
    "waliKelasName": "Ustadzah Siti Rahmawati, S.Pd",
    "totalStudents": 31
  },
  {
    "id": "12-ikhwan",
    "name": "XII Ikhwan",
    "grade": 12,
    "waliKelasId": "usr-wali-12ikhwan",
    "waliKelasName": "Ustadz Luqman Hakim, M.Si",
    "totalStudents": 14
  },
  {
    "id": "12-akhwat",
    "name": "XII Akhwat",
    "grade": 12,
    "waliKelasId": "usr-wali-12akhwat",
    "waliKelasName": "Ustadzah Khansa Salsabila, S.Si",
    "totalStudents": 15
  },
  {
    "id": "11-ikhwan",
    "name": "XI Ikhwan",
    "grade": 11,
    "waliKelasId": "usr-wali-11ikhwan",
    "waliKelasName": "Ustadz Wildan Pratama, M.Pd.I",
    "totalStudents": 18
  },
  {
    "id": "11-akhwat",
    "name": "XI Akhwat",
    "grade": 11,
    "waliKelasId": "usr-wali-11akhwat",
    "waliKelasName": "Ustadzah Maryam Khalida, Lc",
    "totalStudents": 15
  },
  {
    "id": "10-ikhwan",
    "name": "X Ikhwan",
    "grade": 10,
    "waliKelasId": "usr-wali-10ikhwan",
    "waliKelasName": "Ustadz Danang Prasetyo, S.Si",
    "totalStudents": 25
  },
  {
    "id": "10-akhwat",
    "name": "X Akhwat",
    "grade": 10,
    "waliKelasId": "usr-wali-10akhwat",
    "waliKelasName": "Ustadzah Aisyah Maharani, M.Pd",
    "totalStudents": 16
  }
];

export const INITIAL_USERS: User[] = [
  {
    "id": "usr-admin-1",
    "username": "admin",
    "password": "123",
    "name": "Ustadz H. Ahmad Fauzi, S.Pd.I",
    "role": "admin",
    "nip": "198205142008011005",
    "email": "admin.attaufiq@sekolah.id",
    "phone": "081234567890"
  },
  {
    "id": "usr-wali-9khadijah",
    "username": "walikelas9khadijah",
    "password": "123",
    "name": "Ustadzah Fatimah Zahra, S.Pd",
    "role": "wali_kelas",
    "nip": "198003122014022001",
    "email": "walikelas9khadijah@attaufiq.sch.id",
    "phone": "081398765410",
    "assignedClassId": "9-khadijah",
    "assignedSubjectIds": [
      "bahasa_indonesia"
    ]
  },
  {
    "id": "usr-wali-8a",
    "username": "walikelas8a",
    "password": "123",
    "name": "Ustadzah Nurul Hidayah, M.Pd",
    "role": "wali_kelas",
    "nip": "198103122014022002",
    "email": "walikelas8a@attaufiq.sch.id",
    "phone": "081398765411",
    "assignedClassId": "8-akhwat-a",
    "assignedSubjectIds": [
      "ipa"
    ]
  },
  {
    "id": "usr-wali-8b",
    "username": "walikelas8b",
    "password": "123",
    "name": "Ustadzah Dewi Sartika, S.Pd",
    "role": "wali_kelas",
    "nip": "198203122014022003",
    "email": "walikelas8b@attaufiq.sch.id",
    "phone": "081398765412",
    "assignedClassId": "8-akhwat-b",
    "assignedSubjectIds": [
      "matematika"
    ]
  },
  {
    "id": "usr-wali-7ikhwan",
    "username": "walikelas7ikhwan",
    "password": "123",
    "name": "Ustadz Ahmad Nurkholis, S.Ag",
    "role": "wali_kelas",
    "nip": "198303122014022004",
    "email": "walikelas7ikhwan@attaufiq.sch.id",
    "phone": "081398765413",
    "assignedClassId": "7-ikhwan",
    "assignedSubjectIds": [
      "pai"
    ]
  },
  {
    "id": "usr-wali-7akhwat",
    "username": "walikelas7akhwat",
    "password": "123",
    "name": "Ustadzah Siti Rahmawati, S.Pd",
    "role": "wali_kelas",
    "nip": "198403122014022005",
    "email": "walikelas7akhwat@attaufiq.sch.id",
    "phone": "081398765414",
    "assignedClassId": "7-akhwat",
    "assignedSubjectIds": [
      "bahasa_arab"
    ]
  },
  {
    "id": "usr-wali-12ikhwan",
    "username": "walikelas12ikhwan",
    "password": "123",
    "name": "Ustadz Luqman Hakim, M.Si",
    "role": "wali_kelas",
    "nip": "198503122014022006",
    "email": "walikelas12ikhwan@attaufiq.sch.id",
    "phone": "081398765415",
    "assignedClassId": "12-ikhwan",
    "assignedSubjectIds": [
      "informatika"
    ]
  },
  {
    "id": "usr-wali-12akhwat",
    "username": "walikelas12akhwat",
    "password": "123",
    "name": "Ustadzah Khansa Salsabila, S.Si",
    "role": "wali_kelas",
    "nip": "198603122014022007",
    "email": "walikelas12akhwat@attaufiq.sch.id",
    "phone": "081398765416",
    "assignedClassId": "12-akhwat",
    "assignedSubjectIds": [
      "ipa"
    ]
  },
  {
    "id": "usr-wali-11ikhwan",
    "username": "walikelas11ikhwan",
    "password": "123",
    "name": "Ustadz Wildan Pratama, M.Pd.I",
    "role": "wali_kelas",
    "nip": "198703122014022008",
    "email": "walikelas11ikhwan@attaufiq.sch.id",
    "phone": "081398765417",
    "assignedClassId": "11-ikhwan",
    "assignedSubjectIds": [
      "tahfidz"
    ]
  },
  {
    "id": "usr-wali-11akhwat",
    "username": "walikelas11akhwat",
    "password": "123",
    "name": "Ustadzah Maryam Khalida, Lc",
    "role": "wali_kelas",
    "nip": "198803122014022009",
    "email": "walikelas11akhwat@attaufiq.sch.id",
    "phone": "081398765418",
    "assignedClassId": "11-akhwat",
    "assignedSubjectIds": [
      "bahasa_inggris"
    ]
  },
  {
    "id": "usr-wali-10ikhwan",
    "username": "walikelas10ikhwan",
    "password": "123",
    "name": "Ustadz Danang Prasetyo, S.Si",
    "role": "wali_kelas",
    "nip": "1980031220140220010",
    "email": "walikelas10ikhwan@attaufiq.sch.id",
    "phone": "081398765419",
    "assignedClassId": "10-ikhwan",
    "assignedSubjectIds": [
      "ips"
    ]
  },
  {
    "id": "usr-wali-10akhwat",
    "username": "walikelas10akhwat",
    "password": "123",
    "name": "Ustadzah Aisyah Maharani, M.Pd",
    "role": "wali_kelas",
    "nip": "1981031220140220011",
    "email": "walikelas10akhwat@attaufiq.sch.id",
    "phone": "081398765420",
    "assignedClassId": "10-akhwat",
    "assignedSubjectIds": [
      "seni_budaya"
    ]
  },
  {
    "id": "usr-guru-mtk",
    "username": "gurumapel",
    "password": "123",
    "name": "Ustadz Muhammad Ridwan, M.Pd",
    "role": "guru_mapel",
    "nip": "199107222019031008",
    "email": "ridwan.math@attaufiq.sch.id",
    "phone": "082155667788",
    "assignedSubjectIds": [
      "matematika",
      "ipa"
    ],
    "assignedClassIds": [
      "9-khadijah",
      "8-akhwat-a",
      "8-akhwat-b",
      "7-ikhwan",
      "7-akhwat",
      "12-ikhwan",
      "12-akhwat",
      "11-ikhwan",
      "11-akhwat",
      "10-ikhwan",
      "10-akhwat"
    ]
  },
  {
    "id": "usr-guru-tahfidz",
    "username": "gurutahfidz",
    "password": "123",
    "name": "Ustadz Abdullah Hafizh, Lc",
    "role": "guru_mapel",
    "nip": "199312012020011002",
    "email": "hafizh.lc@attaufiq.sch.id",
    "phone": "085712349988",
    "assignedSubjectIds": [
      "tahfidz",
      "bahasa_arab",
      "pai"
    ],
    "assignedClassIds": [
      "9-khadijah",
      "8-akhwat-a",
      "8-akhwat-b",
      "7-ikhwan",
      "7-akhwat",
      "12-ikhwan",
      "12-akhwat",
      "11-ikhwan",
      "11-akhwat",
      "10-ikhwan",
      "10-akhwat"
    ]
  }
];

export const INITIAL_STUDENTS: Student[] = [
  {
    "id": "std-9-khadijah-01",
    "nisn": "009000001",
    "nis": "229001",
    "name": "Aina Sahira Mizani",
    "gender": "P",
    "classId": "9-khadijah",
    "parentName": "Wali dari Aina Sahira Mizani",
    "parentPhone": "081210010001",
    "status": "Aktif"
  },
  {
    "id": "std-9-khadijah-02",
    "nisn": "009000002",
    "nis": "229002",
    "name": "Almira Challysta",
    "gender": "P",
    "classId": "9-khadijah",
    "parentName": "Wali dari Almira Challysta",
    "parentPhone": "081210020002",
    "status": "Aktif"
  },
  {
    "id": "std-9-khadijah-03",
    "nisn": "009000003",
    "nis": "229003",
    "name": "Alya Zahra Adviandry",
    "gender": "P",
    "classId": "9-khadijah",
    "parentName": "Wali dari Alya Zahra Adviandry",
    "parentPhone": "081210030003",
    "status": "Aktif"
  },
  {
    "id": "std-9-khadijah-04",
    "nisn": "009000004",
    "nis": "229004",
    "name": "Alysia Zafirah Marlufie",
    "gender": "P",
    "classId": "9-khadijah",
    "parentName": "Wali dari Alysia Zafirah Marlufie",
    "parentPhone": "081210040004",
    "status": "Aktif"
  },
  {
    "id": "std-9-khadijah-05",
    "nisn": "009000005",
    "nis": "229005",
    "name": "Aurelie Khairatun Noura",
    "gender": "P",
    "classId": "9-khadijah",
    "parentName": "Wali dari Aurelie Khairatun Noura",
    "parentPhone": "081210050005",
    "status": "Aktif"
  },
  {
    "id": "std-9-khadijah-06",
    "nisn": "009000006",
    "nis": "229006",
    "name": "Azra Nazhifah",
    "gender": "P",
    "classId": "9-khadijah",
    "parentName": "Wali dari Azra Nazhifah",
    "parentPhone": "081210060006",
    "status": "Aktif"
  },
  {
    "id": "std-9-khadijah-07",
    "nisn": "009000007",
    "nis": "229007",
    "name": "Callysta Nadine",
    "gender": "P",
    "classId": "9-khadijah",
    "parentName": "Wali dari Callysta Nadine",
    "parentPhone": "081210070007",
    "status": "Aktif"
  },
  {
    "id": "std-9-khadijah-08",
    "nisn": "009000008",
    "nis": "229008",
    "name": "Fiorelli Chalisa  Setiawan",
    "gender": "P",
    "classId": "9-khadijah",
    "parentName": "Wali dari Fiorelli Chalisa  Setiawan",
    "parentPhone": "081210080008",
    "status": "Aktif"
  },
  {
    "id": "std-9-khadijah-09",
    "nisn": "009000009",
    "nis": "229009",
    "name": "Gitta Aqila",
    "gender": "P",
    "classId": "9-khadijah",
    "parentName": "Wali dari Gitta Aqila",
    "parentPhone": "081210090009",
    "status": "Aktif"
  },
  {
    "id": "std-9-khadijah-10",
    "nisn": "009000010",
    "nis": "229010",
    "name": "Irdina Arselia",
    "gender": "P",
    "classId": "9-khadijah",
    "parentName": "Wali dari Irdina Arselia",
    "parentPhone": "081210100010",
    "status": "Aktif"
  },
  {
    "id": "std-9-khadijah-11",
    "nisn": "009000011",
    "nis": "229011",
    "name": "Jasmine Olivia Ferdian",
    "gender": "P",
    "classId": "9-khadijah",
    "parentName": "Wali dari Jasmine Olivia Ferdian",
    "parentPhone": "081210110011",
    "status": "Aktif"
  },
  {
    "id": "std-9-khadijah-12",
    "nisn": "009000012",
    "nis": "229012",
    "name": "Khalisha Naura Rayyani",
    "gender": "P",
    "classId": "9-khadijah",
    "parentName": "Wali dari Khalisha Naura Rayyani",
    "parentPhone": "081210120012",
    "status": "Aktif"
  },
  {
    "id": "std-9-khadijah-13",
    "nisn": "009000013",
    "nis": "229013",
    "name": "Lediska Rizky Aqilla",
    "gender": "P",
    "classId": "9-khadijah",
    "parentName": "Wali dari Lediska Rizky Aqilla",
    "parentPhone": "081210130013",
    "status": "Aktif"
  },
  {
    "id": "std-9-khadijah-14",
    "nisn": "009000014",
    "nis": "229014",
    "name": "Malika Gadi Syagifa",
    "gender": "P",
    "classId": "9-khadijah",
    "parentName": "Wali dari Malika Gadi Syagifa",
    "parentPhone": "081210140014",
    "status": "Aktif"
  },
  {
    "id": "std-9-khadijah-15",
    "nisn": "009000015",
    "nis": "229015",
    "name": "Nada Fajria Salsabila",
    "gender": "P",
    "classId": "9-khadijah",
    "parentName": "Wali dari Nada Fajria Salsabila",
    "parentPhone": "081210150015",
    "status": "Aktif"
  },
  {
    "id": "std-9-khadijah-16",
    "nisn": "009000016",
    "nis": "229016",
    "name": "Nadia Rahma Wahyudi",
    "gender": "P",
    "classId": "9-khadijah",
    "parentName": "Wali dari Nadia Rahma Wahyudi",
    "parentPhone": "081210160016",
    "status": "Aktif"
  },
  {
    "id": "std-9-khadijah-17",
    "nisn": "009000017",
    "nis": "229017",
    "name": "Nadira Maira Irawan",
    "gender": "P",
    "classId": "9-khadijah",
    "parentName": "Wali dari Nadira Maira Irawan",
    "parentPhone": "081210170017",
    "status": "Aktif"
  },
  {
    "id": "std-9-khadijah-18",
    "nisn": "009000018",
    "nis": "229018",
    "name": "Rizky Dwi Harlian",
    "gender": "P",
    "classId": "9-khadijah",
    "parentName": "Wali dari Rizky Dwi Harlian",
    "parentPhone": "081210180018",
    "status": "Aktif"
  },
  {
    "id": "std-9-khadijah-19",
    "nisn": "009000019",
    "nis": "229019",
    "name": "Rizqa Sahla Hanifah",
    "gender": "P",
    "classId": "9-khadijah",
    "parentName": "Wali dari Rizqa Sahla Hanifah",
    "parentPhone": "081210190019",
    "status": "Aktif"
  },
  {
    "id": "std-9-khadijah-20",
    "nisn": "009000020",
    "nis": "229020",
    "name": "Ruasa Mazaya",
    "gender": "P",
    "classId": "9-khadijah",
    "parentName": "Wali dari Ruasa Mazaya",
    "parentPhone": "081210200020",
    "status": "Aktif"
  },
  {
    "id": "std-9-khadijah-21",
    "nisn": "009000021",
    "nis": "229021",
    "name": "Seana Rainy Al Insan",
    "gender": "P",
    "classId": "9-khadijah",
    "parentName": "Wali dari Seana Rainy Al Insan",
    "parentPhone": "081210210021",
    "status": "Aktif"
  },
  {
    "id": "std-9-khadijah-22",
    "nisn": "009000022",
    "nis": "229022",
    "name": "Tsamara Adia Yenraisha",
    "gender": "P",
    "classId": "9-khadijah",
    "parentName": "Wali dari Tsamara Adia Yenraisha",
    "parentPhone": "081210220022",
    "status": "Aktif"
  },
  {
    "id": "std-9-khadijah-23",
    "nisn": "009000023",
    "nis": "229023",
    "name": "Vania Aerylin Aliya",
    "gender": "P",
    "classId": "9-khadijah",
    "parentName": "Wali dari Vania Aerylin Aliya",
    "parentPhone": "081210230023",
    "status": "Aktif"
  },
  {
    "id": "std-9-khadijah-24",
    "nisn": "009000024",
    "nis": "229024",
    "name": "Zahra Elisiya",
    "gender": "P",
    "classId": "9-khadijah",
    "parentName": "Wali dari Zahra Elisiya",
    "parentPhone": "081210240024",
    "status": "Aktif"
  },
  {
    "id": "std-8-akhwat-a-01",
    "nisn": "008000025",
    "nis": "238A001",
    "name": "Aisyah Putri Fahreza",
    "gender": "P",
    "classId": "8-akhwat-a",
    "parentName": "Wali dari Aisyah Putri Fahreza",
    "parentPhone": "081210250001",
    "status": "Aktif"
  },
  {
    "id": "std-8-akhwat-a-02",
    "nisn": "008000026",
    "nis": "238A002",
    "name": "Alesha Balqis Akira",
    "gender": "P",
    "classId": "8-akhwat-a",
    "parentName": "Wali dari Alesha Balqis Akira",
    "parentPhone": "081210260002",
    "status": "Aktif"
  },
  {
    "id": "std-8-akhwat-a-03",
    "nisn": "008000027",
    "nis": "238A003",
    "name": "Anindita Kavie Nathania Lubis",
    "gender": "P",
    "classId": "8-akhwat-a",
    "parentName": "Wali dari Anindita Kavie Nathania Lubis",
    "parentPhone": "081210270003",
    "status": "Aktif"
  },
  {
    "id": "std-8-akhwat-a-04",
    "nisn": "008000028",
    "nis": "238A004",
    "name": "Arinda Latifah",
    "gender": "P",
    "classId": "8-akhwat-a",
    "parentName": "Wali dari Arinda Latifah",
    "parentPhone": "081210280004",
    "status": "Aktif"
  },
  {
    "id": "std-8-akhwat-a-05",
    "nisn": "008000029",
    "nis": "238A005",
    "name": "Aulia Hafiza",
    "gender": "P",
    "classId": "8-akhwat-a",
    "parentName": "Wali dari Aulia Hafiza",
    "parentPhone": "081210290005",
    "status": "Aktif"
  },
  {
    "id": "std-8-akhwat-a-06",
    "nisn": "008000030",
    "nis": "238A006",
    "name": "Ayesha Ang",
    "gender": "P",
    "classId": "8-akhwat-a",
    "parentName": "Wali dari Ayesha Ang",
    "parentPhone": "081210300006",
    "status": "Aktif"
  },
  {
    "id": "std-8-akhwat-a-07",
    "nisn": "008000031",
    "nis": "238A007",
    "name": "Fahira Saqina",
    "gender": "P",
    "classId": "8-akhwat-a",
    "parentName": "Wali dari Fahira Saqina",
    "parentPhone": "081210310007",
    "status": "Aktif"
  },
  {
    "id": "std-8-akhwat-a-08",
    "nisn": "008000032",
    "nis": "238A008",
    "name": "Kayla Intan Berdian",
    "gender": "P",
    "classId": "8-akhwat-a",
    "parentName": "Wali dari Kayla Intan Berdian",
    "parentPhone": "081210320008",
    "status": "Aktif"
  },
  {
    "id": "std-8-akhwat-a-09",
    "nisn": "008000033",
    "nis": "238A009",
    "name": "Keyne Raniah Nazhaleya",
    "gender": "P",
    "classId": "8-akhwat-a",
    "parentName": "Wali dari Keyne Raniah Nazhaleya",
    "parentPhone": "081210330009",
    "status": "Aktif"
  },
  {
    "id": "std-8-akhwat-a-10",
    "nisn": "008000034",
    "nis": "238A010",
    "name": "Moza Alifa Mahendra",
    "gender": "P",
    "classId": "8-akhwat-a",
    "parentName": "Wali dari Moza Alifa Mahendra",
    "parentPhone": "081210340010",
    "status": "Aktif"
  },
  {
    "id": "std-8-akhwat-a-11",
    "nisn": "008000035",
    "nis": "238A011",
    "name": "Nabiha Lutfiyah Zada",
    "gender": "P",
    "classId": "8-akhwat-a",
    "parentName": "Wali dari Nabiha Lutfiyah Zada",
    "parentPhone": "081210350011",
    "status": "Aktif"
  },
  {
    "id": "std-8-akhwat-a-12",
    "nisn": "008000036",
    "nis": "238A012",
    "name": "Nadhifa Amanda Syakira",
    "gender": "P",
    "classId": "8-akhwat-a",
    "parentName": "Wali dari Nadhifa Amanda Syakira",
    "parentPhone": "081210360012",
    "status": "Aktif"
  },
  {
    "id": "std-8-akhwat-a-13",
    "nisn": "008000037",
    "nis": "238A013",
    "name": "Nadila Apriani",
    "gender": "P",
    "classId": "8-akhwat-a",
    "parentName": "Wali dari Nadila Apriani",
    "parentPhone": "081210370013",
    "status": "Aktif"
  },
  {
    "id": "std-8-akhwat-a-14",
    "nisn": "008000038",
    "nis": "238A014",
    "name": "Nayfa Al Thofunnisa",
    "gender": "P",
    "classId": "8-akhwat-a",
    "parentName": "Wali dari Nayfa Al Thofunnisa",
    "parentPhone": "081210380014",
    "status": "Aktif"
  },
  {
    "id": "std-8-akhwat-a-15",
    "nisn": "008000039",
    "nis": "238A015",
    "name": "Qisyah Zara Mimika",
    "gender": "P",
    "classId": "8-akhwat-a",
    "parentName": "Wali dari Qisyah Zara Mimika",
    "parentPhone": "081210390015",
    "status": "Aktif"
  },
  {
    "id": "std-8-akhwat-a-16",
    "nisn": "008000040",
    "nis": "238A016",
    "name": "Queen Quila Ahmad",
    "gender": "P",
    "classId": "8-akhwat-a",
    "parentName": "Wali dari Queen Quila Ahmad",
    "parentPhone": "081210400016",
    "status": "Aktif"
  },
  {
    "id": "std-8-akhwat-a-17",
    "nisn": "008000041",
    "nis": "238A017",
    "name": "Ratifa Pradita",
    "gender": "P",
    "classId": "8-akhwat-a",
    "parentName": "Wali dari Ratifa Pradita",
    "parentPhone": "081210410017",
    "status": "Aktif"
  },
  {
    "id": "std-8-akhwat-a-18",
    "nisn": "008000042",
    "nis": "238A018",
    "name": "Ratu Cantika Khumairoh",
    "gender": "P",
    "classId": "8-akhwat-a",
    "parentName": "Wali dari Ratu Cantika Khumairoh",
    "parentPhone": "081210420018",
    "status": "Aktif"
  },
  {
    "id": "std-8-akhwat-a-19",
    "nisn": "008000043",
    "nis": "238A019",
    "name": "Shanum Nazneen Farhana",
    "gender": "P",
    "classId": "8-akhwat-a",
    "parentName": "Wali dari Shanum Nazneen Farhana",
    "parentPhone": "081210430019",
    "status": "Aktif"
  },
  {
    "id": "std-8-akhwat-a-20",
    "nisn": "008000044",
    "nis": "238A020",
    "name": "Syafiqa Novanti Ananda H",
    "gender": "P",
    "classId": "8-akhwat-a",
    "parentName": "Wali dari Syafiqa Novanti Ananda H",
    "parentPhone": "081210440020",
    "status": "Aktif"
  },
  {
    "id": "std-8-akhwat-a-21",
    "nisn": "008000045",
    "nis": "238A021",
    "name": "Trixy Febrina Amandia",
    "gender": "P",
    "classId": "8-akhwat-a",
    "parentName": "Wali dari Trixy Febrina Amandia",
    "parentPhone": "081210450021",
    "status": "Aktif"
  },
  {
    "id": "std-8-akhwat-b-01",
    "nisn": "008000046",
    "nis": "238B001",
    "name": "Anindira Kavie Nathania Lubis",
    "gender": "P",
    "classId": "8-akhwat-b",
    "parentName": "Wali dari Anindira Kavie Nathania Lubis",
    "parentPhone": "081210460001",
    "status": "Aktif"
  },
  {
    "id": "std-8-akhwat-b-02",
    "nisn": "008000047",
    "nis": "238B002",
    "name": "Aisyah Rabila Sakinah",
    "gender": "P",
    "classId": "8-akhwat-b",
    "parentName": "Wali dari Aisyah Rabila Sakinah",
    "parentPhone": "081210470002",
    "status": "Aktif"
  },
  {
    "id": "std-8-akhwat-b-03",
    "nisn": "008000048",
    "nis": "238B003",
    "name": "Amira",
    "gender": "P",
    "classId": "8-akhwat-b",
    "parentName": "Wali dari Amira",
    "parentPhone": "081210480003",
    "status": "Aktif"
  },
  {
    "id": "std-8-akhwat-b-04",
    "nisn": "008000049",
    "nis": "238B004",
    "name": "Arsyifa Khansa Wijaya",
    "gender": "P",
    "classId": "8-akhwat-b",
    "parentName": "Wali dari Arsyifa Khansa Wijaya",
    "parentPhone": "081210490004",
    "status": "Aktif"
  },
  {
    "id": "std-8-akhwat-b-05",
    "nisn": "008000050",
    "nis": "238B005",
    "name": "Azalea Zalika",
    "gender": "P",
    "classId": "8-akhwat-b",
    "parentName": "Wali dari Azalea Zalika",
    "parentPhone": "081210500005",
    "status": "Aktif"
  },
  {
    "id": "std-8-akhwat-b-06",
    "nisn": "008000051",
    "nis": "238B006",
    "name": "Ceisya Badzlin Syafitha",
    "gender": "P",
    "classId": "8-akhwat-b",
    "parentName": "Wali dari Ceisya Badzlin Syafitha",
    "parentPhone": "081210510006",
    "status": "Aktif"
  },
  {
    "id": "std-8-akhwat-b-07",
    "nisn": "008000052",
    "nis": "238B007",
    "name": "Chayra Fayyola Nadhifa",
    "gender": "P",
    "classId": "8-akhwat-b",
    "parentName": "Wali dari Chayra Fayyola Nadhifa",
    "parentPhone": "081210520007",
    "status": "Aktif"
  },
  {
    "id": "std-8-akhwat-b-08",
    "nisn": "008000053",
    "nis": "238B008",
    "name": "Ciptana Dewi Muktianingrum",
    "gender": "P",
    "classId": "8-akhwat-b",
    "parentName": "Wali dari Ciptana Dewi Muktianingrum",
    "parentPhone": "081210530008",
    "status": "Aktif"
  },
  {
    "id": "std-8-akhwat-b-09",
    "nisn": "008000054",
    "nis": "238B009",
    "name": "Davinah Syahrain",
    "gender": "P",
    "classId": "8-akhwat-b",
    "parentName": "Wali dari Davinah Syahrain",
    "parentPhone": "081210540009",
    "status": "Aktif"
  },
  {
    "id": "std-8-akhwat-b-10",
    "nisn": "008000055",
    "nis": "238B010",
    "name": "Dzakira Talita Zahra",
    "gender": "P",
    "classId": "8-akhwat-b",
    "parentName": "Wali dari Dzakira Talita Zahra",
    "parentPhone": "081210550010",
    "status": "Aktif"
  },
  {
    "id": "std-8-akhwat-b-11",
    "nisn": "008000056",
    "nis": "238B011",
    "name": "Hafsa Moira Ghani",
    "gender": "P",
    "classId": "8-akhwat-b",
    "parentName": "Wali dari Hafsa Moira Ghani",
    "parentPhone": "081210560011",
    "status": "Aktif"
  },
  {
    "id": "std-8-akhwat-b-12",
    "nisn": "008000057",
    "nis": "238B012",
    "name": "Nabila Almira Maharasyi",
    "gender": "P",
    "classId": "8-akhwat-b",
    "parentName": "Wali dari Nabila Almira Maharasyi",
    "parentPhone": "081210570012",
    "status": "Aktif"
  },
  {
    "id": "std-8-akhwat-b-13",
    "nisn": "008000058",
    "nis": "238B013",
    "name": "Nadya Zalfa",
    "gender": "P",
    "classId": "8-akhwat-b",
    "parentName": "Wali dari Nadya Zalfa",
    "parentPhone": "081210580013",
    "status": "Aktif"
  },
  {
    "id": "std-8-akhwat-b-14",
    "nisn": "008000059",
    "nis": "238B014",
    "name": "Najwa Khaira Hasna",
    "gender": "P",
    "classId": "8-akhwat-b",
    "parentName": "Wali dari Najwa Khaira Hasna",
    "parentPhone": "081210590014",
    "status": "Aktif"
  },
  {
    "id": "std-8-akhwat-b-15",
    "nisn": "008000060",
    "nis": "238B015",
    "name": "Naura Zevana Anetri",
    "gender": "P",
    "classId": "8-akhwat-b",
    "parentName": "Wali dari Naura Zevana Anetri",
    "parentPhone": "081210600015",
    "status": "Aktif"
  },
  {
    "id": "std-8-akhwat-b-16",
    "nisn": "008000061",
    "nis": "238B016",
    "name": "Quaneisha Alicia",
    "gender": "P",
    "classId": "8-akhwat-b",
    "parentName": "Wali dari Quaneisha Alicia",
    "parentPhone": "081210610016",
    "status": "Aktif"
  },
  {
    "id": "std-8-akhwat-b-17",
    "nisn": "008000062",
    "nis": "238B017",
    "name": "Queen Haqi Nooreind",
    "gender": "P",
    "classId": "8-akhwat-b",
    "parentName": "Wali dari Queen Haqi Nooreind",
    "parentPhone": "081210620017",
    "status": "Aktif"
  },
  {
    "id": "std-8-akhwat-b-18",
    "nisn": "008000063",
    "nis": "238B018",
    "name": "Queennaya Aqilla Ricardo",
    "gender": "P",
    "classId": "8-akhwat-b",
    "parentName": "Wali dari Queennaya Aqilla Ricardo",
    "parentPhone": "081210630018",
    "status": "Aktif"
  },
  {
    "id": "std-8-akhwat-b-19",
    "nisn": "008000064",
    "nis": "238B019",
    "name": "Raeesa Faiza Zhaafirah",
    "gender": "P",
    "classId": "8-akhwat-b",
    "parentName": "Wali dari Raeesa Faiza Zhaafirah",
    "parentPhone": "081210640019",
    "status": "Aktif"
  },
  {
    "id": "std-8-akhwat-b-20",
    "nisn": "008000065",
    "nis": "238B020",
    "name": "Rafifa Aisha Mahera",
    "gender": "P",
    "classId": "8-akhwat-b",
    "parentName": "Wali dari Rafifa Aisha Mahera",
    "parentPhone": "081210650020",
    "status": "Aktif"
  },
  {
    "id": "std-8-akhwat-b-21",
    "nisn": "008000066",
    "nis": "238B021",
    "name": "Shakina Syafikri",
    "gender": "P",
    "classId": "8-akhwat-b",
    "parentName": "Wali dari Shakina Syafikri",
    "parentPhone": "081210660021",
    "status": "Aktif"
  },
  {
    "id": "std-8-akhwat-b-22",
    "nisn": "008000067",
    "nis": "238B022",
    "name": "Zia Syauqiya Adzara",
    "gender": "P",
    "classId": "8-akhwat-b",
    "parentName": "Wali dari Zia Syauqiya Adzara",
    "parentPhone": "081210670022",
    "status": "Aktif"
  },
  {
    "id": "std-7-ikhwan-01",
    "nisn": "007000068",
    "nis": "247I001",
    "name": "Alaric Muhammad Zeroun Martin",
    "gender": "L",
    "classId": "7-ikhwan",
    "parentName": "Wali dari Alaric Muhammad Zeroun Martin",
    "parentPhone": "081210680001",
    "status": "Aktif"
  },
  {
    "id": "std-7-ikhwan-02",
    "nisn": "007000069",
    "nis": "247I002",
    "name": "Andika Ang",
    "gender": "L",
    "classId": "7-ikhwan",
    "parentName": "Wali dari Andika Ang",
    "parentPhone": "081210690002",
    "status": "Aktif"
  },
  {
    "id": "std-7-ikhwan-03",
    "nisn": "007000070",
    "nis": "247I003",
    "name": "Arroyyan Dendra",
    "gender": "L",
    "classId": "7-ikhwan",
    "parentName": "Wali dari Arroyyan Dendra",
    "parentPhone": "081210700003",
    "status": "Aktif"
  },
  {
    "id": "std-7-ikhwan-04",
    "nisn": "007000071",
    "nis": "247I004",
    "name": "Arsakha Virendra",
    "gender": "L",
    "classId": "7-ikhwan",
    "parentName": "Wali dari Arsakha Virendra",
    "parentPhone": "081210710004",
    "status": "Aktif"
  },
  {
    "id": "std-7-ikhwan-05",
    "nisn": "007000072",
    "nis": "247I005",
    "name": "Arsakha Virendra Wesha",
    "gender": "L",
    "classId": "7-ikhwan",
    "parentName": "Wali dari Arsakha Virendra Wesha",
    "parentPhone": "081210720005",
    "status": "Aktif"
  },
  {
    "id": "std-7-ikhwan-06",
    "nisn": "007000073",
    "nis": "247I006",
    "name": "Azzam Alby Pradipta",
    "gender": "L",
    "classId": "7-ikhwan",
    "parentName": "Wali dari Azzam Alby Pradipta",
    "parentPhone": "081210730006",
    "status": "Aktif"
  },
  {
    "id": "std-7-ikhwan-07",
    "nisn": "007000074",
    "nis": "247I007",
    "name": "Chiko Khairan Androvo",
    "gender": "L",
    "classId": "7-ikhwan",
    "parentName": "Wali dari Chiko Khairan Androvo",
    "parentPhone": "081210740007",
    "status": "Aktif"
  },
  {
    "id": "std-7-ikhwan-08",
    "nisn": "007000075",
    "nis": "247I008",
    "name": "Devobbie Abrar Davio",
    "gender": "L",
    "classId": "7-ikhwan",
    "parentName": "Wali dari Devobbie Abrar Davio",
    "parentPhone": "081210750008",
    "status": "Aktif"
  },
  {
    "id": "std-7-ikhwan-09",
    "nisn": "007000076",
    "nis": "247I009",
    "name": "Farrasshadiq Aqil Hadivi",
    "gender": "L",
    "classId": "7-ikhwan",
    "parentName": "Wali dari Farrasshadiq Aqil Hadivi",
    "parentPhone": "081210760009",
    "status": "Aktif"
  },
  {
    "id": "std-7-ikhwan-10",
    "nisn": "007000077",
    "nis": "247I010",
    "name": "Ferral Fandini",
    "gender": "L",
    "classId": "7-ikhwan",
    "parentName": "Wali dari Ferral Fandini",
    "parentPhone": "081210770010",
    "status": "Aktif"
  },
  {
    "id": "std-7-ikhwan-11",
    "nisn": "007000078",
    "nis": "247I011",
    "name": "Filio Yusuf Al Fathi",
    "gender": "L",
    "classId": "7-ikhwan",
    "parentName": "Wali dari Filio Yusuf Al Fathi",
    "parentPhone": "081210780011",
    "status": "Aktif"
  },
  {
    "id": "std-7-ikhwan-12",
    "nisn": "007000079",
    "nis": "247I012",
    "name": "Kamaory Riovand Rangkuti",
    "gender": "L",
    "classId": "7-ikhwan",
    "parentName": "Wali dari Kamaory Riovand Rangkuti",
    "parentPhone": "081210790012",
    "status": "Aktif"
  },
  {
    "id": "std-7-ikhwan-13",
    "nisn": "007000080",
    "nis": "247I013",
    "name": "M. Azka Nabihan",
    "gender": "L",
    "classId": "7-ikhwan",
    "parentName": "Wali dari M. Azka Nabihan",
    "parentPhone": "081210800013",
    "status": "Aktif"
  },
  {
    "id": "std-7-ikhwan-14",
    "nisn": "007000081",
    "nis": "247I014",
    "name": "M. Haikal El Syahrawi",
    "gender": "L",
    "classId": "7-ikhwan",
    "parentName": "Wali dari M. Haikal El Syahrawi",
    "parentPhone": "081210810014",
    "status": "Aktif"
  },
  {
    "id": "std-7-ikhwan-15",
    "nisn": "007000082",
    "nis": "247I015",
    "name": "M.Andhimas",
    "gender": "L",
    "classId": "7-ikhwan",
    "parentName": "Wali dari M.Andhimas",
    "parentPhone": "081210820015",
    "status": "Aktif"
  },
  {
    "id": "std-7-ikhwan-16",
    "nisn": "007000083",
    "nis": "247I016",
    "name": "M.Rafqah Dzakwan",
    "gender": "L",
    "classId": "7-ikhwan",
    "parentName": "Wali dari M.Rafqah Dzakwan",
    "parentPhone": "081210830016",
    "status": "Aktif"
  },
  {
    "id": "std-7-ikhwan-17",
    "nisn": "007000084",
    "nis": "247I017",
    "name": "Maulana Magribi",
    "gender": "L",
    "classId": "7-ikhwan",
    "parentName": "Wali dari Maulana Magribi",
    "parentPhone": "081210840017",
    "status": "Aktif"
  },
  {
    "id": "std-7-ikhwan-18",
    "nisn": "007000085",
    "nis": "247I018",
    "name": "Mhd. Nazriel Al Mazid Lok",
    "gender": "L",
    "classId": "7-ikhwan",
    "parentName": "Wali dari Mhd. Nazriel Al Mazid Lok",
    "parentPhone": "081210850018",
    "status": "Aktif"
  },
  {
    "id": "std-7-ikhwan-19",
    "nisn": "007000086",
    "nis": "247I019",
    "name": "Muhammad Akhram Alfarizqi",
    "gender": "L",
    "classId": "7-ikhwan",
    "parentName": "Wali dari Muhammad Akhram Alfarizqi",
    "parentPhone": "081210860019",
    "status": "Aktif"
  },
  {
    "id": "std-7-ikhwan-20",
    "nisn": "007000087",
    "nis": "247I020",
    "name": "Muhammad Alfath Abiyyu Zaia",
    "gender": "L",
    "classId": "7-ikhwan",
    "parentName": "Wali dari Muhammad Alfath Abiyyu Zaia",
    "parentPhone": "081210870020",
    "status": "Aktif"
  },
  {
    "id": "std-7-ikhwan-21",
    "nisn": "007000088",
    "nis": "247I021",
    "name": "Muhammad Fathir Zafni",
    "gender": "L",
    "classId": "7-ikhwan",
    "parentName": "Wali dari Muhammad Fathir Zafni",
    "parentPhone": "081210880021",
    "status": "Aktif"
  },
  {
    "id": "std-7-ikhwan-22",
    "nisn": "007000089",
    "nis": "247I022",
    "name": "Muhammad Habibi Humam",
    "gender": "L",
    "classId": "7-ikhwan",
    "parentName": "Wali dari Muhammad Habibi Humam",
    "parentPhone": "081210890022",
    "status": "Aktif"
  },
  {
    "id": "std-7-ikhwan-23",
    "nisn": "007000090",
    "nis": "247I023",
    "name": "Muhammad Hanif Al Faruq",
    "gender": "L",
    "classId": "7-ikhwan",
    "parentName": "Wali dari Muhammad Hanif Al Faruq",
    "parentPhone": "081210900023",
    "status": "Aktif"
  },
  {
    "id": "std-7-ikhwan-24",
    "nisn": "007000091",
    "nis": "247I024",
    "name": "Muhammad Nazhan",
    "gender": "L",
    "classId": "7-ikhwan",
    "parentName": "Wali dari Muhammad Nazhan",
    "parentPhone": "081210910024",
    "status": "Aktif"
  },
  {
    "id": "std-7-ikhwan-25",
    "nisn": "007000092",
    "nis": "247I025",
    "name": "Muhammad Rasya Athaya",
    "gender": "L",
    "classId": "7-ikhwan",
    "parentName": "Wali dari Muhammad Rasya Athaya",
    "parentPhone": "081210920025",
    "status": "Aktif"
  },
  {
    "id": "std-7-ikhwan-26",
    "nisn": "007000093",
    "nis": "247I026",
    "name": "Muhammad Zainal Khafidin Harahap",
    "gender": "L",
    "classId": "7-ikhwan",
    "parentName": "Wali dari Muhammad Zainal Khafidin Harahap",
    "parentPhone": "081210930026",
    "status": "Aktif"
  },
  {
    "id": "std-7-ikhwan-27",
    "nisn": "007000094",
    "nis": "247I027",
    "name": "Raihan Al Bukhary",
    "gender": "L",
    "classId": "7-ikhwan",
    "parentName": "Wali dari Raihan Al Bukhary",
    "parentPhone": "081210940027",
    "status": "Aktif"
  },
  {
    "id": "std-7-ikhwan-28",
    "nisn": "007000095",
    "nis": "247I028",
    "name": "Rayhan Ramadhan",
    "gender": "L",
    "classId": "7-ikhwan",
    "parentName": "Wali dari Rayhan Ramadhan",
    "parentPhone": "081210950028",
    "status": "Aktif"
  },
  {
    "id": "std-7-ikhwan-29",
    "nisn": "007000096",
    "nis": "247I029",
    "name": "Sultan Drianda Habibie",
    "gender": "L",
    "classId": "7-ikhwan",
    "parentName": "Wali dari Sultan Drianda Habibie",
    "parentPhone": "081210960029",
    "status": "Aktif"
  },
  {
    "id": "std-7-ikhwan-30",
    "nisn": "007000097",
    "nis": "247I030",
    "name": "Zaabit Abdullah",
    "gender": "L",
    "classId": "7-ikhwan",
    "parentName": "Wali dari Zaabit Abdullah",
    "parentPhone": "081210970030",
    "status": "Aktif"
  },
  {
    "id": "std-7-ikhwan-31",
    "nisn": "007000098",
    "nis": "247I031",
    "name": "Zaim Ozil Alvrana",
    "gender": "L",
    "classId": "7-ikhwan",
    "parentName": "Wali dari Zaim Ozil Alvrana",
    "parentPhone": "081210980031",
    "status": "Aktif"
  },
  {
    "id": "std-7-akhwat-01",
    "nisn": "007000099",
    "nis": "247A001",
    "name": "A. Zoya Bilqis Khumaira",
    "gender": "P",
    "classId": "7-akhwat",
    "parentName": "Wali dari A. Zoya Bilqis Khumaira",
    "parentPhone": "081210990001",
    "status": "Aktif"
  },
  {
    "id": "std-7-akhwat-02",
    "nisn": "007000100",
    "nis": "247A002",
    "name": "Aamirah Qalesya Alia",
    "gender": "P",
    "classId": "7-akhwat",
    "parentName": "Wali dari Aamirah Qalesya Alia",
    "parentPhone": "081211000002",
    "status": "Aktif"
  },
  {
    "id": "std-7-akhwat-03",
    "nisn": "007000101",
    "nis": "247A003",
    "name": "Aisyah Azzalea Khansa",
    "gender": "P",
    "classId": "7-akhwat",
    "parentName": "Wali dari Aisyah Azzalea Khansa",
    "parentPhone": "081211010003",
    "status": "Aktif"
  },
  {
    "id": "std-7-akhwat-04",
    "nisn": "007000102",
    "nis": "247A004",
    "name": "Ajwa Kamila",
    "gender": "P",
    "classId": "7-akhwat",
    "parentName": "Wali dari Ajwa Kamila",
    "parentPhone": "081211020004",
    "status": "Aktif"
  },
  {
    "id": "std-7-akhwat-05",
    "nisn": "007000103",
    "nis": "247A005",
    "name": "Akifa Hafizah Arimy Putri",
    "gender": "P",
    "classId": "7-akhwat",
    "parentName": "Wali dari Akifa Hafizah Arimy Putri",
    "parentPhone": "081211030005",
    "status": "Aktif"
  },
  {
    "id": "std-7-akhwat-06",
    "nisn": "007000104",
    "nis": "247A006",
    "name": "Almaira Syakira Izza Tunnisa",
    "gender": "P",
    "classId": "7-akhwat",
    "parentName": "Wali dari Almaira Syakira Izza Tunnisa",
    "parentPhone": "081211040006",
    "status": "Aktif"
  },
  {
    "id": "std-7-akhwat-07",
    "nisn": "007000105",
    "nis": "247A007",
    "name": "Aqeela Salsabila Ramadhani",
    "gender": "P",
    "classId": "7-akhwat",
    "parentName": "Wali dari Aqeela Salsabila Ramadhani",
    "parentPhone": "081211050007",
    "status": "Aktif"
  },
  {
    "id": "std-7-akhwat-08",
    "nisn": "007000106",
    "nis": "247A008",
    "name": "Aufa Qonita",
    "gender": "P",
    "classId": "7-akhwat",
    "parentName": "Wali dari Aufa Qonita",
    "parentPhone": "081211060008",
    "status": "Aktif"
  },
  {
    "id": "std-7-akhwat-09",
    "nisn": "007000107",
    "nis": "247A009",
    "name": "Azzikra Queenara",
    "gender": "P",
    "classId": "7-akhwat",
    "parentName": "Wali dari Azzikra Queenara",
    "parentPhone": "081211070009",
    "status": "Aktif"
  },
  {
    "id": "std-7-akhwat-10",
    "nisn": "007000108",
    "nis": "247A010",
    "name": "Balqis Aurelia Dzihni Fitriya",
    "gender": "P",
    "classId": "7-akhwat",
    "parentName": "Wali dari Balqis Aurelia Dzihni Fitriya",
    "parentPhone": "081211080010",
    "status": "Aktif"
  },
  {
    "id": "std-7-akhwat-11",
    "nisn": "007000109",
    "nis": "247A011",
    "name": "Davina Lizea Aurora",
    "gender": "P",
    "classId": "7-akhwat",
    "parentName": "Wali dari Davina Lizea Aurora",
    "parentPhone": "081211090011",
    "status": "Aktif"
  },
  {
    "id": "std-7-akhwat-12",
    "nisn": "007000110",
    "nis": "247A012",
    "name": "Fathiyyah Titenia Firdianto",
    "gender": "P",
    "classId": "7-akhwat",
    "parentName": "Wali dari Fathiyyah Titenia Firdianto",
    "parentPhone": "081211100012",
    "status": "Aktif"
  },
  {
    "id": "std-7-akhwat-13",
    "nisn": "007000111",
    "nis": "247A013",
    "name": "Fildzah Saafia Fadhilah",
    "gender": "P",
    "classId": "7-akhwat",
    "parentName": "Wali dari Fildzah Saafia Fadhilah",
    "parentPhone": "081211110013",
    "status": "Aktif"
  },
  {
    "id": "std-7-akhwat-14",
    "nisn": "007000112",
    "nis": "247A014",
    "name": "Intan Wihendra",
    "gender": "P",
    "classId": "7-akhwat",
    "parentName": "Wali dari Intan Wihendra",
    "parentPhone": "081211120014",
    "status": "Aktif"
  },
  {
    "id": "std-7-akhwat-15",
    "nisn": "007000113",
    "nis": "247A015",
    "name": "Ista Alisya Nadiaputri",
    "gender": "P",
    "classId": "7-akhwat",
    "parentName": "Wali dari Ista Alisya Nadiaputri",
    "parentPhone": "081211130015",
    "status": "Aktif"
  },
  {
    "id": "std-7-akhwat-16",
    "nisn": "007000114",
    "nis": "247A016",
    "name": "Jihan Talita Sakhi",
    "gender": "P",
    "classId": "7-akhwat",
    "parentName": "Wali dari Jihan Talita Sakhi",
    "parentPhone": "081211140016",
    "status": "Aktif"
  },
  {
    "id": "std-7-akhwat-17",
    "nisn": "007000115",
    "nis": "247A017",
    "name": "Kayla Faqihah Aprilia",
    "gender": "P",
    "classId": "7-akhwat",
    "parentName": "Wali dari Kayla Faqihah Aprilia",
    "parentPhone": "081211150017",
    "status": "Aktif"
  },
  {
    "id": "std-7-akhwat-18",
    "nisn": "007000116",
    "nis": "247A018",
    "name": "Khaira Talita Zahwa",
    "gender": "P",
    "classId": "7-akhwat",
    "parentName": "Wali dari Khaira Talita Zahwa",
    "parentPhone": "081211160018",
    "status": "Aktif"
  },
  {
    "id": "std-7-akhwat-19",
    "nisn": "007000117",
    "nis": "247A019",
    "name": "Lentera Buana Nurfika",
    "gender": "P",
    "classId": "7-akhwat",
    "parentName": "Wali dari Lentera Buana Nurfika",
    "parentPhone": "081211170019",
    "status": "Aktif"
  },
  {
    "id": "std-7-akhwat-20",
    "nisn": "007000118",
    "nis": "247A020",
    "name": "Maura Kalila Islamiah Putri",
    "gender": "P",
    "classId": "7-akhwat",
    "parentName": "Wali dari Maura Kalila Islamiah Putri",
    "parentPhone": "081211180020",
    "status": "Aktif"
  },
  {
    "id": "std-7-akhwat-21",
    "nisn": "007000119",
    "nis": "247A021",
    "name": "Nadhifa Heria Qurratuain",
    "gender": "P",
    "classId": "7-akhwat",
    "parentName": "Wali dari Nadhifa Heria Qurratuain",
    "parentPhone": "081211190021",
    "status": "Aktif"
  },
  {
    "id": "std-7-akhwat-22",
    "nisn": "007000120",
    "nis": "247A022",
    "name": "Naurah Shafeea",
    "gender": "P",
    "classId": "7-akhwat",
    "parentName": "Wali dari Naurah Shafeea",
    "parentPhone": "081211200022",
    "status": "Aktif"
  },
  {
    "id": "std-7-akhwat-23",
    "nisn": "007000121",
    "nis": "247A023",
    "name": "Putri Hania Syakira",
    "gender": "P",
    "classId": "7-akhwat",
    "parentName": "Wali dari Putri Hania Syakira",
    "parentPhone": "081211210023",
    "status": "Aktif"
  },
  {
    "id": "std-7-akhwat-24",
    "nisn": "007000122",
    "nis": "247A024",
    "name": "Putri Jehan Tanisha",
    "gender": "P",
    "classId": "7-akhwat",
    "parentName": "Wali dari Putri Jehan Tanisha",
    "parentPhone": "081211220024",
    "status": "Aktif"
  },
  {
    "id": "std-7-akhwat-25",
    "nisn": "007000123",
    "nis": "247A025",
    "name": "Raisah Adzkia Lashifa",
    "gender": "P",
    "classId": "7-akhwat",
    "parentName": "Wali dari Raisah Adzkia Lashifa",
    "parentPhone": "081211230025",
    "status": "Aktif"
  },
  {
    "id": "std-7-akhwat-26",
    "nisn": "007000124",
    "nis": "247A026",
    "name": "Raisha Najwa",
    "gender": "P",
    "classId": "7-akhwat",
    "parentName": "Wali dari Raisha Najwa",
    "parentPhone": "081211240026",
    "status": "Aktif"
  },
  {
    "id": "std-7-akhwat-27",
    "nisn": "007000125",
    "nis": "247A027",
    "name": "Syafira  Zakiya Yasmin",
    "gender": "P",
    "classId": "7-akhwat",
    "parentName": "Wali dari Syafira  Zakiya Yasmin",
    "parentPhone": "081211250027",
    "status": "Aktif"
  },
  {
    "id": "std-7-akhwat-28",
    "nisn": "007000126",
    "nis": "247A028",
    "name": "Urai Irtia Naziha",
    "gender": "P",
    "classId": "7-akhwat",
    "parentName": "Wali dari Urai Irtia Naziha",
    "parentPhone": "081211260028",
    "status": "Aktif"
  },
  {
    "id": "std-7-akhwat-29",
    "nisn": "007000127",
    "nis": "247A029",
    "name": "Vanessa Deswin Rizkya",
    "gender": "P",
    "classId": "7-akhwat",
    "parentName": "Wali dari Vanessa Deswin Rizkya",
    "parentPhone": "081211270029",
    "status": "Aktif"
  },
  {
    "id": "std-7-akhwat-30",
    "nisn": "007000128",
    "nis": "247A030",
    "name": "Zaskia Naksa Bila",
    "gender": "P",
    "classId": "7-akhwat",
    "parentName": "Wali dari Zaskia Naksa Bila",
    "parentPhone": "081211280030",
    "status": "Aktif"
  },
  {
    "id": "std-7-akhwat-31",
    "nisn": "007000129",
    "nis": "247A031",
    "name": "Zizi Azzalea Gwin",
    "gender": "P",
    "classId": "7-akhwat",
    "parentName": "Wali dari Zizi Azzalea Gwin",
    "parentPhone": "081211290031",
    "status": "Aktif"
  },
  {
    "id": "std-12-ikhwan-01",
    "nisn": "0012000130",
    "nis": "2212I001",
    "name": "Ahmad Zein Alkaf",
    "gender": "L",
    "classId": "12-ikhwan",
    "parentName": "Wali dari Ahmad Zein Alkaf",
    "parentPhone": "081211300001",
    "status": "Aktif"
  },
  {
    "id": "std-12-ikhwan-02",
    "nisn": "0012000131",
    "nis": "2212I002",
    "name": "Alif",
    "gender": "L",
    "classId": "12-ikhwan",
    "parentName": "Wali dari Alif",
    "parentPhone": "081211310002",
    "status": "Aktif"
  },
  {
    "id": "std-12-ikhwan-03",
    "nisn": "0012000132",
    "nis": "2212I003",
    "name": "Alnadif Keandra Saputro",
    "gender": "L",
    "classId": "12-ikhwan",
    "parentName": "Wali dari Alnadif Keandra Saputro",
    "parentPhone": "081211320003",
    "status": "Aktif"
  },
  {
    "id": "std-12-ikhwan-04",
    "nisn": "0012000133",
    "nis": "2212I004",
    "name": "Arfa Zidan",
    "gender": "L",
    "classId": "12-ikhwan",
    "parentName": "Wali dari Arfa Zidan",
    "parentPhone": "081211330004",
    "status": "Aktif"
  },
  {
    "id": "std-12-ikhwan-05",
    "nisn": "0012000134",
    "nis": "2212I005",
    "name": "Daffa Zahran Musthafa",
    "gender": "L",
    "classId": "12-ikhwan",
    "parentName": "Wali dari Daffa Zahran Musthafa",
    "parentPhone": "081211340005",
    "status": "Aktif"
  },
  {
    "id": "std-12-ikhwan-06",
    "nisn": "0012000135",
    "nis": "2212I006",
    "name": "Efanda Okta Andrian Suseno",
    "gender": "L",
    "classId": "12-ikhwan",
    "parentName": "Wali dari Efanda Okta Andrian Suseno",
    "parentPhone": "081211350006",
    "status": "Aktif"
  },
  {
    "id": "std-12-ikhwan-07",
    "nisn": "0012000136",
    "nis": "2212I007",
    "name": "Fahmi Rasyid Khairuddin",
    "gender": "L",
    "classId": "12-ikhwan",
    "parentName": "Wali dari Fahmi Rasyid Khairuddin",
    "parentPhone": "081211360007",
    "status": "Aktif"
  },
  {
    "id": "std-12-ikhwan-08",
    "nisn": "0012000137",
    "nis": "2212I008",
    "name": "Gumawang Ahmad Subagja",
    "gender": "L",
    "classId": "12-ikhwan",
    "parentName": "Wali dari Gumawang Ahmad Subagja",
    "parentPhone": "081211370008",
    "status": "Aktif"
  },
  {
    "id": "std-12-ikhwan-09",
    "nisn": "0012000138",
    "nis": "2212I009",
    "name": "Harun Muhammad Mallisa",
    "gender": "L",
    "classId": "12-ikhwan",
    "parentName": "Wali dari Harun Muhammad Mallisa",
    "parentPhone": "081211380009",
    "status": "Aktif"
  },
  {
    "id": "std-12-ikhwan-10",
    "nisn": "0012000139",
    "nis": "2212I010",
    "name": "Muhammad Fachri",
    "gender": "L",
    "classId": "12-ikhwan",
    "parentName": "Wali dari Muhammad Fachri",
    "parentPhone": "081211390010",
    "status": "Aktif"
  },
  {
    "id": "std-12-ikhwan-11",
    "nisn": "0012000140",
    "nis": "2212I011",
    "name": "Raffa Ghaitsan Ramadhan",
    "gender": "L",
    "classId": "12-ikhwan",
    "parentName": "Wali dari Raffa Ghaitsan Ramadhan",
    "parentPhone": "081211400011",
    "status": "Aktif"
  },
  {
    "id": "std-12-ikhwan-12",
    "nisn": "0012000141",
    "nis": "2212I012",
    "name": "Rahmat Perdana Harlian",
    "gender": "L",
    "classId": "12-ikhwan",
    "parentName": "Wali dari Rahmat Perdana Harlian",
    "parentPhone": "081211410012",
    "status": "Aktif"
  },
  {
    "id": "std-12-ikhwan-13",
    "nisn": "0012000142",
    "nis": "2212I013",
    "name": "Teuku Sulthan Fathir Firmansyah",
    "gender": "L",
    "classId": "12-ikhwan",
    "parentName": "Wali dari Teuku Sulthan Fathir Firmansyah",
    "parentPhone": "081211420013",
    "status": "Aktif"
  },
  {
    "id": "std-12-ikhwan-14",
    "nisn": "0012000143",
    "nis": "2212I014",
    "name": "Wildan Al Ariiq Setiawan",
    "gender": "L",
    "classId": "12-ikhwan",
    "parentName": "Wali dari Wildan Al Ariiq Setiawan",
    "parentPhone": "081211430014",
    "status": "Aktif"
  },
  {
    "id": "std-12-akhwat-01",
    "nisn": "0012000144",
    "nis": "2212A001",
    "name": "Andi Syarifah Muqitah Sabar",
    "gender": "P",
    "classId": "12-akhwat",
    "parentName": "Wali dari Andi Syarifah Muqitah Sabar",
    "parentPhone": "081211440001",
    "status": "Aktif"
  },
  {
    "id": "std-12-akhwat-02",
    "nisn": "0012000145",
    "nis": "2212A002",
    "name": "Chelsilia Candra Rahma W",
    "gender": "P",
    "classId": "12-akhwat",
    "parentName": "Wali dari Chelsilia Candra Rahma W",
    "parentPhone": "081211450002",
    "status": "Aktif"
  },
  {
    "id": "std-12-akhwat-03",
    "nisn": "0012000146",
    "nis": "2212A003",
    "name": "Fania Nurfaizah",
    "gender": "P",
    "classId": "12-akhwat",
    "parentName": "Wali dari Fania Nurfaizah",
    "parentPhone": "081211460003",
    "status": "Aktif"
  },
  {
    "id": "std-12-akhwat-04",
    "nisn": "0012000147",
    "nis": "2212A004",
    "name": "Fatimah Azzahra",
    "gender": "P",
    "classId": "12-akhwat",
    "parentName": "Wali dari Fatimah Azzahra",
    "parentPhone": "081211470004",
    "status": "Aktif"
  },
  {
    "id": "std-12-akhwat-05",
    "nisn": "0012000148",
    "nis": "2212A005",
    "name": "Hania Nur Faizah",
    "gender": "P",
    "classId": "12-akhwat",
    "parentName": "Wali dari Hania Nur Faizah",
    "parentPhone": "081211480005",
    "status": "Aktif"
  },
  {
    "id": "std-12-akhwat-06",
    "nisn": "0012000149",
    "nis": "2212A006",
    "name": "Lintang Lakeisha anindya Lubis",
    "gender": "P",
    "classId": "12-akhwat",
    "parentName": "Wali dari Lintang Lakeisha anindya Lubis",
    "parentPhone": "081211490006",
    "status": "Aktif"
  },
  {
    "id": "std-12-akhwat-07",
    "nisn": "0012000150",
    "nis": "2212A007",
    "name": "Marsha Kanza Shatara",
    "gender": "P",
    "classId": "12-akhwat",
    "parentName": "Wali dari Marsha Kanza Shatara",
    "parentPhone": "081211500007",
    "status": "Aktif"
  },
  {
    "id": "std-12-akhwat-08",
    "nisn": "0012000151",
    "nis": "2212A008",
    "name": "Najwa Asyifaa Azzahra",
    "gender": "P",
    "classId": "12-akhwat",
    "parentName": "Wali dari Najwa Asyifaa Azzahra",
    "parentPhone": "081211510008",
    "status": "Aktif"
  },
  {
    "id": "std-12-akhwat-09",
    "nisn": "0012000152",
    "nis": "2212A009",
    "name": "Nour Qoufa Syahira Ramadhan",
    "gender": "P",
    "classId": "12-akhwat",
    "parentName": "Wali dari Nour Qoufa Syahira Ramadhan",
    "parentPhone": "081211520009",
    "status": "Aktif"
  },
  {
    "id": "std-12-akhwat-10",
    "nisn": "0012000153",
    "nis": "2212A010",
    "name": "Sara Aqlmira Hafiza",
    "gender": "P",
    "classId": "12-akhwat",
    "parentName": "Wali dari Sara Aqlmira Hafiza",
    "parentPhone": "081211530010",
    "status": "Aktif"
  },
  {
    "id": "std-12-akhwat-11",
    "nisn": "0012000154",
    "nis": "2212A011",
    "name": "Syadillah Rafa Al'Fatih",
    "gender": "P",
    "classId": "12-akhwat",
    "parentName": "Wali dari Syadillah Rafa Al'Fatih",
    "parentPhone": "081211540011",
    "status": "Aktif"
  },
  {
    "id": "std-12-akhwat-12",
    "nisn": "0012000155",
    "nis": "2212A012",
    "name": "Syaumi Annisa Karim P",
    "gender": "P",
    "classId": "12-akhwat",
    "parentName": "Wali dari Syaumi Annisa Karim P",
    "parentPhone": "081211550012",
    "status": "Aktif"
  },
  {
    "id": "std-12-akhwat-13",
    "nisn": "0012000156",
    "nis": "2212A013",
    "name": "Zahirah Nursyifa",
    "gender": "P",
    "classId": "12-akhwat",
    "parentName": "Wali dari Zahirah Nursyifa",
    "parentPhone": "081211560013",
    "status": "Aktif"
  },
  {
    "id": "std-12-akhwat-14",
    "nisn": "0012000157",
    "nis": "2212A014",
    "name": "Zhafira Shalsabila",
    "gender": "P",
    "classId": "12-akhwat",
    "parentName": "Wali dari Zhafira Shalsabila",
    "parentPhone": "081211570014",
    "status": "Aktif"
  },
  {
    "id": "std-12-akhwat-15",
    "nisn": "0012000158",
    "nis": "2212A015",
    "name": "Ziva Zahara",
    "gender": "P",
    "classId": "12-akhwat",
    "parentName": "Wali dari Ziva Zahara",
    "parentPhone": "081211580015",
    "status": "Aktif"
  },
  {
    "id": "std-11-ikhwan-01",
    "nisn": "0011000159",
    "nis": "2311I001",
    "name": "Ahmad Rafif Mubarok",
    "gender": "L",
    "classId": "11-ikhwan",
    "parentName": "Wali dari Ahmad Rafif Mubarok",
    "parentPhone": "081211590001",
    "status": "Aktif"
  },
  {
    "id": "std-11-ikhwan-02",
    "nisn": "0011000160",
    "nis": "2311I002",
    "name": "Alif Fadhulrahman",
    "gender": "L",
    "classId": "11-ikhwan",
    "parentName": "Wali dari Alif Fadhulrahman",
    "parentPhone": "081211600002",
    "status": "Aktif"
  },
  {
    "id": "std-11-ikhwan-03",
    "nisn": "0011000161",
    "nis": "2311I003",
    "name": "Alif Rifqi Trihutama",
    "gender": "L",
    "classId": "11-ikhwan",
    "parentName": "Wali dari Alif Rifqi Trihutama",
    "parentPhone": "081211610003",
    "status": "Aktif"
  },
  {
    "id": "std-11-ikhwan-04",
    "nisn": "0011000162",
    "nis": "2311I004",
    "name": "Chiko Adelio Putra Adinata",
    "gender": "L",
    "classId": "11-ikhwan",
    "parentName": "Wali dari Chiko Adelio Putra Adinata",
    "parentPhone": "081211620004",
    "status": "Aktif"
  },
  {
    "id": "std-11-ikhwan-05",
    "nisn": "0011000163",
    "nis": "2311I005",
    "name": "Daffa Asyur Zhafran",
    "gender": "L",
    "classId": "11-ikhwan",
    "parentName": "Wali dari Daffa Asyur Zhafran",
    "parentPhone": "081211630005",
    "status": "Aktif"
  },
  {
    "id": "std-11-ikhwan-06",
    "nisn": "0011000164",
    "nis": "2311I006",
    "name": "Faid Naufal Ataullah",
    "gender": "L",
    "classId": "11-ikhwan",
    "parentName": "Wali dari Faid Naufal Ataullah",
    "parentPhone": "081211640006",
    "status": "Aktif"
  },
  {
    "id": "std-11-ikhwan-07",
    "nisn": "0011000165",
    "nis": "2311I007",
    "name": "Fathir Auzan Arbi",
    "gender": "L",
    "classId": "11-ikhwan",
    "parentName": "Wali dari Fathir Auzan Arbi",
    "parentPhone": "081211650007",
    "status": "Aktif"
  },
  {
    "id": "std-11-ikhwan-08",
    "nisn": "0011000166",
    "nis": "2311I008",
    "name": "Hadi Wira Syahputra",
    "gender": "L",
    "classId": "11-ikhwan",
    "parentName": "Wali dari Hadi Wira Syahputra",
    "parentPhone": "081211660008",
    "status": "Aktif"
  },
  {
    "id": "std-11-ikhwan-09",
    "nisn": "0011000167",
    "nis": "2311I009",
    "name": "Jiyad Tsaaqib Ahmad Faruq",
    "gender": "L",
    "classId": "11-ikhwan",
    "parentName": "Wali dari Jiyad Tsaaqib Ahmad Faruq",
    "parentPhone": "081211670009",
    "status": "Aktif"
  },
  {
    "id": "std-11-ikhwan-10",
    "nisn": "0011000168",
    "nis": "2311I010",
    "name": "Kemas Habibi",
    "gender": "L",
    "classId": "11-ikhwan",
    "parentName": "Wali dari Kemas Habibi",
    "parentPhone": "081211680010",
    "status": "Aktif"
  },
  {
    "id": "std-11-ikhwan-11",
    "nisn": "0011000169",
    "nis": "2311I011",
    "name": "Muhammad Ade Firmansah",
    "gender": "L",
    "classId": "11-ikhwan",
    "parentName": "Wali dari Muhammad Ade Firmansah",
    "parentPhone": "081211690011",
    "status": "Aktif"
  },
  {
    "id": "std-11-ikhwan-12",
    "nisn": "0011000170",
    "nis": "2311I012",
    "name": "Muhammad Al Fatih",
    "gender": "L",
    "classId": "11-ikhwan",
    "parentName": "Wali dari Muhammad Al Fatih",
    "parentPhone": "081211700012",
    "status": "Aktif"
  },
  {
    "id": "std-11-ikhwan-13",
    "nisn": "0011000171",
    "nis": "2311I013",
    "name": "Muhammad Husien Haekal",
    "gender": "L",
    "classId": "11-ikhwan",
    "parentName": "Wali dari Muhammad Husien Haekal",
    "parentPhone": "081211710013",
    "status": "Aktif"
  },
  {
    "id": "std-11-ikhwan-14",
    "nisn": "0011000172",
    "nis": "2311I014",
    "name": "Muhammad Khalif Al-Akhtar",
    "gender": "L",
    "classId": "11-ikhwan",
    "parentName": "Wali dari Muhammad Khalif Al-Akhtar",
    "parentPhone": "081211720014",
    "status": "Aktif"
  },
  {
    "id": "std-11-ikhwan-15",
    "nisn": "0011000173",
    "nis": "2311I015",
    "name": "Raihan Azzaky Ahmad",
    "gender": "L",
    "classId": "11-ikhwan",
    "parentName": "Wali dari Raihan Azzaky Ahmad",
    "parentPhone": "081211730015",
    "status": "Aktif"
  },
  {
    "id": "std-11-ikhwan-16",
    "nisn": "0011000174",
    "nis": "2311I016",
    "name": "Raihansyah Ramadhan",
    "gender": "L",
    "classId": "11-ikhwan",
    "parentName": "Wali dari Raihansyah Ramadhan",
    "parentPhone": "081211740016",
    "status": "Aktif"
  },
  {
    "id": "std-11-ikhwan-17",
    "nisn": "0011000175",
    "nis": "2311I017",
    "name": "Satya Lencana Dharma Nusa",
    "gender": "L",
    "classId": "11-ikhwan",
    "parentName": "Wali dari Satya Lencana Dharma Nusa",
    "parentPhone": "081211750017",
    "status": "Aktif"
  },
  {
    "id": "std-11-ikhwan-18",
    "nisn": "0011000176",
    "nis": "2311I018",
    "name": "Yazid  Abdurrahman",
    "gender": "L",
    "classId": "11-ikhwan",
    "parentName": "Wali dari Yazid  Abdurrahman",
    "parentPhone": "081211760018",
    "status": "Aktif"
  },
  {
    "id": "std-11-akhwat-01",
    "nisn": "0011000177",
    "nis": "2311A001",
    "name": "Anas Tasya Fitri",
    "gender": "P",
    "classId": "11-akhwat",
    "parentName": "Wali dari Anas Tasya Fitri",
    "parentPhone": "081211770001",
    "status": "Aktif"
  },
  {
    "id": "std-11-akhwat-02",
    "nisn": "0011000178",
    "nis": "2311A002",
    "name": "Amanda Reyta Salsabilla",
    "gender": "P",
    "classId": "11-akhwat",
    "parentName": "Wali dari Amanda Reyta Salsabilla",
    "parentPhone": "081211780002",
    "status": "Aktif"
  },
  {
    "id": "std-11-akhwat-03",
    "nisn": "0011000179",
    "nis": "2311A003",
    "name": "Azkia Khairunnisa",
    "gender": "P",
    "classId": "11-akhwat",
    "parentName": "Wali dari Azkia Khairunnisa",
    "parentPhone": "081211790003",
    "status": "Aktif"
  },
  {
    "id": "std-11-akhwat-04",
    "nisn": "0011000180",
    "nis": "2311A004",
    "name": "Deislerylla Bivarianty",
    "gender": "P",
    "classId": "11-akhwat",
    "parentName": "Wali dari Deislerylla Bivarianty",
    "parentPhone": "081211800004",
    "status": "Aktif"
  },
  {
    "id": "std-11-akhwat-05",
    "nisn": "0011000181",
    "nis": "2311A005",
    "name": "Elma Syafira Wisam",
    "gender": "P",
    "classId": "11-akhwat",
    "parentName": "Wali dari Elma Syafira Wisam",
    "parentPhone": "081211810005",
    "status": "Aktif"
  },
  {
    "id": "std-11-akhwat-06",
    "nisn": "0011000182",
    "nis": "2311A006",
    "name": "Hanifa Aulia Neldi",
    "gender": "P",
    "classId": "11-akhwat",
    "parentName": "Wali dari Hanifa Aulia Neldi",
    "parentPhone": "081211820006",
    "status": "Aktif"
  },
  {
    "id": "std-11-akhwat-07",
    "nisn": "0011000183",
    "nis": "2311A007",
    "name": "Hanisah Salsabilah",
    "gender": "P",
    "classId": "11-akhwat",
    "parentName": "Wali dari Hanisah Salsabilah",
    "parentPhone": "081211830007",
    "status": "Aktif"
  },
  {
    "id": "std-11-akhwat-08",
    "nisn": "0011000184",
    "nis": "2311A008",
    "name": "Indah Wihendra",
    "gender": "P",
    "classId": "11-akhwat",
    "parentName": "Wali dari Indah Wihendra",
    "parentPhone": "081211840008",
    "status": "Aktif"
  },
  {
    "id": "std-11-akhwat-09",
    "nisn": "0011000185",
    "nis": "2311A009",
    "name": "Kela Duemnidris",
    "gender": "P",
    "classId": "11-akhwat",
    "parentName": "Wali dari Kela Duemnidris",
    "parentPhone": "081211850009",
    "status": "Aktif"
  },
  {
    "id": "std-11-akhwat-10",
    "nisn": "0011000186",
    "nis": "2311A010",
    "name": "Keysha Salsabil",
    "gender": "P",
    "classId": "11-akhwat",
    "parentName": "Wali dari Keysha Salsabil",
    "parentPhone": "081211860010",
    "status": "Aktif"
  },
  {
    "id": "std-11-akhwat-11",
    "nisn": "0011000187",
    "nis": "2311A011",
    "name": "Lea Septia Irawan",
    "gender": "P",
    "classId": "11-akhwat",
    "parentName": "Wali dari Lea Septia Irawan",
    "parentPhone": "081211870011",
    "status": "Aktif"
  },
  {
    "id": "std-11-akhwat-12",
    "nisn": "0011000188",
    "nis": "2311A012",
    "name": "Naura Ayu Bilqis Idris",
    "gender": "P",
    "classId": "11-akhwat",
    "parentName": "Wali dari Naura Ayu Bilqis Idris",
    "parentPhone": "081211880012",
    "status": "Aktif"
  },
  {
    "id": "std-11-akhwat-13",
    "nisn": "0011000189",
    "nis": "2311A013",
    "name": "Olivia Tryana",
    "gender": "P",
    "classId": "11-akhwat",
    "parentName": "Wali dari Olivia Tryana",
    "parentPhone": "081211890013",
    "status": "Aktif"
  },
  {
    "id": "std-11-akhwat-14",
    "nisn": "0011000190",
    "nis": "2311A014",
    "name": "Salwa",
    "gender": "P",
    "classId": "11-akhwat",
    "parentName": "Wali dari Salwa",
    "parentPhone": "081211900014",
    "status": "Aktif"
  },
  {
    "id": "std-11-akhwat-15",
    "nisn": "0011000191",
    "nis": "2311A015",
    "name": "Shakira Putri Ramadhani",
    "gender": "P",
    "classId": "11-akhwat",
    "parentName": "Wali dari Shakira Putri Ramadhani",
    "parentPhone": "081211910015",
    "status": "Aktif"
  },
  {
    "id": "std-10-ikhwan-01",
    "nisn": "0010000192",
    "nis": "2410I001",
    "name": "Adib Abqory Zhafir",
    "gender": "L",
    "classId": "10-ikhwan",
    "parentName": "Wali dari Adib Abqory Zhafir",
    "parentPhone": "081211920001",
    "status": "Aktif"
  },
  {
    "id": "std-10-ikhwan-02",
    "nisn": "0010000193",
    "nis": "2410I002",
    "name": "Ali Haviz Alatas",
    "gender": "L",
    "classId": "10-ikhwan",
    "parentName": "Wali dari Ali Haviz Alatas",
    "parentPhone": "081211930002",
    "status": "Aktif"
  },
  {
    "id": "std-10-ikhwan-03",
    "nisn": "0010000194",
    "nis": "2410I003",
    "name": "Ataya Hashif Mussyaffa",
    "gender": "L",
    "classId": "10-ikhwan",
    "parentName": "Wali dari Ataya Hashif Mussyaffa",
    "parentPhone": "081211940003",
    "status": "Aktif"
  },
  {
    "id": "std-10-ikhwan-04",
    "nisn": "0010000195",
    "nis": "2410I004",
    "name": "Bakil Athallah",
    "gender": "L",
    "classId": "10-ikhwan",
    "parentName": "Wali dari Bakil Athallah",
    "parentPhone": "081211950004",
    "status": "Aktif"
  },
  {
    "id": "std-10-ikhwan-05",
    "nisn": "0010000196",
    "nis": "2410I005",
    "name": "Deryl Frananda Umboh",
    "gender": "L",
    "classId": "10-ikhwan",
    "parentName": "Wali dari Deryl Frananda Umboh",
    "parentPhone": "081211960005",
    "status": "Aktif"
  },
  {
    "id": "std-10-ikhwan-06",
    "nisn": "0010000197",
    "nis": "2410I006",
    "name": "Dzaky Yusuf Rohim",
    "gender": "L",
    "classId": "10-ikhwan",
    "parentName": "Wali dari Dzaky Yusuf Rohim",
    "parentPhone": "081211970006",
    "status": "Aktif"
  },
  {
    "id": "std-10-ikhwan-07",
    "nisn": "0010000198",
    "nis": "2410I007",
    "name": "Fadhil Abdillah",
    "gender": "L",
    "classId": "10-ikhwan",
    "parentName": "Wali dari Fadhil Abdillah",
    "parentPhone": "081211980007",
    "status": "Aktif"
  },
  {
    "id": "std-10-ikhwan-08",
    "nisn": "0010000199",
    "nis": "2410I008",
    "name": "Fahllurrahman Afifdjuned",
    "gender": "L",
    "classId": "10-ikhwan",
    "parentName": "Wali dari Fahllurrahman Afifdjuned",
    "parentPhone": "081211990008",
    "status": "Aktif"
  },
  {
    "id": "std-10-ikhwan-09",
    "nisn": "0010000200",
    "nis": "2410I009",
    "name": "Fayad Abyaz Arafat",
    "gender": "L",
    "classId": "10-ikhwan",
    "parentName": "Wali dari Fayad Abyaz Arafat",
    "parentPhone": "081212000009",
    "status": "Aktif"
  },
  {
    "id": "std-10-ikhwan-10",
    "nisn": "0010000201",
    "nis": "2410I010",
    "name": "Ghiyas Elfiki Daniel",
    "gender": "L",
    "classId": "10-ikhwan",
    "parentName": "Wali dari Ghiyas Elfiki Daniel",
    "parentPhone": "081212010010",
    "status": "Aktif"
  },
  {
    "id": "std-10-ikhwan-11",
    "nisn": "0010000202",
    "nis": "2410I011",
    "name": "Hanung Muhammad Furqon",
    "gender": "L",
    "classId": "10-ikhwan",
    "parentName": "Wali dari Hanung Muhammad Furqon",
    "parentPhone": "081212020011",
    "status": "Aktif"
  },
  {
    "id": "std-10-ikhwan-12",
    "nisn": "0010000203",
    "nis": "2410I012",
    "name": "Hasan Al Atsari",
    "gender": "L",
    "classId": "10-ikhwan",
    "parentName": "Wali dari Hasan Al Atsari",
    "parentPhone": "081212030012",
    "status": "Aktif"
  },
  {
    "id": "std-10-ikhwan-13",
    "nisn": "0010000204",
    "nis": "2410I013",
    "name": "Hirzan Ahmad",
    "gender": "L",
    "classId": "10-ikhwan",
    "parentName": "Wali dari Hirzan Ahmad",
    "parentPhone": "081212040013",
    "status": "Aktif"
  },
  {
    "id": "std-10-ikhwan-14",
    "nisn": "0010000205",
    "nis": "2410I014",
    "name": "Hisyam",
    "gender": "L",
    "classId": "10-ikhwan",
    "parentName": "Wali dari Hisyam",
    "parentPhone": "081212050014",
    "status": "Aktif"
  },
  {
    "id": "std-10-ikhwan-15",
    "nisn": "0010000206",
    "nis": "2410I015",
    "name": "M. Ziqri Fadillah",
    "gender": "L",
    "classId": "10-ikhwan",
    "parentName": "Wali dari M. Ziqri Fadillah",
    "parentPhone": "081212060015",
    "status": "Aktif"
  },
  {
    "id": "std-10-ikhwan-16",
    "nisn": "0010000207",
    "nis": "2410I016",
    "name": "M.Zaky Al Ghifari",
    "gender": "L",
    "classId": "10-ikhwan",
    "parentName": "Wali dari M.Zaky Al Ghifari",
    "parentPhone": "081212070016",
    "status": "Aktif"
  },
  {
    "id": "std-10-ikhwan-17",
    "nisn": "0010000208",
    "nis": "2410I017",
    "name": "Maulana Ibnu Sina",
    "gender": "L",
    "classId": "10-ikhwan",
    "parentName": "Wali dari Maulana Ibnu Sina",
    "parentPhone": "081212080017",
    "status": "Aktif"
  },
  {
    "id": "std-10-ikhwan-18",
    "nisn": "0010000209",
    "nis": "2410I018",
    "name": "Muhammad Azzam Dzulqornain",
    "gender": "L",
    "classId": "10-ikhwan",
    "parentName": "Wali dari Muhammad Azzam Dzulqornain",
    "parentPhone": "081212090018",
    "status": "Aktif"
  },
  {
    "id": "std-10-ikhwan-19",
    "nisn": "0010000210",
    "nis": "2410I019",
    "name": "Muhammad Hizam Syarif",
    "gender": "L",
    "classId": "10-ikhwan",
    "parentName": "Wali dari Muhammad Hizam Syarif",
    "parentPhone": "081212100019",
    "status": "Aktif"
  },
  {
    "id": "std-10-ikhwan-20",
    "nisn": "0010000211",
    "nis": "2410I020",
    "name": "Muhammad Ravi Muniaga",
    "gender": "L",
    "classId": "10-ikhwan",
    "parentName": "Wali dari Muhammad Ravi Muniaga",
    "parentPhone": "081212110020",
    "status": "Aktif"
  },
  {
    "id": "std-10-ikhwan-21",
    "nisn": "0010000212",
    "nis": "2410I021",
    "name": "Nurkholis",
    "gender": "L",
    "classId": "10-ikhwan",
    "parentName": "Wali dari Nurkholis",
    "parentPhone": "081212120021",
    "status": "Aktif"
  },
  {
    "id": "std-10-ikhwan-22",
    "nisn": "0010000213",
    "nis": "2410I022",
    "name": "Raditya Pradana",
    "gender": "L",
    "classId": "10-ikhwan",
    "parentName": "Wali dari Raditya Pradana",
    "parentPhone": "081212130022",
    "status": "Aktif"
  },
  {
    "id": "std-10-ikhwan-23",
    "nisn": "0010000214",
    "nis": "2410I023",
    "name": "Rafa Tri Fani. SKB",
    "gender": "L",
    "classId": "10-ikhwan",
    "parentName": "Wali dari Rafa Tri Fani. SKB",
    "parentPhone": "081212140023",
    "status": "Aktif"
  },
  {
    "id": "std-10-ikhwan-24",
    "nisn": "0010000215",
    "nis": "2410I024",
    "name": "Rahly Alghazy Manantra",
    "gender": "L",
    "classId": "10-ikhwan",
    "parentName": "Wali dari Rahly Alghazy Manantra",
    "parentPhone": "081212150024",
    "status": "Aktif"
  },
  {
    "id": "std-10-ikhwan-25",
    "nisn": "0010000216",
    "nis": "2410I025",
    "name": "Zulmi Novelo Ceisyar",
    "gender": "L",
    "classId": "10-ikhwan",
    "parentName": "Wali dari Zulmi Novelo Ceisyar",
    "parentPhone": "081212160025",
    "status": "Aktif"
  },
  {
    "id": "std-10-akhwat-01",
    "nisn": "0010000217",
    "nis": "2410A001",
    "name": "Almira Tungga Dewi",
    "gender": "P",
    "classId": "10-akhwat",
    "parentName": "Wali dari Almira Tungga Dewi",
    "parentPhone": "081212170001",
    "status": "Aktif"
  },
  {
    "id": "std-10-akhwat-02",
    "nisn": "0010000218",
    "nis": "2410A002",
    "name": "Anindya Arumdani",
    "gender": "P",
    "classId": "10-akhwat",
    "parentName": "Wali dari Anindya Arumdani",
    "parentPhone": "081212180002",
    "status": "Aktif"
  },
  {
    "id": "std-10-akhwat-03",
    "nisn": "0010000219",
    "nis": "2410A003",
    "name": "Azzahra Asyirah",
    "gender": "P",
    "classId": "10-akhwat",
    "parentName": "Wali dari Azzahra Asyirah",
    "parentPhone": "081212190003",
    "status": "Aktif"
  },
  {
    "id": "std-10-akhwat-04",
    "nisn": "0010000220",
    "nis": "2410A004",
    "name": "Dhafina Adila Putri",
    "gender": "P",
    "classId": "10-akhwat",
    "parentName": "Wali dari Dhafina Adila Putri",
    "parentPhone": "081212200004",
    "status": "Aktif"
  },
  {
    "id": "std-10-akhwat-05",
    "nisn": "0010000221",
    "nis": "2410A005",
    "name": "Edlyn Gunadhya",
    "gender": "P",
    "classId": "10-akhwat",
    "parentName": "Wali dari Edlyn Gunadhya",
    "parentPhone": "081212210005",
    "status": "Aktif"
  },
  {
    "id": "std-10-akhwat-06",
    "nisn": "0010000222",
    "nis": "2410A006",
    "name": "Fildzah Avedda",
    "gender": "P",
    "classId": "10-akhwat",
    "parentName": "Wali dari Fildzah Avedda",
    "parentPhone": "081212220006",
    "status": "Aktif"
  },
  {
    "id": "std-10-akhwat-07",
    "nisn": "0010000223",
    "nis": "2410A007",
    "name": "Jihan Khailila Inara",
    "gender": "P",
    "classId": "10-akhwat",
    "parentName": "Wali dari Jihan Khailila Inara",
    "parentPhone": "081212230007",
    "status": "Aktif"
  },
  {
    "id": "std-10-akhwat-08",
    "nisn": "0010000224",
    "nis": "2410A008",
    "name": "Nadine Zakiyah Angelica",
    "gender": "P",
    "classId": "10-akhwat",
    "parentName": "Wali dari Nadine Zakiyah Angelica",
    "parentPhone": "081212240008",
    "status": "Aktif"
  },
  {
    "id": "std-10-akhwat-09",
    "nisn": "0010000225",
    "nis": "2410A009",
    "name": "Namira Harlita Putri",
    "gender": "P",
    "classId": "10-akhwat",
    "parentName": "Wali dari Namira Harlita Putri",
    "parentPhone": "081212250009",
    "status": "Aktif"
  },
  {
    "id": "std-10-akhwat-10",
    "nisn": "0010000226",
    "nis": "2410A010",
    "name": "Queena Cahaya Syifa Anndsula",
    "gender": "P",
    "classId": "10-akhwat",
    "parentName": "Wali dari Queena Cahaya Syifa Anndsula",
    "parentPhone": "081212260010",
    "status": "Aktif"
  },
  {
    "id": "std-10-akhwat-11",
    "nisn": "0010000227",
    "nis": "2410A011",
    "name": "Queensya Hanifa Ardvi",
    "gender": "P",
    "classId": "10-akhwat",
    "parentName": "Wali dari Queensya Hanifa Ardvi",
    "parentPhone": "081212270011",
    "status": "Aktif"
  },
  {
    "id": "std-10-akhwat-12",
    "nisn": "0010000228",
    "nis": "2410A012",
    "name": "Sania Laila Navita",
    "gender": "P",
    "classId": "10-akhwat",
    "parentName": "Wali dari Sania Laila Navita",
    "parentPhone": "081212280012",
    "status": "Aktif"
  },
  {
    "id": "std-10-akhwat-13",
    "nisn": "0010000229",
    "nis": "2410A013",
    "name": "Sendrian Nur Zharifah",
    "gender": "P",
    "classId": "10-akhwat",
    "parentName": "Wali dari Sendrian Nur Zharifah",
    "parentPhone": "081212290013",
    "status": "Aktif"
  },
  {
    "id": "std-10-akhwat-14",
    "nisn": "0010000230",
    "nis": "2410A014",
    "name": "Shireen Kamila Hamdi",
    "gender": "P",
    "classId": "10-akhwat",
    "parentName": "Wali dari Shireen Kamila Hamdi",
    "parentPhone": "081212300014",
    "status": "Aktif"
  },
  {
    "id": "std-10-akhwat-15",
    "nisn": "0010000231",
    "nis": "2410A015",
    "name": "Syakirah Bilqis Agasha",
    "gender": "P",
    "classId": "10-akhwat",
    "parentName": "Wali dari Syakirah Bilqis Agasha",
    "parentPhone": "081212310015",
    "status": "Aktif"
  },
  {
    "id": "std-10-akhwat-16",
    "nisn": "0010000232",
    "nis": "2410A016",
    "name": "Viola Berliyanti",
    "gender": "P",
    "classId": "10-akhwat",
    "parentName": "Wali dari Viola Berliyanti",
    "parentPhone": "081212320016",
    "status": "Aktif"
  }
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

  const students7Ikhwan = INITIAL_STUDENTS.filter((s) => s.classId === '7-ikhwan');
  const students7Akhwat = INITIAL_STUDENTS.filter((s) => s.classId === '7-akhwat');

  const record1: AttendanceRecord = {
    id: `att-${today}-7-ikhwan-jam1-2-tahfidz`,
    date: today,
    classId: '7-ikhwan',
    className: 'VII Ikhwan',
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
    items: students7Ikhwan.map((s, idx) => {
      if (idx === 3) {
        return { studentId: s.id, studentName: s.name, nisn: s.nisn, gender: s.gender, status: 'S', notes: 'Demam panas, ada surat dokter dari ortu' };
      }
      if (idx === 7) {
        return { studentId: s.id, studentName: s.name, nisn: s.nisn, gender: s.gender, status: 'I', notes: 'Izin menghadiri agenda keluarga' };
      }
      return { studentId: s.id, studentName: s.name, nisn: s.nisn, gender: s.gender, status: 'H' };
    }),
  };

  const record2: AttendanceRecord = {
    id: `att-${today}-7-akhwat-jam3-4-matematika`,
    date: today,
    classId: '7-akhwat',
    className: 'VII Akhwat',
    subjectId: 'matematika',
    subjectName: 'Matematika',
    periodStart: 3,
    periodEnd: 4,
    teacherId: 'usr-guru-mtk',
    teacherName: 'Ustadz Muhammad Ridwan, M.Pd',
    teacherRole: 'guru_mapel',
    topic: 'Operasi Hitung Bilangan Bulat dan Pecahan',
    notes: 'Latihan soal mandiri berjalan tertib.',
    createdAt: new Date().toISOString(),
    items: students7Akhwat.map((s, idx) => {
      if (idx === 2) {
        return { studentId: s.id, studentName: s.name, nisn: s.nisn, gender: s.gender, status: 'S', notes: 'Sakit flu' };
      }
      return { studentId: s.id, studentName: s.name, nisn: s.nisn, gender: s.gender, status: 'H' };
    }),
  };

  const record3: AttendanceRecord = {
    id: `att-${yesterday}-7-ikhwan-jam1-2-wali`,
    date: yesterday,
    classId: '7-ikhwan',
    className: 'VII Ikhwan',
    subjectId: 'wali_kelas_daily',
    subjectName: 'Presensi Harian Wali Kelas',
    periodStart: 1,
    periodEnd: 2,
    teacherId: 'usr-wali-7ikhwan',
    teacherName: 'Ustadz Ahmad Nurkholis, S.Ag',
    teacherRole: 'wali_kelas',
    topic: 'Pembinaan Karakter Santri & Kedisiplinan',
    notes: 'Pemeriksaan kerapian seragam dan kehadiran.',
    createdAt: new Date().toISOString(),
    items: students7Ikhwan.map((s, idx) => {
      if (idx === 5) {
        return { studentId: s.id, studentName: s.name, nisn: s.nisn, gender: s.gender, status: 'A', notes: 'Tanpa keterangan' };
      }
      return { studentId: s.id, studentName: s.name, nisn: s.nisn, gender: s.gender, status: 'H' };
    }),
  };

  return [record1, record2, record3];
};
