import Header from './components/Header';
import Login from './pages/Login';
import Auth from './services/auth';
import "./styles/App.css";
import { useEffect } from 'react';
import Dashboard from './pages/Dashboard';
import { Route, Routes } from 'react-router-dom';
import Callback from './pages/Callback';
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
