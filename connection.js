const mysql = require('mysql')
const con = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '123456789',
    database : "classicmodels",
    port : "3306",
    multipleStatements: "true"
})

con.connect((err)=>{
    if (err) {
        throw err
    } else {
        console.log('connected to database')
    }
})


module.exports.con = con

