import { db, auth } from "../lib/firebase";
import { useDocument, useDocumentData } from "react-firebase-hooks/firestore";
import { doc, writeBatch, increment } from "firebase/firestore";

export default function Heart({ postRef }) {
  const heartRef = doc(postRef, "hearts", auth.currentUser.uid);
  //console.log(useDocumentData(heartRef));
  const heartData = useDocumentData(heartRef);
  console.log(heartData[0]?.exists);

  const removeHeart = async () => {
    const batch = writeBatch(db);
    batch.update(postRef, { heartCount: increment(-1) });
    batch.delete(heartRef);

    await batch.commit();
  };

  const addHeart = async () => {
    const uid = auth.currentUser.uid;

    const batch = writeBatch(db);
    batch.update(postRef, { heartCount: increment(1) });
    batch.set(heartRef, { uid });

    await batch.commit();
  };

  return typeof heartData[0] !== "undefined" ? (
    <button onClick={removeHeart}>💔 Unheart</button>
  ) : (
    <button onClick={addHeart}>❤️ Heart</button>
  );
}
