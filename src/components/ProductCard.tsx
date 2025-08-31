'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types/product';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { useState, useEffect } from 'react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart, getItemQuantity } = useCart();
  const { user, isAuthenticated } = useAuth();
  const [isAdding, setIsAdding] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);
  
  const currentQuantity = getItemQuantity(product.id);

  useEffect(() => {
    if (isAuthenticated && user) {
      const wishlist = JSON.parse(localStorage.getItem(`wishlist_${user.id}`) || '[]');
      setIsInWishlist(wishlist.some((item: Product) => item.id === product.id));
    }
  }, [isAuthenticated, user, product.id]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={`h-4 w-4 text-lg ${
          i < Math.floor(rating)
            ? 'text-yellow-400'
            : i < rating
            ? 'text-yellow-400 opacity-50'
            : 'text-gray-300'
        }`}
      >
        {i < Math.floor(rating) ? '★' : i < rating ? '★' : '☆'}
      </span>
    ));
  };

  const handleAddToCart = async () => {
    if (!product.inStock) return;
    
    setIsAdding(true);
    addToCart(product, 1);
    
    // Simulate a brief loading state
    setTimeout(() => {
      setIsAdding(false);
    }, 500);
  };

  const toggleWishlist = () => {
    if (!isAuthenticated) {
      // Redirect to login if not authenticated
      window.location.href = '/login';
      return;
    }

    const wishlistKey = `wishlist_${user?.id}`;
    const currentWishlist = JSON.parse(localStorage.getItem(wishlistKey) || '[]');
    
    if (isInWishlist) {
      // Remove from wishlist
      const updatedWishlist = currentWishlist.filter((item: Product) => item.id !== product.id);
      localStorage.setItem(wishlistKey, JSON.stringify(updatedWishlist));
      setIsInWishlist(false);
    } else {
      // Add to wishlist
      const updatedWishlist = [...currentWishlist, product];
      localStorage.setItem(wishlistKey, JSON.stringify(updatedWishlist));
      setIsInWishlist(true);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden group">
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden">
        <Link href={`/products/${product.id}`}>
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            priority={false}
          />
        </Link>
        
        {/* Wishlist button */}
        <button 
          onClick={toggleWishlist}
          className={`absolute top-2 right-2 p-2 rounded-full shadow-md transition-colors ${
            isInWishlist 
              ? 'bg-red-500 hover:bg-red-600' 
              : 'bg-white hover:bg-gray-100'
          }`}
        >
          <span className={`h-4 w-4 text-lg ${
            isInWishlist ? 'text-white' : 'text-gray-600'
          }`}>
            {isInWishlist ? '❤️' : '🤍'}
          </span>
        </button>

        {/* Discount badge */}
        {product.originalPrice && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
            -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
          </div>
        )}

        {/* Out of stock badge */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white font-semibold">Hết hàng</span>
          </div>
        )}

        {/* Cart quantity badge */}
        {currentQuantity > 0 && (
          <div className="absolute bottom-2 right-2 bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
            {currentQuantity}
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Category */}
        <div className="text-xs text-gray-500 mb-1 uppercase tracking-wide">
          {product.category}
        </div>

        {/* Product Name */}
        <Link href={`/products/${product.id}`}>
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center mb-2">
          <div className="flex items-center mr-2">
            {renderStars(product.rating)}
          </div>
          <span className="text-xs text-gray-500">
            ({product.reviewCount})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center mb-3">
          <span className="text-lg font-bold text-gray-900">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-gray-500 line-through ml-2">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-3">
          {product.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={!product.inStock || isAdding}
          className={`w-full flex items-center justify-center space-x-2 py-2 px-4 rounded-lg font-medium transition-colors ${
            product.inStock && !isAdding
              ? 'bg-blue-600 hover:bg-blue-700 text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {isAdding ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              <span>Đang thêm...</span>
            </>
          ) : (
            <>
              <span className="text-lg">🛒</span>
              <span>
                {product.inStock 
                  ? currentQuantity > 0 
                    ? `Thêm vào giỏ (${currentQuantity})` 
                    : 'Thêm vào giỏ'
                  : 'Hết hàng'
                }
              </span>
            </>
          )}
        </button>
      </div>
    </div>
  );
} 