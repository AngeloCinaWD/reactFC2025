import './App.css';

const Card = ({ title }) => {
  return (
    // per definire syle in line: attributo style={{proprietàCss: valore}}, le doppie graffe sono la prima coppia per dire che passaimo codice js e la seconda perchè per lo style va passato un oggetto con coppie property: value (questo come stringa)
    // <div
    //   style={{
    //     border: '1px solid #4b5362',
    //     padding: '20px',
    //     margin: '10px',
    //     backgroundColor: '#31363f',
    //     borderRadius: '10px',
    //     minHeight: '100px',
    //   }}
    // >
    <div className="card">
      <h2>{title}</h2>
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
