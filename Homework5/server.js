const con = require('./database')
const express = require('express')
const app = express()
const userRouter = require('./routes/users')
const groupRouter = require('./routes/groups')
const participantRouter = require('./routes/participants')
const messageRouter = require('./routes/messages')
const eventRouter = require('./routes/events')

app.use(express.json())


con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});


app.use('/users', userRouter)
app.use('/groups', groupRouter)
app.use('/participant', participantRouter)
app.use('/msg', messageRouter)
app.use('/events', eventRouter)

app.listen(3000)