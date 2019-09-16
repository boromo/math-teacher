import React from 'react';
import './App.css';
import Game from './Game';
import { useInput } from './hooks/input';

const defaultSettings = { steps: 5, name: '', state: 'init' };

function App() {
  const [settings, updateSettings] = React.useState(defaultSettings);
  const stepsInput = React.useRef(null);
  const nameInput = React.useRef(null);
  const { value: steps, bind: bindSteps, reset: resetSteps } = useInput('');
  const { value: name, bind: bindName, reset: resetName } = useInput('');
  const [status, updateGameStatus] = React.useState(false);

  const handleGameFinish = result => {
    console.log(result);
    updateSettings(defaultSettings);
    updateGameStatus(false);
  };

  const handleSubmit = (e) => {
    updateSettings({name, steps: parseInt(steps, 10), state: 'ready'});
    resetSteps();
    resetName();
    e.preventDefault();
  }

  return (
    <div className="App">
      <header className="App-header">
        {settings.state === 'ready' ? (
          <Game onFinish={handleGameFinish} steps={settings.steps} name={settings.name} />
        ) : (
          <form onSubmit={handleSubmit} className="startGameForm">
            <input
              type="text"
              placeholder="Ime natjecatelja"
              {...bindName}
              ref={nameInput}
            />
            <input
              type="number"
              placeholder="Broj pitanje"
              {...bindSteps}
              ref={stepsInput}
            />
            <button>Start</button>
          </form>
        )}
      </header>
    </div>
  );
}

export default App;
