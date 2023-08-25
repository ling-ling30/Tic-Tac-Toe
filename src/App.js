import * as React from "react";
import { useState } from "react";
import useSquareStore from "./zustand";
function Board({ calculateNextValue, calculateStatus, calculateWinner }) {
  // const [squares, setValue] = useState(Array(9).fill(null));
  const squares = useSquareStore((state) => state.squares);
  const setValue = useSquareStore((state) => state.updateSquares);
  function selectSquare(square) {
    const nextValue = calculateNextValue(squares);
    const copySquares = [...squares];
    const winner = calculateWinner(copySquares);
    if (winner) {
      return;
    }
    if (copySquares[square]) {
      return;
    }
    copySquares[square] = nextValue;

    setValue(copySquares);
  }

  function renderSquare(i) {
    return (
      <button
        className="border-pink-100 text-pink-100 border-4 text-[35px] h-[60px] aspect-square items-center rounded-md"
        onClick={() => selectSquare(i)}
      >
        {squares[i]}
      </button>
    );
  }

  return (
    <div>
      <div className="flex flex-col items-center">
        <div className=" text-center font-semibold text-2xl m-5">
          <span className="font-bold">STATUS:</span>
          <br />
          <br />
          {calculateStatus(
            calculateWinner(squares),
            squares,
            calculateNextValue(squares)
          )}
        </div>
        <div className="aspect-square  place items-center content-evenly justify-evenly rounded-sm border-gray-800 m-20">
          <div className="flex  p-2  gap-1 justify-evenly bg-slate-800 rounded-t-md">
            {renderSquare(0)}
            {renderSquare(1)}
            {renderSquare(2)}
          </div>
          <div className="flex px-2  gap-1 justify-evenly bg-slate-800 ">
            {renderSquare(3)}
            {renderSquare(4)}
            {renderSquare(5)}
          </div>
          <div className="flex p-2  gap-1 justify-evenly bg-slate-800 rounded-b-md">
            {renderSquare(6)}
            {renderSquare(7)}
            {renderSquare(8)}
          </div>
        </div>
      </div>
    </div>
  );
}

function Game({ calculateNextValue, calculateStatus, calculateWinner }) {
  const restart = useSquareStore((state) => state.resetSquares);

  return (
    <div className="text-center">
      <div className=" inline-flex flex-col">
        <Board
          calculateNextValue={calculateNextValue}
          calculateStatus={calculateStatus}
          calculateWinner={calculateWinner}
        />
        <button
          className=" bg-zinc-50 rounded-lg text-lg font-semibold"
          onClick={restart}
        >
          RESTART
        </button>
      </div>
    </div>
  );
}

// eslint-disable-next-line no-unused-vars
function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? `Scratch: Cat's game`
    : `Next player: ${nextValue}`;
}

// eslint-disable-next-line no-unused-vars
function calculateNextValue(squares) {
  return squares.filter(Boolean).length % 2 === 0 ? "X" : "O";
}

// eslint-disable-next-line no-unused-vars
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function App() {
  return (
    <Game
      calculateNextValue={calculateNextValue}
      calculateStatus={calculateStatus}
      calculateWinner={calculateWinner}
    />
  );
}

export default App;
