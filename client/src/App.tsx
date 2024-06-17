import Header from './components/Header';
import Login from './components/Login';
import "./styles/App.css";
import { useEffect, useState } from 'react';
import Dashboard from './components/Dashboard';

function App() {
  const [token, setToken] = useState<string>('');

  console.log(token);

  useEffect(() => {
    async function getToken() {
      const res = await fetch("http://localhost:5000/auth/token");
      const json = await res.json();
      setToken(json.access_token);
    }

    getToken();
  });

  return (
    <div className='main'>
      <Header />
      { token ? <Dashboard /> : <Login /> }
    </div>
  );
}

export default App;
