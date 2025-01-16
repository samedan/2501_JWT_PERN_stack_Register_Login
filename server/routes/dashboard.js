const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");

// @GET /backend/dashboard/
router.get("/", authorization, async (req, res) => {
  try {
    // after passing 'authorization' middleware, req.user has payload(user_id)
    // res.json(req.user);
    // const user = await pool.query("SELECT * FROM users WHERE user_id = $1;", [
    const user = await pool.query(
      "SELECT user_name FROM users WHERE user_id = $1;",
      [req.user]
    );
    res.json(user.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server error");
  }
});

module.exports = router;
