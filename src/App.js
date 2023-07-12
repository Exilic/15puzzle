import './App.css';
import {useEffect} from "react";

function App() {
  const handleKey = (e) => {
    e.preventDefault();
    switch (e.key) {
      case 'ArrowLeft':
        swipeLeft();
        break;
      case 'ArrowUp':
        swipeUp();
        break;
      case 'ArrowRight':
        swipeRight();
        break;
      case 'ArrowDown':
        swipeDown();
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey)
  }, []);

  const isGameWon = () => {
    for (let i = 0; i < 16; i++) {
      if (gameNumbers[i] !== (i+1)) {
        return false;
      }
    } return true;
  };

  let numberSixteen = 15;

  let gameNumbers = new Array(16);
  const startNewGame = () => {
    for (let index = 0; index < 16; index++) {
      gameNumbers[index] = (index+1);
    }
    do {
      newRandomOrder();
      determineSixteen();
    } while (isSolvable() === false)

    rearrangeCSS();
    document.getElementById('result').innerHTML = "The present game is unsolved";
  }

  function newRandomOrder() {
    for (let i = gameNumbers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [gameNumbers[i], gameNumbers[j]] = [gameNumbers[j], gameNumbers[i]];
    }
  }

  function rearrangeCSS() {
    for (let i = 0; i < 16; i++) {
      let c = gameNumbers[i];
      setRow(c, (1+Math.floor(i/4)));
      setColumn(c, ((i+1)-(Math.floor(i/4)*4)));
    }
  }

  function determineSixteen() {
    for (let i = 0; i < 16; i++) {
      if (gameNumbers[i] === 16)
        numberSixteen = i;
    }
  }

  function isSolvable() {
    const isEven = Math.floor((numberSixteen) / 4 ) % 2 === 0;
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

  function swipeLeft() {
    if (((numberSixteen+1) % 4) !== 0){
      let a = ((numberSixteen+1)-(Math.floor(numberSixteen/4)*4));
      setColumn(16,(a+1));
      setColumn(gameNumbers[(numberSixteen+1)], a);
      finishSwipe(1);
    }else{}
  }

  function swipeRight() {
    if (((numberSixteen+4) % 4) !== 0){
      let a = ((numberSixteen+1)-(Math.floor(numberSixteen/4)*4));
      setColumn(16,(a-1));
      setColumn(gameNumbers[(numberSixteen-1)], a);
      finishSwipe(-1);
    }else{}
  }

  function swipeDown() {
    if(numberSixteen>3){
      setRow(16, (Math.floor(numberSixteen/4)));
      setRow(gameNumbers[(numberSixteen-4)], ((Math.floor(numberSixteen/4))+1));
      finishSwipe(-4);
    }else{}
  }

  function swipeUp() {
    if(numberSixteen<12){
      setRow(16, ((Math.floor(numberSixteen/4)+2)));
      setRow(gameNumbers[(numberSixteen+4)], (Math.floor(numberSixteen/4)+1));
      finishSwipe(4);
    }else{}
  }

  function finishSwipe(positionNumber) {
    swapNumbers(numberSixteen, positionNumber);
    numberSixteen = (numberSixteen + positionNumber);
    if (isGameWon()) document.getElementById('result').innerHTML = "You have won!";
  }

  function setRow(tile, row) {
    document.getElementById('tile'+tile).style.gridRow = row;
  }

  function setColumn(tile, column) {
    document.getElementById('tile'+tile).style.gridColumn = column;
  }

  function swapNumbers(sixteen, other) {
    gameNumbers[sixteen] = gameNumbers[(sixteen + other)];
    gameNumbers[(sixteen + other)] = 16;
  }

  return (
    <>
      <h1>Order numbers from 1 to 15 by moving numbers into the free spot with
        the arrow keys</h1>
      <div id="gamePlayground">
        <div id="tile1">1</div>
        <div id="tile2">2</div>
        <div id="tile3">3</div>
        <div id="tile4">4</div>
        <div id="tile5">5</div>
        <div id="tile6">6</div>
        <div id="tile7">7</div>
        <div id="tile8">8</div>
        <div id="tile9">9</div>
        <div id="tile10">10</div>
        <div id="tile11">11</div>
        <div id="tile12">12</div>
        <div id="tile13">13</div>
        <div id="tile14">14</div>
        <div id="tile15">15</div>
        <div id="tile16"></div>
      </div>
      <div id="info">
        <button onClick={startNewGame}>New Game</button>
        <div id="result">The present game is over</div>
      </div>
    </>
  );
}

export default App;
