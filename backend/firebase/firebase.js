// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDr-G81b08I8WgZSrbT9Rs80wn3Rkj2DUw",
  authDomain: "shopzone-deba018.firebaseapp.com",
  projectId: "shopzone-deba018",
  storageBucket: "shopzone-deba018.firebasestorage.app",
  messagingSenderId: "882529605742",
  appId: "1:882529605742:web:497cd140215da120ecae7f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// intialize the auth
const auth = getAuth(app);

// intialize the google provider
const provider = new GoogleAuthProvider();

export { app, auth, provider };
