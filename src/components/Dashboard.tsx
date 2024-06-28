import { useEffect, useState } from "react";
import User from "../services/user";

function Dashboard() {
  const [user, setUser] = useState<User>({} as User)

  useEffect(() => {
    const data = User.getProfile();
    data.then((u) => setUser(u));
  }, [])

  return (
    <div>Hello, {user.display_name}</div>
  );
}

export default Dashboard;