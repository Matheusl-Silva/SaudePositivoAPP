import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
} from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";

export default function EditPaciente({ navigation }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cpf, setCpf] = useState("");
  const [periodo, setPeriodo] = useState("Manhã");
  const [medicamento, setMedicamento] = useState("");
  const [patologia, setPatologia] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [dataCadastro, setDataCadastro] = useState("");

  const validarDados = () => {
    if (!nome.trim()) {
      Alert.alert("Erro", "O nome completo é obrigatório.");
      return false;
    }
    if (!email.trim()) {
      Alert.alert("Erro", "O email é obrigatório.");
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
        return `${numeros.slice(0, 3)}.${numeros.slice(3, 6)}.${numeros.slice(
            6
        )}`;
        return `${numeros.slice(0, 3)}.${numeros.slice(3, 6)}.${numeros.slice(
        6,
        9
        )}-${numeros.slice(9, 11)}`;
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
            <Ionicons name="person-outline" size={20} color="#666" style={styles.inputIcon} />
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
            <Ionicons name="mail-outline" size={20} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Insira um e-mail válido"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>
            Telefone <Text style={styles.required}>*</Text>
          </Text>
          <View style={styles.inputWrapper}>
            <Ionicons name="call-outline" size={20} color="#666" style={styles.inputIcon} />
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
            <Ionicons name="card-outline" size={20} color="#666" style={styles.inputIcon} />
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
                Período <Text style={styles.required}>*</Text>
            </Text>
            <View style={styles.pickerWrapper}>
                <Picker
                    selectedValue={periodo}
                    onValueChange={(itemValue) => setPeriodo(itemValue)}
                    style={styles.picker}
                >
                    <Picker.Item label="Manhã" value="Manhã" />
                    <Picker.Item label="Tarde" value="Tarde" />
                    <Picker.Item label="Noite" value="Noite" />
                </Picker>
            </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Medicamento</Text>
          <View style={styles.inputWrapper}>
            <Ionicons name="medkit-outline" size={20} color="#666" style={styles.inputIcon} />
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
            <Ionicons name="bandage-outline" size={20} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Informe a patologia"
              value={patologia}
              onChangeText={setPatologia}
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>
            Data de Nascimento <Text style={styles.required}>*</Text>
          </Text>
          <View style={styles.inputWrapper}>
            <Ionicons name="calendar-outline" size={20} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="DD/MM/AAAA"
              value={dataNascimento}
              onChangeText={(text) => setDataNascimento(formatarData(text))}
              keyboardType="numeric"
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Data de Cadastro</Text>
          <View style={styles.inputWrapper}>
            <Ionicons name="time-outline" size={20} color="#666" style={styles.inputIcon} />
            <TextInput
              style={[styles.input, { color: "#999" }]}
              value={dataCadastro}
              editable={false}
            />
          </View>
        </View>

        <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
          <Text style={styles.cancelButtonText}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 20,
  },
  backButton: { padding: 8, marginRight: 16 },
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
  formContainer: { flex: 1, paddingHorizontal: 24, paddingBottom: 40 },
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
  inputContainer: { marginBottom: 20 },
  label: { fontSize: 16, fontWeight: "600", marginBottom: 8, color: "#333" },
  required: { color: "red" },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
    borderRadius: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  inputIcon: { marginRight: 10 },
  input: { flex: 1, paddingVertical: 15, fontSize: 16, color: "#333" },
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

  pickerWrapper: {
    backgroundColor: "#f8f8f8",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },

  picker: {
    color: "#333",
  },
});
