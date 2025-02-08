import { useState } from 'react';
import './App.css';
import { useEffect } from 'react';

const Card = ({ title }) => {
  const [hasLiked, setHasLiked] = useState(false);

  // HOOK useEffect(), ci permette di eseguire del codice in determinati momenti, ad esempio all'avvio del component, al destroy del component o se cambia lo state
  // questo hook è un metodo che ha la seguente sintassi: useEffect(callback con codice sa eseguire, [dependencies array])
  // nel dependencies array indichiamo quando deve essere eseguito il codice, ad esempio se indichiamo nell'array [hasLinked] il codice verrà eseguito solo quando la variabile hasLinked cambierà di stato (verrà chiamato anche quando la variabile viene valorizzata nel componente con il valore di default)
  // [] array vuoto vuol dire che la callback deve essere chiamata quando il componente è instanziato
  // useEffect(() => console.log('like'), []);
  // se non passo un array come secondo argomento la callback viene chiamata per ogni cambiamento del componente
  useEffect(() => console.log('like'), [hasLiked]);

  return (
    <div className="card">
      <h2>{title}</h2>

      <button onClick={() => setHasLiked(!hasLiked)}>
        {hasLiked ? '❤️' : '🤍'}
      </button>
    </div>
  );
};

const App = () => {
  return (
    <div className="card-container">
      <Card title="Star Wars" />
      <Card title="Avatar" />
      <Card title="The Lion King" />
    </div>
  );
};

export default App;
