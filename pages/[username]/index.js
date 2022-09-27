//[] around folder allows it to be dynamic, but static
//pages like admin are given priority

//This was such a headache, the first one does not need {}
import UserProfile from "../../components/UserProfile";
import { getUserWithUsername } from "../../lib/firebase";

//Rendering data for user and posts on server
export async function getServerSideProps({ query }) {
  const { username } = query; //from url

  const userDoc = await getUserWithUsername(username);
  //console.log(userDoc);

  let user = null;
  let posts = null;

  if (userDoc) {
    user = userDoc.data();
  }

  return {
    props: { user }, //passed to page component as props
  };
}

export default function UserProfilePage({ user }) {
  //console.log(user);
  return (
    <main>
      <UserProfile user={user} />
    </main>
  );
}
