const db = require("../config/db");

exports.messages = (req, res) => {
  const { chatroomId } = req.params;
  db.all(
    "SELECT * FROM messages WHERE chatroom_id = ? ORDER BY timestamp ASC",
    [chatroomId],
    (err, rows) => {
      if (err) {
        res.status(500).send(err.message);
        return;
      }
      res.json(rows);
    }
  );
};
