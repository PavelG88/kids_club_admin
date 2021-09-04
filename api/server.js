const mysql = require('mysql');
const express = require('express');
const app = express();
const config = require('../src/config/config')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


hashCode = function(s){
    return s.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);              
  }

const connection = mysql.createConnection ({
    host: config.host,
    port: config.port,
    user: config.user,
    password: config.password,
    database: config.database
});

const cors = require('cors');
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

connection.connect((error) => {
    if (!error) {
        console.log("Мы подключены к БД")
    }
})

app.get('/', (request, response) => {    
    let login = request.query.login;
    let password = hashCode(request.query.password);
    // console.log(password);
    connection.query(`SELECT * FROM users_list WHERE login="${login}" and password="${password}";`, (error, data) => {       
        if (error || data.length === 0) {
            response.status(400).json(error);
            return;
        }
        
        response.status(200).json(data);
    })     
})


app.listen(3001, () => {
    console.log('сервер запущен')
})
