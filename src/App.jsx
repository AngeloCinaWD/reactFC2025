import { useState } from 'react';
import Search from './components/search';

const App = () => {
  // creo un nuovo state per il termine per la ricerca dei film
  // lo state non deve essere mai mutato direttamente sulla prop ad esempio searchTerm = new value, ma bisogna sempre utilizzare la set function setSearchTerm('new value')
  // in questo modo react sa sempre quale è il valore dello state per quella proprietà
  const [searchTerm, setSearchTerm] = useState('');

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
        </header>

        {/* passo il valore pe rla ricerca tramite props al componente */}
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>
    </main>
  );
};

export default App;
