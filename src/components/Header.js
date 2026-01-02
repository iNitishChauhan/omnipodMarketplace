import '../App.css';
import { Link, useNavigate } from 'react-router-dom';
import siteLogo from '../images/site-logo.png';
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/auth/authActions";

function Header() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const logoutHandler = () => {
    dispatch(logout());
    navigate("omnipod-creator-login"); 
  };

  return (
    <>
      <div className="hero__logo">
        <img src={siteLogo} alt="Omnipod logo" className="hero__logo-img" />
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
              {user?.name || "User"}
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
    </>
  );
}

export default Header;
