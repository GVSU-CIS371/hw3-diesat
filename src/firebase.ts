import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBD-E__y0m4K4lYHZYYaLL6REdEd1DxPyk",

  authDomain: "cis371hw3-56ba9.firebaseapp.com",

  projectId: "cis371hw3-56ba9",

  storageBucket: "cis371hw3-56ba9.firebasestorage.app",

  messagingSenderId: "684708990367",

  appId: "1:684708990367:web:56b754bfe9f341febd81aa",

  measurementId: "G-5GLJFT2DL9"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
