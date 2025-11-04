const mysql = require("mysql2");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "laboratorio",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Testar a conexão
db.getConnection((err, connection) => {
  if (err) {
    console.log("Erro de conexão: " + err);
    return;
  }
  console.log("Conexão com banco de dados estabelecida");
  connection.release();
});

module.exports = db;
