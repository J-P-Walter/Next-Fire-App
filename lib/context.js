import { createContext } from "react";

//allows for global use of user and username in all componenets
export const UserContext = createContext({ user: null, username: null });
