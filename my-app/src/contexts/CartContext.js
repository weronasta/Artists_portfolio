import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (artwork) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === artwork.id);
      if (existingItem) {
        // Zwiększ ilość o wartość `artwork.quantity`, ale nie przekraczaj maksymalnej dostępnej liczby
        return prev.map((item) =>
          item.id === artwork.id
            ? {
                ...item,
                quantity: Math.min(
                  item.quantity + artwork.quantity,
                  artwork.numberOf // Ograniczenie do maksymalnej liczby dostępnej w magazynie
                ),
              }
            : item
        );
      }
      // Jeśli produkt nie istnieje w koszyku, dodaj go z podaną ilością
      return [...prev, { ...artwork }];
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.min(Math.max(1, quantity), item.numberOf) }
          : item
      )
    );
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, updateQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};
