import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  };

  return (
    <header className="header">
   
        <div className="header1"> 
          <Link to="/">
          <h1 className="title">yourfitnesspal</h1>
        </Link>
        </div>
 
     
       
        <div className="header2">  
          {user && (
            <div className="top-right">
              <span className="heading-box">Hello, {user.email.split('@')[0]}</span>
              <button className="btn" onClick={handleClick}>Log out</button>
            </div>
          )}
          {!user && (
            <div>
              <Link  to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </div>
          )}
        
        </div>
      
     
    </header>
  );
};

export default Navbar;
