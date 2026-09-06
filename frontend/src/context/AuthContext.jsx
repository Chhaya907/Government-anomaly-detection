import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem('token');
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  const login = async (credentials) => {
    setLoading(true);

    try {
      const response = await authService.login({
        email: credentials.email,
        password: credentials.password,
      });

      const receivedToken =
        response.token ||
        response.access_token;

      if (!receivedToken) {
        throw new Error('Token was not received from the server');
      }

      setToken(receivedToken);

      let authenticatedUser = response.user;

      if (!authenticatedUser) {
        authenticatedUser = await authService.getCurrentUser();
      }

      setUser(authenticatedUser);

      return authenticatedUser;

    } finally {
      setLoading(false);
    }
  };

  const loginAsCitizen = async (mobile, otp) => {
    setLoading(true);

    try {
      const response =
        await authService.verifyCitizenOTP(mobile, otp);

      const receivedToken =
        response.token ||
        response.access_token;

      if (!receivedToken) {
        throw new Error('Token was not received from the server');
      }

      setToken(receivedToken);

      const authenticatedUser =
        response.user || {
          mobile,
          role: 'CITIZEN',
        };

      setUser(authenticatedUser);

      return authenticatedUser;

    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    authService.logout();

    setUser(null);
    setToken(null);
  };

  const isAuthenticated = !!token && !!user;

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated,
        login,
        loginAsCitizen,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      'useAuth must be used within an AuthProvider'
    );
  }

  return context;
};

export default AuthContext;
