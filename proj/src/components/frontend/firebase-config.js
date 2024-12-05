// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCzrr2gSKQDVi-jvaR0hFjlHlGzFG60tfk",
  authDomain: "chatapp-c7199.firebaseapp.com",
  projectId: "chatapp-c7199",
  storageBucket: "chatapp-c7199.firebasestorage.app",
  messagingSenderId: "988119054990",
  appId: "1:988119054990:web:765289b82fc5413bf827df"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);