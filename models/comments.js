var mysql = require('promise-mysql');
var info = require('../config');

//create an activity
exports.add = async (comment,ctx ) =>{
    try{

        //connect to database
        const connection = await mysql.createConnection(info.config);
             //sql statement to execute
            let sql = `INSERT INTO comments SET ?`;

            //wait for async code to finish
            await connection.query(sql, comment);

             //wait until the connection is closed
            await connection.end();

            //return the result
            return "Added succesfully";

    }catch (error) {
        console.log(error);
        ctx.throw(500, 'An Error has occured');
    }
}

exports.get = async (ctx) =>{
    try{

        const connection = await mysql.createConnection(info.config);

        let sql = `SELECT * FROM comments`

        let data = await connection.query(sql);

        await connection.end()

        return data;
    } catch (error){
        console.log(error);
        ctx.throw(500, 'An Error has occured');
    }
}