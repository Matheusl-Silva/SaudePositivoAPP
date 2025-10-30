const express = require("express");
const router = express.Router();
const pacienteController = require("../Controller/pacienteController");

/**
 * @swagger
 * tags:
 *   name: Pacientes
 *   description: Rotas relacionadas aos pacientes
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Paciente:
 *       type: object
 *       properties:
 *         idPaciente:
 *           type: integer
 *           example: 1
 *         nome:
 *           type: string
 *           example: João da Silva
 *         email:
 *           type: string
 *           example: joao@email.com
 *         idade:
 *           type: integer
 *           example: 35
 */

/**
 * @swagger
 * /pacientes:
 *   get:
 *     summary: Lista todos os pacientes
 *     tags: [Pacientes]
 *     responses:
 *       200:
 *         description: Lista de pacientes retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Paciente'
 */
router.get("/", pacienteController.getAllPacientes);

/**
 * @swagger
 * /pacientes/{idPaciente}:
 *   get:
 *     summary: Busca um paciente pelo ID
 *     tags: [Pacientes]
 *     parameters:
 *       - in: path
 *         name: idPaciente
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do paciente
 *     responses:
 *       200:
 *         description: Paciente encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Paciente'
 *       404:
 *         description: Paciente não encontrado
 */
router.get("/:idPaciente", pacienteController.getPacienteById);

/**
 * @swagger
 * /pacientes/verificar-email:
 *   post:
 *     summary: Verifica se o e-mail já está cadastrado
 *     tags: [Pacientes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: joao@email.com
 *     responses:
 *       200:
 *         description: E-mail verificado com sucesso
 *       409:
 *         description: E-mail já cadastrado
 */
router.post("/verificar-email", pacienteController.verificarEmail);

/**
 * @swagger
 * /pacientes:
 *   post:
 *     summary: Cadastra um novo paciente
 *     tags: [Pacientes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Paciente'
 *     responses:
 *       201:
 *         description: Paciente criado com sucesso
 */
router.post("/", pacienteController.createPaciente);

/**
 * @swagger
 * /pacientes/{idPaciente}:
 *   put:
 *     summary: Atualiza os dados de um paciente
 *     tags: [Pacientes]
 *     parameters:
 *       - in: path
 *         name: idPaciente
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Paciente'
 *     responses:
 *       200:
 *         description: Paciente atualizado com sucesso
 */
router.put("/:idPaciente", pacienteController.updatePaciente);

/**
 * @swagger
 * /pacientes/{idPaciente}:
 *   delete:
 *     summary: Remove um paciente pelo ID
 *     tags: [Pacientes]
 *     parameters:
 *       - in: path
 *         name: idPaciente
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Paciente deletado com sucesso
 */
router.delete("/:idPaciente", pacienteController.deletePaciente);

/**
 * @swagger
 * /pacientes/buscaExames/{idPaciente}:
 *   get:
 *     summary: Busca todos os exames relacionados a um paciente
 *     tags: [Pacientes]
 *     parameters:
 *       - in: path
 *         name: idPaciente
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do paciente
 *     responses:
 *       200:
 *         description: Lista de exames do paciente
 */
router.get("/buscaExames/:idPaciente", pacienteController.BuscarGeralExames);

module.exports = router;
