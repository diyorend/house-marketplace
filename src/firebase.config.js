// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAlbJeov2j7tjTcuvvaECZOHeSB_wQbMUg",
  authDomain: "diyorend-house-marketplace.firebaseapp.com",
  projectId: "diyorend-house-marketplace",
  storageBucket: "diyorend-house-marketplace.appspot.com",
  messagingSenderId: "1026743776668",
  appId: "1:1026743776668:web:f0b148da0ed1aad7854459",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();
