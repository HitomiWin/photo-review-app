import React, { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { Spinner } from "react-bootstrap";
import { auth } from "../firebase";

const AuthContext = createContext();

const useAuthContext = () => {
  return useContext(AuthContext);
};

const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    await signOut(auth);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setIsLoading(false);
    });
  }, []);

  const values = {
    currentUser,
    isLoading,
    login,
    logout,
    signup,
  };

  return (
    <AuthContext.Provider value={values}>
      {isLoading && (
        <div className="center">
          <Spinner animation="border" variant="light" />;
        </div>
      )}
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

export { useAuthContext, AuthContextProvider as default };
