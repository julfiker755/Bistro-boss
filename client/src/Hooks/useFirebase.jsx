// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDFMFowW2MqayBvZM5acNqKFFvjgX-Xyfk",
  authDomain: "bisstroboss.firebaseapp.com",
  projectId: "bisstroboss",
  storageBucket: "bisstroboss.appspot.com",
  messagingSenderId: "120520219276",
  appId: "1:120520219276:web:4b6bbebb7e73213684f9a9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app)
export default auth;