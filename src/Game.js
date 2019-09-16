import React from "react";
import "./Game.css";
import { useInput } from './hooks/input';
import inLove from './assets/in-love.png';
import sad from './assets/sad.png';

function getRandomEquation() {
  const operation = Math.random() > 0.5 ? "+" : "-";
  let result = Math.ceil(Math.random() * 20);
  let a = Math.ceil(Math.random() * result);
  let b = result - a;
  if (operation === "-") {
    a = result;
    b = Math.ceil(Math.random() * a);
    result = a - b;
  }
  return {
    result,
    a,
    b,
    operation
  };
}

let timeoutID;
let results = [];

function Game(props) {
  const { onFinish, steps = 5 } = props;
  const resultInput = React.useRef(null);
  const { value:result, bind:bindResult, reset:resetResult } = useInput('');
  const [state, updateState] = React.useState('game');
  const [equation, updateResult] = React.useState(getRandomEquation());

  React.useEffect(() => {
    if (timeoutID) {
      clearTimeout(timeoutID);
    }
    if (state === 'valid') {
      resetResult();
      timeoutID = setTimeout(() => {
        updateState('game');
        updateResult(getRandomEquation());
      }, 1000)
    }
    if (state === 'invalid') {
      timeoutID = setTimeout(() => {
        updateState('game');
      }, 1000)
    }
    if (resultInput && resultInput.current) {
      resultInput.current.focus();
    }
  }, [state]);

  const handleSubmit = e => {
    if (parseInt(result, 10) !== parseInt(equation.result, 10)) {
      updateState('invalid');
    } else {
      results.push(result);
      if (results.length === steps) {
        onFinish(results);
        results = [];
      } else {
        updateState('valid');
      }
    }
    e.preventDefault();
    e.stopPropagation();
  };

  const renderGame = () => {
    switch (state) {
      case 'invalid':
        return (
          <div>
            <img src={sad} />  
          </div>
        )
      case 'valid':
        return (
          <div>
            <img src={inLove} />  
          </div>
        )
      case 'game':
      default:
        return (
          <form onSubmit={handleSubmit}>
            <div className="equation">
              <div>{equation.a}</div>
              <div>{equation.operation}</div>
              <div>{equation.b}</div>
              <div>=</div>
              <div>
                <input type="text" className="resultInput" {...bindResult} ref={resultInput}  />
              </div>
            </div>
            <button>Provjeri</button>
          </form>
        );
    }
  }

  return (
    <div>
      {renderGame()}
    </div>
  );
}

export default Game;
