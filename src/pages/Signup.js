import React, { useState } from "react";
import "./Signup.css";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    transport: ""
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
        const response = await fetch("http://localhost:5000/riders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData)
        });
  
        if (response.ok) {
          alert("Signup successful!");
          // Optional: clear form
          setFormData({ name: "", email: "", phone: "", city: "", transport: "" });
        } else {
          alert("Failed to submit. Try again.");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Something went wrong.");
      }
    };

  return (
    <div className="signup-container">
      <h2>🚴 Join Erranderx as a Rider</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        <input type="text" name="name" placeholder="Full Name" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email Address" onChange={handleChange} required />
        <input type="tel" name="phone" placeholder="Phone Number" onChange={handleChange} required />
        <input type="text" name="city" placeholder="City" onChange={handleChange} required />
        
        <select name="transport" onChange={handleChange} required>
          <option value="">Select Transport Type</option>
          <option value="Walking">Walking</option>
          <option value="Bike">Bike</option>
          <option value="Keke">Keke (Tricycle)</option>
          <option value="Public Bus">Public Bus</option>
        </select>

        <button type="submit">Submit Application</button>
      </form>
    </div>
  );
}

export default Signup;
