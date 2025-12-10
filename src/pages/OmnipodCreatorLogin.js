import '../App.css';
import CreatorHeader from '../components/CreatorHeader';
import Footer from '../components/Footer';
import creatorLoginImage from '../images/insulet2.png';

function OmnipodCreatorLogin() {
  return (
    <div className="insulet-login-page">
      <CreatorHeader />

      <main className="insulet-login creator__form">
        <div className="insulet-login__content">
          <div className="insulet-login__form">
            <h1>Insulet Member</h1>
            <h2>Log in</h2>

            <div className="insulet-field">
              <label htmlFor="insulet-email">Email address</label>
              <input id="insulet-email" type="email" className="insulet-input" />
            </div>

            <div className="insulet-field">
              <label htmlFor="insulet-password">Password</label>
              <input id="insulet-password" type="password" className="insulet-input" />
            </div>
            <div className="insulet-field"><a className="insulet-forgot" href="#forgot">Forgot Password?</a>
            </div>
            <button className="insulet-login-btn" type="button">Log In</button>
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
