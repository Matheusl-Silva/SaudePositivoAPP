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

import DropDownPicker from "react-native-dropdown-picker";

export default function CreatePaciente({ navigation }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [periodo, setPeriodo] = useState("");
  const [medicamento, setMedicamento] = useState("");
  const [patologia, setPatologia] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cpf, setCpf] = useState("");

  const [open, setOpen] = useState(false);

  const items = [
    { label: "Manhã", value: "Manhã" },
    { label: "Tarde", value: "Tarde" },
    { label: "Noite", value: "Noite" },
  ];

  const handleCadastro = () => {
    if (!nome || !email || !periodo || !dataNascimento || !telefone || !cpf) {
      Alert.alert("Erro", "Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    Alert.alert("Sucesso", "Paciente cadastrado com sucesso!", [
      {
        text: "OK",
        onPress: () => navigation.goBack(),
      },
    ]);
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
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 100 }}
    >
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#1827ff" />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Ionicons name="person-add" size={32} color="#1827ff" />
          <Text style={styles.headerTitle}>Cadastro de Paciente</Text>
        </View>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.title}>Novo Paciente</Text>
        <Text style={styles.subtitle}>Insira as informações do paciente</Text>

        <InputField
          label="Nome Completo"
          required
          icon="person-outline"
          placeholder="Digite o nome completo"
          value={nome}
          onChangeText={setNome}
        />

        <InputField
          label="E-mail"
          required
          icon="mail-outline"
          placeholder="Digite o e-mail"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <View style={[styles.inputContainer, { zIndex: 1000 }]}>
          <Text style={styles.label}>
            Período <Text style={styles.required}>*</Text>
          </Text>

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

        <InputField
          label="Medicamento"
          icon="medkit-outline"
          placeholder="Medicamentos em uso"
          value={medicamento}
          onChangeText={setMedicamento}
        />

        <InputField
          label="Patologia"
          icon="bandage-outline"
          placeholder="Informe a patologia"
          value={patologia}
          onChangeText={setPatologia}
        />

        <InputField
          label="Data de Nascimento"
          required
          icon="calendar-outline"
          placeholder="DD/MM/AAAA"
          value={dataNascimento}
          onChangeText={(text) => setDataNascimento(formatarData(text))}
          keyboardType="numeric"
        />

        <InputField
          label="Telefone"
          required
          icon="call-outline"
          placeholder="(00) 00000-0000"
          value={telefone}
          onChangeText={(text) => setTelefone(formatarTelefone(text))}
          keyboardType="phone-pad"
        />

        <InputField
          label="CPF"
          required
          icon="id-card-outline"
          placeholder="000.000.000-00"
          value={cpf}
          onChangeText={(text) => setCpf(formatarCPF(text))}
          keyboardType="numeric"
        />

        <TouchableOpacity
          style={styles.cadastroButton}
          onPress={handleCadastro}
        >
          <Text style={styles.cadastroButtonText}>Cadastrar Paciente</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.voltarButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.voltarButtonText}>
            Voltar para a tela inicial
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

function InputField({
  label,
  required,
  icon,
  placeholder,
  value,
  onChangeText,
  keyboardType = "default",
}) {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>
        {label} {required && <Text style={styles.required}>*</Text>}
      </Text>
      <View style={styles.inputWrapper}>
        <Ionicons name={icon} size={20} color="#666" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="#a1a1a1"
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
        />
      </View>
    </View>
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

  pickerWrapper: {},
  picker: {},

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

  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 20,
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
    marginBottom: 40,
    color: "#666",
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

  cadastroButton: {
    backgroundColor: "#1827ff",
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 15,
  },

  cadastroButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },

  voltarButton: {
    backgroundColor: "transparent",
    paddingVertical: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#666",
  },

  voltarButtonText: {
    color: "#666",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
});
