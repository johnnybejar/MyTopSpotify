import axios from "axios";

async function getProfile(): Promise<User | null> {
    let accessToken = localStorage.getItem("AccessToken");

    if (accessToken) {
        const res = await axios.get("https://api.spotify.com/v1/me", {
            headers: {
                Authorization: "Bearer " + accessToken
            }
        })

        return res.data;
    } else {
        return null;
    }
}

async function getUserTopItems(type: string, timeRange: string) {
    let accessToken = localStorage.getItem("AccessToken");

    if (accessToken) {
        const res = await axios.get("https://api.spotify.com/v1/me/top/" + type + "?time_range=" + timeRange + "&limit=50", {
            headers: {
                Authorization: "Bearer " + accessToken
            }
        })

        return res.data
    } else {
        return null;
    }
}

async function getUserPlaybackState() {
    let accessToken = localStorage.getItem("AccessToken");

    if (accessToken) {
        const res = await axios.get("https://api.spotify.com/v1/me/player", {
            headers: {
                Authorization: "Bearer " + accessToken
            }
        });

        return res.data as Playback;
    } else {
        return null;
    }
}

const User = {
    getProfile,
    getUserTopItems,
    getUserPlaybackState
};

export default User;