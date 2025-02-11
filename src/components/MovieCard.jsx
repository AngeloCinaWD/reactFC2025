// destrutturo anche l'oggetto movie per ottenere le proprietà che utilizzo nella card
// destrutturazione annidata: movie è un oggetto che ha più proprietà al suo interno, creiamo delle variabili con lo stesso nome delle proprietà nell'oggetto movie che ci interessano. La variabile movie non viene generata, ma solo variabili relative alle proprietà in esso contenute
// questo vuol dire che se avessi destrutturato l'oggetto props come {movie} per ottenre il title avrei dovuto fare movie.title, invece in questo modo mi basta richiamare title
const MovieCard = ({
  movie: { title, poster_path, release_date, vote_average, original_language },
}) => {
  return (
    <div className="movie-card">
      <img
        src={
          poster_path
            ? `https://image.tmdb.org/t/p/w500/${poster_path}`
            : 'no-movie.png'
        }
        alt={title}
      />

      <div className="mt-4">
        <h3>{title}</h3>
        <div className="content">
          <div className="rating">
            <img src="star.svg" alt="Star Icon" />
            <p>{vote_average ? vote_average.toFixed(1) : 'N/A'}</p>
          </div>

          <span>•</span>
          <p className="lang">{original_language}</p>

          <span>•</span>
          <p className="year">
            {release_date ? release_date.split('-')[0] : 'N/A'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
