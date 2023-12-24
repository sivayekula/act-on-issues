// firebase.js
import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAmOxujuHnfZ5aik8gmJWG49uiF4f_5R0Q",
  authDomain: "actonissue.firebaseapp.com",
  projectId: "actonissue",
  storageBucket: "actonissue.appspot.com",
  messagingSenderId: "798880755910",
  appId: "1:798880755910:web:a6f6ad10b0022a2cf5e7c7",
  measurementId: "G-5L8M5SDZFW"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);


export const auth = firebaseApp.auth();
export default firebaseApp;
