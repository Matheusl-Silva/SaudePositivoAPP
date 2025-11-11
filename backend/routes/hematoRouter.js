const express = require("express");
const router = express.Router();
const hematoController = require("../Controller/hematoController");

/**
 * @swagger
 * tags:
 *   name: Exame Hemato
 *   description: Operações relacionadas a exames de hematologia
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ExameHemato:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 12
 *         id_paciente:
 *           type: integer
 *           example: 5
 *         id_responsavel:
 *           type: integer
 *           example: 2
 *         id_preceptor:
 *           type: integer
 *           example: 3
 *         ddata_exame:
 *           type: string
 *           format: date
 *           example: "2025-10-01"
 *         nhemacia:
 *           type: number
 *           example: 4.7
 *         nhemoglobina:
 *           type: number
 *           example: 13.5
 *         nhematocrito:
 *           type: number
 *           example: 40.2
 *         nleucocitos:
 *           type: number
 *           example: 7200
 *         nplaquetas:
 *           type: number
 *           example: 250000
 */

/**
 * @swagger
 * /exameHemato/{idPaciente}:
 *   get:
 *     summary: Lista todos os exames de hematologia de um paciente
 *     tags: [Exame Hemato]
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
 *                 $ref: '#/components/schemas/ExameHemato'
 *       404:
 *         description: Nenhum exame encontrado para esse paciente
 */
router.get("/:idPaciente", hematoController.getByRegistro);

/**
 * @swagger
 * /exameHemato/listar/{idExame}:
 *   get:
 *     summary: Retorna os detalhes completos de um exame de hematologia
 *     tags: [Exame Hemato]
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
 *               $ref: '#/components/schemas/ExameHemato'
 *       404:
 *         description: Exame não encontrado
 */
router.get("/listar/:idExame", hematoController.getById);

/**
 * @swagger
 * /exameHemato:
 *   post:
 *     summary: Cadastra um novo exame de hematologia
 *     tags: [Exame Hemato]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_responsavel:
 *                 type: integer
 *                 example: 1
 *               id_preceptor:
 *                 type: integer
 *                 example: 2
 *               id_paciente:
 *                 type: integer
 *                 example: 3
 *               data:
 *                 type: string
 *                 example: "2025-10-01"
 *               hemacia:
 *                 type: number
 *                 example: 4.5
 *               hemoglobina:
 *                 type: number
 *                 example: 13.8
 *               hematocrito:
 *                 type: number
 *                 example: 39.2
 *               vcm:
 *                 type: number
 *                 example: 89.5
 *               hcm:
 *                 type: number
 *                 example: 29.5
 *               chcm:
 *                 type: number
 *                 example: 33.5
 *               leucocitos:
 *                 type: number
 *                 example: 7500
 *               plaquetas:
 *                 type: number
 *                 example: 230000
 *     responses:
 *       201:
 *         description: Exame criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Exame cadastrado com sucesso!
 *                 id:
 *                   type: integer
 *                   example: 17
 *       500:
 *         description: Erro interno ao criar o exame
 */
router.post("/", hematoController.CreateHemato);

/**
 * @swagger
 * /exameHemato/{idExame}:
 *   delete:
 *     summary: Exclui um exame hematológico
 *     tags: [Hematologia]
 *     parameters:
 *       - name: idExame
 *         in: path
 *         required: true
 *         description: ID do exame a ser excluído
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Exame excluído com sucesso
 *       404:
 *         description: Exame não encontrado
 *       500:
 *         description: Erro ao excluir exame
 */
router.delete("/:idExame", hematoController.deleteHemato);

router.put("/:idExame", hematoController.updateHemato);

module.exports = router;
