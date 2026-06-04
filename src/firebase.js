import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCJPg7L8hjmr0OTXcQU_o3Kita5buxQKkk",
  authDomain: "randevu-takip-sistem.firebaseapp.com",
  projectId: "randevu-takip-sistem",
  storageBucket: "randevu-takip-sistem.firebasestorage.app",
  messagingSenderId: "116206821914",
  appId: "1:116206821914:web:0cc6ebedd1896b1991a7a3",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
