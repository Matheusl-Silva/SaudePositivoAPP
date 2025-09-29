import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
  Alert,
} from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

const mockPacientes = [
  {
    id: 1,
    cnome: "Ana Souza",
    cemail: "ana@email.com",
    cperiodo: "Manhã",
    cmedicamento: "Dipirona",
    cpatologia: "Enxaqueca",
    ddata_nascimento: "1995-06-12",
    ddata_cadastro: "2025-09-01",
    ctelefone: "(11) 91234-5678",
    ccpf: "123.456.789-00",
  },
  {
    id: 2,
    cnome: "Carlos Pereira",
    cemail: "carlos@email.com",
    cperiodo: "Tarde",
    cmedicamento: "Losartana",
    cpatologia: "Hipertensão",
    ddata_nascimento: "1980-03-22",
    ddata_cadastro: "2025-09-10",
    ctelefone: "(21) 99876-5432",
    ccpf: "987.654.321-00",
  },
];

export default function PacienteList() {
  const [pacientes, setPacientes] = useState(mockPacientes);
  const [searchText, setSearchText] = useState("");

  const filteredPacientes = pacientes.filter(
    (paciente) =>
      paciente.cnome.toLowerCase().includes(searchText.toLowerCase()) ||
      paciente.cemail.toLowerCase().includes(searchText.toLowerCase()) ||
      paciente.ccpf.includes(searchText)
  );

  const handleEditPaciente = (paciente) => {
    Alert.alert("Editar", `Editar paciente: ${paciente.cnome}`);
  };

  const handleDeletePaciente = (paciente) => {
    Alert.alert("Confirmar", `Excluir paciente ${paciente.cnome}?`, [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: () => {
          setPacientes(pacientes.filter((p) => p.id !== paciente.id));
          Alert.alert("Sucesso", "Paciente excluído!");
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
          <Text style={styles.text}>💊 {item.cmedicamento}</Text>
        ) : null}
        {item.cpatologia ? (
          <Text style={styles.text}>⚕️ {item.cpatologia}</Text>
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
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderPacienteItem}
        ListEmptyComponent={renderEmptyList}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />

      <TouchableOpacity style={styles.addButton}>
        <Ionicons name="person-add" size={20} color="#fff" />
        <Text style={styles.addButtonText}>Novo Paciente</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingHorizontal: 24 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 80,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 12,
    color: "#1827ff",
  },
  counterContainer: { marginBottom: 20 },
  counterText: { fontSize: 16, color: "#333" },
  counterNumber: { fontWeight: "bold", color: "#1827ff" },
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
  searchIcon: { marginRight: 10 },
  searchInput: { flex: 1, paddingVertical: 15, fontSize: 16, color: "#333" },
  listContainer: { paddingBottom: 100 },
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
  info: { flex: 1 },
  nome: { fontSize: 18, fontWeight: "bold", color: "#333", marginBottom: 4 },
  text: { fontSize: 14, color: "#555", marginBottom: 4 },
  actions: { flexDirection: "row", gap: 8 },
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
  emptyState: { alignItems: "center", paddingVertical: 60 },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: { fontSize: 16, color: "#666", textAlign: "center" },
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
  addButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});