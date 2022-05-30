const path = require("path");
const express = require("express");
const app = express();
const env = require("dotenv").config();
const cors = require("cors");
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));
app.get("/*", function(req, res) {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(port, () => console.log(`App is live on port ${port}!`));
