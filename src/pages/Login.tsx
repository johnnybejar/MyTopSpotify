import Auth from "../services/auth";
import spotify from "../public/spotify-logo-text.png";
import "../styles/Login.css";

function Login() {
  return (
    <div className="login">
      <div className="autheticate" onClick={() => Auth.createAuthorizationUri()}>
        Click here to connect your <img src={spotify} className='spotify-logo' alt="Spotify" /> account!
      </div>
      <div className="website-info">
        This website lets you check your top artists and top tracks from the last 4 weeks, 6 months, and 1 year!
      </div>
    </div>
  );
}

export default Login;