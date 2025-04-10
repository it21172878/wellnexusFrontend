// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCiR2eYbjT5cJUMYcUZW-GrJDj9R5B77Y4",
  authDomain: "wellnexus-50835.firebaseapp.com",
  projectId: "wellnexus-50835",
  storageBucket: "wellnexus-50835.firebasestorage.app",
  messagingSenderId: "838286391102",
  appId: "1:838286391102:web:688899a64319adf00b9e6f",
  measurementId: "G-BCLWDG3GWV",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
