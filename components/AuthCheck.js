import NextLink from "next/Link";
import { useContext } from "react";
import { UserContext } from "../lib/context";

//Component's children only shown to logged in users
export default function AuthCheck(props) {
  const { username } = useContext(UserContext);

  //If signed in, renders the children, if not, renders fallback or link to sign in page
  return username
    ? props.children
    : props.fallback || (
        <NextLink href="/enter">You must be signed in</NextLink>
      );
}
