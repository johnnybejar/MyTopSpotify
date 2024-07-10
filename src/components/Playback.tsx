import { useState, useEffect } from "react";
import User from "../services/user";
import { BounceLoader } from "react-spinners";
import { useToken } from "../context/TokenProvider";

function Playback() {
    const [playback, setPlayback] = useState<Playback>({} as Playback);
    const [isLoading, setIsLoading] = useState(true);
    const { token, setToken } = useToken();
    const [error, setError] = useState(false);

    async function getPlaybackState() {
        const playbackResults = await User.getUserPlaybackState();
        console.log(playbackResults)
        if (playbackResults) {
            setPlayback(playbackResults);
            if (playback.currently_playing_type === "track") {
                playback.item = playback.item as Track;
            }
        } else if (playbackResults === ""){
            setError(true);
        } else {

        }

        setIsLoading(false);
    }

    useEffect(() => {
        const interval = setInterval(() => getPlaybackState(), 5000);
        console.log("Playback Render");
        return () => { clearInterval(interval) };
    }, [token])

    if (isLoading) {
        return <BounceLoader color="white" />;
    }

    if (error || Object.keys(playback).length === 0) {
        return <span className="error">Cannot display playback state due to an error, try re-authenticating or try again later</span>
    }

    return (
        <div>Currently listenting to: {playback.item?.name} by {playback.item?.artists[0].name}</div> 
    );
}

export default Playback;