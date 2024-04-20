const express = require("express");
const recordRoutes = express.Router();
const dbo = require("../db/conn");
const ObjectId = require("mongodb").ObjectId;
const sha256 = require('js-sha256');
const { Decimal128 } = require("mongodb");

// Sets a session
recordRoutes.route("/setSession").post(async function (req, res) {
    if (req.session.name !== req.body.name) {
      req.session.name = req.body.name;
      console.log("Session set");
    } 
    else {
      console.log("Session already existed");
    }
    console.log(req.session);
    res.json("{}");
});

// Gets a session
recordRoutes.route("/getSession").get(async function (req, res) {
    if (!req.session.name) {
      console.log("No session found");
      res.json("");
    } else {
      console.log("User is: " + req.session.name);
      res.json({ name: req.session.name })
    }
});

// Ends a session
recordRoutes.route("/endSession").post(async function (req, res) {
  req.session.destroy(err => {
    if(err){
      console.log(err);
    } else {
      res.json({ message: "Session is destroyed" });
    }
  });
});

// This section will help you get a list of all the high scores.
recordRoutes.route("/highscores/:wordlength").get(async function (req, res) {
  try {
    const db_connect = await dbo.getDb();
    const wordLength = parseInt(req.params.wordlength); // Convert wordlength parameter to integer
    const result = await db_connect.collection("scores").find({ wordLength: wordLength, incorrectGuessCt: { $gte: 0, $lt: 6 }, gameWin: true}).toArray(); 
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" }); // Handle errors gracefully
  }
});


// SHOULDN'T NEED THIS ROUTE 
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

// Gets a random word, sets it as the selected word in the scores table, and sends back it's length
recordRoutes.route("/newWord").post(async function (req, res) {
  try {
    const db_connect = await dbo.getDb();
    const wordResult = await db_connect.collection("words").aggregate([{ $sample: { size: 1 } }]).next();
    
    const selectedWord = wordResult.word;
    const wordLength = selectedWord.length;

    const myobj = {
      gameWin: false,
      name: req.body.name,
      totalGuessCt: 0,
      incorrectGuessCt: 0, 
      word: selectedWord,
      wordLength: wordLength
    };
    const result = await db_connect.collection("scores").insertOne(myobj);

    res.json({ insertedId: result.insertedId, wordLength: wordLength });
  } catch (err) {
    throw err;
  }
});

// Route to guess a letter (passing id as a param and the letter as "guess" in body), sends back an array of the correct indexes of the word
recordRoutes.route("/guessLetter/:id").post(async function (req, res) {
  try {
    const db_connect = await dbo.getDb();
    const myquery = { _id: new ObjectId(req.params.id) };
    const result = await db_connect.collection("scores").findOne(myquery);

    const word = result.word.split('');
    const correctIndexes = []
    word.forEach((char, index) => {
      if (char.toUpperCase() === req.body.guess.toUpperCase()) {
        correctIndexes.push(index);
      }
    });

    let newvalues = {
      $inc: {
        totalGuessCt: 1,
      },
    };
    if (correctIndexes.length == 0) {
      newvalues = {
        $inc: {
          totalGuessCt: 1,
          incorrectGuessCt: 1,
        },
      };
    }

    await db_connect.collection("scores").updateOne(myquery, newvalues);

    res.json({ correctIndexes: correctIndexes });
  } catch (err) {
    throw err;
  }
});

recordRoutes.route("/endGame/:id").post(async function (req, res) {
  try {
    const db_connect = await dbo.getDb();
    const myquery = { _id: new ObjectId(req.params.id) };
    const result = await db_connect.collection("scores").findOne(myquery);

    if (req.body.gameWin) {
      await db_connect.collection("scores").updateOne(myquery, { $set: {gameWin: true }});
    }

    const word = result.word;
    res.json({ word: word });
  } catch (err) {
    throw err;
  }
});

module.exports = recordRoutes;