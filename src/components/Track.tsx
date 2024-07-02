import "../styles/Track.css"

type TrackProps = {
  track: Track;
  rank: number;
}

function Track(props: TrackProps) {
  const { track, rank } = props;

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
    </div>
  );
}

export default Track;