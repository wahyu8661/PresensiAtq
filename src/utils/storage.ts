import { User, Student, ClassRoom, Subject, PeriodSlot, AttendanceRecord } from '../types';
import {
  INITIAL_CLASSES,
  INITIAL_PERIODS,
  INITIAL_STUDENTS,
  INITIAL_SUBJECTS,
  INITIAL_USERS,
  generateInitialAttendanceRecords,
} from '../data/initialData';

const STORAGE_KEYS = {
  USERS: 'attaufiq_presensi_users_v5_resmi_spreadsheet',
  STUDENTS: 'attaufiq_presensi_students_v5_resmi_spreadsheet',
  CLASSES: 'attaufiq_presensi_classes_v5_resmi_spreadsheet',
  SUBJECTS: 'attaufiq_presensi_subjects_v5_resmi_spreadsheet',
  PERIODS: 'attaufiq_presensi_periods_v5_resmi_spreadsheet',
  RECORDS: 'attaufiq_presensi_records_v5_resmi_spreadsheet',
  CURRENT_USER: 'attaufiq_presensi_curr_user_v5_resmi_spreadsheet',
};

export const getStoredUsers = (): User[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.USERS);
    if (!data) {
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(INITIAL_USERS));
      return INITIAL_USERS;
    }
    return JSON.parse(data);
  } catch {
    return INITIAL_USERS;
  }
};

export const saveStoredUsers = (users: User[]) => {
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
};

export const getStoredStudents = (): Student[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.STUDENTS);
    if (!data) {
      localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(INITIAL_STUDENTS));
      return INITIAL_STUDENTS;
    }
    return JSON.parse(data);
  } catch {
    return INITIAL_STUDENTS;
  }
};

export const saveStoredStudents = (students: Student[]) => {
  localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(students));
};

export const getStoredClasses = (): ClassRoom[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.CLASSES);
    if (!data) {
      localStorage.setItem(STORAGE_KEYS.CLASSES, JSON.stringify(INITIAL_CLASSES));
      return INITIAL_CLASSES;
    }
    return JSON.parse(data);
  } catch {
    return INITIAL_CLASSES;
  }
};

export const saveStoredClasses = (classes: ClassRoom[]) => {
  localStorage.setItem(STORAGE_KEYS.CLASSES, JSON.stringify(classes));
};

export const getStoredSubjects = (): Subject[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.SUBJECTS);
    if (!data) {
      localStorage.setItem(STORAGE_KEYS.SUBJECTS, JSON.stringify(INITIAL_SUBJECTS));
      return INITIAL_SUBJECTS;
    }
    return JSON.parse(data);
  } catch {
    return INITIAL_SUBJECTS;
  }
};

export const saveStoredSubjects = (subjects: Subject[]) => {
  localStorage.setItem(STORAGE_KEYS.SUBJECTS, JSON.stringify(subjects));
};

export const getStoredPeriods = (): PeriodSlot[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.PERIODS);
    if (!data) {
      localStorage.setItem(STORAGE_KEYS.PERIODS, JSON.stringify(INITIAL_PERIODS));
      return INITIAL_PERIODS;
    }
    return JSON.parse(data);
  } catch {
    return INITIAL_PERIODS;
  }
};

export const saveStoredPeriods = (periods: PeriodSlot[]) => {
  localStorage.setItem(STORAGE_KEYS.PERIODS, JSON.stringify(periods));
};

export const getStoredAttendanceRecords = (): AttendanceRecord[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.RECORDS);
    if (!data) {
      const init = generateInitialAttendanceRecords();
      localStorage.setItem(STORAGE_KEYS.RECORDS, JSON.stringify(init));
      return init;
    }
    return JSON.parse(data);
  } catch {
    return generateInitialAttendanceRecords();
  }
};

export const saveStoredAttendanceRecords = (records: AttendanceRecord[]) => {
  localStorage.setItem(STORAGE_KEYS.RECORDS, JSON.stringify(records));
};

export const getStoredCurrentUser = (): User | null => {
  try {
    const data = sessionStorage.getItem(STORAGE_KEYS.CURRENT_USER) || localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    if (data) return JSON.parse(data);
  } catch {
    // fallback
  }
  // Initial visitor should always start at login page
  return null;
};

export const saveStoredCurrentUser = (user: User | null) => {
  if (user) {
    sessionStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
  } else {
    sessionStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  }
};

export const resetAllDataToDefault = () => {
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(INITIAL_USERS));
  localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(INITIAL_STUDENTS));
  localStorage.setItem(STORAGE_KEYS.CLASSES, JSON.stringify(INITIAL_CLASSES));
  localStorage.setItem(STORAGE_KEYS.SUBJECTS, JSON.stringify(INITIAL_SUBJECTS));
  localStorage.setItem(STORAGE_KEYS.PERIODS, JSON.stringify(INITIAL_PERIODS));
  localStorage.setItem(STORAGE_KEYS.RECORDS, JSON.stringify(generateInitialAttendanceRecords()));
  sessionStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
};
