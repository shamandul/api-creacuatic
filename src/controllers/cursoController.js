const pool = require('../database');
const controller = {};

controller.list = async (req, res)=>{
  const cursos = await pool.query('SELECT * FROM Cursos');
    res.render('cursos/cursos',{
        data: cursos
    });
};

controller.all= async (req, res) => {
    const cursos = await pool.query('SELECT * FROM Cursos');
    res.json(cursos);
};

controller.save = async (req,res)=>{
    const data = req.body;
    await pool.query('INSERT INTO Cursos SET ?',[data]);
    req.flash('success', 'Curso guardado correctamente');
    res.redirect('/cursos/');
};

controller.edit = async (req,res)=>{
    const id = req.params.id;
    const curso = await pool.query('SELECT * FROM Cursos WHERE id = ?',[id]);
    res.render('cursos/cursos_edit',{
        data: curso[0]
    });
};

controller.update = async (req,res)=>{
    const id = req.params.id;
    const newCurso = req.body;
    await pool.query('UPDATE Cursos SET ? WHERE id = ?',[newCurso, id]);
    req.flash('success', 'Curso actualizado correctamente');
    res.redirect('/cursos/');
};

controller.delete = async (req,res) =>{
    const id = req.params.id;
    await pool.query('DELETE FROM Cursos WHERE id = ?',[id]);
    req.flash('success', 'Curso eliminado correctamente');
    res.redirect('/cursos/');
};

module.exports = controller;