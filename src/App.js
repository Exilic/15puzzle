import './App.css';
import {useEffect, useState} from "react";

function App() {

  const [gameNumbers, setGameNumbers] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]);
  const [feedback, setFeedback] = useState("The present game is unsolved");
  const [newGame, setNewGame] = useState(true);

  useEffect(() => {
    if (newGame) {
      do {
        let newGameNumbers = [...gameNumbers];
        for (let i = gameNumbers.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [newGameNumbers[i], newGameNumbers[j]] = [newGameNumbers[j], newGameNumbers[i]];
        }
        setGameNumbers(newGameNumbers);
      } while (isSolvable() === false)
      setNewGame(false);
      setFeedback(() => "The present game is unsolved");
    }
  }, [gameNumbers, isSolvable, newGame]);

  useEffect(() => {
    const handleKey = (e) => {
      e.preventDefault();
      let positionNumber;
      switch (e.key) {
        case 'ArrowLeft':
          if (((gameNumbers.indexOf(16) + 1) % 4) !== 0) {
            positionNumber = 1;
          }
          break;
        case 'ArrowUp':
          if(gameNumbers.indexOf(16) < 12){
            positionNumber = 4;
          }
          break;
        case 'ArrowRight':
          if (((gameNumbers.indexOf(16) + 4) % 4) !== 0){
            positionNumber = -1;
          }
          break;
        case 'ArrowDown':
          if(gameNumbers.indexOf(16) > 3){
            positionNumber = -4;
          }
          break;
        default:
          break;
      }
      let newGameNumbers = [...gameNumbers];
      newGameNumbers[gameNumbers.indexOf(16)] = newGameNumbers[(gameNumbers.indexOf(16) + positionNumber)];
      newGameNumbers[(gameNumbers.indexOf(16) + positionNumber)] = 16;
      setGameNumbers(() => newGameNumbers);
      if (gameIsWon()) {
        setFeedback(() => "You have won!");
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey)
  }, [gameNumbers]);



  const gameIsWon = () => {
    for (let i = 0; i < 16; i++) {
      if (gameNumbers[i] !== (i+1)) {
        return false;
      }
    } return true;
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function isSolvable() {
    const isEven = Math.floor(gameNumbers.indexOf(16) / 4 ) % 2 === 0;
    let count = 0;
    for (let i = 0; i < 15; i++) {
      if(gameNumbers[i] !== 16) {
        for ( let j = i; j < 16; j++) {
          if(gameNumbers[i] > gameNumbers[j]) count++;
        }
      }
    }
    if(isEven &&  Math.abs(count % 2) === 1) return true;
    return !isEven && count % 2 === 0;
  }

  return (
    <>
      <h1>Order numbers from 1 to 15 by moving numbers into the free spot with
        the arrow keys</h1>
      <div id="gamePlayground">
        {gameNumbers.map(gameNumber => (
          gameNumber === 16 ? <div></div> : <div>{gameNumber}</div>
        ))};

      </div>
      <div id="info">
        <button onClick={() => setNewGame(true)}>New Game</button>
        <div id="result">{feedback}</div>
      </div>
    </>
  );
}

export default App;
