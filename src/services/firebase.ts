import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDZDxAmQubgfNjc0B5qF0GjfF4ABq-khAQ",
  authDomain: "fittracker-fee91.firebaseapp.com",
  databaseURL:
    "https://fittracker-fee91-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "fittracker-fee91",
  storageBucket: "fittracker-fee91.firebasestorage.app",
  messagingSenderId: "834400635835",
  appId: "1:834400635835:web:1eef270d0c83a81463529e",
  measurementId: "G-DCJ6HDYSGB",
};

export const firebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
