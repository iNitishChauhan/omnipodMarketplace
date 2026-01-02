import '../App.css';
import { Link } from 'react-router-dom';
import siteLogo from '../images/site-logo.png';

function SignupHeader() {
  return (
    <>
      <div className="hero__logo">
        <Link to="/">
            <img src={siteLogo} alt="Omnipod logo" className="insulet-header__logo" />
          </Link>
      </div>

      <div className="hero__actions">
        <Link className="action-btn" to="/omnipod-creator-login">
          Log In
        </Link>
        <button className="action-btn action-btn--primary">Get Started</button>
      </div>
    </>
  );
}

export default SignupHeader;
