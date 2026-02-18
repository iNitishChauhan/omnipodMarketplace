import '../App.css';
import { Link, useNavigate } from 'react-router-dom';
import siteLogo from '../images/site-logo.png';
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/auth/authActions";

function CreatorHeader() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

const { isAuthenticated, user } = useSelector((state) => state.auth);
    /* if (!isAuthenticated) {
    return <Navigate to="/omnipod-creator-login" />;
    } */
  const logoutHandler = () => {
    dispatch(logout());
    navigate("/omnipod-creator-login"); 
  };
  return (
    <header className="insulet-header creator-header">
      <div className="insulet-header__inner">
        <div className="insulet-header__brand">
          <Link to="/">
            <img src={siteLogo} alt="Omnipod logo" className="insulet-header__logo" />
          </Link>
        </div>
        <div className="hero__actions">
        {!isAuthenticated && (<Link className="action-btn" to="/insulet-member-login">
          Insulet Log In
        </Link>)}
        {!isAuthenticated && (<Link className="action-btn" to="/omnipod-creator-login">
          Creator Log In
        </Link>)}

        {isAuthenticated && (
          <div className="header-right">
            <span className="user-name">
              <Link className="" to="/dashboard">
                {user?.name || "User"}
              </Link>
            </span>

            <button onClick={logoutHandler} className="action-btn action-btn--primary" >
              Logout
            </button>
          </div>
        )}
        {!isAuthenticated && (
          <Link className="action-btn action-btn--primary" to="/omnipod-creator-signup">
            Sign up
          </Link>
        )}

      </div>
      </div>
    </header>
  );
}

export default CreatorHeader;
