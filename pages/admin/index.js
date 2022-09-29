import AuthCheck from "../../components/AuthCheck";

//Client rendering only since these pages don't need
//to be seen by webcrawlers
export default function AdminPostPage({}) {
  return (
    <main>
      <AuthCheck>
        <h1>Admin post page</h1>
      </AuthCheck>
    </main>
  );
}
