const express = require("express");
const recordRoutes = express.Router();
const dbo = require("../db/conn");
const ObjectId = require("mongodb").ObjectId;

//This section will help you get a list of all the high scores.
recordRoutes.route("/highscores").get(async function (req, res) {
  try {
    const db_connect = await dbo.getDb("num-guesser");
    const result = await db_connect.collection("scores").find({}).toArray();
    res.json(result);
  } catch (err) {
    throw err;
  }
});

// This section will help you create a new player for the high scores
recordRoutes.route("/create").post(async function (req, res) {
  try {
    const db_connect = await dbo.getDb();
    const myobj = {
      
      name: req.body.name,
      number: Math.floor(Math.random() * 100) + 1,
      guessCt: 0,
    };
    const result = await db_connect.collection("scores").insertOne(myobj);
    res.json(result);
  } catch (err) {
    throw err;
  }
});
 
// Here we grab the info for a specific value, particularly to check the generated number
recordRoutes.route("/game/:id").get(async function (req, res) {
  try {
    const db_connect = await dbo.getDb("num-guesser");
    const myquery = { _id: new ObjectId(req.params.id) };
    const result = await db_connect.collection("scores").findOne(myquery);
    if (!result) {
      return res.status(404).json({ error: "Record not found" });
    }
    else {
      return res.json(result);
    }
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

//This is for updating scores when the request is sent in.
recordRoutes.route("/update/:guess/:id").post(async function (req, res) {
  try {
    const db_connect = await dbo.getDb();
    const myquery = { _id: new ObjectId(req.params.id) };
    const updatedGuess = parseInt(req.params.guess);
    const newvalues = {
      $set: {
        guessCt: updatedGuess,
      },
    };
    const result = await db_connect.collection("scores").updateOne(myquery, newvalues);
    console.log("1 document updated");
    res.json(result);
  } catch (err) {
    throw err;
  }
});



recordRoutes.route("/status/:guessedNumber/:id").get(async function (req, res) {
  try {
    const guessedNumber = parseInt(req.params.guessedNumber);
    const objectId = req.params.id;
    
    // First, fetch the actual number associated with the objectId from the database
    const db_connect = await dbo.getDb("num-guesser");
    const result = await db_connect.collection("scores").findOne({ _id: new ObjectId(objectId) });
    if (!result) {
      res.status(404).send("Record not found");
      return;
    }
    
    const actualNumber = result.number;
    
    // Now compare the guessed number with the actual number
    if (guessedNumber > actualNumber) {
      res.send("Too High");
    } else if (guessedNumber < actualNumber) {
      res.send("Too Low");
    } else {
      res.send("Correct!");
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// recordRoutes.route("/status/:guessedNumber/:id").get(async function (req, res) {
//   try {
//     const db_connect = await dbo.getDb();
//     const myquery = { _id: new ObjectId(req.params.id) };
//     const result = await db_connect.collection("scores").findOne(myquery);
//     const guessedNumber = parseInt(req.params.guessedNumber);
//     console.log("Guessed number  is " + guessedNumber);
//     const actualNumber = parseInt(result.number);
//     console.log("Actual number is " + actualNumber);
//     res.json(result);

//     if (guessedNumber > actualNumber) {
//       res.send("Too High!");
//     } else if (guessedNumber < actualNumber) {
//       res.send("Too Low!");
//     } else {
//       res.send("Correct!");
//     }
//   } catch (err) {
//     res.status(500).send(err.message);
//   }
  
// });

// Compares number to guess and sends back status
// recordRoutes.route("/guess/:guessedNum/:guessCt/:id").get(async function (req, res) {
//   try {
//     const db_connect = await dbo.getDb();
//     const myquery = { _id: new ObjectId(req.params.id) };
//     const guess = parseInt(req.params.guessedNum);
//     const guessCount = parseInt(req.params.guessCt);

//     const newvalues = {
//       $set: {
//         guessCt: guessCount,
//       },
//     };
    
//     const result = await db_connect.collection("scores").updateOne(myquery, newvalues);
//     console.log("1 document updated");
//     res.json(result)

//     const item = await db_connect.collection("scores").findOne(myquery);
//     const number = parseInt(item.number);

//     if(guess > number) {
//       res.status(200).json({ message: 'Too High!' });
//     } 
//     else if (guess < number) {
//       res.status(200).json({ message: 'Too Low!' });
//     } 
//     else {
//       res.status(200).json({ message: 'Correct!' });
//     }

//     } catch (err) {
//       throw err;
//     }
// });


 module.exports = recordRoutes;