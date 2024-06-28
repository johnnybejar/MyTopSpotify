import Auth from "../services/auth";
import spotify from "../public/spotify-logo-text.png";
import "../styles/Login.css";

function Login() {
  return (
    <div className="autheticate" onClick={() => Auth.createAuthorizationUri()}>
        Click here to connect your <img src={spotify} className='spotify-logo' alt="Spotify" /> account!
    </div>
  );
}

export default Login;