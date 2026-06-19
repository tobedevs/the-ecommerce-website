import { createContext, useContext, useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import toast from "react-hot-toast";
import { db } from "../firebase";

const FetchProductContext = createContext();

export const FetchProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
  const unsub = onSnapshot(
    collection(db, "products"),
    (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        firebaseId: doc.id,
        ...doc.data()
      }));

      setProducts(data);
    },
    (error) => {
      toast.error(error)
      console.error(error);
    }
  );

  return () => unsub();
}, []);

  return (
    <FetchProductContext.Provider value={{ products }}>
      {children}
    </FetchProductContext.Provider>
  );
};

export const useFetchedProducts = () => {
  return useContext(FetchProductContext);
};