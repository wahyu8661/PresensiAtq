import { User, Student, ClassRoom, Subject, PeriodSlot, AttendanceRecord } from '../types';

export const INITIAL_PERIODS: PeriodSlot[] = [
  { period: 1, timeStart: '07:50', timeEnd: '08:25', label: 'Jam ke-1' },
  { period: 2, timeStart: '08:25', timeEnd: '09:00', label: 'Jam ke-2' },
  { period: 3, timeStart: '09:00', timeEnd: '09:35', label: 'Jam ke-3' },
  { period: 4, timeStart: '10:05', timeEnd: '10:40', label: 'Jam ke-4' },
  { period: 5, timeStart: '10:40', timeEnd: '11:15', label: 'Jam ke-5' },
  { period: 6, timeStart: '11:15', timeEnd: '11:50', label: 'Jam ke-6' },
  { period: 7, timeStart: '12:15', timeEnd: '12:50', label: 'Jam ke-7 (Ba\'da Dzuhur)' },
  { period: 8, timeStart: '12:50', timeEnd: '13:25', label: 'Jam ke-8' },
  { period: 9, timeStart: '13:25', timeEnd: '14:00', label: 'Jam ke-9' },
];

export const INITIAL_SUBJECTS: Subject[] = [
  { id: 'al_islam', code: 'ISL', name: 'Al-Islam', category: 'Agama' },
  { id: 'tahsin_tahfidz', code: 'THF', name: 'Tahsin - Tahfiz', category: 'Agama' },
  { id: 'pend_pancasila', code: 'PPN', name: 'Pend. Pancasila', category: 'Umum' },
  { id: 'bahasa_indonesia', code: 'BIN', name: 'Bahasa Indonesia', category: 'Umum' },
  { id: 'bahasa_inggris', code: 'BIG', name: 'Bahasa Inggris', category: 'Umum' },
  { id: 'matematika', code: 'MTK', name: 'Matematika', category: 'Umum' },
  { id: 'mtk_tingkat_lanjut', code: 'MTL', name: 'MTK Tingkat Lanjut', category: 'Umum' },
  { id: 'ipa', code: 'IPA', name: 'Ilmu Pengetahuan Alam (IPA)', category: 'Umum' },
  { id: 'ips', code: 'IPS', name: 'Ilmu Pengetahuan Sosial (IPS)', category: 'Umum' },
  { id: 'fisika', code: 'FIS', name: 'Fisika', category: 'Umum' },
  { id: 'kimia', code: 'KIM', name: 'Kimia', category: 'Umum' },
  { id: 'biologi', code: 'BIO', name: 'Biologi', category: 'Umum' },
  { id: 'sosiologi', code: 'SOS', name: 'Sosiologi', category: 'Umum' },
  { id: 'ekonomi', code: 'EKO', name: 'Ekonomi', category: 'Umum' },
  { id: 'geografi', code: 'GEO', name: 'Geografi', category: 'Umum' },
  { id: 'sejarah', code: 'SEJ', name: 'Sejarah', category: 'Umum' },
  { id: 'informatika_kka', code: 'INF', name: 'Informatika / KKA', category: 'Umum' },
  { id: 'pjok', code: 'PJK', name: 'PJOK / Olahraga', category: 'Umum' },
  { id: 'seni_budaya', code: 'SNB', name: 'Seni Budaya', category: 'Umum' },
  { id: 'arts_and_crafts', code: 'ART', name: 'Arts and Crafts', category: 'Muatan Lokal' },
];

