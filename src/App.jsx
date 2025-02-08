import { useState } from 'react';
import './App.css';

// STATE
// lo state è definibile come il cervello di un componente, quello che immagazina le informazioni ch epossono cambiare nel tempo. Qualcosa che permette all'utente di interagire con i componenti dell'app, ad esempio il like ad un film
// per utilizzare lo state si utilizza il metodo useState(), in react tutti gli hooks iniziano con use

const Card = ({ title }) => {
  // per definire una variabile che venga osservata nel tempo, si utilizza l'hook useState()
  // si definisce una const che sia un array che destrutturi il risultato dell'hook useState(), il primo elemento di questo array è il nome della variabile che si vuole osservare ed il secondo un metodo set che peretta di variarne il valore di partenza che viene passato all'hook useState()
  // di norma variableName e setVariableName
  // variabile di stato hasLiked, booleano con valore iniziale false
  const [hasLiked, setHasLiked] = useState(false);

  function setHasLiked2() {
    setHasLiked(!hasLiked);
  }

  return (
    <div className="card">
      <h2>{title}</h2>
      {/* aggiungiamo un button per mettere like al film */}
      {/* {hasLiked ? (
        <button onClick={() => setHasLiked(false)}>Liked</button>
      ) : (
        <button onClick={() => setHasLiked(true)}>Like</button>
      )} */}
      {/* per chiamare una funzione va utilizzata una arrow function tra graffe */}
      <button onClick={() => setHasLiked2()}>{hasLiked ? '❤️' : '🤍'}</button>
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
