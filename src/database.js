const mysql = require('mysql');
const {promisify} = require('util');
const { database } = require('./keys');

const pool = mysql.createPool(database);

pool.getConnection((err,conn)=>{
    if(err){
        if(err.code==='PROTOCOL_CONNECTION_LOST'){
            console.log('Conexión a la base de datos terminada');
        }
        if(err.code==='ER_CON_COUNT_ERROR'){
            console.log('Demasiadas conexiones a la base de datos');
        }
        if(err.code==='ECONNREFUSED'){
            console.log('Conexión a la base de datos rechazada');
        }
        if(conn) conn.release();
        console.log('DB está conectada');
        return;
    }
});

pool.query = promisify(pool.query);
module.exports = pool;