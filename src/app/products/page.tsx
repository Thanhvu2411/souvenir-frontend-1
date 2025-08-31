'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard from '@/components/ProductCard';
import { mockProducts, mockCategories } from '@/lib/mock-data';
import { Product, Category } from '@/types/product';

function ProductsPageContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') ?? '';
  const [products] = useState<Product[]>(mockProducts);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(mockProducts);
  const [categories] = useState<Category[]>(mockCategories);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [appliedPriceRange, setAppliedPriceRange] = useState({ min: '', max: '' });
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const productsPerPage = 12;

  useEffect(() => {
    setSelectedCategory(initialCategory);
  }, [initialCategory]);

  // Filter and sort products
  useEffect(() => {
    let filtered = [...products];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Category filter
    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Price range filter
    if (appliedPriceRange.min || appliedPriceRange.max) {
      filtered = filtered.filter(product => {
        const price = product.price;
        const min = appliedPriceRange.min ? parseInt(appliedPriceRange.min) : 0;
        const max = appliedPriceRange.max ? parseInt(appliedPriceRange.max) : Infinity;
        return price >= min && price <= max;
      });
    }

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [products, searchQuery, selectedCategory, appliedPriceRange, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setPriceRange({ min: '', max: '' });
    setAppliedPriceRange({ min: '', max: '' });
    setSortBy('name');
  };

  const applyPriceFilter = () => {
    setAppliedPriceRange(priceRange);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  // Get min and max prices from products
  const minPrice = Math.min(...products.map(p => p.price));
  const maxPrice = Math.max(...products.map(p => p.price));

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Tất cả sản phẩm</h1>
          <p className="text-gray-600">
            Khám phá {filteredProducts.length} sản phẩm lưu niệm đặc trưng Việt Nam
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 text-lg">🔍</span>
                <input
                  type="text"
                  placeholder="Tìm kiếm sản phẩm..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Sort */}
            <div className="flex items-center space-x-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="name">Sắp xếp theo tên</option>
                <option value="price-low">Giá tăng dần</option>
                <option value="price-high">Giá giảm dần</option>
                <option value="rating">Đánh giá cao nhất</option>
              </select>

              {/* View Mode */}
              <div className="flex border border-gray-300 rounded-lg">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600'}`}
                >
                  <span className="h-5 w-5 text-lg">⊞</span>
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600'}`}
                >
                  <span className="h-5 w-5 text-lg">☰</span>
                </button>
              </div>

              {/* Filter Toggle */}
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="lg:hidden flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg"
              >
                <span className="h-5 w-5 text-lg">🔧</span>
                <span>Bộ lọc</span>
                <span className={`h-4 w-4 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`}>▼</span>
              </button>
            </div>
          </div>

          {/* Mobile Filters */}
          {isFilterOpen && (
            <div className="lg:hidden mt-4 pt-4 border-t border-gray-200">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Danh mục
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="">Tất cả danh mục</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Giá tối thiểu
                  </label>
                  <input
                    type="number"
                    placeholder="0"
                    value={priceRange.min}
                    onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Giá tối đa
                  </label>
                  <input
                    type="number"
                    placeholder="Không giới hạn"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div className="flex items-end">
                  <button
                    onClick={applyPriceFilter}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                  >
                    Áp dụng giá
                  </button>
                </div>
              </div>
              <button
                onClick={clearFilters}
                className="mt-4 text-blue-600 hover:text-blue-700 text-sm"
              >
                Xóa bộ lọc
              </button>
            </div>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Filters */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Bộ lọc</h3>
              
              {/* Category Filter */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Danh mục</h4>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="">Tất cả danh mục</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range Filter */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Khoảng giá</h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Giá tối thiểu</label>
                    <input
                      type="number"
                      placeholder="0"
                      value={priceRange.min}
                      onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Giá tối đa</label>
                    <input
                      type="number"
                      placeholder="Không giới hạn"
                      value={priceRange.max}
                      onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  
                  {/* Price range info */}
                  <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded">
                    <p>Giá từ: {formatPrice(minPrice)} - {formatPrice(maxPrice)}</p>
                  </div>

                  {/* Apply button */}
                  <button
                    onClick={applyPriceFilter}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                  >
                    Áp dụng giá
                  </button>

                  {/* Applied filter display */}
                  {(appliedPriceRange.min || appliedPriceRange.max) && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <p className="text-sm font-medium text-blue-900 mb-1">Đã áp dụng:</p>
                      <p className="text-xs text-blue-700">
                        {appliedPriceRange.min && `Từ ${formatPrice(parseInt(appliedPriceRange.min))}`}
                        {appliedPriceRange.min && appliedPriceRange.max && ' - '}
                        {appliedPriceRange.max && `Đến ${formatPrice(parseInt(appliedPriceRange.max))}`}
                        {!appliedPriceRange.min && !appliedPriceRange.max && 'Tất cả giá'}
                      </p>
                      <button
                        onClick={() => setAppliedPriceRange({ min: '', max: '' })}
                        className="text-xs text-blue-600 hover:text-blue-700 mt-1"
                      >
                        Xóa bộ lọc giá
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Clear All Filters */}
              <button
                onClick={clearFilters}
                className="w-full text-blue-600 hover:text-blue-700 text-sm border border-blue-200 rounded-lg py-2 transition-colors"
              >
                Xóa tất cả bộ lọc
              </button>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {currentProducts.length > 0 ? (
              <>
                <div className={`grid gap-6 ${
                  viewMode === 'grid' 
                    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                    : 'grid-cols-1'
                }`}>
                  {currentProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-12 flex justify-center">
                    <nav className="flex items-center space-x-2">
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-3 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                      >
                        Trước
                      </button>
                      
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className={`px-3 py-2 border rounded-lg ${
                            currentPage === page
                              ? 'bg-blue-600 text-white border-blue-600'
                              : 'border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          {page}
                        </button>
                      ))}
                      
                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-3 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                      >
                        Sau
                      </button>
                    </nav>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">Không tìm thấy sản phẩm nào phù hợp.</p>
                <button
                  onClick={clearFilters}
                  className="mt-4 text-blue-600 hover:text-blue-700"
                >
                  Xóa bộ lọc
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="p-6">Đang tải...</div>}>
      <ProductsPageContent />
    </Suspense>
  );
}