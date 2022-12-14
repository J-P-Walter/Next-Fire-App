import { auth, db } from "./firebase";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { doc, onSnapshot } from "firebase/firestore";

export function useUserData() {
  const [user] = useAuthState(auth);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    let unsub;
    if (user) {
      unsub = onSnapshot(doc(db, "users", user.uid), (doc) => {
        setUsername(doc.data()?.username);
      });
    } else {
      setUsername(null);
    }
    return unsub;
  }, [user]);
  //console.log(`From hooks ${user}, ${username}`);
  return { user, username };
}
