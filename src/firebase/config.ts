import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDMaDAeezAiKFPPM-hLX_tNV7Vek-ALhmg",
  authDomain: "startup-idea-validator-7f19a.firebaseapp.com",
  projectId: "startup-idea-validator-7f19a",
  storageBucket: "startup-idea-validator-7f19a.firebasestorage.app",
  messagingSenderId: "1021597161150",
  appId: "1:1021597161150:web:d03667195deb122d0630ef",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-0000000000"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;