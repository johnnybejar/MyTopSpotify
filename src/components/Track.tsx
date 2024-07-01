import "../styles/Track.css"

type TrackProps = {
  track: Track;
  rank: number;
}

function Track(props: TrackProps) {
  const { track, rank } = props;

  return (
    <div className='track'>
        {rank} {track.name} - {track.artists[0].name}
    </div>
  );
}

export default Track;