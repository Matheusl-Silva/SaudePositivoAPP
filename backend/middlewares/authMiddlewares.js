const jwt = require("jsonwebtoken");

const JWT_SECRET = "w4G9vYk7sTq3z8Nf1pVb6Jr0QmZ2xH5sUeYtR9cP1o=";

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ mensagem: "Acesso negado. Token não fornecido." });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    req.userId = decoded.id;
    req.userEmail = decoded.email;
    req.userAdmin = decoded.admin;

    next();
  } catch (error) {
    return res.status(403).json({ mensagem: "Token inválido ou expirado." });
  }
};

const verifyAdmin = (req, res, next) => {
  if (!req.userAdmin) {
    return res.status(403).json({ 
      mensagem: "Acesso negado. Apenas administradores podem realizar esta ação." 
    });
  }
  next();
};

module.exports = { verifyJWT, verifyAdmin };
