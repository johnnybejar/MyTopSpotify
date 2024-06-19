import Header from './components/Header';
import Login from './components/Login';
import Auth from './services/auth';
import "./styles/App.css";
import { useEffect, useState } from 'react';
import Dashboard from './components/Dashboard';

function App() {
  const [token, setToken] = useState<string>('');

  useEffect(() => {
    const t = Auth.getToken();

    setToken(t);
    
  }, []);

  return (
    <div className='main'>
      <Header />
      { token ? <Dashboard /> : <Login /> }
    </div>
  );
}

export default App;
