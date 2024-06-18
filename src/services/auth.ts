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

const codeVerifier  = generateRandomString(64);
const codeChallenge = generateCodeChallenge(codeVerifier).then(val => {return val});

const CLIENT_ID = import.meta.env.CLIENT_ID;
const redirectUri = "http://localhost:5173";

const scope = "user-read-private user-read-email user-read-currently-playing user-read-recently-played user-top-read playlist-read-collaborative";
const authUrl = new URL("https://accounts.spotify.com/authorize");

window.localStorage.setItem("code_verifier", codeVerifier);

if (!codeChallenge) {
    throw Error();
}

const params = {
    response_type: "code",
    client_id: CLIENT_ID,
    scope,
    code_challenge_method: "S256",
    code_challenge: codeChallenge,
    redirect_uri: redirectUri
};

authUrl.search = new URLSearchParams(params).toString();
window.location.href = authUrl.toString();