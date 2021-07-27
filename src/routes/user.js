const express = require('express');
const passport = require('passport');
const router = express.Router();
const userController = require('../controllers/userController');
const { isLoggedIn } = require('../lib/auth');

// Rutas para cursos
router.get('/signup', userController.show );
//router.post('/signup', userController.signup );

router.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/',
    failureRedirect: '/usuario/signup',
    failureFlash: true
}));
router.post('/signin', (req, res, next) => {
    passport.authenticate('local-signin',{
        successRedirect: '/',
        failureRedirect: '/',
        failureFlash: true
    })(req, res, next);
});
router.get('/logout', isLoggedIn,  (req, res) =>{
    req.logOut();
    res.redirect('/');
});
module.exports = router;