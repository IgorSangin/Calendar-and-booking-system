var mysql = require('promise-mysql');
var info = require('../config');

//create an activity
exports.add = async (ctx) =>{
    try{

        //connect to database
        const connection = await mysql.createConnection(info.config);
             //sql statement to execute
            let sql = `INSERT INTO comments SET ?`;

            //wait for async code to finish
            await connection.query(sql, ctx);

             //wait until the connection is closed
            await connection.end();

            //return the result
            return "Added succesfully";

    }catch (error) {
        console.log(error);
        ctx.throw(500, 'An Error has occured');
    }
}