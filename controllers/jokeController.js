const db = require("../config/db");

exports.getAllJokes = (req, res) => {
  db.all("SELECT * FROM jokes", (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
};

exports.getRandomJoke = (req, res) => {
  db.get("SELECT * FROM jokes ORDER BY RANDOM() LIMIT 1", (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(row);
  });
};

exports.addJoke = (req, res) => {
  const { joke } = req.body;
  db.run("INSERT INTO jokes (joke) VALUES (?)", [joke], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ id: this.lastID, joke });
  });
};

exports.deleteJoke = (req, res) => {
  const jokeId = req.params.id;
  db.get("SELECT * FROM jokes WHERE id = ?", [jokeId], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    const defaultJokes = [
      "Why don't skeletons fight each other? They don't have the guts.",
      "What do you call fake spaghetti? An impasta.",
      "How does a penguin build its house? Igloos it together.",
      "I'm reading a book on anti-gravity. It's impossible to put down.",
      "Did you hear about the restaurant on the moon? Great food, no atmosphere.",
      "I used to play piano by ear, but now I use my hands like everyone else.",
      "Why don't scientists trust atoms? Because they make up everything!",
      "How do you organize a space party? You planet.",
      "I would tell you a joke about an elevator, but it's an uplifting experience.",
      "Parallel lines have so much in common. It's a shame they'll never meet.",
    ];

    if (row && defaultJokes.includes(row.joke)) {
      res.status(400).json({ error: "Cannot delete default jokes." });
      return;
    }

    db.run("DELETE FROM jokes WHERE id = ?", [jokeId], function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({
        message: "Joke deleted successfully.",
        changes: this.changes,
      });
    });
  });
};
