import Header from './components/Header';
import spotify from "./public/spotify-logo-text.png";
import "./styles/App.css";

function App() {
  return (
    <div className='main'>
      <Header />
      <div className="autheticate" >
        Click here to connect your <img src={spotify} className='spotify-logo' alt="Spotify" /> account!
      </div>
    </div>
  );
}

export default App;
