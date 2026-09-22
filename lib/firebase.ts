import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCvGgGbTU67B7fYE6veykJ35DwPC5svSF0",
  authDomain: "upforge-quizz.firebaseapp.com",
  projectId: "upforge-quizz",
  storageBucket: "upforge-quizz.firebasestorage.app",
  messagingSenderId: "103480268317",
  appId: "1:103480268317:web:310e3b5bebc4fcbb872eb8",
  measurementId: "G-TQW93WBMRK",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const db = getFirestore(app);
export default app;
