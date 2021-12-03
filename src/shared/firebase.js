import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBOQ-MjJVKn4xYU0sURCkEkhUJ0b9fA1lM",
  authDomain: "image-community-9ee25.firebaseapp.com",
  projectId: "image-community-9ee25",
  storageBucket: "image-community-9ee25.appspot.com",
  messagingSenderId: "313087633611",
  appId: "1:313087633611:web:f046ccba1ef2828516134e",
  measurementId: "G-HVRC2X50EV",
};

firebase.initializeApp(firebaseConfig);

const apiKey = firebaseConfig.apiKey;

const auth = firebase.auth();

const storage = firebase.storage()

const firestore = firebase.firestore();



export { auth, apiKey, firestore, storage };
