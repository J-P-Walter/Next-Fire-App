// import firebase from "firebase/app";
// import "firebase/auth";
// import "firebase/firestore";
// import "firebase/storage";

import { initializeApp } from "firebase/app";
import { DocumentSnapshot, getFirestore } from "firebase/firestore";
import { GoogleAuthProvider } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { collection, query, where, getDocs, limit } from "firebase/firestore";

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

//Helper functions
/**
 * Gets a user/{uid} document with a username
 * @param {string} username
 */
export async function getUserWithUsername(username) {
  const usersRef = collection(db, "users");
  const q = query(usersRef, where("username", "==", username), limit(1));
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.at(0);
}
/**
 * Converts a firestore doc to JSON
 * @param {DocumentSnapshot} doc
 */
export function postToJSON(doc) {
  const data = doc.data();
  return {
    ...data,
    createdAt: data.createdAt.toMillis(),
    updatedAt: data.updatedAt.toMillis(),
  };
}
