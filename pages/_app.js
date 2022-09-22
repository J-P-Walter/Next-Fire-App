import "../styles/globals.css";
import "../components/Navbar";
import Navbar from "../components/Navbar";
import { Toaster } from "react-hot-toast";

//Puts on every page, nice for navbar
function MyApp({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
      <Toaster />
    </>
  );
}

export default MyApp;
