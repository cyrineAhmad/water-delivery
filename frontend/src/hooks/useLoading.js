import { useState, createContext,useContext } from "react";
const LoadingContext = createContext({});

export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const hideLoading = () => setIsLoading(false);
  const showLoading = () => setIsLoading(true);
  return (
    <LoadingContext.Provider value={{ isLoading, showLoading, hideLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => useContext(LoadingContext);