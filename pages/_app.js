import "../styles/globals.css";
import "../components/Navbar";
import Navbar from "../components/Navbar";
import { Toaster } from "react-hot-toast";
import { UserContext } from "../lib/context";
import { useUserData } from "../lib/hooks";

//Puts on every page
function MyApp({ Component, pageProps }) {
  const userData = useUserData();
  //console.log(`From _app ${userData.user}, ${userData.username}`);

  return (
    // Allows for user and username to be accessed by all child elements
    <UserContext.Provider value={userData}>
      <Navbar />
      <Component {...pageProps} />
      <Toaster />
    </UserContext.Provider>
  );
}

export default MyApp;
