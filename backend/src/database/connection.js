import mysql from "mysql2";

export const db = mysql.createConnection({
  host: "localhost",
  user: "root", //pones tu usuario
  password: "root", //pones tu contraseña
  database: "parking_control",
});

db.connect((err) => {
  if (err) {
    console.log("Error conectando a MySQL:", err);
    return;
  }
  console.log("Conectado a MySQL");
});
