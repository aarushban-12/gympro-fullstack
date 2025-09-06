const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const db = require("./db");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

const COOKIE_NAME = "token";

// 🔒 Middleware to check auth
function authMiddleware(req, res, next) {
  const token = req.cookies[COOKIE_NAME];
  if (!token) return res.status(401).json({ error: "Not authenticated" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ error: "Invalid token" });
  }
}



// ✅ Register + auto-login
app.post("/register", (req, res) => {
  console.log("📦 Incoming /register request body:", req.body);
  const { email, password, name, gender, age } = req.body;

  if (!email || !password || !name || !gender || !age) {
    console.log("❌ Missing fields");
    return res.status(400).json({ error: "All fields required" });
  }

  console.log("✅ All fields present, hashing password...");
  const hash = bcrypt.hashSync(password, 10);

  db.run(
    "INSERT INTO users (email, password_hash, name, gender, age) VALUES (?, ?, ?, ?, ?)",
    [email, hash, name, gender, age],
    function (err) {
      if (err) {
        console.log("❌ DB error:", err.message);
        return res.status(400).json({ error: "Email already taken or DB error" });
      }

  db.run(
    "INSERT INTO user_stats (user_id) VALUES (?)",
    [userId],
    function (err) {
      if (err) console.error("Error creating stats row:", err);
    }
  );
    

      console.log("✅ User inserted, id:", this.lastID);
      const token = jwt.sign({ id: this.lastID, email }, process.env.JWT_SECRET, { expiresIn: "1d" });
      res.cookie("token", token, { httpOnly: true }).json({ id: this.lastID, email });
    }
  );
});



// ✅ Login
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  db.get("SELECT id, email, password_hash FROM users WHERE email = ?", [email], (err, user) => {
    if (!user) return res.status(401).json({ error: "Invalid credentials" });
    const ok = bcrypt.compareSync(password, user.password_hash);
    if (!ok) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.cookie(COOKIE_NAME, token, { httpOnly: true }).json({ id: user.id, email: user.email });
  });
});

// ✅ Check current user
app.get("/me", authMiddleware, (req, res) => {
  res.json({ user: req.user });
});

// ✅ Logout
app.post("/logout", (req, res) => {
  res.clearCookie(COOKIE_NAME, {
    httpOnly: true,
    sameSite: "lax",
  }).json({ message: "Logged out" });
});


// GET /stats - fetch current user's stats
app.get("/stats", authMiddleware, (req, res) => {
  const userId = req.user.id;

  const sql = `
    SELECT steps_walked, water_intake_ml, weight, height, 
           max_bench, max_squat, max_deadlift
    FROM user_stats
    WHERE user_id = ?
  `;

  db.get(sql, [userId], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    
    // If stats row doesn't exist yet, return default values
    if (!row) {
      return res.json({
        steps_walked: 0,
        water_intake_ml: 0,
        weight: 0,
        height: 0,
        max_bench: 0,
        max_squat: 0,
        max_deadlift: 0,
      });
    }

    res.json(row);
  });
});



app.post("/stats", authMiddleware, (req, res) => {
  const userId = req.user.id;
  const {
    steps_walked,
    water_intake_ml,
    weight,
    height,
    max_bench,
    max_squat,
    max_deadlift
  } = req.body;

  const sql = `
    INSERT INTO user_stats 
    (user_id, steps_walked, water_intake_ml, weight, height, max_bench, max_squat, max_deadlift)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(user_id) DO UPDATE SET
      steps_walked = excluded.steps_walked,
      water_intake_ml = excluded.water_intake_ml,
      weight = excluded.weight,
      height = excluded.height,
      max_bench = excluded.max_bench,
      max_squat = excluded.max_squat,
      max_deadlift = excluded.max_deadlift
  `;

  db.run(sql, [userId, steps_walked, water_intake_ml, weight, height, max_bench, max_squat, max_deadlift], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Stats updated successfully!" });
  });
});


app.get("/tasks", authMiddleware, (req, res) => {
  db.all("SELECT * FROM user_tasks WHERE user_id = ?", [req.user.id], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});
//get request to display all values of table


app.post("/tasks", authMiddleware, (req, res) => {
  const { name } = req.body;
  const userId = req.user.id;

  if (!name) return res.status(400).json({ error: "Task name required" });

  db.run(
    "INSERT INTO user_tasks (user_id, name) VALUES (?, ?)",
    [userId, name],
    function(err) {
      if (err) {
        console.error("DB error:", err);  // <-- important for debugging
        return res.status(500).json({ error: err.message });
      }
      res.json({ id: this.lastID, name });
    }
  );
});


//post request to add items to list

app.delete("/tasks/:id", authMiddleware, (req, res) => {
  const userId = req.user.id;
  const taskId = req.params.id;

  db.run("DELETE FROM user_tasks WHERE id = ? AND user_id = ?", [taskId, userId], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: "Task not found" });
    res.json({ message: "Task deleted" });
  });
});
//delete items from list




app.listen(5000, () => console.log("✅ Backend running at http://localhost:5000"));
