import '../App.css';
import { Link } from 'react-router-dom';
import siteLogo from '../images/site-logo.png';

function CreatorHeader() {
  return (
    <header className="insulet-header creator-header">
      <div className="insulet-header__inner">
        <div className="insulet-header__brand">
          <Link to="/">
            <img src={siteLogo} alt="Omnipod logo" className="insulet-header__logo" />
          </Link>
        </div>
        <nav className="insulet-header__nav">
          <a className="insulet-header__link" href="#creators">
            Creators
          </a>
        </nav>
      </div>
    </header>
  );
}

export default CreatorHeader;
