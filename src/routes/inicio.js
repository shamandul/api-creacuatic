const express = require("express");
const router = express.Router();
const inicioController = require("../controllers/inicioController");
var nodemailer = require("nodemailer");
require("dotenv").config();

var transport = {
  host: process.env.HOST_EMAIL,
  port: process.env.PORT_EMAIL,
  secure: true,
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.PASS_EMAIL,
  },
};

var transporter = nodemailer.createTransport(transport);

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take messages");
  }
});

// Rutas para principales

router.get("/", inicioController.inicio);
router.get("/info", inicioController.info);
router.post("/mail", (req, res, next) => {
  var nombre = req.body.nombre;
  var email = req.body.email;
  var telefono = req.body.telefono;
  var texto = req.body.texto;
  const ejs = require("ejs");

  ejs.renderFile(
    process.cwd() + "/src/plantillaEmail/email.ejs",
    { nombre: nombre, email: email, texto: texto, telefono: telefono },
    function (err, data) {
      if (err) {
        console.log(err);
      } else {
        var mainOptions = {
          from: email,
          to: "soporte@webweaver.es",
          subject: "Mensaje de contacto de Creacuatic web",
          html: data,
        };

        transporter.sendMail(mainOptions, function (err, info) {
          if (err) {
            res.json({
              msg: "fail",
            });
          } else {
            res.json({
              msg: "success",
            });
          }
        });
      }
    }
  );
});

module.exports = router;
