// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { collection, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC7yitywWkmT-tmJyDCWWvxpEuCMTAiO5g",
  authDomain: "pokemon-cdcba.firebaseapp.com",
  projectId: "pokemon-cdcba",
  storageBucket: "pokemon-cdcba.appspot.com",
  messagingSenderId: "607500967880",
  appId: "1:607500967880:web:4d4a9b7310b602407d2afd",
  measurementId: "G-88FL28YY22"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
export const firebaseDB = getFirestore(app);

export const usersRef = collection(firebaseDB, "users");
export const pokemonListRef = collection(firebaseDB, "pokemonList")