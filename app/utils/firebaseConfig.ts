// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase-admin/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDKoX4q5QLts0ZwolFgASo9WcxEu0Ms5pA",
  authDomain: "resumeroaster-175db.firebaseapp.com",
  projectId: "resumeroaster-175db",
  storageBucket: "resumeroaster-175db.firebasestorage.app",
  messagingSenderId: "377507863342",
  appId: "1:377507863342:web:4f3d24d0c45ea93a2578bf",
  measurementId: "G-EVX311Q6ES"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
