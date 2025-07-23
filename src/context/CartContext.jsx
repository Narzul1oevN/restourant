// src/context/CartContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const CartContext = createContext();

const API_URL = "https://bahtiyor.learn-it-academy.site/api/menu/";

export const CartProvider = ({ children }) => {
  // cartData stores { id: dishId, portionId: portionId, count: number }
  const [cartData, setCartData] = useState(() => {
    const savedCart = localStorage.getItem('cartItems');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Save cartData to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartData));
  }, [cartData]);

  // Fetches detailed item data from API (used for displaying in cart dialog)
  const getCartItemsDetails = async () => {
    const detailedItems = [];
    for (const cartItem of cartData) {
      try {
        const response = await axios.get(`${API_URL}${cartItem.id}/`);
        const dishData = response.data;
        const selectedPortion = dishData.portion_options.find(
          (p) => p.id === cartItem.portionId
        );

        if (dishData && selectedPortion) {
          detailedItems.push({
            ...dishData,
            count: cartItem.count,
            selectedPortion: selectedPortion,
          });
        }
      } catch (error) {
        console.error(`Error fetching dish with ID ${cartItem.id}:`, error);
        toast.error(`Ошибка загрузки товара из корзины: ${dishData.name}`);
      }
    }
    return detailedItems;
  };

  const getCartItemCount = (dishId, portionId) => {
    const item = cartData.find(
      (i) => i.id === dishId && i.portionId === portionId
    );
    return item ? item.count : 0;
  };

  const addToCart = (dishId, portionId) => {
    setCartData((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (item) => item.id === dishId && item.portionId === portionId
      );

      if (existingItemIndex > -1) {
        const newCart = [...prevCart];
        newCart[existingItemIndex].count += 1;
        return newCart;
      } else {
        return [...prevCart, { id: dishId, portionId: portionId, count: 1 }];
      }
    });

    // Вынеси уведомление отдельно
    const existingItem = cartData.find(
      (item) => item.id === dishId && item.portionId === portionId
    );

    if (existingItem) {
      toast.success('Количество товара увеличено!');
    } else {
      toast.success('Товар добавлен в корзину!');
    }
  };


  const increaseCount = (dishId, portionId) => {
    setCartData((prevCart) => {
      toast.success('Количество товара увеличено!');
      return prevCart.map((item) =>
        item.id === dishId && item.portionId === portionId
          ? { ...item, count: item.count + 1 }
          : item
      );
    });
  };

  const decreaseCount = (dishId, portionId) => {
    setCartData((prevCart) => {
      const updatedCart = prevCart
        .map((item) =>
          item.id === dishId && item.portionId === portionId
            ? { ...item, count: item.count - 1 }
            : item
        )
        .filter((item) => item.count > 0); // Remove items with count 0

      if (updatedCart.length < prevCart.length) {
        toast.success('Товар удален из корзины.');
      } else {
        toast.success('Количество товара уменьшено.');
      }
      return updatedCart;
    });
  };

  const clearCart = () => {
    setCartData([]);
    toast.success('Корзина очищена!');
  };

  const getTotalItems = () => {
    return cartData.reduce((acc, item) => acc + item.count, 0);
  };

  const getTotalPrice = async () => {
    let total = 0;
    const items = await getCartItemsDetails();
    for (const item of items) {
      total += item.selectedPortion.price * item.count;
    }
    return total;
  };


  const value = {
    cartData,
    getCartItemCount,
    addToCart,
    increaseCount,
    decreaseCount,
    clearCart,
    getTotalItems,
    getCartItemsDetails,
    getTotalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  return useContext(CartContext);
};