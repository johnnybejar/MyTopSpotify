import { useEffect, useState } from "react";
import { redirect, useNavigate } from "react-router-dom";
import Auth from "../services/auth";
import { useToken } from "../context/TokenProvider";
import { toast } from "react-toastify";

function Callback() {
    const [msg, setMsg] = useState("")
    const { setToken } = useToken();
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code')!;
    const state = urlParams.get('state')!;
    const navigate = useNavigate();

    useEffect(() => {
        if (urlParams.get('error')) {
            setMsg(`An error occurred: ${urlParams.get('error')}`)
            return;
        }

        Auth.generateToken(state, code).then((tokenData: Record<string, string>) => {
            try {
                Auth.saveToken(tokenData);
                setToken(tokenData.access_token);
                navigate("/");
            } catch {
                setTimeout(() => {
                    toast.error("Error retrieving access token");
                    navigate("/");
                }, 2000);
            }
        })
    }, [])

    return (
        <div className="callback-error">{msg}</div>
    );
}

export default Callback;