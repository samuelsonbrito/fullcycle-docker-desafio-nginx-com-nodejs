const express = require('express')
const app = express()
const port = 3000

const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database:'nodedb'
};
const mysql = require('mysql')
const connection = mysql.createConnection(config)

const sqlInsert = `INSERT INTO people(name) values('Samuelson');`
connection.query(sqlInsert)

const sqlCreate = `CREATE TABLE IF NOT EXISTS people (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    name VARCHAR(255) NOT NULL ); `;

connection.query(sqlCreate)

const sqlSelect = `SELECT id, name FROM people`

let peopleList = ""

connection.query(sqlSelect, (err, result) => {
    if (err) throw err;
    else {
        const data = Object.values(JSON.parse(JSON.stringify(result)));
        data.forEach(element => {
          peopleList+=`<p>${element.name}</p>\n`            
        });
    }
})

connection.end()


app.get('/', (req, res) => {
    res.send(`<h1>Full Cycle Rocks!</h1>\n${peopleList}`); 
})

app.listen(port, ()=>{
    console.log('Rodando na minha porta ' + port)
})