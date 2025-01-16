const router = require("express").Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const validInfo = require("../middleware/validInfo");
const authorization = require("../middleware/authorization");

// registering
// @POST backend_Url/auth/register
router.post("/register", validInfo, async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await pool.query(
      "SELECT * FROM users WHERE user_email = $1; ",
      [email]
    );
    // check for user exists
    if (user.rows.length !== 0) {
      return res.status(401).send("User already exists");
    }
    // bcrypt
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const bcryptPassword = await bcrypt.hash(password, salt);
    // save to dbb
    const newUser = await pool.query(
      "INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *; ",
      [name, email, bcryptPassword]
    );
    // res.json(newUser.rows[0]);
    // token
    const token = jwtGenerator(newUser.rows[0].user_id);
    res.json({ token });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});

// login
// @POST backenc_Url/auth/login
router.post("/login", validInfo, async (req, res) => {
  try {
    //1. Destructure
    const { email, password } = req.body;
    //2. Check user exists
    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
      email,
    ]);
    if (user.rows.length === 0) {
      return res.status(401).json("Password or Email are incorrect");
    }
    //3. Check if password the same
    const validPassword = await bcrypt.compare(
      password,
      user.rows[0].user_password
    );
    if (!validPassword)
      return res.status(401).json("Password or Email are incorrect");
    //4. Give kwt Token
    const token = jwtGenerator(user.rows[0].user_id);
    res.json({ token });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});

// VerifyAuth
// @POST backend_Url/auth/is-verify
router.get("/is-verify", authorization, async (req, res) => {
  try {
    res.json(true);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
