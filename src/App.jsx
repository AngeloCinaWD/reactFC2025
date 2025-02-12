import { useEffect, useState } from 'react';
import Search from './components/search';
import Spinner from './components/Spinner';
import MovieCard from './components/MovieCard';
import { useDebounce } from 'react-use';
import { updateSearchCount } from './appwrite';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const [debouncedTermSearch, setDebouncedTermSearch] = useState('');

  const [errorMessage, setErrorMessage] = useState(null);

  const [movieList, setMovielist] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  const API_OPTIONS = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${API_KEY}`,
    },
  };

  const fetch_movies = async (query = '') => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const endpoint = query
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

      const response = await fetch(endpoint, API_OPTIONS);

      if (!response.ok) {
        throw new Error('Failed to fetch movies');
      }

      const data = await response.json();

      if (data.Response === false) {
        setErrorMessage(data.Error || 'Failed to fetch movies');
        setMovielist;
      }

      setMovielist(data.results || []);

      // chiamo la funzione esportata updateSearchCount, devo passare i 2 parametri altrimenti non la chiama
      // passo il termine di ricerca e il primo film nella lista dei film trovati secondo ricerca
      // se esiste una query e se esiste un film per quella query
      if (query && data.results.length > 0) {
        await updateSearchCount(query, data.results[0]);
      }
    } catch (error) {
      console.error('Error fetching movies: ' + error);
      setErrorMessage('Error fetching movies. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  useDebounce(() => setDebouncedTermSearch(searchTerm), 1000, [searchTerm]);

  useEffect(() => {
    // Built-in constants ENV VARIABLES
    // console.log(import.meta.env.MODE);
    // console.log(import.meta.env.BASE_URL);
    // console.log(import.meta.env.PROD);
    // console.log(import.meta.env.DEV);
    // console.log(import.meta.env.SSR);

    fetch_movies(debouncedTermSearch);
  }, [debouncedTermSearch]);

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
          {isLoading ? (
            <Spinner />
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : (
            <ul>
              {movieList.map(movie => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
};

export default App;

// PER UTILIZZARE APPWRITE: registrarsi, creare un nuovo progetto, l'appkey è vicino al nome del nuovo progetto in overview. Add a platform web, mettere nome ed * per l'hostname (per poter accedere da ovunque). Installare l'SDK di appwrite tramite npm (npm install appwrite). In databases creare un database, una volta creato ci sarà l'id del DB vicino al suo nome. Creare una collection nel DB. Creare gli attributes (searchTerm: string, count: integer, poster_url: url, movie_id: integer). Settare i permissions in settings: role any, CRUD.
