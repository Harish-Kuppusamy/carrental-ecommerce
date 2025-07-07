
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";


const apikey = import.meta.env.VITE_FIREBASE_API;
const firebaseConfig = {
  apiKey: apikey,
  authDomain: "carrental-13012.firebaseapp.com",
  projectId: "carrental-13012",
  storageBucket: "carrental-13012.firebasestorage.app",
  messagingSenderId: "196362777476",
  appId: "1:196362777476:web:a2db203146426e6949e3d1",
  measurementId: "G-BBPYK9JZ3C",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
export{auth,googleProvider}

