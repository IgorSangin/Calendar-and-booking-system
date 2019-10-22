var mysql = require('promise-mysql');
var info = require('../config');

//create an activity
exports.add = async (activity , ctx) =>{
    try{

        const connection = await mysql.createConnection(info.config);

        let sql = `INSERT INTO activity SET ?`;

        let data = await connection.query(sql, activity);

        await connection.end();

        return data;

    }catch (error) {
        console.log(error);
        ctx.throw(500, 'An Error has occured');
    }
}