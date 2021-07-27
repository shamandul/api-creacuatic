const express = require('express');
const router = express.Router();
const noticiasController = require('../controllers/noticiasController');
const { isLoggedIn } = require('../lib/auth');

// Rutas para noticias
router.get('/', isLoggedIn, noticiasController.list );
router.get('/all', noticiasController.all);
router.post('/add', isLoggedIn, noticiasController.save);
router.get('/delete/:id', isLoggedIn, noticiasController.delete);
router.get('/update/:id', isLoggedIn, noticiasController.edit);
router.post('/update/:id', isLoggedIn,  noticiasController.update);


module.exports = router;