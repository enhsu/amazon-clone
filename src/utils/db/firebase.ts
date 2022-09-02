import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// const firebaseConfig = JSON.parse(process.env.FIREBASE_CONFIG as string);
const firebaseConfig = {
  apiKey: "AIzaSyAZ4aDaprBPaGlxa1kL471heSKcUXPW1-s",
  authDomain: "clone-5f46a.firebaseapp.com",
  projectId: "clone-5f46a",
  storageBucket: "clone-5f46a.appspot.com",
  messagingSenderId: "153200905029",
  appId: "1:153200905029:web:8ce08e0a8f5fb535a54c2c",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const db = getFirestore(app);

export default db;
