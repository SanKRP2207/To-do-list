const dotenv = require('dotenv');
const mysql =  require('mysql');

dotenv.config();
const conn = mysql.createConnection({

    host: 'localhost',      // Replace with your MySQL server's hostname
    user: 'root',  // Replace with your MySQL username
    password: '',  // Replace with your MySQL password
    database: 'to-do-list',  // Replace with your MySQL database name
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
    
});

conn.connect((err)=>{
    if(err)
    {
        console.log("error not connected database",);
    }else{
        console.log("connect to database");
    }
});

module.exports = conn;

