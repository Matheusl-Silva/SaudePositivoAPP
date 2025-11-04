import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Welcome({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="medical" size={80} color="#1827ff" />
        <Text style={styles.appTitle}>Saúde Positivo</Text>
        <Text style={styles.subtitle}>
          Sistema de Gestão de Saúde
        </Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.welcomeText}>Bem-vindo!</Text>
        <Text style={styles.descriptionText}>
          Gerencie exames, pacientes e usuários de forma simples e eficiente
        </Text>

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.primaryButtonText}>Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => navigation.navigate("Register")}
        >
          <Text style={styles.secondaryButtonText}>Criar Conta</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          © 2024 Saúde Positivo - Todos os direitos reservados
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 80,
    paddingBottom: 40,
  },
  appTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#1827ff",
    marginTop: 20,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginTop: 8,
  },
  content: {
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 40,
    paddingTop: 20,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 12,
  },
  descriptionText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 40,
    lineHeight: 24,
  },
  primaryButton: {
    backgroundColor: "#1827ff",
    paddingVertical: 16,
    paddingHorizontal: 60,
    borderRadius: 30,
    width: "100%",
    alignItems: "center",
    marginBottom: 16,
    shadowColor: "#1827ff",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  primaryButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  secondaryButton: {
    backgroundColor: "#fff",
    paddingVertical: 16,
    paddingHorizontal: 60,
    borderRadius: 30,
    width: "100%",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#1827ff",
  },
  secondaryButtonText: {
    color: "#1827ff",
    fontSize: 18,
    fontWeight: "bold",
  },
  footer: {
    position: "absolute",
    bottom: 20,
    width: "100%",
    alignItems: "center",
  },
  footerText: {
    fontSize: 12,
    color: "#999",
  },
});
