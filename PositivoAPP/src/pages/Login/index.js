import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function Login() {
  const [userType, setUserType] = useState("paciente");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

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

  const handleLogin = () => {
    if (userType === "paciente") {
      if (!email || !cpf) {
        Alert.alert("Erro", "Por favor, preencha todos os campos.");
        return;
      }
      Alert.alert("Sucesso", "Login de paciente bem-sucedido!");
    } else {
      if (!email || !password) {
        Alert.alert("Erro", "Por favor, preencha todos os campos.");
        return;
      }
      Alert.alert("Sucesso", "Login de usuário do sistema bem-sucedido!");
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="medical" size={32} color="#1827ff" />
        <Text style={styles.headerTitle}>Saúde Positivo</Text>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.bemvindoText}>Bem-vindo</Text>
        <Text style={styles.subtitleText}>
          Faça login para acessar seus exames
        </Text>

        {/* Seletor de tipo de usuário */}
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
          <View style={styles.inputWrapper}>
            <Ionicons
              name="mail-outline"
              size={20}
              color="#666"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Digite seu email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>
        </View>

        {userType === "paciente" ? (
          <View style={styles.inputContainer}>
            <Text style={styles.label}>CPF</Text>
            <View style={styles.inputWrapper}>
              <Ionicons
                name="card-outline"
                size={20}
                color="#666"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Digite seu CPF"
                value={cpf}
                onChangeText={(text) => setCpf(formatarCPF(text))}
                keyboardType="numeric"
                maxLength={14}
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
          </View>
        ) : (
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Senha</Text>
            <View style={styles.inputWrapper}>
              <Ionicons
                name="lock-closed-outline"
                size={20}
                color="#666"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Digite sua senha"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
          </View>
        )}

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 24,
  },
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
  formContainer: {
    flex: 1,
  },
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
  activeUserTypeButton: {
    backgroundColor: "#1827ff",
  },
  userTypeButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1827ff",
  },
  activeUserTypeButtonText: {
    color: "#fff",
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: "#333",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
    borderRadius: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 15,
    fontSize: 16,
    color: "#333",
  },
  loginButton: {
    backgroundColor: "#1827ff",
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 30,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
