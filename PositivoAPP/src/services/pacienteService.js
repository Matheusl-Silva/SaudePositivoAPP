import api from "./api"

export async function cadastrarPaciente(nome, email, periodo, medicamento, patologia, data_nascimento, telefone, cpf) {
    const payload = {nome, email, periodo, medicamento, patologia, data_nascimento, telefone, cpf}
    const response = await api.post("/pacientes", payload)
    return response.data
}

export async function atualizarPaciente(id,nome, email, telefone, cpf, periodo, medicamento, patologia, data_nascimento) {
  const payload = {nome, email, periodo, medicamento, patologia, data_nascimento, telefone, cpf,};

  const response = await api.put(`/pacientes/${id}`, payload);
  return response.data;
}

export async function deletarPaciente(id) {
    const response = api.delete(`/pacientes/${id}`)
    return response.data;
}

export async function buscarTodosPacientes() {
    try {
        const response = await api.get(`/pacientes`)
        
        const pacientesFormatados = response.data.map((u) => ({
        id: u.id,
        cnome: u.cnome,
        cemail: u.cemail,
        cperiodo: u.cperiodo,
        cmedicamento: u.cmedicamento,
        cpatologia: u.cpatologia,
        ddata_nascimento: u.ddata_nascimento,
        ddata_cadastro: u.ddata_cadastro,
        ctelefone: u.ctelefone,
        ccpf: u.ccpf
        }))
        return pacientesFormatados
    }catch(error) {
        console.error(
            "Erro ao buscar pacientes:",
            error.response?.data || error.message
        );
        throw error;
    }
}