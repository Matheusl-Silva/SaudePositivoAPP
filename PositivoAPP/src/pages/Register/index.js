import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { cadastrarUsuario } from "../../services/userService";

export default function Register({ navigation }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!nome || !email || !senha || !confirmarSenha) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }

    if (senha !== confirmarSenha) {
      Alert.alert("Erro", "As senhas não coincidem.");
      return;
    }

    if (senha.length < 6) {
      Alert.alert("Erro", "A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    setLoading(true);
    try {
      await cadastrarUsuario(nome, email, senha);
      Alert.alert(
        "Sucesso",
        "Cadastro realizado com sucesso! Faça login para continuar.",
        [
          {
            text: "OK",
            onPress: () => navigation.navigate("Login"),
          },
        ]
      );
    } catch (error) {
      console.error(error.response?.data || error.message);
      const errorMessage =
        error.response?.data?.message ||
        "Erro ao cadastrar. Tente novamente.";
      Alert.alert("Erro no Cadastro", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
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
        <Text style={styles.bemvindoText}>Criar Conta</Text>
        <Text style={styles.subtitleText}>
          Preencha os dados para se cadastrar
        </Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Nome Completo</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu nome completo"
            value={nome}
            onChangeText={setNome}
            autoCapitalize="words"
          />
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

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Senha</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite sua senha (mínimo 6 caracteres)"
            value={senha}
            onChangeText={setSenha}
            secureTextEntry={true}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Confirmar Senha</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite sua senha novamente"
            value={confirmarSenha}
            onChangeText={setConfirmarSenha}
            secureTextEntry={true}
          />
        </View>

        <TouchableOpacity
          style={styles.registerButton}
          onPress={handleRegister}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.registerButtonText}>Cadastrar</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.loginLink}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.loginLinkText}>
            Já tem uma conta? <Text style={styles.loginLinkBold}>Entrar</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
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
    color: "#1827ff",
    marginLeft: 10,
  },
  formContainer: {
    padding: 30,
  },
  bemvindoText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  subtitleText: {
    fontSize: 16,
    color: "#666",
    marginBottom: 30,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
  },
  registerButton: {
    backgroundColor: "#1827ff",
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#1827ff",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  registerButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  loginLink: {
    marginTop: 20,
    alignItems: "center",
  },
  loginLinkText: {
    fontSize: 16,
    color: "#666",
  },
  loginLinkBold: {
    color: "#1827ff",
    fontWeight: "bold",
  },
});
