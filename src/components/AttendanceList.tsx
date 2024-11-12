import React from 'react';
import { CheckCircle2, XCircle, UserPlus, RotateCcw } from 'lucide-react';
import { useAttendanceStore } from '../store/attendanceStore';

export function AttendanceList() {
  const { students, addStudent, resetAttendance } = useAttendanceStore();
  const [newStudentName, setNewStudentName] = React.useState('');

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (newStudentName.trim()) {
      addStudent(newStudentName.trim());
      setNewStudentName('');
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Attendance List</h2>
        <button
          onClick={resetAttendance}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-600"
        >
          <RotateCcw className="w-4 h-4" />
          Reset
        </button>
      </div>

      <form onSubmit={handleAddStudent} className="flex gap-2 mb-6">
        <input
          type="text"
          value={newStudentName}
          onChange={(e) => setNewStudentName(e.target.value)}
          placeholder="Enter student name"
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          <UserPlus className="w-4 h-4" />
          Add
        </button>
      </form>

      <div className="bg-white rounded-lg shadow-sm divide-y">
        {students.map((student) => (
          <div
            key={student.id}
            className="flex items-center justify-between p-4 hover:bg-gray-50"
          >
            <div>
              <h3 className="font-medium text-gray-900">{student.name}</h3>
              {student.lastSeen && (
                <p className="text-sm text-gray-500">
                  Last seen: {student.lastSeen.toLocaleTimeString()}
                </p>
              )}
            </div>
            {student.present ? (
              <CheckCircle2 className="w-6 h-6 text-green-500" />
            ) : (
              <XCircle className="w-6 h-6 text-red-500" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}