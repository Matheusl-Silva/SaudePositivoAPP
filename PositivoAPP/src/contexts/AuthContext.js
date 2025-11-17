import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setAuthToken } from '../services/api';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (token) {
        const userId = await AsyncStorage.getItem('userId');
        const userName = await AsyncStorage.getItem('userName');
        const userEmail = await AsyncStorage.getItem('userEmail');
        const userAdmin = await AsyncStorage.getItem('userAdmin');

        // Configurar token no axios
        setAuthToken(token);

        // Restaurar estado do usuário
        setUser({
          id: parseInt(userId),
          nome: userName,
          email: userEmail,
          admin: userAdmin === 'true',
          token: token,
        });
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Erro ao carregar dados do usuário:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (userData) => {
    try {
     
      await AsyncStorage.setItem('userToken', userData.token);
      await AsyncStorage.setItem('userId', userData.id.toString());
      await AsyncStorage.setItem('userName', userData.nome);
      await AsyncStorage.setItem('userEmail', userData.email);
      await AsyncStorage.setItem('userAdmin', userData.admin.toString());

      // tempo de expiração
      const expirationTime = Date.now() + 60 * 60 * 1000;
      await AsyncStorage.setItem('tokenExpiration', expirationTime.toString());

      // Configurar token no axios
      setAuthToken(userData.token);

      setUser(userData);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Erro ao salvar dados do usuário:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.multiRemove([
        'userToken',
        'userId',
        'userName',
        'userEmail',
        'userAdmin',
        'tokenExpiration',
      ]);
      setAuthToken(null);
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  const isAdmin = () => {
    return user?.admin === true || user?.admin === 'S';
  };

  const checkTokenExpiration = async () => {
    try {
      const expiration = await AsyncStorage.getItem('tokenExpiration');
      if (expiration && Date.now() > parseInt(expiration)) {
        await logout();
        return true; 
      }
      return false; 
    } catch (error) {
      console.error('Erro ao verificar expiração do token:', error);
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        login,
        logout,
        isAdmin,
        checkTokenExpiration,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};
