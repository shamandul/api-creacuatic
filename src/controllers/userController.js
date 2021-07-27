const pool = require('../database');
const passport = require('passport');
const controller = {};

controller.show =  (req, res)=>{
    res.render('user/signup');
};

controller.signup = async (req,res)=>{
    //const data = req.body;
    passport.authenticate('local-signup', {
        successRedirect: '/',
        failureRedirect: '/usuario/signup',
        failureFlash: true
    });
};

module.exports = controller;