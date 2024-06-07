// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCNa1hhfSZsDfDFDjgXOQmeepv8sJK9_3Q",
  authDomain: "vantasticplus.firebaseapp.com",
  projectId: "vantasticplus",
  storageBucket: "vantasticplus.appspot.com",
  messagingSenderId: "1004209593929",
  appId: "1:1004209593929:web:5f6106dd9796d1d5e4e998",
  measurementId: "G-017805V4N3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);