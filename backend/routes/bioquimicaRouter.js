const express = require("express");
const router = express.Router();
const bioquimicaController = require("../Controller/bioquimicaController");

/**
 * @swagger
 * tags:
 *   name: Exame Bioquímica
 *   description: Operações relacionadas aos exames de bioquímica
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ExameBioquimica:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 15
 *         id_paciente:
 *           type: integer
 *           example: 4
 *         id_responsavel:
 *           type: integer
 *           example: 2
 *         id_preceptor:
 *           type: integer
 *           example: 3
 *         ddata_exame:
 *           type: string
 *           format: date
 *           example: "2025-10-05"
 *         nbilirrubina_total:
 *           type: number
 *           example: 1.2
 *         nbilirrubina_direta:
 *           type: number
 *           example: 0.4
 *         nproteina_total:
 *           type: number
 *           example: 7.0
 *         nalbumina:
 *           type: number
 *           example: 4.2
 *         nglicose:
 *           type: number
 *           example: 92
 *         ncolesterol_total:
 *           type: number
 *           example: 185
 *         nhdl:
 *           type: number
 *           example: 55
 *         nldl:
 *           type: number
 *           example: 110
 *         ntriglicerideos:
 *           type: number
 *           example: 120
 *         nureia:
 *           type: number
 *           example: 35
 *         ncreatinina:
 *           type: number
 *           example: 0.9
 *         ncalcio:
 *           type: number
 *           example: 9.3
 *         nmagnesio:
 *           type: number
 *           example: 1.9
 */

/**
 * @swagger
 * /exameBio/{idPaciente}:
 *   get:
 *     summary: Lista todos os exames de bioquímica de um paciente
 *     tags: [Exame Bioquímica]
 *     parameters:
 *       - in: path
 *         name: idPaciente
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do paciente
 *     responses:
 *       200:
 *         description: Lista de exames encontrada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ExameBioquimica'
 *       404:
 *         description: Nenhum exame encontrado para esse paciente
 */
router.get("/:idPaciente", bioquimicaController.getByRegistro);

/**
 * @swagger
 * /exameBio/listar/{idExame}:
 *   get:
 *     summary: Retorna os detalhes completos de um exame de bioquímica
 *     tags: [Exame Bioquímica]
 *     parameters:
 *       - in: path
 *         name: idExame
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do exame
 *     responses:
 *       200:
 *         description: Exame encontrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ExameBioquimica'
 *       404:
 *         description: Exame não encontrado
 */
router.get("/listar/:idExame", bioquimicaController.getById);

/**
 * @swagger
 * /exameBio:
 *   post:
 *     summary: Cadastra um novo exame de bioquímica
 *     tags: [Exame Bioquímica]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nbilirrubina_total:
 *                 type: number
 *                 example: 1.1
 *               nbilirrubina_direta:
 *                 type: number
 *                 example: 0.3
 *               nproteina_total:
 *                 type: number
 *                 example: 6.8
 *               nalbumina:
 *                 type: number
 *                 example: 4.0
 *               nglicose:
 *                 type: number
 *                 example: 95
 *               ncolesterol_total:
 *                 type: number
 *                 example: 180
 *               nhdl:
 *                 type: number
 *                 example: 60
 *               nldl:
 *                 type: number
 *                 example: 100
 *               ntriglicerideos:
 *                 type: number
 *                 example: 130
 *               nureia:
 *                 type: number
 *                 example: 34
 *               ncreatinina:
 *                 type: number
 *                 example: 1.0
 *               id_responsavel:
 *                 type: integer
 *                 example: 1
 *               id_preceptor:
 *                 type: integer
 *                 example: 2
 *               id_paciente:
 *                 type: integer
 *                 example: 3
 *               ddata_exame:
 *                 type: string
 *                 example: "2025-10-20"
 *     responses:
 *       201:
 *         description: Exame cadastrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: ExameBio cadastrado com sucesso!
 *                 id:
 *                   type: integer
 *                   example: 25
 *       500:
 *         description: Erro interno ao criar exame
 */
router.post("/", bioquimicaController.CreateBio);

module.exports = router;
