import axios from "axios";

const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
const redirectUri = "http://localhost:5173/callback";

function generateRandomString(length: number) {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
}

async function generateCodeChallenge(plainData: string) {
    const encoder = new TextEncoder();
    const data = encoder.encode(plainData);
    const digest = await window.crypto.subtle.digest("SHA-256", data);

    return btoa(String.fromCharCode(...new Uint8Array(digest)))
        .replace(/=/g, '')
        .replace(/\+/g, '-') 
        .replace(/\//g, '_');
}

async function createAuthorizationUri() {
    const codeVerifier  = generateRandomString(64);
    const codeChallenge =  await generateCodeChallenge(codeVerifier);
    const state = generateRandomString(36);

    localStorage.setItem("CodeVerifier", codeVerifier);
    localStorage.setItem("State", state);

    const scope = "user-read-private user-read-playback-state user-top-read";
    const authUrl = new URL("https://accounts.spotify.com/authorize");

    const params = {
        response_type: "code",
        client_id: CLIENT_ID,
        scope,
        code_challenge_method: "S256",
        code_challenge: codeChallenge,
        redirect_uri: redirectUri,
        state
    } as Record<string, string>;

    authUrl.search = new URLSearchParams(params).toString();
    window.location.href = authUrl.toString(); 
}

async function generateToken(state: string, code: string) {
    const savedState = localStorage.getItem("State");
    const codeVerifier = localStorage.getItem("CodeVerifier");
    localStorage.removeItem("State");

    if (state !== savedState) {
        return null;
    }

    const parameters = new URLSearchParams({
        client_id: CLIENT_ID,
        grant_type: 'authorization_code',
        code,
        redirect_uri: redirectUri,
        code_verifier: codeVerifier
    } as Record<string, string>);

    const config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }

    const res = await axios.post(
        "https://accounts.spotify.com/api/token",
        parameters.toString(), config
    );

    return res.data;
}

async function refreshToken() {
    const refreshToken = localStorage.getItem("RefreshToken");

    const body = new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: refreshToken,
        client_id: CLIENT_ID
    } as Record<string, string>);

    const config = {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    }

    const res = await axios.post("https://accounts.spotify.com/api/token",
        body.toString(), config
    );

    return res.data;
}

function saveToken(tokenData: Record<string, string>) {
    const { access_token, refresh_token } = tokenData;

    localStorage.setItem("AccessToken", access_token);
    localStorage.setItem("RefreshToken", refresh_token);
}

function getToken() {
    const token = localStorage.getItem("AccessToken") || "";
    
    return token;
}

const Auth = {
    createAuthorizationUri,
    generateToken,
    refreshToken,
    saveToken,
    getToken
};

export default Auth;