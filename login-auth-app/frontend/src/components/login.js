import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";


export default function Login() {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  async function onSubmit(e) {
    e.preventDefault();
  
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        credentials: "include",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: form.username,
          password: form.password,
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        // Login successful
        console.log('Login successful');
        // Set session on the frontend (optional, depends on your implementation)
        // Redirect to the homepage
        navigate('/');
      } 
      else {
        // Login failed
        console.log('Login failed:', data.message);
      }
    } catch (error) {
      console.error('Error logging in:', error);
      // Handle error (e.g., display error message to the user)
    }
  }
  

 return (
   <div>
    <h3>Log in here</h3>
     <form onSubmit={onSubmit}>
       <div className="form-group">
         <label htmlFor="username">Username</label>
         <input
           type="text"
           className="form-control"
           id="username"
           value={form.username}
           onChange={(e) => updateForm({ username: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="password">Password</label>
         <input
           type="password"
           className="form-control"
           id="password"
           value={form.password}
           onChange={(e) => updateForm({ password: e.target.value })}
         />
       </div>
       <div className="form-group">
          <input
            type="submit"
            value="Login"
            className="btn btn-primary"
          />
       </div>
     </form>
     <br/>
     <h5>Don't have an account?</h5>
     <Link to="/signup">Sign up</Link>
   </div>
 );
}