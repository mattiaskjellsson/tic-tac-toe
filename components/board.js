import React from 'react';
import { View } from 'react-native';
import { Square } from './square'
import { styles } from './styles'

export function Board({squares, squareClicked}) {
  const renderSquare = (i) => {
    console.log(i, squares[i])
    return (
      <Square
        number={i}
        style={styles.square}
        value={squares[i] ? squares[i] : ''}
        onClick={(i) => squareClicked(i)}
      />
    );
  }

  return (
    <View>
      <View style={styles.boardRow}>
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </View>
      <View style={styles.boardRow}>
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </View>
      <View style={styles.boardRow}>
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </View>
    </View>
  );
}