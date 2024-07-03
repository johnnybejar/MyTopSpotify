import { useEffect, useState } from "react";
import Track from "./Track";
import User from "../services/user";
import { BounceLoader } from "react-spinners";
import { toast } from "react-toastify";
import Auth from "../services/auth";
import { useToken } from "../context/TokenProvider";
import "../styles/TopTracks.css";

function TopTracks() {
  const [topTracks, setTopTracks] = useState<UserTopTracks>({} as UserTopTracks);
  const [active, setActive] = useState("tracks-short-term");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const { setToken } = useToken();
  
  async function getTracks() {
    const topTracksPromise = User.getUserTopItems("tracks", "short_term");

    topTracksPromise.then((res) => {
      if (res) {
        setTopTracks(res);
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
    getTracks();
    console.log("TopTracks render");
  }, [])

  if (isLoading) {
    return <BounceLoader color="white" />;
  }

  if (error) {
    return <span>Cannot display dashboard due to an error, try re-authenticating or try again later</span>
  }

  return (
    <>
      <div className="tracks-header">
        <span>Top Tracks</span>
        <div className="tracks-time-range">
          <span className="tracks-long-term">
            Long-Term
          </span>
          <span className="tracks-short-term">
            Short-Term
          </span>
        </div>
      </div>
      <div className="track-list">
        {topTracks.items.map((track, index) => {
          const props = {
            track,
            rank: index+1,
            active: false
          }
          return <Track key={track.id} {...props} />
        })}
      </div>
    </>
  )
}

export default TopTracks