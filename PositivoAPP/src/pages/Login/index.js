import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import api from "../../services/api";

export default function Login({ onLogin }) {
  const [userType, setUserType] = useState("paciente");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);

  const formatarCPF = (text) => {
    const numeros = text.replace(/\D/g, "");
    if (numeros.length <= 3) return numeros;
    if (numeros.length <= 6)
      return `${numeros.slice(0, 3)}.${numeros.slice(3)}`;
    if (numeros.length <= 9)
      return `${numeros.slice(0, 3)}.${numeros.slice(3, 6)}.${numeros.slice(
        6
      )}`;
    return `${numeros.slice(0, 3)}.${numeros.slice(3, 6)}.${numeros.slice(
      6,
      9
    )}-${numeros.slice(9, 11)}`;
  };

  const handleLogin = async () => {
    if (!email || !senha) {
      Alert.alert("Erro", "Por favor, preencha o email e a senha.");
      return;
    }
    setLoading(true);
    const payload = { email, senha };
    try {
      const response = await api.post("/usuarios/login", payload);
      onLogin(); // Chama a função onLogin em vez de navegar
    } catch (error) {
      console.error(error.response?.data || error.message);
      const errorMessage =
        error.response?.data?.message ||
        "Email ou senha incorretos. Tente novamente.";
      Alert.alert("Erro no Login", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="medical" size={32} color="#1827ff" />
        <Text style={styles.headerTitle}>Saúde Positivo</Text>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.bemvindoText}>Bem-vindo</Text>
        <Text style={styles.subtitleText}>
          Faça login para acessar seus exames
        </Text>

        <View style={styles.userTypeSelector}>
          <TouchableOpacity
            style={[
              styles.userTypeButton,
              userType === "paciente" && styles.activeUserTypeButton,
            ]}
            onPress={() => setUserType("paciente")}
          >
            <Text
              style={[
                styles.userTypeButtonText,
                userType === "paciente" && styles.activeUserTypeButtonText,
              ]}
            >
              Paciente
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.userTypeButton,
              userType === "usuario" && styles.activeUserTypeButton,
            ]}
            onPress={() => setUserType("usuario")}
          >
            <Text
              style={[
                styles.userTypeButtonText,
                userType === "usuario" && styles.activeUserTypeButtonText,
              ]}
            >
              Usuário
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View
          style={
            userType === "paciente" ? styles.inputContainer : styles.hidden
          }
        >
          <Text style={styles.label}>CPF</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu CPF"
            value={cpf}
            onChangeText={(text) => setCpf(formatarCPF(text))}
            keyboardType="numeric"
            maxLength={14}
          />
        </View>

        <View
          style={userType === "usuario" ? styles.inputContainer : styles.hidden}
        >
          <Text style={styles.label}>Senha</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite sua senha"
            value={senha}
            onChangeText={setSenha}
            secureTextEntry={true}
          />
        </View>

        <TouchableOpacity
          style={styles.loginButton}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.loginButtonText}>Entrar</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingHorizontal: 24 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 80,
    marginBottom: 40,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 12,
    color: "#1827ff",
  },
  formContainer: { flex: 1 },
  bemvindoText: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
    color: "#333",
  },
  subtitleText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 40,
    color: "#666",
  },
  userTypeSelector: {
    flexDirection: "row",
    marginBottom: 20,
    backgroundColor: "#f8f8f8",
    borderRadius: 10,
  },
  userTypeButton: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 12,
    borderRadius: 8,
  },
  activeUserTypeButton: { backgroundColor: "#1827ff" },
  userTypeButtonText: { fontSize: 16, fontWeight: "600", color: "#1827ff" },
  activeUserTypeButtonText: { color: "#fff" },
  inputContainer: { marginBottom: 20 },
  label: { fontSize: 16, fontWeight: "600", marginBottom: 8, color: "#333" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: "#1827ff",
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },

  hidden: {
    display: "none",
  },
});
