import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from "react-native";
import Header from '../../components/Header'
import Listagem from '../../components/ListagemDeExames'

export default function VisualizacaoExames() {


  return (
    <SafeAreaView style={styles.container}>

      <Header />

      {/* Consultar liberações */}
      <View style={styles.consultar}>
        <Text style={styles.consultarText}>Consultar exames:</Text>
        <TouchableOpacity>
          <Text style={styles.pesquisarText}>Pesquisar</Text>
        </TouchableOpacity>
      </View>

      <Listagem />
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16, marginTop: 20 },
  consultar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  consultarText: { fontSize: 16, fontWeight: "bold" },
  pesquisarText: { fontSize: 16, color: "#1827ffff" },
});
