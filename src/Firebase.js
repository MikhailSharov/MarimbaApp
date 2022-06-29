// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAkh3zfbKYbDWtLTcwhG3jh1IaJj1N2GI4",
  authDomain: "marimba-2a297.firebaseapp.com",
  databaseURL: "https://marimba-2a297-default-rtdb.firebaseio.com",
  projectId: "marimba-2a297",
  storageBucket: "marimba-2a297.appspot.com",
  messagingSenderId: "547733378114",
  appId: "1:547733378114:web:8b8e8d54ba20e018d089db",
  measurementId: "G-YRJW46VDG8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export { app };

const auth = getAuth()

export { auth };
