import "../styles/Header.css";
import logout from "../public/logout.png";


function Header() {
  const logOut = () => {
    localStorage.clear();
    // TODO: Reload the component properly
    window.location.reload();
  }

  return (
    <div className="header">
        <a className="title" href="/">Spotify Visualizer</a>
        <img src={logout} className="logout" onClick={logOut} alt="Logout" />
    </div>
  );
}

export default Header;
