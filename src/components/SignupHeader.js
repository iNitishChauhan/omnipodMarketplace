import '../App.css';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import siteLogo from '../images/site-logo.png';
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/auth/authActions";

function SignupHeader() {
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
    <>
      <div className="hero__logo">
        <Link to="/">
            <img src={siteLogo} alt="Omnipod logo" className="insulet-header__logo" />
          </Link>
      </div>

      <div className="hero__actions">
        
         {!isAuthenticated && (
          <Link className="action-btn" to="/omnipod-creator-login">
          Log In
        </Link>
      )}
       {isAuthenticated && (
        <>
        <nav class="insulet-header__nav"><a class="insulet-header__link" href="#creators">{user?.name || "User"}</a></nav>
          <div className="header-right">
            <button onClick={logoutHandler} className="action-btn action-btn--primary" >
              Logout
            </button>
          </div>
          </>
        )}
        <button className="action-btn action-btn--primary">Get Started</button>
      </div>
    </>
  );
}

export default SignupHeader;
