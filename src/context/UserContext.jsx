// src/context/UserContext.jsx
import { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Si querés mantener la sesión tras recarga:
  useEffect(() => {
  const stored = localStorage.getItem('user');
  if (stored && stored !== "undefined") {
    try {
      const savedUser = JSON.parse(stored);
      setUser(savedUser);
    } catch (err) {
      console.error("Error parsing user from localStorage", err);
      localStorage.removeItem('user');
    }
  }
}, []);


  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
