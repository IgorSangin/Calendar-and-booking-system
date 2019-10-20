
'use strict';

var mysql = require('promise-mysql');
var bcrypt = require('bcryptjs');

var info = require('../config');


//get an article by its id
exports.getById = async (id) => {
	try {

		//first connect to the database
        const connection = await mysql.createConnection(info.config);

        //this is the sql statement to execute
		let sql = `SELECT * FROM users
					WHERE id = ${id}
				`;
		//wait for the async code to finish
        let data = await connection.query(sql);
		
		//wait until connection to db is closed 
		await connection.end();

		//return the result
        return data;

    } catch (error) {
		//if an error occured please log it and throw an exception
        throw new Error(error)
    }
}


exports.add = async (user) => {
	try {
        
        //server validation rules 
        //username is required        
        if(user.username === undefined){
            throw {message:'username is required', status:400};
        }
        //paswword is required
        if(user.password === undefined){
            throw {message:'password is required', status:400};
        }
        else{
            //if password is provided it must be ay least 6 characters long
            if(user.password.length < 6){
                throw {message:'password must be more than 6 characters long', status:400};
            }
        }
        //passwordConfrimation is required
        if(user.passwordConfirmation === undefined){
            throw {message:'password confirmation is required', status:400};
        }
        else{
            //if passwordConfirmation is provided then it must match password
            if(user.password !== user.passwordConfirmation ){
                throw {message:'passwords don\'t match', status:400};
            }
        }

        
        const connection = await mysql.createConnection(info.config);
        let data = await connection.query(sql);


        //hash the password using bcryptjs package
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(user.password, salt);

        //create a new object to hold users final data
        let userData = {
            pwd: hash,
            forename: user.forename,
            surname: user.surname,
            created: new Date()
        }
        
        //this is the sql statement to execute
		sql = `INSERT INTO users
					SET ?
                `;
                
        data = await connection.query(sql, userData);
		
		await connection.end();

        return data;

    } catch (error) {
        //in case we caught an error that has no status defined then this is an error from our database
        //therefore we should set the status code to server error
        if(error.status === undefined)
            error.status = 500;
        throw error;
    }
}