const express = require('express');
const router = express.Router();
const cursoController = require('../controllers/cursoController');
const { isLoggedIn } = require('../lib/auth');


// Rutas para cursos
router.get('/', isLoggedIn, cursoController.list );
router.get('/all', cursoController.all );
router.post('/add', isLoggedIn, cursoController.save);
router.get('/delete/:id', isLoggedIn, cursoController.delete);
router.get('/update/:id', isLoggedIn, cursoController.edit);
router.post('/update/:id', isLoggedIn, cursoController.update);


module.exports = router;