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

export default function EditarExame() {
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
    volumePlaquetarioMedio: "",
    idResponsavel: "",
    idPreceptor: "",
    idPaciente: "",
    dataExame: "",
  });

  const [buttonColor, setButtonColor] = useState("#1827ff");
  const [title, setTitle] = useState("Cadastrar Exame");
  const [buttonIcon, setButtonIcon] = useState("save");
  const [buttonText, setButtonText] = useState("Editar");

  const handleChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const handlePress = () => {
    setButtonColor("#10b981");
    setTitle("Editar Exame");
    setButtonIcon("pencil-sharp");
    setButtonText("Salvar");
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
        <Ionicons name="document-text" size={32} color="#1827ff" />
        <Text style={styles.headerTitle}>{title}</Text>
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
          ["Vol. Plaquetário Médio", "volumePlaquetarioMedio"],
        ])}

        <Text style={styles.sectionTitle}>Identificação</Text>
        {renderRow([
          ["ID Responsável", "idResponsavel"],
          ["ID Preceptor", "idPreceptor"],
        ])}
        {renderRow([
          ["ID Paciente", "idPaciente"],
          ["Data do Exame", "dataExame"],
        ])}

        <TouchableOpacity
          style={[styles.editButton, { backgroundColor: buttonColor }]}
          onPress={handlePress}
        >
          <Ionicons name={buttonIcon} size={20} color="#fff" />
          <Text style={styles.editButtonText}>{buttonText}</Text>
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
    marginTop: 60,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 12,
    color: "#1827ff",
  },
  formContainer: {
    paddingBottom: 100,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    color: "#1827ff",
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
  editButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1827ff",
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 30,
    gap: 8,
  },
  editButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
