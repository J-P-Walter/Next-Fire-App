import "../styles/globals.css";
import "../components/Navbar";
import Navbar from "../components/Navbar";
import { Toaster } from "react-hot-toast";
import { UserContext } from "../lib/context";

//Puts on every page, nice for navbar
function MyApp({ Component, pageProps }) {
  return (
    // Allows for user and username to be accessed by all child elements
    <UserContext.Provider value={{ user: {}, username: {} }}>
      <Navbar />
      <Component {...pageProps} />
      <Toaster />
    </UserContext.Provider>
  );
}

export default MyApp;
