const express = require('express');
const app = express();
// // imporing express module

// // from here this sinup and login API
// // iporing database connection dile
const mysqlConn = require('./databasecon');

// // parse incoming JSON data from HTTP requests
app.use(express.json());

// // SignUp
// app.post('/signup', (req, resp) => {
//      const data = req.body;
//      mysqlConn.query('INSERT INTO user SET ?', data, (error, result, fields) => {
//           if (error) {
//                resp.send('error');
//           } else {
//                resp.send(result);
//                console.log(result);
//           }
//      })
// });

// // Login
// app.post('/login', (req, resp) => {
//      const { Email, Password } = req.body;

//      mysqlConn.query('select * from user where Email=? and Password=?', [Email, Password], (error, result, fields) => {
//           if (error) {
//                resp.send('Error');
//           } else {
//                if (result.length > 0) {
//                     resp.send('lodin successfull')
//                } else {
//                     resp.send('pls enter valid Email and Password')
//                }
//           }
//      })
// })

// Create a new task
app.post('/tasks', (req, resp) => {

     const data = { description, status, doudate } = req.body;

     mysqlConn.query('INSERT INTO tasks SET ?', data, (error, result, fields) => {

          if (error) {
               resp.send(error);
          } else {
               resp.send(result);
          }

     })

});


app.get('/getdata/:id', (req, resp) => {

     mysqlConn.query('select * from tasks where id=?', [req.params.id], (error, result) => {

          if (error) {
               resp.send(error)
          } else {
               resp.send(result);

          }
     })
})

app.delete('/delete/:id', (req, resp) => {

     mysqlConn.query('delete  from tasks where id=?', [req.params.id], (error, result) => {

          if (error) {
               resp.send(error)
          } else {
               resp.send(result);

          }
     })
})

app.put('/update', (req, resp) => {
     const data = req.body;
     mysqlConn.query('UPDATE tasks SET ? WHERE id = ?',[ data, data.id ], (err, result) => {
          if (err) {
               resp.send(err)
          } else {
               if (result.affectedRows == 0) {
                    const data = { description, status, doudate } = req.body;

                    mysqlConn.query('INSERT INTO tasks SET ?', data, (error, result, fields) => {

                         if (error) {
                              resp.send(error);
                         } else {
                              resp.send(result);
                         }
                    })
               } else {
                    resp.send(result);

               }
          }
     })
})
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
