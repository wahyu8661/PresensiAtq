import React, { useState, useEffect } from 'react';
import {
  User,
  Student,
  ClassRoom,
  Subject,
  PeriodSlot,
  AttendanceRecord,
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
  resetAllDataToDefault,
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
  const [activeTab, setActiveTab] = useState<string>('input_presensi');
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
    if (currentUser) {
      saveStoredCurrentUser(currentUser);
    }
  }, [currentUser]);

  // Set default initial tab based on role
  useEffect(() => {
    if (!currentUser) return;
    if (currentUser.role === 'admin') {
      setActiveTab('dashboard');
    } else if (currentUser.role === 'wali_kelas') {
      setActiveTab('wali_dashboard');
    } else {
      setActiveTab('guru_dashboard');
    }
  }, [currentUser?.id, currentUser?.role]);

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

  // Handler to Save / Update User
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
  };

  // Handler to Delete User
  const handleDeleteUser = (userId: string) => {
    setUsers((prev) => prev.filter((u) => u.id !== userId));
  };

  // Handler to Save / Update Student
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

  // Handler to Switch User
  const handleSwitchUser = (user: User) => {
    setCurrentUser(user);
    if (user.role === 'admin') {
      setActiveTab('dashboard');
    } else if (user.role === 'wali_kelas') {
      setActiveTab('wali_dashboard');
    } else {
      setActiveTab('guru_dashboard');
    }
  };

  // Handler for Resetting all Mock Data
  const handleResetData = () => {
    resetAllDataToDefault();
    setUsers(getStoredUsers());
    setStudents(getStoredStudents());
    setClasses(getStoredClasses());
    setSubjects(getStoredSubjects());
    setPeriods(getStoredPeriods());
    setRecords(getStoredAttendanceRecords());
    setCurrentUser(getStoredCurrentUser());
    setActiveTab('dashboard');
  };

  // If not logged in, show Login Screen
  if (!currentUser) {
    return <LoginModal users={users} onLoginSuccess={(user) => setCurrentUser(user)} />;
  }

  return (
    <>
      {/* Sleek Sidebar & Top Navigation Layout */}
      <Navbar
        currentUser={currentUser}
        onSwitchUser={handleSwitchUser}
        availableUsers={users}
        activeTab={activeTab}
        onSelectTab={(tab) => setActiveTab(tab)}
        onLogout={() => setCurrentUser(null)}
        onResetData={handleResetData}
      >
        {/* TAB 1: FORM INPUT PRESENSI (Jam 1 s/d Jam 9) */}
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

        {/* TAB 2: PORTAL WALI KELAS (Pantau Kelas Binaan) */}
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

        {/* TAB 3: PORTAL GURU MAPEL (Presensi & Jadwal Mapel) */}
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

        {/* TAB 4: REKAPITULASI & EKSPOR EXCEL */}
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

        {/* TAB 5: ADMIN DASHBOARD (Overview, Kelola Pengguna, Kelola Siswa) */}
        {(activeTab === 'dashboard' || activeTab === 'kelola_pengguna' || activeTab === 'kelola_siswa') && (
          <AdminDashboard
            currentUser={currentUser}
            users={users}
            students={students}
            classes={classes}
            subjects={subjects}
            periods={periods}
            records={records}
            onSaveUser={handleSaveUser}
            onDeleteUser={handleDeleteUser}
            onSaveStudent={handleSaveStudent}
            onDeleteStudent={handleDeleteStudent}
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
