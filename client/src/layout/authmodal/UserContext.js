import { createContext, useState } from "react";

// create a UserContext object using createContext()
export const UserContext = createContext({});

// define a function component called UserContextProvider that accepts a 'children' prop
export function UserContextProvider({ children }) {
  // use the useState() hook to create a state variable called userInfo and a function to update it called setUserInfo. Initialize userInfo with an empty object.
  const [userInfo, setUserInfo] = useState({});

  // return a JSX element that renders the UserContext.Provider component, passing userInfo and setUserInfo as the values for the context
  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
}
