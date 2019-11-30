
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


//this method is to verify a user does exist in db with such email and pwd
exports.findOne = async (authData, callback) => {

    try {
		//first connect to the database
        const connection = await mysql.createConnection(info.config);

        //this is the sql statement to execute
		let sql = `SELECT * FROM users
					WHERE username = \'${authData.username}\'
				`;
		//wait for the async code to finish
        let data = await connection.query(sql);
        
        //wait until connection to db is closed 
        await connection.end();
        
        if(data.length > 0){
            //check if the hashed passwords match
            let pass = bcrypt.compareSync(authData.password, data[0].password);
            
            if(pass)
                //if yes callback with the user data
                callback(null, data[0]); 
            else
                // otherwise callback with false
                callback(null, false); 
        }
        else{
            //no such username was found
            callback(null, false);
        }
    } catch (error) {
        if(error.status === undefined)
            error.status = 500;
		//if an error occured please log it and throw an exception
        callback(error);
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

        
        let sql = `SELECT username from Users WHERE
                    username = \'${user.username}\'`;
        
        const connection = await mysql.createConnection(info.config);
        let data = await connection.query(sql);

        //if the query return a record then this username has been used before
        if(data.length){
            //first close the connection as we are leaving this function
            await connection.end();
            //then throw an error to leave the function
            throw {message:'username already in use', status:400};
        }


        //hash the password using bcryptjs package
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(user.password, salt);

        //create a new object to hold users final data
        let userData = {
            username: user.username,
            password: hash,
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