const express = require("express");
const bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger/swagger");

const routerPaciente = require("./routes/pacienteRouter");
const routerUsuario = require("./routes/usuarioRouter");
const routerHemato = require("./routes/hematoRouter");
const routerBio = require("./routes/bioquimicaRouter");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// rota de pacientes -> vai para PacienteRouter
app.use("/pacientes", routerPaciente);

//rota de usuario -> UsuarioRouter
app.use("/usuarios", routerUsuario);

//rota para exameHemato -> hematoRouter
app.use("/exameHemato", routerHemato);

//rota para exameBioquimica -> bioquimicaRouter
app.use("/exameBio", routerBio);

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000.");
  console.log("Documentação disponível em http://localhost:3000/api-docs");
});
