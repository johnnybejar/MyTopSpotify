import axios from "axios";

async function getProfile() {
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

const User = {
    getProfile
};

export default User;