import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./LandingPage.css";
import { Link } from "react-router-dom";


function LandingPage() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
const [submitted, setSubmitted] = useState(false);

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!email.includes("@") || name.trim().length < 2) {
    alert("Please enter a valid name and email");
    return;
  }
  try {
    const response = await fetch("http://localhost:5000/emails", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email }),
    });
    if (!response.ok) {
        throw new Error("Failed to save");
      }

      setSubmitted(true);
    setName("");
    setEmail("");
  } catch (error) {
    console.error("Error saving:", error);
    alert("Something went wrong. Please try again.");
  }
};

  
  
    return (
    <div className="landing-container">
      <header className="landing-header">
        <h1>Erranderx</h1>
        
      </header>

      <section className="hero">
        <h2>Affordable Errand & Delivery Help</h2>
        <p>Let everyday people in your city run errands or deliver for you.</p>
        <button onClick={() => navigate("/dashboard")}>Get Started</button>
      </section>
      <section className="how-it-works">
  <h3>How It Works</h3>
  <div className="steps">
    <div className="step">
      <h4>1. Post a Task</h4>
      <p>Need a delivery or errand done? Post your task in seconds.</p>
    </div>
    <div className="step">
      <h4>2. Get Matched</h4>
      <p>Nearby riders or erranders will pick it up and get moving.</p>
    </div>
    <div className="step">
      <h4>3. Track & Complete</h4>
      <p>Track progress and confirm when your task is complete.</p>
    </div>
  </div>
</section>
<section className="for-riders">
  <h3>Earn as a Rider or Errander</h3>
  <p>Sign up to start earning money doing simple tasks in your area — no car or bike needed.</p>
  <button onClick={() => navigate("/signup")}>Join as Rider</button>
</section>

<section style={{ padding: "3rem 2rem", textAlign: "center", background: "#f8f8f8" }}>
  <h3>Get early access to Erranderx</h3>
  <p>Join our launch list. Be the first to know when we go live!</p>
  {!submitted ? (
    <form onSubmit={handleSubmit} style={{ marginTop: "1rem" }}>
<input
    type="text"
    placeholder="Your full name"
    value={name}
    onChange={(e) => setName(e.target.value)}
    style={{
      padding: "0.75rem",
      width: "250px",
      border: "1px solid #ccc",
      borderRadius: "6px",
      marginRight: "1rem",
      marginBottom: "1rem",
    }}
    required
  />
  <br />
      <input
        type="email"
        placeholder="Your email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{
          padding: "0.75rem",
          width: "250px",
          border: "1px solid #ccc",
          borderRadius: "6px",
          marginRight: "1rem",
        }}
        required
      />
      <button
        type="submit"
        style={{
          padding: "0.75rem 1.25rem",
          background: "#2a9d8f",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        Notify Me
      </button>
    </form>
  ) : (
    <p style={{ color: "green", marginTop: "1rem" }}>Thanks! We'll keep you posted.</p>
  )}
</section>

<footer className="landing-footer">
  <p>&copy; {new Date().getFullYear()} Errander. All rights reserved.</p>
</footer>
    </div>
  );
}

export default LandingPage;