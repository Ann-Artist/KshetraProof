import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('kshetra_user');
    return saved ? JSON.parse(saved) : { email: 'surveyor@demo.com', role: 'surveyor', name: 'Sunil Varma (Surveyor #402)' };
  });

  const login = async (email, password, role) => {
    try {
      const res = await api.post('/auth/login', { email, password, role });
      if (res.data.success) {
        const { token, user: userData } = res.data.data;
        localStorage.setItem('kshetra_token', token);
        localStorage.setItem('kshetra_user', JSON.stringify(userData));
        setUser(userData);
        return { success: true, user: userData };
      }
    } catch (err) {
      console.error('Login error:', err);
      // Fallback demo user on offline/api mismatch
      const mockUser = {
        email,
        role: role || (email.includes('officer') ? 'officer' : 'surveyor'),
        name: email.includes('officer') ? 'Vikram Desai (Revenue Officer)' : 'Sunil Varma (Surveyor #402)'
      };
      localStorage.setItem('kshetra_user', JSON.stringify(mockUser));
      setUser(mockUser);
      return { success: true, user: mockUser };
    }
  };

  const switchRole = (newRole) => {
    let name = 'Sunil Varma (Surveyor #402)';
    if (newRole === 'officer') name = 'Vikram Desai (Revenue Officer)';
    if (newRole === 'admin') name = 'System Administrator';
    if (newRole === 'citizen') name = 'Ramesh Kumar (Landholder)';

    const updated = { ...user, role: newRole, name };
    localStorage.setItem('kshetra_user', JSON.stringify(updated));
    setUser(updated);
  };

  const logout = () => {
    localStorage.removeItem('kshetra_token');
    localStorage.removeItem('kshetra_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, switchRole, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
