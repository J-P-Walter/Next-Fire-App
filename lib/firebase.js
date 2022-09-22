import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDZDKpM2pd3rLvtaWGH8YtGIAqjcwt6rK0",
  authDomain: "next-fire-b1112.firebaseapp.com",
  projectId: "next-fire-b1112",
  storageBucket: "next-fire-b1112.appspot.com",
  messagingSenderId: "630787827144",
  appId: "1:630787827144:web:d644abad39669b43498cfd",
};

if (!firebase.getApps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();
