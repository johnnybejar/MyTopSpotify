import axios from "axios";

async function fetchClientId() {
    try {
        const response = await axios.get('/.netlify/functions/getSpotifyCredentials');
        if (response.status !== 200) {
            throw new Error("Failed to fetch credentials")
        }
        const data = response.data;
    
        return data.clientId;
        
    } catch (err) {
        console.log("Error fetching spotify credentials: ", err);
    }
}

export default fetchClientId;