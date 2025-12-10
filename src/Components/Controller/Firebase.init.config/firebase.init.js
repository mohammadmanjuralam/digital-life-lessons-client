// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDpxnq030kISiU0AxT59yzTE3UPhkyCSR8",
  authDomain: "digital-life-deafd.firebaseapp.com",
  projectId: "digital-life-deafd",
  storageBucket: "digital-life-deafd.firebasestorage.app",
  messagingSenderId: "333931042954",
  appId: "1:333931042954:web:0df72128f65c18a433b573",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
