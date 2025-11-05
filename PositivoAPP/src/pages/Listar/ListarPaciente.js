import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useState, useEffect, useCallback } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import {
  buscarTodosPacientes,
  deletarPaciente,
} from "../../services/pacienteService";

export default function PacienteList() {
  const [pacientes, setPacientes] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const carregarPacientes = async () => {
    try {
      setLoading(true);
      const data = await buscarTodosPacientes();
      setPacientes(data);
    } catch (error) {
      console.error(error.response?.data || error.message);
      Alert.alert(
        "Erro",
        "Não foi possível carregar os pacientes. Tente novamente."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarPacientes();
  }, []);

  useFocusEffect(
    useCallback(() => {
      carregarPacientes();
    }, [])
  );

  const filteredPacientes = pacientes.filter((paciente) => {
    const nome = paciente?.cnome?.toLowerCase() || "";
    const email = paciente?.cemail?.toLowerCase() || "";
    const cpf = paciente?.ccpf || "";
    const search = searchText.toLowerCase();
    return nome.includes(search) || email.includes(search) || cpf.includes(searchText);
  });

  const handleEditPaciente = (paciente) => {
    navigation.navigate("Atualizar Paciente", { paciente });
  };

  const handleDeletePaciente = async (paciente) => {
    Alert.alert("Confirmar", `Excluir paciente ${paciente.cnome}?`, [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: async () => {
          try {
            const result = await deletarPaciente(paciente.id);
            setPacientes(pacientes.filter((p) => p.id !== paciente.id));
            Alert.alert("Sucesso", "Paciente excluído!");
          } catch (error) {
            Alert.alert("Erro", "Não foi possível excluir o paciente.");
          }
        },
      },
    ]);
  };

  const renderPacienteItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.info}>
        <Text style={styles.nome}>{item.cnome}</Text>
        <Text style={styles.text}>📧 {item.cemail}</Text>
        <Text style={styles.text}>📞 {item.ctelefone}</Text>
        <Text style={styles.text}>🆔 CPF: {item.ccpf}</Text>
        <Text style={styles.text}>🕑 Período: {item.cperiodo}</Text>
        {item.cmedicamento ? (
          <Text style={styles.text}>💊Medicamento: {item.cmedicamento}</Text>
        ) : null}
        {item.cpatologia ? (
          <Text style={styles.text}>⚕️Patologia: {item.cpatologia}</Text>
        ) : null}
      </View>
      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => handleEditPaciente(item)}
        >
          <Ionicons name="pencil" size={16} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDeletePaciente(item)}
        >
          <Ionicons name="trash" size={16} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderEmptyList = () => (
    <View style={styles.emptyState}>
      <Ionicons name="medkit-outline" size={64} color="#ccc" />
      <Text style={styles.emptyTitle}>Nenhum paciente encontrado</Text>
      <Text style={styles.emptySubtitle}>
        {searchText ? "Tente ajustar sua busca" : "Nenhum paciente cadastrado"}
      </Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1827ff" />
        <Text style={{ marginTop: 10, color: "#666" }}>Carregando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="people" size={32} color="#1827ff" />
        <Text style={styles.headerTitle}>Lista de Pacientes</Text>
      </View>

      <View style={styles.counterContainer}>
        <Text style={styles.counterText}>
          Total:{" "}
          <Text style={styles.counterNumber}>{filteredPacientes.length}</Text>{" "}
          pacientes
        </Text>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={20}
          color="#666"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar por nome, email ou CPF..."
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      <FlatList
        data={filteredPacientes}
        keyExtractor={(item, index) => item?.id?.toString() || index.toString()}
        renderItem={renderPacienteItem}
        ListEmptyComponent={renderEmptyList}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.getParent().navigate("Cadastrar Paciente")}
      >
        <Ionicons name="person-add" size={20} color="#fff" />
        <Text style={styles.addButtonText}>Novo Paciente</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 24,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 12,
    color: "#1827ff",
  },
  counterContainer: {
    marginBottom: 20,
  },
  counterText: {
    fontSize: 16,
    color: "#333",
  },
  counterNumber: {
    fontWeight: "bold",
    color: "#1827ff",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
    borderRadius: 10,
    paddingHorizontal: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 15,
    fontSize: 16,
    color: "#333",
  },
  listContainer: {
    paddingBottom: 100,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  info: {
    flex: 1,
  },
  nome: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  text: {
    fontSize: 14,
    color: "#555",
    marginBottom: 4,
  },
  actions: {
    flexDirection: "row",
    gap: 8,
  },
  editButton: {
    backgroundColor: "#1827ff",
    padding: 10,
    borderRadius: 8,
  },
  deleteButton: {
    backgroundColor: "#dc2626",
    padding: 10,
    borderRadius: 8,
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#10b981",
    paddingVertical: 15,
    borderRadius: 10,
    position: "absolute",
    bottom: 40,
    left: 24,
    right: 24,
    gap: 8,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});