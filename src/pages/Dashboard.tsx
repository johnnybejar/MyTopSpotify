import { useEffect, useState } from "react";
import User from "../services/user";
import Track from "../components/Track";
import { toast } from "react-toastify";
import { BounceLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { useToken } from "../context/TokenProvider";
import "../styles/Dashboard.css";

function Dashboard() {
  const [user, setUser] = useState<User>({} as User)
  const [error, setError] = useState(false);
  const [topArtists, setTopArtists] = useState<UserTopArtists>({} as UserTopArtists);
  const [topTracks, setTopTracks] = useState<UserTopTracks>({} as UserTopTracks);
  const [isLoading, setIsLoading] = useState(true);
  const { token, setToken } = useToken();
  const navigate = useNavigate();

  async function getDashboard() {
    const userPromise = User.getProfile();
    const topArtistsPromise = User.getUserTopItems("artists", "long_term");
    const topTracksPromise = User.getUserTopItems("tracks", "long_term");

    Promise.all([userPromise, topArtistsPromise, topTracksPromise]).then((results) => {
      // results = [user, topArtists, topTracks]
      if (results[0] && results[1] && results[2]) {
        setUser(results[0]);
        setTopArtists(results[1]);
        setTopTracks(results[2]);
      }
    }).catch((err) => {
      setError(true)
      if (err && err.response.status === 401) {
        toast.error("Invalid token, try re-authenticating")
        localStorage.clear();
        setToken("");
      } else {
        toast.error("An error occurred...");
      }
    }).finally(() => setIsLoading(false));
  }

  useEffect(() => {
    getDashboard();
    console.log("Dashboard Render");
  }, []);

  if (isLoading) {
    return <BounceLoader color="white" />;
  }

  if (error) {
    return <span>Cannot display dashboard due to an error, try re-authenticating or try again later</span>
  }

  return (
    <div className="dashboard">
      <div className="db-header">
        <a href={user.external_urls.spotify} target="_blank">
          <img src={user.images[0].url} className="db-img"  alt="User" />
        </a>
        <span className="db-greet">Hello, {user.display_name}</span>
      </div>
      <div>
        <div>
          <span>Top Tracks</span>
        </div>
        <div className="track-list">
          {topTracks.items.map((track, index) => {
            const props = {
              track,
              rank: index+1
            }
            return <Track key={track.id} {...props} />
          })}
        </div>
      </div>
      {/* <Track key={topTracks.items[0].id} {...topTracks.items[0]} /> */}
    </div>
  );
}

export default Dashboard;