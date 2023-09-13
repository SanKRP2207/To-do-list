
const express = require('express');
const app = express();


// app.get('/',(req,resp)=>{

//     resp.send('geted data');
// })

const mysqlConn = require('./databasecon');
app.use(express.json());

app.post('/signup', (req, resp) => {
     const data = req.body;
     mysqlConn.query('INSERT INTO user SET ?', data, (error, result, fields) => {
          if (error) {
               resp.send('error');
          } else {
               resp.send(result);
               console.log(result);
          }

     })
});

app.post('/login',(req,resp)=>{
     const {Email, Password} = req.body;

     mysqlConn.query('select * from user where Email=? and Password=?',[Email,Password],(error,result,fields)=>{
          if(error){
               resp.send('Error');
          }else{
               if(result.length > 0){
                    resp.send('lodin successfull')
               }else{
                    resp.send('pls enter valid Email and Password')
               }
          }
     })
})
app.listen(4000);