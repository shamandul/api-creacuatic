const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const pool = require('../database');
//const helpers = require('../lib/helpers');
const bcrypt = require('bcryptjs');

passport.use('local-signin', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    
    const rows = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
    if(rows.length > 0){
        const user = rows[0];
        const validPassword = await matchPassword(password, user.password);
        if(validPassword){
            done(null, user, req.flash('success','Bienvenido ' + user.username));
        }else{
            done(null, false, req.flash('message','Contraseña incorrecta'));
        }
    }else{
        done(null, false, req.flash('message','El usuario no existe'));
    }
}));

passport.use('local-signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
}, async (username, password, done) => {

    const newUser = {
        username,
        password
    };
    newUser.password = await cryptPass(password);
    const result = await pool.query('INSERT INTO users SET ?',[newUser]);
    newUser.id = result.insertId;
    return done(null, newUser);
}));
passport.serializeUser((user, done)=>{
    done(null, user.id);
});

passport.deserializeUser(async (id, done)=>{
    const rows = await pool.query('SELECT * FROM users WHERE id = ?',[id]);
    done(null, rows[0]);
});
cryptPass = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
};
matchPassword = async (password, savePassword)=>{
    try{
       return await bcrypt.compare(password, savePassword);
    }catch(e){
        console.log(e);
    }
};
