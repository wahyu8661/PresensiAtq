import React, { useState } from 'react';
import { parseUploadedExcelFile, downloadTemplate } from '../utils/excelHelper';
import { UploadCloud, FileSpreadsheet, Download, Check, AlertCircle, Trash2, X } from 'lucide-react';

interface ImportModalProps {
  type: 'students' | 'users';
  isOpen: boolean;
  onClose: () => void;
  onImportSuccess: (data: any[], mode: 'append' | 'replace') => void;
}

export const ImportModal: React.FC<ImportModalProps> = ({
  type,
  isOpen,
  onClose,
  onImportSuccess,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [parsedRows, setParsedRows] = useState<any[]>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [importMode, setImportMode] = useState<'append' | 'replace'>('append');

  if (!isOpen) return null;

  const title = type === 'students' ? 'Impor Data Siswa / Santri' : 'Impor Data Pengguna / Guru';

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    setFile(selected);
    setErrorMsg(null);
    setLoading(true);

    try {
      const result = await parseUploadedExcelFile(selected);
      if (result.rows.length === 0) {
        setErrorMsg('File spreadsheet kosong atau tidak memiliki baris data.');
        setParsedRows([]);
        setHeaders([]);
      } else {
        setParsedRows(result.rows);
        setHeaders(Object.keys(result.rows[0]));
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Gagal membaca file.');
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmImport = () => {
    if (parsedRows.length === 0) {
      alert('Tidak ada data untuk diimpor.');
      return;
    }

    if (type === 'students') {
      // Normalize imported students
      const normalizedStudents = parsedRows.map((r, i) => ({
        id: `std-imp-${Date.now()}-${i}`,
        nisn: String(r['NISN'] || r['nisn'] || r['Nisn'] || `009${Math.floor(1000000 + Math.random() * 9000000)}`),
        nis: String(r['NIS'] || r['nis'] || r['Nis'] || ''),
        name: String(r['Nama Lengkap'] || r['Nama Siswa'] || r['nama'] || r['Nama'] || `Siswa ${i + 1}`).trim(),
        gender: (String(r['Jenis Kelamin (L/P)'] || r['L/P'] || r['gender'] || 'L').toUpperCase().startsWith('P') ? 'P' : 'L') as 'L' | 'P',
        classId: String(r['Kode Kelas'] || r['Kelas'] || r['classId'] || '7-ikhwan').trim(),
        parentName: String(r['Nama Orang Tua / Wali'] || r['Orang Tua'] || r['parentName'] || ''),
        parentPhone: String(r['No HP Ortu'] || r['No. HP Orang Tua'] || r['parentPhone'] || ''),
        status: (r['Status'] || 'Aktif') as any,
      }));

      onImportSuccess(normalizedStudents, importMode);
    } else {
      // Normalize imported users
      const normalizedUsers = parsedRows.map((r, i) => {
        const rawRole = String(r['Peran (admin / wali_kelas / guru_mapel)'] || r['Peran'] || r['role'] || 'guru_mapel').toLowerCase();
        const role = rawRole.includes('admin') ? 'admin' : rawRole.includes('wali') ? 'wali_kelas' : 'guru_mapel';
        const assignedClass = String(r['Kode Kelas Binaan (Untuk Wali Kelas)'] || r['Wali Kelas di'] || r['assignedClassId'] || '').trim();
        const rawSubjects = String(r['Kode Mapel Diampu (Pisahkan koma)'] || r['Mata Pelajaran yang Diampu'] || '');
        const rawClasses = String(r['Kode Kelas Diampu (Pisahkan koma)'] || '');

        return {
          id: `usr-imp-${Date.now()}-${i}`,
          username: String(r['Username'] || r['username'] || `user_${Date.now()}_${i}`).toLowerCase().trim(),
          password: String(r['Password'] || '123'),
          name: String(r['Nama Lengkap'] || r['Nama'] || `Pengguna ${i + 1}`).trim(),
          role,
          nip: String(r['NIP'] || r['nip'] || ''),
          email: String(r['Email'] || r['email'] || ''),
          phone: String(r['No HP'] || r['No. Telepon / WA'] || r['phone'] || ''),
          assignedClassId: assignedClass || undefined,
          assignedSubjectIds: rawSubjects ? rawSubjects.split(',').map((s) => s.trim().toLowerCase()) : [],
          assignedClassIds: rawClasses ? rawClasses.split(',').map((c) => c.trim()) : ['7A', '7B', '8A', '8B', '9A'],
        };
      });

      onImportSuccess(normalizedUsers, importMode);
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-100 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <FileSpreadsheet className="w-5 h-5 text-[#1b357f]" />
            <h3 className="text-base font-bold text-slate-800">{title}</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 text-lg leading-none p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="overflow-y-auto py-4 space-y-4 flex-1">
          {/* Template Download Prompt */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <p className="text-xs font-bold text-blue-900">Belum punya format Excel yang sesuai?</p>
              <p className="text-[11px] text-blue-700">Unduh format template Excel resmi dengan kolom baku.</p>
            </div>
            <button
              type="button"
              onClick={() => downloadTemplate(type)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-all shrink-0"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Unduh Format Template</span>
            </button>
          </div>

          {/* File Upload Zone */}
          <div className="border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-xl p-6 text-center transition-colors bg-slate-50/50">
            <UploadCloud className="w-10 h-10 text-slate-400 mx-auto mb-2" />
            <p className="text-xs font-bold text-slate-700">
              Pilih file Excel (.xlsx, .xls) atau CSV
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Klik atau seret file spreadsheet Anda ke sini
            </p>
            <label className="mt-3 inline-block">
              <span className="px-4 py-2 bg-[#1b357f] hover:bg-[#152a65] text-white text-xs font-bold rounded-xl cursor-pointer shadow-xs transition-all">
                Pilih File Spreadsheet
              </span>
              <input
                type="file"
                accept=".xlsx, .xls, .csv"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
            {file && (
              <p className="text-xs font-bold text-emerald-700 mt-3 flex items-center justify-center gap-1">
                <Check className="w-3.5 h-3.5" /> File terpilih: {file.name} ({(file.size / 1024).toFixed(1)} KB)
              </p>
            )}
          </div>

          {/* Error Message */}
          {errorMsg && (
            <div className="bg-rose-50 border border-rose-200 text-rose-800 p-3 rounded-xl text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Data Preview Table if file parsed */}
          {parsedRows.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800">
                  Pratinjau Data ({parsedRows.length} baris terbaca)
                </span>
                <span className="text-[11px] text-slate-500">Menampilkan 5 baris pertama</span>
              </div>

              <div className="border border-slate-200 rounded-xl overflow-x-auto max-h-48 text-[11px]">
                <table className="w-full text-left">
                  <thead className="bg-slate-100 text-slate-700 font-bold sticky top-0">
                    <tr>
                      {headers.map((h) => (
                        <th key={h} className="p-2 border-b border-slate-200 whitespace-nowrap">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {parsedRows.slice(0, 5).map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-50">
                        {headers.map((h) => (
                          <td key={h} className="p-2 whitespace-nowrap text-slate-600">
                            {String(row[h] || '-')}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mode: Append or Replace */}
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                <span className="font-bold text-slate-700">Metode Penggabungan:</span>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="importMode"
                      checked={importMode === 'append'}
                      onChange={() => setImportMode('append')}
                      className="text-blue-600"
                    />
                    <span className="font-medium text-slate-700">Tambahkan ke Data Lama</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="importMode"
                      checked={importMode === 'replace'}
                      onChange={() => setImportMode('replace')}
                      className="text-blue-600"
                    />
                    <span className="font-medium text-rose-700">Gantikan Seluruh Data</span>
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={handleConfirmImport}
            disabled={parsedRows.length === 0 || loading}
            className={`px-5 py-2 text-white text-xs font-bold rounded-xl shadow-xs transition-all ${
              parsedRows.length > 0 && !loading
                ? 'bg-emerald-600 hover:bg-emerald-700 cursor-pointer'
                : 'bg-slate-300 cursor-not-allowed'
            }`}
          >
            {loading ? 'Memproses...' : `Impor ${parsedRows.length} Data Sekarang`}
          </button>
        </div>
      </div>
    </div>
  );
};