export const INITIAL_CLASSES: ClassRoom[] = [
  // SMP KELAS 7
  {
    id: '7-abu-bakar',
    name: 'Rombel VII-Abu Bakar As Shiddiq (VII Ikhwan)',
    grade: 7,
    waliKelasId: 'usr-lilis',
    waliKelasName: 'Lilis Kurniawati, S.H.',
    totalStudents: 25,
  },
  {
    id: '7-fatimah',
    name: 'Rombel VII-Fatimah binti Muhammad (VII Akhwat)',
    grade: 7,
    waliKelasId: 'usr-refi',
    waliKelasName: 'Refi Febrianti, S.Pt.',
    totalStudents: 25,
  },
  // SMP KELAS 8
  {
    id: '8-umar',
    name: 'Rombel VIII - Umar bin Khattab (VIII Ikhwan)',
    grade: 8,
    waliKelasId: 'usr-reza',
    waliKelasName: 'Reza Pahlepi, S.Hum.',
    totalStudents: 22,
  },
  {
    id: '8-maryam',
    name: 'Rombel VIII - Maryam binti Imron (VIII Akhwat A)',
    grade: 8,
    waliKelasId: 'usr-faza',
    waliKelasName: 'Fazaria Iztayanizar Rahman, S.Pd.',
    totalStudents: 20,
  },
  {
    id: '8-ruqayyah',
    name: 'Rombel VIII-Ruqayyah binti Muhammad (VIII Akhwat B)',
    grade: 8,
    waliKelasId: 'usr-dea',
    waliKelasName: 'Dea Rians, S.Pd.',
    totalStudents: 20,
  },
  // SMP KELAS 9
  {
    id: '9-utsman',
    name: 'Rombel IX-Utsman bin Affan (IX Ikhwan)',
    grade: 9,
    waliKelasId: 'usr-ekaf',
    waliKelasName: 'Eka Fitriana, S.Pd.',
    totalStudents: 22,
  },
  {
    id: '9-khadijah',
    name: 'Rombel IX-Khadijah binti Khuwailid (IX Akhwat)',
    grade: 9,
    waliKelasId: 'usr-eva',
    waliKelasName: 'Eva Yulianti, S.Pd.',
    totalStudents: 22,
  },
  // SMA KELAS 10
  {
    id: '10-ali',
    name: 'Rombel X-Ali bin Abi Thalib (X Ikhwan)',
    grade: 10,
    waliKelasId: 'usr-junara',
    waliKelasName: 'Junara Arianto, S.H.',
    totalStudents: 24,
  },
  {
    id: '10-aisyah',
    name: 'Rombel X-Aisyah binti Abu Bakar (X Akhwat)',
    grade: 10,
    waliKelasId: 'usr-fitrias',
    waliKelasName: 'Fitri Andriyani S, S.Pd.',
    totalStudents: 16,
  },
  // SMA KELAS 11
  {
    id: '11-thalhah',
    name: 'Rombel XI-Thalhah bin Ubaidillah (XI Ikhwan)',
    grade: 11,
    waliKelasId: 'usr-fatkhurozi',
    waliKelasName: 'Fatkhurozi',
    totalStudents: 18,
  },
  {
    id: '11-sumayyah',
    name: 'Rombel XI-Sumayyah binti Khubbath (XI Akhwat)',
    grade: 11,
    waliKelasId: 'usr-maulani',
    waliKelasName: 'Maulani Saqinah, S.Pd.',
    totalStudents: 15,
  },
  // SMA KELAS 12
  {
    id: '12-saad',
    name: 'Rombel XII-Sa\'ad bin Abi Waqqash (XII Ikhwan)',
    grade: 12,
    waliKelasId: 'usr-faisal',
    waliKelasName: 'Faisal',
    totalStudents: 14,
  },
  {
    id: '12-hafshah',
    name: 'Rombel XII-Hafshah binti Umar (XII Akhwat)',
    grade: 12,
    waliKelasId: 'usr-ria',
    waliKelasName: 'Ria Astuti, S.Pd.',
    totalStudents: 15,
  },
];

