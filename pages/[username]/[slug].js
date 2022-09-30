import { db, postToJSON, getUserWithUsername } from "../../lib/firebase";
import {
  query,
  collectionGroup,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import PostContent from "../../components/PostContent";
import styles from "../../styles/Post.module.css";
import { useDocumentData } from "react-firebase-hooks/firestore";
import HeartButton from "../../components/HeartButton";
import AuthCheck from "../../components/AuthCheck";
import NextLink from "next/Link";
import { useContext } from "react";
import { UserContext } from "../../lib/context";

//Dynamic SSG needs get getStaticProps and getStaticPaths
export async function getStaticProps({ params }) {
  const { username, slug } = params;
  const userDoc = await getUserWithUsername(username);

  //console.log(username, slug);

  let post;
  let path;

  if (userDoc) {
    const docRef = doc(userDoc.ref, "posts", slug);
    const docSnap = await getDoc(docRef);
    //console.log(docSnap.data());

    post = postToJSON(docSnap);
    path = docRef.path;
  }

  return {
    props: { post, path },
    revalidate: 5000,
  };
}

export async function getStaticPaths() {
  const q = query(collectionGroup(db, "posts"));
  const querySnapshot = await getDocs(q);

  const paths = querySnapshot.docs.map((doc) => {
    const { slug, username } = doc.data();
    return {
      params: { username, slug },
    };
  });
  return {
    //must be
    //paths: [
    // {params: {username, slug}}
    //] ,
    paths,
    fallback: "blocking",
  };
}

export default function Post(props) {
  //Gets feed of data in realtime, defaults to prerendered from server if
  //realtime fails to load
  const postRef = doc(db, props.path);
  const [realtimePost] = useDocumentData(postRef);
  const post = realtimePost || props.post;
  const { user: currentUser } = useContext(UserContext);

  return (
    <main className={styles.container}>
      <section>
        <PostContent post={post} />
      </section>

      <aside className="card">
        <p>
          <strong>{post.heartCount || 0} ❤️</strong>
        </p>
        <AuthCheck
          fallback={
            <NextLink href="/enter">
              <button>❤️ Sign Up</button>
            </NextLink>
          }
        >
          <HeartButton postRef={postRef} />
        </AuthCheck>
        {currentUser?.uid === post.uid && (
          <NextLink href={`/admin/${post.slug}`}>
            <button className="btn-blue">Edit Post</button>
          </NextLink>
        )}
      </aside>
    </main>
  );
}
