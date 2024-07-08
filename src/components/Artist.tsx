type ArtistProps = {
  artist: Artist;
  rank: number;
}

function Artist(props: ArtistProps) {
  const { artist, rank } = props;

  return (
    <div className='track'>
        <span className="track-rank">{rank}</span>
        <a href={artist.external_urls.spotify} className="track-image-href" target="_blank">
          <img src={artist.images[0].url} alt="" className="track-image" />
        </a>
        <div className="track-details">
          <a className="track-name" href={artist.external_urls.spotify} title={artist.name} target="_blank">
            {artist.name}
          </a>
        </div>
    </div>
  )
}

export default Artist