export const INITIAL_USERS: User[] = [
  // 1. ADMIN UTAMA (Wahyu, Ramlan, Kusmanto)
  {
    id: 'usr-wahyu',
    username: 'wahyu',
    password: '123',
    name: 'Wahyu Dwi Prasetyo, S.Kom.',
    role: 'admin',
    roles: ['admin', 'guru_mapel'],
    nip: '198905202020121001',
    email: 'wahyu8661@guru.smp.belajar.id',
    phone: '081234567801',
    assignedSubjectIds: ['informatika_kka'],
    assignedClassIds: [
      '7-abu-bakar',
      '7-fatimah',
      '8-maryam',
      '8-ruqayyah',
      '8-umar',
      '9-utsman',
      '9-khadijah',
      '10-ali',
      '10-aisyah',
      '11-thalhah',
      '11-sumayyah',
      '12-saad',
      '12-hafshah',
    ],
  },
  {
    id: 'usr-ramlan',
    username: 'ramlan',
    password: '123',
    name: 'Ramlan, S.Kom.',
    role: 'admin',
    roles: ['admin', 'guru_mapel'],
    nip: '198804152019031002',
    email: 'ramlan@attaufiq.sch.id',
    phone: '081234567802',
    assignedSubjectIds: ['informatika_kka'],
    assignedClassIds: [
      '7-abu-bakar',
      '7-fatimah',
      '8-maryam',
      '8-ruqayyah',
      '8-umar',
      '9-utsman',
      '9-khadijah',
    ],
  },
  {
    id: 'usr-kusmanto',
    username: 'kusmanto',
    password: '123',
    name: 'Kusmanto, M.Pd.I.',
    role: 'admin',
    roles: ['admin', 'guru_mapel'],
    nip: '197908122005011003',
    email: 'kusmanto@attaufiq.sch.id',
    phone: '081234567803',
    assignedSubjectIds: ['al_islam'],
    assignedClassIds: [
      '7-abu-bakar',
      '7-fatimah',
      '8-maryam',
      '8-ruqayyah',
      '8-umar',
      '9-utsman',
      '9-khadijah',
    ],
  },

  // 2. WALI KELAS & GURU MAPEL (Posisi Ganda)
  {
    id: 'usr-lilis',
    username: 'bundalilis',
    password: '123',
    name: 'Lilis Kurniawati, S.H.',
    role: 'wali_kelas',
    roles: ['wali_kelas', 'guru_mapel'],
    nip: '198402102011022001',
    email: 'bundalilis@attaufiq.sch.id',
    phone: '081234567804',
    assignedClassId: '7-abu-bakar',
    assignedSubjectIds: ['pend_pancasila', 'ips', 'sosiologi'],
    assignedClassIds: ['7-abu-bakar', '7-fatimah', '8-umar', '8-maryam', '8-ruqayyah', '9-utsman', '9-khadijah', '10-ali', '10-aisyah', '11-thalhah', '11-sumayyah'],
  },
  {
    id: 'usr-refi',
    username: 'bundarefi',
    password: '123',
    name: 'Refi Febrianti, S.Pt.',
    role: 'wali_kelas',
    roles: ['wali_kelas', 'guru_mapel'],
    nip: '198706182012022002',
    email: 'bundarefi@attaufiq.sch.id',
    phone: '081234567805',
    assignedClassId: '7-fatimah',
    assignedSubjectIds: ['ipa', 'biologi'],
    assignedClassIds: ['7-abu-bakar', '7-fatimah', '8-umar', '8-maryam', '8-ruqayyah', '9-utsman', '9-khadijah', '10-ali', '10-aisyah', '11-thalhah', '11-sumayyah', '12-saad', '12-hafshah'],
  },
  {
    id: 'usr-faza',
    username: 'bundafaza',
    password: '123',
    name: 'Fazaria Iztayanizar Rahman, S.Pd.',
    role: 'wali_kelas',
    roles: ['wali_kelas', 'guru_mapel'],
    nip: '199001152015032003',
    email: 'bundafaza@attaufiq.sch.id',
    phone: '081234567806',
    assignedClassId: '8-maryam',
    assignedSubjectIds: ['ipa', 'tahsin_tahfidz'],
    assignedClassIds: ['7-abu-bakar', '7-fatimah', '8-umar', '8-maryam', '8-ruqayyah', '9-utsman', '9-khadijah', '10-ali', '10-aisyah', '11-thalhah', '11-sumayyah', '12-saad', '12-hafshah'],
  },
  {
    id: 'usr-dea',
    username: 'bundadea',
    password: '123',
    name: 'Dea Rians, S.Pd.',
    role: 'wali_kelas',
    roles: ['wali_kelas', 'guru_mapel'],
    nip: '199203242017042004',
    email: 'bundadea@attaufiq.sch.id',
    phone: '081234567807',
    assignedClassId: '8-ruqayyah',
    assignedSubjectIds: ['ips', 'ekonomi', 'sejarah', 'arts_and_crafts'],
    assignedClassIds: ['7-abu-bakar', '7-fatimah', '8-umar', '8-maryam', '8-ruqayyah', '9-utsman', '9-khadijah', '10-ali', '10-aisyah', '11-thalhah', '11-sumayyah', '12-saad', '12-hafshah'],
  },
  {
    id: 'usr-reza',
    username: 'ayahreza',
    password: '123',
    name: 'Reza Pahlepi, S.Hum.',
    role: 'wali_kelas',
    roles: ['wali_kelas', 'guru_mapel'],
    nip: '199109082016021005',
    email: 'ayahreza@attaufiq.sch.id',
    phone: '081234567808',
    assignedClassId: '8-umar',
    assignedSubjectIds: ['ips', 'pjok', 'bahasa_inggris'],
    assignedClassIds: ['7-abu-bakar', '7-fatimah', '8-umar', '8-maryam', '8-ruqayyah', '9-utsman', '9-khadijah', '10-ali', '10-aisyah', '11-thalhah', '11-sumayyah'],
  },
  {
    id: 'usr-ekaf',
    username: 'bundaekaf',
    password: '123',
    name: 'Eka Fitriana, S.Pd.',
    role: 'wali_kelas',
    roles: ['wali_kelas', 'guru_mapel'],
    nip: '198811122014032006',
    email: 'bundaekaf@attaufiq.sch.id',
    phone: '081234567809',
    assignedClassId: '9-utsman',
    assignedSubjectIds: ['matematika', 'mtk_tingkat_lanjut'],
    assignedClassIds: ['7-abu-bakar', '7-fatimah', '8-umar', '8-maryam', '8-ruqayyah', '9-utsman', '9-khadijah', '10-ali', '10-aisyah', '11-thalhah', '11-sumayyah', '12-saad', '12-hafshah'],
  },
  {
    id: 'usr-eva',
    username: 'bundaeva',
    password: '123',
    name: 'Eva Yulianti, S.Pd.',
    role: 'wali_kelas',
    roles: ['wali_kelas', 'guru_mapel'],
    nip: '198605042010012007',
    email: 'bundaeva@attaufiq.sch.id',
    phone: '081234567810',
    assignedClassId: '9-khadijah',
    assignedSubjectIds: ['bahasa_indonesia'],
    assignedClassIds: ['7-abu-bakar', '7-fatimah', '8-umar', '8-maryam', '8-ruqayyah', '9-utsman', '9-khadijah', '10-ali', '10-aisyah', '11-thalhah', '11-sumayyah', '12-saad', '12-hafshah'],
  },
  {
    id: 'usr-fitrias',
    username: 'bundafitrias',
    password: '123',
    name: 'Fitri Andriyani S, S.Pd.',
    role: 'wali_kelas',
    roles: ['wali_kelas', 'guru_mapel'],
    nip: '198907192015022008',
    email: 'bundafitrias@attaufiq.sch.id',
    phone: '081234567811',
    assignedClassId: '10-aisyah',
    assignedSubjectIds: ['ips', 'fisika', 'geografi'],
    assignedClassIds: ['7-abu-bakar', '7-fatimah', '8-umar', '8-maryam', '8-ruqayyah', '9-utsman', '9-khadijah', '10-ali', '10-aisyah', '11-thalhah', '11-sumayyah', '12-saad', '12-hafshah'],
  },
  {
    id: 'usr-junara',
    username: 'ayahjun',
    password: '123',
    name: 'Junara Arianto, S.H.',
    role: 'wali_kelas',
    roles: ['wali_kelas', 'guru_mapel'],
    nip: '198504232013011009',
    email: 'ayahjun@attaufiq.sch.id',
    phone: '081234567812',
    assignedClassId: '10-ali',
    assignedSubjectIds: ['pend_pancasila', 'seni_budaya', 'sejarah'],
    assignedClassIds: ['7-abu-bakar', '7-fatimah', '8-umar', '8-maryam', '8-ruqayyah', '9-utsman', '9-khadijah', '10-ali', '10-aisyah', '11-thalhah', '11-sumayyah', '12-saad', '12-hafshah'],
  },
  {
    id: 'usr-maulani',
    username: 'bundalani',
    password: '123',
    name: 'Maulani Saqinah, S.Pd.',
    role: 'wali_kelas',
    roles: ['wali_kelas', 'guru_mapel'],
    nip: '199302142018032010',
    email: 'bundalani@attaufiq.sch.id',
    phone: '081234567813',
    assignedClassId: '11-sumayyah',
    assignedSubjectIds: ['bahasa_inggris'],
    assignedClassIds: ['10-ali', '10-aisyah', '11-thalhah', '11-sumayyah', '12-saad', '12-hafshah'],
  },
  {
    id: 'usr-fatkhurozi',
    username: 'ayahrozi',
    password: '123',
    name: 'Fatkhurozi',
    role: 'wali_kelas',
    roles: ['wali_kelas', 'guru_mapel'],
    nip: '198712012015041011',
    email: 'ayahrozi@attaufiq.sch.id',
    phone: '081234567814',
    assignedClassId: '11-thalhah',
    assignedSubjectIds: ['matematika', 'mtk_tingkat_lanjut'],
    assignedClassIds: ['7-abu-bakar', '7-fatimah', '8-umar', '8-maryam', '8-ruqayyah', '9-utsman', '9-khadijah', '10-ali', '10-aisyah', '11-thalhah', '11-sumayyah', '12-saad', '12-hafshah'],
  },
  {
    id: 'usr-faisal',
    username: 'ayahfaisal',
    password: '123',
    name: 'Faisal',
    role: 'wali_kelas',
    roles: ['wali_kelas', 'guru_mapel'],
    nip: '199006152017021013',
    email: 'ayahfaisal@attaufiq.sch.id',
    phone: '081234567815',
    assignedClassId: '12-saad',
    assignedSubjectIds: ['pjok'],
    assignedClassIds: ['7-abu-bakar', '7-fatimah', '8-umar', '8-maryam', '8-ruqayyah', '9-utsman', '9-khadijah', '10-ali', '10-aisyah', '11-thalhah', '11-sumayyah', '12-saad', '12-hafshah'],
  },
  {
    id: 'usr-ria',
    username: 'bundariaastuti',
    password: '123',
    name: 'Ria Astuti, S.Pd.',
    role: 'wali_kelas',
    roles: ['wali_kelas', 'guru_mapel'],
    nip: '198608292011012012',
    email: 'bundariaastuti@attaufiq.sch.id',
    phone: '081234567816',
    assignedClassId: '12-hafshah',
    assignedSubjectIds: ['ipa', 'kimia'],
    assignedClassIds: ['7-abu-bakar', '7-fatimah', '8-umar', '8-maryam', '8-ruqayyah', '9-utsman', '9-khadijah', '10-ali', '10-aisyah', '11-thalhah', '11-sumayyah', '12-saad', '12-hafshah'],
  },

  // 3. GURU MAPEL LAINNYA
  {
    id: 'usr-abdullah',
    username: 'abdullahcholis',
    password: '123',
    name: 'Abdullah Cholis Pratama, B.A.',
    role: 'guru_mapel',
    roles: ['guru_mapel'],
    nip: '199405102021011014',
    email: 'abdullahcholis@attaufiq.sch.id',
    phone: '081234567817',
    assignedSubjectIds: ['al_islam', 'tahsin_tahfidz'],
    assignedClassIds: ['7-abu-bakar', '7-fatimah', '8-umar', '8-maryam', '8-ruqayyah', '9-utsman', '9-khadijah', '10-ali', '10-aisyah', '11-thalhah', '11-sumayyah', '12-saad', '12-hafshah'],
  },
  {
    id: 'usr-rina',
    username: 'rinash',
    password: '123',
    name: 'Rina, S.H.',
    role: 'guru_mapel',
    roles: ['guru_mapel'],
    nip: '198307212009022015',
    email: 'rinash@attaufiq.sch.id',
    phone: '081234567818',
    assignedSubjectIds: ['pend_pancasila'],
    assignedClassIds: ['7-abu-bakar', '7-fatimah', '8-umar', '8-maryam', '8-ruqayyah', '9-utsman', '9-khadijah'],
  },
  {
    id: 'usr-oktaviani',
    username: 'oktaviani',
    password: '123',
    name: 'Oktaviani, S.Pd.',
    role: 'guru_mapel',
    roles: ['guru_mapel'],
    nip: '199110052016032016',
    email: 'oktaviani@attaufiq.sch.id',
    phone: '081234567819',
    assignedSubjectIds: ['bahasa_indonesia'],
    assignedClassIds: ['7-abu-bakar', '7-fatimah', '8-umar', '8-maryam', '8-ruqayyah', '9-utsman', '9-khadijah'],
  },
  {
    id: 'usr-adeirma',
    username: 'adeirma',
    password: '123',
    name: 'Ade Irma, S.Pd.',
    role: 'guru_mapel',
    roles: ['guru_mapel'],
    nip: '199209142018022017',
    email: 'adeirma@attaufiq.sch.id',
    phone: '081234567820',
    assignedSubjectIds: ['bahasa_indonesia', 'seni_budaya'],
    assignedClassIds: ['7-abu-bakar', '7-fatimah', '8-umar', '8-maryam', '8-ruqayyah', '9-utsman', '9-khadijah', '10-ali', '10-aisyah', '11-thalhah', '11-sumayyah', '12-saad', '12-hafshah'],
  },
  {
    id: 'usr-mona',
    username: 'monasuci',
    password: '123',
    name: 'Mona Suci Astuti, S.Pd.',
    role: 'guru_mapel',
    roles: ['guru_mapel'],
    nip: '198509172010012018',
    email: 'monasuci@attaufiq.sch.id',
    phone: '081234567821',
    assignedSubjectIds: ['matematika'],
    assignedClassIds: ['7-abu-bakar', '7-fatimah', '8-umar', '8-maryam', '8-ruqayyah', '9-utsman', '9-khadijah', '10-ali', '10-aisyah', '11-thalhah', '11-sumayyah', '12-saad', '12-hafshah'],
  },
  {
    id: 'usr-trisyanto',
    username: 'trisyanto',
    password: '123',
    name: 'Trisyanto, S.Pd.',
    role: 'guru_mapel',
    roles: ['guru_mapel'],
    nip: '198411202008011019',
    email: 'trisyanto@attaufiq.sch.id',
    phone: '081234567822',
    assignedSubjectIds: ['al_islam'],
    assignedClassIds: ['10-ali', '10-aisyah', '11-thalhah', '11-sumayyah', '12-saad', '12-hafshah'],
  },
];

