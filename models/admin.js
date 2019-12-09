
const mysql = require('promise-mysql');
const info = require('../config');

exports.createTables = async () => {
  try {
    const connection = await mysql.createConnection(info.config);

    let sql = `CREATE TABLE users (
            ID INT NOT NULL AUTO_INCREMENT,
            username VARCHAR(32),
            password VARCHAR(256),
            PRIMARY KEY (ID)
                )`;
    await connection.query(sql);

    sql = `CREATE TABLE activity (
            ID INT NOT NULL AUTO_INCREMENT,
            title VARCHAR(60),
            description VARCHAR(300),
            url VARCHAR(70),
            location VARCHAR(40),
            PRIMARY KEY (ID)
            )`;

    await connection.query(sql);

    sql = `CREATE TABLE calendar (
            ID INT NOT NULL AUTO_INCREMENT,
            timeFrom DATETIME,
            timeTo DATETIME,
            location VARCHAR(40),
            userId INT,
            activityId INT,
            PRIMARY KEY (ID)
        )`;

    await connection.query(sql);


    sql = `CREATE TABLE taggedUsers (
            ID INT NOT NULL AUTO_INCREMENT,
            taggedUserId INT,
            taggedByUserId INT,
            calendarItemId INT,
            accepted TINYINT(1),
            PRIMARY KEY (ID)
        )`;

    await connection.query(sql);

    sql = `CREATE TABLE comments (
            ID INT NOT NULL AUTO_INCREMENT,
            userId VARCHAR(10),
            activityId VARCHAR(10),
            allText TEXT,
            dateCreated DATETIME,
            dateModified DATETIME,
            PRIMARY KEY (ID)
        )`;

    await connection.query(sql);

    return { message: 'created successfully' };
  } catch (error) {
    console.log(error);
    ctx.throw(500, 'An Error has occured');
  }
};
