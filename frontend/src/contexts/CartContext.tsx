'use client';

import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import { Cart, CartItem, Product } from '@/types/product';
import { useAuth } from './AuthContext';

interface CartContextType {
  cart: Cart;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getItemQuantity: (productId: string) => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

type CartAction =
  | { type: 'ADD_TO_CART'; payload: { product: Product; quantity: number } }
  | { type: 'REMOVE_FROM_CART'; payload: { productId: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; payload: Cart }
  | { type: 'RESET_CART' };

const cartReducer = (state: Cart, action: CartAction): Cart => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const { product, quantity } = action.payload;
      const existingItem = state.items.find(item => item.product.id === product.id);
      
      if (existingItem) {
        // Update existing item quantity
        const updatedItems = state.items.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
        
        return {
          items: updatedItems,
          totalItems: state.totalItems + quantity,
          totalPrice: state.totalPrice + (product.price * quantity)
        };
      } else {
        // Add new item
        const newItem: CartItem = { product, quantity };
        return {
          items: [...state.items, newItem],
          totalItems: state.totalItems + quantity,
          totalPrice: state.totalPrice + (product.price * quantity)
        };
      }
    }
    
    case 'REMOVE_FROM_CART': {
      const { productId } = action.payload;
      const itemToRemove = state.items.find(item => item.product.id === productId);
      
      if (!itemToRemove) return state;
      
      return {
        items: state.items.filter(item => item.product.id !== productId),
        totalItems: state.totalItems - itemToRemove.quantity,
        totalPrice: state.totalPrice - (itemToRemove.product.price * itemToRemove.quantity)
      };
    }
    
    case 'UPDATE_QUANTITY': {
      const { productId, quantity } = action.payload;
      const itemIndex = state.items.findIndex(item => item.product.id === productId);
      
      if (itemIndex === -1) return state;
      
      const item = state.items[itemIndex];
      const quantityDiff = quantity - item.quantity;
      
      if (quantity <= 0) {
        // Remove item if quantity is 0 or negative
        return {
          items: state.items.filter(item => item.product.id !== productId),
          totalItems: state.totalItems - item.quantity,
          totalPrice: state.totalPrice - (item.product.price * item.quantity)
        };
      }
      
      const updatedItems = [...state.items];
      updatedItems[itemIndex] = { ...item, quantity };
      
      return {
        items: updatedItems,
        totalItems: state.totalItems + quantityDiff,
        totalPrice: state.totalPrice + (item.product.price * quantityDiff)
      };
    }
    
    case 'CLEAR_CART':
      return {
        items: [],
        totalItems: 0,
        totalPrice: 0
      };
      
    case 'LOAD_CART':
      return action.payload;
      
    case 'RESET_CART':
      return {
        items: [],
        totalItems: 0,
        totalPrice: 0
      };
      
    default:
      return state;
  }
};

const initialState: Cart = {
  items: [],
  totalItems: 0,
  totalPrice: 0
};

// Helper function to get cart key for localStorage
const getCartKey = (userId?: string): string => {
  return userId ? `cart_${userId}` : 'cart_guest';
};

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, dispatch] = useReducer(cartReducer, initialState);
  const { user, isAuthenticated } = useAuth();

  // Load cart from localStorage when user changes
  useEffect(() => {
    const cartKey = getCartKey(user?.id);
    const savedCart = localStorage.getItem(cartKey);
    
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        dispatch({ type: 'LOAD_CART', payload: parsedCart });
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
        // If there's an error, reset to empty cart
        dispatch({ type: 'RESET_CART' });
      }
    } else {
      // No saved cart found, reset to empty cart
      dispatch({ type: 'RESET_CART' });
    }
  }, [user?.id, isAuthenticated]);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    const cartKey = getCartKey(user?.id);
    localStorage.setItem(cartKey, JSON.stringify(cart));
  }, [cart, user?.id]);

  const addToCart = useCallback((product: Product, quantity: number = 1) => {
    dispatch({ type: 'ADD_TO_CART', payload: { product, quantity } });
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: { productId } });
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity } });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: 'CLEAR_CART' });
  }, []);

  const getItemQuantity = useCallback((productId: string): number => {
    const item = cart.items.find(item => item.product.id === productId);
    return item ? item.quantity : 0;
  }, [cart.items]);

  const value: CartContextType = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getItemQuantity
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
