'use client';

import Link from 'next/link';
import { useState } from 'react';
import CartIcon from './CartIcon';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { useSearch } from '@/contexts/SearchContext';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  
  const { user, isAuthenticated, logout } = useAuth();
  const { cart } = useCart();
  const { searchQuery, setSearchQuery, searchResults, isSearching } = useSearch();
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    router.push('/login');
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-gray-900">Giftie</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors">
              Trang chủ
            </Link>
            <Link href="/products" className="text-gray-700 hover:text-blue-600 transition-colors">
              Sản phẩm
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-blue-600 transition-colors">
              Về chúng tôi
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-blue-600 transition-colors">
              Liên hệ
            </Link>
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8 relative">
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Tìm kiếm sản phẩm..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <span className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 text-lg">🔍</span>
                {isSearching && (
                  <div className="absolute right-3 top-2.5">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                  </div>
                )}
              </div>
            </form>

            {/* Search Results Dropdown */}
            {searchQuery && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-96 overflow-y-auto z-50">
                {searchResults.slice(0, 5).map((product) => (
                  <Link
                    key={product.id}
                    href={`/products/${product.id}`}
                    className="flex items-center space-x-3 p-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                    onClick={() => setSearchQuery('')}
                  >
                    <div className="relative w-12 h-12 flex-shrink-0">
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {product.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {new Intl.NumberFormat('vi-VN', {
                          style: 'currency',
                          currency: 'VND'
                        }).format(product.price)}
                      </p>
                    </div>
                  </Link>
                ))}
                {searchResults.length > 5 && (
                  <div className="p-3 border-t border-gray-100">
                    <Link
                      href={`/search?q=${encodeURIComponent(searchQuery)}`}
                      className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                      onClick={() => setSearchQuery('')}
                    >
                      Xem tất cả {searchResults.length} kết quả
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            {/* Cart */}
            <CartIcon />

            {/* User Menu */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  {user?.avatar ? (
                    <Image
                      src={user.avatar}
                      alt={user.name}
                      width={32}
                      height={32}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-medium">
                        {user?.name?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                  <span className="hidden sm:block text-sm font-medium text-gray-700">
                    {user?.name}
                  </span>
                  <span className="text-gray-400">▼</span>
                </button>

                {/* User Dropdown Menu */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      Thông tin cá nhân
                    </Link>
                    <Link
                      href="/orders"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      Đơn hàng của tôi
                    </Link>
                    <Link
                      href="/wishlist"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      Danh sách yêu thích
                    </Link>
                    <div className="border-t border-gray-100">
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                      >
                        Đăng xuất
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="p-2 text-gray-700 hover:text-blue-600 transition-colors"
              >
                <span className="h-6 w-6 text-xl">👤</span>
              </Link>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-700 hover:text-blue-600 transition-colors"
            >
              {isMenuOpen ? <span className="h-6 w-6 text-xl">✕</span> : <span className="h-6 w-6 text-xl">☰</span>}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-4">
          <form onSubmit={handleSearch}>
            <div className="relative">
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <span className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 text-lg">🔍</span>
              {isSearching && (
                <div className="absolute right-3 top-2.5">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                </div>
              )}
            </div>
          </form>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-2 pt-4">
              <Link 
                href="/" 
                className="text-gray-700 hover:text-blue-600 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Trang chủ
              </Link>
              <Link 
                href="/products" 
                className="text-gray-700 hover:text-blue-600 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Sản phẩm
              </Link>
              <Link 
                href="/about" 
                className="text-gray-700 hover:text-blue-600 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Về chúng tôi
              </Link>
              <Link 
                href="/contact" 
                className="text-gray-700 hover:text-blue-600 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Liên hệ
              </Link>
              
              {/* Mobile User Menu */}
              {isAuthenticated ? (
                <>
                  <div className="border-t border-gray-200 pt-2 mt-2">
                    <div className="flex items-center space-x-2 py-2">
                      {user?.avatar ? (
                        <Image
                          src={user.avatar}
                          alt={user.name}
                          width={32}
                          height={32}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm font-medium">
                            {user?.name?.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      )}
                      <span className="text-sm font-medium text-gray-700">
                        {user?.name}
                      </span>
                    </div>
                    <Link 
                      href="/profile" 
                      className="block text-gray-700 hover:text-blue-600 transition-colors py-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Thông tin cá nhân
                    </Link>
                    <Link 
                      href="/orders" 
                      className="block text-gray-700 hover:text-blue-600 transition-colors py-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Đơn hàng của tôi
                    </Link>
                    <Link 
                      href="/wishlist" 
                      className="block text-gray-700 hover:text-blue-600 transition-colors py-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Danh sách yêu thích
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left text-red-600 hover:text-red-700 transition-colors py-2"
                    >
                      Đăng xuất
                    </button>
                  </div>
                </>
              ) : (
                <Link 
                  href="/login" 
                  className="text-gray-700 hover:text-blue-600 transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Đăng nhập
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
} 