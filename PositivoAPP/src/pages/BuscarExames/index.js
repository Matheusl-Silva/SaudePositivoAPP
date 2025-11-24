import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import { useEffect, useState, useCallback } from "react";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import {
  buscarTodosExamesPaciente,
  deletarExame,
} from "../../services/examService";
import { useIsFocused } from "@react-navigation/native";
import { AdminOnly } from "../../components/AdminOnly";
import { useAuth } from "../../contexts/AuthContext";

export default function BuscarExames({ route }) {
  const [idPaciente, setIdPaciente] = useState(
    () => route?.params?.idPaciente || ""
  );
  const [exames, setExames] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const isFocused = useIsFocused();
  const { isAdmin } = useAuth();
  const navigation = useNavigation();

  const carregarExames = async () => {
    setLoading(true);
    const data = await buscarTodosExamesPaciente(idPaciente);
    if (data?.length === 0) {
      setError("Nenhum exame encontrado para este paciente.");
      return;
    } else {
      setError("");
    }
    setLoading(false);
    return data;
  };

  useFocusEffect(
    useCallback(() => {
      if (route?.params?.idPaciente) {
        console.log("Passou aqui pelo usefocuseffect");
        handleSearch();
      }
    }, [])
  );

  useEffect(() => {
    if (idPaciente) carregarExames();
  }, []);

  const handleSearch = async () => {
    if (!idPaciente) {
      setError("Digite um ID de paciente válido.");
      setExames([]);
      return;
    }

    try {
      const exames = await carregarExames();
      if (exames.length > 0) {
        setExames(exames);
      }
    } catch (e) {
      setError("Nenhum exame encontrado para este paciente.");
      setExames([]);
    }
  };

  const handleView = (exame) => {
    navigation.navigate("VisualizarExame", { exame });
  };

  const handleDelete = async (exame) => {
    Alert.alert("Confirmar", `Excluir exame de número ${exame.id}?`, [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: async () => {
          try {
            const result = await deletarExame(exame.id);
            if (result.error) {
              Alert.alert("Erro", result.error);
              return;
            }
            setExames(exames.filter((e) => e.id !== exame.id));
            Alert.alert("Sucesso", "Exame excluído!");
          } catch (error) {
            Alert.alert("Erro", "Não foi possível excluir o exame.");
          }
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#1827ff" />
        </TouchableOpacity>
        <Ionicons name="search" size={32} color="#1827ff" />
        <Text style={styles.headerTitle}>Buscar Exames</Text>
      </View>

      <View style={{ marginBottom: 20 }}>
        <Text style={styles.label}>ID do Paciente</Text>
        <TextInput
          style={styles.input}
          value={idPaciente}
          onChangeText={setIdPaciente}
          placeholder="Digite o Número do Paciente"
          keyboardType="numeric"
        />
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#1827ff" }]}
          onPress={handleSearch}
        >
          <Ionicons name="search" size={20} color="#fff" />
          <Text style={styles.buttonText}>Buscar</Text>
        </TouchableOpacity>
        {error ? (
          <Text style={{ color: "#cc2121", marginTop: 10 }}>{error}</Text>
        ) : null}
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {exames.map((exame) => (
          <View key={exame.id} style={styles.exameCard}>
            <Text style={styles.exameTitle}>Número: {exame.id}</Text>
            <Text style={styles.exameTitle}>
              Data: {new Date(exame.data).toLocaleDateString("pt-BR")}
            </Text>
            <Text>Responsável: {exame.nomeResponsavel}</Text>
            <Text>Preceptor: {exame.nomePreceptor}</Text>

            <View style={{ flexDirection: "row", marginTop: 10, gap: 10 }}>
              <TouchableOpacity
                style={[styles.smallButton, { backgroundColor: "#10b981" }]}
                onPress={() => handleView(exame)}
              >
                <Ionicons name="eye" size={16} color="#fff" />
                <Text style={styles.smallButtonText}>Visualizar</Text>
              </TouchableOpacity>
              <AdminOnly>
                <TouchableOpacity
                  style={[styles.smallButton, { backgroundColor: "#cc2121" }]}
                  onPress={() => handleDelete(exame)}
                >
                  <Ionicons name="trash" size={16} color="#fff" />
                  <Text style={styles.smallButtonText}>Excluir</Text>
                </TouchableOpacity>
              </AdminOnly>
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
    paddingTop: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  backButton: {
    position: "absolute",
    left: 0,
    padding: 8,
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
