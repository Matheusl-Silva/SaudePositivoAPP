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
import { useNavigation, useRoute } from "@react-navigation/native";
import { atualizarExame, deletarExame } from "../../services/examService";
import { buscarTodosUsuarios } from "../../services/userService";
import { AdminOnly } from "../../components/AdminOnly";
import { useAuth } from "../../contexts/AuthContext";
import DropDownPicker from "react-native-dropdown-picker";

export default function VisualizarExame({ route }) {
  const navigation = useNavigation();
  const routeParams = useRoute().params;
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
    const exame = routeParams?.exame;
    if (!exame) {
      console.log("AVISO: Nenhum exame foi passado nos parâmetros!");
      return;
    }
    // Força atualização completa do form
    const formData = {
      id: exame.id?.toString() || "",
      hemacia: exame.hemacia?.toString() || "",
      hemoglobina: exame.hemoglobina?.toString() || "",
      hematocrito: exame.hematocrito?.toString() || "",
      vcm: exame.vcm?.toString() || "",
      hcm: exame.hcm?.toString() || "",
      chcm: exame.chcm?.toString() || "",
      rdw: exame.rdw?.toString() || "",
      leucocitos: exame.leucocitos?.toString() || "",
      neutrofilos: exame.neutrofilos?.toString() || "",
      blastos: exame.blastos?.toString() || "",
      promielocitos: exame.promielocitos?.toString() || "",
      mielocitos: exame.mielocitos?.toString() || "",
      metamielocitos: exame.metamielocitos?.toString() || "",
      bastonetes: exame.bastonetes?.toString() || "",
      segmentados: exame.segmentados?.toString() || "",
      eosinofilos: exame.eosinofilos?.toString() || "",
      basofilos: exame.basofilos?.toString() || "",
      linfocitos: exame.linfocitos?.toString() || "",
      linfocitosAtipicos: exame.linfocitosAtipicos?.toString() || "",
      monocitos: exame.monocitos?.toString() || "",
      mieloblastos: exame.mieloblastos?.toString() || "",
      outrasCelulas: exame.outrasCelulas?.toString() || "",
      celulasLinfoides: exame.celulasLinfoides?.toString() || "",
      celulasMonocitoides: exame.celulasMonocitoides?.toString() || "",
      plaquetas: exame.plaquetas?.toString() || "",
      volumePlaquetarioMedio: exame.volumePlaquetarioMedio?.toString() || "",
      idResponsavel: exame.idResponsavel?.toString() || "",
      idPreceptor: exame.idPreceptor?.toString() || "",
      idPaciente: exame.idPaciente?.toString() || "",
      data: new Date(exame.data).toLocaleDateString("pt-BR"),
    };
    setForm(formData);
  }, [routeParams]);

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const { isAdmin } = useAuth();
  const [userIsAdmin, setUserIsAdmin] = useState(false);
  const [usuarios, setUsuarios] = useState([]);
  const [openResponsavel, setOpenResponsavel] = useState(false);
  const [openPreceptor, setOpenPreceptor] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Check admin status
        const adminStatus = await isAdmin();
        setUserIsAdmin(adminStatus);
        
        // Load users for dropdowns
        const listaUsuarios = await buscarTodosUsuarios();
        setUsuarios(listaUsuarios);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
        Alert.alert("Erro", "Não foi possível carregar os dados necessários.");
      }
    };
    
    loadData();
  }, [isAdmin]);

  const handleChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const handlePressEdit = () => {
    if (userIsAdmin) {
      setIsEditing(true);
    } else {
      Alert.alert("Acesso Negado", "Apenas administradores podem editar exames.");
    }
  };

  const handlePressSave = async () => {
    setLoading(true);
    try {
      const result = await atualizarExame({
        ...form,
        id: routeParams.exame.id,
      });
      if (result.error) {
        Alert.alert("Erro", result.error);
        setLoading(false);
        return;
      }
      setLoading(false);
      setIsEditing(false);
      Alert.alert("Sucesso", "Exame atualizado com sucesso!", [
        {
          text: "OK",
          onPress: () => navigation.navigate("BuscarExames", { idPaciente: form.idPaciente }),
        },
      ]);
    } catch (error) {
      console.error(error.response?.data || error.message);
      setLoading(false);
      Alert.alert(
        "Erro",
        error.response?.data?.message ||
          "Ocorreu um erro ao tentar atualizar o exame."
      );
    }
  };

  const handlePressCancel = () => {
    // Recarregar os dados originais do exame
    const exame = routeParams?.exame;
    if (exame) {
      setForm({
        id: exame.id?.toString() || "",
        hemacia: exame.hemacia?.toString() || "",
        hemoglobina: exame.hemoglobina?.toString() || "",
        hematocrito: exame.hematocrito?.toString() || "",
        vcm: exame.vcm?.toString() || "",
        hcm: exame.hcm?.toString() || "",
        chcm: exame.chcm?.toString() || "",
        rdw: exame.rdw?.toString() || "",
        leucocitos: exame.leucocitos?.toString() || "",
        neutrofilos: exame.neutrofilos?.toString() || "",
        blastos: exame.blastos?.toString() || "",
        promielocitos: exame.promielocitos?.toString() || "",
        mielocitos: exame.mielocitos?.toString() || "",
        metamielocitos: exame.metamielocitos?.toString() || "",
        bastonetes: exame.bastonetes?.toString() || "",
        segmentados: exame.segmentados?.toString() || "",
        eosinofilos: exame.eosinofilos?.toString() || "",
        basofilos: exame.basofilos?.toString() || "",
        linfocitos: exame.linfocitos?.toString() || "",
        linfocitosAtipicos: exame.linfocitosAtipicos?.toString() || "",
        monocitos: exame.monocitos?.toString() || "",
        mieloblastos: exame.mieloblastos?.toString() || "",
        outrasCelulas: exame.outrasCelulas?.toString() || "",
        celulasLinfoides: exame.celulasLinfoides?.toString() || "",
        celulasMonocitoides: exame.celulasMonocitoides?.toString() || "",
        plaquetas: exame.plaquetas?.toString() || "",
        volumePlaquetarioMedio: exame.volumePlaquetarioMedio?.toString() || "",
        idResponsavel: exame.idResponsavel?.toString() || "",
        idPreceptor: exame.idPreceptor?.toString() || "",
        idPaciente: exame.idPaciente?.toString() || "",
        data: new Date(exame.data).toLocaleDateString("pt-BR"),
      });
    }
    setIsEditing(false);
  };

  const handleDelete = () => {
    const exame = routeParams?.exame;
    Alert.alert("Confirmar", `Excluir exame de número ${exame.id}?`, [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: async () => {
          try {
            const result = await deletarExame(exame.id);
            if (result.error) {
              Alert.alert("Erro", result.error);
              return;
            }
            //setExames(exames.filter((e) => e.id !== exame.id));
            Alert.alert("Sucesso", "Exame excluído!");
            navigation.navigate("BuscarExames", { idPaciente: form.idPaciente });
          } catch (error) {
            Alert.alert("Erro", "Não foi possível excluir o exame.");
            console.log("Erro ao excluir exame: ", error);
          }
        },
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
                  style={[styles.input, (!isEditing || !userIsAdmin) && styles.inputDisabled]}
                  value={String(form[key]) ?? ""}
                  onChangeText={(text) => handleChange(key, text)}
                  placeholder={"Digite o valor"}
                  keyboardType="numeric"
                  editable={isEditing && userIsAdmin}
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
        <Text style={styles.headerTitle}>
          {isEditing ? "Editar Exame" : "Visualizar Exame"}
        </Text>
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
        <View style={[styles.identificacaoContainer, { zIndex: 3000, marginBottom: 20 }]}>
          <Text style={styles.label}>Responsável</Text>
          <DropDownPicker
            open={openResponsavel}
            value={form.idResponsavel}
            items={usuarios.map((u) => ({ label: u.nome, value: u.id }))}
            setOpen={setOpenResponsavel}
            setValue={(callback) => {
              const value = callback(form.idResponsavel);
              handleChange("idResponsavel", value);
            }}
            listMode="SCROLLVIEW"
            placeholder="Selecione o responsável"
            style={styles.dropdownStyle}
            containerStyle={styles.dropdownContainer}
            textStyle={{ fontSize: 16, color: form.idResponsavel ? "#333" : "#a1a1a1" }}
            showTickIcon={true}
            disabled={!isEditing || !userIsAdmin}
            disableBorderRadius={false}
          />
        </View>

        <View style={[styles.identificacaoContainer, { zIndex: 2000, marginBottom: 20 }]}>
          <Text style={styles.label}>Preceptor</Text>
          <DropDownPicker
            open={openPreceptor}
            value={form.idPreceptor}
            items={usuarios.map((u) => ({ label: u.nome, value: u.id }))}
            setOpen={setOpenPreceptor}
            setValue={(callback) => {
              const value = callback(form.idPreceptor);
              handleChange("idPreceptor", value);
            }}
            listMode="SCROLLVIEW"
            placeholder="Selecione o preceptor"
            style={styles.dropdownStyle}
            containerStyle={styles.dropdownContainer}
            textStyle={{ fontSize: 16, color: form.idPreceptor ? "#333" : "#a1a1a1" }}
            showTickIcon={true}
            disabled={!isEditing || !userIsAdmin}
            disableBorderRadius={false}
          />
        </View>
        {renderRow([
          ["Numero do Paciente", "idPaciente"],
          ["Data do Exame", "data"],
        ])}

        {userIsAdmin && (
          <TouchableOpacity
            style={[
              styles.button,
              { backgroundColor: isEditing ? "#10b981" : "#1827ff" },
            ]}
            onPress={isEditing ? handlePressSave : handlePressEdit}
            disabled={loading}
          >
            <Ionicons
              name={isEditing ? "save" : "pencil-sharp"}
              size={20}
              color="#fff"
            />
            <Text style={styles.buttonText}>
              {loading ? "Salvando..." : isEditing ? "Salvar" : "Editar"}
            </Text>
          </TouchableOpacity>
        )}

        {userIsAdmin && (
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#cc2121", marginTop: 5 }]}
            onPress={isEditing ? handlePressCancel : handleDelete}
            disabled={loading}
          >
            <Ionicons
              name={isEditing ? "close" : "trash"}
              size={20}
              color="#fff"
            />
            <Text style={styles.buttonText}>
              {isEditing ? "Cancelar" : "Excluir"}
            </Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  identificacaoContainer: {
    marginBottom: 15,
    zIndex: 1,
  },
  dropdownStyle: {
    borderColor: "#e2e8f0",
    backgroundColor: "#f8fafc",
    minHeight: 50,
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  dropdownContainer: {
    marginTop: 5,
    zIndex: 1000,
  },
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
  inputDisabled: {
    backgroundColor: "#e8e8e8",
    color: "#666",
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
