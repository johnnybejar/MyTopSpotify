import { useEffect, useState } from "react";
import Track from "./Track";
import User from "../services/user";
import { BounceLoader } from "react-spinners";
import { toast } from "react-toastify";
import Auth from "../services/auth";
import { useToken } from "../context/TokenProvider";
import "../styles/TopTracks.css";

function TopTracks() {
  const [topTracksShort, setTopTracksShort] = useState<UserTopTracks>({} as UserTopTracks);
  const [topTracksLong, setTopTracksLong] = useState<UserTopTracks>({} as UserTopTracks);
  const [active, setActive] = useState("short_term");
  // -1 is the default value for playing, meaning no track is playing
  const [playing, setPlaying] = useState(-1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const { setToken } = useToken();
  
  async function getTracks() {
    const topTracksPromise = User.getUserTopItems("tracks", active);

    topTracksPromise.then((res) => {
      if (res) {
        if (active === "short_term") {
          setTopTracksShort(res);
        } else if (active === "long_term") {
          setTopTracksLong(res);
        }
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
    if (
      (active === "short_term" && Object.keys(topTracksShort).length === 0) ||
      (active === "long_term" && Object.keys(topTracksLong).length === 0)
    ) {
      getTracks();
    }
    setPlaying(-1);
    console.log("TopTracks render");
  }, [active])

  if (error) {
    return <span>Cannot display dashboard due to an error, try again later</span>
  }

  return (
    <div className="top-tracks">
      <div className="tracks-header">
        <span>Top Tracks</span>
        <ul className="tracks-time-range">
          <li
            className={active === "long_term" ? "track-time-active" : "track-time-inactive"}
            onClick={() => {
              if (active !== "long_term") {
                if (Object.keys(topTracksLong).length === 0) {
                  console.log('yoo')
                  setIsLoading(true);
                }
                
                setActive("long_term");
              }
            }}
            value="long_term"
          >
            Long-Term
          </li>
          <li 
            className={active === "short_term" ? "track-time-active" : "track-time-inactive"}
            onClick={() => {
              if (active !== "short_term") {
                setActive("short_term");
              }
            }}
            value="short-term" >
            Short-Term
          </li>
        </ul>
      </div>
        { isLoading ? 
          <BounceLoader color="white" /> : 
          <div className="track-list">
            {active === "short_term" ? topTracksShort.items.map((track, index) => {
              const props = {
                track,
                rank: index+1,
                playing,
                setPlaying
              }
              return <Track key={track.id} {...props} />
            }) : topTracksLong.items.map((track, index) => {
              const props = {
                track,
                rank: index+1,
                playing,
                setPlaying
              }
              return <Track key={track.id} {...props} />
            })}
          </div>
        }
    </div>
  )
}

export default TopTracks