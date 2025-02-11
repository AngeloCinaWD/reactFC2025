import { useEffect, useState } from 'react';
import Search from './components/search';
import Spinner from './components/Spinner';
import MovieCard from './components/MovieCard';
// import dello useDebounce from react-use
import { useDebounce } from 'react-use';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // debounce searchTerm
  const [debouncedTermSearch, setDebouncedTermSearch] = useState('');

  const [errorMessage, setErrorMessage] = useState(null);

  const [movieList, setMovielist] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const API_BASE_URL = 'https://api.themoviedb.org/3';

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
    } catch (error) {
      console.error('Error fetching movies: ' + error);
      setErrorMessage('Error fetching movies. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  // per evitare che vengano effettuate chiamate verso il server ad ogni keypress implementiamo il debouncing
  // installiamo il package use-react (npm i use-react) ed utilizziamo l'hook useDebounce
  // chiamiamo l'hook useDebounce, indichiamo quale deve essere la dependency ed il tempo di debounce
  // debounce the search term to prevent making too many API requests
  // by waiting for the user to stop typing for 500ms
  useDebounce(() => setDebouncedTermSearch(searchTerm), 500, [searchTerm]);

  useEffect(() => {
    // passiamo al metodo fetch_movies il termine di ricerca con il debounce
    // fetch_movies(searchTerm);
    fetch_movies(debouncedTermSearch);
    // }, [searchTerm]);
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
