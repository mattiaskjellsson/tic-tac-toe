import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Square } from './square'

export function Board({squares, squareClicked}) {
  const styles = StyleSheet.create({
    boardRow: {
      display: 'flex',
      flexDirection: 'row',
      backgroundColor: '#0c0c0c',
    },
    square: {
      backgroundColor: '#ffffff',
      borderStyle: 'solid',
      borderWidth: 1,
      borderColor: '#999999',
      fontSize: 34,
      fontWeight: 'bold',
      lineHeight: 34,
      height: 50,
      marginRight: -1,
      marginTop: -1,
      padding: 0,
      textAlign: 'center',
      width: 50,
    },
  });

  const renderSquare = (i) => {
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