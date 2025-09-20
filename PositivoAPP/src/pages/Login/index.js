import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Alert,
} from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function Login() {
  const [CPF, setCPF] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const navigation = useNavigation();

  const handleLogin = () => {
    if (!CPF || !dataNascimento) {
      Alert.alert("Erro", "Por favor, preencha todos os campos");
      return;
    }

    navigation.navigate("Home");
  };

  const formatarData = (text) => {
    const numeros = text.replace(/\D/g, "");

    if (numeros.length <= 2) {
      return numeros;
    } else if (numeros.length <= 4) {
      return `${numeros.slice(0, 2)}/${numeros.slice(2)}`;
    } else {
      return `${numeros.slice(0, 2)}/${numeros.slice(2, 4)}/${numeros.slice(
        4,
        8
      )}`;
    }
  };

  const formatarCPF = (text) => {
  const numeros = text.replace(/\D/g, "");

  if (numeros.length <= 3) {
    return numeros;
  } else if (numeros.length <= 6) {
    return `${numeros.slice(0, 3)}.${numeros.slice(3)}`;
  } else if (numeros.length <= 9) {
    return `${numeros.slice(0, 3)}.${numeros.slice(3, 6)}.${numeros.slice(6)}`;
  } else {
    return `${numeros.slice(0, 3)}.${numeros.slice(3, 6)}.${numeros.slice(
      6,
      9
    )}-${numeros.slice(9, 11)}`;
  }
};


  const handleDataChange = (text) => {
    const formatted = formatarData(text);
    if (formatted.length <= 10) {
      setDataNascimento(formatted);
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

        <View style={styles.inputContainer}>
          <Text style={styles.label}>CPF</Text>
          <View style={styles.inputWrapper}>
            <Ionicons
              name="mail-outline"
              size={20}
              color="#666"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Digite seu CPF"
              value={CPF}
              onChangeText={(text) => setCPF(formatarCPF(text))}
              keyboardType="numeric"
              maxLength={14}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Data de Nascimento</Text>
          <View style={styles.inputWrapper}>
            <Ionicons
              name="calendar-outline"
              size={20}
              color="#666"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="dd/mm/aaaa"
              value={dataNascimento}
              onChangeText={handleDataChange}
              keyboardType="numeric"
              maxLength={10}
            />
          </View>
        </View>

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
    padding: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 40,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 12,
    color: "#1827ffff",
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 20,
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
    backgroundColor: "#1827ffff",
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
  footer: {
    alignItems: "center",
  },
  footerText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
  linkText: {
    color: "#1827ffff",
    fontWeight: "600",
  },
});
