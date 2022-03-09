const express = require('express')
const database = require('../database')

const router = express.Router()

router.get('/get-events', (req, res) => {
  let sql = `SELECT * FROM events`
  database.query(sql, function (error, result) {
    if (error) throw error

    res.send(result)
  })
})

router.post('/create-event', (req, res) => {
  const { createdBy, event_name, startAt, endAt, group_id } = req.body

  if (createdBy && event_name && startAt && endAt && group_id) {
    let sql = `INSERT INTO events (createdBy, event_name, startAt, endAt, group_id) 
      VALUES (${createdBy}, '${event_name}', '${startAt}', '${endAt}', ${group_id})`

    database.query(sql, function (error, result) {
      if (error) throw error

      res.send('Created Event!')
    })
  } else {
    res.send('Invalid Input. Try Again')
  }
})

router.get('/details-event', (req, res) => {
  // const { }
})

router.put('/modify-event', (req, res) => {
  const { createdBy, event_name, startAt, endAt, group_id} = req.body

  
})

module.exports = router