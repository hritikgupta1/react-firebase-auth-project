// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDvrW9clfjRYU2WVxhXfP8yiIt9E5GqYP0",
  authDomain: "react-firebase-auth-proj-fa185.firebaseapp.com",
  projectId: "react-firebase-auth-proj-fa185",
  storageBucket: "react-firebase-auth-proj-fa185.firebasestorage.app",
  messagingSenderId: "983985125198",
  appId: "1:983985125198:web:b0c89d3eb79b9286c2d01f",
  measurementId: "G-QETJFFW361"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleprovider = new GoogleAuthProvider();
export const db = getFirestore(app);