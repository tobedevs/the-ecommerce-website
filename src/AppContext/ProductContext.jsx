import { createContext, useContext, useState, useEffect } from "react";

const ProductContext = createContext();

const SELECTED_PRODUCT_KEY = "selectedProduct"; // key used in localStorage

export function ProductProvider({ children, products }) {
  // Initialize selectedProduct from localStorage (if exists)
  const [selectedProduct, setSelectedProduct] = useState(() => {
    try {
      const saved = localStorage.getItem(SELECTED_PRODUCT_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch (error) {
      console.error("Failed to load selected product from localStorage:", error);
      return null;
    }
  });

  // Save selectedProduct to localStorage whenever it changes
  useEffect(() => {
    try {
      if (selectedProduct === null) {
        localStorage.removeItem(SELECTED_PRODUCT_KEY);
      } else {
        localStorage.setItem(SELECTED_PRODUCT_KEY, JSON.stringify(selectedProduct));
      }
    } catch (error) {
      console.error("Failed to save selected product to localStorage:", error);
    }
  }, [selectedProduct]);

  const value = {
    products,
    selectedProduct,
    setSelectedProduct,
    clearSelectedProduct: () => setSelectedProduct(null),
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  
  if (!context) {
    throw new Error("useProducts must be used within a ProductProvider");
  }

  return context;
}