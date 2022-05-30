const path = require("path");
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

console.log("dirname: ", path.join(__dirname, "build"));
app.use(express.static(path.join(__dirname, "build")));
app.get("/*", function(req, res) {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
app.listen(port, () => console.log(`App is live on port ${port}!`));
