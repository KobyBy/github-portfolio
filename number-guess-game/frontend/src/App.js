import React from "react";
// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
 // We import all the components we need in our app
import HighScoreList from "./components/highscores";
import Game from "./components/game";
import Create from "./components/create";
 const App = () => {
 return (
   <div>
     <Routes>
       <Route exact path="/" element={<HighScoreList />} />
       <Route path="/game/:id" element={<Game />} />
       <Route path="/create" element={<Create />} />
     </Routes>
   </div>
 );
};
 export default App;