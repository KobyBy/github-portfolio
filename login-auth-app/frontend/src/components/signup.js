import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

export default function Signup() {
 const [form, setForm] = useState({
   username: "",
   password: "",
   passwordConfirm: "",
   type: "",
 });
 const navigate = useNavigate();
  // These methods will update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }
  // This function will handle the submission.
  async function onSubmit(e) {
    e.preventDefault();

    if (form.password.length < 2) {
      window.alert("Password must be at least two characters long");
      return;
    }

    if (form.type == "") {
      window.alert("You must select a user type");
      return;
    }
 
    // Check if passwords match
    if (form.password !== form.passwordConfirm) {
      window.alert("Passwords do not match");
      return;
    }
 
    const newUser = {
      username: form.username,
      password: form.password,
      type: form.type
    };
 
    try {
      // Signup the user
      const response = await fetch("http://localhost:5000/signup", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });
 
      if (response.ok) {
        
          // Login successful, redirect to homepage
          navigate("/");
        
      } else {
        console.log("Failed to signup");
      }
    } catch (error) {
      window.alert("An error occurred");
      console.log("Error:", error);
    }
 
  }
   
 
  // This following section will display the form that takes the input from the user.
 return (
   <div>
     <h3>Sign up here</h3>
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
         <label htmlFor="passwordConfirm">Confirm Password</label>
         <input
           type="password"
           className="form-control"
           id="passwordConfirm"
           value={form.passwordConfirm}
           onChange={(e) => updateForm({ passwordConfirm: e.target.value })}
         />
       </div>
       <br/>
       <div className="form-group">
         <div className="form-check form-check-inline">
           <input
             className="form-check-input"
             type="radio"
             name="positionOptions"
             id="positionCustomer"
             value="Customer"
             checked={form.type === "Customer"}
             onChange={(e) => updateForm({ type: e.target.value })}
           />
           <label htmlFor="positionCustomer" className="form-check-label">Customer</label>
         </div>
         <div className="form-check form-check-inline">
           <input
             className="form-check-input"
             type="radio"
             name="positionOptions"
             id="positionEmployee"
             value="Employee"
             checked={form.type === "Employee"}
             onChange={(e) => updateForm({ type: e.target.value })}
           />
           <label htmlFor="positionEmployee" className="form-check-label">Employee</label>
         </div>
         <div className="form-check form-check-inline">
           <input
             className="form-check-input"
             type="radio"
             name="positionOptions"
             id="positionAdmin"
             value="Admin"
             checked={form.type === "Admin"}
             onChange={(e) => updateForm({ type: e.target.value })}
           />
           <label htmlFor="positionAdmin" className="form-check-label">Admin</label>
         </div>
       </div>
       <br/>
       <div className="form-group">
         <input
           type="submit"
           value="Sign Up"
           className="btn btn-primary"
         />
       </div>
     </form>
     <br/>
     <h5>Already have an account?</h5>
     <Link to="/login">Login</Link> 
   </div>
 );
}