import React, { createContext, useContext, useState, useEffect } from 'react';
import { ROLES } from '../utils/constants';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : {
      id: 'USR-101',
      name: 'Dr. Amitabh Verma, IAS',
      email: 'officer.mospi@gov.in',
      role: ROLES.MOSPI,
      department: 'Ministry of Statistics & Programme Implementation',
    };
  });

  const [token, setToken] = useState(() => localStorage.getItem('token') || 'demo-jwt-token');
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
      // For demo / prototype ease, synthesize official user based on role or backend response
      const newUser = {
        id: 'USR-' + Math.floor(Math.random() * 1000),
        name: credentials.email ? credentials.email.split('@')[0].toUpperCase() : 'Government Official',
        email: credentials.email || 'official@gov.in',
        role: credentials.role || ROLES.MOSPI,
        department: 'Department of Public Finance Oversight',
      };
      setUser(newUser);
      setToken('demo-token-' + Date.now());
      return newUser;
    } finally {
      setLoading(false);
    }
  };

  const loginAsCitizen = async (mobile, otp) => {
    setLoading(true);
    try {
      const citizenUser = {
        id: 'CITIZEN-' + mobile.slice(-4),
        name: 'Verified Citizen Monitor',
        mobile: mobile,
        role: ROLES.CITIZEN,
      };
      setUser(citizenUser);
      setToken('citizen-token-' + Date.now());
      return citizenUser;
    } finally {
      setLoading(false);
    }
  };

  const switchRole = (newRole) => {
    if (user) {
      setUser({
        ...user,
        role: newRole,
      });
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
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
        switchRole,
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
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
