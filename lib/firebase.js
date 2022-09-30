import { initializeApp } from "firebase/app";
import {
  DocumentSnapshot,
  FieldValue,
  getFirestore,
  orderBy,
  Timestamp,
} from "firebase/firestore";
import { GoogleAuthProvider } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { collection, query, where, getDocs, limit } from "firebase/firestore";
import { getStorage } from "firebase/storage";

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
export const fromMillis = Timestamp.fromMillis;
export const storage = getStorage(app);

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
 * Gets posts from doc
 * @param {DocumentSnapshot}
 */
export async function getPosts(doc) {
  //Collection is in document so we can use doc.ref as reference
  const postsRef = collection(doc.ref, "posts");
  const q = query(
    postsRef,
    where("published", "==", true),
    orderBy("createdAt", "desc"),
    limit(5)
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(postToJSON);
}
/**
 * Converts a firestore doc to JSON
 * @param {DocumentSnapshot} doc
 */
export function postToJSON(doc) {
  const data = doc.data();
  //console.log(data);
  return {
    ...data,
    createdAt: data.createdAt.toMillis(),
    updatedAt: data.updatedAt.toMillis(),
  };
}
