import spotify from "../public/spotify-logo-text.png";
import "../styles/Login.css";

function Login() {
  return (
    <a className="autheticate" href="/auth/login">
        Click here to connect your <img src={spotify} className='spotify-logo' alt="Spotify" /> account!
    </a>
  );
}

export default Login;