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
import { loginUsuario } from "../../services/userService";

export default function Login({ onLogin, navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !senha) {
      Alert.alert("Erro", "Por favor, preencha o email e a senha.");
      return;
    }
    setLoading(true);
    try {
      const data = await loginUsuario(email, senha);
      onLogin({
        id: data.usuario.id,
        nome: data.usuario.nome,
        email: data.usuario.email,
        admin: data.usuario.admin,
      });
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
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#1827ff" />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Ionicons name="medical" size={32} color="#1827ff" />
          <Text style={styles.headerTitle}>Saúde Positivo</Text>
        </View>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.bemvindoText}>Bem-vindo</Text>
        <Text style={styles.subtitleText}>
          Faça login para acessar o sistema
        </Text>

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

        <View style={styles.inputContainer}>
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

        <TouchableOpacity
          style={styles.registerLink}
          onPress={() => navigation.navigate("Register")}
        >
          <Text style={styles.registerLinkText}>
            Não tem uma conta? <Text style={styles.registerLinkBold}>Cadastre-se</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingHorizontal: 24 },
  header: {
    paddingTop: 50,
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  backButton: {
    marginBottom: 10,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
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
    marginTop: 30,
    marginBottom: 8,
    color: "#333",
  },
  subtitleText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 40,
    color: "#666",
  },
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
  registerLink: {
    marginTop: 20,
    alignItems: "center",
  },
  registerLinkText: {
    fontSize: 16,
    color: "#666",
  },
  registerLinkBold: {
    color: "#1827ff",
    fontWeight: "bold",
  },
});
