const mysql = require('mysql');
const express = require('express');
const app = express();
const config = require('../src/config/config');
let dateFormat = require("dateformat");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


hashCode = function(s) {
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
        classes_id: data[0].class_id,
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

    // console.log(convetedData);
    return convetedData;
}

convertSheduleToUserFormat = (data) => {
    let convetedData = {};
    data.forEach((item) => {
        if (!Object.keys(convetedData).length) {
            convetedData[`${item.day}`] = [item];
        } else {
            let isNew = true;
            for (let key in convetedData) {
                if (key === item.day) {
                    convetedData[key].push(item);
                    isNew = false;
                }
            }
            if(isNew) {
                convetedData[`${item.day}`] = [item];
            }
        }
    });
    // console.log(convetedData);
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

app.get('/listClasses', (request, response) => {    
    connection.query(`SELECT * FROM classes`, (error, data) => {       
        if (error || data.length === 0) {
            response.status(400).json(error);
            return;
        }
        
        response.status(200).json(data);
    })     
})

app.get('/listClassesAndGroups/:classes_id', (request, response) => {    

    let dataForResponse;
    connection.query(`SELECT * FROM classes`, (error, data) => {       
        if (error || data.length === 0) {
            response.status(400).json(error);
            return;
        }
        dataForResponse = [data];
    });
    
    connection.query(
        `SELECT *
        FROM groups_class
        WHERE classes_id = ${request.params.classes_id}`, 
        (error, data) => {       
        if (error || data.length === 0) {
            response.status(400).json(error);
            return;
        }
        dataForResponse.push(data)
        response.status(200).json(dataForResponse);
    });

    
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
        for (let i = 0; i < data.length; i++) {
            data[i].birthday = dateFormat(data[i].birthday, "yyyy-mm-dd");
        }
        response.status(200).json(data);
    })    
})

app.post('/Recording', (request, response) => {

    const {children, user_id} = request.body;
    const groups_class_id = request.body.group.groups_class_id;
    if (children.kid_id) {
        connection.query(`
            INSERT INTO list_groups (groups_class_id, children_list_id, users_list_id_created, users_list_id_last_changed)
            VALUES ("${groups_class_id}", "${children.kid_id}", "${user_id}", "${user_id}");
        `, 
        (error, data) => {
            if (error) {
                console.log(error); 
                response.status(403).json(error);
            } else {
                // console.log(data.insertId);
            }
        });
    } else {
        const { kid_name, kid_surname, kid_second_name, birthday, parent_name, parent_surname, parent_second_name, parent_phone } = children
        let kid_id;
        //Добавление ребенка в базу
        connection.query(`
        INSERT INTO children_list (kid_name, kid_surname, kid_second_name, birthday, parent_name, parent_surname, parent_second_name, parent_phone, users_list_id_registration, users_list_id_last_changed)
        VALUES ("${kid_name}", "${kid_surname}", "${kid_second_name}", "${birthday}", "${parent_name}", "${parent_surname}", "${parent_second_name}", "${parent_phone}", "${user_id}", "${user_id}");
        `, 
        (error, data) => {
            if (error) {
                console.log(error); 
                response.status(403).json(error);
            } else {
                kid_id = data.insertId;
                //Добавление ребенка в список группы
                connection.query(`
                    INSERT INTO list_groups (groups_class_id, children_list_id, users_list_id_created, users_list_id_last_changed)
                    VALUES ("${groups_class_id}", "${kid_id}", "${user_id}", "${user_id}");
                    `, 
                    (error, data) => {
                        if (error) {
                            console.log(error); 
                            response.status(403).json(error);
                        } else {
                            // console.log('3333333', data.insertId);
                        }
                    }
                );
            }
        });
        
        
    }

    let numberChildrenInGroup;
    connection.query(
        `SELECT current_number
        FROM groups_class
        WHERE group_id = ${groups_class_id}`, 
        (error, data) => {       
        if (error || data.length === 0) {
            response.status(400).json(error);
            return;
        }
        numberChildrenInGroup = +data[0].current_number + 1;
        connection.query(`
            UPDATE groups_class
            SET current_number = "${numberChildrenInGroup}"
            WHERE group_id = ${groups_class_id};
        `, 
        (error, data) => {
            if (error) {
                console.log(error); 
                response.status(403).json(error);
            } else {
                // console.log('УСПЕХ!!!');
                response.status(200).json(true);
            }
        });
    });
    
});

app.get('/shedule', (request, response) => {    
    connection.query(
        `SELECT shedule.shedule_id, shedule.day, shedule.time_start, shedule.time_end, classes.name_class, groups_class.group_id, groups_class.name_group, groups_class.teacher, groups_class.min_age_group, groups_class.max_age_group, groups_class.max_number, groups_class.current_number 
        FROM shedule
        INNER JOIN groups_class ON shedule.groups_class_id=groups_class.group_id
        INNER JOIN classes ON groups_class.classes_id=classes.class_id
        ORDER BY shedule.time_start;`, 
        (error, data) => {       
        if (error || data.length === 0) {
            response.status(400).json(error);
            return;
        }
        
        response.status(200).json(convertSheduleToUserFormat(data));
    })    
});

app.get('/listChildrens/:id', (request, response) => {    
    connection.query(
        `SELECT list_groups.list_groups_id, children_list.kid_id, children_list.kid_surname, children_list.kid_name 
        FROM list_groups
        INNER JOIN children_list ON list_groups.children_list_id=children_list.kid_id
        WHERE list_groups.groups_class_id = ${request.params.id}
        ORDER BY children_list.kid_surname;`, 
        (error, data) => {       
        if (error || data.length === 0) {
            response.status(400).json(error);
            return;
        }
        
        response.status(200).json(data);
    })    
})

app.delete('/listChildrens/:id', (request, response) => {

    let groups_class_id;
    connection.query(`SELECT groups_class_id FROM list_groups WHERE list_groups_id = ${request.params.id};`, (error, data) => {
        
        if (error || data.affectesRows === 0) {
            console.log(error); 
            response.status(500).json(error);
        } else {
            groups_class_id = data[0].groups_class_id;
        }
    });

    connection.query(`DELETE FROM list_groups WHERE list_groups_id = ${request.params.id};`, (error, data) => {
        
        if (error || data.affectesRows === 0) {
            console.log(error); 
            response.status(500).json(error);
        } else {
            // console.log('УСПЕХ!!!');
            let numberChildrenInGroup;
            connection.query(
                `SELECT current_number
                FROM groups_class
                WHERE group_id = ${groups_class_id}`, 
                (error, data) => {       
                if (error || data.length === 0) {
                    response.status(400).json(error);
                    return;
                } else {
                    numberChildrenInGroup = +data[0].current_number - 1;
                    connection.query(`
                        UPDATE groups_class
                        SET current_number = "${numberChildrenInGroup}"
                        WHERE group_id = ${groups_class_id};
                    `, 
                    (error, data) => {
                        if (error) {
                            console.log(error); 
                            response.status(403).json(error);
                        } else {
                            // console.log('УСПЕХ!!!');
                            response.status(200).json(true);
                        }
                    });
                }
            });
        }
    });
    
});

app.listen(3001, () => {
    console.log('сервер запущен')
})
