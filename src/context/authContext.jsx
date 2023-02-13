import React, { createContext, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const AuthContext = createContext({
  userAuth: null,
});

export const ProviderAuthContext = function (props) {
  const storedAuthUser = localStorage.getItem("authUser");
  const [user, setUser] = useState(JSON.parse(storedAuthUser));
  // console.log(user, "authContext");

  const auth = getAuth();

  onAuthStateChanged(auth, (authUser) => {
    if (authUser) {
      //when user signed in
      localStorage.setItem("authUser", JSON.stringify(authUser));
      setUser(authUser);
    } else {
      //when user logged out
      localStorage.removeItem("authUser");
      setUser(null);
    }
  });

  return (
    <AuthContext.Provider value={{ userAuth: user }}>
      {props.children}
    </AuthContext.Provider>
  );
};
