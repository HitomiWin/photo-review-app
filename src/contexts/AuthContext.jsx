import React, { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { RingLoader } from 'react-spinners';
import { auth } from "../firebase/index";

const AuthContext = createContext();
const useAuthContext = () => {
  return useContext(AuthContext);
};

const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    await signOut(auth);
    navigate('/login')
  };

  const setDisplayName = (name) => {
    if (currentUser)
      return updateProfile(currentUser, {
        displayName: name,
      });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setIsLoading(false);
    });
  }, []);


  const values ={
    currentUser,
    isLoading,
    login,
    logout,
    signup,
    setDisplayName,
  }

  return (
    <AuthContext.Provider value ={values}>
      {isLoading && <RingLoader />}
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

export { useAuthContext, AuthContextProvider as default };
