const express = require("express");
const recordRoutes = express.Router();
const dbo = require("../db/conn");
// const ObjectId = require("mongodb").ObjectId;
//const bcrypt = require('bcrypt');
var sha256 = require('js-sha256');

const app = express();

// Signup route
recordRoutes.route("/signup").post(async function (req, res) {
  try {
      const db_connect = await dbo.getDb();
      
      // Generate random number between 1 and 20
      const salt = Math.floor(Math.random() * 20) + 1;

      // Hash the password
      var hashedPassword = sha256.update(req.body.password + salt);
      // console.log("New Password: " + req.body.password + " salt: " + salt);
      // console.log("Attempted hashed Password: " + hashedPassword);

      // Create a new user
      const newUser = {
          username: req.body.username,
          password: hashedPassword.hex(),
          salt: salt,
          type: req.body.type
      };
      console.log("Type: " + newUser.type);

      const result = await db_connect.collection("users").insertOne(newUser);
      req.session.username = req.body.username;
      // console.log("Username: " + req.session.username);
      // res.json(result);
      res.status(201).json({ message: 'User created successfully' });
      const loginResponse = await fetch("http://localhost:5000/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });
      
      if (!loginResponse) {
        console.log("Login failed after signup");
      }
      } catch (error) {
      res.status(500).json({ message: "User was not created"});
  }
});

// Login route
recordRoutes.route("/login").post(async function (req, res) {
try {
  const loginUser = {
    username: req.body.username,
    password: req.body.password
  }
  // console.log("I have entered the login route.");

  const db_connect = await dbo.getDb();

  // Find user by username
  const storedUser = await db_connect.collection("users").findOne({ username: loginUser.username });

    
  if (!storedUser) {
    return res.status(400).json({ message: 'Invalid username' });
  }
  const salt = storedUser.salt;

  // Hash login password using same salt as stored user
  var hashedLoginPw = sha256.update(loginUser.password + salt);
  console.log("Password: " + req.body.password + " salt: " + salt);


  console.log("Attempted hashed Password: " + hashedLoginPw);
  console.log("Stored  hashed  Password:  " + storedUser.password);

  if(hashedLoginPw == storedUser.password) {
    req.session.username = storedUser.username;
    console.log("Username: " + req.session.username);
    return res.status(200).json({ message: 'Login successful' });
  }
  else {
    console.log("Login failed. Passwords are not the same");
    return res.status(400).json({ message: 'Invalid password' });
  }

} catch (error) {
  res.status(500).json({ error: error.message });
}
});


// Validation route
recordRoutes.route("/validation").get(async function (req, res) {
try {
  // Check if user session exists
  if (req.session.username) {
    // User is logged in, send success response
    res.json({
      loggedIn: true,
      username: req.session.username
    });
    // console.log("User is currently: " + req.session.username);
  } else {
    // User is not logged in, send failure response
    res.status(401).json({ message: 'You are not logged in' });
  }
} catch (error) {
  res.status(500).json({ error: error.message });
}
});

//Set the session
// recordRoutes.route("/setSession/:username").get(async function (req, res) {

//   if (!req.session.username) {
//     req.session.username = req.params.username;
//     console.log("Session set");
//   } else {
//     console.log("Session already existed");
//   }
//   res.json("{}");
// });

// recordRoutes.route("/getSession").get(async function (req, res) {
//   if (!req.session.username) {
//     console.log("No session found");
//   } else {
//     console.log("User is: " + req.session.username);
//   }
//   res.json("{}")
// });

//Logout route
recordRoutes.route("/logout").post(async function (req, res) {
  try {
      // Destroy the session to log out the user
      req.session.destroy((err) => {
        if (err) {
          console.error('Failed to destroy session:', err);
          res.status(500).json({ error: 'Failed to logout' });
        } else {
          res.status(200).json({ message: 'Logout successful' });
        }
      });
  } catch (error) {
  console.error('Failed to logout:', error);
  res.status(500).json({ error: 'Failed to logout' });
  }
});

module.exports = recordRoutes;