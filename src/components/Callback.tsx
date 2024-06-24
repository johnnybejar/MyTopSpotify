import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Auth from "../services/auth";

function Callback() {
    const [msg, setMsg] = useState("")
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
            if (tokenData.error) {
                setMsg("Error retrieving access token")
            } else {
                Auth.saveToken(tokenData);
                console.log(tokenData)
                navigate("/")
            }
        })
    }, [])

    return (
        <div className="callback-error">{msg}</div>
    );
}

export default Callback;