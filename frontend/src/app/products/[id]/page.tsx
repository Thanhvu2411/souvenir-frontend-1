'use client';

import { useState, use } from 'react';
import Image from 'next/image';
import { mockProducts } from '@/lib/mock-data';
import { useCart } from '@/contexts/CartContext';

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  
  const { addToCart, getItemQuantity } = useCart();
  
  // Find the product by ID
  const { id } = use(params);
  const product = mockProducts.find(p => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Sản phẩm không tồn tại</h1>
          <p className="text-gray-600">Sản phẩm bạn đang tìm kiếm không có trong hệ thống.</p>
        </div>
      </div>
    );
  }

  const currentQuantity = getItemQuantity(product.id);

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
        className={`h-5 w-5 text-lg ${
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

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  const handleAddToCart = async () => {
    if (!product.inStock) return;
    
    setIsAdding(true);
    addToCart(product, quantity);
    
    // Simulate a brief loading state
    setTimeout(() => {
      setIsAdding(false);
    }, 500);
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= 99) {
      setQuantity(newQuantity);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* Product Images */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative aspect-square overflow-hidden rounded-lg">
                <Image
                  src={product.images[selectedImage]}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
                
                {/* Navigation arrows */}
                {product.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 p-2 rounded-full transition-all"
                    >
                      <span className="h-5 w-5 text-gray-800 text-lg">‹</span>
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 p-2 rounded-full transition-all"
                    >
                      <span className="h-5 w-5 text-gray-800 text-lg">›</span>
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnail Images */}
              {product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`relative aspect-square overflow-hidden rounded-lg border-2 transition-all ${
                        selectedImage === index
                          ? 'border-blue-500'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              {/* Category */}
              <div className="text-sm text-gray-500 uppercase tracking-wide">
                {product.category}
              </div>

              {/* Product Name */}
              <h1 className="text-3xl font-bold text-gray-900">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  {renderStars(product.rating)}
                  <span className="ml-2 text-sm text-gray-600">
                    {product.rating} ({product.reviewCount} đánh giá)
                  </span>
                </div>
              </div>

              {/* Price */}
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <span className="text-3xl font-bold text-gray-900">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xl text-gray-500 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                  {product.originalPrice && (
                    <span className="bg-red-500 text-white text-sm font-semibold px-2 py-1 rounded">
                      -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                    </span>
                  )}
                </div>
              </div>

              {/* Cart Status */}
              {currentQuantity > 0 && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <p className="text-blue-800 text-sm">
                    Bạn đã có {currentQuantity} sản phẩm này trong giỏ hàng
                  </p>
                </div>
              )}

              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Mô tả sản phẩm</h3>
                <p className="text-gray-600 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Tags */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Quantity and Add to Cart */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Số lượng
                  </label>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => handleQuantityChange(quantity - 1)}
                      disabled={quantity <= 1}
                      className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min="1"
                      max="99"
                      value={quantity}
                      onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                      className="w-20 h-10 border border-gray-300 rounded-lg text-center"
                    />
                    <button
                      onClick={() => handleQuantityChange(quantity + 1)}
                      disabled={quantity >= 99}
                      className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <button
                    onClick={handleAddToCart}
                    disabled={!product.inStock || isAdding}
                    className={`flex-1 flex items-center justify-center space-x-2 py-3 px-6 rounded-lg font-semibold transition-colors ${
                      product.inStock && !isAdding
                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {isAdding ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>Đang thêm...</span>
                      </>
                    ) : (
                      <>
                        <span className="h-5 w-5 text-lg">🛒</span>
                        <span>
                          {product.inStock ? 'Thêm vào giỏ hàng' : 'Hết hàng'}
                        </span>
                      </>
                    )}
                  </button>
                  
                  <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <span className="h-5 w-5 text-gray-600 text-lg">❤️</span>
                  </button>
                </div>
              </div>

              {/* Features */}
              <div className="border-t border-gray-200 pt-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-3">
                    <span className="h-5 w-5 text-blue-600 text-lg">🚚</span>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Giao hàng miễn phí</p>
                      <p className="text-xs text-gray-500">Đơn hàng từ 500k</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="h-5 w-5 text-green-600 text-lg">🛡️</span>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Bảo hành</p>
                      <p className="text-xs text-gray-500">30 ngày</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="h-5 w-5 text-purple-600 text-lg">🔄</span>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Đổi trả</p>
                      <p className="text-xs text-gray-500">7 ngày</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 