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

//get a comment by id
exports.getById = async (id, ctx) => {
    try{

        const connection = await mysql.createConnection(info.config);

        let sql = `SELECT * FROM comments WHERE id = ${id}`;
        
        let data = await connection.query(sql);

        await connection.end();

        return data;
    } catch (error) {
        console.log(error);
        ctx.throw(500, 'An Error has occured');
    }   
}

exports.update = async (newComment, ctx) =>{
    try{
        const connection = await mysql.createConnection(info.config);

        let sql = `UPDATE comments SET allText = "${newComment.allText}", dateModified = "${newComment.dateModified}" WHERE ID = "${newComment.Id}"`

        await connection.query(sql);

        await connection.end
        console.log('Update successful')
    }catch (error){
        console.log(error);
        ctx.throw(500, 'An Error has occured');
    }
}