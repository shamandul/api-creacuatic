const pool = require("../database");
const controller = {};

controller.list = async (req, res) => {
  const noticias = await pool.query("SELECT * FROM noticias");
  res.render("noticias/noticias", {
    data: noticias,
  });
};
controller.all = async (req, res) => {
  const noticias = await pool.query("SELECT * FROM noticias");
  res.json(noticias);
};
controller.save = async (req, res) => {
  const data = req.body;
  await pool.query("INSERT INTO noticias SET ?", [data]);
  req.flash("success", "Noticia guardada correctamente");
  res.redirect("/noticias/");
};

controller.edit = async (req, res) => {
  const id = req.params.id;
  const noticia = await pool.query("SELECT * FROM noticias WHERE id = ?", [id]);
  res.render("noticias/noticias_edit", {
    data: noticia[0],
  });
};

controller.update = async (req, res) => {
  const id = req.params.id;
  const newNoticia = req.body;
  await pool.query("UPDATE noticias SET ? WHERE id = ?", [newNoticia, id]);
  req.flash("success", "Noticia actualizada correctamente");
  res.redirect("/noticias/");
};

controller.delete = async (req, res) => {
  const id = req.params.id;
  await pool.query("DELETE FROM noticias WHERE id = ?", [id]);
  req.flash("success", "Noticia eliminada correctamente");
  res.redirect("/noticias/");
};

module.exports = controller;