// Helper to generate students list for each rombel
const ikhwanNames = [
  'Muhammad Al-Fatih Pratama', 'Ahmad Zaidan Al-Farisi', 'Faris Abdurrahman Hakim', 'Rafi Maulana Ibrahim',
  'Hasan Al-Bashri Syahid', 'Bilal Robbani Ar-Rasyid', 'Umar Hafidz Al-Qusyairi', 'Salman Al-Farisi Saputra',
  'Ibrahim Khalilullah', 'Yusuf Mansur Mubarak', 'Hamzah Asadullah Perkasa', 'Zaid bin Haritsah Al-Anshari',
  'Thalhah bin Ubaidillah R.', 'Zubair bin Awwam Al-Baqir', 'Saad bin Abi Waqqash G.', 'Abdurrahman bin Auf M.',
  'Abu Ubaidah Amir bin Jarrah', 'Ali Zainal Abidin', 'Husein Syahid Karbala', 'Hasan Al-Mujtaba',
  'Khalid bin Walid Al-Ghazi', 'Thariq bin Ziyad Al-Fatih', 'Salahuddin Al-Ayyubi W.', 'Nuruddin Zanki Perkasa',
  'Muadz bin Jabal Al-Qari', 'Amr bin Ash Al-Fasikh', 'Usamah bin Zaid Al-Habib', 'Abdullah bin Mas\'ud'
];

