import React, { useState, useEffect } from 'react';
import {
  User,
  Student,
  ClassRoom,
  Subject,
  PeriodSlot,
  AttendanceRecord,
  UserRole,
} from './types';
import {
  getStoredUsers,
  saveStoredUsers,
  getStoredStudents,
  saveStoredStudents,
  getStoredClasses,
  saveStoredClasses,
  getStoredSubjects,
  saveStoredSubjects,
  getStoredPeriods,
  saveStoredPeriods,
  getStoredAttendanceRecords,
  saveStoredAttendanceRecords,
  getStoredCurrentUser,
  saveStoredCurrentUser,
} from './utils/storage';
import { Navbar } from './components/Navbar';
import { LoginModal } from './components/LoginModal';
import { AttendanceForm } from './components/AttendanceForm';
import { WaliKelasView } from './components/WaliKelasView';
import { GuruMapelView } from './components/GuruMapelView';
import { AdminDashboard } from './components/AdminDashboard';
import { AttendanceReportsView } from './components/AttendanceReportsView';
import { ImportModal } from './components/ImportModal';
import { StudentDetailModal } from './components/StudentDetailModal';
import { UserSettingsView } from './components/UserSettingsView';

export default function App() {
  // Master persistent state
  const [users, setUsers] = useState<User[]>(getStoredUsers);
  const [students, setStudents] = useState<Student[]>(getStoredStudents);
  const [classes, setClasses] = useState<ClassRoom[]>(getStoredClasses);
  const [subjects, setSubjects] = useState<Subject[]>(getStoredSubjects);
  const [periods, setPeriods] = useState<PeriodSlot[]>(getStoredPeriods);
  const [records, setRecords] = useState<AttendanceRecord[]>(getStoredAttendanceRecords);
  const [currentUser, setCurrentUser] = useState<User | null>(getStoredCurrentUser);

  // App UI State
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [importModalType, setImportModalType] = useState<'students' | 'users' | null>(null);
  const [selectedStudentForDetail, setSelectedStudentForDetail] = useState<Student | null>(null);

  // Sync to localStorage on updates
  useEffect(() => {
    saveStoredUsers(users);
  }, [users]);

  useEffect(() => {
    saveStoredStudents(students);
  }, [students]);

  useEffect(() => {
    saveStoredClasses(classes);
  }, [classes]);

  useEffect(() => {
    saveStoredSubjects(subjects);
  }, [subjects]);

  useEffect(() => {
    saveStoredPeriods(periods);
  }, [periods]);

  useEffect(() => {
    saveStoredAttendanceRecords(records);
  }, [records]);

  useEffect(() => {
    saveStoredCurrentUser(currentUser);
  }, [currentUser]);

  // Set default initial tab based on role according to the Flowchart:
  // Admin Utama -> dashboard
  // Wali Kelas -> wali_dashboard
  // Guru Mapel -> guru_dashboard
  const navigateByRole = (user: User) => {
    if (user.role === 'admin') {
      setActiveTab('dashboard');
    } else if (user.role === 'wali_kelas') {
      setActiveTab('wali_dashboard');
    } else {
      setActiveTab('guru_dashboard');
    }
  };

  const handleLoginSuccess = (user: User) => {
    setCurrentUser(user);
    saveStoredCurrentUser(user);
    navigateByRole(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    saveStoredCurrentUser(null);
  };

  // Handler to switch active role within the user's assigned roles
  const handleChangeActiveRole = (newRole: UserRole) => {
    if (!currentUser) return;
    const updatedUser = { ...currentUser, role: newRole };
    setCurrentUser(updatedUser);
    navigateByRole(updatedUser);
  };

  // Handler to Save Attendance Record (Add or Update)
  const handleSaveAttendanceRecord = (newRecord: AttendanceRecord) => {
    setRecords((prev) => {
      const idx = prev.findIndex(
        (r) =>
          r.id === newRecord.id ||
          (r.date === newRecord.date &&
            r.classId === newRecord.classId &&
            r.periodStart === newRecord.periodStart &&
            r.periodEnd === newRecord.periodEnd &&
            r.subjectId === newRecord.subjectId)
      );

      if (idx >= 0) {
        const updated = [...prev];
        updated[idx] = newRecord;
        return updated;
      }
      return [newRecord, ...prev];
    });
  };

  // Handler to Save / Update User (Flowchart: Input user baru)
  const handleSaveUser = (user: User) => {
    setUsers((prev) => {
      const idx = prev.findIndex((u) => u.id === user.id);
      if (idx >= 0) {
        const updated = [...prev];
        updated[idx] = user;
        return updated;
      }
      return [...prev, user];
    });
    // If the saved user is the currently logged in user, keep session in sync
    if (currentUser && currentUser.id === user.id) {
      setCurrentUser(user);
    }
  };

  // Handler for user personal settings update
  const handleSaveUserProfile = (updatedUser: User) => {
    handleSaveUser(updatedUser);
  };

  // Handler to Delete User
  const handleDeleteUser = (userId: string) => {
    setUsers((prev) => prev.filter((u) => u.id !== userId));
  };

  // Handler to Save / Update Student (Flowchart: CRUD Nama Ananda)
  const handleSaveStudent = (student: Student) => {
    setStudents((prev) => {
      const idx = prev.findIndex((s) => s.id === student.id);
      if (idx >= 0) {
        const updated = [...prev];
        updated[idx] = student;
        return updated;
      }
      return [...prev, student];
    });
  };

  // Handler to Delete Student
  const handleDeleteStudent = (studentId: string) => {
    setStudents((prev) => prev.filter((s) => s.id !== studentId));
  };

  // Handler to Save / Update Class (Flowchart: CRUD Kelas)
  const handleSaveClass = (classRoom: ClassRoom) => {
    setClasses((prev) => {
      const idx = prev.findIndex((c) => c.id === classRoom.id);
      if (idx >= 0) {
        const updated = [...prev];
        updated[idx] = classRoom;
        return updated;
      }
      return [...prev, classRoom];
    });
  };

  // Handler to Delete Class
  const handleDeleteClass = (classId: string) => {
    setClasses((prev) => prev.filter((c) => c.id !== classId));
  };

  // Handler for Excel Import Confirmation
  const handleImportDataSuccess = (importedData: any[], mode: 'append' | 'replace') => {
    if (importModalType === 'students') {
      setStudents((prev) => (mode === 'replace' ? importedData : [...prev, ...importedData]));
      alert(`Berhasil mengimpor ${importedData.length} data santri!`);
    } else if (importModalType === 'users') {
      setUsers((prev) => (mode === 'replace' ? importedData : [...prev, ...importedData]));
      alert(`Berhasil mengimpor ${importedData.length} data pengguna!`);
    }
  };

  // If not logged in, show Login Screen (Username & Password)
  if (!currentUser) {
    return <LoginModal users={users} onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <>
      {/* Sleek Sidebar & Top Navigation Layout */}
      <Navbar
        currentUser={currentUser}
        onChangeActiveRole={handleChangeActiveRole}
        activeTab={activeTab}
        onSelectTab={(tab) => setActiveTab(tab)}
        onLogout={handleLogout}
      >
        {/* TAB: FORM INPUT PRESENSI (Jam 1 s/d Jam 9) */}
        {activeTab === 'input_presensi' && (
          <AttendanceForm
            currentUser={currentUser}
            students={students}
            classes={classes}
            subjects={subjects}
            periods={periods}
            records={records}
            onSaveRecord={handleSaveAttendanceRecord}
            onNavigateToRekap={() => setActiveTab('rekap_presensi')}
          />
        )}

        {/* TAB: PORTAL WALI KELAS (Memantau Kelas & Melihat Riwayat) */}
        {activeTab === 'wali_dashboard' && (
          <WaliKelasView
            currentUser={currentUser}
            students={students}
            classes={classes}
            subjects={subjects}
            periods={periods}
            records={records}
            onNavigateToForm={(classId) => {
              setActiveTab('input_presensi');
            }}
            onViewStudentDetail={(student) => setSelectedStudentForDetail(student)}
          />
        )}

        {/* TAB: PORTAL GURU MAPEL (Presensi Berdasarkan Jam Mapel) */}
        {activeTab === 'guru_dashboard' && (
          <GuruMapelView
            currentUser={currentUser}
            students={students}
            classes={classes}
            subjects={subjects}
            periods={periods}
            records={records}
            onStartAttendance={(classId) => {
              setActiveTab('input_presensi');
            }}
          />
        )}

        {/* TAB: REKAPITULASI & EKSPOR EXCEL (Download Data Presensi) */}
        {activeTab === 'rekap_presensi' && (
          <AttendanceReportsView
            students={students}
            users={users}
            classes={classes}
            subjects={subjects}
            periods={periods}
            records={records}
            defaultClassId={currentUser.role === 'wali_kelas' ? currentUser.assignedClassId : undefined}
            onViewStudentDetail={(student) => setSelectedStudentForDetail(student)}
          />
        )}

        {/* TAB: PENGATURAN AKUN & PROFIL (Ganti Foto, Identitas & Password) */}
        {activeTab === 'pengaturan_akun' && (
          <UserSettingsView
            currentUser={currentUser}
            classes={classes}
            subjects={subjects}
            onSaveProfile={handleSaveUserProfile}
          />
        )}

        {/* TAB: ADMIN UTAMA (Dashboard, Kelola Pengguna/Input User Baru, Kelola Siswa/Santri, Kelola Kelas/Rombel) */}
        {(activeTab === 'dashboard' ||
          activeTab === 'kelola_pengguna' ||
          activeTab === 'kelola_siswa' ||
          activeTab === 'kelola_kelas') && (
          <AdminDashboard
            currentUser={currentUser}
            users={users}
            students={students}
            classes={classes}
            subjects={subjects}
            periods={periods}
            records={records}
            activeTabKey={activeTab}
            onSaveUser={handleSaveUser}
            onDeleteUser={handleDeleteUser}
            onSaveStudent={handleSaveStudent}
            onDeleteStudent={handleDeleteStudent}
            onSaveClass={handleSaveClass}
            onDeleteClass={handleDeleteClass}
            onOpenImportModal={(type) => setImportModalType(type)}
            onNavigateToForm={() => setActiveTab('input_presensi')}
          />
        )}
      </Navbar>

      {/* Reusable Excel Import Modal */}
      {importModalType && (
        <ImportModal
          type={importModalType}
          isOpen={Boolean(importModalType)}
          onClose={() => setImportModalType(null)}
          onImportSuccess={handleImportDataSuccess}
        />
      )}

      {/* Individual Student Dossier Modal */}
      {selectedStudentForDetail && (
        <StudentDetailModal
          student={selectedStudentForDetail}
          classes={classes}
          subjects={subjects}
          records={records}
          onClose={() => setSelectedStudentForDetail(null)}
        />
      )}
    </>
  );
}
