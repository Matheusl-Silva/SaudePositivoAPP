import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";


export default function Header(){
    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Ionicons name="arrow-back" size={24} color="#000" />
                <Text style={styles.headerTitle}>Exames realizados</Text>
            </View>
            <View style={styles.userBox}>
                <Ionicons name="person-circle-outline" size={32} color="#aaa" />
                <View style={{ marginLeft: 10 }}>
                    <Text style={styles.userName}>Gabriel de Castro Juliati</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
  header: { flexDirection: "row", alignItems: "center", marginBottom: 16 },
  headerTitle: { fontSize: 20, fontWeight: "bold", marginLeft: 12 },
  userBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
    padding: 12,
    borderRadius: 10,
    marginBottom: 16,
  },
  userName: { fontSize: 16, fontWeight: "bold" },
  userCard: { fontSize: 14, color: "#666" },

});
