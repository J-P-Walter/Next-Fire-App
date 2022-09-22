import styles from "../styles/Home.module.css";
import Link from "next/Link";
import Loader from "../components/Loader";
import toast from "react-hot-toast";

export default function Home() {
  return (
    <div>
      <button onClick={() => toast.success("Hello toast")}>T o a s t</button>
    </div>
  );
}
