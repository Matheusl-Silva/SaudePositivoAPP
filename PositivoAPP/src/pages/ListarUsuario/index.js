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


const mockUsers = [
  { id: 1, nome: "Matheus Silva", email: "matheus@email.com", admin: "S" },
];

export default function UsersList() {
  const [users, setUsers] = useState(mockUsers);
  const [searchText, setSearchText] = useState("");

  const filteredUsers = users.filter(
    (user) =>
      user.nome.toLowerCase().includes(searchText.toLowerCase()) ||
      user.email.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleEditUser = (user) => {
    Alert.alert("Editar", `Editar usuário: ${user.nome}`);
  };

  const handleDeleteUser = (user) => {
    Alert.alert("Confirmar", `Excluir usuário ${user.nome}?`, [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: () => {
          setUsers(users.filter((u) => u.id !== user.id));
          Alert.alert("Sucesso", "Usuário excluído!");
        },
      },
    ]);
  };

  const renderUserItem = ({ item }) => (
    <View style={styles.userCard}>
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{item.nome}</Text>
        <Text style={styles.userEmail}>{item.email}</Text>
        <View style={styles.userTypeContainer}>
          <View
            style={[
              styles.typeBadge,
              item.admin === "S" ? styles.adminBadge : styles.userBadge,
            ]}
          >
            <Text style={styles.typeText}>
              {item.admin === "S" ? "Admin" : "Usuário"}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => handleEditUser(item)}
        >
          <Ionicons name="pencil" size={16} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDeleteUser(item)}
        >
          <Ionicons name="trash" size={16} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderEmptyList = () => (
    <View style={styles.emptyState}>
      <Ionicons name="people-outline" size={64} color="#ccc" />
      <Text style={styles.emptyTitle}>Nenhum usuário encontrado</Text>
      <Text style={styles.emptySubtitle}>
        {searchText ? "Tente ajustar sua busca" : "Nenhum usuário cadastrado"}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      
      <View style={styles.header}>
        <Ionicons name="people" size={32} color="#1827ff" />
        <Text style={styles.headerTitle}>Lista de Usuários</Text>
      </View>

      <View style={styles.counterContainer}>
        <Text style={styles.counterText}>
          Total:{" "}
          <Text style={styles.counterNumber}>{filteredUsers.length}</Text>{" "}
          usuários
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
          placeholder="Buscar por nome ou email..."
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      <FlatList
        data={filteredUsers}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderUserItem}
        ListEmptyComponent={renderEmptyList}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />

      <TouchableOpacity style={styles.addButton}>
        <Ionicons name="person-add" size={20} color="#fff" />
        <Text style={styles.addButtonText}>Novo Usuário</Text>
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
  userCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  userTypeContainer: {
    alignItems: "flex-start",
  },
  typeBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  adminBadge: {
    backgroundColor: "#10b981",
  },
  userBadge: {
    backgroundColor: "#6b7280",
  },
  typeText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#fff",
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
