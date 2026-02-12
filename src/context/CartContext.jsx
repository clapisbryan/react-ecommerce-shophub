import { createContext, useContext, useState } from "react";
import { getSingleProduct } from "../Store/product/productServices";

export const CartContext = createContext(null);

export default function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = async (productId) => {
        const product = await getSingleProduct(productId);

        setCartItems(prev => {
            const existing = prev.find(item => item.id === productId);

            if (existing) {
                return prev.map(item =>
                    item.id === productId
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }

            return [...prev, { id: productId, quantity: 1, product }];
        });
    };

    const removeFromCart = (productId) => {
        setCartItems(prev =>
            prev.filter(item => item.id !== productId)
        );
    };

    const updateQuantity = (productId, quantity) => {
        if (quantity <= 0) {
            removeFromCart(productId);
            return;
        }

        setCartItems(prev =>
            prev.map(item =>
                item.id === productId
                    ? { ...item, quantity }
                    : item
            )
        );
    };


    const getCartTotal = () => {
        return cartItems.reduce((total, item) => {
            return total + item.product.price * item.quantity;
        }, 0);
    };

    const clearCart = () => {
        setCartItems([]);
    }
    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                updateQuantity,
                getCartTotal, 
                clearCart
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}
