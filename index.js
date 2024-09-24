const express = require("express");
const db = require("./db");

const MenuItem= require("./models/MenuItem")
const bodyParser = require("body-parser");

const personRoutes=require("./routes/personRoutes")
const menuItemRoutes=require("./routes/menuItemsRoutes")
const port = 3000;
const app = express();
app.use(bodyParser.json());

app.use('/person',personRoutes);
app.use('/menu',menuItemRoutes)

app.get("/", (req, res) => {
  res.send("welcome to my hotel");
});



app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
