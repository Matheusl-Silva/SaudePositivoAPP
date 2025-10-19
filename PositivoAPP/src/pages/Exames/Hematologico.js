import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import api from "../../services/api";

export default function ExameHematologico() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    idPaciente: "",
    hemoglobina: "",
    hematocrito: "",
    eritrocitos: "",
    leucocitos: "",
    neutrofilos: "",
    linfocitos: "",
    monocitos: "",
    eosinofilos: "",
    basofilos: "",
    plaquetas: "",
    vcm: "",
    hcm: "",
    chcm: "",
    rdw: "",
    mch: "",
    mchc: "",
    dataExame: new Date().toISOString().split("T")[0],
  });

  const navigation = useNavigation();

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const validarDados = () => {
    if (!formData.idPaciente.trim()) {
      Alert.alert("Erro", "ID do Paciente é obrigatório.");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validarDados()) return;

    setLoading(true);
    try {
      const response = await api.post("/hemato", formData);
      Alert.alert("Sucesso", "Exame hematológico cadastrado com sucesso!", [
        {
          text: "OK",
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (error) {
      console.error("Erro ao cadastrar exame:", error);
      Alert.alert("Erro", "Erro ao cadastrar exame. Tente novamente.");
    } finally {
      setLoading(false);
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
          <Ionicons name="water" size={32} color="#1827ff" />
          <Text style={styles.headerTitle}>Exame Hematológico</Text>
        </View>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.title}>Dados do Exame</Text>
        <Text style={styles.subtitle}>
          Preencha os valores do hemograma completo
        </Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>
            ID do Paciente <Text style={styles.required}>*</Text>
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
              placeholder="Digite o ID do paciente"
              value={formData.idPaciente}
              onChangeText={(value) => handleInputChange("idPaciente", value)}
              keyboardType="numeric"
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Data do Exame</Text>
          <View style={styles.inputWrapper}>
            <Ionicons
              name="calendar-outline"
              size={20}
              color="#666"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="YYYY-MM-DD"
              value={formData.dataExame}
              onChangeText={(value) => handleInputChange("dataExame", value)}
            />
          </View>
        </View>

        <View style={styles.sectionTitle}>
          <Text style={styles.sectionText}>Série Vermelha</Text>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Hemoglobina (g/dL)</Text>
          <View style={styles.inputWrapper}>
            <Ionicons
              name="color-palette-outline"
              size={20}
              color="#666"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Ex: 14.0"
              value={formData.hemoglobina}
              onChangeText={(value) => handleInputChange("hemoglobina", value)}
              keyboardType="numeric"
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Hematócrito (%)</Text>
          <View style={styles.inputWrapper}>
            <Ionicons
              name="analytics-outline"
              size={20}
              color="#666"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Ex: 42"
              value={formData.hematocrito}
              onChangeText={(value) => handleInputChange("hematocrito", value)}
              keyboardType="numeric"
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Eritrócitos (milhões/μL)</Text>
          <View style={styles.inputWrapper}>
            <Ionicons
              name="ellipse-outline"
              size={20}
              color="#666"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Ex: 4.5"
              value={formData.eritrocitos}
              onChangeText={(value) => handleInputChange("eritrocitos", value)}
              keyboardType="numeric"
            />
          </View>
        </View>

        <View style={styles.sectionTitle}>
          <Text style={styles.sectionText}>Série Branca</Text>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Leucócitos (mil/μL)</Text>
          <View style={styles.inputWrapper}>
            <Ionicons
              name="shield-outline"
              size={20}
              color="#666"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Ex: 7000"
              value={formData.leucocitos}
              onChangeText={(value) => handleInputChange("leucocitos", value)}
              keyboardType="numeric"
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Neutrófilos (%)</Text>
          <View style={styles.inputWrapper}>
            <Ionicons
              name="shield-outline"
              size={20}
              color="#666"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Ex: 60"
              value={formData.neutrofilos}
              onChangeText={(value) => handleInputChange("neutrofilos", value)}
              keyboardType="numeric"
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Linfócitos (%)</Text>
          <View style={styles.inputWrapper}>
            <Ionicons
              name="shield-outline"
              size={20}
              color="#666"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Ex: 30"
              value={formData.linfocitos}
              onChangeText={(value) => handleInputChange("linfocitos", value)}
              keyboardType="numeric"
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Monócitos (%)</Text>
          <View style={styles.inputWrapper}>
            <Ionicons
              name="shield-outline"
              size={20}
              color="#666"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Ex: 8"
              value={formData.monocitos}
              onChangeText={(value) => handleInputChange("monocitos", value)}
              keyboardType="numeric"
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Eosinófilos (%)</Text>
          <View style={styles.inputWrapper}>
            <Ionicons
              name="shield-outline"
              size={20}
              color="#666"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Ex: 2"
              value={formData.eosinofilos}
              onChangeText={(value) => handleInputChange("eosinofilos", value)}
              keyboardType="numeric"
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Basófilos (%)</Text>
          <View style={styles.inputWrapper}>
            <Ionicons
              name="shield-outline"
              size={20}
              color="#666"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Ex: 1"
              value={formData.basofilos}
              onChangeText={(value) => handleInputChange("basofilos", value)}
              keyboardType="numeric"
            />
          </View>
        </View>

        <View style={styles.sectionTitle}>
          <Text style={styles.sectionText}>Plaquetas</Text>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Plaquetas (mil/μL)</Text>
          <View style={styles.inputWrapper}>
            <Ionicons
              name="grid-outline"
              size={20}
              color="#666"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Ex: 300"
              value={formData.plaquetas}
              onChangeText={(value) => handleInputChange("plaquetas", value)}
              keyboardType="numeric"
            />
          </View>
        </View>

        <View style={styles.sectionTitle}>
          <Text style={styles.sectionText}>Índices Eritrocitários</Text>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>VCM (fL)</Text>
          <View style={styles.inputWrapper}>
            <Ionicons
              name="resize-outline"
              size={20}
              color="#666"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Ex: 90"
              value={formData.vcm}
              onChangeText={(value) => handleInputChange("vcm", value)}
              keyboardType="numeric"
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>HCM (pg)</Text>
          <View style={styles.inputWrapper}>
            <Ionicons
              name="resize-outline"
              size={20}
              color="#666"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Ex: 30"
              value={formData.hcm}
              onChangeText={(value) => handleInputChange("hcm", value)}
              keyboardType="numeric"
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>CHCM (g/dL)</Text>
          <View style={styles.inputWrapper}>
            <Ionicons
              name="resize-outline"
              size={20}
              color="#666"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Ex: 33"
              value={formData.chcm}
              onChangeText={(value) => handleInputChange("chcm", value)}
              keyboardType="numeric"
            />
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSubmit}
            disabled={loading}
          >
            <Text style={styles.saveButtonText}>
              {loading ? "Salvando..." : "Salvar Exame"}
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
  sectionTitle: {
    backgroundColor: "#f8f9fa",
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginVertical: 20,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: "#1827ff",
  },
  sectionText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1827ff",
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
