import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Board } from './board'

export function Game({
  navigation
}) {
  const emptyHistory = () => [{squares: Array(9).fill(' ')}]
  const [history, setHistory] = useState(emptyHistory())
  const [stepNumber, setStepNumber] = useState(0)
  const [xIsNext, setXIsNext] = useState(true)
  const [winner, setWinner] = useState({x: 0, o: 0})

  const styles = StyleSheet.create({
    game: {
      display: 'flex',
      flexDirection: 'column',
    },
    gameInfo: {
      marginTop: 20,
    },
    boardRow: {
      display: 'flex',
      flexDirection: 'row',
    },
    status: {
      marginBottom: 10,
    },
  });

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2], // Top Row
      [3, 4, 5], // Middle row
      [6, 7, 8], // Bottom row
      [0, 3, 6], // Left col
      [1, 4, 7], // Center col
      [2, 5, 8], // Right col
      [0, 4, 8], // Cross top- left => bottom-right
      [2, 4, 6]  // Cross bottom- right => top- left
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] !== ' '
        && squares[a] === squares[b] 
        && squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }

    return false;
  }

  const startOver = () => {
    increaseWinningCount()
    setHistory(emptyHistory())
    setStepNumber(0)
  }

  const finished = () => {
    increaseWinningCount()
    navigation.navigate('Highscore', {winner})
  }

  const increaseWinningCount = () => {
    const squares = history.slice(0, stepNumber + 1)[history.length - 1].squares.slice()
    const w = calculateWinner(squares)
    if (w) {
      setWinner({
        x: w === 'X' ? ++winner.x : winner.x,
        o: w === 'O' ? ++winner.o : winner.o
      })
      console.log('winner: ', winner)
    }
  }

  const handleClick = (i) => {
    if (!history) return

    const h = history.slice(0, stepNumber + 1);
    const current = h[history.length - 1];
    const squares = current.squares.slice();

    const w = calculateWinner(squares)
    if (w) {
      return
    }

    squares[i] = xIsNext ? "X" : "O";
    setHistory(history.concat([{squares: squares}]))

    setStepNumber(history.length)
    setXIsNext(!xIsNext)
  }

  const winnerOfRound = calculateWinner(history[stepNumber].squares);
  
  let status;
  if (winnerOfRound) {
    status = "Winner: " + winnerOfRound;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <>
      <View style={styles.game}>
        <View style={styles.gameBoard}>
          <Board
            squares={history.slice(0, stepNumber + 1)[history.length - 1].squares}
            squareClicked={handleClick}
          />
        </View>
        <View style={styles.gameInfo}>
          <Text style={styles.status}>{status}</Text>
        </View>
      </View>
      { winnerOfRound ?
        <View>
          <Button 
            title='Start over'
            onPress={() => startOver()}
          />
          <Button
            title='Please, no more!'
            onPress={() => finished()} 
          />
        </View>
        : <></>
      }
    </>
  )
}
