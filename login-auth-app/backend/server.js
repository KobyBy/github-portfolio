const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const session = require("express-session");  // new
const MongoStore = require("connect-mongo"); // new

const port = process.env.PORT || 5000;

app.use(cors({credentials: true, origin: "http://localhost:3000"}));
app.use(express.json());

// get driver connection
const dbo = require("./db/conn");

app.listen(port, () => {
  // perform a database connection when server starts
  dbo.connectToServer(function(err) {
    if (err) {
      console.error(err);
    }
  });
  console.log(`Server is running on port: ${port}`);
});

const uri = process.env.ATLAS_URI + "login";

// Advanced usage
app.use(session({
  secret: 'keyboard cat',
  saveUninitialized: false, // don't create session until something stored
  resave: false, //don't save session if unmodified
  store: MongoStore.create({
    mongoUrl: uri,
    collectionName: "sessions"
  })
}));

app.use(require("./routes/record"));
