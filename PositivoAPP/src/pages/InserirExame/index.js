import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { cadastrarExame } from "../../services/examService";
import DropDownPicker from "react-native-dropdown-picker";
import { buscarTodosUsuarios } from "../../services/userService";

export default function InserirExame() {
  const navigation = useNavigation();
  const [form, setForm] = useState({
    hemacia: "",
    hemoglobina: "",
    hematocrito: "",
    vcm: "",
    hcm: "",
    chcm: "",
    rdw: "",
    leucocitos: "",
    neutrofilos: "",
    blastos: "",
    promielocitos: "",
    mielocitos: "",
    metamielocitos: "",
    bastonetes: "",
    segmentados: "",
    eosinofilos: "",
    basofilos: "",
    linfocitos: "",
    linfocitosAtipicos: "",
    monocitos: "",
    mieloblastos: "",
    outrasCelulas: "",
    celulasLinfoides: "",
    celulasMonocitoides: "",
    plaquetas: "",
    volumeplaquetariomedio: "",
    id_responsavel: "",
    id_preceptor: "",
    id_paciente: "",
    data: "",
  });
  const [loading, setLoading] = useState(false);
  const [usuarios, setUsuarios] = useState([]);
  const [openResponsavel, setOpenResponsavel] = useState(false);
  const [openPreceptor, setOpenPreceptor] = useState(false);

  useEffect(() => {
    const carregarUsuarios = async () => {
      try {
        const lista = await buscarTodosUsuarios();
        setUsuarios(lista);
      } catch (error) {
        console.error("Erro ao carregar usuários para seleção de exame", error);
        Alert.alert(
          "Erro",
          "Não foi possível carregar a lista de usuários. Tente novamente mais tarde."
        );
      }
    };

    carregarUsuarios();
  }, []);

  const handleChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const handleSave = async () => {
    if (!form.id_paciente || !form.data) {
      Alert.alert("Erro", "Número do Paciente e Data do Exame são obrigatórios.");
      return;
    }

    setLoading(true);
    try {
      await cadastrarExame(form);
    } catch (error) {
      Alert.alert("Erro", "Ocorreu um erro ao tentar cadastrar o exame.");
      console.error(error);
      return;
    } finally {
      setLoading(false);
    }

    Alert.alert("Sucesso", "Exame cadastrado com sucesso!", [
      {
        text: "OK",
        onPress: () => navigation.goBack(),
      },
    ]);
  };

  const renderRow = (inputs) => (
    <View style={styles.row}>
      {inputs.map(
        ([label, key], index) =>
          key && (
            <View style={styles.col} key={index}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>{label}</Text>
                <TextInput
                  style={styles.input}
                  value={form[key]}
                  onChangeText={(text) => handleChange(key, text)}
                  placeholder={"Digite o valor"}
                  keyboardType="numeric"
                />
              </View>
            </View>
          )
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#10b981" />
        </TouchableOpacity>
        <Ionicons name="add-circle" size={32} color="#10b981" />
        <Text style={styles.headerTitle}>Inserir Exame</Text>
      </View>

      <ScrollView contentContainerStyle={styles.formContainer}>
        <Text style={styles.sectionTitle}>Hemácias</Text>
        {renderRow([
          ["Hemácia", "hemacia"],
          ["Hemoglobina", "hemoglobina"],
        ])}
        {renderRow([
          ["Hematócrito", "hematocrito"],
          ["VCM", "vcm"],
        ])}
        {renderRow([
          ["HCM", "hcm"],
          ["CHCM", "chcm"],
        ])}
        {renderRow([
          ["RDW", "rdw"],
          [null, null],
        ])}

        <Text style={styles.sectionTitle}>Leucócitos</Text>
        {renderRow([
          ["Leucócitos", "leucocitos"],
          ["Neutrófilos", "neutrofilos"],
        ])}
        {renderRow([
          ["Blastos", "blastos"],
          ["Promielócitos", "promielocitos"],
        ])}
        {renderRow([
          ["Mielócitos", "mielocitos"],
          ["Metamielócitos", "metamielocitos"],
        ])}
        {renderRow([
          ["Bastonetes", "bastonetes"],
          ["Segmentados", "segmentados"],
        ])}
        {renderRow([
          ["Eosinófilos", "eosinofilos"],
          ["Basófilos", "basofilos"],
        ])}
        {renderRow([
          ["Linfócitos", "linfocitos"],
          ["Linfócitos Atípicos", "linfocitosAtipicos"],
        ])}
        {renderRow([
          ["Monócitos", "monocitos"],
          ["Mieloblastos", "mieloblastos"],
        ])}
        {renderRow([
          ["Outras Células", "outrasCelulas"],
          ["Células Linfoides", "celulasLinfoides"],
        ])}
        {renderRow([
          ["Células Monocitoides", "celulasMonocitoides"],
          [null, null],
        ])}

        <Text style={styles.sectionTitle}>Plaquetas</Text>
        {renderRow([
          ["Plaquetas", "plaquetas"],
          ["Vol. Plaquetário Médio", "volumeplaquetariomedio"],
        ])}

        <Text style={styles.sectionTitle}>Identificação</Text>

        <View style={[styles.identificacaoContainer, { zIndex: 3000 }]}>
          <Text style={styles.label}>Responsável</Text>
          <DropDownPicker
            open={openResponsavel}
            value={form.id_responsavel}
            items={usuarios.map((u) => ({ label: u.nome, value: u.id }))}
            setOpen={setOpenResponsavel}
            setValue={(callback) => {
              const value = callback(form.id_responsavel);
              handleChange("id_responsavel", value);
            }}
            listMode="SCROLLVIEW"
            placeholder="Selecione o responsável"
            style={styles.dropdownStyle}
            containerStyle={styles.dropdownContainer}
            textStyle={{ fontSize: 16, color: form.id_responsavel ? "#333" : "#a1a1a1" }}
            showTickIcon={true}
            TickIconComponent={({ style }) => (
              <Ionicons
                name="checkmark-circle"
                size={20}
                color="#10b981"
                style={style}
              />
            )}
            autoScroll={true}
            disabled={usuarios.length === 0}
          />
        </View>

        <View style={[styles.identificacaoContainer, { zIndex: 2000 }]}>
          <Text style={styles.label}>Preceptor</Text>
          <DropDownPicker
            open={openPreceptor}
            value={form.id_preceptor}
            items={usuarios.map((u) => ({ label: u.nome, value: u.id }))}
            setOpen={setOpenPreceptor}
            setValue={(callback) => {
              const value = callback(form.id_preceptor);
              handleChange("id_preceptor", value);
            }}
            listMode="SCROLLVIEW"
            placeholder="Selecione o preceptor"
            style={styles.dropdownStyle}
            containerStyle={styles.dropdownContainer}
            textStyle={{ fontSize: 16, color: form.id_preceptor ? "#333" : "#a1a1a1" }}
            showTickIcon={true}
            TickIconComponent={({ style }) => (
              <Ionicons
                name="checkmark-circle"
                size={20}
                color="#10b981"
                style={style}
              />
            )}
            autoScroll={true}
            disabled={usuarios.length === 0}
          />
        </View>

        {renderRow([
          ["Numero do Paciente *", "id_paciente"],
          ["Data do Exame *", "data"],
        ])}

        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#10b981" }]}
          onPress={handleSave}
        >
          <Ionicons name="save" size={20} color="#fff" />
          <Text style={styles.buttonText}>Salvar Exame</Text>
        </TouchableOpacity>
      </ScrollView>
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
    marginTop: 20,
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
    color: "#10b981",
  },
  formContainer: {
    paddingBottom: 100,
  },
  dropdownContainer: {
    height: 50,
  },
  dropdownStyle: {
    backgroundColor: "#f8f8f8",
    borderRadius: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    minHeight: 50,
  },
  identificacaoContainer: {
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    color: "#10b981",
  },
  row: {
    flexDirection: "row",
    gap: 12,
  },
  col: {
    flex: 1,
  },
  inputGroup: {
    marginBottom: 12,
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
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 30,
    gap: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
