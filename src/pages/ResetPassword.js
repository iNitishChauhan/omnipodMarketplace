import { useState } from "react";
import axios from "axios";
import { useParams, useSearchParams } from "react-router-dom";
import "../App.css";
import CreatorHeader from "../components/CreatorHeader";
import Footer from "../components/Footer";
import creatorLoginImage from "../images/insulet2.png";
function ResetPassword() {
  //const [params] = useSearchParams();
   const { token } = useParams();
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://omnipodmarketplace.minddigital.in/api/reset-password",
        {
          token,
          email,
          password,
          password_confirmation: confirmPassword
        }
      );
      setMessage(res.data.message);
    } catch (err) {
      //console.log(err);
      setError("Invalid or expired token");
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
              <h2>Reset Password</h2>
              <div className="insulet-field">
                <label>New Password</label>
                <input type="password" className="insulet-input" placeholder="New Password" onChange={(e) => setPassword(e.target.value)} required />
              </div>

              <div className="insulet-field">
                <label>Password</label>
                <input type="password" className="insulet-input" placeholder="Confirm Password" onChange={(e) => setConfirmPassword(e.target.value)} required />
              </div>

              <button type="submit" className="insulet-login-btn">Reset Password</button>

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

export default ResetPassword;
