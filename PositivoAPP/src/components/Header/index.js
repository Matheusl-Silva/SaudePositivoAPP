import { View, Text, StyleSheet, StatusBar } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const statusBarHeight = StatusBar.currentHeight ? StatusBar.currentHeight : 64;

export default function Header({ nomeUsuario = "Usuário" }) {
  return (
    <View style={styles.container}>
      <View style={styles.containerLogo}>
        <Ionicons name="medical" size={24} color="#1827ff" />
        <Text style={styles.textLogo}>Saúde Positivo</Text>
      </View>
      <Text style={styles.textUser}> Olá, <Text style={{fontWeight: 'bold'}}>{nomeUsuario}</Text></Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#fff",
    justifyContent: "space-between",
    alignItems: "flex-center",
    paddingHorizontal: 30,
    paddingVertical: 20,
    marginTop: statusBarHeight,
    borderBottomWidth: 3,
    borderColor: '#777'
  },
  containerLogo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textLogo: {
    color: "#1827ff",
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 12,
  },
  textUser: {
    fontSize: 18}
});
