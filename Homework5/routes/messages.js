const express = require("express");
const database = require("../database");

const router = express.Router();

router.get("/get-msg", (req, res) => {
  const { groupid } = req.body;

  let sql = `SELECT * FROM messages WHERE group_id = ${groupid}`;
  database.query(sql, function (error, result) {
    if (error) throw error;

    res.send(result);
  });
});

router.post("/post-msg", (req, res) => {
  const { msgid, groupid, userid, contents, postedat } = req.body;

  if (msgid && groupid && userid && contents && postedat) {
    let sql = `INSERT INTO messages(msg_id, group_id, user_id, contents, postedAt) VALUES (${msgid}, ${groupid}, ${userid}, '${contents}', '${postedat}')`;
    database.query(sql, function (error, result) {
      if (error) throw error;

      res.send("posted message");
    });
  } else {
    res.send("message failed to post");
  }
});

router.put("/change-msg", (req, res) => {
  const { message, msgid } = req.body;

  if (message && msgid) {
    let sql = `UPDATE messages SET contents = ? WHERE msg_id = ?`;
    database.query(sql, [message, msgid], function (error, result) {
      if (error) throw error;

      res.send("message updated");
    });
  } else {
    res.send("message update failed");
  }
});

module.exports = router;
