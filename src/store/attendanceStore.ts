import { create } from 'zustand';

interface Student {
  id: string;
  name: string;
  present: boolean;
  lastSeen?: Date;
}

interface AttendanceStore {
  students: Student[];
  addStudent: (name: string) => void;
  markPresent: (id: string) => void;
  markAbsent: (id: string) => void;
  resetAttendance: () => void;
}

export const useAttendanceStore = create<AttendanceStore>((set) => ({
  students: [
    { id: '1', name: 'John Doe', present: false },
    { id: '2', name: 'Jane Smith', present: false },
    { id: '3', name: 'Mike Johnson', present: false },
  ],
  addStudent: (name) =>
    set((state) => ({
      students: [...state.students, { id: Date.now().toString(), name, present: false }],
    })),
  markPresent: (id) =>
    set((state) => ({
      students: state.students.map((student) =>
        student.id === id ? { ...student, present: true, lastSeen: new Date() } : student
      ),
    })),
  markAbsent: (id) =>
    set((state) => ({
      students: state.students.map((student) =>
        student.id === id ? { ...student, present: false, lastSeen: undefined } : student
      ),
    })),
  resetAttendance: () =>
    set((state) => ({
      students: state.students.map((student) => ({ ...student, present: false, lastSeen: undefined })),
    })),
}));