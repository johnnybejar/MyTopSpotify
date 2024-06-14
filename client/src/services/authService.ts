const authQueryFn = async ({ queryKey }) => {
    const data = fetch(`https://accounts.spotify.com/api/token`, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": "Bearer " + queryKey[0]
            },
            body: {
                "grant_type": "",
                "client_id": "",
                "client_secret": "",
            }
        }
    );
};

const auth = {
    authQueryFn,
};

export default auth;