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
  const [topTracksMedium, setTopTracksMedium] = useState<UserTopTracks>({} as UserTopTracks);
  const [topTracksLong, setTopTracksLong] = useState<UserTopTracks>({} as UserTopTracks);
  const [active, setActive] = useState("short_term");
  // -1 is the default value for playing, meaning no track is playing
  const [playing, setPlaying] = useState(-1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const { token, setToken } = useToken();
  const [audio] = useState(new Audio());

  async function getTracks() {
    const topTracksPromise = User.getUserTopItems("tracks", active);

    topTracksPromise.then((res) => {
      if (res) {
        if (active === "short_term") {
          setTopTracksShort(res);
        } else if (active === "medium_term") {
          setTopTracksMedium(res);
        } else {
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
      (active === "medium_term" && Object.keys(topTracksMedium).length === 0) ||
      (active === "long_term" && Object.keys(topTracksLong).length === 0)
    ) {
      getTracks();
    }
    audio.preload = "none";
    audio.volume = 0.05;

    // Needed to pause the audio and reset playing when switching time ranges
    audio.pause();
    setPlaying(-1);

    console.log("TopTracks render");
  }, [active, token])

  if (error) {
    return <span>Cannot display dashboard due to an error, try again later</span>
  }

  return (
    <div className="top-tracks">
      <div className="tracks-header">
        <span className="tracks-title">Top Tracks</span>
        <div className="tracks-range-container">
          <div className="top-tooltip">
            <span className="top-tooltip-text">Long: 1 year, Medium: 6 months, Short: 4 weeks</span>
            <svg className="top-tooltip-icon" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="22px" width="22px" xmlns="http://www.w3.org/2000/svg">
              <path fill="none" stroke-width="2" d="M16.5,18 L12,22.5 L7.5,18 L1,18 L1,1 L23,1 L23,18 L16.5,18 Z M6,10 L7,10 L7,9 L6,9 L6,10 Z M11.5,10 L12.5,10 L12.5,9 L11.5,9 L11.5,10 Z M17,10 L18,10 L18,9 L17,9 L17,10 Z" />
            </svg>
          </div>
          <ul className="tracks-time-range">
            <li
              className={active === "long_term" ? "track-time-active" : "track-time-inactive"}
              onClick={() => {
                if (isLoading) {
                  return;
                }

                if (active !== "long_term") {
                  if (Object.keys(topTracksLong).length === 0) {
                    setIsLoading(true);
                  }
                  
                  setActive("long_term");
                }
              }}
              value="long_term"
            >
              Long
            </li>
            <li
              className={active === "medium_term" ? "track-time-active" : "track-time-inactive"}
              onClick={() => {
                if (isLoading) {
                  return;
                }
                
                if (active !== "medium_term") {
                  if (Object.keys(topTracksMedium).length === 0) {
                    setIsLoading(true);
                  }
                  
                  setActive("medium_term");
                }
              }}
              value="medium_term"
            >
              Medium
            </li>
            <li 
              className={active === "short_term" ? "track-time-active" : "track-time-inactive"}
              onClick={() => {
                if (active !== "short_term") {
                  setActive("short_term");
                }
              }}
              value="short-term" >
              Short
            </li>
          </ul>
        </div>
      </div>
        { isLoading ? 
          <BounceLoader color="white" /> : 
          <div className="track-list">
            {active === "short_term" ? topTracksShort.items.map((track, index) => {
              const props = {
                track,
                rank: index+1,
                playing,
                setPlaying,
                audio
              }
              return <Track key={track.id} {...props} />
            }) : active === "medium_term" ? topTracksMedium.items.map((track, index) => {
              const props = {
                track,
                rank: index+1,
                playing,
                setPlaying,
                audio
              }
              return <Track key={track.id} {...props} />
            }) : topTracksLong.items.map((track, index) => {
              const props = {
                track,
                rank: index+1,
                playing,
                setPlaying,
                audio
              }
              return <Track key={track.id} {...props} />
            })}
          </div>
        }
    </div>
  )
}

export default TopTracks