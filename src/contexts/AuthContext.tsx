'use client';

import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import { AuthState, User, LoginCredentials, RegisterCredentials } from '@/types/auth';
import { mockUsers, mockPasswords } from '@/lib/mock-users';

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<boolean>;
  register: (credentials: RegisterCredentials) => Promise<boolean>;
  logout: () => void;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthAction =
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: User }
  | { type: 'LOGIN_FAILURE'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'CLEAR_ERROR' }
  | { type: 'LOAD_USER'; payload: User };

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN_START':
      return {
        ...state,
        isLoading: true,
        error: null
      };
    
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
        error: null
      };
    
    case 'LOGIN_FAILURE':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload
      };
    
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null
      };
    
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null
      };
    
    case 'LOAD_USER':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false
      };
    
    default:
      return state;
  }
};

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        dispatch({ type: 'LOAD_USER', payload: user });
      } catch (error) {
        console.error('Error loading user from localStorage:', error);
        localStorage.removeItem('user');
      }
    }
  }, []);

  const login = useCallback(async (credentials: LoginCredentials): Promise<boolean> => {
    dispatch({ type: 'LOGIN_START' });

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Check if user exists
      const user = mockUsers.find(u => u.email === credentials.email);
      if (!user) {
        dispatch({ type: 'LOGIN_FAILURE', payload: 'Email không tồn tại trong hệ thống' });
        return false;
      }

      // Check password
      const correctPassword = mockPasswords[credentials.email];
      if (credentials.password !== correctPassword) {
        dispatch({ type: 'LOGIN_FAILURE', payload: 'Mật khẩu không chính xác' });
        return false;
      }

      // Save user to localStorage
      localStorage.setItem('user', JSON.stringify(user));
      
      dispatch({ type: 'LOGIN_SUCCESS', payload: user });
      return true;
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE', payload: 'Đăng nhập thất bại. Vui lòng thử lại.' });
      return false;
    }
  }, []);

  const register = useCallback(async (credentials: RegisterCredentials): Promise<boolean> => {
    dispatch({ type: 'LOGIN_START' });

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Check if email already exists
      const existingUser = mockUsers.find(u => u.email === credentials.email);
      if (existingUser) {
        dispatch({ type: 'LOGIN_FAILURE', payload: 'Email đã được sử dụng' });
        return false;
      }

      // Check if passwords match
      if (credentials.password !== credentials.confirmPassword) {
        dispatch({ type: 'LOGIN_FAILURE', payload: 'Mật khẩu xác nhận không khớp' });
        return false;
      }

      // Create new user (in real app, this would be saved to database)
      const newUser: User = {
        id: (mockUsers.length + 1).toString(),
        email: credentials.email,
        name: credentials.name,
        phone: credentials.phone,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      // Save user to localStorage
      localStorage.setItem('user', JSON.stringify(newUser));
      
      dispatch({ type: 'LOGIN_SUCCESS', payload: newUser });
      return true;
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE', payload: 'Đăng ký thất bại. Vui lòng thử lại.' });
      return false;
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('user');
    dispatch({ type: 'LOGOUT' });
  }, []);

  const clearError = useCallback(() => {
    dispatch({ type: 'CLEAR_ERROR' });
  }, []);

  const value: AuthContextType = {
    ...state,
    login,
    register,
    logout,
    clearError
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

