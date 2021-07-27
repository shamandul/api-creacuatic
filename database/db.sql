CREATE DATABASE creacuaticdb;

use creacuaticdb;

CREATE TABLE noticias (
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    titular VARCHAR(150),
    likes INt,
    descripcion VARCHAR(200)
);
CREATE TABLE Cursos (
    id INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    alumnos INT (11),
    likes INT(11),
    nombre_curso VARCHAR(150),
    descripcion VARCHAR(200),
    estado INT(11)
);
CREATE TABLE `creacuaticdb`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(16) NOT NULL,
  `password` VARCHAR(60) NOT NULL,
  PRIMARY KEY (`id`));