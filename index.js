const express = require('express');
const app = express();
// imporing express module

// importing coes modules
const cors = require('cors');

// from here this sinup and login API
// iporing database connection dile
// const mysqlConn = require('./config/databasecon');

// parse incoming JSON data from HTTP requests
app.use(express.json());

// use cors
app.use(cors());

// importing routes/router.js file
const router = require('./routes/router.js');
app.use('/api', router);



app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });

// port on that run the project
app.listen(4000);












































// const express = require('express');
// const bodyParser = require('body-parser');
// const sequelize = require('./config/database');
// const authRoutes = require('./routes/auth');
// const taskRoutes = require('./routes/tasks');

// const app = express();
// const PORT = process.env.PORT || 3000;

// // Middlewares
// app.use(bodyParser.json());

// // Routes
// app.use('/auth', authRoutes);
// app.use('/api', taskRoutes);

// // Sync the Sequelize models with the database and start the server
// sequelize.sync().then(() => {
//   app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
//   });
// });
