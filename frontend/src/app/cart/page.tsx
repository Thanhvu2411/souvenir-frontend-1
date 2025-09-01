'use client';

import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const [isUpdating, setIsUpdating] = useState<string | null>(null);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const handleQuantityChange = async (productId: string, newQuantity: number) => {
    setIsUpdating(productId);
    updateQuantity(productId, newQuantity);
    
    // Simulate a brief loading state
    setTimeout(() => {
      setIsUpdating(null);
    }, 300);
  };

  const handleRemoveItem = (productId: string) => {
    removeFromCart(productId);
  };

  if (cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">🛒</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Giỏ hàng trống
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              {isAuthenticated 
                ? `${user?.name}, bạn chưa có sản phẩm nào trong giỏ hàng`
                : 'Bạn chưa có sản phẩm nào trong giỏ hàng'
              }
            </p>
            <Link
              href="/products"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
            >
              Tiếp tục mua sắm
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Giỏ hàng</h1>
          <div className="flex items-center justify-between mt-2">
            <p className="text-gray-600">
              Bạn có {cart.totalItems} sản phẩm trong giỏ hàng
            </p>
            {isAuthenticated && (
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <span>👤</span>
                <span>{user?.name}</span>
                <span>•</span>
                <span>Giỏ hàng riêng</span>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Sản phẩm ({cart.totalItems})
                  </h2>
                  <button
                    onClick={clearCart}
                    className="text-red-600 hover:text-red-700 text-sm font-medium"
                  >
                    Xóa tất cả
                  </button>
                </div>
              </div>

              <div className="divide-y divide-gray-200">
                {cart.items.map((item) => (
                  <div key={item.product.id} className="p-6">
                    <div className="flex items-center space-x-4">
                      {/* Product Image */}
                      <div className="relative w-20 h-20 flex-shrink-0">
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.name}
                          fill
                          className="object-cover rounded-lg"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <Link href={`/products/${item.product.id}`}>
                          <h3 className="text-lg font-medium text-gray-900 hover:text-blue-600 transition-colors">
                            {item.product.name}
                          </h3>
                        </Link>
                        <p className="text-sm text-gray-500 mt-1">
                          {item.product.category}
                        </p>
                        <div className="flex items-center mt-2">
                          <span className="text-lg font-bold text-gray-900">
                            {formatPrice(item.product.price)}
                          </span>
                          {item.product.originalPrice && (
                            <span className="text-sm text-gray-500 line-through ml-2">
                              {formatPrice(item.product.originalPrice)}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                          disabled={isUpdating === item.product.id}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50"
                        >
                          <span className="text-gray-600">−</span>
                        </button>
                        
                        <span className="w-12 text-center font-medium">
                          {isUpdating === item.product.id ? (
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mx-auto"></div>
                          ) : (
                            item.quantity
                          )}
                        </span>
                        
                        <button
                          onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                          disabled={isUpdating === item.product.id}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50"
                        >
                          <span className="text-gray-600">+</span>
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => handleRemoveItem(item.product.id)}
                        className="text-red-600 hover:text-red-700 p-2"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Tóm tắt đơn hàng
              </h2>
              
              {isAuthenticated && (
                <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center space-x-2 text-sm text-blue-800">
                    <span>👤</span>
                    <span>Giỏ hàng của {user?.name}</span>
                  </div>
                </div>
              )}
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tạm tính:</span>
                  <span className="font-medium">{formatPrice(cart.totalPrice)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Phí vận chuyển:</span>
                  <span className="font-medium text-green-600">Miễn phí</span>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Tổng cộng:</span>
                    <span>{formatPrice(cart.totalPrice)}</span>
                  </div>
                </div>
              </div>

              <Link
                href="/checkout"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors mb-4 block text-center"
              >
                Tiến hành thanh toán
              </Link>
              
              <Link
                href="/products"
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-3 px-4 rounded-lg transition-colors block text-center"
              >
                Tiếp tục mua sắm
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
