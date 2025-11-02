import api from "./api";

//login tela principal
export async function loginUsuario(email, senha) {
  const payload = { email, senha };
  const response = await api.post("/usuarios/login", payload);
  return response.data;
}

export async function cadastrarUsuario(nome, email, senha) {
  const payload = { nome, email, senha };
  const response = await api.post("/usuarios", payload);
  return response.data;
}

export async function atualizarUsuario(id, nome, email, senha, admin) {
  const usuarioAtual = await api.get(`/usuarios/${id}`);
  const senhaAtual = usuarioAtual.data.csenha;

  const payload = {
    nome: nome,
    email: email,
    admin: admin ? "S" : "N",
    senha: senha && senha.trim() !== "" ? senha : senhaAtual,
  };

  const response = await api.put(`/usuarios/${id}`, payload);
  return response.data;
}

export async function deletarUsuario(id) {
  const response = await api.delete(`/usuarios/${id}`);
  return response.data;
}

export async function buscarTodosUsuarios() {
  try {
    const response = await api.get("/usuarios");

    // não achei uma maneira melhor, basicamente ele troca o nome que vem do back(api) para ficar correto com o frontend
    const usuariosFormatados = response.data.map((u) => ({
      id: u.id,
      nome: u.cnome,
      email: u.cemail,
      admin: u.cadmin,
    }));

    return usuariosFormatados;
  } catch (error) {
    console.error(
      "Erro ao buscar usuários:",
      error.response?.data || error.message
    );
    throw error;
  }
}
