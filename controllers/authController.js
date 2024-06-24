const bcrypt = require("bcryptjs");
const db = require("../config/db");

// Login function
exports.login = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Username and password are required" });
  }

  db.get(
    "SELECT * FROM users WHERE username = ?",
    [username],
    async (err, user) => {
      if (err) {
        console.error("Login query error:", err);
        return res.status(500).json({ error: "Internal server error" });
      }

      if (!user) {
        return res.status(401).json({ error: "Invalid username or password" });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(401).json({ error: "Invalid username or password" });
      }

      res.status(200).json({ message: "Login successful", user });
    }
  );
};

// Register function
exports.register = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Username and password are required" });
  }

  // Check if the username already exists
  db.get(
    "SELECT * FROM users WHERE username = ?",
    [username],
    async (err, user) => {
      if (err) {
        console.error("Database query error:", err);
        return res.status(500).json({ error: "Internal server error" });
      }

      if (user) {
        // Username already exists
        return res.status(409).json({ error: "Username already exists" });
      }

      // Hash the password and insert the new user
      const hashedPassword = await bcrypt.hash(password, 10);

      db.run(
        "INSERT INTO users (username, password) VALUES (?, ?)",
        [username, hashedPassword],
        function (err) {
          if (err) {
            console.error("Registration error:", err);
            return res.status(500).json({ error: "Failed to register user" });
          }

          res
            .status(201)
            .json({
              message: "User registered successfully",
              userId: this.lastID,
            });
        }
      );
    }
  );
};
