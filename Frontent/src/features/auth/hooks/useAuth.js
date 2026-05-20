import { useContext } from 'react';
import { AuthContext } from '../auth.context.jsx';
import { login, register, logout, getCurrentUser } from '../services/auth.api.js';

export const useAuth = () => {
  const { user, setUser, isLoading, setIsLoading } = useContext(AuthContext);

  const handleLogin = async ({ email, password }) => {
    setIsLoading(true);
    try {
      const data = await login({ email, password });
      setUser(data.user);
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('token', data.token);
      return data;
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async ({ name, email, password, role }) => {
    setIsLoading(true);
    try {
      const data = await register({ name, email, password, role });
      setUser(data.user);
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('token', data.token);
      return data;
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await logout();
    } finally {
      setUser(null);
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      setIsLoading(false);
    }
  };

  const handleFetchCurrentUser = async () => {
    setIsLoading(true);
    try {
      const data = await getCurrentUser();
      setUser(data?.user ?? null);
      return data;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    user,
    loading: isLoading,
    handleLogin,
    handleRegister,
    handleLogout,
    handleFetchCurrentUser
  };
};
