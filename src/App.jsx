import './App.css';

// in react posso creare un componente e richiamarlo in un react fragment dove voglio
// creo un componente card e lo utilizzo in App
// utilizzando una arrow function creo un Arrow Function Component
const Card = () => {
  return (
    <div>
      <h2>Card Component</h2>
    </div>
  );
};

const App = () => {
  return (
    // posso ritornare codice html o nel react fragment <></> on in un tag html ad esempio un <div></div>
    <div>
      <h2>Functional arrow component</h2>

      <Card />
      <Card />
      <Card />
    </div>
  );
};

// esporto il componente che ho creato in modo da poterlo riutilizzare ovunque voglio importandolo
export default App;
