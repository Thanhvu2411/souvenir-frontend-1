'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { mockProducts } from '@/lib/mock-data';
import { Product } from '@/types/product';
import Image from 'next/image';
import Link from 'next/link';

export default function WishlistPage() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    // Load wishlist from localStorage
    const loadWishlist = () => {
      const savedWishlist = JSON.parse(localStorage.getItem(`wishlist_${user?.id}`) || '[]');
      setWishlist(savedWishlist);
      setLoading(false);
    };

    loadWishlist();
  }, [isAuthenticated, user?.id, router]);

  const removeFromWishlist = (productId: string) => {
    const updatedWishlist = wishlist.filter(product => product.id !== productId);
    setWishlist(updatedWishlist);
    localStorage.setItem(`wishlist_${user?.id}`, JSON.stringify(updatedWishlist));
  };

  const addToWishlist = (product: Product) => {
    const isInWishlist = wishlist.some(item => item.id === product.id);
    if (!isInWishlist) {
      const updatedWishlist = [...wishlist, product];
      setWishlist(updatedWishlist);
      localStorage.setItem(`wishlist_${user?.id}`, JSON.stringify(updatedWishlist));
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Đang tải...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Danh sách yêu thích</h1>
          <p className="text-gray-600 mt-2">
            Quản lý sản phẩm yêu thích của bạn
          </p>
        </div>

        {wishlist.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">❤️</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Danh sách yêu thích trống
            </h2>
            <p className="text-gray-600 mb-8">
              Bạn chưa có sản phẩm nào trong danh sách yêu thích
            </p>
            <Link
              href="/products"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
            >
              Khám phá sản phẩm
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlist.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                {/* Product Image */}
                <div className="relative h-48">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                  {product.originalPrice && product.originalPrice > product.price && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                      -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                    </div>
                  )}
                  {!product.inStock && (
                    <div className="absolute top-2 right-2 bg-gray-500 text-white text-xs font-bold px-2 py-1 rounded">
                      Hết hàng
                    </div>
                  )}
                  <button
                    onClick={() => removeFromWishlist(product.id)}
                    className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-1 rounded-full transition-colors"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <Link href={`/products/${product.id}`}>
                    <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors mb-2">
                      {product.name}
                    </h3>
                  </Link>
                  
                  <div className="flex items-center mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-sm text-gray-500 ml-1">({product.reviewCount})</span>
                  </div>

                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-gray-900">
                        {formatPrice(product.price)}
                      </span>
                      {product.originalPrice && product.originalPrice > product.price && (
                        <span className="text-sm text-gray-500 line-through">
                          {formatPrice(product.originalPrice)}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Link
                      href={`/products/${product.id}`}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors text-center"
                    >
                      Xem chi tiết
                    </Link>
                    <button
                      onClick={() => removeFromWishlist(product.id)}
                      className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition-colors"
                      title="Xóa khỏi danh sách yêu thích"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
