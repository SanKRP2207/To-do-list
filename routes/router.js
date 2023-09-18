const mysqlConn = require('../config/databasecon');
const userMiddleware = require('../middleware/users.js');

const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const jwt = require('jsonwebtoken');


router.post('/sign-up', userMiddleware.validateRegister, (req, res, next) => {
  mysqlConn.query(
    'SELECT id FROM user WHERE LOWER(Email) = LOWER(?)',
    [req.body.Email],
    (err, result) => {
      if (result && result.length) {
        // error
        return res.status(409).send({
          message: err,
        });
      } else {
        // username not in use
        bcrypt.hash(req.body.Password, 10, (err, hash) => {
          if (err) {
            return res.status(500).send({
              message: err,
            });
          } else {
            mysqlConn.query(
              'INSERT INTO user (id, Name, Email, Password) VALUES (?, ?, ?, ?);', // 
              [uuid.v4(), req.body.Name, req.body.Email, hash],
              // [uuid.v4(), req.body.Email, hash],
              (err, result) => {
                if (err) {
                  return res.status(400).send({
                    message: err,
                  });
                }
                return res.status(201).send({
                  message: 'Registered!',
                });
              }
            );
          }
        });
      }
    }
  );
});


router.post('/login', (req, res, next) => {
  mysqlConn.query(
    `SELECT * FROM user WHERE Email = ?;`,
    [req.body.Email],
    (err, result) => {
      if (err) {
        return res.status(400).send({
          message: err,
        });
      }
      if (!result.length) {
        return res.status(400).send({
          message: 'Username or password incorrect!',
        });
      }
      bcrypt.compare(
        req.body.Password,
        result[0]['Password'],
        (bErr, bResult) => {
          if (bErr) {
            return res.status(400).send({
              message: 'Username or password incorrect!',
            });
          }
          if (bResult) {
            // password match
            const token = jwt.sign(
              {
                Email: result[0].Email,
                userId: result[0].id,
              },
              'SECRETKEY',
              { expiresIn: '7d' }
            );
            mysqlConn.query(`UPDATE user SET last_login = now() WHERE id = ?;`, [
              result[0].id,
            ]);
            return res.status(200).send({
              message: 'Logged in!',
              token,
              user: result[0],
            });
          }
          return res.status(400).send({
            message: 'Username or password incorrect!',
          });
        }
      );
    }
  );
});


router.post('/tasks', (req, resp) => {

     const data = { description, status, doudate } = req.body;

     mysqlConn.query('INSERT INTO tasks SET ?', data, (error, result, fields) => {

          if (error) {
               resp.send(error);
          } else {
               resp.send(result);
          }

     })

});

// get data from database
router.get('/getdata/:id', (req, resp) => {

     mysqlConn.query('select * from tasks where id=?', [req.params.id], (error, result) => {

          if (error) {
               resp.send(error)
          } else {
               resp.send(result);

          }
     })
})

// update API
router.put('/update', (req, resp) => {
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


// delete APi
router.delete('/delete/:id', (req, resp) => {

  mysqlConn.query('delete  from tasks where id=?', [req.params.id], (error, result) => {

       if (error) {
            resp.send(error)
       } else {
            resp.send(result);

       }
  })
})





router.get('/secret-route', (req, res, next) => {
  res.send('This is the secret content. Only logged in users can see that!');
});

module.exports = router;