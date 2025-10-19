import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Listagem from "../../components/ListagemDeExames";

export default function Home() {
  const [usuario, setUsuario] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    setUsuario({ nome: "Usuário" });
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Ionicons name="medical" size={32} color="#1827ff" />
          <Text style={styles.headerTitle}>Saúde Positivo</Text>
        </View>

        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeText}>
            Olá, {usuario?.nome ?? "Usuário"}
          </Text>
          <Text style={styles.subtitleText}>
            Consulte seus resultados de exames.
          </Text>
        </View>

        <View style={styles.cardsContainer}>
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("Exame Hematológico")}
          >
            <Ionicons name="water" size={40} color="#1827ff" />
            <Text style={styles.cardTitle}>Exame Hematológico</Text>
            <Text style={styles.cardSubtitle}>
              Cadastrar hemograma completo
            </Text>
          </TouchableOpacity>
        </View>

        <Listagem />
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
    padding: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 30,
    backgroundColor: "#fff",
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 15,
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
    marginBottom: 30,
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
    borderLeftColor: "#1827ff",
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
});
