const express = require("express");
const app = express();
const cors = require("cors");

// middleware
app.use(cors());
app.use(express.json()); //req.body

// ROUTES /backend/auth/
app.use("/auth", require("./routes/jwtAuth"));
// ROUTE /backend/dashboard/ Dashboard
app.use("/dashboard", require("./routes/dashboard"));

app.listen(5001, () => {
  console.log("server is running on port 5000");
});
