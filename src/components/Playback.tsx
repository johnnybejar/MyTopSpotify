import { useState, useEffect } from "react";
import User from "../services/user";
import { BounceLoader } from "react-spinners";
import { useToken } from "../context/TokenProvider";
import { toast } from "react-toastify";
import Auth from "../services/auth";
import "../styles/Playback.css";

function Playback() {
    const [playback, setPlayback] = useState<Playback>({} as Playback);
    const [isLoading, setIsLoading] = useState(true);
    const { token, setToken } = useToken();
    const [error, setError] = useState(false);

    async function getPlaybackState() {
        try {
            const playbackResults = await User.getUserPlaybackState();

            if (playbackResults) {
                setPlayback(playbackResults);
            } else if (playbackResults !== ""){
                setError(true);
            }
    
            setIsLoading(false);
        } catch (err: any) {
            // TODO: 'any' used here, try to find an alternative if possible
            setError(true)
            if (err && err.response.status === 401) {
                toast("Expired/Revoked token, re-authenticating...")
                const res = await Auth.refreshToken();
                setToken(res.access_token);
                Auth.saveToken(res);
                setError(false);  
            } else {
                toast.error("An error occurred...");
            }
        }
    }

    useEffect(() => {
        const interval = setInterval(() => getPlaybackState(), 5000);
        console.log("Playback Render");
        return () => { clearInterval(interval) };
    }, [token])

    if (isLoading) {
        return <BounceLoader color="white" />;
    }

    if (error) {
        return <span className="error">Cannot display playback state due to an error, try re-authenticating or try again later</span>
    }

    if (Object.keys(playback).length === 0) {
        return <div>Currently not listening to anything</div>
    }

    return (
        <div className="playback">
            <span className="playback-listening">Currently listenting to:</span>
            <div className="playback-track">
                <a href={playback.item?.album.external_urls.spotify} className="playback-image-link" target="_blank">
                    <img src={playback.item?.album.images[0].url} className="playback-image" alt="album-cover" />
                </a>
                <span className="playback-info">
                    <a href={playback.item?.external_urls.spotify} className="playback-info-name" target="_blank">
                        {playback.item?.name}
                    </a>
                    <a href={playback.item?.artists[0].external_urls.spotify} className="playback-info-artist" target="_blank">
                        {playback.item?.artists[0].name}
                    </a>
                </span>
            </div>
        </div> 
    );
}

export default Playback;