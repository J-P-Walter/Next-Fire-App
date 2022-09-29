import AuthCheck from "../../components/AuthCheck";
import styles from "../../styles/Admin.module.css";
import PostFeed from "../../components/PostFeed";
import { UserContext } from "../../lib/context";
import { db, auth } from "../../lib/firebase";
import { useContext, useState } from "react";
import { useRouter } from "next/router";

import { useCollection } from "react-firebase-hooks/firestore";
import kebabCase from "lodash.kebabcase";
import toast from "react-hot-toast";
import {
  collection,
  doc,
  query,
  orderBy,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
import { async } from "@firebase/util";

//Client rendering only since these pages don't need
//to be seen by webcrawlers
export default function AdminPostPage({}) {
  return (
    <main>
      <AuthCheck>
        <PostList />
        <CreateNewPost />
      </AuthCheck>
    </main>
  );
}

function PostList() {
  const ref = collection(db, "users", auth.currentUser.uid, "posts");
  const q = query(ref, orderBy("createdAt"));
  const [querySnapshot] = useCollection(q);
  const posts = querySnapshot?.docs.map((doc) => doc.data());

  return (
    <>
      <h1>Manage your Posts</h1>
      <PostFeed posts={posts} admin />
    </>
  );
}

function CreateNewPost() {
  const router = useRouter();
  const { username } = useContext(UserContext);
  const [title, setTitle] = useState("");

  const slug = encodeURI(kebabCase(title));

  const isValid = title.length > 3 && title.length < 100;

  const createPost = async (e) => {
    e.preventDefault();

    const uid = auth.currentUser.uid;
    const ref = doc(db, "users", auth.currentUser.uid, "posts", slug);

    //Give all fields default value
    const data = {
      title,
      slug,
      uid,
      username,
      published: false,
      content: "# Hello World",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    await setDoc(ref, data);
    toast.success("Post created!");

    //Nav to edit page after creation
    router.push(`/admin/${slug}`);
  };

  return (
    <form onSubmit={createPost}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="My New Article!"
        className={styles.input}
      />
      <p>
        <strong>Slug:</strong> {slug}
      </p>
      <button type="submit" disabled={!isValid} className="btn-green">
        Create New Post
      </button>
    </form>
  );
}
