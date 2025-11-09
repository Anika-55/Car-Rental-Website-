// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDJmspYWghqaDqNScPosgzDs_6qlVPeswA",
  authDomain: "full-stack-assing-10.firebaseapp.com",
  projectId: "full-stack-assing-10",
  storageBucket: "full-stack-assing-10.firebasestorage.app",
  messagingSenderId: "113844846231",
  appId: "1:113844846231:web:dd0ce2c69804d22d6333d2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();