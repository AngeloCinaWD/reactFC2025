import { useEffect, useState } from 'react';
import Search from './components/search';
import Spinner from './components/Spinner';
import MovieCard from './components/MovieCard';

const App = () => {
  // questo state viene utilizzato per cercare un film
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

  // modifichiamo questo metodo passando un argomento che sarà la stringa per la query per la ricerca di un film
  // valore di default ''
  const fetch_movies = async (query = '') => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      // se query ha un valore non falsy effettuo la chiamata verso un altro url
      // il valore di query viene passato parsato dal metodo js encodeURIComponent()
      // const endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

      const endpoint = query
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

      const response = await fetch(endpoint, API_OPTIONS);

      if (!response.ok) {
        throw new Error('Failed to fetch movies');
      }

      // destrutturazione sbagliata, l'oggetto data non esiste (non è come nelle props)
      // const {
      //   data: { results, total_pages, page },
      // } = await response.json();

      // destrutturazione sbagliata, in questo modo sto dicendo trovami, nell'oggetto da destrutturare, le proprietà total_pages e page ed assegna il valore di queste alle variabili total_pages e page; con data: results sto dicendo trova la proprietà data ed assegnane il valore alla variabile results, in questo modo il risultato sarà undefined di results perchè la proprietà data nell'oggetto da destrutturare non esiste. Se scrivessi results: data avrei che il valore della proprietà results (esistente nell'oggetto da destrutturare) verrebbe assegnato ad una variabile con nome data
      // const {
      //   data: results, total_pages, page,
      // } = await response.json();

      // destrutturazione giusta, creo 3 variabili con lo stesso nome di 3 proprietà esistenti nell'oggetto da destrutturare e con il loro valore
      // const { results, page, total_pages } = await response.json();

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

  // aggiungendo searchTerm nell'array delle dependencies il metodo fetch_movies verrà chiamato non solo all'inizializzazione del componente ma anche se cambia la dependency indicata nell'array, in questo caso searchTerm
  useEffect(() => {
    fetch_movies(searchTerm);
  }, [searchTerm]);

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
