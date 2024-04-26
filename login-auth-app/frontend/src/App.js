import React from "react";
// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
 // We import all the components we need in our app
import Home from "./components/home";
import Login from "./components/login";
import Signup from "./components/signup";

 const App = () => {
 return (
   <div>
     <Routes>
       <Route exact path="/" element={<Home />} />
       <Route path="/login" element={<Login />} />
       <Route path="/signup" element={<Signup />} />
     </Routes>
   </div>
 );
};
 export default App;