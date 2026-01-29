import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "desi-mart-554bb.firebaseapp.com",
  projectId: "desi-mart-554bb",
  storageBucket: "desi-mart-554bb.firebasestorage.app",
  messagingSenderId: "109928419060",
  appId: "1:109928419060:web:b353ef7b6872d4af2d98a1",
  measurementId: "G-ZJEZ78PB31"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const fireDB = getFirestore(app);

export {auth, fireDB}