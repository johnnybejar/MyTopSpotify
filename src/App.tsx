import Header from './components/Header';
import Login from './components/Login';
import Auth from './services/auth';
import "./styles/App.css";
import { useEffect, useState } from 'react';
import Dashboard from './components/Dashboard';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Callback from './components/Callback';

function App() {
  const [token, setToken] = useState<string>('');

  useEffect(() => {
    const t = Auth.getToken();

    setToken(t);
    
  }, []);

  return (
    <div className='main'>
        <Header />
        <Routes>
          <Route path='/' element={ token ? <Dashboard /> : <Login /> } />
          <Route path="/callback" element={<Callback />} />
        </Routes>
    </div>
  );
}

export default App;
