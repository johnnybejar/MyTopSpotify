import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Auth from "../services/auth";

// http://localhost:5173/
// ?code=AQBCjUsu7YIpo99qbRNYMkzfhMZ_9sPaiOqjpjYeNRxG-oN7ORwYxEKxQ-mZWNW6AQD6yMh3kxUcNwb96xsCrNJ33EqOxt0uKSF031ybMujVei60MkZLkUiwqnBsfvwXRcQZXxVyE3K6YBsuUGG5FasqJbhR127r7dUkjDwpBiWf3RjtU00eAhI2WhFY0SCWLTkWFHStFAK6rERaXj_C9hdvpLwLyTgNP_eUwCcYsBi9AnS8UTSxn6gEJo2EviHb6UZ1YQnqtAwcmWdJOs9_uxDB8JImHPe8Ad_3raCeVFtfksq_X7fH1G3v53_GF-YH4AXHPqmlCcUAtts0xXrsMSjTXBEcVtGs_X_wZX11qME-HDpB

function getHashParams() {
    let hashParams = {};
    let e,
        r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.href.split("?")[1];
    while (e = r.exec(q)) {
        hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
}

function Callback() {
    const { err, code, state } = getHashParams();
    const history = useNavigate();

    useEffect(() => {
        let msg = "";

        if (err) {
            msg = "An error occurred during authentication";
        }

        const tokenPromise = Auth.generateToken(state, code);

        if (!tokenPromise) {
            msg = "An error occurred during authentication";
        } else {
            tokenPromise.then((res) => {
                if (res?.data.error) {
                    msg = "An error occurred retrieving token";
                } else {
                    Auth.saveToken(res!.data);
                }
            })
        }

    }, [])

    return (
        <div>Callback</div>
    );
}

export default Callback;