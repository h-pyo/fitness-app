import { Link } from "react-router-dom";
import { useUserLogout } from "../hooks/useUserLogout";
import { useUserAuthContext } from "../hooks/useUserAuthContext";


const Navbar = () => {
  const { logout } = useUserLogout();
  const { user } = useUserAuthContext();
  const handleClick = () => {
    logout();
  };

  return (
    <header>
      <div className="navbar">
        <div className="page-title"> 
          <Link to="/">
            <h1>Fitness Tracker</h1>
          </Link>
        </div>

        <nav>
          {user && (

            <div className="signed-in-section">
              <Link to="/journal">Health Journal</Link>
              <div className="user-email">{user.email}</div>
              <button className="logout-button" onClick={handleClick}>Log Out</button>
            </div>
          )}
          {!user && (
            <div className="signup-login">
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </div>
          )}

        </nav>
      </div>
    </header>
  )
}

export default Navbar