const akhwatNames = [
  'Aisyah Humaira Putri', 'Fatimah Az-Zahra Ramadhani', 'Khadijah Salsabila Azzahra', 'Maryam Khalida Nabila',
  'Zahra Al-Inshirah', 'Naila Syarifah Al-Idrus', 'Safiyyah Nurul Izzah', 'Ruqayyah binti Muhammad S.',
  'Ummu Kulsum Al-Hidayah', 'Zainab binti Ali Al-Quraisy', 'Hafshah binti Umar Faruq', 'Juwayriyyah Al-Musthafa',
  'Shafiyyah binti Huyay', 'Maimunah binti Al-Harits', 'Sawdah binti Zam\'ah', 'Asma binti Abu Bakar A.',
  'Khaulah binti Azwar Perkasa', 'Nusaibah binti Ka\'ab', 'Rufaidah Al-Aslamiyah', 'Sumayyah binti Khubbath M.',
  'Lubabah binti Al-Harits', 'Fatimah binti Asad', 'Ummu Salamah Hindun', 'Ummu Aiman Barakah'
];

export const INITIAL_STUDENTS: Student[] = [
  // 1. VII-Abu Bakar As Shiddiq (25 Siswa - Ikhwan)
  ...Array.from({ length: 25 }, (_, i) => ({
    id: `std-7abubakar-${i + 1}`,
    nisn: `0091107${String(i + 1).padStart(3, '0')}`,
    nis: `262707${String(i + 1).padStart(3, '0')}`,
    name: ikhwanNames[i % ikhwanNames.length],
    gender: 'L' as const,
    classId: '7-abu-bakar',
    parentName: `Bpk. ${ikhwanNames[i % ikhwanNames.length].split(' ')[0]} Senior`,
    parentPhone: `08127100${String(i + 10).padStart(4, '0')}`,
    address: 'Kota Jambi',
    status: 'Aktif' as const,
  })),

  // 2. VII-Fatimah binti Muhammad (25 Siswa - Akhwat)
  ...Array.from({ length: 25 }, (_, i) => ({
    id: `std-7fatimah-${i + 1}`,
    nisn: `0091207${String(i + 1).padStart(3, '0')}`,
    nis: `262708${String(i + 1).padStart(3, '0')}`,
    name: akhwatNames[i % akhwatNames.length],
    gender: 'P' as const,
    classId: '7-fatimah',
    parentName: `Bpk. ${akhwatNames[i % akhwatNames.length].split(' ')[0]} Wali`,
    parentPhone: `08127200${String(i + 10).padStart(4, '0')}`,
    address: 'Kota Jambi',
    status: 'Aktif' as const,
  })),

  // 3. VIII - Umar bin Khattab (22 Siswa - Ikhwan)
  ...Array.from({ length: 22 }, (_, i) => ({
    id: `std-8umar-${i + 1}`,
    nisn: `0081108${String(i + 1).padStart(3, '0')}`,
    nis: `252608${String(i + 1).padStart(3, '0')}`,
    name: ikhwanNames[(i + 3) % ikhwanNames.length],
    gender: 'L' as const,
    classId: '8-umar',
    parentName: `Bpk. Wali ${ikhwanNames[(i + 3) % ikhwanNames.length].split(' ')[0]}`,
    parentPhone: `08127300${String(i + 10).padStart(4, '0')}`,
    address: 'Kota Jambi',
    status: 'Aktif' as const,
  })),

  // 4. VIII - Maryam binti Imron (20 Siswa - Akhwat A)
  ...Array.from({ length: 20 }, (_, i) => ({
    id: `std-8maryam-${i + 1}`,
    nisn: `0081208${String(i + 1).padStart(3, '0')}`,
    nis: `252609${String(i + 1).padStart(3, '0')}`,
    name: akhwatNames[(i + 2) % akhwatNames.length],
    gender: 'P' as const,
    classId: '8-maryam',
    parentName: `Bpk. Wali ${akhwatNames[(i + 2) % akhwatNames.length].split(' ')[0]}`,
    parentPhone: `08127400${String(i + 10).padStart(4, '0')}`,
    address: 'Kota Jambi',
    status: 'Aktif' as const,
  })),

  // 5. VIII-Ruqayyah binti Muhammad (20 Siswa - Akhwat B)
  ...Array.from({ length: 20 }, (_, i) => ({
    id: `std-8ruqayyah-${i + 1}`,
    nisn: `0081308${String(i + 1).padStart(3, '0')}`,
    nis: `252610${String(i + 1).padStart(3, '0')}`,
    name: akhwatNames[(i + 5) % akhwatNames.length],
    gender: 'P' as const,
    classId: '8-ruqayyah',
    parentName: `Bpk. Wali ${akhwatNames[(i + 5) % akhwatNames.length].split(' ')[0]}`,
    parentPhone: `08127500${String(i + 10).padStart(4, '0')}`,
    address: 'Kota Jambi',
    status: 'Aktif' as const,
  })),

  // 6. IX-Utsman bin Affan (22 Siswa - Ikhwan)
  ...Array.from({ length: 22 }, (_, i) => ({
    id: `std-9utsman-${i + 1}`,
    nisn: `0071109${String(i + 1).padStart(3, '0')}`,
    nis: `242509${String(i + 1).padStart(3, '0')}`,
    name: ikhwanNames[(i + 7) % ikhwanNames.length],
    gender: 'L' as const,
    classId: '9-utsman',
    parentName: `Bpk. Wali ${ikhwanNames[(i + 7) % ikhwanNames.length].split(' ')[0]}`,
    parentPhone: `08127600${String(i + 10).padStart(4, '0')}`,
    address: 'Kota Jambi',
    status: 'Aktif' as const,
  })),

  // 7. IX-Khadijah binti Khuwailid (22 Siswa - Akhwat)
  ...Array.from({ length: 22 }, (_, i) => ({
    id: `std-9khadijah-${i + 1}`,
    nisn: `0071209${String(i + 1).padStart(3, '0')}`,
    nis: `242510${String(i + 1).padStart(3, '0')}`,
    name: akhwatNames[(i + 8) % akhwatNames.length],
    gender: 'P' as const,
    classId: '9-khadijah',
    parentName: `Bpk. Wali ${akhwatNames[(i + 8) % akhwatNames.length].split(' ')[0]}`,
    parentPhone: `08127700${String(i + 10).padStart(4, '0')}`,
    address: 'Kota Jambi',
    status: 'Aktif' as const,
  })),

  // 8. X-Ali bin Abi Thalib (24 Siswa - SMA Ikhwan)
  ...Array.from({ length: 24 }, (_, i) => ({
    id: `std-10ali-${i + 1}`,
    nisn: `0061110${String(i + 1).padStart(3, '0')}`,
    nis: `262710${String(i + 1).padStart(3, '0')}`,
    name: ikhwanNames[(i + 1) % ikhwanNames.length],
    gender: 'L' as const,
    classId: '10-ali',
    parentName: `Bpk. ${ikhwanNames[(i + 1) % ikhwanNames.length].split(' ')[0]}`,
    parentPhone: `08127800${String(i + 10).padStart(4, '0')}`,
    address: 'Kota Jambi',
    status: 'Aktif' as const,
  })),

  // 9. X-Aisyah binti Abu Bakar (16 Siswa - SMA Akhwat)
  ...Array.from({ length: 16 }, (_, i) => ({
    id: `std-10aisyah-${i + 1}`,
    nisn: `0061210${String(i + 1).padStart(3, '0')}`,
    nis: `262711${String(i + 1).padStart(3, '0')}`,
    name: akhwatNames[(i + 4) % akhwatNames.length],
    gender: 'P' as const,
    classId: '10-aisyah',
    parentName: `Bpk. ${akhwatNames[(i + 4) % akhwatNames.length].split(' ')[0]}`,
    parentPhone: `08127900${String(i + 10).padStart(4, '0')}`,
    address: 'Kota Jambi',
    status: 'Aktif' as const,
  })),

  // 10. XI-Thalhah bin Ubaidillah (18 Siswa - SMA Ikhwan)
  ...Array.from({ length: 18 }, (_, i) => ({
    id: `std-11thalhah-${i + 1}`,
    nisn: `0051111${String(i + 1).padStart(3, '0')}`,
    nis: `252611${String(i + 1).padStart(3, '0')}`,
    name: ikhwanNames[(i + 5) % ikhwanNames.length],
    gender: 'L' as const,
    classId: '11-thalhah',
    parentName: `Bpk. ${ikhwanNames[(i + 5) % ikhwanNames.length].split(' ')[0]}`,
    parentPhone: `08128000${String(i + 10).padStart(4, '0')}`,
    address: 'Kota Jambi',
    status: 'Aktif' as const,
  })),

  // 11. XI-Sumayyah binti Khubbath (15 Siswa - SMA Akhwat)
  ...Array.from({ length: 15 }, (_, i) => ({
    id: `std-11sumayyah-${i + 1}`,
    nisn: `0051211${String(i + 1).padStart(3, '0')}`,
    nis: `252612${String(i + 1).padStart(3, '0')}`,
    name: akhwatNames[(i + 7) % akhwatNames.length],
    gender: 'P' as const,
    classId: '11-sumayyah',
    parentName: `Bpk. ${akhwatNames[(i + 7) % akhwatNames.length].split(' ')[0]}`,
    parentPhone: `08128100${String(i + 10).padStart(4, '0')}`,
    address: 'Kota Jambi',
    status: 'Aktif' as const,
  })),

  // 12. XII-Sa'ad bin Abi Waqqash (14 Siswa - SMA Ikhwan)
  ...Array.from({ length: 14 }, (_, i) => ({
    id: `std-12saad-${i + 1}`,
    nisn: `0041112${String(i + 1).padStart(3, '0')}`,
    nis: `242512${String(i + 1).padStart(3, '0')}`,
    name: ikhwanNames[(i + 9) % ikhwanNames.length],
    gender: 'L' as const,
    classId: '12-saad',
    parentName: `Bpk. ${ikhwanNames[(i + 9) % ikhwanNames.length].split(' ')[0]}`,
    parentPhone: `08128200${String(i + 10).padStart(4, '0')}`,
    address: 'Kota Jambi',
    status: 'Aktif' as const,
  })),

  // 13. XII-Hafshah binti Umar (15 Siswa - SMA Akhwat)
  ...Array.from({ length: 15 }, (_, i) => ({
    id: `std-12hafshah-${i + 1}`,
    nisn: `0041212${String(i + 1).padStart(3, '0')}`,
    nis: `242513${String(i + 1).padStart(3, '0')}`,
    name: akhwatNames[(i + 11) % akhwatNames.length],
    gender: 'P' as const,
    classId: '12-hafshah',
    parentName: `Bpk. ${akhwatNames[(i + 11) % akhwatNames.length].split(' ')[0]}`,
    parentPhone: `08128300${String(i + 10).padStart(4, '0')}`,
    address: 'Kota Jambi',
    status: 'Aktif' as const,
  })),
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

  const students7AbuBakar = INITIAL_STUDENTS.filter((s) => s.classId === '7-abu-bakar');
  const students7Fatimah = INITIAL_STUDENTS.filter((s) => s.classId === '7-fatimah');

  const record1: AttendanceRecord = {
    id: `att-${today}-7-abu-bakar-jam1-3-seni_budaya`,
    date: today,
    classId: '7-abu-bakar',
    className: 'Rombel VII-Abu Bakar As Shiddiq (VII Ikhwan)',
    subjectId: 'seni_budaya',
    subjectName: 'Seni Budaya',
    periodStart: 1,
    periodEnd: 3,
    teacherId: 'usr-junara',
    teacherName: 'Junara Arianto, S.H.',
    teacherRole: 'guru_mapel',
    topic: 'Pengenalan Seni Rupa & Kaligrafi Arab',
    notes: 'Ananda tertib dan aktif mengikuti praktik sketsa kaligrafi.',
    createdAt: new Date().toISOString(),
    items: students7AbuBakar.map((s, idx) => {
      if (idx === 3) {
        return { studentId: s.id, studentName: s.name, nisn: s.nisn, gender: s.gender, status: 'S', notes: 'Sakit flu demam (ada surat ortu)' };
      }
      if (idx === 7) {
        return { studentId: s.id, studentName: s.name, nisn: s.nisn, gender: s.gender, status: 'I', notes: 'Izin acara keluarga' };
      }
      return { studentId: s.id, studentName: s.name, nisn: s.nisn, gender: s.gender, status: 'H' };
    }),
  };

  const record2: AttendanceRecord = {
    id: `att-${today}-7-fatimah-jam1-3-al_islam`,
    date: today,
    classId: '7-fatimah',
    className: 'Rombel VII-Fatimah binti Muhammad (VII Akhwat)',
    subjectId: 'al_islam',
    subjectName: 'Al-Islam',
    periodStart: 1,
    periodEnd: 3,
    teacherId: 'usr-kusmanto',
    teacherName: 'Kusmanto, M.Pd.I.',
    teacherRole: 'guru_mapel',
    topic: 'Kaidah Thaharah dan Sholat Berjamaah',
    notes: 'Alhamdulillah seluruh santriwati menyimak materi dengan khusyuk.',
    createdAt: new Date().toISOString(),
    items: students7Fatimah.map((s, idx) => {
      if (idx === 2) {
        return { studentId: s.id, studentName: s.name, nisn: s.nisn, gender: s.gender, status: 'S', notes: 'Sakit di UKS' };
      }
      return { studentId: s.id, studentName: s.name, nisn: s.nisn, gender: s.gender, status: 'H' };
    }),
  };

  const record3: AttendanceRecord = {
    id: `att-${yesterday}-7-abu-bakar-wali`,
    date: yesterday,
    classId: '7-abu-bakar',
    className: 'Rombel VII-Abu Bakar As Shiddiq (VII Ikhwan)',
    subjectId: 'wali_kelas_daily',
    subjectName: 'Presensi Harian Wali Kelas',
    periodStart: 1,
    periodEnd: 2,
    teacherId: 'usr-lilis',
    teacherName: 'Lilis Kurniawati, S.H.',
    teacherRole: 'wali_kelas',
    topic: 'Pembinaan Karakter Santri & Kedisiplinan',
    notes: 'Pemeriksaan kerapian seragam dan kehadiran halaqah pagi.',
    createdAt: new Date().toISOString(),
    items: students7AbuBakar.map((s, idx) => {
      if (idx === 5) {
        return { studentId: s.id, studentName: s.name, nisn: s.nisn, gender: s.gender, status: 'A', notes: 'Tanpa keterangan' };
      }
      return { studentId: s.id, studentName: s.name, nisn: s.nisn, gender: s.gender, status: 'H' };
    }),
  };

  return [record1, record2, record3];
};
