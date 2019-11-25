var mysql = require('promise-mysql');
var info = require('../config');

//create an activity
exports.add = async (activity , ctx) =>{
    try{

        //connect to database
        const connection = await mysql.createConnection(info.config);
             //sql statement to execute
            let sql = `INSERT INTO activity SET ?`;

            //wait for async code to finish
            await connection.query(sql, activity);

             //wait until the connection is closed
            await connection.end();

            //return the result
            return "Added succesfully";

    }catch (error) {
        console.log(error);
        ctx.throw(500, 'An Error has occured');
    }
}

exports.getById = async (id, ctx) => {
    try{

        const connection = await mysql.createConnection(info.config);

        let sql = `SELECT * FROM activity WHERE id = ${id}`;
        
        let data = await connection.query(sql);

        await connection.end();

        return data;
    } catch (error) {
        console.log(error);
        ctx.throw(500, 'An Error has occured');
    }   
}

exports.update = async (id, ctx) =>{
    try{

        //connect to database
        const connection = await mysql.createConnection(info.config);

        title = ctx.request.body.title;
        console.log("Hello I am from activities model")
        description = ctx.request.body.description;
        url = ctx.request.body.title + ".activity";
        location = ctx.request.body.location;
        let sql

        //if title field is empty do not update title and url fields in db
        if(title == ""){
            sql = `UPDATE activity SET description = "${description}", location = "${location}" WHERE id = ${id}`;

        //if description is empty do not update description field in db
        }else if(description == ""){
            sql = `UPDATE activity SET title = "${title}", url = "${url}" location = "${location}" WHERE id = ${id}`;

        //if location is empty do not update location field in db
        }else if(location == ""){
            sql = `UPDATE activity SET title = "${title}", description = "${description}" ,url = "${url}" WHERE id = "${id}"`;

        //if title and description are empty update location only 
        }else if((title == "") && (description == "")){
            sql = `UPDATE activity SET location = "${location}" WHERE id = "${id}"`;

        //if title and location are empty update description only
        }else if((title == "") && (location == "")){
           sql = `UPDATE activity SET description = "${description}" WHERE id = "${id}"`;

        //if description and location are empty update title only
        }else if((description == "") && (location == "")){
           sql = `UPDATE activity SET title = "${title}", url = "${url}" WHERE id = "${id}"`;
        
        //if all fields have entries update all fields
        }else{
            sql = `UPDATE activity SET title = "${title}", description = "${description}", url = "${url}", location = "${location}" 
            WHERE id = "${id}"`;
        }
        await connection.query(sql);

        await connection.end();

        return "Update succesful"
    }catch (error){
        console.log(error);
        ctx.throw(500, 'An Error has occured')
    }
}

exports.delete = async (id, ctx) =>{
    try{

        //connect to the database
        const connection = await mysql.createConnection(info.config);

        let totalID = await connection.query(`SELECT COUNT(*) as myValue FROM activity`);
        let count = totalID[0].myValue;
        if(id > count || id < 1){
            return 'Please input a number between 1-' + count;
        }else{
            await connection.query(`DELETE FROM activity WHERE id="${id}"`)
            return "Delete succesful"
        }

    }catch (error){
        console.log(error);
        ctx.throw(500, 'An Error has occured')
    }
}