// src/UrlContext.js
import { createContext, useContext } from "react";

const UrlContext = createContext();

export const UrlProvider = ({ children }) => {
  const baseURL = "https://quizzapp-oulw.onrender.com"; // Change this to your desired URL

  return (
    <UrlContext.Provider value={{ baseURL }}>{children}</UrlContext.Provider>
  );
};

// Custom hook for easier access
export const useUrl = () => useContext(UrlContext);
