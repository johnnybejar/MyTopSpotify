import { useEffect, useState } from "react";
import User from "../services/user";
import { toast } from "react-toastify";
import { BounceLoader } from "react-spinners";
import { useToken } from "../context/TokenProvider";
import Auth from "../services/auth";
import TopTracks from "../components/TopTracks";
import TopArtists from "../components/TopArtists";
import "../styles/Dashboard.css";
import Playback from "../components/Playback";

function Dashboard() {
  const [user, setUser] = useState<User>({} as User)
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { token, setToken } = useToken();
   
  async function getDashboard() {
    const userPromise = User.getProfile();

    Promise.all([userPromise]).then((results) => {
      // results = [user, topArtists, topTracks]
      if (results[0]) {
        setUser(results[0]);
      }
    }).catch((err) => {
      setError(true)
      if (err && err.response.status === 401) {
        toast("Expired/Revoked token, re-authenticating...")
        const res = Auth.refreshToken();
        res.then((data) => {
          setToken(data.access_token);
          Auth.saveToken(data);
          setError(false);
        })
      } else {
        toast.error("An error occurred...");
      }
    }).finally(() => setIsLoading(false));
  }

  useEffect(() => {
    getDashboard();
    console.log("Dashboard Render");
  }, [token]);

  if (isLoading) {
    return <BounceLoader color="white" />;
  }

  if (error || Object.keys(user).length === 0) {
    return <span className="error">Cannot display dashboard due to an error, try re-authenticating or try again later</span>
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
    </div>
  );
}

export default Dashboard;