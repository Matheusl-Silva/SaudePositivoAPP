import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
} from "react-native";
import { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { useNavigation, useRoute } from "@react-navigation/native";
import { atualizarPaciente } from "../../services/pacienteService";
import DropDownPicker from "react-native-dropdown-picker";

export default function EditPaciente() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cpf, setCpf] = useState("");
  const [periodo, setPeriodo] = useState("Manhã");
  const [medicamento, setMedicamento] = useState("");
  const [patologia, setPatologia] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const navigation = useNavigation();
  const route = useRoute();
  const { paciente } = route.params || {};

  const items = [
    { label: "Manhã", value: "Manhã" },
    { label: "Tarde", value: "Tarde" },
    { label: "Noite", value: "Noite" },
  ];

  useEffect(() => {
    
    if (paciente) {
      setNome(paciente.cnome || "");
      setEmail(paciente.cemail || "");
      setTelefone(paciente.ctelefone || "");
      setCpf(paciente.ccpf || "");
      
      const periodoMap = {
        "matutino": "Manhã",
        "vespertino": "Tarde",
        "noturno": "Noite",
        "Manhã": "Manhã",
        "Tarde": "Tarde",
        "Noite": "Noite"
      };
      setPeriodo(periodoMap[paciente.cperiodo] || "Manhã");
      
      setMedicamento(paciente.cmedicamento || "");
      setPatologia(paciente.cpatologia || "");
      
      if (paciente.ddata_nascimento) {
        const data = new Date(paciente.ddata_nascimento);
        const dia = String(data.getDate()).padStart(2, "0");
        const mes = String(data.getMonth() + 1).padStart(2, "0");
        const ano = data.getFullYear();
        setDataNascimento(`${dia}/${mes}/${ano}`);
      } else {
        setDataNascimento("");
      }
    }
  }, [paciente]);

  const validarDados = () => {
    if (!nome.trim()) {
      Alert.alert("Erro", "O nome completo é obrigatório.");
      return false;
    }

    if (!email.trim()) {
      Alert.alert("Erro", "O email é obrigatório.");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Erro", "Por favor, insira um email válido.");
      return false;
    }

    if (!telefone.trim()) {
      Alert.alert("Erro", "O telefone é obrigatório.");
      return false;
    }

    if (!cpf.trim()) {
      Alert.alert("Erro", "O CPF é obrigatório.");
      return false;
    }

    if (!dataNascimento.trim()) {
      Alert.alert("Erro", "A data de nascimento é obrigatória.");
      return false;
    }

    return true;
  };

  function formatarData(text) {
    const digits = text.replace(/\D/g, "").slice(0, 8);
    let formatted = digits;

    if (digits.length > 2 && digits.length <= 4) {
      formatted = digits.slice(0, 2) + "/" + digits.slice(2);
    } else if (digits.length > 4) {
      formatted =
        digits.slice(0, 2) + "/" + digits.slice(2, 4) + "/" + digits.slice(4);
    }

    return formatted;
  }

  function formatarTelefone(text) {
    const digits = text.replace(/\D/g, "").slice(0, 11);

    if (digits.length <= 2) {
      return `(${digits}`;
    } else if (digits.length <= 7) {
      return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    } else if (digits.length <= 11) {
      return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
    }

    return digits;
  }

  const formatarCPF = (text) => {
    const numeros = text.replace(/\D/g, "");
    if (numeros.length <= 3) return numeros;
    if (numeros.length <= 6)
      return `${numeros.slice(0, 3)}.${numeros.slice(3)}`;
    if (numeros.length <= 9)
      return `${numeros.slice(0, 3)}.${numeros.slice(3, 6)}.${numeros.slice(6)}`;
    return `${numeros.slice(0, 3)}.${numeros.slice(3, 6)}.${numeros.slice(
      6,
      9
    )}-${numeros.slice(9, 11)}`;
  };

  const handleSave = async () => {
    if (validarDados()) {
      setLoading(true);
      try {
        const result = await atualizarPaciente(
          paciente.id,
          nome,
          email,
          telefone,
          cpf,
          periodo,
          medicamento,
          patologia,
          dataNascimento
        );
        if (result.error) {
          Alert.alert("Erro", result.error);
          return;
        }
      } catch (error) {
        console.error(error.response?.data || error.message);
        Alert.alert(
          "Erro",
          error.response?.data?.message ||
            "Ocorreu um erro ao tentar atualizar o paciente."
        );
        return;
      } finally {
        setLoading(false);
      }
      Alert.alert("Sucesso", "Paciente atualizado com sucesso!", [
        {
          text: "OK",
          onPress: () => navigation.goBack(),
        },
      ]);
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#1827ff" />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Ionicons name="medkit-outline" size={32} color="#1827ff" />
          <Text style={styles.headerTitle}>Editar Paciente</Text>
        </View>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.title}>Atualizar Informações</Text>
        <Text style={styles.subtitle}>Edite os dados do paciente abaixo</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>
            Nome Completo <Text style={styles.required}>*</Text>
          </Text>
          <View style={styles.inputWrapper}>
            <Ionicons
              name="person-outline"
              size={20}
              color="#666"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Insira o nome completo"
              value={nome}
              onChangeText={setNome}
              autoCapitalize="words"
              autoCorrect={false}
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>
            E-mail <Text style={styles.required}>*</Text>
          </Text>
          <View style={styles.inputWrapper}>
            <Ionicons
              name="mail-outline"
              size={20}
              color="#666"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Insira um e-mail válido"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>
            Telefone <Text style={styles.required}>*</Text>
          </Text>
          <View style={styles.inputWrapper}>
            <Ionicons
              name="call-outline"
              size={20}
              color="#666"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="(00) 00000-0000"
              value={telefone}
              onChangeText={(text) => setTelefone(formatarTelefone(text))}
              keyboardType="phone-pad"
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>
            CPF <Text style={styles.required}>*</Text>
          </Text>
          <View style={styles.inputWrapper}>
            <Ionicons
              name="card-outline"
              size={20}
              color="#666"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="000.000.000-00"
              value={cpf}
              onChangeText={(text) => setCpf(formatarCPF(text))}
              keyboardType="numeric"
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>
            Data de Nascimento <Text style={styles.required}>*</Text>
          </Text>
          <View style={styles.inputWrapper}>
            <Ionicons
              name="calendar-outline"
              size={20}
              color="#666"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="DD/MM/AAAA"
              value={dataNascimento}
              onChangeText={(text) => setDataNascimento(formatarData(text))}
              keyboardType="numeric"
            />
          </View>
        </View>

        <Text style={styles.label}>
          Período <Text style={styles.required}>*</Text>
        </Text>

        <View style={styles.inputContainer}>
          <DropDownPicker
            open={open}
            value={periodo}
            items={items}
            setOpen={setOpen}
            setValue={setPeriodo}
            listMode="SCROLLVIEW"
            placeholder="Selecione um período"
            style={styles.dropdownStyle}
            containerStyle={styles.dropdownContainer}
            textStyle={{ fontSize: 16, color: periodo ? "#333" : "#a1a1a1" }}
            showTickIcon={true}
            TickIconComponent={({ style }) => (
              <Ionicons
                name="checkmark-circle"
                size={20}
                color="#1827ff"
                style={style}
              />
            )}
            autoScroll={true}
          />
        </View>

        <View style={styles.divider}>
          <Text style={styles.dividerText}>Informações Adicionais</Text>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Medicamento</Text>
          <View style={styles.inputWrapper}>
            <Ionicons
              name="medkit-outline"
              size={20}
              color="#666"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Informe o medicamento"
              value={medicamento}
              onChangeText={setMedicamento}
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Patologia</Text>
          <View style={styles.inputWrapper}>
            <Ionicons
              name="bandage-outline"
              size={20}
              color="#666"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Informe a patologia"
              value={patologia}
              onChangeText={setPatologia}
            />
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSave}
            disabled={loading}
          >
            <Text style={styles.saveButtonText}>
              {loading ? "Salvando..." : "Salvar Alterações"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.cancelButtonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
    dropdownContainer: {
    height: 50,
    zIndex: 1000,
  },
  dropdownStyle: {
    backgroundColor: "#f8f8f8",
    borderRadius: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    minHeight: 50,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 20,
  },
  backButton: {
    padding: 8,
    marginRight: 16,
  },
  headerContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 48,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 12,
    color: "#1827ff",
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 30,
    color: "#666",
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: "#333",
  },
  required: {
    color: "red",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
    borderRadius: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 15,
    fontSize: 16,
    color: "#333",
  },
  pickerWrapper: {
    backgroundColor: "#f8f8f8",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  picker: {
    color: "#333",
  },
  divider: {
    alignItems: "center",
    marginVertical: 20,
  },
  dividerText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    position: "relative",
  },
  buttonContainer: {
    gap: 12,
    marginTop: 20,
  },
  saveButton: {
    backgroundColor: "#1827ff",
    paddingVertical: 15,
    borderRadius: 10,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  cancelButton: {
    backgroundColor: "transparent",
    paddingVertical: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#666",
  },
  cancelButtonText: {
    color: "#666",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
});