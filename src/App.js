import './App.css';

function App() {
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
        <button onClick="startNewGame()">New Game</button>
        <div id="result">The present game is over</div>
      </div>
    </>
  );
}

export default App;
