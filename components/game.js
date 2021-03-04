import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import { Board } from './board'

export function Game() {
  const [history, setHistory] = useState([{squares: Array(9).fill('')}])
  const [stepNumber, setStepNumber] = useState(0)
  const [xIsNext, setXIsNext] = useState(true)

  const calculateWinner = (squares) => {
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

  const startOver = () => {
    console.log('Start over')
  }

  const handleClick = (i) => {
    console.log('I: ', i)
    console.log('History: ', history)
    if (!history) return

    const h = history.slice(0, stepNumber + 1);
    console.log('h', h)

    const current = h[history.length - 1];
    console.log('current: ', current)

    const squares = current.squares.slice();
    console.log('Squares: ', squares)

    if (calculateWinner(squares)) {
      console.log('calculate winner returned something good')
      console.log(calculateWinner(squares))
      console.log(squares[i])
      return;
    }

    squares[i] = xIsNext ? "X" : "O";
    setHistory(history.concat([{squares: squares}]))

    setStepNumber(history.length)
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
    <>
      <View className="game">
        <View className="game-board">
          <Board
            squares={history.slice(0, stepNumber + 1)[history.length - 1].squares}
            squareClicked={handleClick}
          />
        </View>
        <View className="game-info">
          <Text>{status}</Text>
        </View>
      </View>
      { winner ?
        <View>
          <Button 
            title='Start over'
            onPress={() => startOver()}
          />
        </View>
        : <></>
      }
    </>
  )
}
