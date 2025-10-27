import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function Exames() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}>
          <Ionicons name="flask" size={32} color="#1827ff" />
          <Text style={styles.headerTitle}>Exames Laboratoriais</Text>
        </View>

        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeText}>Gerenciar Exames</Text>
          <Text style={styles.subtitleText}>
            Busque exames existentes ou cadastre novos exames hematológicos.
          </Text>
        </View>

        <View style={styles.cardsContainer}>
          <TouchableOpacity
            style={[styles.card, styles.searchCard]}
            onPress={() => {
              navigation.navigate("BuscarExames");
            }}
          >
            <Ionicons name="search" size={40} color="#1827ff" />
            <Text style={styles.cardTitle}>Buscar Exames</Text>
            <Text style={styles.cardSubtitle}>
              Pesquisar e visualizar exames existentes
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.card, styles.insertCard]}
            onPress={() => {
              navigation.navigate("InserirExame");
            }}
          >
            <Ionicons name="add-circle" size={40} color="#10b981" />
            <Text style={styles.cardTitle}>Inserir Exame</Text>
            <Text style={styles.cardSubtitle}>
              Cadastrar novo exame hematológico
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 60,
    marginBottom: 20,
    backgroundColor: "#fff",
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 15,
    marginHorizontal: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
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
    backgroundColor: "#fff",
    paddingVertical: 25,
    paddingHorizontal: 20,
    borderRadius: 15,
    marginHorizontal: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
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
    lineHeight: 22,
  },
  cardsContainer: {
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    borderLeftWidth: 4,
  },
  searchCard: {
    borderLeftColor: "#1827ff",
  },
  insertCard: {
    borderLeftColor: "#10b981",
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
    lineHeight: 20,
  },
  debugText: {
    fontSize: 14,
    color: "#ff6b6b",
    marginTop: 10,
    fontWeight: "bold",
    textAlign: "center",
  },
});
