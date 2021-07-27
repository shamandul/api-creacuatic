const bcrypt = require('bcryptjs');
//const {promisify} = require('util');


const helpers = {};

helpers.cryptPass = async (password) => {
    //const salt = await bcrypt.genSalt(10);
    //const hash= await bcrypt.hash(password, salt);
    const hash =password;
    return hash;
};

helpers.matchPassword = async (password, savePassword)=>{
    try{
       return await bcrypt.compare(password, savePassword);
    }catch(e){
        console.log(e);
    }
};

module.exports.helpers;