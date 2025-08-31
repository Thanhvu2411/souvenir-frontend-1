'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { Product } from '@/types/product';
import { mockProducts } from '@/lib/mock-data';

interface SearchContextType {
  searchQuery: string;
  searchResults: Product[];
  isSearching: boolean;
  setSearchQuery: (query: string) => void;
  performSearch: (query: string) => void;
  clearSearch: () => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [searchQuery, setSearchQueryState] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const performSearch = useCallback((query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);

    // Simulate API delay
    setTimeout(() => {
      const results = mockProducts.filter(product => {
        const searchTerm = query.toLowerCase();
        return (
          product.name.toLowerCase().includes(searchTerm) ||
          product.description.toLowerCase().includes(searchTerm) ||
          product.category.toLowerCase().includes(searchTerm) ||
          product.tags.some(tag => tag.toLowerCase().includes(searchTerm))
        );
      });

      setSearchResults(results);
      setIsSearching(false);
    }, 300);
  }, []);

  const setSearchQuery = useCallback((query: string) => {
    setSearchQueryState(query);
    if (query.trim()) {
      performSearch(query);
    } else {
      setSearchResults([]);
    }
  }, [performSearch]);

  const clearSearch = useCallback(() => {
    setSearchQueryState('');
    setSearchResults([]);
  }, []);

  const value: SearchContextType = {
    searchQuery,
    searchResults,
    isSearching,
    setSearchQuery,
    performSearch,
    clearSearch
  };

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
}
