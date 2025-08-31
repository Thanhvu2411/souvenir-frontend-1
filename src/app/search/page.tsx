'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useSearch } from '@/contexts/SearchContext';
import { mockProducts } from '@/lib/mock-data';
import { Product } from '@/types/product';
import ProductCard from '@/components/ProductCard';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const { searchResults, isSearching, performSearch } = useSearch();
  const [results, setResults] = useState<Product[]>([]);

  useEffect(() => {
    if (query) {
      performSearch(query);
    }
  }, [query, performSearch]);

  useEffect(() => {
    setResults(searchResults);
  }, [searchResults]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  if (isSearching) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Đang tìm kiếm...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Kết quả tìm kiếm
          </h1>
          {query && (
            <p className="text-gray-600">
              Tìm kiếm cho: <span className="font-semibold text-blue-600">"{query}"</span>
            </p>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Tìm thấy <span className="font-semibold text-gray-900">{results.length}</span> sản phẩm
          </p>
        </div>

        {/* Search Results */}
        {results.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">🔍</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Không tìm thấy sản phẩm
            </h2>
            <p className="text-gray-600 mb-8">
              Không có sản phẩm nào phù hợp với từ khóa "{query}"
            </p>
            <div className="space-y-4">
              <p className="text-sm text-gray-500">Gợi ý:</p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>• Kiểm tra lại chính tả</li>
                <li>• Thử từ khóa khác</li>
                <li>• Sử dụng từ khóa ngắn hơn</li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {results.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* Related Searches */}
        {results.length > 0 && (
          <div className="mt-12 bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Tìm kiếm liên quan</h3>
            <div className="flex flex-wrap gap-2">
              {['móc khóa', 'áo phông', 'túi xách', 'nón', 'ví'].map((term) => (
                <button
                  key={term}
                  onClick={() => performSearch(term)}
                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-sm transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
