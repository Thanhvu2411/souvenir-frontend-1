'use client';

import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';

export default function CartIcon() {
  const { cart } = useCart();

  return (
    <Link href="/cart" className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors">
      <div className="relative">
        <svg 
          className="w-6 h-6" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" 
          />
        </svg>
        
        {/* Cart badge */}
        {cart.totalItems > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
            {cart.totalItems > 99 ? '99+' : cart.totalItems}
          </span>
        )}
      </div>
    </Link>
  );
}
