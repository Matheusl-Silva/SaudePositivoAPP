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
import { atualizarExame } from "../../services/examService";

export default function VisualizarExame({ route }) {
  const navigation = useNavigation();
  const [form, setForm] = useState({
    id: "",
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
    data: "",
  });

  useEffect(() => {
    const exame = route?.params?.exame;
    if (!exame) return;
    // Força atualização completa do form
    setForm({
      id: exame.id?.toString() || "",
      hemacia: exame.hemacia || "",
      hemoglobina: exame.hemoglobina || "",
      hematocrito: exame.hematocrito || "",
      vcm: exame.vcm || "",
      hcm: exame.hcm || "",
      chcm: exame.chcm || "",
      rdw: exame.rdw || "",
      leucocitos: exame.leucocitos || "",
      neutrofilos: exame.neutrofilos || "",
      blastos: exame.blastos || "",
      promielocitos: exame.promielocitos || "",
      mielocitos: exame.mielocitos || "",
      metamielocitos: exame.metamielocitos || "",
      bastonetes: exame.bastonetes || "",
      segmentados: exame.segmentados || "",
      eosinofilos: exame.eosinofilos || "",
      basofilos: exame.basofilos || "",
      linfocitos: exame.linfocitos || "",
      linfocitosAtipicos: exame.linfocitosAtipicos || "",
      monocitos: exame.monocitos || "",
      mieloblastos: exame.mieloblastos || "",
      outrasCelulas: exame.outrasCelulas || "",
      celulasLinfoides: exame.celulasLinfoides || "",
      celulasMonocitoides: exame.celulasMonocitoides || "",
      plaquetas: exame.plaquetas || "",
      volumePlaquetarioMedio: exame.volumePlaquetarioMedio || "",
      idResponsavel: exame.idResponsavel?.toString() || "",
      idPreceptor: exame.idPreceptor?.toString() || "",
      idPaciente: exame.idPaciente?.toString() || "",
      data: exame.data ? exame.data.split("T")[0] : "",
    });
  }, [route]);

  const [loading, setLoading] = useState(false);
  const [buttonColor, setButtonColor] = useState("#1827ff");
  const [title, setTitle] = useState("Visualizar Exame");
  const [editButtonIcon, setEditButtonIcon] = useState("pencil-sharp");
  const [buttonText, setButtonText] = useState("Editar");
  const [deleteButtonIcon, setDeleteButtonIcon] = useState("trash");
  const [deleteButtonText, setDeleteButtonText] = useState("Excluir");

  const [deleteButtonFunction, setDeleteButtonFunction] = useState(
    () => () => {}
  ); //Colocar a função de excluir exame aqui depois

  const handleChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const handlePressEdit = () => {
    setButtonColor("#10b981");
    setTitle("Editar Exame");
    setEditButtonIcon("save");
    setButtonText("Salvar");
    setDeleteButtonIcon("close");
    setDeleteButtonText("Cancelar");

    setEditButtonFunction(() => handlePressSave);
    setDeleteButtonFunction(() => handlePressCancel);
  };

  const [editButtonFunction, setEditButtonFunction] = useState(
    () => handlePressEdit
  );

  const handlePressSave = async () => {
    setLoading(true);
    try {
      //handleChange();
      console.log("form antes de enviar: ", form);
      const result = await atualizarExame({
        ...form,
        id: route.params.exame.id,
      });
      if (result.error) {
        Alert.alert("Erro", result.error);
        return;
      }
    } catch (error) {
      console.error(error.response?.data || error.message);
      Alert.alert(
        "Erro",
        error.response?.data?.message ||
          "Ocorreu um erro ao tentar atualizar o exame."
      );
      return;
    } finally {
      setLoading(false);
    }
    Alert.alert("Sucesso", "Exame atualizado com sucesso!", [
      {
        text: "OK",
        onPress: () => navigation.goBack(),
      },
    ]);
  };

  const handlePressCancel = () => {
    setButtonColor("#1827ff");
    setTitle("Visualizar Exame");
    setEditButtonIcon("pencil-sharp");
    setButtonText("Editar");
    setDeleteButtonIcon("trash");
    setDeleteButtonText("Excluir");

    setDeleteButtonFunction(() => () => {}); //Colocar a função de excluir exame aqui depois
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
                  value={String(form[key]) ?? ""}
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
          <Ionicons name="arrow-back" size={24} color="#1827ff" />
        </TouchableOpacity>
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
          ["Data do Exame", "data"],
        ])}

        <TouchableOpacity //Botão de edição
          style={[styles.button, { backgroundColor: buttonColor }]}
          onPress={editButtonFunction}
        >
          <Ionicons name={editButtonIcon} size={20} color="#fff" />
          <Text style={styles.buttonText}>{buttonText}</Text>
        </TouchableOpacity>

        <TouchableOpacity //Botão de exclusão
          style={[styles.button, { backgroundColor: "#cc2121", marginTop: 5 }]}
          onPress={deleteButtonFunction}
        >
          <Ionicons name={deleteButtonIcon} size={20} color="#fff" />
          <Text style={styles.buttonText}>{deleteButtonText}</Text>
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
