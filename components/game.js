import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { Board } from './board'

export function Game() {
  const [history, setHistory] = useState([{squares: Array(9).fill('')}])
  const [stepNumber, setStepNumber] = useState(0)
  const [xIsNext, setXIsNext] = useState(true)

  const calculateWinner = (squares) => {
    if(!squares) return null

    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  const handleClick = (i) => {
    if (!history) return

    const h = history.slice(0, stepNumber + 1);
    const current = h[history.length - 1];
    const squares = current.squares.slice();

    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = xIsNext ? "X" : "O";
    setHistory(h.concat([{squares: squares}]))

    setStepNumber(h.length)
    setXIsNext(!xIsNext)
  }

  const winner = calculateWinner(history[stepNumber]?.squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    // <View className="game">
    //   <View className="game-board">
        <Board
          squares={history}
          squareClicked={handleClick}
        />
    //   </View>
    //   <View className="game-info">
    //     <Text>{status}</Text>
    //   </View>
    // </View>
  )
}
