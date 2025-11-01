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
