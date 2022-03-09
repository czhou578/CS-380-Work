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
  const { event_id, createdBy, group_id, event_name, startAt, endAt } = req.body

  if (event_id && createdBy && event_name && startAt && endAt && group_id) {
    let sql = `INSERT INTO events (event_id, createdBy, group_id, event_name, startAt, endAt) 
      VALUES (${event_id}, ${createdBy}, ${group_id}, '${event_name}', '${startAt}', '${endAt}')`

    database.query(sql, function (error, result) {
      if (error) throw error

      res.send('Created Event!')
    })
  } else {
    res.send('Invalid Input. Try Again')
  }
})

router.get('/details-event', (req, res) => {
  const { event_id } = req.body

  if (event_id) {
    let sql = `SELECT * FROM events WHERE event_id = ${event_id}`
    database.query(sql, function (error, result) {
      if (error) throw error

      res.send(result)
    })
  } else {
    res.send('Event id invalid.')
  }

})

router.put('/modify-event', (req, res) => {
  const { event_id, createdBy, group_id, event_name, startAt, endAt} = req.body

  if (event_name && group_id && createdBy && startAt && endAt && event_id) {
    let sql = `UPDATE events SET createdBy = ?, group_id = ?, event_name: ?, startAt = ?, endAt = ? WHERE event_id = ?`
    database.query(sql, [createdBy, group_id, event_name, startAt, endAt, event_id], function (error, result) {
      if (error) throw error

      res.send("updated!")
    })
  } else {
    res.send('failure')
  }
})

router.delete('/delete-event', (req, res) => {
  const {event_id} = req.body

  if (event_id) {
    let sql = `DELETE FROM events WHERE event_id = ${event_id}`
    database.query(sql, function (error, result) {
      if (error) throw error

      res.send('Deleted event!')
    })
  } else {
    res.send('invalid parameters')
  }
})

module.exports = router