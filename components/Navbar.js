import NextLink from "next/Link";
import { useContext } from "react";
import { UserContext } from "../lib/context";
import { auth } from "../lib/firebase";
import { signOut } from "firebase/auth";

export default function Navbar() {
  const { user, username } = useContext(UserContext);

  return (
    <nav className="navbar">
      <ul>
        <li>
          <NextLink href="/">
            <button className="btn-logo">FEED</button>
          </NextLink>
        </li>

        {/* User signed in and has username */}
        {username && (
          <>
            <li className="push-left">
              <NextLink href="/admin">
                <button className="btn-blue">Write Post</button>
              </NextLink>
            </li>
            <li>
              <NextLink href="/enter">
                <button>Sign Out</button>
              </NextLink>
            </li>
            <li>
              <NextLink href={`/${username}`}>
                <img src={user?.photoURL} />
              </NextLink>
            </li>
          </>
        )}

        {/* User not signed in or does not have username */}
        {!username && (
          <li>
            <NextLink href="/enter">
              <button className="btn-blue">Log in</button>
            </NextLink>
          </li>
        )}
      </ul>
    </nav>
  );
}
