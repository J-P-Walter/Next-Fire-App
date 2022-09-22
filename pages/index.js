import styles from "../styles/Home.module.css";
import Link from "next/Link";

export default function Home() {
  return (
    <div>
      <Link href="edit">
        <a>Here is a link</a>
      </Link>
    </div>
  );
}
