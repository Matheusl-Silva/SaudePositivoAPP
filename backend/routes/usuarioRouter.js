// routes/usuarioRouter.js
const express = require("express");
const router = express.Router();
const usuarioController = require("../Controller/usuarioController");
const verifyJWT = require("../middlewares/authMiddlewares");

router.post("/login", usuarioController.login);
router.post("/", usuarioController.createUsuario);
router.post("/verificar-email", usuarioController.verificarEmail);

router.get("/", verifyJWT, usuarioController.getAllUsuarios);
router.get("/:idUsuario", verifyJWT, usuarioController.getUsuariobyId);
router.put("/:idUsuario", verifyJWT, usuarioController.updateUsuario);
router.delete("/:idUsuario", verifyJWT, usuarioController.deleteUsuario);

module.exports = router;
