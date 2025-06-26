import { createContext, useContext, useEffect, useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  });

  const login = async (email, password) => {
    const res = await api.post('/auth/login', { email, password });

    const data = await res.data;

    setUser(data);
    localStorage.setItem('swimming_user', JSON.stringify(data));
    navigate('/import');
  };

  const register = async (email, password) => {
    const res = await api.post('/auth/register', { email, password });

    const data = await res.data;

    setUser(data);
    localStorage.setItem('swimming_user', JSON.stringify(data));
    navigate('/import');
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('swimming_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
