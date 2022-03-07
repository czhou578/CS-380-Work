const express = require('express')
const database = require('../database')

const router = express.Router()

router.post('/postNewUsers', (req, res) => {
  const { id, name, joinedAt, active } = req.body

  if (name && id && joinedAt && active) {
    try {
      database.query(`INSERT INTO USER VALUES('${id}', '${name}', '${joinedAt}', '${active}')`)
      res.send(201).send({msg: 'Created User!'})

    } catch (error) {
      console.log(error);
    }
  }

  res.send('hello')
})

module.exports(router)