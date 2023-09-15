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

conn.connect((err)=>{
    if(err)
    {
        console.log("error not connected database");
    }else{
        console.log("connect to database");
    }
});

module.exports = conn;

// const { Sequelize } = require('sequelize');
// const sequelize = new Sequelize({
//   dialect: 'mysql2', // Replace with your database dialect (e.g., 'mysql', 'postgres', 'sqlite', etc.)
//   host: 'localhost', // Replace with your database host
//   user: 'root',
//   Email: 'your_username', // Replace with your database username
//   Password: 'your_password', // Replace with your database password
//   database: 'to-do-list', // Replace with your database name
// });

// // Test the database connection
// sequelize
//   .authenticate()
//   .then(() => {
//     console.log('Database connection has been established successfully.');
//   })
//   .catch((error) => {
//     console.error('Unable to connect to the database:', error);
//   });

// module.exports = sequelize;


