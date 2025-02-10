import { useEffect, useState } from 'react';
import Search from './components/search';
import Spinner from './components/Spinner';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // state per mostare un eventuale errore di fetching data
  const [errorMessage, setErrorMessage] = useState(null);

  // state per lista film, initial value empty array
  const [movieList, setMovielist] = useState([]);

  // state per lo spinner di loading data
  const [isLoading, setIsLoading] = useState(false);

  // API = Application Programming Interface - A set of rules that allows one software application to talk another one
  const API_BASE_URL = 'https://api.themoviedb.org/3';

  // per richiamare il valore di una property nell'.env
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  // options per la chiamata al DB
  const API_OPTIONS = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${API_KEY}`,
    },
  };
  // tramite useEffect fetchiamo i dati da TMDB all'inizializzazione del componente

  const fetch_movies = async () => {
    // prima di richiedere i movies setto isLoading to true e error message to ''
    setIsLoading(true);
    setErrorMessage('');
    try {
      const endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

      const response = await fetch(endpoint, API_OPTIONS);

      // se lancio un errore di proposito vedrò il messaggio di errore
      // lo lancio se la response is not ok
      if (!response.ok) {
        throw new Error('Failed to fetch movies');
      }

      // se tutto è andato bene salvo i dati trasformandoli da json
      const data = await response.json();

      if (data.Response === false) {
        setErrorMessage(data.Error || 'Failed to fetch movies');
        setMovielist;
      }

      setMovielist(data.results || []);
    } catch (error) {
      console.error('Error fetching movies: ' + error);
      setErrorMessage('Error fetching movies. Please try again later.');
    } finally {
      // una volta terminata la chiamata sia error or not setto isLoading to false
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetch_movies();
  }, []);

  return (
    <main>
      <div className="pattern" />

      <div className="wrapper">
        <header>
          <img src="./hero.png" alt="Hero Banner" />
          <h1 className="text-3xl font-bold underline">
            Find <span className="text-gradientS">Movies</span> You&apos;ll
            Enjoy Without the Hassle
          </h1>

          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>

        <section className="all-movies">
          <h2 className="mt-[40px]">All Movies</h2>
          {/* {errorMessage && <p className="text-red-500">{errorMessage}</p>} */}

          {/* controllo se è in corso il caricamento dei data, se lo è mostro un messaggio di caricamento, se non lo è controllo se c'è un errore, altrimenti mostro i data */}
          {isLoading ? (
            // <p className="text-white">Loading...</p>
            <Spinner />
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : (
            <ul>
              {/* utilizzo .map() sull'array movieList per creare per ogni film un elemento p */}
              {movieList.map(movie => (
                // quando si loopa bisogna passare ad un elemento una prop key che indichi un valore unico per ogni elemento
                <p key={movie.id} className="text-white">
                  {movie.title}
                </p>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
};

export default App;
