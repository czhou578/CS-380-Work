const express = require('express')
const app = express()
const userRouter = require('./routes/users')
const groupRouter = require('./routes/groups')
const con = require('./database')

app.use(express.json())


con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});


app.use('/users', userRouter)
app.use('/groups', groupRouter)

app.listen(3000)