import React from 'react';
import { useAuth } from '../contexts/AuthContext';

/**
 * Componente que renderiza seus filhos apenas se o usuário for admin
 * Uso: <AdminOnly>Conteúdo visível apenas para admins</AdminOnly>
 */
export const AdminOnly = ({ children }) => {
  const { isAdmin } = useAuth();
  
  if (!isAdmin()) {
    return null;
  }
  
  return <>{children}</>;
};

export default AdminOnly;
