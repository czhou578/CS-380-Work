const express = require('express')
const userRouter = require('./routes/users')

const app = express()



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