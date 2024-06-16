import express from "express";
import dotenv from "dotenv";
import got from "got";

const port = 5000;

let access_token: string;

dotenv.config({ path: "../.env" });

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

app.get('/auth/login', (_, res) => {
    const scope = "streaming user-read-email user-read-private";
    const state = generateRandomString(16);

    const authQueryParameters = new URLSearchParams({
        response_type: "code",
        client_id: CLIENT_ID,
        scope,
        redirect_uri: spotifyRedirectUri,
        state,
    } as Record<string, string>);

    res.redirect('https://accounts.spotify.com/authorize/?' + authQueryParameters.toString())
})

app.get('/auth/callback', (req, res) => {

    const code = req.query.code;
  
    const authOptions = {
      form: {
        code: code,
        redirect_uri: spotifyRedirectUri,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64')),
        'Content-Type' : 'application/x-www-form-urlencoded'
      },
      json: true,
    };

    const postRes = got.post('https://accounts.spotify.com/api/token', authOptions);

    postRes.then(response => {
      if (response.statusCode === 200 && !response.errored) {
        access_token = response.body;
        res.redirect('/');
      }
    })
  })

app.get('/auth/token', (_, res) => {
    res.json({ access_token: access_token})
  })

app.listen(port, () => {
    console.log(`Listening at localhost:${port}`)
});