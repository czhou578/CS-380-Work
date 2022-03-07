const express = require('express')
const app = express()
const userRouter = require('./routes/users')
const con = require('./database')

app.use(express.json())


con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  // con.query("Select * from user", (error, result, fields) => {
  //   if (error) throw error
  //   console.log(result);
  // })

});


app.use('/users', userRouter)

app.listen(3000)