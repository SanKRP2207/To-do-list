const mysql =  require('mysql');

const conn = mysql.createConnection({

    host: 'localhost',      // Replace with your MySQL server's hostname
    user: 'root',  // Replace with your MySQL username
    password: '',  // Replace with your MySQL password
    database: 'to-do-list',  // Replace with your MySQL database name
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// conn.connect((err)=>{
//     if(err)
//     {
//         console.log("error");
//     }else{
//         console.log("connect ed");
//     }
// });

module.exports = conn;

