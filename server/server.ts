import express from "express";
import dotenv from "dotenv";

const port = 5000;

dotenv.config();

const CLIENT_ID = process.env.VITE_CLIENT_ID;
const CLIENT_SECRET = process.env.VITE_CLIENT_SECRET;

var spotifyRedirectUri = 'http://localhost:5173/auth/callback'

function generateRandomString(length: number) {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

const app = express();

app.get('/auth/login', (req, res) => {
    const scope = "streaming user-read-email user-read-private";
    const state = generateRandomString(16);

    const authQueryParameters = new URLSearchParams({
        response_type: "code",
        client_id: CLIENT_ID,
        scope,
        redirect_url: spotifyRedirectUri,
        state,
    } as Record<string, string>);

    res.redirect('https://accounts.spotify.com/authorize/?', + authQueryParameters.toString())
})