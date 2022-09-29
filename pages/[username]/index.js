//[] around folder allows it to be dynamic, but static
//pages like admin are given priority

//This was such a headache, the first one does not need {}
import UserProfile from "../../components/UserProfile";
import PostFeed from "../../components/PostFeed";
import { getUserWithUsername, getPosts, postToJSON } from "../../lib/firebase";
import MetaTags from "../../components/Metatags";
import { collection, query, where, orderBy, limit } from "firebase/firestore";

//Rendering data for user and posts on server
export async function getServerSideProps({ query }) {
  const { username } = query; //from url

  const userDoc = await getUserWithUsername(username);
  //console.log(userDoc);

  //Tells Nextjs to 404
  if (!userDoc) {
    return {
      notFound: true,
    };
  }

  let user = null;
  let posts = null;

  if (userDoc) {
    user = userDoc.data();
    posts = await getPosts(userDoc);
    // console.log(posts);
  }

  return {
    props: { user, posts }, //passed to page component as props
  };
}

export default function UserProfilePage({ user, posts }) {
  //console.log(user);
  return (
    <main>
      <MetaTags title="User Profile Page" />
      <UserProfile user={user} />
      <PostFeed posts={posts} />
    </main>
  );
}
