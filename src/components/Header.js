import '../App.css';
import { Link } from 'react-router-dom';
import siteLogo from '../images/site-logo.png';

function Header() {
  return (
    <>
      <div className="hero__logo">
        <img src={siteLogo} alt="Omnipod logo" className="hero__logo-img" />
      </div>

      <div className="hero__actions">
        <Link className="action-btn" to="/insulet-member-login">
          Insulet Log In
        </Link>
        <Link className="action-btn" to="/omnipod-creator-login">
          Creator Log In
        </Link>
        <Link className="action-btn action-btn--primary" to="/omnipod-creator-signup">
          Sign up
        </Link>
        
      </div>
    </>
  );
}

export default Header;
