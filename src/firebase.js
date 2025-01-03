// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDZnSL0uQNd3gkoHNZx6eXwfjufVXNz0lg",
  authDomain: "corporate-app-d022e.firebaseapp.com",
  projectId: "corporate-app-d022e",
  storageBucket: "corporate-app-d022e.firebasestorage.app",
  messagingSenderId: "300828421630",
  appId: "1:300828421630:web:657542afc564c5b3fea4af",
  measurementId: "G-SGPLFXTNHZ"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
