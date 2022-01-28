// const express = require('express');
// // const mysql = require('mysql')
// const app = express()
// const formidable = require('express-formidable')
// const PORT = process.env.PORT || 3000;
// const axios = require('axios');


// app.use(formidable())


// app.use(express.json())
// app.use(express.urlencoded({extended: false}))

// // var connection = mysql.createConnection({
// //     host : 'localhost',
// //     user : 'root',
// //     password : '123456789',
// //     database : "classicmodels",
// //     port : "3306"
// // })




// // connection.connect((err)=>{
// //     if (err) {
// //         console.log(err)
// //     } else {
// //         console.log('connected successfully to mysql')
// //     }
// // })



// // app.get('/:firstname', (req, res) => {
    
//     // MySQL connection
// //     connection.query(`select * from customers where contactFirstName  = "${req.params.firstname}"`, function(err, result, fields) {
// //         if (err) {
// //             throw err
// //         } else {
// //             console.log(result)
// //             res.send(result)
// //         }
// //     })
// //     console.log('got it')
// // })

// axios.get('http://localhost:3000/:firstname')
//     .then(function(response) {
//         console.log(response)
//     })

// app.listen(PORT, ()=>{
//     console.log(`listening on ${PORT}`)
// })

const express = require('express')
const app = express()
const PORT = 3000
const mysql = require('./connection.js').con


app.use(express.static('./public'))

app.set('view engine', 'hbs')
app.set('views','./public/views')



app.get('/', (req, res) =>{
    res.render('index')
})


app.get('/add', (req, res) =>{
    res.render('add')
})

app.get('/view', (req, res) =>{
    let query2 = 'select * from customers'
    mysql.query(query2, (err, result) =>{
        if (!err) res.render('view', { data: result })
        console.log(err)
    })
})

app.get('/addcustomer', (req, res) =>{
    const { customerNumber, customerName, contactLastName, contactFirstName, phoneNumber, addressLine1, addressLine2, city, state, postalCode, country, salesRepEmployeeNumber, creditLimit} = req.query
    let query = 'insert into customers values(?,?,?,?,?,?,?,?,?,?,?,?,?)'
    mysql.query( query, [customerNumber, customerName, contactLastName, contactFirstName, phoneNumber, addressLine1, addressLine2, city, state, postalCode, country, salesRepEmployeeNumber, creditLimit], (err, result) => {
        if (err) {
            // res.send("You've entered an already existing Customer details")
            res.send(err)
        } else {
            // res.send(`Added ${customerNumber}, ${customerName}, ${contactLastName}, ${contactFirstName}, ${phoneNumber}, ${addressLine1}, ${addressLine2}, ${city}, ${state}, ${postalCode}, ${country}, ${salesRepEmployeeNumber}, ${creditLimit}`)
            res.render('add-result',{ data : { customerNumber, customerName, contactLastName, contactFirstName, phoneNumber, addressLine1, addressLine2, city, state, postalCode, country, salesRepEmployeeNumber, creditLimit}})
        }
    })
})

app.listen(PORT,()=>{
    console.log(`listening on ${PORT}`)
})