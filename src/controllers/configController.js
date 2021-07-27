const pool = require("../database");
const controller = {};
const fs = require("fs");
let configs = [];

controller.list = async (req, res) => {
  //const cursos = await pool.query("SELECT * FROM Cursos");
  leerJson();
  console.log(configs);
  res.render("configuraciones/configuraciones", {
    data: configs,
  });
};
function escribirJson() {
  const json_configs = JSON.stringify(configs);
  fs.writeFileSync("src/config.json", json_configs, "utf-8");
}
function leerJson() {
  const json_configs = fs.readFileSync("src/config.json", "utf-8");
  configs = JSON.parse(json_configs);
}
module.exports = controller;
