import '../App.css';
import siteLogo from '../images/site-logo.png';

function Header() {
  return (
    <>
      <div className="hero__logo">
        <img src={siteLogo} alt="Omnipod logo" className="hero__logo-img" />
      </div>

      <div className="hero__actions">
        <button className="action-btn">Insulet Log In</button>
        <button className="action-btn">Creator Log In</button>
        <button className="action-btn action-btn--primary">Sign up</button>
      </div>
    </>
  );
}

export default Header;
