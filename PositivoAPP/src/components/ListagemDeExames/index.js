import { View, Text, StyleSheet, ScrollView } from "react-native";


export default function Listagem() {
      const liberacoes = [
        {
            autorizado: false,
            id: 1,
            responsavel: "Aluno de exemplo 1",
            preceptor: "Fernanda",
            validade: "08/09/2025",
        },
        {
            autorizado: true,
            id: 2,
            responsavel: "Aluno de exemplo 2",
            preceptor: "Fernanda",
            validade: "07/09/2025",
        },
        {
            autorizado: true,
            id: 3,
            responsavel: "Aluno de exemplo 3",
            preceptor: "Fernanda",
            validade: "07/09/2025",
        },
      ];

    return (
        <View style={styles.container}>
            <ScrollView>
                {liberacoes.map((item) => (
                    <View key={item.id} style={styles.card}>
                        <View
                            style={
                                item.autorizado
                                    ? styles.badgeAutorizado
                                    : styles.badgePendente
                            }
                        >
                            <Text
                                style={
                                    item.autorizado
                                        ? styles.badgeTextAutorizado
                                        : styles.badgeTextPendente
                                }
                            >
                                {item.autorizado ? "AUTORIZADO" : "PENDENTE"}
                            </Text>
                        </View>
                        <Text style={styles.responsavel}>Responsável: {item.responsavel}</Text>
                        <View style={styles.infoBox}>
                            <Text style={styles.info}>Preceptor responsável: {item.preceptor}</Text>
                            <Text style={styles.info}>Data do exame: {item.validade}</Text>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#eee",
  },
  badgeAutorizado: {
    backgroundColor: "#e8f8e5ff",
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    marginBottom: 6,
  },
  badgePendente: {
    backgroundColor: "#f8f8e5ff",
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    marginBottom: 6,
  },
  badgeTextAutorizado: { color: "#008c3a", fontWeight: "bold", fontSize: 12 },
  badgeTextPendente: { color: "#ffda07ff", fontWeight: "bold", fontSize: 12 },
  responsavel: { fontWeight: "bold", marginBottom: 6 },
  infoBox: { backgroundColor: "#f9f9f9", padding: 8, borderRadius: 6 },
  info: { fontSize: 14, color: "#333", marginBottom: 4 },
});