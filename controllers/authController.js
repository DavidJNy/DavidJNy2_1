const bcrypt = require("bcryptjs");
const db = require("../config/db");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const WEBSOCKET_KEY = process.env.WEBSOCKET_KEY;


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

      const token = jwt.sign({ userId: user.id }, WEBSOCKET_KEY, {
        expiresIn: "1h",
      });
      
      res.status(200).json({ message: "Login successful", user, token });
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

exports.validateToken = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res
        .status(401)
        .json({ valid: false, message: "Authorization header missing" });
    }

    const tokenParts = authHeader.split(" ");
    if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
      return res
        .status(401)
        .json({ valid: false, message: "Invalid authorization header format" });
    }

    const token = tokenParts[1];

    jwt.verify(token, WEBSOCKET_KEY, async (err, decoded) => {
      if (err) {
        return res.status(401).json({ valid: false, message: "Invalid token" });
      }

      const userId = decoded.userId;

      // Assuming db.get executes a SQL query and returns a single row or null
      const user = await getUserById(userId); // Define this function to retrieve user details

      if (!user) {
        return res
          .status(401)
          .json({ valid: false, message: "User not found" });
      }

      res.json({ valid: true, username: user.username });
    });
  } catch (error) {
    console.error("Error validating token:", error);
    res.status(500).json({ valid: false, message: "Internal server error" });
  }
};

// Function to fetch user details by ID from the database
async function getUserById(userId) {
  return new Promise((resolve, reject) => {
    db.get("SELECT username FROM users WHERE id = ?", [userId], (err, user) => {
      if (err) {
        reject(err);
      } else {
        resolve(user);
      }
    });
  });
}