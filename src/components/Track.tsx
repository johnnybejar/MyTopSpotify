import "../styles/Track.css"

type TrackProps = {
  track: Track;
  rank: number;
  active: boolean;
}

function Track(props: TrackProps) {
  const { track, rank, active } = props;

  return (
    <div className='track'>
        <span className="track-rank">{rank}</span>
        <a href={track.album.href} className="track-image-href" target="_blank">
          <img src={track.album.images[1].url} alt="" className="track-image" />
        </a>
        <div className="track-details">
          <a className="track-name" href={track.external_urls.spotify} target="_blank">
            {track.name}
          </a>
          <a href={track.artists[0].external_urls.spotify} className="track-artist">{track.artists[0].name}</a>
        </div>
        <svg className="track-button" viewBox="0 0 60 60">
          {active ? (
            <>
              <polygon points="0,0 15,0 15,60 0,60" />
              <polygon points="25,0 40,0 40,60 25,60" />
            </>
            ) : 
            <polygon points="0,0 50,30 0,60" fill="white" fillOpacity={.9} />
          }
        </svg>
    </div>
  );
}

export default Track;