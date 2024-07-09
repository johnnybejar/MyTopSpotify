import { useEffect, useState } from "react";
import User from "../services/user";
import { useToken } from "../context/TokenProvider";
import { toast } from "react-toastify";
import Auth from "../services/auth";
import Artist from "./Artist";
import { BounceLoader } from "react-spinners";
import "../styles/TopTracks.css";

function TopArtists() {
  const [topArtistsShort, setTopArtistsShort] = useState<UserTopArtists>({} as UserTopArtists);
  const [topArtistsMedium, setTopArtistsMedium] = useState<UserTopArtists>({} as UserTopArtists);
  const [topArtistsLong, setTopArtistsLong] = useState<UserTopArtists>({} as UserTopArtists);
  const [active, setActive] = useState("short_term");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const { setToken } = useToken();
  
  async function getArtists() {
    const topArtistsPromise = User.getUserTopItems("artists", active);

    topArtistsPromise.then((res) => {
      if (res) {
        if (active === "short_term") {
          setTopArtistsShort(res);
        } else if (active === "medium_term") {
          setTopArtistsMedium(res);
        } else {
          setTopArtistsLong(res);
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
          window.location.reload();
        })
      } else {
        toast.error("An error occurred...");
      }
    }).finally(() => setIsLoading(false));
  }

  useEffect(() => {
    if (
      (active === "short_term" && Object.keys(topArtistsShort).length === 0) ||
      (active === "medium_term" && Object.keys(topArtistsMedium).length === 0) ||
      (active === "long_term" && Object.keys(topArtistsLong).length === 0)
    ) {
      getArtists();
    }

    console.log("TopArtists render");
  }, [active])

  if (error) {
    return <span>Cannot display dashboard due to an error, try again later</span>
  }

  return (
    <div className="top-tracks">
      <div className="tracks-header">
        <span className="tracks-title">Top Artists</span>
        <ul className="tracks-time-range">
          <li className="top-info">i
            <div className="top-info-tooltip">Long: 1 year, Medium: 6 months, Short: 4 weeks</div>
          </li>
          <li
            className={active === "long_term" ? "track-time-active" : "track-time-inactive"}
            onClick={() => {
              if (isLoading) {
                return;
              }

              if (active !== "long_term") {
                if (Object.keys(topArtistsLong).length === 0) {
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
                if (Object.keys(topArtistsMedium).length === 0) {
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
        { isLoading ? 
          <BounceLoader color="white" /> : 
          <div className="track-list">
            {active === "short_term" ? topArtistsShort.items.map((artist, index) => {
              const props = {
                artist,
                rank: index+1,
              }
              return <Artist key={artist.id} {...props} />
            }) : active === "medium_term" ? topArtistsMedium.items.map((artist, index) => {
              const props = {
                artist,
                rank: index+1,
              }
              return <Artist key={artist.id} {...props} />
            }) : topArtistsLong.items.map((artist, index) => {
              const props = {
                artist,
                rank: index+1,
              }
              return <Artist key={artist.id} {...props} />
            })}
          </div>
        }
    </div>
  )
}

export default TopArtists