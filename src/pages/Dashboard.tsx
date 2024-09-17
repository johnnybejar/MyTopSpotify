import { useEffect, useState } from "react";
import User from "../services/user";
import { toast } from "react-toastify";
import { BounceLoader } from "react-spinners";
import { useToken } from "../context/TokenProvider";
import Auth from "../services/auth";
import TopTracks from "../components/TopTracks";
import TopArtists from "../components/TopArtists";
import Playback from "../components/Playback";
import logout from "../public/logout.png";
import "../styles/Dashboard.css";

function Dashboard() {
  const [user, setUser] = useState<User>({} as User)
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { token, setToken } = useToken();
   
  async function getDashboard() {
    const userPromise = User.getProfile();

    userPromise.then((results) => {
      if (results) {
        setUser(results);
      }
    }).catch((err) => {
      if (err && err.response.status === 401) {
        toast("Expired/Revoked token, re-authenticating...");
        const res = Auth.refreshToken();
        res.then((data) => {
          setToken(data.access_token);
          Auth.saveToken(data);
        })
      } else if (err && err.response.status === 403) {
        toast.error("Not authorized, you may not be whitelisted...", {
          autoClose: 10000,
        });
        localStorage.clear();
        setToken("");
      }
      else {
        setError("Could not fetch user data")
        toast.error("An error occurred...");
      }
    }).finally(() => setIsLoading(false));
  }

  const logOut = () => {
    localStorage.clear();
    setToken("");
  }

  useEffect(() => {
    getDashboard();
  }, [token]);

  if (isLoading || Object.keys(user).length === 0) {
    return <BounceLoader color="white" />;
  }

  if (error) {
    return <span className="error">Cannot display dashboard due to an error: {error}</span>
  }

  return (
    <div className="dashboard">
      <div className="db-header">
        <a href={user.external_urls.spotify} target="_blank">
          <img src={user.images[0].url} className="db-img"  alt="User" />
        </a>
        <span className="db-greet">Hello, {user.display_name}</span>
      </div>
      <Playback />
      <div className="top-items">
        <TopTracks />
        <TopArtists />
      </div>
      { localStorage.getItem("AccessToken") ? <img src={logout} className="logout" onClick={logOut} alt="Logout" /> : <></>}
    </div>
  );
}

export default Dashboard;