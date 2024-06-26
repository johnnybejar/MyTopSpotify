import "../styles/Header.css";
import logout from "../public/logout.png";
import { useEffect } from "react";
import { useToken } from "../context/TokenProvider";

function Header() {
  const { token, setToken } = useToken();

  useEffect(() => {}, [token])

  const logOut = () => {
    localStorage.clear();
    setToken("");
  }

  return (
    <div className="header">
        <a className="title" href="/">Spotify Visualizer</a>
        { localStorage.getItem("AccessToken") ? <img src={logout} className="logout" onClick={logOut} alt="Logout" /> : <></>}
    </div>
  );
}

export default Header;
