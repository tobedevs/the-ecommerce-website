import { createContext, useState, useContext } from "react";

const AppContext = createContext();

export function AppProvider({ children }) {

  const [message, setMessage] = useState("");

  return (
    <AppContext.Provider value={{ message, setMessage }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
