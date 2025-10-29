const usuarioDao = require("../dao/usuarioDao");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const JWT_SECRET = "w4G9vYk7sTq3z8Nf1pVb6Jr0QmZ2xH5sUeYtR9cP1o=";
exports.getAllUsuarios = async (req, res) => {
  try {
    const usuario = await usuarioDao.findAll();
    res.json(usuario);
  } catch (err) {
    console.error("Erro ao buscar usuarios:", err);
    res.status(404).json({ error: "Erro ao buscar usuarios" });
  }
};

exports.getUsuariobyId = async (req, res) => {
  const id = req.params.idUsuario;
  try {
    const usuario = await usuarioDao.findById(id);
    if (usuario.length === 0) {
      return res.status(404).json({ error: "usuario não encontrado" });
    }
    res.json(usuario[0]);
  } catch (err) {
    console.error("Erro ao buscar usuario:", err);
    res.status(500).json({ error: "Erro ao buscar usuario" });
  }
};

exports.verificarEmail = async (req, res) => {
  const { email } = req.body;
  try {
    const usuario = await usuarioDao.findByEmail(email);
    if (usuario) {
      return res.status(200).json(usuario[0]);
    }
    return res.status(404).json(false);
  } catch (err) {
    return res.status(500).json({ error: "Erro ao buscar paciente por email" });
  }
};

exports.login = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const usuarioResult = await usuarioDao.findByEmail(email);

    if (usuarioResult.length === 0) {
      return res.status(401).json({ error: "Email ou senha inválidos." });
    }

    const usuario = usuarioResult[0];

    const senhaValida = await bcrypt.compare(senha, usuario.csenha);

    if (!senhaValida) {
      return res.status(401).json({ error: "Email ou senha inválidos." });
    }

    const token = jwt.sign(
      {
        id: usuario.id,
        email: usuario.cemail,
        admin: usuario.cadmin,
      },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      token: token,
      usuario: { id: usuario.id, nome: usuario.cnome, email: usuario.cemail },
    });
  } catch (err) {
    console.error("Erro no login:", err);
    return res.status(500).json({ error: "Erro interno do servidor." });
  }
};

exports.createUsuario = async (req, res) => {
  const { email, senha, nome } = req.body;

  try {
    const usuarioExiste = await usuarioDao.findByEmail(email);

    if (usuarioExiste.length > 0) {
      return res
        .status(409)
        .json({ error: "Já possui um usuario com o mesmo email" });
    }

    const salt = await bcrypt.genSalt(10);
    const senhaHash = await bcrypt.hash(senha, salt);

    const dadosParaCriar = {
      nome: nome,
      email: email,
      senha: senhaHash,
    };

    const novousuario = await usuarioDao.create(dadosParaCriar);

    res.status(201).json({
      message: "usuario cadastrado com sucesso!",
      id: novousuario.insertId,
    });
  } catch (err) {
    console.error("Erro ao tentar cadastrar usuario: ", err);
    res.status(500).json({ error: "Erro ao tentar cadastrar o usuario" });
  }
};

exports.updateUsuario = async (req, res) => {
  const id = req.params.idUsuario;
  const dadosAtualizar = req.body;
  try {
    const result = await usuarioDao.update(id, dadosAtualizar);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "usuario não encontrado" });
    }
    res.status(200).json({ message: "usuario atualizado com sucesso" });
  } catch (err) {
    console.error("Erro ao tentar atualizar o usuario: ", err);
    res.status(500).json({ error: "Erro ao tentar atualizar usuario" });
  }
};

exports.deleteUsuario = async (req, res) => {
  const id = req.params.idUsuario;
  const dadosDeletar = req.body;

  try {
    const result = await usuarioDao.delete(id, dadosDeletar);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "usuario não encontrado" });
    }

    res.status(200).json({ message: "Usuario deletado com suscesso" });
  } catch (err) {
    console.error("Erro ao tentar deletar o usuario: ", err);
    res.status(500).json({ error: "Erro ao tentar deletar Usuario" });
  }
};
