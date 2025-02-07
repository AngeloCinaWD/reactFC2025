import './App.css';

// per passare dati da un componente padre ad uno figlio utilizziamo le props
// le props le definisco passandole in un oggetto argomento della funzione che definisce il componente
// aggiunta regola nell'eslint.config.js per non avere l'errore del type props
// una prop può essere qualsiasi cosa, un oggetto, un array, un numero, un booleano
const Card = ({ title }) => {
  return (
    <div>
      {/* utilizzo le graffe per passare codice js nell'html */}
      <h2>{title}</h2>
    </div>
  );
};

const App = () => {
  return (
    <div>
      <h2>Functional arrow component</h2>

      {/* una props riceve dati dall'esterno indicando il nome della props come attributo nel tag componente */}
      {/* esempio props per il title */}
      <Card title="Star Wars" />
      <Card title="Avatar" />
      <Card title="The Lion King" />
    </div>
  );
};

export default App;
