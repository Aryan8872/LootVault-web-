import  { createContext, useContext, useState } from 'react';

// Create Context
const CartContext = createContext();

// Create Provider Component
export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);
    const [itemCount, setItemCount] = useState(0);

    // Add to cart function
    const addToCart = (product) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.id === product.id);
            
            if (existingItem) {
                return prevCart.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            
            return [...prevCart, { ...product, quantity: 1 }];
        });
        
        setItemCount(prev => prev + 1);
    };

    // Remove from cart function
    const removeFromCart = (productId) => {
        setCart(prevCart => {
            const item = prevCart.find(item => item.id === productId);
            
            if (item.quantity > 1) {
                return prevCart.map(item =>
                    item.id === productId
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                );
            }
            
            return prevCart.filter(item => item.id !== productId);
        });
        
        setItemCount(prev => prev - 1);
    };

    // Clear cart function
    const clearCart = () => {
        setCart([]);
        setItemCount(0);
    };

    return (
        <CartContext.Provider value={{
            cart,
            itemCount,
            addToCart,
            removeFromCart,
            clearCart
        }}>
            {children}
        </CartContext.Provider>
    );
}

// Custom hook for using cart context
export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}