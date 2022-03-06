const express = require('express')

const app = express()



con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  con.query("Select * from user", (error, result, fields) => {
    if (error) throw error
    console.log(result);
  })

});

app.get()

const userRouter = require('./routes/users')

app.use('/users', userRouter)

app.listen(3000)