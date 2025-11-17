import { useAuth } from '../contexts/AuthContext';

export const usePermissions = () => {
  const { user, isAdmin } = useAuth();

  const permissions = {
    // Permissões de Usuários
    canListAllUsers: isAdmin(),
    canViewUser: !!user,
    canCreateUser: true, // Cadastro é público
    canUpdateUser: isAdmin(),
    canDeleteUser: isAdmin(),

    // Permissões de Pacientes
    canListAllPatients: isAdmin(),
    canViewPatient: !!user,
    canCreatePatient: isAdmin(),
    canUpdatePatient: isAdmin(),
    canDeletePatient: isAdmin(),

    // Permissões de Exames
    canViewExams: !!user,
    canCreateExam: !!user, // Todos autenticados podem criar
    canUpdateExam: isAdmin(),
    canDeleteExam: isAdmin(),

    // Verificação geral
    isAuthenticated: !!user,
    isAdmin: isAdmin(),
  };

  return permissions;
};

export default usePermissions;
