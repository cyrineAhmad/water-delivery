import React, { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext(null);
const CART_KEY = 'cart';
const EMPTY_CART = {
  items: [],
  totalPrice: 0,
  totalCount: 0,
};

export default function CartProvider({ children }) {
    const initCart = getCartFromLocalStorage();
    const [cartItems, setCartItems] = useState(initCart.items);
    const [totalPrice, setTotalPrice] = useState(initCart.totalPrice);
    const [totalCount, setTotalCount] = useState(initCart.totalCount);

    useEffect(() => {
        const totalPrice = sum(cartItems.map(item => item.price));
        const totalCount = sum(cartItems.map(item => item.quantity));
        setTotalPrice(totalPrice);
        setTotalCount(totalCount);

        localStorage.setItem(
            CART_KEY,
            JSON.stringify({
                items: cartItems,
                totalPrice,
                totalCount,
            })
        );
    }, [cartItems]);

    function getCartFromLocalStorage() {
        const storedCart = localStorage.getItem(CART_KEY);
        return storedCart ? JSON.parse(storedCart) : EMPTY_CART;
    }

    const sum = items => items.reduce((prevValue, curValue) => prevValue + curValue, 0);

    const removeFromCart = waterId => {
        const filteredCartItems = cartItems.filter(item => item.water.id !== waterId);
        setCartItems(filteredCartItems);
    };

    const changeQuantity = (cartItem, newQuantity) => {
        const { water } = cartItem;
        const changedCartItem = {
            ...cartItem,
            quantity: newQuantity,
            price: water.price * newQuantity,
        };

        setCartItems(
            cartItems.map(item => (item.water.id === water.id ? changedCartItem : item))
        );
    };

    const addToCart = water => {
        const cartItem = cartItems.find(item => item.water.id === water.id);
        if (cartItem) {
            changeQuantity(cartItem, cartItem.quantity + 1);
        } else {
            setCartItems([...cartItems, { water, quantity: 1, price: water.price }]);
        }
    };

    const clearCart = () => {
        localStorage.removeItem(CART_KEY);
        const { items, totalCount, totalPrice } = EMPTY_CART;
        setCartItems(items);
        setTotalCount(totalCount);
        setTotalPrice(totalPrice);
    };

    return (
        <CartContext.Provider
            value={{
                cart: { items: cartItems, totalPrice, totalCount },
                removeFromCart,
                changeQuantity,
                addToCart,
                clearCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => useContext(CartContext);
