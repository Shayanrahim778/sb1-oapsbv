import React, { useRef, useEffect, useState } from 'react';
import { Camera as CameraIcon, Loader2 } from 'lucide-react';
import * as tf from '@tensorflow/tfjs';
import * as faceDetection from '@tensorflow-models/face-detection';
import { useAttendanceStore } from '../store/attendanceStore';

export function Camera() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isScanning, setIsScanning] = useState(false);
  const markPresent = useAttendanceStore((state) => state.markPresent);

  useEffect(() => {
    let stream: MediaStream | null = null;

    async function setupCamera() {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' },
          audio: false,
        });
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
      } finally {
        setIsLoading(false);
      }
    }

    setupCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  async function startScanning() {
    setIsScanning(true);
    await tf.ready();
    const model = await faceDetection.createDetector(
      faceDetection.SupportedModels.MediaPipeFaceDetector,
      { runtime: 'tfjs' }
    );

    const detectFaces = async () => {
      if (!videoRef.current || !model) return;

      try {
        const faces = await model.estimateFaces(videoRef.current);
        if (faces.length > 0) {
          // In a real application, you would implement face recognition here
          // For demo purposes, we'll just mark a random student as present
          const students = useAttendanceStore.getState().students;
          const absentStudents = students.filter(s => !s.present);
          if (absentStudents.length > 0) {
            const randomStudent = absentStudents[Math.floor(Math.random() * absentStudents.length)];
            markPresent(randomStudent.id);
          }
        }
      } catch (error) {
        console.error('Error detecting faces:', error);
      }

      if (isScanning) {
        requestAnimationFrame(detectFaces);
      }
    };

    detectFaces();
  }

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {isLoading ? (
        <div className="flex items-center justify-center h-[400px] bg-gray-900 rounded-lg">
          <Loader2 className="w-8 h-8 animate-spin text-white" />
        </div>
      ) : (
        <>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-[400px] object-cover rounded-lg"
          />
          <button
            onClick={() => setIsScanning(!isScanning)}
            className={`absolute bottom-4 right-4 p-3 rounded-full ${
              isScanning ? 'bg-red-500' : 'bg-blue-500'
            } text-white shadow-lg`}
          >
            <CameraIcon className="w-6 h-6" />
          </button>
        </>
      )}
    </div>
  );
}