
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "naveen-s-blog.firebaseapp.com",
  projectId: "naveen-s-blog",
  storageBucket: "naveen-s-blog.appspot.com",
  messagingSenderId: "440972740788",
  appId: "1:440972740788:web:a32782257935838ea3afe1"
};


export const app = initializeApp(firebaseConfig);