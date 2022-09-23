import { auth, googleAuthProvider, db } from "../lib/firebase";
import { signInWithPopup, signOut } from "firebase/auth";
import { useContext, useEffect, useCallback, useState } from "react";
import { UserContext } from "../lib/context";
import { doc, getDoc, writeBatch } from "firebase/firestore";
import debounce from "lodash.debounce";

export default function Enter({}) {
  const { user, username } = useContext(UserContext);
  return (
    <main>
      {user ? (
        !username ? (
          <UsernameForm />
        ) : (
          <SignOutButton />
        )
      ) : (
        <SignInButton />
      )}
    </main>
  );
}

//Sign in with Google
function SignInButton() {
  const signInWithGoogle = async () => {
    await signInWithPopup(auth, googleAuthProvider)
      .then((result) => {
        const user = result.user;
        console.log(user);
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };

  return (
    <button className="btn-google" onClick={signInWithGoogle}>
      <img src={"/google.png"} /> Sign in with Google
    </button>
  );
}

//Sign out of google
function SignOutButton() {
  return <button onClick={() => signOut(auth)}>Sign Out</button>;
}

//Choose username if user doesn't have one yet
function UsernameForm() {
  const [formValue, setFormValue] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);

  const { user, username } = useContext(UserContext);

  //Check database for usename match after change to field
  //Debounce checks after typing stop, need useCallback to allow for
  //debounce to work
  const checkUsername = useCallback(
    debounce(async (username) => {
      if (username.length >= 3) {
        const docRef = doc(db, "usernames", username);
        const docSnap = await getDoc(docRef);
        console.log("Firestore read");

        setIsValid(!docSnap.exists());
        setLoading(false);
      }
    }, 500),
    []
  );

  useEffect(() => {
    checkUsername(formValue);
  }, [formValue]);

  const onChange = (e) => {
    //Converts to lowercase and checks against regex
    const val = e.target.value.toLowerCase();
    const re = /^(?=[a-zA_Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

    if (val.length < 3) {
      setFormValue(val);
      setLoading(false);
      setIsValid(false);
    }
    if (re.test(val)) {
      setFormValue(val);
      setLoading(true);
      setIsValid(false);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    //Refs for both docs for batch write
    const userDocRef = doc(db, "users", user.uid);
    const usernameDocRef = doc(db, "usernames", formValue);
    const batch = writeBatch(db);
    batch.set(userDocRef, {
      username: formValue,
      photoURL: user.photoURL,
      displayName: user.displayName,
    });
    batch.set(usernameDocRef, { uid: user.uid });

    await batch.commit();
  };

  return (
    !username && (
      <section>
        <h3>Choose Username</h3>
        <form onSubmit={onSubmit}>
          <input
            name="username"
            placeholder="username"
            value={formValue}
            onChange={onChange}
          />
          <UsernameMessage
            username={formValue}
            isValid={isValid}
            loading={loading}
          />
          <button type="submit" className="btn-green" disabled={!isValid}>
            Choose
          </button>
        </form>
      </section>
    )
  );
}

//Provides feedback to users about username status
function UsernameMessage({ username, isValid, loading }) {
  if (username.length == 0) {
    return <p></p>;
  }
  if (username.length < 4) {
    return <p>Username too short!</p>;
  }
  if (loading) {
    return <p>Checking...</p>;
  } else if (isValid) {
    return <p className="text-success">{username} available!</p>;
  } else if (username && !isValid) {
    return <p className="text-danger">Username taken!</p>;
  } else {
    return <p></p>;
  }
}
