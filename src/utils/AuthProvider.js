import React, { createContext, useContext, useState, useEffect } from "react"

const AuthContext = createContext()

const IS_AUTHENTICATED = 'isAuthenticated'
const isAuthenticatedInLocalStorage = localStorage.getItem(IS_AUTHENTICATED) === 'true'
const setAuthenticationOnLocalStorage = (authenticationValue) => localStorage.setItem(IS_AUTHENTICATED, authenticationValue)


export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(isAuthenticatedInLocalStorage)

  useEffect(() => {
    if (isAuthenticatedInLocalStorage) {
      setIsAuthenticated(true)
    }
  }, [])

  const login = () => {
    setIsAuthenticated(true);
    setAuthenticationOnLocalStorage(true)
  };

  const logout = () => {
    setIsAuthenticated(false);
    setAuthenticationOnLocalStorage(false)
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
