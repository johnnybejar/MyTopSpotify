import { useEffect, useState } from "react";
import User from "../services/user";
import Track from "../components/Track";

function Dashboard() {
  const [user, setUser] = useState<User>({} as User)
  const [topArtists, setTopArtists] = useState<UserTopArtists>({} as UserTopArtists);
  const [topTracks, setTopTracks] = useState<UserTopTracks>({} as UserTopTracks);
  const [isLoading, setIsLoading] = useState(true);

  async function getDashboard() {
    const userPromise = User.getProfile();
    userPromise.then((u) => {
      if (u) {
        setUser(u)
      }
    });

    const topArtistsPromise = User.getUserTopItems("artists", "long_term");
    topArtistsPromise.then((res) => {
      if (res) {
        setTopArtists(res);
      }
    })

    const topTracksPromise = User.getUserTopItems("tracks", "long_term");
    topTracksPromise.then((res) => {
      if (res) {
        setTopTracks(res);
      }

      setIsLoading(false);
    })
  }

  useEffect(() => {
    getDashboard();
    console.log(topTracks)
    console.log("render");
  }, [])

  if (isLoading) {
    return <>Loading...</>;
  }

  return (
    <>
      <div>Hello, {user.display_name}</div>
      {/* {topTracks.items.map((track) => {
        return <Track key={track.id} {...track} />
      })} */}
      <Track key={topTracks.items[0].id} {...topTracks.items[0]} />
    </>
  );
}

export default Dashboard;