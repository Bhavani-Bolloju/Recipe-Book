import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDeySlggoPfs0XdqIJAZQ6KMkqDzKBYCrE",
  authDomain: "recipe-book-89a8c.firebaseapp.com",
  projectId: "recipe-book-89a8c",
  storageBucket: "recipe-book-89a8c.appspot.com",
  messagingSenderId: "425156932566",
  appId: "1:425156932566:web:112f04bc52f3f61d76aa77",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
