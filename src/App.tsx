import React from 'react';
import { Camera } from './components/Camera';
import { AttendanceList } from './components/AttendanceList';
import { GraduationCap } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-8 h-8 text-blue-500" />
            <h1 className="text-2xl font-bold text-gray-900">Smart Attendance System</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <section>
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Camera Feed</h2>
            <Camera />
          </section>
          
          <section>
            <AttendanceList />
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;