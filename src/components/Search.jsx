//  props è un oggetto che contiene tutte le props, quindi se passassimo un argomento chiamato props sarebbe un oggetto e sarebbe possibile richiamare le props al suo interno ad esempio con props.nomeProp, quindi posso destrutturare questo oggetto con la sintassi {nomeProp}
const Search = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="search">
      <div>
        <img src="search.svg" alt="search" />

        {/* l'event onChange è un handler che ci permette di settare il valore di una property ogni volta che viene triggerato, nel caso dell'input ad esempio ogni volta che viene inserito un carattere */}
        {/* legando il value dell'input alla property searchTerm e settandone il suo valore tramite onChange sto creando un dual bind link, leggo e scrivo la property searchTerm */}
        <input
          type="text"
          placeholder="Search through thousands of movies"
          value={searchTerm}
          onChange={event => setSearchTerm(event.target.value)}
        />
      </div>
    </div>
  );
};

export default Search;
