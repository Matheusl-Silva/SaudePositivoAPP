import axios from "axios";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// alterar conforme for seu ip
const API_URL = "http://10.136.131.216:3000";

const api = axios.create({
  baseURL: API_URL,
});

// Função para configurar o token no header
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

// Variável para armazenar a função de navegação
let navigationRef = null;

export const setNavigationRef = (ref) => {
  navigationRef = ref;
};

// Interceptor de resposta para tratar erros de autenticação
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Token inválido ou expirado
      Alert.alert(
        "Sessão Expirada",
        "Sua sessão expirou. Por favor, faça login novamente.",
        [
          {
            text: "OK",
            onPress: async () => {
              // Limpar dados
              await AsyncStorage.multiRemove([
                "userToken",
                "userId",
                "userName",
                "userEmail",
                "userAdmin",
                "tokenExpiration",
              ]);
              setAuthToken(null);
              
              // Redirecionar para login se a referência de navegação estiver disponível
              if (navigationRef) {
                navigationRef.navigate("Login");
              }
            },
          },
        ]
      );
    } else if (error.response?.status === 403) {
      // Sem permissão
      Alert.alert(
        "Acesso Negado",
        error.response?.data?.mensagem || "Você não tem permissão para realizar esta ação."
      );
    }
    return Promise.reject(error);
  }
);

export default api;