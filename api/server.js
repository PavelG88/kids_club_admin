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

convertResponseToUserFormat = (data) => {
    let convetedData = {
        name_class: data[0].name_class,
        description: data[0].descriptions,
        min_age: data[0].min_age,
        max_age: data[0].max_age,
        groups: null
    };

    data.forEach((data_item) => {
        let group = {
            group_id: data_item.group_id,
            name_group: data_item.name_group,
            teacher: data_item.teacher,
            min_age_group: data_item.min_age_group,
            max_age_group: data_item.max_age_group,
            max_number: data_item.max_number,
            current_number: data_item.current_number,
            shedule: null
        };

        let shedule_item = {
            day: data_item.day,
            time_start: data_item.time_start,
            time_end: data_item.time_end
        };

        if (!convetedData.groups) {
            group.shedule = [shedule_item];
            convetedData.groups = [group];

        } else {
            let isNewGroup = true;
            for (let i = 0; i < convetedData.groups.length; i++) {
                if (convetedData.groups[i].group_id === group.group_id) {
                    convetedData.groups[i].shedule.push(shedule_item);
                    isNewGroup = false;
                    break;
                }
            }

            if (isNewGroup) {
                group.shedule = [shedule_item];
                convetedData.groups.push(group);
            }
        }
    });

    return convetedData;
}

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

app.get('/ListClasses', (request, response) => {    
    connection.query(`SELECT * FROM classes`, (error, data) => {       
        if (error || data.length === 0) {
            response.status(400).json(error);
            return;
        }
        
        response.status(200).json(data);
    })     
})

app.get('/ListClasses/:id', (request, response) => {    
    connection.query(
        `SELECT classes.class_id, classes.name_class, classes.descriptions, classes.min_age, classes.max_age, groups_class.group_id, groups_class.name_group, groups_class.teacher, groups_class.min_age_group, groups_class.max_age_group, groups_class.max_number, groups_class.current_number, shedule.day, shedule.time_start, shedule.time_end
        FROM classes
        INNER JOIN groups_class ON groups_class.classes_id=classes.class_id
        INNER JOIN shedule ON shedule.groups_class_id=groups_class.group_id
        WHERE classes.class_id = ${request.params.id}`, 
        (error, data) => {       
        if (error || data.length === 0) {
            response.status(400).json(error);
            return;
        }
        
        response.status(200).json(convertResponseToUserFormat(data));
    })    
})

app.get('/ListGroups/:id', (request, response) => {    
    connection.query(
        `SELECT *
        FROM groups_class
        WHERE classes_id = ${request.params.id}`, 
        (error, data) => {       
        if (error || data.length === 0) {
            response.status(400).json(error);
            return;
        }
        
        response.status(200).json(data);
    })    
})


app.get('/ListChildrens', (request, response) => {    
    connection.query(`SELECT * FROM children_list ORDER BY kid_surname`, 
        (error, data) => {       
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
