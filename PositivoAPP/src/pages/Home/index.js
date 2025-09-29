import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Listagem from "../../components/ListagemDeExames"

export default function Home() {

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="medical" size={32} color="#1827ff" />
        <Text style={styles.headerTitle}>Saúde Positivo</Text>
      </View>

      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeText}>Olá, {usuario?.nome ?? "Usuário"}</Text>
        <Text style={styles.subtitleText}>
          Consulte seus resultados de exames.
        </Text>
      </View>

      <Listagem />

      <TouchableOpacity style={styles.exitButton} onPress={() => navigation.navigate("Login")}>
        <Text style={styles.exitButtonText}>Sair</Text>
      </TouchableOpacity>
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
    marginBottom: 30,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 12,
    color: "#1827ff",
  },
  welcomeContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  welcomeText: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  subtitleText: {
    fontSize: 16,
    textAlign: "center",
    color: "#666",
  },
  cardsContainer: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: "#00000011",
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 12,
    color: "#333",
  },
  cardSubtitle: {
    fontSize: 14,
    textAlign: "center",
    marginTop: 6,
    color: "#666",
  },
  exitButton: {
    justifyContent: "center",
    marginBottom: 70,
    marginHorizontal: 110,
    height: 50,
    backgroundColor: "#ff3b30",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  exitButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
});
