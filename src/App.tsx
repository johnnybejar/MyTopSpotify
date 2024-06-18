import Header from './components/Header';
import Login from './components/Login';
import "./styles/App.css";
import { useEffect, useState } from 'react';
import Dashboard from './components/Dashboard';

function App() {
  const [token, setToken] = useState<string>('');

  useEffect(() => {
    async function getToken() {
      const res = await fetch("/auth/token");
      console.log(res);
      const json = await res.json();
      setToken(json.access_token);
    }

    getToken();
    console.log(token);
  });

  return (
    <div className='main'>
      <Header />
      { token ? <Dashboard /> : <Login /> }
    </div>
  );
}

export default App;
