import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

const CART_STORAGE_KEY = 'my-cart-items'; // you can change this name

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
      return [];
    }
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }, [cart]); 

  const add = (id, color, quantity, image, name, sizes, price) => {
    console.log("clicked", price);
    
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) => item.id === id && item.color === color && item.sizes === sizes && item.price
      );

      if (existingIndex !== -1) {
        // Update quantity of existing item
        return prevCart.map((item, index) =>
          index === existingIndex
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      if (quantity <= 0) {
              alert("Please select quantity");
              return;
            }
      else{
        return [
        ...prevCart, 
        { 
          id, 
          color,
          quantity, 
          sizes, 
          image,
          name, 
          price 
        }]}
    });
  };

  const remove = (id, color, sizes) => {
    setCart((prevCart) =>
      prevCart.filter((item) => !(item.id === id && item.color === color && item.sizes === sizes))
    );
  };

  const updateQuantity = (id, color, sizes, newQuantity, price) => {
    if (newQuantity < 1) {
      remove(id, color, sizes, price);
      return;
    }

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id && item.color === color
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const value = {
    cart,
    add,
    remove,
    updateQuantity,
    clearCart,
    //totalItems: cart.reduce((sum, item) => sum + item.quantity, 0),
    totalPrice: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    totalUniqueItems: cart.length,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }

  return context;
};  