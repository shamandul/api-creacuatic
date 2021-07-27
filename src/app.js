const express = require("express");
const path = require("path");
const morgan = require("morgan");
const flash = require("connect-flash");
const session = require("express-session");
const MySqlStore = require("express-mysql-session");
const { database } = require("./keys");
const passport = require("passport");
const cors = require("cors");

// Inicializacion
const app = express();
require("./lib/passport");

// Importing routes

const inicioRoutes = require("./routes/inicio");
const cursoRoutes = require("./routes/curso");
const noticiaRoutes = require("./routes/noticia");
const userRoutes = require("./routes/user");
const configRoutes = require("./routes/config");

// settings
app.set("port", process.env.PORT || 4000);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(
  session({
    secret: "Creacuatic234Web098",
    resave: false,
    saveUninitialized: false,
    store: new MySqlStore(database),
  })
);
app.use(flash());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

// variables globales

app.use((req, res, next) => {
  app.locals.success = req.flash("success");
  app.locals.message = req.flash("message");
  app.locals.user = req.user;
  next();
});

// Routes

app.use("/", inicioRoutes);
app.use("/cursos/", cursoRoutes);
app.use("/noticias/", noticiaRoutes);
app.use("/usuario/", userRoutes);
app.use("/config/", configRoutes);

// Static files
app.use(express.static(path.join(__dirname, "public")));
// starting server
app.listen(app.get("port"), () => {
  console.log("server on port 4000");
});
