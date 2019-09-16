import React from 'react';
import './App.css';
import Game from './Game';

function App() {
  const [status, updateGameStatus] = React.useState(false);

  const handleGameFinish = (score) => {
    updateGameStatus(false);
  }

  return (
    <div className="App">
      <header className="App-header">
        {status ? <Game onFinish={handleGameFinish}/> : <button onClick={() => updateGameStatus(true)}>start game</button>}
      </header>
    </div>
  );
}

export default App;
