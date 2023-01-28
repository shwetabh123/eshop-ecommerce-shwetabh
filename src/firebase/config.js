
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

export const firebaseConfig = {
  apiKey: process.env.REACT_APP_FB_API_KEY,
  authDomain: "eshop-88d70.firebaseapp.com",
  projectId: "eshop-88d70",
  storageBucket: "eshop-88d70.appspot.com",
  messagingSenderId: "543747974058",
  appId: "1:543747974058:web:142ca1951854e9816d81d3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;