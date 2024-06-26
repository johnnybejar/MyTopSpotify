import Header from './components/Header';
import Login from './components/Login';
import Auth from './services/auth';
import "./styles/App.css";
import { useEffect, useState } from 'react';
import Dashboard from './components/Dashboard';
import { Route, Routes } from 'react-router-dom';
import Callback from './components/Callback';
import { useToken } from './context/TokenProvider';

function App() {
  const {token, setToken} = useToken();

  useEffect(() => {
    const t = Auth.getToken();

    setToken(t);
  }, [token]);

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
