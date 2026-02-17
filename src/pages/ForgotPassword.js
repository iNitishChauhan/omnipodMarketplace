import { useState } from "react";
import axios from "axios";
import "../App.css";
import CreatorHeader from "../components/CreatorHeader";
import Footer from "../components/Footer";
import creatorLoginImage from "../images/insulet2.png";
function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const res = await axios.post(
        "https://omnipodmarketplace.minddigital.in/api/forgot-password",
        { email }
      );
      setMessage(res.data.message);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (

    <div className="insulet-login-page">
      <CreatorHeader />
      <form onSubmit={handleSubmit}>
        <main className="insulet-login creator__form">
          <div className="insulet-login__content">
            <div className="insulet-login__form">
              <h1>Insulet Member</h1>
              <h2>Forgot Password</h2>
              <div className="insulet-field">
                <label>Enter your email</label>
               
             <input className="insulet-input" 
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
             
              </div>

              

              <button type="submit" className="insulet-login-btn">Send Reset Link</button>

              {message && <p style={{ color: "green" }}>{message}</p>}
              {error && <p style={{ color: "red" }}>{error}</p>}
            </div>

            <div className="insulet-login__graphic">
              <img src={creatorLoginImage} alt="Insulet maker of Omnipod" />
            </div>
          </div>
        </main>
      </form>
      <Footer />
    </div>


    
  );
}

export default ForgotPassword;
