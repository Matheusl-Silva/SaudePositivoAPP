import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

const exames = [
  {
    id: 1,
    idPaciente: "123",
    dataExame: "2025-09-01",
    idResponsavel: "Dr. João",
    idPreceptor: "Dra. Maria",
  },
  {
    id: 2,
    idPaciente: "123",
    dataExame: "2025-08-15",
    idResponsavel: "Dr. Pedro",
    idPreceptor: "Dra. Ana",
  },
];

export default function BuscarExames() {
  const [idPaciente, setIdPaciente] = useState("");
  const [exames, setExames] = useState([]);
  const [error, setError] = useState("");

  const handleSearch = () => {
    if (!idPaciente) {
      setError("Digite um ID de paciente válido.");
      setExames([]);
      return;
    }

    const resultados = exames.filter(
      (exame) => exame.idPaciente === idPaciente
    );

    if (resultados.length === 0) {
      setError("Nenhum exame encontrado para este paciente.");
    } else {
      setError("");
    }

    setExames(resultados);
  };

  const handleView = (exame) => {
    // Aqui você pode navegar para a tela de detalhes do exame
    console.log("Visualizar exame", exame);
  };

  const handleDelete = (exameId) => {
    // Aqui você pode chamar sua função de excluir exame
    console.log("Excluir exame ID", exameId);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="search" size={32} color="#1827ff" />
        <Text style={styles.headerTitle}>Buscar Exames</Text>
      </View>

      <View style={{ marginBottom: 20 }}>
        <Text style={styles.label}>ID do Paciente</Text>
        <TextInput
          style={styles.input}
          value={idPaciente}
          onChangeText={setIdPaciente}
          placeholder="Digite o ID do paciente"
          keyboardType="numeric"
        />
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#1827ff" }]}
          onPress={handleSearch}
        >
          <Ionicons name="search" size={20} color="#fff" />
          <Text style={styles.buttonText}>Buscar</Text>
        </TouchableOpacity>
        {error ? <Text style={{ color: "#cc2121", marginTop: 10 }}>{error}</Text> : null}
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {exames.map((exame) => (
          <View key={exame.id} style={styles.exameCard}>
            <Text style={styles.exameTitle}>Data: {exame.dataExame}</Text>
            <Text>Responsável: {exame.idResponsavel}</Text>
            <Text>Preceptor: {exame.idPreceptor}</Text>

            <View style={{ flexDirection: "row", marginTop: 10, gap: 10 }}>
              <TouchableOpacity
                style={[styles.smallButton, { backgroundColor: "#10b981" }]}
                onPress={() => handleView(exame)}
              >
                <Ionicons name="eye" size={16} color="#fff" />
                <Text style={styles.smallButtonText}>Visualizar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.smallButton, { backgroundColor: "#cc2121" }]}
                onPress={() => handleDelete(exame.id)}
              >
                <Ionicons name="trash" size={16} color="#fff" />
                <Text style={styles.smallButtonText}>Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 24,
    paddingTop: 60,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 12,
    color: "#1827ff",
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 6,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: "#333",
    backgroundColor: "#f8f8f8",
    marginBottom: 10,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    borderRadius: 10,
    gap: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  exameCard: {
    backgroundColor: "#f0f4ff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#c3d0ff",
  },
  exameTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 6,
    color: "#1827ff",
  },
  smallButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    gap: 6,
  },
  smallButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
});
