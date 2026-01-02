import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { login } from "../store/auth/authActions";

import "../App.css";
import CreatorHeader from "../components/CreatorHeader";
import Footer from "../components/Footer";
import creatorLoginImage from "../images/insulet2.png";

function OmnipodCreatorLogin() {
  const dispatch = useDispatch();

  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role] = useState("podder"); // ✅ role added

  const submitHandler = () => {
    dispatch(login(email, password, role)); // ✅ role passed
  };

  // ✅ Redirect after login
  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="insulet-login-page">
      <CreatorHeader />

      <main className="insulet-login creator__form">
        <div className="insulet-login__content">
          <div className="insulet-login__form">
            <h1>Insulet Member</h1>
            <h2>Log in</h2>

            {error && (
              <p style={{ color: "red", marginBottom: "10px" }}>
                {error}
              </p>
            )}

            <div className="insulet-field">
              <label>Email address</label>
              <input
                type="email"
                className="insulet-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="insulet-field">
              <label>Password</label>
              <input
                type="password"
                className="insulet-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* ✅ Hidden role field */}
            <input type="hidden" name="role" value={role} />

            <div className="insulet-field">
              <a className="insulet-forgot" href="#forgot">
                Forgot Password?
              </a>
            </div>

            <button
              className="insulet-login-btn"
              onClick={submitHandler}
              disabled={loading}
            >
              {loading ? "Logging in..." : "Log In"}
            </button>
          </div>

          <div className="insulet-login__graphic">
            <img src={creatorLoginImage} alt="Insulet maker of Omnipod" />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default OmnipodCreatorLogin;
