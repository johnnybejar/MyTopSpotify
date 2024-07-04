import "../styles/Track.css"

type TrackProps = {
  track: Track;
  rank: number;
  playing: number;
  setPlaying: React.Dispatch<React.SetStateAction<number>>;
  audio: HTMLAudioElement;
}

function Track(props: TrackProps) {
  const { track, rank, playing, setPlaying, audio } = props;

  return (
    <div className='track'>
        <span className="track-rank">{rank}</span>
        <a href={track.album.external_urls.spotify} className="track-image-href" target="_blank">
          <img src={track.album.images[1].url} alt="" className="track-image" />
        </a>
        <div className="track-details">
          <a className="track-name" href={track.external_urls.spotify} target="_blank">
            {track.name}
          </a>
          <a href={track.artists[0].external_urls.spotify} className="track-artist" target="_blank">{track.artists[0].name}</a>
        </div>
        <svg className="track-button" viewBox="0 0 60 60" onClick={() => {
          if (playing === rank-1) {
            setPlaying(-1);
            audio.pause();
          } else {
            setPlaying(rank-1);
            audio.src = track.preview_url;
            audio.play();
          }
        }}>
          {playing === rank-1 ? (
            <>
              <polygon points="0,0 15,0 15,60 0,60" fill="#ffffffe6" />
              <polygon points="25,0 40,0 40,60 25,60" fill="#ffffffe6" />
            </>
            ) : 
            <polygon points="0,0 50,30 0,60" fill="#ffffffe6" fillOpacity={.9} />
          }
          {/* <audio id={"track-preview-" + rank} src={track.preview_url} preload="none"></audio> */}
        </svg>
    </div>
  );
}

export default Track;