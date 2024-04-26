import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    // Check if user is logged in
    const checkLoggedIn = async () => {
      try {
        const response = await fetch('http://localhost:5000/validation', {
          method: "GET",
          credentials: "include"
        });
        if (response.ok) {
          const data = await response.json();
          setLoggedIn(true);
          setUsername(data.username);
        }
      } catch (error) {
        console.error('Failed to check login status:', error);
      }
    };

    checkLoggedIn();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:5000/logout', {
        method: "POST",
        credentials: "include"
      });
      if (response.ok) {
        setLoggedIn(false);
        setUsername("");
      }
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  return (
    <div>
      <h2>Login Home Page</h2>
      <br/>
      {loggedIn ? (
        <div>
          <h4>Logged in as: {username}</h4>
          <br/>
          <button className="btn btn-primary" onClick={handleLogout}>Logout</button>
          <br/>
        </div>
      ) : (
        <div>
          <h4>Not logged in</h4>
          <br/>
          <Link to="/login"><button className="btn btn-primary">Login</button></Link>
          <br/>
          <br/>
          <Link to="/signup">Signup</Link>
        </div>
      )}
    </div>
  );
}
