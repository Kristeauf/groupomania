const mysql = require('mysql2');
const dotenv = require ('dotenv');
dotenv.config({path:'./.env'});
const NAME = process.env.NAME;
const PASS = process.env.PASS;
const HOST = process.env.HOST;
const db = mysql.createConnection({
    host : HOST,
    user: NAME,
    password: PASS,
     database: 'groupomania'
})
db.connect((err)=>{
    if (err){throw err
    }
    console.log('connecté a mysql');
}
 );
module.exports = db;
// const mysql = require("mysql2");

// exports.connect = () => {
//   const connection = mysql.createConnection({
//    host     : process.env.HOST,
//    port     : '3306',
//     user     : process.env.NAME,
//     password : process.env.PASSWORD,
//     database : process.env.BASENAME,
//     charset: 'utf8_general_ci'
//    });
//   return connection;
//  }