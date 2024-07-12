import Login from './pages/Login';
import Auth from './services/auth';
import "./styles/App.css";
import { useEffect } from 'react';
import Dashboard from './pages/Dashboard';
import { Route, Routes } from 'react-router-dom';
import Callback from './pages/Callback';
import { useToken } from './context/TokenProvider';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function App() {
  const {token, setToken} = useToken();

  useEffect(() => {
    const t = Auth.getToken();
    setToken(t);
  }, [token]);

  return (
    <>
      <div className='main'>
        <Routes>
          <Route path='/' element={ token ? <Dashboard /> : <Login /> } />
          <Route path="/callback" element={<Callback />} />
        </Routes>
      </div>
      <ToastContainer stacked={true} position="bottom-right" theme="dark" />
    </>
  );
}

export default App;
