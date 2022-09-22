// import firebase from "firebase/app";
// import "firebase/auth";
// import "firebase/firestore";
// import "firebase/storage";

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider } from "firebase/auth";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDZDKpM2pd3rLvtaWGH8YtGIAqjcwt6rK0",
  authDomain: "next-fire-b1112.firebaseapp.com",
  projectId: "next-fire-b1112",
  storageBucket: "next-fire-b1112.appspot.com",
  messagingSenderId: "630787827144",
  appId: "1:630787827144:web:d644abad39669b43498cfd",
};

const app = initializeApp(firebaseConfig);

// Auth exports
export const auth = getAuth();
export const googleAuthProvider = new GoogleAuthProvider();

export const db = getFirestore(app);
// export const storage = firebase.storage();
